"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Waves, CreditCard, Truck, Shield, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { FloatingParticles } from "@/components/ui/floating-particles"
import Navigation from "@/components/Navigation"

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [checkingOut, setCheckingOut] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 to-seafoamBrand/20 flex items-center justify-center overflow-hidden">
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
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 to-seafoamBrand/20 overflow-hidden">
        <Navigation />

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
    console.log("Checkout button clicked!")
    console.log("Cart state:", state)
    console.log("Customer name:", customerName)
    console.log("Customer email:", customerEmail)
    
    setCheckingOut(true)

    try {
      console.log("Creating checkout session...")
      // Create Stripe checkout session with cart items
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: customerName.trim() || undefined,
          customer_email: customerEmail.trim() || undefined,
          items: state.items,
          total_amount: state.total,
        }),
      })

      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("API error:", errorData)
        throw new Error(errorData.error || "Failed to create checkout session")
      }

      const data = await response.json()
      console.log("Checkout session data:", data)

      if (data.url) {
        console.log("Redirecting to:", data.url)
        // Don't clear cart until payment is successful
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      alert(`Failed to start checkout: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or call 713-854-7427 for assistance.`)
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative overflow-hidden">
      <FloatingParticles particleCount={8} interactive={true} />
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">Secure Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border-purpleBrand/30 bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
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
                          <Badge className="bg-purpleBrand/20 text-purple-800 border border-purpleBrand/30 text-xs">{item.category}</Badge>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-purple-800">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </span>
                            <span className="font-semibold text-purple-900">
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
                      <span className="text-2xl font-bold text-purple-900">
                        ${state.total.toFixed(2)}+
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-purpleBrand/30 bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-purple-900 mb-4 text-center">Need Help?</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-purple-800">
                      <span className="font-medium mr-2">Phone:</span>
                      <a href="tel:713-854-7427" className="text-purple-600 hover:text-purple-800 hover:underline">
                        713-854-7427
                      </a>
                    </p>
                    <p className="flex items-center text-purple-800">
                      <span className="font-medium mr-2">Email:</span>
                      <a href="mailto:info@threesistersoyster.com" className="text-purple-600 hover:text-purple-800 hover:underline">
                        info@threesistersoyster.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <Card className="border-purpleBrand/30 bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-purple-900 mb-6 text-center">Customer Information</h2>

                  {/* Customer Form */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <Label htmlFor="customerName" className="text-sm font-medium text-purple-900">
                        Full Name (Optional)
                      </Label>
                      <Input
                        id="customerName"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1 border-purple-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customerEmail" className="text-sm font-medium text-purple-900">
                        Email Address (Optional)
                      </Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="mt-1 border-purple-200"
                      />
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-purple-900 mb-6 text-center">Payment Information</h2>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-purple-700 mr-2" />
                        <h3 className="font-semibold text-purple-900 text-center">Secure Checkout</h3>
                      </div>
                      <p className="text-sm text-purple-800">
                        Your payment information is encrypted and secure. We never store your payment details.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
                        <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-purple-900">Secure Payment</p>
                        <p className="text-xs text-purple-600">256-bit SSL encryption</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
                        <Truck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-purple-900">Fast Delivery</p>
                        <p className="text-xs text-purple-600">We'll contact you</p>
                      </div>
                    </div>
                  </div>

                  <Card className="border-purpleBrand/30 bg-purple-50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-purple-900 mb-2 text-center">What happens next?</h3>
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

                  <Button
                    onClick={() => alert("Test button works!")}
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-3 mt-2"
                  >
                    Test Button
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
