import { NextRequest } from 'next/server'

// User activity and analytics monitoring system
export interface UserEvent {
  id: string
  timestamp: Date
  sessionId: string
  userId?: string
  ip: string
  userAgent: string
  type: 'PAGE_VIEW' | 'CLICK' | 'FORM_SUBMIT' | 'API_CALL' | 'ERROR' | 'PERFORMANCE' | 'CART_ACTION' | 'CHECKOUT_STEP'
  category: string
  action: string
  details: Record<string, any>
  url: string
  referrer?: string
  duration?: number
  success: boolean
}

export interface ErrorEvent {
  id: string
  timestamp: Date
  sessionId: string
  userId?: string
  ip: string
  userAgent: string
  type: 'CLIENT_ERROR' | 'SERVER_ERROR' | 'API_ERROR' | 'VALIDATION_ERROR' | 'NETWORK_ERROR'
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  message: string
  stack?: string
  url: string
  component?: string
  details: Record<string, any>
  resolved: boolean
}

export interface PerformanceEvent {
  id: string
  timestamp: Date
  sessionId: string
  userId?: string
  ip: string
  type: 'PAGE_LOAD' | 'API_RESPONSE' | 'COMPONENT_RENDER' | 'DATABASE_QUERY'
  metric: string
  value: number
  unit: 'ms' | 'bytes' | 'count'
  url: string
  details: Record<string, any>
}

// In-memory stores (use Redis/database in production)
const userEvents = new Map<string, UserEvent>()
const errorEvents = new Map<string, ErrorEvent>()
const performanceEvents = new Map<string, PerformanceEvent>()
const userSessions = new Map<string, {
  sessionId: string
  startTime: Date
  lastActivity: Date
  userId?: string
  ip: string
  userAgent: string
  pageViews: number
  events: number
  errors: number
  currentPage?: string
  referrer?: string
}>()

const MAX_EVENTS = 50000
const MAX_SESSIONS = 10000

export class AnalyticsMonitor {
  private static instance: AnalyticsMonitor

  static getInstance(): AnalyticsMonitor {
    if (!AnalyticsMonitor.instance) {
      AnalyticsMonitor.instance = new AnalyticsMonitor()
    }
    return AnalyticsMonitor.instance
  }

  // Track user events
  trackEvent(event: Omit<UserEvent, 'id' | 'timestamp'>): void {
    const userEvent: UserEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }

    // Store event
    userEvents.set(userEvent.id, userEvent)

    // Update session
    this.updateSession(userEvent.sessionId, {
      lastActivity: userEvent.timestamp,
      events: 1,
      currentPage: userEvent.url
    })

    // Clean up old events
    this.cleanupEvents()

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 User Event:`, {
        type: event.type,
        category: event.category,
        action: event.action,
        url: event.url,
        success: event.success,
        sessionId: event.sessionId,
        totalEvents: userEvents.size
      })
    }
  }

  // Track errors
  trackError(error: Omit<ErrorEvent, 'id' | 'timestamp'>): void {
    const errorEvent: ErrorEvent = {
      ...error,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }

    // Store error
    errorEvents.set(errorEvent.id, errorEvent)

    // Update session
    this.updateSession(errorEvent.sessionId, {
      lastActivity: errorEvent.timestamp,
      errors: 1
    })

    // Clean up old events
    this.cleanupEvents()

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`🚨 Error Event [${error.severity}]:`, {
        type: error.type,
        message: error.message,
        url: error.url,
        component: error.component
      })
    }

    // Send critical errors to monitoring service
    if (error.severity === 'CRITICAL' || error.severity === 'HIGH') {
      this.sendErrorAlert(errorEvent)
    }
  }

  // Track performance metrics
  trackPerformance(performance: Omit<PerformanceEvent, 'id' | 'timestamp'>): void {
    const performanceEvent: PerformanceEvent = {
      ...performance,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }

    // Store performance event
    performanceEvents.set(performanceEvent.id, performanceEvent)

    // Clean up old events
    this.cleanupEvents()

    // Log slow operations
    if (performanceEvent.value > 1000 && performanceEvent.unit === 'ms') {
      console.warn(`🐌 Slow Operation:`, {
        type: performance.type,
        metric: performance.metric,
        value: performance.value,
        unit: performance.unit,
        url: performance.url
      })
    }
  }

  // Create or update user session
  createSession(sessionId: string, ip: string, userAgent: string, referrer?: string): void {
    const session = {
      sessionId,
      startTime: new Date(),
      lastActivity: new Date(),
      ip,
      userAgent,
      pageViews: 0,
      events: 0,
      errors: 0,
      referrer
    }

    userSessions.set(sessionId, session)
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Analytics session created:', {
        sessionId,
        totalSessions: userSessions.size,
        userAgent: userAgent.substring(0, 50) + '...'
      })
    }
  }

  // Update session data
  private updateSession(sessionId: string, updates: Partial<typeof userSessions.values extends Map<string, infer U> ? U : never>): void {
    const session = userSessions.get(sessionId)
    if (session) {
      Object.assign(session, updates)
      userSessions.set(sessionId, session)
    }
  }

  // Track page view
  trackPageView(sessionId: string, url: string, referrer?: string, duration?: number): void {
    const session = userSessions.get(sessionId)
    if (!session) {
      console.warn('Analytics: Session not found for page view:', sessionId)
      return
    }

    this.trackEvent({
      sessionId,
      ip: session.ip,
      userAgent: session.userAgent,
      type: 'PAGE_VIEW',
      category: 'navigation',
      action: 'page_view',
      details: { referrer, duration },
      url,
      referrer,
      duration,
      success: true
    })

    // Update session
    this.updateSession(sessionId, {
      lastActivity: new Date(),
      pageViews: 1,
      currentPage: url
    })
  }

  // Track cart actions
  trackCartAction(sessionId: string, action: 'add' | 'remove' | 'update' | 'clear', productId: string, quantity?: number): void {
    const session = userSessions.get(sessionId)
    if (!session) return

    this.trackEvent({
      sessionId,
      ip: session.ip,
      userAgent: session.userAgent,
      type: 'CART_ACTION',
      category: 'ecommerce',
      action: `cart_${action}`,
      details: { productId, quantity },
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      success: true
    })
  }

  // Track checkout steps
  trackCheckoutStep(sessionId: string, step: string, success: boolean, details?: Record<string, any>): void {
    const session = userSessions.get(sessionId)
    if (!session) return

    this.trackEvent({
      sessionId,
      ip: session.ip,
      userAgent: session.userAgent,
      type: 'CHECKOUT_STEP',
      category: 'ecommerce',
      action: `checkout_${step}`,
      details: details || {},
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      success
    })
  }

  // Track API calls
  trackAPICall(sessionId: string, endpoint: string, method: string, success: boolean, duration?: number, error?: string): void {
    const session = userSessions.get(sessionId)
    if (!session) return

    this.trackEvent({
      sessionId,
      ip: session.ip,
      userAgent: session.userAgent,
      type: 'API_CALL',
      category: 'api',
      action: `${method.toLowerCase()}_${endpoint}`,
      details: { endpoint, method, duration, error },
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      duration,
      success
    })
  }

  // Get analytics data
  getAnalyticsData(): {
    totalEvents: number
    totalErrors: number
    totalSessions: number
    activeSessions: number
    eventsByType: Record<string, number>
    errorsByType: Record<string, number>
    errorsBySeverity: Record<string, number>
    topPages: Array<{ url: string; views: number }>
    recentEvents: UserEvent[]
    recentErrors: ErrorEvent[]
    performanceMetrics: Array<{ metric: string; avgValue: number; unit: string }>
  } {
    const events = Array.from(userEvents.values())
    const errors = Array.from(errorEvents.values())
    const performance = Array.from(performanceEvents.values())
    const sessions = Array.from(userSessions.values())

    // Calculate active sessions (last 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)
    const activeSessions = sessions.filter(s => s.lastActivity > thirtyMinutesAgo).length

    // Events by type
    const eventsByType = events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Errors by type and severity
    const errorsByType = errors.reduce((acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const errorsBySeverity = errors.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Top pages
    const pageViews = events.filter(e => e.type === 'PAGE_VIEW')
    const pageCounts = pageViews.reduce((acc, event) => {
      acc[event.url] = (acc[event.url] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topPages = Object.entries(pageCounts)
      .map(([url, views]) => ({ url, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    // Performance metrics
    const performanceByMetric = performance.reduce((acc, perf) => {
      if (!acc[perf.metric]) {
        acc[perf.metric] = { values: [], unit: perf.unit }
      }
      acc[perf.metric].values.push(perf.value)
      return acc
    }, {} as Record<string, { values: number[]; unit: string }>)

    const performanceMetrics = Object.entries(performanceByMetric).map(([metric, data]) => ({
      metric,
      avgValue: data.values.reduce((sum, val) => sum + val, 0) / data.values.length,
      unit: data.unit
    }))

    return {
      totalEvents: events.length,
      totalErrors: errors.length,
      totalSessions: sessions.length,
      activeSessions,
      eventsByType,
      errorsByType,
      errorsBySeverity,
      topPages,
      recentEvents: events
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 50),
      recentErrors: errors
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 20),
      performanceMetrics
    }
  }

  // Get session details
  getSessionDetails(sessionId: string): {
    session: any
    events: UserEvent[]
    errors: ErrorEvent[]
    performance: PerformanceEvent[]
  } | null {
    const session = userSessions.get(sessionId)
    if (!session) return null

    const events = Array.from(userEvents.values()).filter(e => e.sessionId === sessionId)
    const errors = Array.from(errorEvents.values()).filter(e => e.sessionId === sessionId)
    const performance = Array.from(performanceEvents.values()).filter(p => p.sessionId === sessionId)

    return {
      session,
      events: events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
      errors: errors.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
      performance: performance.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    }
  }

  // Clean up old data
  private cleanupEvents(): void {
    const now = Date.now()
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours

    // Clean up old events
    if (userEvents.size > MAX_EVENTS) {
      const events = Array.from(userEvents.values())
        .filter(e => now - e.timestamp.getTime() < maxAge)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, MAX_EVENTS / 2)
      
      userEvents.clear()
      events.forEach(event => userEvents.set(event.id, event))
    }

    // Clean up old errors
    if (errorEvents.size > MAX_EVENTS) {
      const errors = Array.from(errorEvents.values())
        .filter(e => now - e.timestamp.getTime() < maxAge)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, MAX_EVENTS / 2)
      
      errorEvents.clear()
      errors.forEach(error => errorEvents.set(error.id, error))
    }

    // Clean up old sessions
    if (userSessions.size > MAX_SESSIONS) {
      const sessions = Array.from(userSessions.values())
        .filter(s => now - s.lastActivity.getTime() < maxAge)
        .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
        .slice(0, MAX_SESSIONS / 2)
      
      userSessions.clear()
      sessions.forEach(session => userSessions.set(session.sessionId, session))
    }
  }

  // Send error alerts
  private sendErrorAlert(error: ErrorEvent): void {
    if (process.env.NODE_ENV === 'production') {
      // Send to external monitoring service
      console.error('🚨 CRITICAL ERROR ALERT:', {
        type: error.type,
        severity: error.severity,
        message: error.message,
        url: error.url,
        sessionId: error.sessionId,
        timestamp: error.timestamp
      })

      // In production, you might want to:
      // - Send email alerts
      // - Send Slack notifications
      // - Create incident tickets
      // - Send to Sentry, DataDog, etc.
    }
  }
}

// Export singleton instance
export const analyticsMonitor = AnalyticsMonitor.getInstance()

// Cleanup every 10 minutes
setInterval(() => {
  analyticsMonitor['cleanupEvents']()
}, 10 * 60 * 1000)
