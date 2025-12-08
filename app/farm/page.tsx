import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection"
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles"
import Navigation from "@/components/Navigation"

export const metadata: Metadata = {
  title: "Our Farm | Three Sisters Oyster Co. | Premium Oyster Cultivation",
  description: "Learn about our premium oyster farm operations in Keller Bay, Port Lavaca, Texas. Sustainable farming practices that deliver exceptional flavor and quality.",
  keywords: [
    "oyster farm Texas",
    "Keller Bay oysters",
    "premium oyster cultivation",
    "sustainable oyster farming",
    "Port Lavaca oyster farm",
    "Gulf Coast oysters",
    "half-shell oysters",
    "oyster harvest Texas"
  ],
}

export default function FarmPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <SeasonalFloatingParticles count={12} />
      <Navigation />

      <main role="main">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-purpleBrand/20 via-blueBrand/20 to-seafoamBrand/20">
          <div className="container mx-auto max-w-4xl text-center">
            <ScrollAnimatedSection animationType="fade-in" delay={200}>
              <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-6">
                Our Farm
              </h1>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="fade-in" delay={400}>
              <p className="text-xl md:text-2xl text-purple-800 max-w-3xl mx-auto">
                Premium oyster cultivation in the pristine waters of Keller Bay, Port Lavaca, Texas
              </p>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Farm Operations */}
        <section className="py-20 px-4 bg-gradient-to-b from-blueBrand/20 to-purpleBrand/20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <ScrollAnimatedSection animationType="slide-left" delay={200}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/farmlog.jpg"
                    alt="Premium oyster farm operations in Keller Bay, Texas"
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollAnimatedSection>
              <ScrollAnimatedSection animationType="slide-right" delay={400}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
                    Premium Oyster Cultivation
                  </h2>
                  <p className="text-lg text-purple-800 mb-6 leading-relaxed">
                    We carefully grow oysters to perfect market size, ensuring optimal flavor, texture, and brininess. 
                    Our sustainable farming in Keller Bay's pristine waters creates oysters that deliver an exceptional dining experience.
                  </p>
                  <p className="text-lg text-purple-800 mb-6 leading-relaxed">
                    Every oyster is cultivated with attention to detail, from seed to harvest, ensuring consistent quality 
                    that chefs and seafood lovers trust.
                  </p>
                </div>
              </ScrollAnimatedSection>
            </div>

            <ScrollAnimatedSection animationType="fade-in" delay={600}>
              <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/40 to-blueBrand/40 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">What Makes Our Oysters Special</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blueBrand rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🦪</span>
                      </div>
                      <h4 className="text-xl font-bold text-purple-900 mb-2">Perfect Half-Shell</h4>
                      <p className="text-purple-800">Grown to ideal market size for perfect presentation</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blueBrand rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🌊</span>
                      </div>
                      <h4 className="text-xl font-bold text-purple-900 mb-2">Enhanced Flavor</h4>
                      <p className="text-purple-800">Sustainable practices that enhance natural flavor profiles</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blueBrand rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">✨</span>
                      </div>
                      <h4 className="text-xl font-bold text-purple-900 mb-2">Pristine Environment</h4>
                      <p className="text-purple-800">Clean, pristine growing environment in Keller Bay</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-purpleBrand/20 to-blueBrand/20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollAnimatedSection animationType="slide-left" delay={200}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
                    Keller Bay, Port Lavaca
                  </h2>
                  <p className="text-lg text-purple-800 mb-6 leading-relaxed">
                    Our farm is located in the pristine waters of Keller Bay, an excellent location for growing 
                    premium oysters while improving water quality and sequestering nitrogen and carbon.
                  </p>
                  <p className="text-lg text-purple-800 mb-8 leading-relaxed">
                    The unique conditions of Keller Bay create the perfect environment for developing oysters with 
                    exceptional flavor, texture, and brininess that define premium Gulf Coast oysters.
                  </p>
                </div>
              </ScrollAnimatedSection>
              <ScrollAnimatedSection animationType="slide-right" delay={400}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/topFarm.JPG"
                    alt="Keller Bay oyster farm location in Port Lavaca, Texas"
                    fill
                    className="object-cover"
                  />
                </div>
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
                    Ready to Order Premium Oysters?
                  </h3>
                  <p className="text-white/90 mb-8 text-lg">
                    Experience the exceptional taste and quality of our farm-raised oysters.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white hover:bg-white/90 text-purpleBrand"
                    >
                      <Link href="/products">View Products</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/20"
                    >
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>
          </div>
        </section>
      </main>
    </div>
  )
}

