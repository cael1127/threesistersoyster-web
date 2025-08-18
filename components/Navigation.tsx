"use client"

import Link from "next/link"
import Image from "next/image"
import { CartButton } from "@/components/cart-button"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <header className="bg-purpleBrand border-b border-purpleBrand/30 sticky top-0 z-50">
      <div className="container mx-auto px-3 md:px-4 py-2 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3">
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
              <h1 className="text-xl font-bold text-white text-center">
                Three Sisters Oyster Co.
              </h1>
              <p className="text-xs text-white">Premium Texas Oysters</p>
            </div>
          </Link>
          <div className="flex items-center space-x-1 md:space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              <Link href="/" className="text-white hover:text-white font-medium text-sm">
                Home
              </Link>
              <Link href="/products" className="text-white hover:text-white font-medium text-sm">
                Products
              </Link>
              <Link
                href="/inventory"
                className="text-white hover:text-white font-medium text-sm"
              >
                Inventory
              </Link>
              <Link href="/gallery" className="text-white hover:text-white font-medium text-sm">
                Gallery
              </Link>
              <Link href="/about" className="text-white hover:text-white font-medium text-sm">
                About
              </Link>
            </nav>
            
            {/* Mobile Layout - Improved spacing and touch targets */}
            <div className="flex md:hidden items-center w-full">
              {/* Mobile Navigation - Better spaced and larger touch targets */}
              <nav className="flex items-center justify-between flex-1 px-2 space-x-1">
                <Link 
                  href="/products" 
                  className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                >
                  Shop
                </Link>
                <Link 
                  href="/inventory" 
                  className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                >
                  Stock
                </Link>
                <Link 
                  href="/gallery" 
                  className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                >
                  Gallery
                </Link>
                <Link 
                  href="/about" 
                  className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                >
                  About
                </Link>
              </nav>
              
              {/* Mobile Cart/Order Buttons - Better spaced */}
              <div className="flex items-center space-x-2 px-3">
                <CartButton />
                <Button
                  asChild
                  size="sm"
                  className="bg-mintBrand text-white hover:bg-seafoamBrand text-sm px-3 min-h-[44px] focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Link href="/order">Order</Link>
                </Button>
              </div>
            </div>
            
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
          </div>
        </div>
      </div>
    </header>
  )
} 