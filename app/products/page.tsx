"use client"

import { getProducts } from "@/lib/supabase"
import { Product } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { Waves, Fish, ShoppingBag } from "lucide-react"
import { CartButton } from "@/components/cart-button"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

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
      // If it's not JSON, treat as plain text
      return { originalDescription: description, inventory: 0 }
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
    const { originalDescription, inventory } = parseProductDescription(product.description)

    return (
      <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 to-seafoamBrand/20 hover:shadow-xl transition-all duration-300 group">
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
            <Badge className="bg-seafoamBrand/20 text-seafoamBrand border border-seafoamBrand/30 hover:bg-seafoamBrand/30 mb-3">
              {product.category}
            </Badge>
            {originalDescription && <p className="text-purple-800 mb-4 text-sm">{originalDescription}</p>}
            
            {/* Price */}
            <div className="mb-4">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Inventory Status */}
            {inventory > 0 ? (
              <p className="text-mintBrand text-sm font-medium mb-4">{inventory} in stock</p>
            ) : (
              <p className="text-purple-600 text-sm mb-4">Contact for availability</p>
            )}

            {/* Add to Cart Button */}
            <Button
              asChild
              className="w-full bg-mintBrand hover:bg-seafoamBrand text-white"
            >
              <Link href={`/checkout/${product.id}`}>Add to Cart</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
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
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-white hover:text-mintBrand font-medium text-sm">Home</Link>
                <Link href="/products" className="text-white hover:text-mintBrand font-medium text-sm">Products</Link>
                <Link href="/inventory" className="text-white hover:text-mintBrand font-medium text-sm">Inventory</Link>
                <Link href="/gallery" className="text-white hover:text-mintBrand font-medium text-sm">Gallery</Link>
                <Link href="/about" className="text-white hover:text-mintBrand font-medium text-sm">About</Link>
                <Link href="/contact" className="text-white hover:text-mintBrand font-medium text-sm">Contact</Link>
              </nav>
              {/* Mobile Layout - Restructured for better spacing */}
              <div className="flex md:hidden items-center w-full">
                {/* Mobile Navigation - Compact */}
                <nav className="flex items-center flex-1 px-4">
                  <Link href="/products" className="text-white hover:text-mintBrand font-medium text-xs py-3 flex-1 text-center">Shop</Link>
                  <Link href="/inventory" className="text-white hover:text-mintBrand font-medium text-xs py-3 flex-1 text-center">Stock</Link>
                  <Link href="/gallery" className="text-white hover:text-mintBrand font-medium text-xs py-3 flex-1 text-center">Gallery</Link>
                  <Link href="/about" className="text-white hover:text-mintBrand font-medium text-xs py-3 flex-1 text-center">About</Link>
                  <Link href="/contact" className="text-white hover:text-mintBrand font-medium text-xs py-3 flex-1 text-center">Contact</Link>
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
              const { originalDescription, inventory } = parseProductDescription(product.description)
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
                Please check back soon or contact us directly for availability.
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
            <Button
              asChild
              className="bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-lavenderBrand hover:to-blueBrand text-white font-medium rounded-md transition-all duration-200"
            >
              <Link href="/contact">Contact Us for Custom Orders</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
