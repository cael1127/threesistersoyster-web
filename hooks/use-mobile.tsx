"use client"

import { useState, useEffect } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

// Mobile scroll restoration hook - only for initial page load
export function useInitialMobileScroll() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      // Only scroll to top once on initial load
      const scrollToTop = () => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
      
      // Call immediately
      scrollToTop()
      
      // Call once more after a short delay for any delayed rendering
      const timeoutId = setTimeout(scrollToTop, 100)
      
      return () => clearTimeout(timeoutId)
    }
  }, []) // Only run once on mount
}
