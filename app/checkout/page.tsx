"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Waves, CreditCard, Truck, Shield, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { FloatingParticles } from "@/components/ui/floating-particles"

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [checkingOut, setCheckingOut] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 to-seafoamBrand/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mintBrand mx-auto mb-4"></div>
          <p className="text-white/80">Loading checkout...</p>
        </div>
      </div>
    )
  }

  // Redirect to cart if empty
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 to-seafoamBrand/20">
        <header className="bg-white/90 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purpleBrand to-seafoamBrand rounded-full flex items-center justify-center">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Three Sisters Oyster Co.</h1>
                  <p className="text-sm text-white">Premium Texas Oysters</p>
                </div>
              </Link>
              <Button asChild className="bg-mintBrand hover:bg-seafoamBrand">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-mintBrand/30 rounded-full flex items-center justify-center mx-auto mb-4">
                              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-white/80 mb-6">Add some premium oysters to get started!</p>
            <Button asChild className="bg-mintBrand hover:bg-seafoamBrand">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleCheckout = async () => {
    setCheckingOut(true)

    try {
      // Create Stripe checkout session with cart items
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: state.items,
          total: state.total,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const data = await response.json()

      if (data.url) {
        // Don't clear cart until payment is successful
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      alert("Failed to start checkout. Please try again or contact us directly.")
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <FloatingParticles particleCount={8} interactive={true} />
      {/* Header */}
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
                <p className="text-xs text-mintBrand">Premium Texas Oysters</p>
              </div>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-4">
              <Button asChild className="bg-mintBrand hover:bg-seafoamBrand text-white border-mintBrand">
                <Link href="/cart" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Cart</span>
                </Link>
              </Button>
              <Button asChild className="bg-mintBrand hover:bg-seafoamBrand text-white border-mintBrand">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">Secure Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border-purpleBrand/30 bg-white">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-purple-900 mb-4 text-center">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-purpleBrand/20 to-seafoamBrand/20 rounded-lg overflow-hidden flex-shrink-0">
                          {item.image_url ? (
                            <Image
                              src={item.image_url || "/logo.jpg"}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                              quality={90}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <span className="text-purpleBrand text-xl">🦪</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium text-purple-900 text-center">{item.name}</h3>
                          <Badge className="bg-white/20 text-white border border-white/30 text-xs">{item.category}</Badge>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-purple-800">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </span>
                            <span className="font-semibold text-white">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-purple-200 pt-4 mb-6">
                    <div className="flex justify-between items-center text-lg font-semibold text-purple-900">
                      <span>Total:</span>
                      <span className="text-2xl font-bold text-white">
                        ${state.total.toFixed(2)}+
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-purpleBrand/30 bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-purple-900 mb-4 text-center">Need Help?</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-purple-800">
                      <span className="font-medium mr-2">Phone:</span>
                      <a href="tel:713-854-7427" className="text-white hover:underline">
                        713-854-7427
                      </a>
                    </p>
                    <p className="flex items-center text-purple-800">
                      <span className="font-medium mr-2">Email:</span>
                      <a href="mailto:info@threesistersoyster.com" className="text-white hover:underline">
                        info@threesistersoyster.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <Card className="border-purpleBrand/30 bg-white">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-purple-900 mb-6 text-center">Payment Information</h2>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-white mr-2" />
                        <h3 className="font-semibold text-purple-900 text-center">Secure Checkout</h3>
                      </div>
                      <p className="text-sm text-purple-800">
                        Your payment information is encrypted and secure. We never store your payment details.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
                        <CreditCard className="w-8 h-8 text-white mx-auto mb-2" />
                        <p className="text-sm font-medium text-purple-900">Secure Payment</p>
                        <p className="text-xs text-purple-600">256-bit SSL encryption</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
                        <Truck className="w-8 h-8 text-white mx-auto mb-2" />
                        <p className="text-sm font-medium text-purple-900">Fast Delivery</p>
                        <p className="text-xs text-purple-600">We'll contact you</p>
                      </div>
                    </div>
                  </div>

                  <Card className="border-purpleBrand/30 bg-purple-50">
                    <CardContent className="p-6">
                      <h3 className="text-semibold text-purple-900 mb-2 text-center">What happens next?</h3>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Complete your payment securely</li>
                        <li>• Receive order confirmation</li>
                        <li>• We'll contact you within 24 hours</li>
                        <li>• Arrange delivery or pickup</li>
                        <li>• Enjoy fresh Texas oysters!</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-lavenderBrand hover:to-blueBrand text-lg py-6"
                  >
                    {checkingOut ? "Processing..." : "Complete Order"}
                  </Button>

                  <p className="text-xs text-purple-600 mt-4 text-center">
                    By completing your order, you agree to our terms of service and privacy policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
