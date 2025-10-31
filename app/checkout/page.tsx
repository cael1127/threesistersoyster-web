"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Waves, ShoppingBag, Clock, MapPin, Shield, Leaf } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles"
import Navigation from "@/components/Navigation"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const { state } = useCart()
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (state.items.length === 0) {
      setError("Your cart is empty")
      setLoading(false)
      return
    }

    // Create checkout session
    const createCheckout = async () => {
      try {
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: state.items,
            total_amount: state.total,
          }),
        })

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        if (data.url) {
          setCheckoutUrl(data.url)
        } else {
          throw new Error("No checkout URL received")
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to create checkout")
      } finally {
        setLoading(false)
      }
    }

    createCheckout()
  }, [state.items, state.total])

  const handleProceedToStripe = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 via-lavenderBrand/20 via-blueBrand/20 via-mintBrand/20 to-seafoamBrand/20 flex items-center justify-center relative">
        <SeasonalFloatingParticles count={8} />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mintBrand mx-auto mb-4"></div>
          <p className="text-purple-800 font-medium">Preparing your checkout...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 via-lavenderBrand/20 via-blueBrand/20 via-mintBrand/20 to-seafoamBrand/20 relative overflow-hidden">
        <SeasonalFloatingParticles count={8} />
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-red-300 bg-red-50/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h1 className="text-2xl font-bold text-red-800 mb-4">Checkout Error</h1>
                <p className="text-red-700 mb-6">{error}</p>
                <Button asChild className="bg-gradient-to-r from-purpleBrand to-lavenderBrand">
                  <Link href="/cart">Return to Cart</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 via-lavenderBrand/20 via-blueBrand/20 via-mintBrand/20 to-seafoamBrand/20 relative overflow-hidden">
      <SeasonalFloatingParticles count={8} />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purpleBrand/20 to-lavenderBrand/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Waves className="w-10 h-10 text-purpleBrand" />
            </div>
            <h1 className="text-4xl font-bold text-purple-900 mb-4">Complete Your Order</h1>
            <p className="text-purple-700 text-lg">You're just moments away from fresh Texas oysters!</p>
          </div>

          {/* Pickup Notice */}
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
            <p className="text-amber-800 font-semibold text-lg mb-2">
              🦪 PICKUP ONLY
            </p>
            <p className="text-amber-700">
              All oysters are for pickup in person at Three Sisters Oyster Co. Orders placed by Thursday 11:59 PM are ready for Friday pickup. Orders after Thursday are for the following week.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                    <div>
                      <p className="font-medium text-purple-900">{item.name}</p>
                      <p className="text-sm text-purple-700">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-purple-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="border-t border-purple-300 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold text-purple-900">
                    <span>Total</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Benefits */}
            <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-900">Why Choose Three Sisters?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Leaf className="w-5 h-5 text-mintBrand mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-purple-900">Sustainable Harvesting</p>
                    <p className="text-sm text-purple-700">Eco-friendly practices that protect our coastal waters</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-mintBrand mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-purple-900">Local Texas Oysters</p>
                    <p className="text-sm text-purple-700">Grown in the pristine waters of the Texas Gulf Coast</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-mintBrand mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-purple-900">Quality Guaranteed</p>
                    <p className="text-sm text-purple-700">Every oyster meets our strict quality standards</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Button */}
          <div className="text-center mt-8">
            <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Ready to Complete Your Order?</h3>
                <p className="text-purple-700 mb-6 text-sm">
                  You'll be redirected to our secure payment processor powered by Stripe
                </p>
                <Button
                  onClick={handleProceedToStripe}
                  className="w-full bg-gradient-to-r from-purpleBrand to-lavenderBrand hover:from-purpleBrand/90 hover:to-lavenderBrand/90 text-white text-lg py-3"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Proceed to Secure Checkout
                </Button>
                <p className="text-xs text-purple-600 mt-3">
                  🔒 Your payment information is secure and encrypted
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Back to Cart */}
          <div className="text-center mt-6">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/cart">← Back to Cart</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 via-lavenderBrand/20 via-blueBrand/20 via-mintBrand/20 to-seafoamBrand/20 flex items-center justify-center relative">
        <SeasonalFloatingParticles count={8} />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mintBrand mx-auto mb-4"></div>
          <p className="text-purple-800 font-medium">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
