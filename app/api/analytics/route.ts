import { NextRequest, NextResponse } from "next/server"
import { analyticsMonitor } from "@/lib/analytics-monitor"
import { validateOrigin } from "@/lib/security"

// Get client IP from request headers
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(',')[0].trim()
  
  return request.ip || 'unknown'
}

// Analytics API endpoint
export async function GET(request: NextRequest) {
  try {
    // Only allow from trusted origins
    const origin = request.headers.get('origin')
    if (!validateOrigin(origin)) {
      console.warn('Analytics API: Unauthorized origin:', origin)
      return NextResponse.json({ error: 'Unauthorized origin' }, { status: 403 })
    }

    // Get analytics data
    const analyticsData = analyticsMonitor.getAnalyticsData()

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics API called:', {
        totalSessions: analyticsData.totalSessions,
        totalEvents: analyticsData.totalEvents,
        activeSessions: analyticsData.activeSessions,
        origin
      })
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: analyticsData
    })

  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json(
      { error: "Failed to get analytics data" },
      { status: 500 }
    )
  }
}

// Track events endpoint
export async function POST(request: NextRequest) {
  try {
    // Only allow from trusted origins (same-origin requests are allowed)
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    
    // Allow same-origin requests (no origin header) or valid origins
    if (origin && !validateOrigin(origin)) {
      console.warn('Analytics API POST: Unauthorized origin:', origin)
      return NextResponse.json({ error: 'Unauthorized origin' }, { status: 403 })
    }

    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics API POST called:', {
        origin,
        referer,
        type: body?.type,
        hasData: !!body?.data
      })
    }

    const body = await request.json()
    const { type, data } = body

    // Validate request
    if (!type || !data) {
      return NextResponse.json({ error: 'Missing type or data' }, { status: 400 })
    }

    // Track different types of events
    switch (type) {
      case 'create_session':
        // Get real client IP from request headers
        const realIP = getClientIP(request)
        analyticsMonitor.createSession(
          data.sessionId,
          realIP,
          data.userAgent,
          data.referrer,
          {
            deviceFingerprint: data.deviceFingerprint,
            screenResolution: data.screenResolution,
            timezone: data.timezone,
            language: data.language
          }
        )
        break

      case 'page_view':
        analyticsMonitor.trackPageView(
          data.sessionId,
          data.url,
          data.referrer,
          data.duration
        )
        break

      case 'click':
        analyticsMonitor.trackEvent({
          sessionId: data.sessionId,
          ip: getClientIP(request),
          userAgent: data.userAgent || 'unknown',
          type: 'CLICK',
          category: data.category || 'interaction',
          action: 'click',
          details: data.details || {},
          url: data.url,
          success: true
        })
        break

      case 'form_submit':
        analyticsMonitor.trackEvent({
          sessionId: data.sessionId,
          ip: getClientIP(request),
          userAgent: data.userAgent || 'unknown',
          type: 'FORM_SUBMIT',
          category: 'form',
          action: 'submit',
          details: data.details || {},
          url: data.url,
          success: data.success !== false
        })
        break

      case 'cart_action':
        analyticsMonitor.trackCartAction(
          data.sessionId,
          data.action,
          data.productId,
          data.quantity
        )
        break

      case 'checkout_step':
        analyticsMonitor.trackCheckoutStep(
          data.sessionId,
          data.step,
          data.success,
          data.details
        )
        break

      case 'api_call':
        analyticsMonitor.trackAPICall(
          data.sessionId,
          data.endpoint,
          data.method,
          data.success,
          data.duration,
          data.error
        )
        break

      case 'error':
        analyticsMonitor.trackError({
          sessionId: data.sessionId,
          ip: getClientIP(request),
          userAgent: data.userAgent || 'unknown',
          type: data.errorType || 'CLIENT_ERROR',
          severity: data.severity || 'MEDIUM',
          message: data.message,
          stack: data.stack,
          url: data.url,
          component: data.component,
          details: data.details || {},
          resolved: false
        })
        break

      case 'performance':
        analyticsMonitor.trackPerformance({
          sessionId: data.sessionId,
          ip: getClientIP(request),
          userAgent: data.userAgent || 'unknown',
          type: data.performanceType || 'COMPONENT_RENDER',
          metric: data.metric,
          value: data.value,
          unit: data.unit || 'ms',
          url: data.url,
          details: data.details || {}
        })
        break

      default:
        return NextResponse.json({ error: 'Invalid event type' }, { status: 400 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Analytics tracking error:", error)
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    )
  }
}

// Get session details or user journey
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, ip, deviceFingerprint, type = 'session' } = body

    if (type === 'user_journey') {
      // Get user journey by IP or device fingerprint
      if (!ip && !deviceFingerprint) {
        return NextResponse.json({ error: 'IP or device fingerprint required' }, { status: 400 })
      }

      const identifier = ip || deviceFingerprint
      const journeyType = ip ? 'ip' : 'device'
      const userJourney = analyticsMonitor.getUserJourney(identifier, journeyType)

      return NextResponse.json({
        success: true,
        data: userJourney
      })
    } else {
      // Get session details
      if (!sessionId) {
        return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
      }

      const sessionDetails = analyticsMonitor.getSessionDetails(sessionId)

      if (!sessionDetails) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        data: sessionDetails
      })
    }

  } catch (error) {
    console.error("Session details error:", error)
    return NextResponse.json(
      { error: "Failed to get session details" },
      { status: 500 }
    )
  }
}

// Block other HTTP methods
export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
