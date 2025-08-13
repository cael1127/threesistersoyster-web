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

  function ProductCard({ product }: { product: any }) {
    const { originalDescription, inventory } = parseProductDescription(product.description)

    return (
      <Card className="border-purple-200 hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="aspect-video bg-gradient-to-br from-purple-100 to-teal-100 relative overflow-hidden rounded-t-lg">
            {product.image_url ? (
              <Image
                src={product.image_url || "/logo.jpg"}
                alt={product.name}
                fill
                className="object-cover"
                quality={90}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-purple-400 text-4xl">
                  {oysterCategories.some((category) => product.category.toLowerCase().includes(category.toLowerCase()))
                    ? "🦪"
                    : "🛍️"}
                </span>
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-purple-900 text-center">{product.name}</h3>
              <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">{product.category}</Badge>
            </div>

            {originalDescription && <p className="text-gray-600 mb-4">{originalDescription}</p>}

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
                ${product.price.toFixed(2)}
              </span>
              {inventory > 0 && <span className="text-sm text-green-600 font-medium">{inventory} in stock</span>}
            </div>

            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                category: product.category,
                maxInventory: inventory > 0 ? inventory : undefined,
              }}
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Header */}
      <header className="bg-purpleBrand border-b border-purple-300/30 sticky top-0 z-50">
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
                <Link href="/products" className="text-seafoamBrand font-medium text-sm">
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
                  <Link href="/products" className="text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-purple-900 px-2 text-center">Our Products</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Premium oysters and aquaculture products from the pristine waters of Keller Bay
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available at the moment.</p>
            <p className="text-gray-500 mt-2">Please check back soon or contact us directly.</p>
          </div>
        ) : (
          <Tabs defaultValue="oysters" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white border border-purple-200">
              <TabsTrigger value="oysters" className="flex items-center space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 text-gray-700 hover:text-purple-700 data-[state=inactive]:text-gray-700">
                <Fish className="w-4 h-4" />
                <span>Fresh Oysters</span>
                <Badge className="bg-purple-100 text-purple-800 ml-2">{oysterProducts.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="merchandise" className="flex items-center space-x-2 data-[state=active]:bg-teal-100 data-[state=active]:text-teal-900 text-gray-700 hover:text-teal-700 data-[state=inactive]:text-gray-700">
                <ShoppingBag className="w-4 h-4" />
                <span>Merchandise</span>
                <Badge className="bg-teal-100 text-teal-800 ml-2">{merchProducts.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="oysters">
              <div className="mb-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-purple-900 text-center">Fresh Oysters & Related Products</h2>
                  <p className="text-gray-600 mt-1">
                    Premium half-shell oysters, hardy seed stock, and oyster-themed merchandise from our Keller Bay
                    operations
                  </p>
                </div>
              </div>

              {oysterProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Fish className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No oyster products available at the moment.</p>
                  <p className="text-gray-500 mt-2">
                    Contact us directly at{" "}
                    <a href="tel:713-854-7427" className="text-purple-600 hover:underline font-medium">
                      713-854-7427
                    </a>{" "}
                    for fresh oyster availability.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {oysterProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="merchandise">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-purple-900 text-center">Three Sisters Merchandise</h2>
                    <p className="text-gray-600 mt-1">
                      Show your support for sustainable aquaculture with our branded merchandise
                    </p>
                  </div>
                </div>
              </div>

              {merchProducts.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No merchandise available at the moment.</p>
                  <p className="text-gray-500 mt-2">Check back soon for branded apparel and accessories!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {merchProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="border-purple-200 bg-gradient-to-r from-purple-100 to-teal-100">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-purple-900 mb-4 text-center">Need Custom Orders?</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Looking for bulk oyster orders, custom merchandise, or have specific aquaculture needs? Contact us
                directly for personalized service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="tel:713-854-7427"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white font-medium rounded-md transition-all duration-200"
                >
                  Call 713-854-7427
                </Link>
                <Link
                  href="mailto:info@threesistersoyster.com"
                  className="inline-flex items-center justify-center px-6 py-3 border border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent font-medium rounded-md transition-all duration-200"
                >
                  Send Email
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
