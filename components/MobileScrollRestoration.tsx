"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function MobileScrollRestoration() {
  const pathname = usePathname()
  const lastPathname = useRef<string>(pathname)
  const userScrolling = useRef<boolean>(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only run on client side and for mobile devices
    if (typeof window === 'undefined') return
    
    // Check if mobile with a more reliable method
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (!isMobile) return
    
    // Track user scroll activity
    const handleScroll = () => {
      userScrolling.current = true
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      // Reset user scrolling flag after user stops scrolling
      scrollTimeout.current = setTimeout(() => {
        userScrolling.current = false
      }, 300) // Increased timeout to be less aggressive
    }
    
    // Add scroll listener with passive option
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Only scroll to top when pathname changes (new page navigation)
    if (lastPathname.current !== pathname) {
      // Use requestAnimationFrame for smoother scrolling
      const scrollToTop = () => {
        requestAnimationFrame(() => {
          // Only scroll if user is not actively scrolling
          if (!userScrolling.current) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }
        })
      }
      
      // Delay the scroll to allow page to load
      const timeoutId = setTimeout(scrollToTop, 200)
      
      // Update last pathname
      lastPathname.current = pathname
      
      // Cleanup timeout
      return () => clearTimeout(timeoutId)
    }
    
    // Cleanup scroll listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [pathname])

  // This component doesn't render anything
  return null
}
