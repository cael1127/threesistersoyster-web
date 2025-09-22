"use client"

import { getInventoryByType, getAllInventory, Inventory } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Fish, Leaf, MapPin, Calendar, Heart, DollarSign, Waves, TrendingUp, Package } from "lucide-react"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic";
import Image from "next/image";
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles"
import Navigation from "@/components/Navigation"
import Script from "next/script"

const ClientInventoryCounters = dynamic(() => import("@/components/ClientInventoryCounters"));

export default function InventoryPage() {
  const [farmInventory, setFarmInventory] = useState<Inventory[]>([])
  const [nurseryInventory, setNurseryInventory] = useState<Inventory[]>([])
  const [allInventory, setAllInventory] = useState<Inventory[]>([])
  const [loading, setLoading] = useState(true)

  const fetchInventory = async () => {
    setLoading(true)
    try {
      // Check if Supabase is configured first
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
        setFarmInventory([])
        setNurseryInventory([])
        setAllInventory([])
        setLoading(false)
        return
      }

      const [farm, nursery, all] = await Promise.all([
        getInventoryByType("farm"),
        getInventoryByType("nursery"),
        getAllInventory()
      ])
      setFarmInventory(farm)
      setNurseryInventory(nursery)
      setAllInventory(all)
    } catch (error) {
      // Set empty arrays on error to prevent crashes
      setFarmInventory([])
      setNurseryInventory([])
      setAllInventory([])
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
        // support both pricePerDozen and priceperdozen
        pricePerDozen: parsed.pricePerDozen ?? parsed.priceperdozen ?? null,
        // support both harvestReady and harvestready
        harvestReady: parsed.harvestReady === true || parsed.harvestready === true,
        location: parsed.location || null,
        // prefer explicit originalDescription, otherwise use generic description
        originalDescription: parsed.originalDescription ?? parsed.description ?? null,
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



  const farmHarvestReady = processedFarmInventory.filter((item) => item.harvestReady === true)
  const nurseryHarvestReady = processedNurseryInventory.filter((item) => item.harvestReady === true)

  const totalCount = processedAllInventory.filter((item) => item.harvestReady).length;

  function formatMillions(value: number) {
    return `${(value / 1_000_000).toFixed(2)}M`
  }

  function InventoryCard({ item }: { item: any }) {
    return (
      <Card className="border-purpleBrand/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group bg-purpleBrand/40">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-purple-900 group-hover:text-purple-700 transition-colors text-center">
                  {item.name}
                </h3>
                {item.harvestReady && (
                  <Badge className="bg-mintBrand/20 text-purple-800 border-mintBrand/30 animate-pulse">
                    <Package className="w-3 h-3 mr-1" />
                    Ready
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <Badge className={item.type === "farm" ? "bg-purpleBrand/20 text-purple-800 border-purpleBrand/30" : "bg-blueBrand/20 text-blue-800 border-blueBrand/30"}>
                  {item.type === "farm" ? "Farm Stock" : "Nursery Seed"}
                </Badge>
                {item.size && (
                  <Badge className="bg-mintBrand/20 text-purple-800 font-semibold border border-mintBrand/30 px-3 py-1 text-sm shadow-sm">
                    {item.size}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-900">
                {formatMillions(item.count)}
              </div>
              <p className="text-sm text-purple-700">M units</p>
            </div>
          </div>

          

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Removed Health display per request */}

            {item.location && (
              <div className="flex items-center text-sm text-purple-800">
                <MapPin className="w-4 h-4 mr-2 text-seafoamBrand" />
                <span className="font-medium">Location:</span>
                <span className="ml-1">{item.location}</span>
              </div>
            )}

            {item.pricePerDozen && (
              <div className="flex items-center text-sm text-purple-800">
                <DollarSign className="w-4 h-4 mr-2 text-purple-600" />
                <span className="font-medium">Per Dozen:</span>
                <span className="ml-1 font-bold text-seafoamBrand">${item.pricePerDozen.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Status Indicators */}
          {/* Removed status chips per request */}

          {/* Bottom description */}
          {item.originalDescription && (
            <div className="mt-4 pt-4 border-t border-purpleBrand/20">
              <p className="text-purple-800 text-sm leading-relaxed">{item.originalDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script id="inventory-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Live Oyster Inventory - Three Sisters Oyster Co.",
            "description": "Real-time oyster inventory from Port Lavaca, Texas. Farm and nursery operations with live stock counts, pricing, and availability for fresh Gulf Coast oysters.",
            "url": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com') + '/inventory',
            "mainEntity": {
              "@type": "Organization",
              "name": "Three Sisters Oyster Co.",
              "url": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'),
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "106 Grant St.",
                "addressLocality": "Port Lavaca",
                "addressRegion": "TX",
                "postalCode": "77979",
                "addressCountry": "US"
              },
              "telephone": "+1-713-854-7427",
              "areaServed": {
                "@type": "State",
                "name": "Texas"
              },
              "serviceType": "Oyster Farming and Aquaculture",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Oyster Inventory",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Farm Oysters",
                      "description": "Premium half-shell market oysters grown in Keller Bay, Port Lavaca, Texas"
                    },
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Nursery Oyster Seed",
                      "description": "Hardy Eastern oyster seed for growers and aquaculture operations"
                    },
                    "availability": "https://schema.org/InStock"
                  }
                ]
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com')
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Inventory",
                  "item": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com') + '/inventory'
                }
              ]
            }
          })
        }}
      />
      <SeasonalFloatingParticles count={10} />
      {/* Header */}
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-purple-900 mb-4 text-center">Live Oyster Inventory</h1>
            <p className="text-lg text-purple-700 mb-8 text-center">
              Real-time tracking of our fresh oyster inventory across farm and nursery locations in Port Lavaca, Texas. View current stock levels, pricing, and availability for premium Gulf Coast oysters.
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <ClientInventoryCounters />

        <Tabs defaultValue="nursery" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="nursery" className="flex items-center justify-center space-x-2 text-purple-900 data-[state=active]:text-purple-900">
              <Leaf className="w-4 h-4" />
              <span>Nursery</span>
              <Badge variant="secondary">{processedNurseryInventory.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="farm" className="flex items-center justify-center space-x-2 text-purple-900 data-[state=active]:text-purple-900">
              <Fish className="w-4 h-4" />
              <span>Farm</span>
              <Badge variant="secondary">{processedFarmInventory.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="farm" className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className="mb-6 p-6 bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-2xl border border-purpleBrand/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-purple-900 text-center">Oyster Farm Operations</h2>
                  <p className="text-purple-800 mt-1 text-sm md:text-base">
                    {processedFarmInventory.filter((item) => item.harvestReady).length > 0 ? (
                      <span className="text-purple-800 font-medium">
                        {formatMillions(
                          processedFarmInventory
                            .filter((item) => item.harvestReady)
                            .reduce((sum, item) => sum + item.count, 0)
                        )} fresh oysters ready for harvest
                      </span>
                    ) : (
                      <span>Premium half-shell oysters in various growth stages at our Port Lavaca oyster farm</span>
                    )}
                  </p>
                </div>
                <Button asChild className="bg-gradient-to-r from-purpleBrand to-seafoamBrand text-xs md:text-sm px-3 md:px-4 py-2 flex-shrink-0 w-fit hover:scale-105 transition-transform duration-300 shadow-lg">
                  <Link href="/products">Shop Farm Products</Link>
                </Button>
              </div>
            </div>

            {processedFarmInventory.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-purpleBrand/5 to-seafoamBrand/5 rounded-2xl border border-purpleBrand/20">
                <Fish className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-800 text-lg">No farm inventory available at the moment.</p>
                <p className="text-purple-600 mt-2">Check back soon for updates on our growing operations.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedFarmInventory.map((item, index) => (
                  <div key={item.id} className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                    <InventoryCard key={item.id} item={item} />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="nursery" className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className="mb-6 p-6 bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-2xl border border-purpleBrand/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-purple-900 text-center">Oyster Nursery Operations</h2>
                  <p className="text-purple-800 mt-1 text-sm md:text-base">
                    {processedNurseryInventory.filter((item) => item.harvestReady).length > 0 ? (
                      <span className="text-purple-800 font-medium">
                        {formatMillions(
                          processedNurseryInventory
                            .filter((item) => item.harvestReady)
                            .reduce((sum, item) => sum + item.count, 0)
                        )} fresh oyster seed stock available
                      </span>
                    ) : (
                      <span>
                        Hardy Eastern oyster seed stock for Texas aquaculture operations.
                      </span>
                    )}
                  </p>
                </div>
                <Button
                  asChild
                  className="bg-gradient-to-r from-seafoamBrand to-blueBrand hover:from-mintBrand hover:to-blueBrand text-white text-xs md:text-sm px-3 md:px-4 py-2 flex-shrink-0 w-fit hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  <a href="tel:713-854-7427">Contact for Pricing</a>
                </Button>
              </div>
            </div>

            {processedNurseryInventory.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-purpleBrand/5 to-seafoamBrand/5 rounded-2xl border border-purpleBrand/20">
                <Leaf className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-800 text-lg">No nursery inventory available at the moment.</p>
                <p className="text-purple-600 mt-2">Check back soon for updates on our seed stock.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedNurseryInventory.map((item, index) => (
                  <div key={item.id} className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                    <InventoryCard key={item.id} item={item} />
                  </div>
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
                For custom orders, bulk pricing, or to discuss your specific aquaculture needs, please call{" "}
                <span className="font-semibold text-purple-900">713-854-7427</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                  <Link href="/products">Browse Products</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-purpleBrand text-purple-900 hover:bg-purpleBrand/20 bg-white"
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
