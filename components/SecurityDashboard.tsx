"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  BarChart3,
  Eye,
  EyeOff
} from 'lucide-react'

interface SecurityEvent {
  id: string
  timestamp: string
  type: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  endpoint: string
  blocked: boolean
}

interface SecurityStats {
  totalEvents: number
  blockedIPs: number
  eventsByType: Record<string, number>
  eventsBySeverity: Record<string, number>
  recentEvents: SecurityEvent[]
}

interface SecurityStatus {
  status: string
  timestamp: string
  security: SecurityStats
  environment: {
    nodeEnv: string
    supabaseConfigured: boolean
    stripeConfigured: boolean
  }
}

export default function SecurityDashboard() {
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const fetchSecurityStatus = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/security/status')
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setSecurityStatus(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch security status')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSecurityStatus()
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchSecurityStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'degraded': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'down': return <XCircle className="w-5 h-5 text-red-600" />
      default: return <BarChart3 className="w-5 h-5 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purpleBrand"></div>
            <span className="ml-3 text-purple-800">Loading security status...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Security monitoring unavailable:</strong> {error}
        </AlertDescription>
      </Alert>
    )
  }

  if (!securityStatus) {
    return (
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          No security data available
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-purple-900">Security Dashboard</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10"
          >
            {showDetails ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchSecurityStatus}
            className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* System Status */}
      <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-900">
            {getStatusIcon(securityStatus.status)}
            <span>System Status</span>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              {securityStatus.status.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-900">
                {securityStatus.security.totalEvents}
              </div>
              <div className="text-sm text-purple-700">Total Security Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-900">
                {securityStatus.security.blockedIPs}
              </div>
              <div className="text-sm text-purple-700">Blocked IPs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-900">
                {securityStatus.environment.supabaseConfigured && securityStatus.environment.stripeConfigured ? '2' : '1'}
              </div>
              <div className="text-sm text-purple-700">Services Configured</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environment Status */}
      <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-purple-900">Environment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-purple-800">Environment:</span>
              <Badge className={securityStatus.environment.nodeEnv === 'production' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                {securityStatus.environment.nodeEnv}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-800">Supabase:</span>
              <Badge className={securityStatus.environment.supabaseConfigured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {securityStatus.environment.supabaseConfigured ? 'Configured' : 'Not Configured'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-800">Stripe:</span>
              <Badge className={securityStatus.environment.stripeConfigured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {securityStatus.environment.stripeConfigured ? 'Configured' : 'Not Configured'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Events by Type */}
      <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-purple-900">Security Events by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(securityStatus.security.eventsByType).map(([type, count]) => (
              <div key={type} className="text-center">
                <div className="text-xl font-bold text-purple-900">{count}</div>
                <div className="text-sm text-purple-700 capitalize">{type.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Events by Severity */}
      <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-purple-900">Security Events by Severity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(securityStatus.security.eventsBySeverity).map(([severity, count]) => (
              <div key={severity} className="text-center">
                <div className="text-xl font-bold text-purple-900">{count}</div>
                <Badge className={getSeverityColor(severity)}>
                  {severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Security Events */}
      {showDetails && (
        <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-900">Recent Security Events</CardTitle>
          </CardHeader>
          <CardContent>
            {securityStatus.security.recentEvents.length === 0 ? (
              <div className="text-center py-8 text-purple-700">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <p>No recent security events</p>
              </div>
            ) : (
              <div className="space-y-3">
                {securityStatus.security.recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-3">
                      <Badge className={getSeverityColor(event.severity)}>
                        {event.severity}
                      </Badge>
                      <div>
                        <div className="font-medium text-purple-900 capitalize">
                          {event.type.replace('_', ' ')}
                        </div>
                        <div className="text-sm text-purple-700">
                          {event.endpoint}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-purple-700">
                        {new Date(event.timestamp).toLocaleString()}
                      </div>
                      {event.blocked && (
                        <Badge className="bg-red-100 text-red-800 border-red-200 mt-1">
                          Blocked
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Last Updated */}
      <div className="text-center text-sm text-purple-600">
        Last updated: {new Date(securityStatus.timestamp).toLocaleString()}
      </div>
    </div>
  )
}
