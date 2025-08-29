"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  Activity, 
  Clock, 
  Eye,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  User,
  Globe,
  Monitor
} from 'lucide-react'

interface UserProfile {
  ip: string
  deviceFingerprint?: string
  firstSeen: string
  lastSeen: string
  totalSessions: number
  totalPageViews: number
  totalEvents: number
  totalErrors: number
  sessions: Array<{
    sessionId: string
    startTime: string
    lastActivity: string
    pageViews: number
    eventCount: number
    errorCount: number
    currentPage?: string
    events: Array<{
      id: string
      timestamp: string
      type: string
      category: string
      action: string
      url: string
      success: boolean
    }>
  }>
  userAgent: string
  screenResolution?: string
  timezone?: string
  language?: string
}

interface AnalyticsData {
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
  recentEvents: Array<{
    id: string
    timestamp: string
    type: string
    category: string
    action: string
    url: string
    success: boolean
    ip: string
  }>
  recentErrors: Array<{
    id: string
    timestamp: string
    type: string
    severity: string
    message: string
    url: string
    component?: string
  }>
  performanceMetrics: Array<{ metric: string; avgValue: number; unit: string }>
}

export default function EnhancedAnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      console.log('🔍 Fetching enhanced analytics data...')
      
      const response = await fetch('/api/analytics')
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Analytics API error:', response.status, errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      console.log('📊 Enhanced analytics data received:', result.data)
      
      setAnalyticsData(result.data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      console.error('Analytics fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalyticsData()
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchAnalyticsData, 30000)
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

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'PAGE_VIEW': return 'bg-blue-100 text-blue-800'
      case 'CLICK': return 'bg-green-100 text-green-800'
      case 'FORM_SUBMIT': return 'bg-purple-100 text-purple-800'
      case 'CART_ACTION': return 'bg-orange-100 text-orange-800'
      case 'CHECKOUT_STEP': return 'bg-pink-100 text-pink-800'
      case 'API_CALL': return 'bg-indigo-100 text-indigo-800'
      case 'ERROR': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purpleBrand"></div>
            <span className="ml-3 text-purple-800">Loading enhanced analytics data...</span>
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
          <strong>Analytics unavailable:</strong> {error}
        </AlertDescription>
      </Alert>
    )
  }

  if (!analyticsData) {
    return (
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          No analytics data available
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-purple-900">Enhanced Analytics Dashboard</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchAnalyticsData}
            className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Unique Users</p>
                <p className="text-2xl font-bold text-purple-900">{analyticsData.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Total Sessions</p>
                <p className="text-2xl font-bold text-purple-900">{analyticsData.totalSessions}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Total Events</p>
                <p className="text-2xl font-bold text-purple-900">{analyticsData.totalEvents}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Active Sessions</p>
                <p className="text-2xl font-bold text-purple-900">{analyticsData.activeSessions}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users by IP</TabsTrigger>
          <TabsTrigger value="events">Recent Events</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Users by IP Address</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.users.length === 0 ? (
                <div className="text-center py-8 text-purple-700">
                  <Users className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <p>No users found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {analyticsData.users.map((user) => (
                    <div key={user.ip} className="border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5 text-purple-600" />
                          <div>
                            <h3 className="font-semibold text-purple-900">{user.ip}</h3>
                            <p className="text-sm text-purple-700">
                              {user.screenResolution && (
                                <span className="mr-3">📱 {user.screenResolution}</span>
                              )}
                              {user.timezone && (
                                <span className="mr-3">🌍 {user.timezone}</span>
                              )}
                              {user.language && (
                                <span>🗣️ {user.language}</span>
                              )}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(selectedUser?.ip === user.ip ? null : user)}
                        >
                          {selectedUser?.ip === user.ip ? 'Hide Details' : 'View Details'}
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-900">{user.totalSessions}</div>
                          <div className="text-sm text-purple-700">Sessions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-900">{user.totalPageViews}</div>
                          <div className="text-sm text-purple-700">Page Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-900">{user.totalEvents}</div>
                          <div className="text-sm text-purple-700">Events</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-900">{user.totalErrors}</div>
                          <div className="text-sm text-purple-700">Errors</div>
                        </div>
                      </div>

                      <div className="text-sm text-purple-600">
                        <span>First seen: {new Date(user.firstSeen).toLocaleString()}</span>
                        <span className="ml-4">Last seen: {new Date(user.lastSeen).toLocaleString()}</span>
                      </div>

                      {selectedUser?.ip === user.ip && (
                        <div className="mt-4 pt-4 border-t border-purple-200">
                          <h4 className="font-semibold text-purple-800 mb-3">Session Details:</h4>
                          <div className="space-y-3">
                            {user.sessions.map((session) => (
                              <div key={session.sessionId} className="bg-purple-50 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="font-medium text-purple-900">
                                    Session: {session.sessionId.substring(0, 8)}...
                                  </div>
                                  <div className="text-sm text-purple-700">
                                    {new Date(session.startTime).toLocaleString()}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>📄 {session.pageViews} pages</div>
                                  <div>⚡ {session.eventCount} events</div>
                                  <div>❌ {session.errorCount} errors</div>
                                </div>
                                {session.currentPage && (
                                  <div className="text-sm text-purple-600 mt-2">
                                    Current: {session.currentPage}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Recent Events by User</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.recentEvents.length === 0 ? (
                <div className="text-center py-8 text-purple-700">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <p>No recent events</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {analyticsData.recentEvents.slice(0, 20).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center space-x-3">
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type.replace('_', ' ')}
                        </Badge>
                        <div>
                          <div className="font-medium text-purple-900 capitalize">
                            {event.category} - {event.action}
                          </div>
                          <div className="text-sm text-purple-700 truncate max-w-md">
                            {event.url}
                          </div>
                          <div className="text-xs text-purple-600">
                            IP: {event.ip}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-purple-700">
                          {new Date(event.timestamp).toLocaleString()}
                        </div>
                        <Badge className={event.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {event.success ? 'Success' : 'Failed'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Errors Tab */}
        <TabsContent value="errors" className="space-y-6">
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Recent Errors</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.recentErrors.length === 0 ? (
                <div className="text-center py-8 text-purple-700">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <p>No recent errors</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {analyticsData.recentErrors.slice(0, 10).map((error) => (
                    <div key={error.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(error.severity)}>
                            {error.severity}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800">
                            {error.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="text-sm text-red-700">
                          {new Date(error.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-red-900 font-medium mb-1">
                        {error.message}
                      </div>
                      <div className="text-sm text-red-700">
                        {error.url}
                      </div>
                      {error.component && (
                        <div className="text-sm text-red-600 mt-1">
                          Component: {error.component}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Last Updated */}
      <div className="text-center text-sm text-purple-600">
        Last updated: {lastUpdated.toLocaleString()}
      </div>
    </div>
  )
}
