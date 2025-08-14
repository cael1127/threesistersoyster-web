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
      <Card key={product.id} className="border-purpleBrand/30 hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="aspect-video bg-gradient-to-br from-purpleBrand/20 to-seafoamBrand/20 relative overflow-hidden rounded-t-lg">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-purpleBrand text-4xl">
                  🦪
                </span>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white text-center">{product.name}</h3>
              <Badge className="bg-seafoamBrand/20 text-seafoamBrand border border-seafoamBrand/30">{product.category}</Badge>
            </div>
            
            {originalDescription && <p className="text-white/80 mb-4">{originalDescription}</p>}
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                ${product.price}
              </span>
              {inventory > 0 && <span className="text-sm text-mintBrand font-medium">{inventory} in stock</span>}
            </div>
            
            <AddToCartButton product={product} />
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
            <h1 className="text-4xl font-bold text-white px-2 text-center">Our Products</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto px-4">
              Discover our premium oysters and Three Sisters merchandise. Fresh from the Gulf Coast waters.
            </p>
          </div>

          {/* No Products Message */}
          {products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/80 text-lg">No products available at the moment.</p>
              <p className="text-white/60 mt-2">Please check back soon or contact us directly.</p>
            </div>
          )}

          {/* Product Tabs */}
          {products.length > 0 && (
            <>
              <Tabs defaultValue="oysters" className="w-full mb-8">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 backdrop-blur-sm border border-white/20">
                  <TabsTrigger value="oysters" className="flex items-center space-x-2 data-[state=active]:bg-mintBrand/20 data-[state=active]:text-white text-white/80 hover:text-white data-[state=inactive]:text-white/80">
                    <Fish className="w-4 h-4" />
                    <span>Oysters</span>
                    <Badge className="bg-mintBrand/20 text-mintBrand border border-mintBrand/30 ml-2">{oysterProducts.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="merchandise" className="flex items-center space-x-2 data-[state=active]:bg-seafoamBrand/20 data-[state=active]:text-white text-white/80 hover:text-white data-[state=inactive]:text-white/80">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Merchandise</span>
                    <Badge className="bg-seafoamBrand/20 text-seafoamBrand border border-seafoamBrand/30 ml-2">{merchProducts.length}</Badge>
                  </TabsTrigger>
                </TabsList>

                {/* Oysters Tab */}
                <TabsContent value="oysters" className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white text-center">Fresh Oysters & Related Products</h2>
                    <p className="text-white/80 mt-1">
                      Premium oysters grown in the pristine waters of Keller Bay, Texas.
                    </p>
                  </div>

                  {oysterProducts.length === 0 ? (
                    <div className="text-center py-16">
                      <Fish className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <p className="text-white/80 text-lg">No oyster products available at the moment.</p>
                      <p className="text-white/60 mt-2">
                        Please contact us directly for availability and pricing.
                      </p>
                      <a href="tel:713-854-7427" className="text-mintBrand hover:underline font-medium">
                        713-854-7427
                      </a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {oysterProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Merchandise Tab */}
                <TabsContent value="merchandise" className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white text-center">Three Sisters Merchandise</h2>
                    <p className="text-white/80 mt-1">
                      Show your support with branded apparel and accessories.
                    </p>
                  </div>

                  {merchProducts.length === 0 ? (
                    <div className="text-center py-16">
                      <ShoppingBag className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <p className="text-white/80 text-lg">No merchandise available at the moment.</p>
                      <p className="text-white/60 mt-2">Check back soon for branded apparel and accessories!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {merchProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {/* Custom Orders Section */}
              <Card className="border-purpleBrand/30 bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Need Custom Orders?</h3>
                  <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                    Looking for bulk orders, custom packaging, or special arrangements? We're here to help with your specific needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-lavenderBrand hover:to-blueBrand text-white font-medium rounded-md transition-all duration-200"
                    >
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="inline-flex items-center justify-center px-6 py-3 border border-mintBrand text-mintBrand hover:bg-mintBrand/20 bg-transparent font-medium rounded-md transition-all duration-200"
                    >
                      <a href="tel:713-854-7427">Call 713-854-7427</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
