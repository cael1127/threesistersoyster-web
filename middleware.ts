import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { securityMonitor } from '@/lib/security-monitor'

// In-memory rate limiting store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100 // Max requests per minute
const MAX_REQUESTS_PER_WINDOW_STRICT = 20 // Stricter limit for sensitive endpoints

// Security headers to add to all responses
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
}

// Rate limiting function
function checkRateLimit(ip: string, endpoint: string): boolean {
  const now = Date.now()
  const key = `${ip}:${endpoint}`
  const record = rateLimitStore.get(key)
  
  // Use stricter limits for sensitive endpoints
  const maxRequests = endpoint.includes('/api/') ? MAX_REQUESTS_PER_WINDOW_STRICT : MAX_REQUESTS_PER_WINDOW
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

// Input validation function - Only blocks obviously malicious requests
function validateRequest(request: NextRequest): boolean {
  const url = request.url
  
  // Only block obviously malicious requests
  if (url.includes('javascript:') || url.includes('vbscript:')) {
    return false
  }
  
  // Allow data: URLs for legitimate image purposes (common in web apps)
  
  // Only block suspicious headers if they're clearly malicious
  const suspiciousHeaders = ['x-forwarded-for', 'x-real-ip', 'x-forwarded-proto']
  for (const header of suspiciousHeaders) {
    const headerValue = request.headers.get(header)
    if (headerValue && (headerValue.includes('javascript:') || headerValue.includes('vbscript:'))) {
      return false
    }
  }
  
  // Log bot requests but don't block them (many are legitimate)
  const userAgent = request.headers.get('user-agent') || ''
  const suspiciousUserAgents = ['bot', 'crawler', 'spider', 'scraper', 'curl', 'wget']

  
  return true
}

// Security middleware - ENHANCED WITH SECURITY MONITORING
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = securityMonitor.getClientIP(request)
  
  // Skip middleware for static assets and public files
  if (pathname.startsWith('/_next/') || 
      pathname.startsWith('/favicon.ico') || 
      pathname.startsWith('/public/') ||
      pathname.includes('.') ||
      pathname === '/') {
    return NextResponse.next()
  }
  
  // Skip middleware for debug endpoints in development
  if (process.env.NODE_ENV === 'development' && pathname.startsWith('/api/debug-')) {
    return NextResponse.next()
  }
  
  // Check if IP is blocked
  if (securityMonitor.isIPBlocked(ip)) {
    securityMonitor.logEvent({
      type: 'SUSPICIOUS_ACTIVITY',
      severity: 'HIGH',
      ip,
      endpoint: pathname,
      details: { reason: 'IP_BLOCKED' },
      blocked: true
    })
    return new NextResponse('Forbidden', { status: 403 })
  }
  
  // Analyze request for suspicious patterns (skip for analytics API and inventory page)
  if (!pathname.startsWith('/api/analytics') && pathname !== '/inventory') {
    const analysis = securityMonitor.analyzeRequest(request)
    if (analysis.suspicious) {
      securityMonitor.logEvent({
        type: 'MALICIOUS_REQUEST',
        severity: analysis.reasons.some(r => r.includes('Malicious pattern')) ? 'CRITICAL' : 'HIGH',
        ip,
        endpoint: pathname,
        details: { reasons: analysis.reasons, userAgent: request.headers.get('user-agent') },
        blocked: true
      })
      
      // Block IP if multiple suspicious requests
      const recentSuspicious = Array.from(securityMonitor.getSecurityStats().recentEvents)
        .filter(event => event.ip === ip && event.type === 'MALICIOUS_REQUEST')
        .filter(event => event.timestamp.getTime() > Date.now() - 300000) // Last 5 minutes
      
      if (recentSuspicious.length >= 3) {
        securityMonitor.blockIP(ip)
      }
      
      return new NextResponse('Forbidden', { status: 403 })
    }
  }
  
  // Enhanced rate limiting with security monitoring
  // Skip rate limiting for analytics API to allow tracking
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/analytics') && !securityMonitor.checkRateLimit(ip, pathname)) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }
  
  // Block access to sensitive files
  if (pathname.includes('.env') || pathname.includes('.git') || pathname.includes('package.json')) {
    return new NextResponse('Not Found', { status: 404 })
  }
  
  // Block access to development files in production
  if (process.env.NODE_ENV === 'production' && 
      (pathname.includes('.map') || pathname.includes('__nextjs'))) {
    return new NextResponse('Not Found', { status: 404 })
  }
  
  // Add security headers to all responses
  const response = NextResponse.next()
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // Additional security for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }
  
  return response
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - static assets (files with extensions)
     * - root path (/)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|.*\\.|^$).*)',
  ],
} 