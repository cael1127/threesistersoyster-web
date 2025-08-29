"use client"

import { createContext, useContext, useEffect, ReactNode, useState } from 'react'
import { useAnalytics, usePageTracking, useErrorTracking, useClickTracking } from '@/hooks/use-analytics'

interface AnalyticsContextType {
  trackPageView: (url: string, referrer?: string) => Promise<void>
  trackClick: (element: string, category?: string, details?: Record<string, any>) => Promise<void>
  trackFormSubmit: (formName: string, success: boolean, details?: Record<string, any>) => Promise<void>
  trackCartAction: (action: 'add' | 'remove' | 'update' | 'clear', productId: string, quantity?: number) => Promise<void>
  trackCheckoutStep: (step: string, success: boolean, details?: Record<string, any>) => Promise<void>
  trackAPICall: (endpoint: string, method: string, success: boolean, duration?: number, error?: string) => Promise<void>
  trackError: (error: Error, component?: string, details?: Record<string, any>) => Promise<void>
  trackPerformance: (metric: string, value: number, unit?: 'ms' | 'bytes' | 'count', details?: Record<string, any>) => Promise<void>
  sessionId: string
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  
  // Always call hooks, but they handle client-side checks internally
  const analytics = useAnalytics()
  usePageTracking()
  useErrorTracking()
  useClickTracking()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Provide a fallback context during SSR
  const contextValue = isClient ? analytics : {
    trackPageView: async () => {},
    trackClick: async () => {},
    trackFormSubmit: async () => {},
    trackCartAction: async () => {},
    trackCheckoutStep: async () => {},
    trackAPICall: async () => {},
    trackError: async () => {},
    trackPerformance: async () => {},
    sessionId: ''
  }

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider')
  }
  return context
}
