"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ArrowLeft, Waves } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase, type Product } from "../../lib/supabase"

export default function CheckoutPage() {
  const params = useParams()
  const productId = params.productId as string
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [checkingOut, setCheckingOut] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

        if (error) {
          console.error("Error fetching product:", error)
        } else {
          setProduct(data)
        }
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  // Helper function to parse product description
  function parseProductDescription(description: string | null) {
    if (!description) return { originalDescription: "", inventory: 0 }

    try {
      const parsed = JSON.parse(description)
      return {
        originalDescription: parsed.originalDescription || "",
        inventory: parsed.inventory || 0,
      }
    } catch (error) {
      return { originalDescription: description, inventory: 0 }
    }
  }

  const handleCheckout = async () => {
    if (!product) return

    setCheckingOut(true)

    try {
      // Create Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: quantity,
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      alert("Failed to start checkout. Please try again.")
    } finally {
      setCheckingOut(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Product not found</p>
          <Button asChild variant="outline">
            <Link href="/products" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const { originalDescription, inventory } = parseProductDescription(product.description)
  const totalPrice = product.price * quantity

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-teal-600 rounded-full flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-purple-900">Three Sisters Oyster Co.</h1>
                <p className="text-sm text-teal-600">Premium Texas Oysters</p>
              </div>
            </Link>
            <Button asChild variant="outline">
              <Link href="/products" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Products</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-teal-100 rounded-2xl overflow-hidden">
              {product.image_url ? (
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-purple-400 text-8xl">🦪</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 mb-4">{product.category}</Badge>
                <h1 className="text-4xl font-bold text-purple-900 mb-4">{product.name}</h1>
                {originalDescription && <p className="text-gray-600 text-lg mb-4">{originalDescription}</p>}
                {inventory > 0 && <p className="text-green-600 font-medium mb-4">{inventory} available in stock</p>}
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-500 ml-2">per unit</span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={inventory > 0 && quantity >= inventory}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Total Price */}
              <div className="mb-8 p-4 bg-white/80 rounded-lg border border-purple-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">Total:</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={checkingOut || (inventory > 0 && quantity > inventory)}
                className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-lg py-6"
              >
                {checkingOut ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <p className="text-sm text-gray-500 mt-4 text-center">Secure payment powered by Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
