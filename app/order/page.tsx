"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ShoppingCart, Phone, Mail, MapPin, ArrowRight, Star, Clock, Truck, Users, Award, Leaf, Fish } from "lucide-react"
import { FloatingParticles } from "@/components/ui/floating-particles"
import Navigation from "@/components/Navigation"
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection"

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative overflow-hidden">
      <FloatingParticles particleCount={12} interactive={true} />
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <ScrollAnimatedSection animationType="fade-in" delay={200}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purpleBrand/30 to-seafoamBrand/30 rounded-full mb-6 border border-purpleBrand/30">
                  <ShoppingCart className="w-10 h-10 text-purple-900" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">Ready to Order?</h1>
                <p className="text-xl text-purple-800 max-w-2xl mx-auto leading-relaxed">
                  Get in touch with us directly and we'll help you get started with your oyster order!
                </p>
              </div>
            </ScrollAnimatedSection>

            {/* Main Order Card */}
            <ScrollAnimatedSection animationType="slide-up" delay={400}>
              <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 via-lavenderBrand/20 to-blueBrand/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                <CardContent className="p-8 md:p-10">
                  {/* Contact Information */}
                  <div className="bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20 rounded-2xl p-8 mb-10 border border-purpleBrand/30 shadow-lg">
                    <h3 className="text-2xl font-semibold text-purple-900 mb-8 text-center">Get In Touch</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                      <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 bg-gradient-to-br from-purpleBrand/40 to-lavenderBrand/40 rounded-full flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg border border-purpleBrand/30">
                          <Phone className="w-8 h-8 text-purple-900" />
                        </div>
                        <h4 className="font-semibold text-purple-900 mb-3 text-lg">Phone</h4>
                        <a href="tel:713-854-7427" className="text-purple-800 hover:text-purple-600 transition-colors duration-300 text-lg font-medium group-hover:text-purple-700">
                          713-854-7427
                        </a>
                        <p className="text-purple-700 text-sm mt-2">Call us anytime</p>
                      </div>
                      <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 bg-gradient-to-br from-blueBrand/40 to-mintBrand/40 rounded-full flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg border border-blueBrand/30">
                          <Mail className="w-8 h-8 text-blue-900" />
                        </div>
                        <h4 className="font-semibold text-purple-900 mb-3 text-lg">Email</h4>
                        <a href="mailto:info@threesistersoyster.com" className="text-purple-800 hover:text-purple-600 transition-colors duration-300 text-lg font-medium group-hover:text-purple-700">
                          info@threesistersoyster.com
                        </a>
                        <p className="text-purple-700 text-sm mt-2">We'll respond quickly</p>
                      </div>
                      <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 bg-gradient-to-br from-mintBrand/40 to-seafoamBrand/40 rounded-full flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg border border-mintBrand/30">
                          <MapPin className="w-8 h-8 text-mint-900" />
                        </div>
                        <h4 className="font-semibold text-purple-900 mb-3 text-lg">Location</h4>
                        <p className="text-purple-800 text-lg font-medium">Texas Gulf Coast</p>
                        <p className="text-purple-700 text-sm mt-2">Keller Bay area</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Types */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-10 shadow-lg">
                    <h3 className="text-2xl font-semibold text-purple-900 mb-8 text-center">What We Offer</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Nursery Orders */}
                      <div className="group border border-white/30 rounded-xl bg-gradient-to-br from-white/20 to-white/10 p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-white/50">
                        <div className="w-16 h-16 bg-gradient-to-br from-blueBrand/40 to-mintBrand/40 rounded-full flex items-center justify-center mb-6 mx-auto border border-blueBrand/30">
                          <Leaf className="w-8 h-8 text-blue-900" />
                        </div>
                        <h4 className="text-2xl font-semibold text-white mb-4">Nursery Orders</h4>
                        <p className="text-purple-800 mb-6 text-base leading-relaxed">
                          Hardy Eastern oyster seed for growers and aquaculture operations
                        </p>
                        <Badge className="bg-white/30 text-white border border-white/40 text-sm px-4 py-2 font-medium mb-4">
                          <Clock className="w-4 h-4 mr-2" />
                          Available Year-Round
                        </Badge>
                        <p className="text-purple-800 text-sm leading-relaxed">
                          Perfect for starting or expanding your oyster farm
                        </p>
                        <div className="mt-4 flex items-center justify-center space-x-2 text-purple-700">
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-xs ml-2">Premium Quality</span>
                        </div>
                      </div>

                      {/* Farm Orders */}
                      <div className="group border border-purpleBrand/30 rounded-xl bg-gradient-to-br from-purpleBrand/20 to-lavenderBrand/20 p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-purpleBrand/50">
                        <div className="w-16 h-16 bg-gradient-to-br from-purpleBrand/40 to-lavenderBrand/40 rounded-full flex items-center justify-center mb-6 mx-auto border border-purpleBrand/30">
                          <Fish className="w-8 h-8 text-purple-900" />
                        </div>
                        <h4 className="text-2xl font-semibold text-purple-900 mb-4">Farm Orders</h4>
                        <p className="text-purple-800 mb-6 text-base leading-relaxed">
                          Premium half-shell market oysters for restaurants and consumers
                        </p>
                        <Badge className="bg-purpleBrand/30 text-purple-900 border border-purpleBrand/40 text-sm px-4 py-2 font-medium mb-4">
                          <Truck className="w-4 h-4 mr-2" />
                          Seasonal Availability
                        </Badge>
                        <p className="text-purple-800 text-sm leading-relaxed">
                          Fresh, high-quality oysters from our sustainable farm
                        </p>
                        <div className="mt-4 flex items-center justify-center space-x-2 text-purple-700">
                          <Award className="w-4 h-4 fill-current" />
                          <span className="text-xs ml-2">Award-Winning Quality</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* How to Order */}
                  <div className="bg-gradient-to-r from-seafoamBrand/20 to-mintBrand/20 rounded-2xl p-8 mb-10 border border-seafoamBrand/30 shadow-lg">
                    <h3 className="text-2xl font-semibold text-purple-900 mb-8 text-center">How to Order</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center group transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 bg-gradient-to-br from-seafoamBrand/40 to-mintBrand/40 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg border border-seafoamBrand/30">
                          <span className="text-2xl font-bold text-seafoamBrand">1</span>
                        </div>
                        <h4 className="font-semibold text-purple-900 mb-3 text-lg">Contact Us</h4>
                        <p className="text-purple-800 text-sm leading-relaxed">
                          Call or email us with your order requirements
                        </p>
                      </div>
                      <div className="text-center group transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 bg-gradient-to-br from-seafoamBrand/40 to-mintBrand/40 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg border border-seafoamBrand/30">
                          <span className="text-2xl font-bold text-seafoamBrand">2</span>
                        </div>
                        <h4 className="font-semibold text-purple-900 mb-3 text-lg">Get Quote</h4>
                        <p className="text-purple-800 text-sm leading-relaxed">
                          We'll provide pricing and availability information
                        </p>
                      </div>
                      <div className="text-center group transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 bg-gradient-to-br from-seafoamBrand/40 to-mintBrand/40 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg border border-seafoamBrand/30">
                          <span className="text-2xl font-bold text-seafoamBrand">3</span>
                        </div>
                        <h4 className="font-semibold text-purple-900 mb-3 text-lg">Arrange Delivery</h4>
                        <p className="text-purple-800 text-sm leading-relaxed">
                          We'll coordinate pickup or delivery within 24-48 hours
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center bg-gradient-to-r from-purpleBrand/10 to-seafoamBrand/10 rounded-2xl p-8 border border-purpleBrand/20">
                    <h3 className="text-2xl font-bold text-purple-900 mb-4">Ready to Place Your Order?</h3>
                    <p className="text-purple-800 mb-8 text-lg max-w-2xl mx-auto">
                      Contact us today and let's get started on providing you with the finest Texas oysters!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                      <Button asChild className="bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-lavenderBrand hover:to-blueBrand text-lg px-8 py-4 hover:scale-105 transition-all duration-300 shadow-lg group">
                        <a href="tel:713-854-7427">
                          <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          Call Now
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="border-purpleBrand text-purpleBrand hover:bg-purpleBrand hover:text-white text-lg px-8 py-4 hover:scale-105 transition-all duration-300 group">
                        <a href="mailto:info@threesistersoyster.com">
                          <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          Email Us
                        </a>
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => window.history.back()}
                      className="text-purple-800 hover:text-purple-600 hover:bg-purpleBrand/10 transition-all duration-300 group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      Back
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>
          </div>
        </div>
      </main>
    </div>
  )
}
