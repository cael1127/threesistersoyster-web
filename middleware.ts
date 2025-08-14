import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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

// Input validation function
function validateRequest(request: NextRequest): boolean {
  const url = request.url
  const method = request.method
  
  // Block suspicious requests
  if (url.includes('javascript:') || url.includes('data:') || url.includes('vbscript:')) {
    return false
  }
  
  // Block requests with suspicious headers
  const suspiciousHeaders = ['x-forwarded-for', 'x-real-ip', 'x-forwarded-proto']
  for (const header of suspiciousHeaders) {
    if (request.headers.get(header) && !request.headers.get(header)?.startsWith('https')) {
      return false
    }
  }
  
  // Block requests with suspicious user agents
  const userAgent = request.headers.get('user-agent') || ''
  const suspiciousUserAgents = ['bot', 'crawler', 'spider', 'scraper', 'curl', 'wget']
  if (suspiciousUserAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
    // Allow legitimate bots but log them
    console.log('Bot request detected:', userAgent)
  }
  
  return true
}

// Security middleware
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  
  // Security checks
  if (!validateRequest(request)) {
    console.log(`Security violation blocked from IP: ${ip}, Path: ${pathname}`)
    return new NextResponse('Forbidden', { status: 403 })
  }
  
  // Rate limiting
  if (!checkRateLimit(ip, pathname)) {
    console.log(`Rate limit exceeded for IP: ${ip}, Path: ${pathname}`)
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
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 