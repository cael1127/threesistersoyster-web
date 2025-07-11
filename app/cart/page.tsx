"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ArrowLeft, Waves } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
        {/* Header */}
        <header className="bg-gradient-to-r from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand border-b border-purple-300/30 sticky top-0 z-50">
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
                <div>
                  <h1 className="text-sm md:text-xl font-bold text-purple-900">
                    <span className="md:hidden">Three Sisters</span>
                    <span className="hidden md:inline">Three Sisters Oyster Co.</span>
                  </h1>
                  <p className="text-xs text-[#3a2a4d] hidden sm:block">Premium Texas Oysters</p>
                </div>
              </Link>
              <Button asChild variant="outline" className="min-h-[36px] md:min-h-[44px]">
                <Link href="/products" className="flex items-center space-x-2 text-xs md:text-sm">
                  <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Continue Shopping</span>
                  <span className="sm:hidden">Shop</span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Waves className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-purple-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some premium oysters to get started!</p>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-teal-600">
              <Link href="/products">Shop Products</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
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
              <div>
                <h1 className="text-sm md:text-xl font-bold text-[#3a2a4d]">
                  <span className="md:hidden">Three Sisters</span>
                  <span className="hidden md:inline">Three Sisters Oyster Co.</span>
                </h1>
                <p className="text-xs text-[#3a2a4d] hidden sm:block">Premium Texas Oysters</p>
              </div>
            </Link>
            <Button asChild variant="outline" className="min-h-[36px] md:min-h-[44px]">
              <Link href="/products" className="flex items-center space-x-2 text-xs md:text-sm">
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Continue Shopping</span>
                <span className="sm:hidden">Shop</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-purple-900">Shopping Cart</h1>
            <Button
              onClick={clearCart}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
            >
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <Card key={item.id} className="border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-teal-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image_url ? (
                          <Image
                            src={item.image_url || "/logo.jpg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            quality={90}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-purple-400 text-2xl">🦪</span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-purple-900">{item.name}</h3>
                            <Badge className="bg-teal-100 text-teal-800 text-xs mt-1">{item.category}</Badge>
                            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600 mt-2">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>

                          <Button
                            onClick={() => removeItem(item.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={!!item.maxInventory && item.quantity >= item.maxInventory}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm text-gray-500 ml-4">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-purple-200 sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-purple-900 mb-4">Order Summary</h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Items ({state.itemCount}):</span>
                      <span>${state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-purple-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-purple-900">Total:</span>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
                        ${state.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-lg py-6"
                  >
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>

                  <p className="text-xs text-gray-500 mt-4 text-center">Secure payment powered by Stripe</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
