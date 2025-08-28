import { NextRequest, NextResponse } from "next/server"
import { securityMonitor } from "@/lib/security-monitor"
import { validateOrigin } from "@/lib/security"

// Security status endpoint for monitoring
export async function GET(request: NextRequest) {
  try {
    // Only allow from trusted origins
    const origin = request.headers.get('origin')
    if (!validateOrigin(origin)) {
      return NextResponse.json({ error: 'Unauthorized origin' }, { status: 403 })
    }

    // Check if IP is blocked
    const ip = securityMonitor.getClientIP(request)
    if (securityMonitor.isIPBlocked(ip)) {
      return NextResponse.json({ error: 'IP blocked' }, { status: 403 })
    }

    // Check rate limiting
    if (!securityMonitor.checkRateLimit(ip, '/api/security/status')) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
    }

    // Get security statistics
    const stats = securityMonitor.getSecurityStats()

    // Return sanitized security information
    return NextResponse.json({
      status: 'operational',
      timestamp: new Date().toISOString(),
      security: {
        totalEvents: stats.totalEvents,
        blockedIPs: stats.blockedIPs,
        eventsByType: stats.eventsByType,
        eventsBySeverity: stats.eventsBySeverity,
        recentEvents: stats.recentEvents.slice(0, 10).map(event => ({
          id: event.id,
          timestamp: event.timestamp,
          type: event.type,
          severity: event.severity,
          endpoint: event.endpoint,
          blocked: event.blocked
        }))
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        supabaseConfigured: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && 
                              process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"),
        stripeConfigured: !!process.env.STRIPE_SECRET_KEY
      }
    })

  } catch (error) {
    console.error("Security status error:", error)
    return NextResponse.json(
      { error: "Failed to get security status" },
      { status: 500 }
    )
  }
}

// Block other HTTP methods
export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
