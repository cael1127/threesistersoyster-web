"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ArrowLeft, Waves } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { CartButton } from "@/components/cart-button"

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
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
                <CartButton />
                <Button asChild className="bg-mintBrand hover:bg-seafoamBrand">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Waves className="w-12 h-12 text-white/40" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4 text-center">Your Cart is Empty</h1>
            <p className="text-white/80 mb-8">Add some premium oysters to get started!</p>
            <Button asChild className="bg-mintBrand hover:bg-seafoamBrand">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
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
              <CartButton />
              <Button asChild className="bg-mintBrand hover:bg-seafoamBrand">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <Card key={item.id} className="border-purpleBrand/30 bg-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-purpleBrand/20 to-seafoamBrand/20 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-purpleBrand text-2xl">🦪</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-center">{item.name}</h3>
                        <Badge className="bg-seafoamBrand/20 text-seafoamBrand border border-seafoamBrand/30 text-xs mt-1">{item.category}</Badge>
                        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purpleBrand to-seafoamBrand mt-2">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-white font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-mintBrand hover:text-seafoamBrand hover:bg-mintBrand/20 border-mintBrand/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Subtotal:</span>
                        <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Clear Cart Button */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-mintBrand/30 text-mintBrand hover:bg-mintBrand/20"
                >
                  Clear Cart
                </Button>
                <span className="text-sm text-white/60">
                  {state.itemCount} item{state.itemCount !== 1 ? 's' : ''} in cart
                </span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-purpleBrand/30 bg-white/10 backdrop-blur-sm sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4 text-center">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span className="text-white/80">{item.name} × {item.quantity}</span>
                        <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/20 pt-4 mb-6">
                    <div className="flex justify-between items-center text-lg font-semibold text-white">
                      <span>Total:</span>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                        ${state.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-lavenderBrand hover:to-blueBrand text-lg py-6"
                  >
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>

                  <p className="text-xs text-white/60 mt-4 text-center">Secure payment powered by Stripe</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
