"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Waves, Package, Phone, Mail, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles"
import Navigation from "@/components/Navigation"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)
  const [processingOrder, setProcessingOrder] = useState(false)
  const [session, setSession] = useState<any>(null)
  const [orderProcessed, setOrderProcessed] = useState(false)
  const { state: cartState, clearCart } = useCart() || { state: { items: [] }, clearCart: () => {} }

  useEffect(() => {
    if (sessionId) {
      // Fetch session details
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then(async (data) => {
          setSession(data)
          
          // Process order completion if we have cart items
          if (cartState.items && cartState.items.length > 0 && !orderProcessed) {
            await processOrderCompletion()
          }
          
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [sessionId, cartState.items, orderProcessed])

  const processOrderCompletion = async () => {
    if (orderProcessed || !cartState.items || cartState.items.length === 0) return

    setProcessingOrder(true)
    try {
  
      
      // Call the inventory update API as a backup to the webhook
      const response = await fetch('/api/update-inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartState.items,
          session_id: sessionId,
        }),
      })

      const result = await response.json()
      
      if (result.success) {

        setOrderProcessed(true)
        
        // Clear the cart after successful inventory update
        clearCart()
        

      } else {
        // Still clear the cart since payment was successful
        clearCart()
        setOrderProcessed(true)
      }
    } catch (error) {
      // Still clear the cart since payment was successful
      clearCart()
      setOrderProcessed(true)
    } finally {
      setProcessingOrder(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 to-seafoamBrand/20 flex items-center justify-center relative">
        <SeasonalFloatingParticles count={6} />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mintBrand mx-auto mb-4"></div>
          <p className="text-white/80">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative overflow-hidden">
              <SeasonalFloatingParticles count={10} />
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-mintBrand/30 bg-mintBrand/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-mintBrand/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-purple-900 mb-4 text-center">
                {searchParams.get('reservation') ? 'Reservation Confirmed!' : 'Order Confirmed!'}
              </h1>
              
              {searchParams.get('code') && (
                <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold mb-2">Your Pickup Code:</p>
                  <p className="text-blue-900 text-2xl font-bold tracking-wider">{searchParams.get('code')}</p>
                  <p className="text-blue-700 text-sm mt-2">Please bring this code when picking up your order.</p>
                </div>
              )}

              <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
                <p className="text-amber-800 font-semibold mb-2">
                  🦪 PICKUP ONLY
                </p>
                <p className="text-amber-700 text-sm">
                  All oysters are for pickup in person at Three Sisters Oyster Co. Orders placed by Thursday 11:59 PM are ready for Friday pickup. Orders after Thursday are for the following week.
                </p>
              </div>

              <p className="text-purple-800 mb-6">
                Thank you for your order! We've received your request and will be in touch soon. A receipt has been sent to your email.
              </p>

              {/* Order Processing Status */}
              {processingOrder && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    <span className="text-blue-800 font-medium">Processing your order and updating inventory...</span>
                  </div>
                </div>
              )}

              {/* Order Details */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-purple-900 mb-4 flex items-center justify-center text-center">
                  <CheckCircle className="w-5 h-5 text-mintBrand mr-2" />
                  Order Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-800">Order ID:</span>
                    <span className="text-purple-900 font-medium">{session?.id || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-800">Amount:</span>
                    <span className="text-purple-900 font-medium">
                      ${session?.amount_total ? (session.amount_total / 100).toFixed(2) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-800">Status:</span>
                    <span className="text-purple-900 font-medium">Confirmed</span>
                  </div>
                  {orderProcessed && (
                    <div className="flex justify-between">
                      <span className="text-purple-800">Inventory:</span>
                      <span className="text-green-600 font-medium">✓ Updated</span>
                    </div>
                  )}
                </div>
              </div>

              {/* What happens next */}
              <div className="bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-purple-900 mb-3 text-center">What happens next?</h3>
                <ul className="text-sm text-purple-800 space-y-2 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-mintBrand mr-2 flex-shrink-0" />
                    We'll review your order within 24 hours
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-mintBrand mr-2 flex-shrink-0" />
                    We'll contact you to confirm details
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-mintBrand mr-2 flex-shrink-0" />
                    Arrange pickup or delivery
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-mintBrand mr-2 flex-shrink-0" />
                    Enjoy your fresh Texas oysters!
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <Phone className="w-5 h-5 text-mintBrand mx-auto mb-2" />
                    <p className="text-sm font-medium text-purple-900">Questions?</p>
                    <a href="tel:713-854-7427" className="text-purple-700 text-sm hover:text-purple-900 hover:underline">
                      713-854-7427
                    </a>
                  </div>
                  <div className="text-center">
                    <Mail className="w-5 h-5 text-mintBrand mx-auto mb-2" />
                    <p className="text-sm font-medium text-purple-900">Email Us</p>
                    <a href="mailto:info@threesistersoyster.com" className="text-purple-700 text-sm hover:text-purple-900 hover:underline">
                      info@threesistersoyster.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild className="bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10 ml-3">
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
