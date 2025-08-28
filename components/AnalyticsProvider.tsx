"use client"

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useAnalytics, usePageTracking, useErrorTracking, useClickTracking } from '@/hooks/use-analytics'

interface AnalyticsContextType {
  trackPageView: (url: string, referrer?: string) => void
  trackClick: (element: string, category?: string, details?: Record<string, any>) => void
  trackFormSubmit: (formName: string, success: boolean, details?: Record<string, any>) => void
  trackCartAction: (action: 'add' | 'remove' | 'update' | 'clear', productId: string, quantity?: number) => void
  trackCheckoutStep: (step: string, success: boolean, details?: Record<string, any>) => void
  trackAPICall: (endpoint: string, method: string, success: boolean, duration?: number, error?: string) => void
  trackError: (error: Error, component?: string, details?: Record<string, any>) => void
  trackPerformance: (metric: string, value: number, unit?: 'ms' | 'bytes' | 'count', details?: Record<string, any>) => void
  sessionId: string
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const analytics = useAnalytics()

  // Initialize automatic tracking
  usePageTracking()
  useErrorTracking()
  useClickTracking()

  return (
    <AnalyticsContext.Provider value={analytics}>
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
