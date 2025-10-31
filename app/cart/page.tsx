"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ArrowLeft, Waves, ShoppingBag, Loader2, CreditCard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles"
import Navigation from "@/components/Navigation"


export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart, getSessionId } = useCart()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)


  // Check if user just added items to cart
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('added') === 'true') {
      setShowSuccessMessage(true)
      // Remove the parameter from URL
      window.history.replaceState({}, '', '/cart')
      // Hide message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }
  }, [])

  const handleCheckout = async () => {
    if (state.items.length === 0) return

    setCheckoutLoading(true)
    setCheckoutError(null)

    try {

      
      // Create Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: state.items,
          total_amount: state.total,
          session_id: getSessionId(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMsg = data.details 
          ? `${data.error}: ${data.details}`
          : data.error || 'Failed to create checkout session'
        console.error('Checkout API error:', data)
        throw new Error(errorMsg)
      }

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL received from server")
      }
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Failed to start checkout")
    } finally {
      setCheckoutLoading(false)
    }
  }



  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative overflow-hidden">
        <SeasonalFloatingParticles count={8} />
        {/* Header */}
        <Navigation />

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purpleBrand/20 to-lavenderBrand/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Waves className="w-12 h-12 text-white/40" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4 text-center">Your Cart is Empty</h1>
            <p className="text-white/80 mb-8">Add some premium oysters to get started!</p>
            
            {/* Revamped Continue Shopping Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-purpleBrand to-lavenderBrand hover:from-lavenderBrand hover:to-purpleBrand text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-h-[48px] px-8"
              >
                <Link href="/products" className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Browse Products</span>
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-h-[48px] px-8"
              >
                <Link href="/" className="flex items-center space-x-2">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative overflow-hidden">
              <SeasonalFloatingParticles count={8} />
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-gradient-to-r from-mintBrand/20 to-seafoamBrand/20 border border-mintBrand/30 rounded-lg text-center">
              <p className="text-purple-800 font-medium">✅ Items successfully added to cart!</p>
            </div>
          )}

          {/* Error Message */}
          {checkoutError && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg text-center">
              <p className="text-red-800 font-medium">❌ {checkoutError}</p>
              <Button 
                onClick={() => setCheckoutError(null)}
                variant="ghost"
                size="sm"
                className="mt-2 text-red-700 hover:text-red-800 hover:bg-red-100"
              >
                Dismiss
              </Button>
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">Shopping Cart</h1>

          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {state.items.map((item) => (
              <Card key={item.id} className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image_url || "/placeholder.jpg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        quality={90}
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 text-center md:text-left min-w-0">
                      <h3 className="font-semibold text-purple-900 text-lg mb-2">{item.name}</h3>
                      <Badge className="bg-purpleBrand/20 text-purple-800 border border-purpleBrand/30 text-xs mb-2">
                        {item.category}
                      </Badge>
                      <p className="text-lg font-bold text-purple-900 mb-2">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    {/* Quantity Controls - Improved for better UX */}
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-purpleBrand/20 to-lavenderBrand/20 rounded-lg p-2 border border-purpleBrand/20">
                      <Button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0 hover:bg-purpleBrand/20 text-purple-700 hover:text-purple-900 transition-all duration-200"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <span className="w-12 text-center font-semibold text-purple-900 text-lg">
                        {item.quantity}
                      </span>
                      
                      <Button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0 hover:bg-purpleBrand/20 text-purple-700 hover:text-purple-900 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                      onClick={() => removeItem(item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cart Summary */}
          <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-lg text-purple-800 mb-2">
                    Total: <span className="font-bold text-2xl text-purple-900">${state.total.toFixed(2)}</span>
                  </p>
                  <p className="text-sm text-purple-600">
                    {state.itemCount} item{state.itemCount !== 1 ? 's' : ''} in cart
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
                  {/* Revamped Continue Shopping Button */}
                  <Button 
                    asChild 
                    variant="outline"
                    size="lg"
                    className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10 hover:border-purpleBrand/50 transition-all duration-300 min-h-[48px] px-8"
                    disabled={checkoutLoading}
                  >
                    <Link href="/products" className="flex items-center space-x-2">
                      <ArrowLeft className="w-5 h-5" />
                      <span>Continue Shopping</span>
                    </Link>
                  </Button>
                  
                  <Button 
                    size="lg"
                    asChild
                    disabled={checkoutLoading}
                    className="bg-gradient-to-r from-purpleBrand to-lavenderBrand hover:from-lavenderBrand hover:to-purpleBrand text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-h-[48px] px-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Link href="/checkout">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clear Cart */}
          <div className="text-center space-y-4">
            <Button
              onClick={clearCart}
              variant="ghost"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
              disabled={checkoutLoading}
            >
              Clear Cart
            </Button>
            

          </div>
        </div>


      </main>
    </div>
  )
}
