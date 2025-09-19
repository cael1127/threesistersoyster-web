"use client"

import Link from "next/link"
import Image from "next/image"
import { CartButton } from "@/components/cart-button"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
    <header 
      className={`bg-purpleBrand border-b border-purpleBrand/30 fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'shadow-lg backdrop-blur-md bg-purpleBrand/90' : 'bg-purpleBrand'
      }`}
      data-scrolled={isScrolled}
    >
      <div className={`container mx-auto px-2 md:px-4 ${isScrolled ? 'py-1 md:py-2' : 'py-2 md:py-4'}`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/logo.jpg"
                alt="Three Sisters Oyster Co. Logo"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                quality={100}
              />
            </div>
            <div className="hidden md:block">
              <h2 className="text-xl font-bold text-white text-center">
                Three Sisters Oyster Co.
              </h2>
              <p className="text-xs text-white">Premium Texas Oysters</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-white hover:text-white font-medium text-sm transition-all duration-200 hover:bg-white/10 px-3 py-2 rounded-lg hover:scale-105">
              Home
            </Link>
            <Link href="/products" className="text-white hover:text-white font-medium text-sm transition-all duration-200 hover:bg-white/10 px-3 py-2 rounded-lg hover:scale-105">
              Products
            </Link>
            <Link
              href="/inventory"
              className="text-white hover:text-white font-medium text-sm transition-all duration-200 hover:bg-white/10 px-3 py-2 rounded-lg hover:scale-105"
            >
              Inventory
            </Link>
            <Link href="/gallery" className="text-white hover:text-white font-medium text-sm transition-all duration-200 hover:bg-white/10 px-3 py-2 rounded-lg hover:scale-105">
              Gallery
            </Link>
            <Link href="/about" className="text-white hover:text-white font-medium text-sm transition-all duration-200 hover:bg-white/10 px-3 py-2 rounded-lg hover:scale-105">
              About
            </Link>
            {/* Admin/Development Links */}
            {(process.env.NODE_ENV === 'development' || (typeof window !== 'undefined' && localStorage.getItem('admin_access') === 'true')) && (
              <>
                <Link href="/monitoring" className="text-white hover:text-white font-medium text-xs transition-all duration-200 hover:bg-white/10 px-2 py-2 rounded-lg hover:scale-105 border border-white/20">
                  Monitoring
                </Link>
              </>
            )}
          </nav>
          
          {/* Desktop Cart/Order Buttons */}
          <div className="hidden md:flex items-center space-x-1">
            <CartButton />
            <Button
              asChild
              size="sm"
              className="bg-mintBrand hover:bg-seafoamBrand text-white text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Link href="/order">Order</Link>
            </Button>
          </div>
          
          {/* Mobile Layout - Improved spacing and touch targets */}
          <div className="flex md:hidden items-center min-w-0 flex-1 ml-2">
            {/* Mobile Navigation - Better spaced and larger touch targets */}
            <nav className="flex items-center justify-between flex-1 min-w-0">
              <Link 
                href="/products" 
                className="text-white hover:text-white font-medium text-xs py-2 px-1 flex-1 text-center rounded-lg hover:bg-white/10 transition-all duration-200 min-h-[40px] flex items-center justify-center mx-0.5 hover:scale-105"
              >
                Shop
              </Link>
              <Link 
                href="/inventory" 
                className="text-white hover:text-white font-medium text-xs py-2 px-1 flex-1 text-center rounded-lg hover:bg-white/10 transition-all duration-200 min-h-[40px] flex items-center justify-center mx-0.5 hover:scale-105"
              >
                Stock
              </Link>
              <Link 
                href="/gallery" 
                className="text-white hover:text-white font-medium text-xs py-2 px-1 flex-1 text-center rounded-lg hover:bg-white/10 transition-all duration-200 min-h-[40px] flex items-center justify-center mx-0.5 hover:scale-105"
              >
                Gallery
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-white font-medium text-xs py-2 px-1 flex-1 text-center rounded-lg hover:bg-white/10 transition-all duration-200 min-h-[40px] flex items-center justify-center mx-0.5 hover:scale-105"
              >
                About
              </Link>
            </nav>
            
            {/* Mobile Cart/Order Buttons - Better spaced */}
            <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
              <CartButton />
              <Button
                asChild
                size="sm"
                className="bg-mintBrand text-white hover:bg-seafoamBrand text-xs px-2 min-h-[40px] focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Link href="/order">Order</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
    {/* Spacer to offset fixed header height */}
    <div aria-hidden className="h-[56px] md:h-[72px]"></div>

    
    </>
  )
} 