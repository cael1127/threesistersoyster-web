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

// Enhanced data structure for better organization
interface UserSession {
  sessionId: string
  startTime: Date
  lastActivity: Date
  ip: string
  userAgent: string
  deviceFingerprint?: string
  screenResolution?: string
  timezone?: string
  language?: string
  pageViews: number
  eventCount: number
  errorCount: number
  currentPage?: string
  referrer?: string
  events: UserEvent[]
  errors: ErrorEvent[]
  performance: PerformanceEvent[]
}

interface UserProfile {
  ip: string
  deviceFingerprint?: string
  firstSeen: Date
  lastSeen: Date
  totalSessions: number
  totalPageViews: number
  totalEvents: number
  totalErrors: number
  sessions: UserSession[]
  userAgent: string
  screenResolution?: string
  timezone?: string
  language?: string
}

// Organized data stores
const userProfiles = new Map<string, UserProfile>() // Key: IP address
const sessions = new Map<string, UserSession>() // Key: sessionId
const events = new Map<string, UserEvent>() // Key: eventId
const errorEvents = new Map<string, ErrorEvent>() // Key: errorId
const performanceEvents = new Map<string, PerformanceEvent>() // Key: performanceId

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

  // Generate unique ID
  private generateId(): string {
    try {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID()
      }
    } catch (error) {
      console.warn('Crypto.randomUUID failed, using fallback:', error)
    }
    // Fallback for environments without crypto.randomUUID
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Get or create user profile (internal)
  private ensureUserProfile(ip: string, userAgent: string, additionalData?: {
    deviceFingerprint?: string
    screenResolution?: string
    timezone?: string
    language?: string
  }): UserProfile {
    let profile = userProfiles.get(ip)
    
    if (!profile) {
      profile = {
        ip,
        deviceFingerprint: additionalData?.deviceFingerprint,
        firstSeen: new Date(),
        lastSeen: new Date(),
        totalSessions: 0,
        totalPageViews: 0,
        totalEvents: 0,
        totalErrors: 0,
        sessions: [],
        userAgent,
        screenResolution: additionalData?.screenResolution,
        timezone: additionalData?.timezone,
        language: additionalData?.language
      }
      userProfiles.set(ip, profile)
    } else {
      // Update existing profile
      profile.lastSeen = new Date()
      if (additionalData?.deviceFingerprint) profile.deviceFingerprint = additionalData.deviceFingerprint
      if (additionalData?.screenResolution) profile.screenResolution = additionalData.screenResolution
      if (additionalData?.timezone) profile.timezone = additionalData.timezone
      if (additionalData?.language) profile.language = additionalData.language
    }
    
    return profile
  }

  // Track user events
  trackEvent(event: Omit<UserEvent, 'id' | 'timestamp'>): void {
    const userEvent: UserEvent = {
      ...event,
      id: this.generateId(),
      timestamp: new Date(),
    }

    // Store event globally
    events.set(userEvent.id, userEvent)

    // Add to session
    const session = sessions.get(userEvent.sessionId)
    if (session) {
      session.events.push(userEvent)
      session.eventCount++
      session.lastActivity = userEvent.timestamp
      session.currentPage = userEvent.url
    }

    // Update user profile
    const profile = userProfiles.get(userEvent.ip)
    if (profile) {
      profile.totalEvents++
      profile.lastSeen = userEvent.timestamp
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 User Event:`, {
        type: event.type,
        category: event.category,
        action: event.action,
        url: event.url,
        success: event.success,
        sessionId: event.sessionId,
        ip: event.ip,
        totalEvents: events.size
      })
    }
  }

  // Track errors
  trackError(error: Omit<ErrorEvent, 'id' | 'timestamp'>): void {
    const errorEvent: ErrorEvent = {
      ...error,
      id: this.generateId(),
      timestamp: new Date(),
    }

    // Store error
    errorEvents.set(errorEvent.id, errorEvent)

    // Update session if present
    const sessionForError = sessions.get(errorEvent.sessionId)
    if (sessionForError) {
      sessionForError.errors.push(errorEvent)
      sessionForError.errorCount += 1
      sessionForError.lastActivity = errorEvent.timestamp
    }

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
      id: this.generateId(),
      timestamp: new Date(),
    }

    // Store performance event
    performanceEvents.set(performanceEvent.id, performanceEvent)

    // Update session if present
    const sessionForPerformance = sessions.get(performanceEvent.sessionId)
    if (sessionForPerformance) {
      sessionForPerformance.performance.push(performanceEvent)
      sessionForPerformance.lastActivity = performanceEvent.timestamp
    }

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
  createSession(sessionId: string, ip: string, userAgent: string, referrer?: string, additionalData?: {
    deviceFingerprint?: string
    screenResolution?: string
    timezone?: string
    language?: string
  }): void {
    // Get or create user profile
    const profile = this.ensureUserProfile(ip, userAgent, additionalData)
    
    // Create new session
    const session: UserSession = {
      sessionId,
      startTime: new Date(),
      lastActivity: new Date(),
      ip,
      userAgent,
      deviceFingerprint: additionalData?.deviceFingerprint,
      screenResolution: additionalData?.screenResolution,
      timezone: additionalData?.timezone,
      language: additionalData?.language,
      pageViews: 0,
      eventCount: 0,
      errorCount: 0,
      referrer,
      events: [],
      errors: [],
      performance: []
    }

    // Store session
    sessions.set(sessionId, session)
    
    // Add to user profile
    profile.sessions.push(session)
    profile.totalSessions++
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Analytics session created:', {
        sessionId,
        ip,
        totalSessions: sessions.size,
        totalUsers: userProfiles.size,
        userAgent: userAgent.substring(0, 50) + '...',
        deviceFingerprint: additionalData?.deviceFingerprint
      })
    }
  }



  // Track page view
  trackPageView(sessionId: string, url: string, referrer?: string, duration?: number): void {
    const session = sessions.get(sessionId)
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
    session.pageViews++
    session.lastActivity = new Date()
    session.currentPage = url

    // Update user profile
    const profile = userProfiles.get(session.ip)
    if (profile) {
      profile.totalPageViews++
    }
  }

  // Track cart actions
  trackCartAction(sessionId: string, action: 'add' | 'remove' | 'update' | 'clear', productId: string, quantity?: number): void {
    const session = sessions.get(sessionId)
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
    const session = sessions.get(sessionId)
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
    const session = sessions.get(sessionId)
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

  // Get analytics data - organized by users
  getAnalyticsData(): {
    totalUsers: number
    totalSessions: number
    totalEvents: number
    totalErrors: number
    activeSessions: number
    users: UserProfile[]
    eventsByType: Record<string, number>
    errorsByType: Record<string, number>
    errorsBySeverity: Record<string, number>
    topPages: Array<{ url: string; views: number }>
    recentEvents: UserEvent[]
    recentErrors: ErrorEvent[]
    performanceMetrics: Array<{ metric: string; avgValue: number; unit: string }>
  } {
    const allEvents = Array.from(events.values())
    const allErrors = Array.from(errorEvents.values())
    const allPerformance = Array.from(performanceEvents.values())
    const allSessions = Array.from(sessions.values())
    const allUsers = Array.from(userProfiles.values())

    // Calculate active sessions (last 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)
    const activeSessions = allSessions.filter(s => s.lastActivity > thirtyMinutesAgo).length

    // Events by type
    const eventsByType = allEvents.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Errors by type and severity
    const errorsByType = allErrors.reduce((acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const errorsBySeverity = allErrors.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Top pages
    const pageViews = allEvents.filter(e => e.type === 'PAGE_VIEW')
    const pageCounts = pageViews.reduce((acc, event) => {
      acc[event.url] = (acc[event.url] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topPages = Object.entries(pageCounts)
      .map(([url, views]) => ({ url, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    // Performance metrics
    const performanceByMetric = allPerformance.reduce((acc, perf) => {
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
      totalUsers: allUsers.length,
      totalSessions: allSessions.length,
      totalEvents: allEvents.length,
      totalErrors: allErrors.length,
      activeSessions,
      users: allUsers.sort((a, b) => b.lastSeen.getTime() - a.lastSeen.getTime()),
      eventsByType,
      errorsByType,
      errorsBySeverity,
      topPages,
      recentEvents: allEvents
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 50),
      recentErrors: allErrors
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 20),
      performanceMetrics
    }
  }

  // Get user profile by IP
  getUserProfile(ip: string): UserProfile | null {
    return userProfiles.get(ip) || null
  }

  // Get all user profiles
  getAllUserProfiles(): UserProfile[] {
    return Array.from(userProfiles.values()).sort((a, b) => b.lastSeen.getTime() - a.lastSeen.getTime())
  }

  // Get session details
  getSessionDetails(sessionId: string): UserSession | null {
    return sessions.get(sessionId) || null
  }

  // Get user journey by IP
  getUserJourney(ip: string): UserProfile | null {
    return this.getUserProfile(ip)
  }

  // Clean up old data
  private cleanupEvents(): void {
    const now = Date.now()
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours

    // Clean up old events
    if (events.size > MAX_EVENTS) {
      const recentEvents = Array.from(events.values())
        .filter(e => now - e.timestamp.getTime() < maxAge)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, MAX_EVENTS / 2)
      
      events.clear()
      recentEvents.forEach(event => events.set(event.id, event))
    }

    // Clean up old errors
    if (errorEvents.size > MAX_EVENTS) {
      const recentErrors = Array.from(errorEvents.values())
        .filter(e => now - e.timestamp.getTime() < maxAge)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, MAX_EVENTS / 2)
      
      errorEvents.clear()
      recentErrors.forEach(error => errorEvents.set(error.id, error))
    }

    // Clean up old sessions and user profiles
    if (sessions.size > MAX_SESSIONS) {
      const recentSessions = Array.from(sessions.values())
        .filter(s => now - s.lastActivity.getTime() < maxAge)
        .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
        .slice(0, MAX_SESSIONS / 2)
      
      sessions.clear()
      recentSessions.forEach(session => sessions.set(session.sessionId, session))
      
      // Update user profiles to remove old sessions
      userProfiles.forEach(profile => {
        profile.sessions = profile.sessions.filter(s => 
          recentSessions.some(rs => rs.sessionId === s.sessionId)
        )
      })
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

// Debug: Log when analytics monitor is created
if (process.env.NODE_ENV === 'development') {
  console.log('🔍 Analytics Monitor initialized')
}

// Cleanup disabled to retain interactions
