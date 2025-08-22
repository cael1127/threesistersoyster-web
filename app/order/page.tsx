"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ShoppingCart, Phone, Mail, MapPin } from "lucide-react"
import { FloatingParticles } from "@/components/ui/floating-particles"
import Navigation from "@/components/Navigation"

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative overflow-hidden">
      <FloatingParticles particleCount={8} interactive={true} />
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/20 to-blueBrand/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">Order Information</h2>
                <p className="text-purple-800 mb-8 text-center text-lg">
                  Ready to place an order? Contact us directly and we'll help you get started!
                </p>

                {/* Contact Information */}
                <div className="bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20 rounded-lg p-8 mb-8">
                  <h3 className="text-2xl font-semibold text-purple-900 mb-6 text-center">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-purpleBrand/30 rounded-full flex items-center justify-center mb-3">
                        <Phone className="w-6 h-6 text-purple-900" />
                      </div>
                      <h4 className="font-semibold text-purple-900 mb-2">Phone</h4>
                      <a href="tel:713-854-7427" className="text-purple-800 hover:text-white transition-colors duration-200 text-lg">
                        713-854-7427
                      </a>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-purpleBrand/30 rounded-full flex items-center justify-center mb-3">
                        <Mail className="w-6 h-6 text-purple-900" />
                      </div>
                      <h4 className="font-semibold text-purple-900 mb-2">Email</h4>
                      <a href="mailto:info@threesistersoyster.com" className="text-purple-800 hover:text-white transition-colors duration-200 text-lg">
                        info@threesistersoyster.com
                      </a>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-purpleBrand/30 rounded-full flex items-center justify-center mb-3">
                        <MapPin className="w-6 h-6 text-purple-900" />
                      </div>
                      <h4 className="font-semibold text-purple-900 mb-2">Location</h4>
                      <p className="text-purple-800 text-lg">Texas Gulf Coast</p>
                    </div>
                  </div>
                </div>

                {/* Order Types */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 mb-8">
                  <h3 className="text-2xl font-semibold text-purple-900 mb-6 text-center">Order Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nursery Orders */}
                    <div className="border border-white/30 rounded-lg bg-white/10 p-6 text-center">
                      <h4 className="text-xl font-semibold text-white mb-3">Nursery Orders</h4>
                      <p className="text-purple-800 mb-4 text-base">
                        Hardy Eastern oyster seed for growers and aquaculture operations
                      </p>
                      <Badge className="bg-white/20 text-white border border-white/30 text-sm px-3 py-1">
                        Available Year-Round
                      </Badge>
                      <p className="text-purple-800 mt-3 text-sm">
                        Perfect for starting or expanding your oyster farm
                      </p>
                    </div>

                    {/* Farm Orders */}
                    <div className="border border-purpleBrand/30 rounded-lg bg-purpleBrand/10 p-6 text-center">
                      <h4 className="text-xl font-semibold text-purpleBrand mb-3">Farm Orders</h4>
                      <p className="text-purple-800 mb-4 text-base">
                        Premium half-shell market oysters for restaurants and consumers
                      </p>
                      <Badge className="bg-purpleBrand/20 text-purpleBrand border border-purpleBrand/30 text-sm px-3 py-1">
                        Seasonal Availability
                      </Badge>
                      <p className="text-purple-800 mt-3 text-sm">
                        Fresh, high-quality oysters from our sustainable farm
                      </p>
                    </div>
                  </div>
                </div>

                {/* How to Order */}
                <div className="bg-gradient-to-r from-seafoamBrand/20 to-mintBrand/20 rounded-lg p-8 mb-8">
                  <h3 className="text-2xl font-semibold text-purple-900 mb-6 text-center">How to Order</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-seafoamBrand/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-seafoamBrand">1</span>
                      </div>
                      <h4 className="font-semibold text-purple-900 mb-2">Contact Us</h4>
                      <p className="text-purple-800 text-sm">
                        Call or email us with your order requirements
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-seafoamBrand/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-seafoamBrand">2</span>
                      </div>
                      <h4 className="font-semibold text-purple-900 mb-2">Get Quote</h4>
                      <p className="text-purple-800 text-sm">
                        We'll provide pricing and availability information
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-seafoamBrand/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-seafoamBrand">3</span>
                      </div>
                      <h4 className="font-semibold text-purple-900 mb-2">Arrange Delivery</h4>
                      <p className="text-purple-800 text-sm">
                        We'll coordinate pickup or delivery within 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                  <p className="text-purple-800 mb-6 text-lg">
                    Ready to place your order? Contact us today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-lavenderBrand hover:to-blueBrand text-lg px-8 py-3">
                      <a href="tel:713-854-7427">
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-purpleBrand text-purpleBrand hover:bg-purpleBrand hover:text-white text-lg px-8 py-3">
                      <a href="mailto:info@threesistersoyster.com">
                        <Mail className="w-5 h-5 mr-2" />
                        Email Us
                      </a>
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => window.history.back()}
                    className="mt-6 text-purple-800 hover:text-purple-600"
                  >
                    ← Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
