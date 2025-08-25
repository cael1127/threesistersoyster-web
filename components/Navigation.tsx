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
      setIsScrolled(scrollTop > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-700 ease-out ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-2xl border-b border-purpleBrand/20' 
          : 'bg-purpleBrand border-b border-transparent'
      }`}
      data-scrolled={isScrolled}
    >
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 flex-shrink-0 group">
            <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center transition-all duration-500 ${
              isScrolled ? 'ring-2 ring-purpleBrand/30 shadow-lg' : ''
            }`}>
              <Image
                src="/logo.jpg"
                alt="Three Sisters Oyster Co. Logo"
                width={96}
                height={96}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                quality={100}
              />
            </div>
            <div className={`hidden md:block transition-all duration-500 ${
              isScrolled ? 'text-purple-900' : 'text-white'
            }`}>
              <h1 className="text-xl font-bold text-center">
                Three Sisters Oyster Co.
              </h1>
              <p className="text-xs opacity-80">Premium Texas Oysters</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link 
              href="/" 
              className={`font-medium text-sm transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg ${
                isScrolled 
                  ? 'text-purple-900 hover:text-purple-700 hover:bg-purpleBrand/10' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`font-medium text-sm transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg ${
                isScrolled 
                  ? 'text-purple-900 hover:text-purple-700 hover:bg-purpleBrand/10' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}
            >
              Products
            </Link>
            <Link
              href="/inventory"
              className={`font-medium text-sm transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg ${
                isScrolled 
                  ? 'text-purple-900 hover:text-purple-700 hover:bg-purpleBrand/10' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}
            >
              Inventory
            </Link>
            <Link 
              href="/gallery" 
              className={`font-medium text-sm transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg ${
                isScrolled 
                  ? 'text-purple-900 hover:text-purple-700 hover:bg-purpleBrand/10' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}
            >
              Gallery
            </Link>
            <Link 
              href="/about" 
              className={`font-medium text-sm transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg ${
                isScrolled 
                  ? 'text-purple-900 hover:text-purple-700 hover:bg-purpleBrand/10' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}
            >
              About
            </Link>
          </nav>
          
          {/* Desktop Cart/Order Buttons */}
          <div className="hidden md:flex items-center space-x-1">
            <CartButton />
            <Button
              asChild
              size="sm"
              className={`transition-all duration-300 hover:scale-105 text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 ${
                isScrolled 
                  ? 'bg-purpleBrand hover:bg-purple-800 text-white shadow-lg' 
                  : 'bg-mintBrand hover:bg-seafoamBrand text-white'
              }`}
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
                className={`font-medium text-xs py-2 px-1 flex-1 text-center rounded-lg transition-all duration-300 min-h-[40px] flex items-center justify-center mx-0.5 hover:scale-105 ${
                  isScrolled 
                    ? 'text-purple-900 hover:text-purple-700 hover:bg-purpleBrand/10' 
                    : 'text-white hover:text-white hover:bg-white/20'
                }`}
              >
                Shop
              </Link>
              <Link 
                href="/inventory" 
                className={`font-medium text-xs py-2 px-1 flex-1 text-center rounded-lg transition-all duration-300 min-h-[40px] flex items-center justify-center mx-0.5 hover:scale-105 ${
                  isScrolled 
                    ? 'text-purple-900 hover:text-purple-700 hover:bg-purpleBrand/10' 
                    : 'text-white hover:text-white hover:bg-white/20'
                }`}
              >
                Stock
              </Link>
              <Link 
                href="/gallery" 
                className={`font-medium text-xs py-2 px-1 flex-1 text-center rounded-lg transition-all duration-300 min-h-[40px] flex items-center justify-center mx-0.5 hover:scale-105 ${
                  isScrolled 
                    ? 'text-purple-900 hover:text-purple-700 hover:bg-purpleBrand/10' 
                    : 'text-white hover:text-white hover:bg-white/20'
                }`}
              >
                Gallery
              </Link>
              <Link 
                href="/about" 
                className={`font-medium text-xs py-2 px-1 flex-1 text-center rounded-lg transition-all duration-300 min-h-[40px] flex items-center justify-center mx-0.5 hover:scale-105 ${
                  isScrolled 
                    ? 'text-purple-900 hover:text-purple-700 hover:bg-purpleBrand/10' 
                    : 'text-white hover:text-white hover:bg-white/20'
                }`}
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
                className={`transition-all duration-300 hover:scale-105 text-xs px-2 min-h-[40px] focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  isScrolled 
                    ? 'bg-purpleBrand hover:bg-purple-800 text-white shadow-lg' 
                    : 'bg-mintBrand text-white hover:bg-seafoamBrand'
                }`}
              >
                <Link href="/order">Order</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 