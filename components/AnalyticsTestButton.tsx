"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAnalyticsContext } from '@/components/AnalyticsProvider'

export function AnalyticsTestButton() {
  const [testResults, setTestResults] = useState<string[]>([])
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    try {
      const analyticsInstance = useAnalyticsContext()
      setAnalytics(analyticsInstance)
    } catch (error) {
      console.warn('Analytics context not available:', error)
    }
  }, [])

  const runAnalyticsTest = async () => {
    const results: string[] = []
    
    try {
      if (!analytics) {
        results.push('❌ Analytics not available - check console for errors')
        setTestResults(results)
        return
      }

      // Test 1: Track a click event
      analytics.trackClick('test-button', 'testing', { test: 'manual-click' })
      results.push('✅ Click event tracked')
      
      // Test 2: Track a page view
      analytics.trackPageView(window.location.href, 'test-referrer')
      results.push('✅ Page view tracked')
      
      // Test 3: Track a form submission
      analytics.trackFormSubmit('test-form', true, { test: 'manual-form' })
      results.push('✅ Form submission tracked')
      
      // Test 4: Track a cart action
      analytics.trackCartAction('add', 'test-product', 1)
      results.push('✅ Cart action tracked')
      
      // Test 5: Track an API call
      analytics.trackAPICall('/api/test', 'GET', true, 100)
      results.push('✅ API call tracked')
      
      // Test 6: Track performance
      analytics.trackPerformance('test-metric', 50, 'ms', { test: 'manual-performance' })
      results.push('✅ Performance metric tracked')
      
      // Test 7: Check session ID
      results.push(`✅ Session ID: ${analytics.sessionId}`)
      
      setTestResults(results)
      
      // Wait a moment then fetch analytics data to verify
      setTimeout(async () => {
        try {
          const response = await fetch('/api/analytics')
          const data = await response.json()
          results.push(`✅ Analytics API working - ${data.data.totalEvents} events, ${data.data.totalSessions} sessions`)
          setTestResults([...results])
        } catch (error) {
          results.push(`❌ Analytics API error: ${error}`)
          setTestResults([...results])
        }
      }, 1000)
      
    } catch (error) {
      results.push(`❌ Test failed: ${error}`)
      setTestResults(results)
    }
  }

  return (
    <Card className="border-blue-500/30 bg-white/80 backdrop-blur-sm mt-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-blue-900 mb-2">
          🧪 Analytics Test
        </h3>
        <Button 
          onClick={runAnalyticsTest}
          className="mb-3"
          variant="outline"
          disabled={!analytics}
        >
          {analytics ? 'Run Analytics Test' : 'Analytics Not Available'}
        </Button>
        
        {analytics && (
          <div className="text-sm text-green-700 mb-2">
            ✅ Analytics available - Session ID: {analytics.sessionId || 'Loading...'}
          </div>
        )}
        
        {testResults.length > 0 && (
          <div className="space-y-1">
            <h4 className="font-semibold text-blue-800">Test Results:</h4>
            {testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono">
                {result}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
