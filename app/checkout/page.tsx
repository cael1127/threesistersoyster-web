"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Waves, CreditCard, Truck, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    )
  }

  // Redirect to cart if empty
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-teal-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-purple-100">
                  <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-teal-600 rounded-full flex items-center justify-center">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Three Sisters Oyster Co.</h1>
              <p className="text-sm text-teal-300">Premium Texas Oysters</p>
            </div>
          </Link>
        </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-6">
              <Image
                src="/logo.jpg"
                alt="Three Sisters Oyster Co. Logo"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-white mb-8">Add some premium oysters to get started!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/products">Shop Products</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/cart">View Cart</Link>
              </Button>
            </div>
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
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Header */}
      <header className="bg-purpleBrand border-b border-purple-300/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="Three Sisters Oyster Co. Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-mintBrand">Three Sisters Oyster Co.</h1>
                <p className="text-sm text-seafoamBrand">Premium Texas Oysters</p>
              </div>
            </Link>
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white border-green-600">
              <Link href="/cart" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Cart</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Secure Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border-purple-200">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-purple-900 mb-4">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-teal-100 rounded-lg overflow-hidden flex-shrink-0">
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
                              <span className="text-purple-400 text-xl">🦪</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium text-purple-900">{item.name}</h3>
                          <Badge className="bg-teal-100 text-teal-800 text-xs">{item.category}</Badge>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-600">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </span>
                            <span className="font-semibold text-purple-700">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-purple-200 pt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Subtotal ({state.itemCount} items):</span>
                      <span>${state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Shipping & Tax:</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold text-purple-900 pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
                        ${state.total.toFixed(2)}+
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-purple-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-purple-900 mb-4">Need Help?</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-gray-600">
                      <span className="font-medium mr-2">Phone:</span>
                      <a href="tel:713-854-7427" className="text-purple-600 hover:underline">
                        713-854-7427
                      </a>
                    </p>
                    <p className="flex items-center text-gray-600">
                      <span className="font-medium mr-2">Email:</span>
                      <a href="mailto:info@threesistersoyster.com" className="text-purple-600 hover:underline">
                        info@threesistersoyster.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <Card className="border-purple-200">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-purple-900 mb-6">Payment Information</h2>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-purple-100 to-teal-100 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-purple-600 mr-2" />
                        <h3 className="font-semibold text-purple-900">Secure Checkout</h3>
                      </div>
                      <p className="text-sm text-gray-700">
                        Your payment will be processed securely through Stripe. We accept all major credit cards and
                        digital wallets.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-purple-200 p-4 rounded-lg text-center">
                        <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Secure Payment</p>
                        <p className="text-xs text-gray-500">256-bit SSL encryption</p>
                      </div>
                      <div className="bg-white border border-purple-200 p-4 rounded-lg text-center">
                        <Truck className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Fast Delivery</p>
                        <p className="text-xs text-gray-500">We'll contact you</p>
                      </div>
                    </div>

                    <div className="bg-white border border-purple-200 p-4 rounded-lg">
                      <h3 className="font-semibold text-purple-900 mb-2">What happens next?</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• You'll be redirected to Stripe's secure payment page</li>
                        <li>• Complete your payment and shipping information</li>
                        <li>• We'll send you an order confirmation email</li>
                        <li>• We'll contact you to arrange delivery or pickup</li>
                        <li>• Enjoy your fresh Texas oysters!</li>
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-lg py-6"
                  >
                    {checkingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Proceed to Payment
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Powered by Stripe • Your payment information is secure and encrypted
                  </p>
                </CardContent>
              </Card>

              {/* Alternative Contact */}
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-amber-800 mb-2">Prefer to Order by Phone?</h3>
                  <p className="text-sm text-amber-700 mb-4">
                    Call us directly to place your order and arrange payment over the phone.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-amber-300 text-amber-800 hover:bg-amber-100 bg-transparent"
                  >
                    <a href="tel:713-854-7427">Call 713-854-7427</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
