 

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, Fish, Leaf, Phone, Mail, MapPin, ArrowLeft, Heart, Users, Globe, Award, Star } from "lucide-react"
import Image from "next/image"
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection"
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles"
import Navigation from "@/components/Navigation"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
              <SeasonalFloatingParticles count={12} />
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purpleBrand/20 via-blueBrand/20 to-seafoamBrand/20">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollAnimatedSection animationType="fade-in" delay={200}>
            <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-6">
              Our Story
            </h1>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection animationType="fade-in" delay={400}>
            <p className="text-xl text-purple-800 max-w-3xl mx-auto">
              From the pristine waters of Keller Bay to your table, discover the passion behind Three Sisters Oyster Co.
            </p>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blueBrand/20 to-purpleBrand/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimatedSection animationType="slide-left" delay={200}>
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
                  Named After Blake's Three Daughters
                </h2>
                <div className="space-y-4 text-purple-800">
                  <p>
                    Three Sisters Oyster Co. is a family-owned oyster farm on the coast of Texas. Named after Blake's three
                    daughters, our team strives to create a better coastline for the future.
                  </p>
                  <p>
                    Blake grew up outdoors, learning to dive in the Thousand Islands in Indonesia and stayed active in wildlife and
                    FFA during his youth. His love of the outdoors led him to oyster farming as a family and lifestyle
                    choice.
                  </p>
                  <p>
                    With a Range and Wildlife Management degree from Texas A&M Kingsville and eight years in Environmental
                    Consulting, Blake discovered the pristine waters of Keller Bay - an excellent location for growing
                    premium oysters while improving water quality and sequestering nitrogen and carbon.
                  </p>
                </div>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="slide-right" delay={400}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-purpleBrand/40 to-seafoamBrand/40 rounded-2xl flex items-center justify-center border border-purpleBrand/30">
                  <Image
                    src="/aboutpic.jpg"
                    alt="Blake and family at the oyster farm"
                    width={400}
                    height={400}
                    className="rounded-2xl object-cover"
                  />
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purpleBrand/20 to-blueBrand/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sustainability */}
            <ScrollAnimatedSection animationType="slide-left" delay={200}>
              <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/40 to-blueBrand/40 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purpleBrand to-lavenderBrand rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-3">Sustainability</h3>
                  <p className="text-purple-800">
                    We're committed to sustainable aquaculture practices that protect and enhance our marine environment.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>

            {/* Quality */}
            <ScrollAnimatedSection animationType="fade-in" delay={400}>
              <Card className="border-seafoamBrand/30 bg-gradient-to-b from-seafoamBrand/40 to-blueBrand/40 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-seafoamBrand to-blueBrand rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-3">Quality</h3>
                  <p className="text-purple-800">
                    Every oyster is carefully cultivated to meet our high standards for taste, texture, and safety.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>

            {/* Community */}
            <ScrollAnimatedSection animationType="slide-right" delay={600}>
              <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/40 to-seafoamBrand/40 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purpleBrand to-seafoamBrand rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-3">Community</h3>
                  <p className="text-purple-800">
                    We're proud to be part of the Texas Gulf Coast community and contribute to its economic vitality.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 px-4 bg-gradient-to-r from-purpleBrand/40 to-seafoamBrand/40">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollAnimatedSection animationType="fade-in" delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
              Environmental Stewardship
            </h2>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection animationType="fade-in" delay={400}>
            <p className="text-xl text-purple-800 mb-12">
              Our oyster farming operations actively contribute to environmental restoration and protection.
            </p>
          </ScrollAnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimatedSection animationType="slide-left" delay={600}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purpleBrand to-lavenderBrand rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Water Filtration</h3>
                <p className="text-purple-800">Each oyster filters up to 50 gallons of water per day</p>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="fade-in" delay={800}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-seafoamBrand to-blueBrand rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Carbon Sequestration</h3>
                <p className="text-purple-800">Oyster shells naturally capture and store carbon</p>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="slide-right" delay={1000}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purpleBrand to-seafoamBrand rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fish className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Habitat Creation</h3>
                <p className="text-purple-800">Oyster reefs provide shelter for marine life</p>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* Operations Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blueBrand/20 to-purpleBrand/20">
        <div className="container mx-auto max-w-6xl">
          <ScrollAnimatedSection animationType="fade-in" delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-12 text-center">
              Our Operations
            </h2>
          </ScrollAnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Nursery Operations */}
            <ScrollAnimatedSection animationType="slide-left" delay={400}>
              <Card className="border-seafoamBrand/30 bg-gradient-to-b from-seafoamBrand/40 to-blueBrand/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-4 text-center">Nursery Operations</h3>
                  <p className="text-purple-800 mb-4">
                    Our nursery produces hardy Eastern oyster seed for growers throughout the region.
                  </p>
                  <ul className="space-y-2 text-purple-800">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-seafoamBrand rounded-full mr-3"></div>
                      Disease-resistant seed stock
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-seafoamBrand rounded-full mr-3"></div>
                      Year-round availability
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-seafoamBrand rounded-full mr-3"></div>
                      Expert cultivation support
                    </li>
                  </ul>
                  <p className="text-purple-800 mt-4">
                    For pricing and ordering information, please call{" "}
                    <a href="tel:713-854-7427" className="text-white hover:text-white transition-colors duration-200">
                      713-854-7427
                    </a>
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>

            {/* Farm Operations */}
            <ScrollAnimatedSection animationType="slide-right" delay={600}>
              <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/40 to-blueBrand/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-4 text-center">Farm Operations</h3>
                  <p className="text-purple-800 mb-4">
                    We grow oysters to market size for the premium half-shell market.
                  </p>
                  <ul className="space-y-2 text-purple-800">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mr-3"></div>
                      Premium half-shell oysters
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mr-3"></div>
                      Sustainable farming practices
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mr-3"></div>
                      Marine habitat restoration
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-purpleBrand/40 to-seafoamBrand/40">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollAnimatedSection animationType="scale-in" delay={200}>
            <Card className="border-purpleBrand/30 bg-gradient-to-r from-purpleBrand/40 to-seafoamBrand/40">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Experience Premium Texas Oysters?
                </h3>
                <p className="text-white/80 mb-8 text-lg">
                  Call us today to learn more about our products and place your order.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">

                  <Button
                    asChild
                    variant="outline"
                    className="border-white text-white hover:bg-white/20"
                  >
                    <Link href="/products">View Products</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  )
} 