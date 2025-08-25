"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function MobileScrollRestoration() {
  const pathname = usePathname()
  const lastPathname = useRef<string>(pathname)
  const userScrolling = useRef<boolean>(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
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
        }, 150) // Wait 150ms after user stops scrolling
      }
      
      // Add scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      // Only scroll to top when pathname changes (new page navigation)
      if (lastPathname.current !== pathname) {
        const scrollToTop = () => {
          // Only scroll if user is not actively scrolling
          if (!userScrolling.current) {
            window.scrollTo(0, 0)
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
          }
        }
        
        // Call immediately when pathname changes
        scrollToTop()
        
        // Call again after a short delay to handle any delayed rendering
        const timeoutId = setTimeout(scrollToTop, 100)
        
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
    }
  }, [pathname])

  // This component doesn't render anything
  return null
}
