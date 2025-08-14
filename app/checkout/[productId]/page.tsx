"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ArrowLeft, Waves } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase, type Product } from "../../lib/supabase"
import { CartButton } from "@/components/cart-button"


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
        // Check if Supabase is properly configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
          console.error("Supabase not configured")
          setLoading(false)
          return
        }

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
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 to-seafoamBrand/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mintBrand mx-auto mb-4"></div>
          <p className="text-white/80">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 to-seafoamBrand/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/80 text-lg mb-4">Product not found</p>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  const { originalDescription, inventory } = parseProductDescription(product.description)
  const totalPrice = product.price * quantity

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Header */}
      <header className="bg-purpleBrand border-b border-purpleBrand/30 sticky top-0 z-50">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purpleBrand to-seafoamBrand rounded-full flex items-center justify-center">
                  <Image
                    src="/logo.jpg"
                    alt="Three Sisters Oyster Co. Logo"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>
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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square bg-gradient-to-br from-purpleBrand/20 to-seafoamBrand/20 rounded-2xl overflow-hidden">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-purpleBrand text-8xl">🦪</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-seafoamBrand/20 text-seafoamBrand border border-seafoamBrand/30 mb-4">{product.category}</Badge>
                <h1 className="text-4xl font-bold text-white mb-4 text-center">{product.name}</h1>
                {originalDescription && <p className="text-white/80 text-lg mb-4">{originalDescription}</p>}
                {inventory > 0 && <p className="text-mintBrand font-medium mb-4">{inventory} available in stock</p>}
              </div>

              <div className="text-center">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                  ${product.price}
                </span>
                <span className="text-white/60 ml-2">per unit</span>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    -
                  </Button>
                  <span className="text-2xl font-bold text-white min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    onClick={() => setQuantity(quantity + 1)}
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    +
                  </Button>
                </div>
              </div>

               {/* Add to Cart - Removed since not implemented in this page */}
               
               {/* Total */}
               <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                 <div className="flex justify-between items-center">
                   <span className="text-lg font-medium text-white">Total:</span>
                   <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                     ${(product.price * quantity).toFixed(2)}
                   </span>
                 </div>
               </div>

               {/* Checkout Button */}
               <Button
                 onClick={handleCheckout}
                 disabled={checkingOut}
                 className="w-full bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-lavenderBrand hover:to-blueBrand text-lg py-6"
               >
                 {checkingOut ? "Processing..." : "Proceed to Checkout"}
               </Button>

              <p className="text-sm text-white/60 mt-4 text-center">Secure payment powered by Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
