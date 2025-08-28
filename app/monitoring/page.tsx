"use client"

import { Suspense, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Monitor, 
  Shield, 
  BarChart3, 
  AlertTriangle, 
  Lock,
  Activity,
  Users,
  Eye
} from 'lucide-react'
import SecurityDashboard from '@/components/SecurityDashboard'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import Navigation from '@/components/Navigation'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

// Loading component for monitoring dashboard
function MonitoringDashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <SeasonalFloatingParticles count={8} />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purpleBrand mx-auto mb-4"></div>
              <h2 className="text-xl font-bold text-purple-900 mb-2">Loading Monitoring Dashboard</h2>
              <p className="text-purple-700">Initializing comprehensive monitoring system...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Access control component
function AccessControl() {
  const [hasAccess, setHasAccess] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Simple access control - in production, implement proper authentication
    const checkAccess = async () => {
      try {
        // Check if user has admin access (implement your own logic)
        const isAdmin = localStorage.getItem('admin_access') === 'true' || 
                       process.env.NODE_ENV === 'development'
        
        setHasAccess(isAdmin)
      } catch (error) {
        setHasAccess(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkAccess()
  }, [])

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
        <SeasonalFloatingParticles count={8} />
        <Navigation />
        
        <div className="container mx-auto px-4 py-12">
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purpleBrand mx-auto mb-4"></div>
                <h2 className="text-xl font-bold text-purple-900 mb-2">Verifying Access</h2>
                <p className="text-purple-700">Checking monitoring dashboard permissions...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
        <SeasonalFloatingParticles count={8} />
        <Navigation />
        
        <div className="container mx-auto px-4 py-12">
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center">
                <Lock className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-purple-900 mb-4">Access Denied</h2>
                <p className="text-purple-700 mb-6">
                  You don't have permission to access the monitoring dashboard.
                </p>
                <Alert className="border-red-200 bg-red-50 max-w-md mx-auto">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Restricted Access:</strong> This dashboard contains sensitive monitoring information and is restricted to authorized personnel only.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <SeasonalFloatingParticles count={8} />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Monitor className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-purple-900">Monitoring Dashboard</h1>
          </div>
          <p className="text-purple-700 max-w-2xl mx-auto">
            Comprehensive monitoring of security events, user analytics, and system performance for Three Sisters Oyster Co.
          </p>
        </div>

        {/* Monitoring Notice */}
        <Alert className="border-blue-200 bg-blue-50 mb-6">
          <Activity className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Real-time Monitoring:</strong> This dashboard provides live monitoring of security events, user behavior, and system performance. 
            All data is collected for security and user experience improvement purposes.
          </AlertDescription>
        </Alert>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">Security</div>
              <div className="text-sm text-purple-700">Threat Detection</div>
            </CardContent>
          </Card>

          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">Analytics</div>
              <div className="text-sm text-purple-700">User Behavior</div>
            </CardContent>
          </Card>

          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">Users</div>
              <div className="text-sm text-purple-700">Active Sessions</div>
            </CardContent>
          </Card>

          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">Performance</div>
              <div className="text-sm text-purple-700">System Health</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Security Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>User Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="security">
            <Suspense fallback={<MonitoringDashboardLoading />}>
              <SecurityDashboard />
            </Suspense>
          </TabsContent>

          <TabsContent value="analytics">
            <Suspense fallback={<MonitoringDashboardLoading />}>
              <AnalyticsDashboard />
            </Suspense>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-purple-900 mb-2">Monitoring System Status</h3>
              <div className="flex items-center justify-center space-x-4">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Security Active
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Analytics Active
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Real-time Updates
                </Badge>
              </div>
              <p className="text-sm text-purple-700 mt-4">
                Last updated: {new Date().toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function MonitoringDashboardPage() {
  return <AccessControl />
}
