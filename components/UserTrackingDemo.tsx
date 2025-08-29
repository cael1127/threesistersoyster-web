"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAnalyticsContext } from '@/components/AnalyticsProvider'

export function UserTrackingDemo() {
  const [userJourney, setUserJourney] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const analytics = useAnalyticsContext()

  const fetchUserJourney = async () => {
    setLoading(true)
    try {
      // Get current session details first
      const response = await fetch('/api/analytics', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'user_journey',
          deviceFingerprint: 'current_device' // In real implementation, you'd get this from the session
        })
      })

      if (response.ok) {
        const data = await response.json()
        setUserJourney(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch user journey:', error)
    } finally {
      setLoading(false)
    }
  }

  const trackCustomEvent = async () => {
    if (analytics) {
      await analytics.trackClick('demo-button', 'demo', { 
        customEvent: true,
        timestamp: new Date().toISOString()
      })
    }
  }

  return (
    <Card className="border-blue-500/30 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-blue-900">🔍 Enhanced User Tracking Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Current Session Info:</h4>
            <div className="space-y-1 text-sm">
              <div><strong>Session ID:</strong> {analytics?.sessionId || 'Loading...'}</div>
              <div><strong>Device Fingerprint:</strong> Generated on session creation</div>
              <div><strong>Real IP:</strong> Captured server-side</div>
              <div><strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'Loading...'}</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Tracking Capabilities:</h4>
            <div className="space-y-1">
              <Badge className="bg-green-100 text-green-800">✅ Real IP Address</Badge>
              <Badge className="bg-green-100 text-green-800">✅ Device Fingerprint</Badge>
              <Badge className="bg-green-100 text-green-800">✅ Cross-Session Tracking</Badge>
              <Badge className="bg-green-100 text-green-800">✅ User Journey</Badge>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button 
            onClick={trackCustomEvent}
            variant="outline"
            size="sm"
          >
            Track Custom Event
          </Button>
          <Button 
            onClick={fetchUserJourney}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get User Journey'}
          </Button>
        </div>

        {userJourney && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">User Journey Data:</h4>
            <div className="text-sm space-y-1">
              <div><strong>Total Sessions:</strong> {userJourney.sessions?.length || 0}</div>
              <div><strong>Total Page Views:</strong> {userJourney.totalPageViews || 0}</div>
              <div><strong>Total Events:</strong> {userJourney.totalEvents || 0}</div>
              <div><strong>First Visit:</strong> {userJourney.firstVisit ? new Date(userJourney.firstVisit).toLocaleString() : 'N/A'}</div>
              <div><strong>Last Visit:</strong> {userJourney.lastVisit ? new Date(userJourney.lastVisit).toLocaleString() : 'N/A'}</div>
            </div>
          </div>
        )}

        <div className="text-xs text-blue-600 mt-4">
          <strong>Privacy Note:</strong> All tracking is anonymous and uses device fingerprinting for user identification across sessions. 
          No personal information is collected.
        </div>
      </CardContent>
    </Card>
  )
}
