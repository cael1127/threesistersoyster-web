"use client"

import { useCallback, useEffect, useState } from "react"
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
  const cartContext = useCart()
  const cartState = cartContext?.state ?? { items: [] }
  const noopClearCart = useCallback(() => {}, [])
  const clearCart = cartContext?.clearCart ?? noopClearCart

  const processOrderCompletion = useCallback(
    async (sessionData?: any) => {
      if (orderProcessed) return

      const derivedSessionId = sessionData?.id || sessionId
      const cartItems = Array.isArray(cartState.items) ? cartState.items : []

      const metadataItemsRaw =
        sessionData?.metadata?.items && typeof sessionData.metadata.items === "string"
          ? sessionData.metadata.items
          : null

      let metadataItems: Array<{ id: string; name: string; quantity: number; price: number }> = []

      if (metadataItemsRaw) {
        try {
          const parsed = JSON.parse(metadataItemsRaw)
          if (Array.isArray(parsed)) {
            metadataItems = parsed
              .map((item: any) => ({
                id: typeof item.id === "string" ? item.id : String(item.id || ""),
                name: typeof item.name === "string" ? item.name : String(item.name || ""),
                quantity:
                  typeof item.quantity === "number" ? item.quantity : parseInt(String(item.quantity || 0), 10),
                price: typeof item.price === "number" ? item.price : parseFloat(String(item.price || 0)),
              }))
              .filter((item) => item.id && item.name && item.quantity > 0 && !Number.isNaN(item.price))
          }
        } catch (error) {
          console.warn("Failed to parse checkout metadata items", error)
        }
      }

      const fallbackItems =
        cartItems.length > 0
          ? cartItems.map((item: any) => ({
              id: typeof item.id === "string" ? item.id : String(item.id || ""),
              name: typeof item.name === "string" ? item.name : String(item.name || ""),
              quantity:
                typeof item.quantity === "number" ? item.quantity : parseInt(String(item.quantity || 0), 10),
              price: typeof item.price === "number" ? item.price : parseFloat(String(item.price || 0)),
            }))
          : metadataItems

      if (!derivedSessionId && fallbackItems.length === 0) {
        return
      }

      setProcessingOrder(true)

      try {
      let orderItems = fallbackItems
      let inventoryNeedsBackup = !derivedSessionId && orderItems.length > 0

        if (derivedSessionId) {
          try {
            const orderResponse = await fetch("/api/orders/from-session", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ session_id: derivedSessionId }),
            })

            const orderResult = await orderResponse.json().catch(() => ({}))

            if (orderResponse.ok && orderResult?.order) {
            inventoryNeedsBackup = false
              const rawItems = orderResult.order.items
              if (Array.isArray(rawItems) && rawItems.length > 0) {
                orderItems = rawItems
              } else if (typeof rawItems === "string") {
                try {
                  const parsedItems = JSON.parse(rawItems)
                  if (Array.isArray(parsedItems) && parsedItems.length > 0) {
                    orderItems = parsedItems
                  }
                } catch (parseError) {
                  console.warn("Unable to parse order items string", parseError)
                }
              }
            } else if (!orderResponse.ok) {
            inventoryNeedsBackup = orderItems.length > 0
              console.error("Order creation from session failed", orderResult)
            }
          } catch (orderError) {
          inventoryNeedsBackup = orderItems.length > 0
            console.error("Unable to create order from session", orderError)
          }
        }

      if (inventoryNeedsBackup && orderItems.length > 0) {
          try {
            const inventoryResponse = await fetch("/api/update-inventory", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                items: orderItems,
                session_id: derivedSessionId,
              }),
            })

            if (!inventoryResponse.ok) {
              const inventoryResult = await inventoryResponse.json().catch(() => ({}))
              console.error("Inventory backup update failed", inventoryResult)
            }
          } catch (inventoryError) {
            console.error("Inventory backup update threw error", inventoryError)
          }
        }
      } finally {
        clearCart()
        setOrderProcessed(true)
        setProcessingOrder(false)
      }
    },
    [cartState.items, clearCart, orderProcessed, sessionId]
  )

  useEffect(() => {
    // Check if this is a reservation (has order data in URL params)
    if (searchParams.get('reservation') === 'true') {
      setLoading(false)
      return
    }

    const runFallback = async (sessionData?: any) => {
      try {
        await processOrderCompletion(sessionData)
      } catch (error) {
        console.error("Fallback order processing failed", error)
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) {
      // Fetch session details
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then(async (data) => {
          setSession(data)
          await processOrderCompletion(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Failed to retrieve checkout session", error)
          runFallback()
        })
    } else {
      runFallback()
    }
  }, [sessionId, searchParams, processOrderCompletion])

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
                  All oysters are for pickup in person at Three Sisters Oyster Co. Orders placed Monday through Wednesday are ready for pickup Friday through Sunday. Orders after Wednesday are for the following week.
                </p>
              </div>

              <p className="text-purple-800 mb-6">
                Thank you for your order! Please screenshot this page as your receipt.
              </p>
              
              <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <p className="text-blue-800 font-semibold mb-2">📸 Screenshot This Receipt</p>
                <p className="text-blue-700 text-sm">
                  Take a screenshot of this page to save your order confirmation. You'll need this for pickup.
                </p>
              </div>

              {/* Order Processing Status */}
              {processingOrder && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    <span className="text-blue-800 font-medium">Processing your order and updating inventory...</span>
                  </div>
                </div>
              )}

              {/* Receipt Details - Screenshot Friendly */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-purple-200" id="receipt">
                <div className="text-center mb-6 pb-4 border-b-2 border-purple-200">
                  <h2 className="text-2xl font-bold text-purple-900 mb-2">🦪 Three Sisters Oyster Co.</h2>
                  <p className="text-purple-700">Order Receipt</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-700 font-medium">Order ID:</span>
                    <span className="text-purple-900 font-bold">#{session?.id?.slice(-8) || searchParams.get('orderId')?.slice(-8) || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-700 font-medium">Date:</span>
                    <span className="text-purple-900 font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-700 font-medium">Total Amount:</span>
                    <span className="text-purple-900 font-bold text-lg">
                      ${session?.amount_total ? (session.amount_total / 100).toFixed(2) : searchParams.get('total') || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-700 font-medium">Payment Status:</span>
                    <span className={`font-semibold ${searchParams.get('reservation') ? 'text-blue-600' : 'text-green-600'}`}>
                      {searchParams.get('reservation') ? '📋 Reserved (Pay in Person - Cash Only)' : '✅ Paid'}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                {(cartState.items && cartState.items.length > 0) && (
                  <div className="mb-6 pt-4 border-t-2 border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-3 text-lg">Order Items:</h3>
                    <div className="space-y-2">
                      {cartState.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                          <span className="text-gray-700">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="text-purple-900 font-medium">
                            ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-300 mt-2">
                        <span className="text-purple-900">Total:</span>
                        <span className="text-purple-900">
                          ${session?.amount_total ? (session.amount_total / 100).toFixed(2) : searchParams.get('total') || cartState.items.reduce((sum: number, item: any) => sum + ((item.price || 0) * (item.quantity || 1)), 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pickup Information */}
                <div className="pt-4 border-t-2 border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-3 text-lg">Pickup Information:</h3>
                  <div className="space-y-2 text-sm bg-amber-50 p-3 rounded">
                    <p className="text-amber-800 font-semibold">📍 Location: Three Sisters Oyster Co.</p>
                    <p className="text-amber-700">
                      {searchParams.get('reservation') 
                        ? 'Your order will be ready for pickup Friday through Sunday. Orders placed Monday through Wednesday are ready for pickup Friday through Sunday. Payment in person is cash only at this time.'
                        : 'Your order will be ready for pickup Friday through Sunday. Orders placed Monday through Wednesday are ready for pickup Friday through Sunday.'}
                    </p>
                  </div>
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
