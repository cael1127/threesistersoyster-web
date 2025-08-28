"use client"

import { useEffect, useRef, useCallback, useState } from 'react'
import { analyticsMonitor } from '@/lib/analytics-monitor'

// Generate a unique session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

// Get client IP (simplified - in production, this would come from server)
function getClientIP(): string {
  return 'client-side'
}

// Get user agent
function getUserAgent(): string {
  if (typeof window === 'undefined') return ''
  return navigator.userAgent
}

// Analytics hook for tracking user interactions
export function useAnalytics() {
  const sessionId = useRef<string>('')
  const pageStartTime = useRef<number>(0)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize session
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      sessionId.current = getSessionId()
      pageStartTime.current = Date.now()

      // Create session
      analyticsMonitor.createSession(
        sessionId.current,
        getClientIP(),
        getUserAgent(),
        document.referrer
      )

      setIsInitialized(true)
    } catch (error) {
      console.warn('Analytics initialization failed:', error)
    }
  }, [])

  // Track page views
  const trackPageView = useCallback((url: string, referrer?: string) => {
    if (!sessionId.current || !isInitialized) return

    try {
      const duration = Date.now() - pageStartTime.current
      analyticsMonitor.trackPageView(sessionId.current, url, referrer, duration)
      pageStartTime.current = Date.now()
    } catch (error) {
      console.warn('Page view tracking failed:', error)
    }
  }, [isInitialized])

  // Track clicks
  const trackClick = useCallback((element: string, category: string = 'interaction', details?: Record<string, any>) => {
    if (!sessionId.current || !isInitialized) return

    try {
      analyticsMonitor.trackEvent({
        sessionId: sessionId.current,
        ip: getClientIP(),
        userAgent: getUserAgent(),
        type: 'CLICK',
        category,
        action: 'click',
        details: { element, ...details },
        url: window.location.href,
        success: true
      })
    } catch (error) {
      console.warn('Click tracking failed:', error)
    }
  }, [isInitialized])

  // Track form submissions
  const trackFormSubmit = useCallback((formName: string, success: boolean, details?: Record<string, any>) => {
    if (!sessionId.current) return

    analyticsMonitor.trackEvent({
      sessionId: sessionId.current,
      ip: getClientIP(),
      userAgent: getUserAgent(),
      type: 'FORM_SUBMIT',
      category: 'form',
      action: 'submit',
      details: { formName, ...details },
      url: window.location.href,
      success
    })
  }, [])

  // Track cart actions
  const trackCartAction = useCallback((action: 'add' | 'remove' | 'update' | 'clear', productId: string, quantity?: number) => {
    if (!sessionId.current) return

    analyticsMonitor.trackCartAction(sessionId.current, action, productId, quantity)
  }, [])

  // Track checkout steps
  const trackCheckoutStep = useCallback((step: string, success: boolean, details?: Record<string, any>) => {
    if (!sessionId.current) return

    analyticsMonitor.trackCheckoutStep(sessionId.current, step, success, details)
  }, [])

  // Track API calls
  const trackAPICall = useCallback((endpoint: string, method: string, success: boolean, duration?: number, error?: string) => {
    if (!sessionId.current) return

    analyticsMonitor.trackAPICall(sessionId.current, endpoint, method, success, duration, error)
  }, [])

  // Track errors
  const trackError = useCallback((error: Error, component?: string, details?: Record<string, any>) => {
    if (!sessionId.current) return

    analyticsMonitor.trackError({
      sessionId: sessionId.current,
      ip: getClientIP(),
      userAgent: getUserAgent(),
      type: 'CLIENT_ERROR',
      severity: 'MEDIUM',
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      component,
      details: details || {},
      resolved: false
    })
  }, [])

  // Track performance
  const trackPerformance = useCallback((metric: string, value: number, unit: 'ms' | 'bytes' | 'count' = 'ms', details?: Record<string, any>) => {
    if (!sessionId.current) return

    analyticsMonitor.trackPerformance({
      sessionId: sessionId.current,
      ip: getClientIP(),
      userAgent: getUserAgent(),
      type: 'COMPONENT_RENDER',
      metric,
      value,
      unit,
      url: window.location.href,
      details: details || {}
    })
  }, [])

  return {
    trackPageView,
    trackClick,
    trackFormSubmit,
    trackCartAction,
    trackCheckoutStep,
    trackAPICall,
    trackError,
    trackPerformance,
    sessionId: sessionId.current
  }
}

// Hook for automatic page view tracking
export function usePageTracking() {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    // Track page view on mount
    trackPageView(window.location.href, document.referrer)

    // Track page view on route change (for SPA)
    const handleRouteChange = () => {
      trackPageView(window.location.href, document.referrer)
    }

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [trackPageView])
}

// Hook for automatic error tracking
export function useErrorTracking() {
  const { trackError } = useAnalytics()

  useEffect(() => {
    // Global error handler
    const handleError = (event: ErrorEvent) => {
      trackError(new Error(event.message), 'global', {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      })
    }

    // Unhandled promise rejection handler
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError(new Error(event.reason), 'promise', {
        reason: event.reason
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [trackError])
}

// Hook for automatic click tracking
export function useClickTracking() {
  const { trackClick } = useAnalytics()

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target) return

      // Get element identifier
      const element = target.tagName.toLowerCase()
      const id = target.id ? `#${target.id}` : ''
      const className = target.className ? `.${target.className.split(' ')[0]}` : ''
      const elementId = `${element}${id}${className}`

      // Track click
      trackClick(elementId, 'interaction', {
        tagName: target.tagName,
        id: target.id,
        className: target.className,
        textContent: target.textContent?.substring(0, 100)
      })
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [trackClick])
}
