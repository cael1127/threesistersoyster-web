import { NextRequest } from 'next/server'

// Security monitoring and logging system
export interface SecurityEvent {
  id: string
  timestamp: Date
  type: 'AUTH_FAILURE' | 'RATE_LIMIT' | 'MALICIOUS_REQUEST' | 'SUSPICIOUS_ACTIVITY' | 'API_ERROR' | 'WEBHOOK_FAILURE'
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  ip: string
  userAgent?: string
  endpoint: string
  details: Record<string, any>
  blocked: boolean
}

// In-memory security event store (use Redis/database in production)
const securityEvents = new Map<string, SecurityEvent>()
const MAX_EVENTS = 10000

// Security thresholds
export const SECURITY_THRESHOLDS = {
  RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute
  MAX_REQUESTS_PER_IP: 100,
  MAX_REQUESTS_PER_ENDPOINT: 20,
  SUSPICIOUS_PATTERN_THRESHOLD: 5,
  BLOCK_DURATION: 15 * 60 * 1000, // 15 minutes
}

// Blocked IPs and their expiration times
const blockedIPs = new Map<string, number>()

// Request counters for rate limiting
const requestCounters = new Map<string, { count: number; resetTime: number }>()

export class SecurityMonitor {
  private static instance: SecurityMonitor

  static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor()
    }
    return SecurityMonitor.instance
  }

  // Log security events
  logEvent(event: Omit<SecurityEvent, 'id' | 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }

    // Store event
    securityEvents.set(securityEvent.id, securityEvent)

    // Clean up old events
    if (securityEvents.size > MAX_EVENTS) {
      const events = Array.from(securityEvents.values())
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, MAX_EVENTS / 2)
      
      securityEvents.clear()
      events.forEach(event => securityEvents.set(event.id, event))
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`🚨 Security Event [${event.severity}]:`, {
        type: event.type,
        ip: event.ip,
        endpoint: event.endpoint,
        details: event.details,
        blocked: event.blocked
      })
    }

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(securityEvent)
    }
  }

  // Check if IP is blocked
  isIPBlocked(ip: string): boolean {
    const blockExpiry = blockedIPs.get(ip)
    if (!blockExpiry) return false

    if (Date.now() > blockExpiry) {
      blockedIPs.delete(ip)
      return false
    }

    return true
  }

  // Block an IP address
  blockIP(ip: string, duration: number = SECURITY_THRESHOLDS.BLOCK_DURATION): void {
    blockedIPs.set(ip, Date.now() + duration)
    
    this.logEvent({
      type: 'SUSPICIOUS_ACTIVITY',
      severity: 'HIGH',
      ip,
      endpoint: 'SYSTEM',
      details: { action: 'IP_BLOCKED', duration },
      blocked: true
    })
  }

  // Check rate limiting
  checkRateLimit(ip: string, endpoint: string): boolean {
    const now = Date.now()
    const ipKey = `ip:${ip}`
    const endpointKey = `endpoint:${ip}:${endpoint}`

    // Check IP-based rate limiting
    const ipRecord = requestCounters.get(ipKey)
    if (!ipRecord || now > ipRecord.resetTime) {
      requestCounters.set(ipKey, { count: 1, resetTime: now + SECURITY_THRESHOLDS.RATE_LIMIT_WINDOW })
    } else if (ipRecord.count >= SECURITY_THRESHOLDS.MAX_REQUESTS_PER_IP) {
      this.logEvent({
        type: 'RATE_LIMIT',
        severity: 'MEDIUM',
        ip,
        endpoint,
        details: { limit: SECURITY_THRESHOLDS.MAX_REQUESTS_PER_IP, count: ipRecord.count },
        blocked: true
      })
      return false
    } else {
      ipRecord.count++
    }

    // Check endpoint-specific rate limiting
    const endpointRecord = requestCounters.get(endpointKey)
    if (!endpointRecord || now > endpointRecord.resetTime) {
      requestCounters.set(endpointKey, { count: 1, resetTime: now + SECURITY_THRESHOLDS.RATE_LIMIT_WINDOW })
    } else if (endpointRecord.count >= SECURITY_THRESHOLDS.MAX_REQUESTS_PER_ENDPOINT) {
      this.logEvent({
        type: 'RATE_LIMIT',
        severity: 'HIGH',
        ip,
        endpoint,
        details: { limit: SECURITY_THRESHOLDS.MAX_REQUESTS_PER_ENDPOINT, count: endpointRecord.count },
        blocked: true
      })
      return false
    } else {
      endpointRecord.count++
    }

    return true
  }

  // Analyze request for suspicious patterns
  analyzeRequest(request: NextRequest): { suspicious: boolean; reasons: string[] } {
    const reasons: string[] = []
    const url = request.url
    const userAgent = request.headers.get('user-agent') || ''
    const ip = this.getClientIP(request)

    // Check for malicious patterns in URL
    const maliciousPatterns = [
      /\.\.\//, // Directory traversal
      /<script/i, // XSS attempts
      /javascript:/i, // JavaScript injection
      /vbscript:/i, // VBScript injection
      /on\w+\s*=/i, // Event handlers
      /union\s+select/i, // SQL injection
      /drop\s+table/i, // SQL injection
      /insert\s+into/i, // SQL injection
      /delete\s+from/i, // SQL injection
      /exec\s*\(/i, // Command injection
      /eval\s*\(/i, // Code injection
    ]

    for (const pattern of maliciousPatterns) {
      if (pattern.test(url)) {
        reasons.push(`Malicious pattern detected: ${pattern.source}`)
      }
    }

    // Check for suspicious headers
    const suspiciousHeaders = ['x-forwarded-for', 'x-real-ip', 'x-forwarded-proto']
    for (const header of suspiciousHeaders) {
      const value = request.headers.get(header)
      if (value && (value.includes('javascript:') || value.includes('vbscript:'))) {
        reasons.push(`Suspicious header: ${header}`)
      }
    }

    // Check for bot-like behavior, but allow legitimate search engine crawlers
    const legitimateCrawlers = [
      'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 
      'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
      'whatsapp', 'telegrambot', 'applebot', 'discordbot'
    ]
    
    const isLegitimateCrawler = legitimateCrawlers.some(crawler => 
      userAgent.toLowerCase().includes(crawler)
    )
    
    if (!isLegitimateCrawler) {
      const suspiciousBotPatterns = ['curl', 'wget', 'python-requests', 'libwww-perl', 'scraper']
      if (suspiciousBotPatterns.some(pattern => userAgent.toLowerCase().includes(pattern))) {
        reasons.push('Suspicious bot-like user agent detected')
      }
    }

    // Check for rapid requests from same IP
    const recentEvents = Array.from(securityEvents.values())
      .filter(event => 
        event.ip === ip && 
        event.timestamp.getTime() > Date.now() - 60000 // Last minute
      )

    if (recentEvents.length > SECURITY_THRESHOLDS.SUSPICIOUS_PATTERN_THRESHOLD) {
      reasons.push(`High request frequency: ${recentEvents.length} requests in last minute`)
    }

    return {
      suspicious: reasons.length > 0,
      reasons
    }
  }

  // Get client IP address
  getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const cfConnectingIP = request.headers.get('cf-connecting-ip')
    
    if (cfConnectingIP) return cfConnectingIP
    if (realIP) return realIP
    if (forwarded) return forwarded.split(',')[0].trim()
    
    return request.ip || 'unknown'
  }

  // Send events to monitoring service (implement based on your monitoring solution)
  private sendToMonitoringService(event: SecurityEvent): void {
    // Example: Send to external monitoring service
    // This could be Sentry, DataDog, CloudWatch, etc.
    
    if (event.severity === 'CRITICAL' || event.severity === 'HIGH') {
      // Send immediate alert
      console.error('🚨 CRITICAL SECURITY EVENT:', event)
      
      // In production, you might want to:
      // - Send email alerts
      // - Send Slack notifications
      // - Create incident tickets
      // - Trigger automated responses
    }
  }

  // Get security statistics
  getSecurityStats(): {
    totalEvents: number
    blockedIPs: number
    eventsByType: Record<string, number>
    eventsBySeverity: Record<string, number>
    recentEvents: SecurityEvent[]
  } {
    const events = Array.from(securityEvents.values())
    const recentEvents = events
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 50)

    const eventsByType = events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const eventsBySeverity = events.reduce((acc, event) => {
      acc[event.severity] = (acc[event.severity] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      totalEvents: events.length,
      blockedIPs: blockedIPs.size,
      eventsByType,
      eventsBySeverity,
      recentEvents
    }
  }

  // Clean up expired data
  cleanup(): void {
    const now = Date.now()
    
    // Clean up expired IP blocks
    for (const [ip, expiry] of blockedIPs.entries()) {
      if (now > expiry) {
        blockedIPs.delete(ip)
      }
    }

    // Clean up expired rate limit counters
    for (const [key, record] of requestCounters.entries()) {
      if (now > record.resetTime) {
        requestCounters.delete(key)
      }
    }
  }
}

// Export singleton instance
export const securityMonitor = SecurityMonitor.getInstance()

// Cleanup every 5 minutes
setInterval(() => {
  securityMonitor.cleanup()
}, 5 * 60 * 1000)
