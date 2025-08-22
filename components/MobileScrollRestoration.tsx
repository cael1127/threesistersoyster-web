"use client"

import { useEffect } from 'react'

export function MobileScrollRestoration() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensure page starts at top on mobile
      const scrollToTop = () => {
        // Use multiple methods to ensure scroll works on all mobile devices
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        
        // Force a reflow to ensure scroll position is set
        document.body.offsetHeight
      }
      
      // Call immediately
      scrollToTop()
      
      // Call again after a short delay to handle any delayed rendering
      const timeoutId = setTimeout(scrollToTop, 100)
      
      // Handle mobile viewport issues
      const handleResize = () => {
        // Force scroll to top on mobile orientation change
        if (window.innerWidth <= 768) {
          scrollToTop()
        }
      }
      
      // Add resize listener for mobile orientation changes
      window.addEventListener('resize', handleResize)
      
      // Handle focus events (common mobile issue)
      const handleFocus = () => {
        if (window.innerWidth <= 768) {
          scrollToTop()
        }
      }
      
      window.addEventListener('focus', handleFocus)
      
      // Handle page visibility changes (mobile app switching)
      const handleVisibilityChange = () => {
        if (window.innerWidth <= 768 && !document.hidden) {
          scrollToTop()
        }
      }
      
      document.addEventListener('visibilitychange', handleVisibilityChange)
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('focus', handleFocus)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        clearTimeout(timeoutId)
      }
    }
  }, [])

  // This component doesn't render anything
  return null
}
