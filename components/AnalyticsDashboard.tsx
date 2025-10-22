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
  Clock, 
  Eye,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from 'lucide-react'

interface AnalyticsData {
  totalEvents: number
  totalErrors: number
  totalSessions: number
  activeSessions: number
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

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      console.log('🔍 Fetching analytics data...')
      
      const response = await fetch('/api/analytics')
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Analytics API error:', response.status, errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      console.log('📊 Analytics data received:', result.data)
      
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
            <span className="ml-3 text-purple-800">Loading analytics data...</span>
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
          <h2 className="text-2xl font-bold text-purple-900">Analytics Dashboard</h2>
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
                <p className="text-sm font-medium text-purple-700">Total Events</p>
                <p className="text-2xl font-bold text-purple-900">{analyticsData.totalEvents.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
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
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Total Errors</p>
                <p className="text-2xl font-bold text-purple-900">{analyticsData.totalErrors}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
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
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Events by Type */}
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Events by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(analyticsData.eventsByType).map(([type, count]) => (
                  <div key={type} className="text-center">
                    <div className="text-xl font-bold text-purple-900">{count}</div>
                    <Badge className={getEventTypeColor(type)}>
                      {type.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.topPages.slice(0, 10).map((page, index) => (
                  <div key={page.url} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-purple-100 text-purple-800">
                        #{index + 1}
                      </Badge>
                      <span className="text-purple-900 font-medium truncate max-w-md">
                        {page.url}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-900">{page.views}</div>
                      <div className="text-sm text-purple-700">views</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Recent Events</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.recentEvents.length === 0 ? (
                <div className="text-center py-8 text-purple-700">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-purple-400" />
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
          {/* Errors by Severity */}
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Errors by Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(analyticsData.errorsBySeverity).map(([severity, count]) => (
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

          {/* Recent Errors */}
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

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.performanceMetrics.length === 0 ? (
                <div className="text-center py-8 text-purple-700">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <p>No performance data available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {analyticsData.performanceMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div>
                        <div className="font-medium text-purple-900 capitalize">
                          {metric.metric.replace('_', ' ')}
                        </div>
                        <div className="text-sm text-purple-700">
                          Average value
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-900">
                          {metric.avgValue.toFixed(2)}
                        </div>
                        <div className="text-sm text-purple-700">
                          {metric.unit}
                        </div>
                      </div>
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
