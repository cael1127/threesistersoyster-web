"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Waves, Package, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { FloatingParticles } from "@/components/ui/floating-particles"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)
  const { state: cartState, clearCart } = useCart() || { state: { items: [] }, clearCart: () => {} }

  useEffect(() => {
    if (sessionId) {
      // Fetch session details
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then(async (data) => {
          setSession(data)
          
          // Clear the cart after successful order completion
          if (cartState.items && cartState.items.length > 0) {
            console.log('Clearing cart after successful order');
            clearCart();
          }
          
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching session:", error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [sessionId, cartState.items, cartState.total, clearCart])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 to-seafoamBrand/20 flex items-center justify-center relative">
        <FloatingParticles particleCount={6} interactive={true} />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mintBrand mx-auto mb-4"></div>
          <p className="text-white/80">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <FloatingParticles particleCount={10} interactive={true} />
      {/* Header */}
      <header className="bg-purpleBrand border-b border-purpleBrand/30 sticky top-0 z-50">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
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
            </div>
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
                <Link href="/contact" className="text-white hover:text-white font-medium text-sm">
                  Contact
                </Link>
              </nav>
              
              {/* Mobile Layout - Restructured for better spacing */}
              <div className="flex md:hidden items-center w-full">
                {/* Mobile Navigation - Compact */}
                <nav className="flex items-center flex-1 px-4">
                  <Link href="/products" className="text-white hover:text-white font-medium text-xs py-2 flex-1 text-center">
                    Shop
                  </Link>
                  <Link href="/inventory" className="text-white hover:text-white font-medium text-xs py-2 flex-1 text-center">
                    Stock
                  </Link>
                  <Link href="/gallery" className="text-white hover:text-white font-medium text-xs py-2 flex-1 text-center">
                    Gallery
                  </Link>
                  <Link href="/about" className="text-white hover:text-white font-medium text-xs py-2 flex-1 text-center">
                    About
                  </Link>
                  <Link href="/contact" className="text-white hover:text-white font-medium text-xs py-2 flex-1 text-center">
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-mintBrand/30 bg-mintBrand/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-mintBrand/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-purple-900 mb-4 text-center">Order Confirmed!</h1>
              <p className="text-purple-800 mb-6">
                Thank you for your order! We've received your request and will be in touch soon.
              </p>

              {/* Order Details */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-purple-900 mb-4 flex items-center justify-center text-center">
                  <CheckCircle className="w-5 h-5 text-white mr-2" />
                  Order Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-800">Order ID:</span>
                    <span className="text-white font-medium">{session?.id || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-800">Amount:</span>
                    <span className="text-white font-medium">
                      ${session?.amount_total ? (session.amount_total / 100).toFixed(2) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-800">Status:</span>
                    <span className="text-white font-medium">Confirmed</span>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div className="bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-purple-900 mb-3 text-center">What happens next?</h3>
                <ul className="text-sm text-purple-800 space-y-2 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-white mr-2 flex-shrink-0" />
                    We'll review your order within 24 hours
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-white mr-2 flex-shrink-0" />
                    We'll contact you to confirm details
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-white mr-2 flex-shrink-0" />
                    Arrange pickup or delivery
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-white mr-2 flex-shrink-0" />
                    Enjoy your fresh Texas oysters!
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <Phone className="w-5 h-5 text-white mx-auto mb-2" />
                    <p className="text-sm font-medium text-purple-900">Questions?</p>
                    <a href="tel:713-854-7427" className="text-white text-sm hover:underline">
                      713-854-7427
                    </a>
                  </div>
                  <div className="text-center">
                    <Mail className="w-5 h-5 text-white mx-auto mb-2" />
                    <p className="text-sm font-medium text-purple-900">Email Us</p>
                    <a href="mailto:info@threesistersoyster.com" className="text-white text-sm hover:underline">
                      info@threesistersoyster.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild className="bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 ml-3">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
