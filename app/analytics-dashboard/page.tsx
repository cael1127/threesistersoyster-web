"use client"

import { Suspense, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BarChart3, AlertTriangle, Lock } from 'lucide-react'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import Navigation from '@/components/Navigation'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

// Loading component for analytics dashboard
function AnalyticsDashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <SeasonalFloatingParticles count={8} />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purpleBrand mx-auto mb-4"></div>
              <h2 className="text-xl font-bold text-purple-900 mb-2">Loading Analytics Dashboard</h2>
              <p className="text-purple-700">Initializing user analytics system...</p>
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
                <p className="text-purple-700">Checking analytics dashboard permissions...</p>
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
                  You don't have permission to access the analytics dashboard.
                </p>
                <Alert className="border-red-200 bg-red-50 max-w-md mx-auto">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Privacy Notice:</strong> This dashboard contains user analytics and is restricted to authorized personnel only.
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
        {/* Analytics Notice */}
        <Alert className="border-blue-200 bg-blue-50 mb-6">
          <BarChart3 className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Analytics Dashboard:</strong> This dashboard shows user activity, errors, and performance metrics. 
            All data is anonymized and used for improving user experience.
          </AlertDescription>
        </Alert>

        {/* Analytics Dashboard */}
        <Suspense fallback={<AnalyticsDashboardLoading />}>
          <AnalyticsDashboard />
        </Suspense>
      </div>
    </div>
  )
}

export default function AnalyticsDashboardPage() {
  return <AccessControl />
}
