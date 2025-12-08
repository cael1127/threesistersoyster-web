import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection"
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles"
import Navigation from "@/components/Navigation"

export const metadata: Metadata = {
  title: "Our Nursery | Three Sisters Oyster Co. | Premium Oyster Seed Production",
  description: "Learn about our nursery operations producing hardy Eastern oyster seed. Quality seed stock for superior flavor development and consistent taste profiles.",
  keywords: [
    "oyster seed Texas",
    "oyster nursery",
    "Eastern oyster seed",
    "aquaculture seed",
    "oyster seed production",
    "hardy oyster seed",
    "oyster seed for growers",
    "Texas oyster nursery"
  ],
}

export default function NurseryPage() {
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
                Our Nursery
              </h1>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="fade-in" delay={400}>
              <p className="text-xl md:text-2xl text-purple-800 max-w-3xl mx-auto">
                Premium seed production for superior oyster development
              </p>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Nursery Operations */}
        <section className="py-20 px-4 bg-gradient-to-b from-blueBrand/20 to-purpleBrand/20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <ScrollAnimatedSection animationType="slide-left" delay={200}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/nurserylog.JPEG"
                    alt="Oyster nursery operations showing sustainable aquaculture equipment"
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollAnimatedSection>
              <ScrollAnimatedSection animationType="slide-right" delay={400}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
                    Premium Seed Development
                  </h2>
                  <p className="text-lg text-purple-800 mb-6 leading-relaxed">
                    Our nursery produces hardy Eastern oyster seed that develops into oysters with exceptional flavor profiles. 
                    Quality seed stock ensures consistent taste and texture that chefs and oyster lovers expect.
                  </p>
                  <p className="text-lg text-purple-800 mb-6 leading-relaxed">
                    We focus on cultivating seed that will grow into premium oysters with superior flavor development, 
                    consistent taste profiles, and quality-focused cultivation practices.
                  </p>
                </div>
              </ScrollAnimatedSection>
            </div>

            <ScrollAnimatedSection animationType="fade-in" delay={600}>
              <Card className="border-seafoamBrand/30 bg-gradient-to-b from-seafoamBrand/40 to-blueBrand/40 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">Why Our Seed Matters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-seafoamBrand rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🌱</span>
                      </div>
                      <h4 className="text-xl font-bold text-purple-900 mb-2">Superior Flavor</h4>
                      <p className="text-purple-800">Seed that develops exceptional flavor profiles</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-seafoamBrand rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📊</span>
                      </div>
                      <h4 className="text-xl font-bold text-purple-900 mb-2">Consistent Quality</h4>
                      <p className="text-purple-800">Reliable taste profiles every time</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-seafoamBrand rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <h4 className="text-xl font-bold text-purple-900 mb-2">Quality Focus</h4>
                      <p className="text-purple-800">Cultivation practices that prioritize excellence</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Seed Information */}
        <section className="py-20 px-4 bg-gradient-to-b from-purpleBrand/20 to-blueBrand/20">
          <div className="container mx-auto max-w-6xl">
            <ScrollAnimatedSection animationType="fade-in" delay={200}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
                  Hardy Eastern Oyster Seed
                </h2>
                <p className="text-lg text-purple-800 max-w-3xl mx-auto leading-relaxed">
                  Our nursery specializes in producing hardy Eastern oyster seed that's perfect for growers and 
                  aquaculture operations looking for quality stock with proven performance.
                </p>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="fade-in" delay={400}>
              <Card className="border-seafoamBrand/30 bg-gradient-to-b from-seafoamBrand/40 to-blueBrand/40 backdrop-blur-sm max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">Interested in Oyster Seed?</h3>
                  <p className="text-lg text-purple-800 mb-6 text-center leading-relaxed">
                    For pricing and ordering information about our oyster seed, please contact us directly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-purpleBrand hover:bg-lavenderBrand text-white"
                    >
                      <a href="tel:713-854-7427">Call 713-854-7427</a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-purpleBrand text-purpleBrand hover:bg-purpleBrand/10"
                    >
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-gradient-to-r from-seafoamBrand/40 to-purpleBrand/40">
          <div className="container mx-auto max-w-4xl text-center">
            <ScrollAnimatedSection animationType="scale-in" delay={200}>
              <Card className="border-seafoamBrand/30 bg-gradient-to-r from-seafoamBrand/40 to-purpleBrand/40">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Learn More About Our Operations
                  </h3>
                  <p className="text-white/90 mb-8 text-lg">
                    Discover how we grow premium oysters from seed to harvest.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white hover:bg-white/90 text-purpleBrand"
                    >
                      <Link href="/farm">Visit Our Farm</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/20"
                    >
                      <Link href="/about">Our Story</Link>
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

