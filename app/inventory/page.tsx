"use client"

import { getInventoryByType, getAllInventory, Inventory } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Fish, Leaf, MapPin, Calendar, Heart, DollarSign, Waves, TrendingUp, Package } from "lucide-react"
import { CartButton } from "@/components/cart-button"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic";
import Image from "next/image";

const ClientInventoryCounters = dynamic(() => import("@/components/ClientInventoryCounters"));

export default function InventoryPage() {
  const [farmInventory, setFarmInventory] = useState<Inventory[]>([])
  const [nurseryInventory, setNurseryInventory] = useState<Inventory[]>([])
  const [allInventory, setAllInventory] = useState<Inventory[]>([])
  const [loading, setLoading] = useState(true)

  const fetchInventory = async () => {
    setLoading(true)
    try {
      const [farm, nursery, all] = await Promise.all([
        getInventoryByType("farm"),
        getInventoryByType("nursery"),
        getAllInventory()
      ])
      setFarmInventory(farm)
      setNurseryInventory(nursery)
      setAllInventory(all)
    } catch (error) {
      console.error("Error fetching inventory:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  // Helper function to parse inventory description
  function parseInventoryDescription(description: string | null) {
    if (!description) return {}

    try {
      const parsed = JSON.parse(description)
      return {
        size: parsed.size || null,
        age: parsed.age || null,
        health: parsed.health || null,
        pricePerDozen: parsed.pricePerDozen || null,
        harvestReady: parsed.harvestReady === true,
        location: parsed.location || null,
        originalDescription: parsed.originalDescription || null,
      }
    } catch (error) {
      // If it's not JSON, treat as plain text description
      return {
        originalDescription: description,
        harvestReady: false,
      }
    }
  }

  // Process inventory with parsed descriptions
  const processedFarmInventory = farmInventory.map((item) => ({
    ...item,
    ...parseInventoryDescription(item.description),
  }))

  const processedNurseryInventory = nurseryInventory.map((item) => ({
    ...item,
    ...parseInventoryDescription(item.description),
  }))

  const processedAllInventory = allInventory.map((item) => ({
    ...item,
    ...parseInventoryDescription(item.description),
  }))

  // Debug logging
  console.log("=== INVENTORY DEBUG ===")
  console.log("Farm inventory items:", processedFarmInventory.length)
  console.log("Nursery inventory items:", processedNurseryInventory.length)
  console.log("All inventory items:", processedAllInventory.length)

  const farmHarvestReady = processedFarmInventory.filter((item) => item.harvestReady === true)
  const nurseryHarvestReady = processedNurseryInventory.filter((item) => item.harvestReady === true)

  console.log(
    "Farm harvest ready items:",
    farmHarvestReady.map((item) => ({ name: item.name, count: item.count, harvestReady: item.harvestReady })),
  )
  console.log(
    "Nursery harvest ready items:",
    nurseryHarvestReady.map((item) => ({ name: item.name, count: item.count, harvestReady: item.harvestReady })),
  )
  console.log("Total harvest ready count:", processedAllInventory.filter((item) => item.harvestReady).length)

  function InventoryCard({ item }: { item: any }) {
    return (
      <Card className="border-purple-200 hover:shadow-lg transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-purple-900 group-hover:text-purple-700 transition-colors">
                  {item.name}
                </h3>
                {item.harvestReady && (
                  <Badge className="bg-green-100 text-green-800 border-green-300 animate-pulse">
                    <Package className="w-3 h-3 mr-1" />
                    Ready
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <Badge className={item.type === "farm" ? "bg-purple-100 text-purple-800" : "bg-teal-100 text-teal-800"}>
                  {item.type === "farm" ? "Farm Stock" : "Nursery Seed"}
                </Badge>
                {item.size && (
                  <Badge className="bg-white text-purple-900 font-semibold border border-purple-300 px-3 py-1 text-sm shadow-sm">
                    {item.size}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
                {item.count.toLocaleString()}
              </div>
              <p className="text-sm text-gray-500">units</p>
            </div>
          </div>

          {item.originalDescription && (
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.originalDescription}</p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            {item.age && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                <span className="font-medium">Age:</span>
                <span className="ml-1">{item.age}</span>
              </div>
            )}

            {item.health && (
              <div className="flex items-center text-sm text-gray-600">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                <span className="font-medium">Health:</span>
                <span className="ml-1 capitalize">{item.health}</span>
              </div>
            )}

            {item.location && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-teal-500" />
                <span className="font-medium">Location:</span>
                <span className="ml-1">{item.location}</span>
              </div>
            )}

            {item.pricePerDozen && (
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                <span className="font-medium">Per Dozen:</span>
                <span className="ml-1 font-bold text-teal-600">${item.pricePerDozen.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Status Indicators */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {item.harvestReady ? (
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Ready for harvest
                </div>
              ) : (
                <div className="flex items-center text-amber-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  Growing
                </div>
              )}
            </div>

            {item.harvestReady && (
              <Badge className="bg-blue-100 text-blue-800">
                {item.type === "farm" ? "Market Ready" : "Seed Ready"}
              </Badge>
            )}
          </div>

          {item.harvestReady && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 font-medium">
                ✓{" "}
                {item.type === "farm"
                  ? "Available for immediate harvest and sale"
                  : "Ready seed stock available for growers"}
              </p>
            </div>
          )}

          {!item.harvestReady && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                🌱 {item.type === "farm" ? "Growing to market size" : "Developing seed stock"}
              </p>
            </div>
          )}
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
                <h1 className="text-xl font-bold text-mintBrand">
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
                <Link href="/inventory" className="text-seafoamBrand font-medium text-sm">
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
                  <Link href="/inventory" className="text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
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
            <h1 className="text-2xl md:text-4xl font-bold text-purple-900 px-2">Live Inventory Dashboard</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Real-time tracking of our farm and nursery operations in Keller Bay
          </p>
        </div>

        {/* Stats Overview */}
        <ClientInventoryCounters />

        <Tabs defaultValue="nursery" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white border border-purple-200 p-1 rounded-lg h-auto">
            <TabsTrigger value="nursery" className="flex items-center justify-center space-x-1 md:space-x-2 data-[state=active]:bg-teal-100 data-[state=active]:text-teal-900 data-[state=active]:shadow-sm text-xs md:text-sm px-2 py-3 md:px-3 md:py-4 rounded-md transition-all bg-white border-0 m-1">
              <Leaf className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="truncate">Nursery</span>
              <Badge className="bg-teal-200 text-teal-900 text-xs px-1 flex-shrink-0">{processedNurseryInventory.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="farm" className="flex items-center justify-center space-x-1 md:space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm text-xs md:text-sm px-2 py-3 md:px-3 md:py-4 rounded-md transition-all bg-white border-0 m-1">
              <Fish className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="truncate">Farm</span>
              <Badge className="bg-purple-200 text-purple-900 text-xs px-1 flex-shrink-0">{processedFarmInventory.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="farm">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-purple-900">Farm Operations</h2>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">
                    {processedFarmInventory.filter((item) => item.harvestReady).length > 0 ? (
                      <span className="text-green-600 font-medium">
                        {processedFarmInventory
                          .filter((item) => item.harvestReady)
                          .reduce((sum, item) => sum + item.count, 0)
                          .toLocaleString()}{" "}
                        ready for harvest
                      </span>
                    ) : (
                      <span>Premium half-shell oysters in various growth stages</span>
                    )}
                  </p>
                </div>
                <Button asChild className="bg-gradient-to-r from-purple-600 to-teal-600 text-xs md:text-sm px-3 md:px-4 py-2 flex-shrink-0 w-fit">
                  <Link href="/products">Shop Farm Products</Link>
                </Button>
              </div>
            </div>

            {processedFarmInventory.length === 0 ? (
              <div className="text-center py-12">
                <Fish className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No farm inventory available at the moment.</p>
                <p className="text-gray-500 mt-2">Check back soon for updates on our growing operations.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedFarmInventory.map((item) => (
                  <InventoryCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="nursery">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-purple-900">Nursery Operations</h2>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">
                    {processedNurseryInventory.filter((item) => item.harvestReady).length > 0 ? (
                      <span className="text-green-600 font-medium">
                        {processedNurseryInventory
                          .filter((item) => item.harvestReady)
                          .reduce((sum, item) => sum + item.count, 0)
                          .toLocaleString()}{" "}
                        ready seed stock available
                      </span>
                    ) : (
                      <span>
                        Hardy oyster seed stock.
                      </span>
                    )}
                  </p>
                </div>
                <Button
                  asChild
                  className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-xs md:text-sm px-3 md:px-4 py-2 flex-shrink-0 w-fit"
                >
                  <a href="tel:713-854-7427">Contact for Pricing</a>
                </Button>
              </div>
            </div>

            {processedNurseryInventory.length === 0 ? (
              <div className="text-center py-12">
                <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No nursery inventory available at the moment.</p>
                <p className="text-gray-500 mt-2">Contact us directly for seed stock availability.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedNurseryInventory.map((item) => (
                  <InventoryCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="border-purple-200 bg-gradient-to-r from-purple-100 to-teal-100">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">Ready to Order?</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Contact us directly for custom orders, bulk pricing, or to discuss your specific aquaculture needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-purple-600 to-teal-600">
                  <Link href="/products">Browse Products</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                >
                  <a href="tel:713-854-7427">Call 713-854-7427</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
