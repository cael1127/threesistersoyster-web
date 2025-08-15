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
  const totalCount = processedAllInventory.filter((item) => item.harvestReady).length;
  console.log("Total harvest ready count:", totalCount);

  function InventoryCard({ item }: { item: any }) {
    return (
      <Card className="border-purpleBrand/30 hover:shadow-lg transition-all duration-300 group bg-purpleBrand">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-purple-900 group-hover:text-mintBrand transition-colors text-center">
                  {item.name}
                </h3>
                {item.harvestReady && (
                  <Badge className="bg-mintBrand/20 text-mintBrand border-mintBrand/30 animate-pulse">
                    <Package className="w-3 h-3 mr-1" />
                    Ready
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <Badge className={item.type === "farm" ? "bg-purpleBrand/20 text-purpleBrand border-purpleBrand/30" : "bg-seafoamBrand/20 text-seafoamBrand border-seafoamBrand/30"}>
                  {item.type === "farm" ? "Farm Stock" : "Nursery Seed"}
                </Badge>
                {item.size && (
                  <Badge className="bg-white/20 text-white font-semibold border border-white/30 px-3 py-1 text-sm shadow-sm">
                    {item.size}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-mintBrand">
                {item.count.toLocaleString()}
              </div>
              <p className="text-sm text-mintBrand">units</p>
            </div>
          </div>

          {item.originalDescription && (
            <p className="text-purple-800 mb-4 text-sm leading-relaxed">{item.originalDescription}</p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            {item.age && (
              <div className="flex items-center text-sm text-purple-800">
                <Calendar className="w-4 h-4 mr-2 text-mintBrand" />
                <span className="font-medium">Age:</span>
                <span className="ml-1">{item.age}</span>
              </div>
            )}

            {item.health && (
              <div className="flex items-center text-sm text-purple-800">
                <Heart className="w-4 h-4 mr-2 text-mintBrand" />
                <span className="font-medium">Health:</span>
                <span className="ml-1 capitalize">{item.health}</span>
              </div>
            )}

            {item.location && (
              <div className="flex items-center text-sm text-purple-800">
                <MapPin className="w-4 h-4 mr-2 text-seafoamBrand" />
                <span className="font-medium">Location:</span>
                <span className="ml-1">{item.location}</span>
              </div>
            )}

            {item.pricePerDozen && (
              <div className="flex items-center text-sm text-purple-800">
                <DollarSign className="w-4 h-4 mr-2 text-mintBrand" />
                <span className="font-medium">Per Dozen:</span>
                <span className="ml-1 font-bold text-seafoamBrand">${item.pricePerDozen.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Status Indicators */}
          <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                {item.harvestReady ? (
                  <div className="flex items-center text-mintBrand text-sm font-medium">
                    <div className="w-2 h-2 bg-mintBrand rounded-full mr-2 animate-pulse"></div>
                    Ready for harvest
                  </div>
                ) : (
                  <div className="flex items-center text-seafoamBrand text-sm font-medium">
                    <div className="w-2 h-2 bg-seafoamBrand rounded-full mr-2"></div>
                    Growing
                  </div>
                )}
              </div>

            {item.harvestReady && (
              <Badge className="bg-blueBrand/20 text-blueBrand border-blueBrand/30">
                {item.type === "farm" ? "Market Ready" : "Seed Ready"}
              </Badge>
            )}
          </div>

          {/* Additional Info */}
          {item.harvestReady && item.type === "farm" && (
            <div className="mt-4 p-3 bg-mintBrand/20 border border-mintBrand/30 rounded-lg">
              <p className="text-sm text-mintBrand font-medium">
                <Package className="w-4 h-4 inline mr-2" />
                This batch is ready for harvest and immediate delivery to restaurants and markets.
              </p>
            </div>
          )}

          {item.harvestReady && item.type === "nursery" && (
            <div className="mt-4 p-3 bg-blueBrand/20 border border-blueBrand/30 rounded-lg">
              <p className="text-sm text-blueBrand font-medium">
                <Leaf className="w-4 h-4 inline mr-2" />
                These seeds are ready for transfer to grow-out areas or sale to other growers.
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
                <Link href="/inventory" className="text-white font-medium text-sm">
                  Inventory
                </Link>
                <Link href="/gallery" className="text-white hover:text-white font-medium text-sm">
                  Gallery
                </Link>
                <Link href="/about" className="text-white hover:text-white font-medium text-sm">
                  About
                </Link>
                <Link href="/contact" className="text-white hover:text-white font-medium text-sm">
                  Contact
                </Link>
              </nav>
              
              {/* Mobile Layout - Restructured for better spacing */}
              <div className="flex md:hidden items-center w-full">
                {/* Mobile Navigation - Compact */}
                <nav className="flex items-center flex-1 px-4">
                  <Link href="/products" className="text-white hover:text-white font-medium text-xs py-2 flex-1 text-center">
                    Shop
                  </Link>
                  <Link href="/inventory" className="text-white font-medium text-xs py-2 flex-1 text-center">
                    Stock
                  </Link>
                  <Link href="/gallery" className="text-white hover:text-white font-medium text-xs py-2 flex-1 text-center">
                    Gallery
                  </Link>
                  <Link href="/about" className="text-white hover:text-white font-medium text-xs py-2 flex-1 text-center">
                    About
                  </Link>
                  <Link href="/contact" className="text-white hover:text-white font-medium text-xs py-2 flex-1 text-center">
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
            <h1 className="text-4xl font-bold text-purple-900 mb-4 text-center">Live Inventory</h1>
            <p className="text-lg text-purple-700 mb-8 text-center">
              Real-time tracking of our oyster inventory across farm and nursery locations.
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <ClientInventoryCounters />

        <Tabs defaultValue="nursery" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-purpleBrand border border-purpleBrand/30 p-1 rounded-lg h-auto">
            <TabsTrigger value="nursery" className="flex items-center justify-center space-x-1 md:space-x-2 data-[state=active]:bg-seafoamBrand data-[state=active]:text-white data-[state=active]:shadow-sm text-xs md:text-sm px-2 py-3 md:px-3 md:py-4 rounded-md transition-all bg-purpleBrand border-0 m-1 text-white hover:text-purple-900 data-[state=inactive]:text-white">
              <Leaf className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="truncate">Nursery</span>
              <Badge className="bg-seafoamBrand/20 text-seafoamBrand border-seafoamBrand/30 text-xs px-1 flex-shrink-0">{processedNurseryInventory.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="farm" className="flex items-center justify-center space-x-1 md:space-x-2 data-[state=active]:bg-seafoamBrand data-[state=active]:text-white data-[state=active]:shadow-sm text-xs md:text-sm px-2 py-3 md:px-3 md:py-4 rounded-md transition-all bg-purpleBrand border-0 m-1 text-white hover:text-purple-900 data-[state=inactive]:text-white">
              <Fish className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="truncate">Farm</span>
              <Badge className="bg-seafoamBrand/20 text-seafoamBrand border-seafoamBrand/30 text-xs px-1 flex-shrink-0">{processedFarmInventory.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="farm">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-purple-900 text-center">Farm Operations</h2>
                  <p className="text-purple-800 mt-1 text-sm md:text-base">
                    {processedFarmInventory.filter((item) => item.harvestReady).length > 0 ? (
                      <span className="text-mintBrand font-medium">
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
                <Button asChild className="bg-gradient-to-r from-purpleBrand to-seafoamBrand text-xs md:text-sm px-3 md:px-4 py-2 flex-shrink-0 w-fit">
                  <Link href="/products">Shop Farm Products</Link>
                </Button>
              </div>
            </div>

            {processedFarmInventory.length === 0 ? (
              <div className="text-center py-12">
                <Fish className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-800 text-lg">No farm inventory available at the moment.</p>
                <p className="text-purple-600 mt-2">Check back soon for updates on our growing operations.</p>
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
                  <h2 className="text-xl md:text-2xl font-bold text-purple-900 text-center">Nursery Operations</h2>
                  <p className="text-purple-800 mt-1 text-sm md:text-base">
                    {processedNurseryInventory.filter((item) => item.harvestReady).length > 0 ? (
                      <span className="text-mintBrand font-medium">
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
                  className="bg-gradient-to-r from-seafoamBrand to-blueBrand hover:from-mintBrand hover:to-blueBrand text-white text-xs md:text-sm px-3 md:px-4 py-2 flex-shrink-0 w-fit"
                >
                  <a href="tel:713-854-7427">Contact for Pricing</a>
                </Button>
              </div>
            </div>

            {processedNurseryInventory.length === 0 ? (
              <div className="text-center py-12">
                <Leaf className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-800 text-lg">No nursery inventory available at the moment.</p>
                <p className="text-purple-600 mt-2">Check back soon for updates on our seed stock.</p>
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
          <Card className="border-purpleBrand/30 bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-purple-900 mb-4 text-center">Ready to Order?</h3>
              <p className="text-purple-800 mb-6 max-w-2xl mx-auto">
                Contact us directly for custom orders, bulk pricing, or to discuss your specific aquaculture needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                  <Link href="/products">Browse Products</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-mintBrand text-mintBrand hover:bg-mintBrand/20 bg-transparent"
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
