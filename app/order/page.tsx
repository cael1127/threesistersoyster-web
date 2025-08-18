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
import { Phone, Mail } from "lucide-react"
import { FloatingParticles } from "@/components/ui/floating-particles"

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
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 to-seafoamBrand/20 flex items-center justify-center relative">
        <FloatingParticles particleCount={6} interactive={true} />
        <div className="text-center">
          <div className="w-16 h-16 bg-mintBrand/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingCart className="w-8 h-8 text-white" />
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
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-white text-center">
                  Three Sisters Oyster Co.
                </h1>
                <p className="text-xs text-white">Premium Texas Oysters</p>
              </div>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-white hover:text-white font-medium text-sm">
                  Home
                </Link>
                <Link href="/products" className="text-white hover:text-white font-medium text-sm">
                  Products
                </Link>
                <Link
                  href="/inventory"
                  className="text-white hover:text-white font-medium text-sm"
                >
                  Inventory
                </Link>
                <Link href="/gallery" className="text-white hover:text-white font-medium text-sm">
                  Gallery
                </Link>
                <Link href="/about" className="text-white hover:text-white font-medium text-sm">
                  About
                </Link>

              </nav>
              
              {/* Mobile Layout - Improved spacing and touch targets */}
              <div className="flex md:hidden items-center w-full">
                {/* Mobile Navigation - Better spaced and larger touch targets */}
                <nav className="flex items-center justify-between flex-1 px-2 space-x-1">
                  <Link 
                    href="/" 
                    className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/products" 
                    className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                  >
                    Shop
                  </Link>
                  <Link 
                    href="/inventory" 
                    className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                  >
                    Stock
                  </Link>
                  <Link 
                    href="/gallery" 
                    className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                  >
                    Gallery
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                  >
                    About
                  </Link>

                </nav>
                
                {/* Mobile Cart/Order Buttons - Better spaced */}
                <div className="flex items-center space-x-2 px-3">
                  <CartButton />
                  <Button
                    asChild
                    size="sm"
                    className="bg-mintBrand hover:bg-seafoamBrand text-white text-sm px-3 min-h-[44px] focus-visible:ring-0 focus-visible:ring-offset-0"
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
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/20 to-blueBrand/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-purple-900 mb-4 text-center">Order Information</h2>
                <p className="text-purple-800 mb-6 text-center">
                  Please provide your order details and we'll get back to you within 24 hours.
                </p>

                {/* Contact Information */}
                <div className="bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4 text-center">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div>
                      <Phone className="w-5 h-5 text-white mx-auto mb-2" />
                      <a href="tel:713-854-7427" className="text-purple-800 hover:text-white transition-colors duration-200">
                        713-854-7427
                      </a>
                    </div>
                    <div>
                                        <Mail className="w-5 h-5 text-white mx-auto mb-2" />
                  <a href="mailto:info@threesistersoyster.com" className="text-purple-800 hover:text-white transition-colors duration-200">
                    info@threesistersoyster.com
                  </a>
                    </div>
                  </div>
                </div>

                {/* Order Types */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4 text-center">Order Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nursery Orders */}
                    <div className="border border-white/30 rounded-lg bg-white/10 p-4">
                      <h4 className="text-lg font-semibold text-white mb-2 text-center">Nursery Orders</h4>
                      <p className="text-purple-800 mb-3 text-sm text-center">
                        Hardy Eastern oyster seed for growers
                      </p>
                      <Badge className="bg-white/20 text-white border border-white/30">
                        Available Year-Round
                      </Badge>
                    </div>

                    {/* Farm Orders */}
                    <div className="border border-purpleBrand/30 rounded-lg bg-purpleBrand/10 p-4">
                      <h4 className="text-lg font-semibold text-purpleBrand mb-2 text-center">Farm Orders</h4>
                      <p className="text-purple-800 mb-3 text-sm text-center">
                        Premium half-shell market oysters
                      </p>
                      <Badge className="bg-purpleBrand/20 text-purpleBrand border border-purpleBrand/30">
                        Seasonal Availability
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Order Form */}
                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  <p className="text-purple-800 text-center">
                    Fill out the form below and we'll contact you to arrange your order.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-900 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-purple-900 placeholder-purple-600"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-900 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-purple-900 placeholder-purple-600"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-purple-900 placeholder-purple-600"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-purple-900 placeholder-purple-600"
                      placeholder="(713) 854-7427"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-2">Order Details</label>
                    <textarea
                      name="orderDetails"
                      rows={4}
                      required
                      className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-purple-900 placeholder-purple-600"
                      placeholder="Please describe your order including quantities, sizes, and any special requirements..."
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-lavenderBrand hover:to-blueBrand"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Order Request"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.history.back()}
                      className="border-white text-white hover:bg-white/20 ml-3"
                    >
                      Back
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
