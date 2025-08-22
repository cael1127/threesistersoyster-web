"use client"

import { getProducts } from "@/lib/supabase"
import { Product } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { Waves, Fish, ShoppingBag } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { FloatingParticles } from "@/components/ui/floating-particles"
import Navigation from "@/components/Navigation"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const productsData = await getProducts()
      setProducts(productsData)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Helper function to parse product description and get inventory
  function parseProductDescription(description: string | null, inventory_count: number | null) {
    let originalDescription = ""
    
    if (description) {
      try {
        const parsed = JSON.parse(description)
        originalDescription = parsed.originalDescription || description
      } catch (error) {
        // If it's not JSON, treat as plain text
        originalDescription = description
      }
    }
    
    return {
      originalDescription,
      inventory: inventory_count || 0,
    }
  }

  // Separate products by category - include merchandise tagged with "oysters" in oyster products
  const oysterCategories = ["farm", "nursery", "fresh oysters", "seed oysters", "market oysters", "oysters"]
  const oysterProducts = products.filter((product) =>
    oysterCategories.some((category) => product.category.toLowerCase().includes(category.toLowerCase())),
  )

  const merchProducts = products.filter(
    (product) => !oysterCategories.some((category) => product.category.toLowerCase().includes(category.toLowerCase())),
  )

  function ProductCard({ product }: { product: Product }) {
    const { originalDescription, inventory } = parseProductDescription(product.description, product.inventory_count)

    return (
      <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 to-seafoamBrand/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group">
        <CardContent className="p-6">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-purpleBrand/20 to-seafoamBrand/20 rounded-lg overflow-hidden mb-4">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-purpleBrand text-6xl">🦪</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-purple-900 mb-2">{product.name}</h3>
                            <Badge className="bg-purpleBrand/20 text-purple-800 border border-purpleBrand/30 hover:bg-purpleBrand/30 mb-3">
                  {product.category}
                </Badge>
            {originalDescription && <p className="text-purple-800 mb-4 text-sm">{originalDescription}</p>}
            
            {/* Price */}
            <div className="mb-4">
              <span className="text-2xl font-bold text-purple-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Inventory Status */}
            {inventory > 0 ? (
              <p className="text-purple-800 text-sm font-medium mb-4">{inventory} in stock</p>
            ) : (
              <p className="text-purple-600 text-sm mb-4">Contact for availability</p>
            )}

            {/* Add to Cart Button */}
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                category: product.category,
                maxInventory: inventory > 0 ? inventory : undefined
              }}
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <FloatingParticles particleCount={10} interactive={true} />
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-purple-900 mb-4 text-center">Our Products</h1>
            <p className="text-lg text-purple-800 mb-8 text-center">
              Discover our premium Texas oysters, carefully cultivated for exceptional taste and quality.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => {
              const { originalDescription, inventory } = parseProductDescription(product.description, product.inventory_count)
              return (
                <ProductCard key={product.id} product={product} />
              )
            })}
          </div>

          {/* No Products Message */}
          {products.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Fish className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              </div>
              <h2 className="text-2xl font-bold text-purple-900 text-center">Fresh Oysters & Related Products</h2>
              <p className="text-purple-800 mt-1">
                Premium oysters grown in the pristine waters of Keller Bay
              </p>
              <p className="text-purple-600 text-lg">No oyster products available at the moment.</p>
              <p className="text-purple-500 mt-2">
                Please check back soon for availability.
              </p>
            </div>
          )}

          {/* No Merchandise Message */}
          {merchProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              </div>
              <h2 className="text-2xl font-bold text-purple-900 text-center">Three Sisters Merchandise</h2>
              <p className="text-purple-800 mt-1">
                Branded apparel and accessories
              </p>
              <p className="text-purple-600 text-lg">No merchandise available at the moment.</p>
              <p className="text-purple-500 mt-2">Check back soon for branded apparel and accessories!</p>
            </div>
          )}

          {/* Custom Orders CTA */}
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-purple-900 mb-4 text-center">Need Custom Orders?</h3>
            <p className="text-purple-800 mb-6 max-w-2xl mx-auto">
              Looking for specific quantities, sizes, or have special requirements? We're happy to work with you to
              create custom orders that meet your needs.
            </p>

          </div>
        </div>
      </main>
    </div>
  )
}
