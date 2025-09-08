"use client"

import { useEffect, useRef, useCallback, useState } from 'react'

// Generate a unique session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  // Try sessionStorage first, then localStorage as fallback
  let sessionId = sessionStorage.getItem('analytics_session_id') || localStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = generateSessionId()
    try {
      sessionStorage.setItem('analytics_session_id', sessionId)
      // Also store in localStorage as backup for private browsing
      localStorage.setItem('analytics_session_id', sessionId)
    } catch (error) {
      // If storage fails (private browsing), use in-memory only
      console.warn('Analytics: Storage not available, using in-memory session')
    }
  }
  return sessionId
}

// Get client IP (will be determined server-side)
function getClientIP(): string {
  return 'client-side' // Server will determine real IP
}

// Generate a device fingerprint for better user identification
function generateDeviceFingerprint(): string {
  if (typeof window === 'undefined') return ''
  
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillText('Device fingerprint', 2, 2)
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
    navigator.platform,
    navigator.cookieEnabled ? 'cookies' : 'no-cookies',
    navigator.doNotTrack || 'unknown'
  ].join('|')
  
  // Create a hash of the fingerprint
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  return `device_${Math.abs(hash).toString(36)}`
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
  const lastClickTs = useRef<number>(0)
  const CLICK_THROTTLE_MS = 250

  // Initialize session
  useEffect(() => {
    if (typeof window === 'undefined') return

    const initializeAnalytics = async () => {
      try {
        sessionId.current = getSessionId()
        pageStartTime.current = Date.now()

        // Create session via API
        try {
          await fetch('/api/analytics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'create_session',
              data: {
                sessionId: sessionId.current,
                ip: getClientIP(),
                userAgent: getUserAgent(),
                deviceFingerprint: generateDeviceFingerprint(),
                referrer: document.referrer,
                screenResolution: `${screen.width}x${screen.height}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                language: navigator.language
              }
            })
          })
        } catch (error) {
          console.warn('Session creation failed:', error)
        }

        setIsInitialized(true)
        
        // Debug logging
        if (process.env.NODE_ENV === 'development') {
          console.log('🔍 Analytics initialized:', {
            sessionId: sessionId.current,
            userAgent: getUserAgent(),
            url: window.location.href
          })
        }
      } catch (error) {
        console.warn('Analytics initialization failed:', error)
        // Set initialized to true even if there's an error to prevent infinite retries
        setIsInitialized(true)
      }
    }

    initializeAnalytics()
  }, [])

  // Track page views
  const trackPageView = useCallback(async (url: string, referrer?: string) => {
    if (!sessionId.current || !isInitialized) return
    // Skip monitoring pages
    if (typeof window !== 'undefined' && /\/monitoring|\/analytics-dashboard|\/security-dashboard/.test(new URL(url).pathname)) {
      return
    }

    try {
      const duration = Date.now() - pageStartTime.current
      
      // Send to API instead of direct server call
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'page_view',
          data: {
            sessionId: sessionId.current,
            url,
            referrer,
            duration
          }
        })
      })
      
      pageStartTime.current = Date.now()
      
      // Debug logging
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Page view tracked:', {
          sessionId: sessionId.current,
          url,
          referrer,
          duration
        })
      }
    } catch (error) {
      console.warn('Page view tracking failed:', error)
    }
  }, [isInitialized])

  // Track clicks
  const trackClick = useCallback(async (element: string, category: string = 'interaction', details?: Record<string, any>) => {
    if (!sessionId.current || !isInitialized) return
    // Skip monitoring pages and throttle
    if (typeof window !== 'undefined') {
      const now = Date.now()
      if (/^https?:\/\/|^\//.test(window.location.href)) {
        const pathname = new URL(window.location.href).pathname
        if (/^\/(monitoring|analytics-dashboard|security-dashboard)/.test(pathname)) return
      }
      if (now - lastClickTs.current < CLICK_THROTTLE_MS) return
      lastClickTs.current = now
    }

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'click',
          data: {
            sessionId: sessionId.current,
            ip: getClientIP(),
            userAgent: getUserAgent(),
            category,
            details: { element, ...details },
            url: window.location.href
          }
        })
      })
    } catch (error) {
      console.warn('Click tracking failed:', error)
    }
  }, [isInitialized])

  // Track form submissions
  const trackFormSubmit = useCallback(async (formName: string, success: boolean, details?: Record<string, any>) => {
    if (!sessionId.current) return
    // Skip monitoring pages
    if (typeof window !== 'undefined') {
      const pathname = new URL(window.location.href).pathname
      if (/^\/(monitoring|analytics-dashboard|security-dashboard)/.test(pathname)) return
    }

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'form_submit',
          data: {
            sessionId: sessionId.current,
            ip: getClientIP(),
            userAgent: getUserAgent(),
            formName,
            success,
            details: { formName, ...details },
            url: window.location.href
          }
        })
      })
    } catch (error) {
      console.warn('Form submission tracking failed:', error)
    }
  }, [])

  // Track cart actions
  const trackCartAction = useCallback(async (action: 'add' | 'remove' | 'update' | 'clear', productId: string, quantity?: number) => {
    if (!sessionId.current) return
    if (typeof window !== 'undefined') {
      const pathname = new URL(window.location.href).pathname
      if (/^\/(monitoring|analytics-dashboard|security-dashboard)/.test(pathname)) return
    }

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'cart_action',
          data: {
            sessionId: sessionId.current,
            action,
            productId,
            quantity
          }
        })
      })
    } catch (error) {
      console.warn('Cart action tracking failed:', error)
    }
  }, [])

  // Track checkout steps
  const trackCheckoutStep = useCallback(async (step: string, success: boolean, details?: Record<string, any>) => {
    if (!sessionId.current) return
    if (typeof window !== 'undefined') {
      const pathname = new URL(window.location.href).pathname
      if (/^\/(monitoring|analytics-dashboard|security-dashboard)/.test(pathname)) return
    }

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'checkout_step',
          data: {
            sessionId: sessionId.current,
            step,
            success,
            details
          }
        })
      })
    } catch (error) {
      console.warn('Checkout step tracking failed:', error)
    }
  }, [])

  // Track API calls
  const trackAPICall = useCallback(async (endpoint: string, method: string, success: boolean, duration?: number, error?: string) => {
    if (!sessionId.current) return
    if (typeof window !== 'undefined') {
      const pathname = new URL(window.location.href).pathname
      if (/^\/(monitoring|analytics-dashboard|security-dashboard)/.test(pathname)) return
    }

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'api_call',
          data: {
            sessionId: sessionId.current,
            endpoint,
            method,
            success,
            duration,
            error
          }
        })
      })
    } catch (err) {
      console.warn('API call tracking failed:', err)
    }
  }, [])

  // Track errors
  const trackError = useCallback(async (error: Error, component?: string, details?: Record<string, any>) => {
    if (!sessionId.current) return
    if (typeof window !== 'undefined') {
      const pathname = new URL(window.location.href).pathname
      if (/^\/(monitoring|analytics-dashboard|security-dashboard)/.test(pathname)) return
    }

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'error',
          data: {
            sessionId: sessionId.current,
            ip: getClientIP(),
            userAgent: getUserAgent(),
            errorType: 'CLIENT_ERROR',
            severity: 'MEDIUM',
            message: error.message,
            stack: error.stack,
            url: window.location.href,
            component,
            details: details || {}
          }
        })
      })
    } catch (err) {
      console.warn('Error tracking failed:', err)
    }
  }, [])

  // Track performance
  const trackPerformance = useCallback(async (metric: string, value: number, unit: 'ms' | 'bytes' | 'count' = 'ms', details?: Record<string, any>) => {
    if (!sessionId.current) return
    if (typeof window !== 'undefined') {
      const pathname = new URL(window.location.href).pathname
      if (/^\/(monitoring|analytics-dashboard|security-dashboard)/.test(pathname)) return
    }

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'performance',
          data: {
            sessionId: sessionId.current,
            ip: getClientIP(),
            userAgent: getUserAgent(),
            performanceType: 'COMPONENT_RENDER',
            metric,
            value,
            unit,
            url: window.location.href,
            details: details || {}
          }
        })
      })
    } catch (error) {
      console.warn('Performance tracking failed:', error)
    }
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
    // Only run on client side
    if (typeof window === 'undefined') return

    // Track page view on mount with a small delay to ensure analytics is initialized
    const trackInitialPageView = () => {
      if (typeof window !== 'undefined') {
        trackPageView(window.location.href, document.referrer)
      }
    }
    
    // Use requestIdleCallback or setTimeout to ensure analytics is ready
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(trackInitialPageView)
    } else if (typeof window !== 'undefined') {
      setTimeout(trackInitialPageView, 100)
    }

    // Track page view on route change (for SPA)
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        trackPageView(window.location.href, document.referrer)
      }
    }

    // Listen for popstate events (back/forward navigation)
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handleRouteChange)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', handleRouteChange)
      }
    }
  }, [trackPageView])
}

// Hook for automatic error tracking
export function useErrorTracking() {
  const { trackError } = useAnalytics()

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

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
    // Only run on client side
    if (typeof window === 'undefined') return

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target) return

      // Get element identifier
      const element = target.tagName.toLowerCase()
      const id = target.id ? `#${target.id}` : ''
      const className = target.className && typeof target.className === 'string' 
        ? `.${target.className.split(' ')[0]}` 
        : ''
      const elementId = `${element}${id}${className}`

      // Track click
      trackClick(elementId, 'interaction', {
        tagName: target.tagName,
        id: target.id,
        className: typeof target.className === 'string' ? target.className : String(target.className),
        textContent: target.textContent?.substring(0, 100)
      })
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [trackClick])
}
