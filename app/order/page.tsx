"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createOrder } from "../lib/supabase"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { CartButton } from "@/components/cart-button"
import Image from "next/image"

export default function OrderPage() {
  const [orderItems, setOrderItems] = useState<any[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const addToOrder = (item: any) => {
    const existingItem = orderItems.find((orderItem) => orderItem.id === item.id)
    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem,
        ),
      )
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }])
    }
  }

  const removeFromOrder = (itemId: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromOrder(itemId)
    } else {
      setOrderItems(orderItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.pricePerDozen || 0) * item.quantity, 0)
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createOrder({
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        items: orderItems,
        total_amount: calculateTotal(),
      })
      setOrderSuccess(true)
      setOrderItems([])
      setCustomerInfo({ name: "", email: "" })
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("Failed to submit order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 to-seafoamBrand/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-mintBrand/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-mintBrand" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Order Submitted!</h2>
          <p className="text-white/80 mb-6">
            Thank you for your order! We'll contact you within 24 hours to arrange delivery or pickup.
          </p>
          <Button asChild className="w-full bg-gradient-to-r from-purpleBrand to-seafoamBrand">
            <Link href="/">Return Home</Link>
          </Button>
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
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-mintBrand text-center">
                  Three Sisters Oyster Co.
                </h1>
                <p className="text-xs text-seafoamBrand">Premium Texas Oysters</p>
              </div>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  Home
                </Link>
                <Link href="/products" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  Products
                </Link>
                <Link
                  href="/inventory"
                  className="text-mintBrand hover:text-seafoamBrand font-medium text-sm"
                >
                  Inventory
                </Link>
                <Link href="/gallery" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  Gallery
                </Link>
                <Link href="/about" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  About
                </Link>
                <Link href="/contact" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  Contact
                </Link>
              </nav>
              
              {/* Mobile Layout - Restructured for better spacing */}
              <div className="flex md:hidden items-center w-full">
                {/* Mobile Navigation - Compact */}
                <nav className="flex items-center flex-1 px-4">
                  <Link href="/products" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
                    Shop
                  </Link>
                  <Link href="/inventory" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
                    Stock
                  </Link>
                  <Link href="/gallery" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
                    Gallery
                  </Link>
                  <Link href="/about" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
                    About
                  </Link>
                  <Link href="/contact" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
                    Contact
                  </Link>
                </nav>
                
                {/* Mobile Cart/Order Buttons */}
                <div className="flex items-center space-x-1 px-2">
                  <CartButton />
                  <Button
                    asChild
                    size="sm"
                    className="bg-mintBrand hover:bg-seafoamBrand text-white text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Link href="/order">Order</Link>
                  </Button>
                </div>
              </div>
              
              {/* Desktop Cart/Order Buttons */}
              <div className="hidden md:flex items-center space-x-1">
                <CartButton />
                <Button
                  asChild
                  size="sm"
                  className="bg-mintBrand hover:bg-seafoamBrand text-white text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Link href="/order">Order</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 text-center">Place Your Order</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Ready to get started with Three Sisters Oyster Co.? Let us know what you need and we'll get back to you quickly.
            </p>
          </div>

          {/* Order Form */}
          <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/20 to-blueBrand/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Order Information</h2>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Contact Information</h3>
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <span className="font-medium text-mintBrand w-20">Phone:</span>
                    <a href="tel:713-854-7427" className="text-white/80 hover:text-mintBrand transition-colors duration-200">
                      713-854-7427
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <span className="font-medium text-mintBrand w-20">Email:</span>
                    <a href="mailto:info@threesistersoyster.com" className="text-white/80 hover:text-mintBrand transition-colors duration-200">
                      info@threesistersoyster.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Order Types */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Order Types</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 border border-seafoamBrand/30 rounded-lg bg-seafoamBrand/10">
                    <h4 className="font-semibold text-seafoamBrand mb-2 text-center">Nursery Orders</h4>
                    <p className="text-sm text-white/80 mb-3">Hardy Gulf Coast oyster seed for growers</p>
                    <Badge className="bg-seafoamBrand/20 text-seafoamBrand border border-seafoamBrand/30">Seed Stock</Badge>
                  </div>
                  <div className="p-4 border border-purpleBrand/30 rounded-lg bg-purpleBrand/10">
                    <h4 className="font-semibold text-purpleBrand mb-2 text-center">Farm Orders</h4>
                    <p className="text-sm text-white/80 mb-3">Premium half-shell oysters ready for market</p>
                    <Badge className="bg-purpleBrand/20 text-purpleBrand border border-purpleBrand/30">Market Ready</Badge>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <div className="space-y-6">
                <p className="text-white/80 mb-4">
                  Please fill out the form below with your order details. We'll contact you within 24 hours to confirm
                  availability and arrange delivery or pickup.
                </p>

                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-white placeholder-white/50"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-white placeholder-white/50"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-white placeholder-white/50"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Order Details *</label>
                    <textarea
                      name="orderDetails"
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-white placeholder-white/50"
                      placeholder="Please describe what you'd like to order, including quantities, sizes, and any special requirements..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-lavenderBrand hover:to-blueBrand"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Order"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-mintBrand text-mintBrand hover:bg-mintBrand/20 bg-transparent"
                      onClick={() => window.history.back()}
                    >
                      Back
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
