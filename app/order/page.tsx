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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-teal-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Order Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll contact you soon to confirm details and arrange delivery.
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-teal-600">
                <Link href="/">Return Home</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/order">Place Another Order</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Header */}
      <header className="bg-purple-900 border-b border-purple-300/30 sticky top-0 z-50">
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
                <h1 className="text-xl font-bold text-white">
                  Three Sisters Oyster Co.
                </h1>
                <p className="text-xs text-white">Premium Texas Oysters</p>
              </div>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  Home
                </Link>
                <Link href="/products" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  Products
                </Link>
                <Link
                  href="/inventory"
                  className="text-purple-700 hover:text-teal-600 font-medium text-sm"
                >
                  Inventory
                </Link>
                <Link href="/about" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  About
                </Link>
                <Link href="/contact" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  Contact
                </Link>
              </nav>
              
              {/* Mobile Layout - Restructured for better spacing */}
              <div className="flex md:hidden items-center w-full">
                {/* Mobile Navigation - Compact */}
                <nav className="flex items-center flex-1 px-4">
                  <Link href="/products" className="text-purple-700 hover:text-teal-600 font-medium text-xs py-2 flex-1 text-center">
                    Shop
                  </Link>
                  <Link href="/inventory" className="text-purple-700 hover:text-teal-600 font-medium text-xs py-2 flex-1 text-center">
                    Stock
                  </Link>
                  <Link href="/about" className="text-purple-700 hover:text-teal-600 font-medium text-xs py-2 flex-1 text-center">
                    About
                  </Link>
                  <Link href="/contact" className="text-purple-700 hover:text-teal-600 font-medium text-xs py-2 flex-1 text-center">
                    Contact
                  </Link>
                </nav>
                
                {/* Mobile Cart/Order Buttons */}
                <div className="flex items-center space-x-1 px-2">
                  <CartButton />
                  <Button
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
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
                  className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Link href="/order">Order</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Place Your Order</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Contact us directly to place your order for premium oysters
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-purple-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Order Information</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-100 to-teal-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="font-medium text-purple-700 w-20">Phone:</span>
                      <a href="tel:713-854-7427" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
                        713-854-7427
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-purple-700 w-20">Email:</span>
                      <a href="mailto:info@threesistersoyster.com" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
                        info@threesistersoyster.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-purple-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">Order Types</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-teal-200 rounded-lg">
                      <h4 className="font-semibold text-teal-800 mb-2">Nursery Orders</h4>
                      <p className="text-sm text-gray-600 mb-3">Hardy Gulf Coast oyster seed for growers</p>
                      <Badge className="bg-teal-100 text-teal-800">Seed Stock</Badge>
                    </div>
                    <div className="p-4 border border-purple-200 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Farm Orders</h4>
                      <p className="text-sm text-gray-600 mb-3">Premium half-shell oysters ready for market</p>
                      <Badge className="bg-purple-100 text-purple-800">Market Ready</Badge>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Ready to place an order? Contact us directly for pricing and availability.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
                      onClick={() => (window.location.href = "tel:713-854-7427")}
                    >
                      Call Now: 713-854-7427
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                      onClick={() => (window.location.href = "mailto:info@threesistersoyster.com")}
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
