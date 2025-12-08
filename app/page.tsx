"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles";
import Navigation from "@/components/Navigation";
import Script from "next/script";
import EnvVarChecker from "@/components/EnvVarChecker";
import { AnalyticsTestButton } from "@/components/AnalyticsTestButton";
import { useState, useEffect } from "react";

const LazyVideoPlayer = dynamic(() => import("@/components/ui/video-player").then(mod => ({ default: mod.VideoPlayer })), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />
});

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative overflow-x-hidden">
      <Script id="org-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Three Sisters Oyster Co.",
            "url": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'),
            "logo": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com') + '/logo.jpg',
            "description": "Sustainable oyster farming in Port Lavaca, Texas. Premium Gulf Coast oysters for restaurants, events, and seafood lovers.",
            "foundingDate": "2020",
            "founder": {
              "@type": "Person",
              "name": "Blake"
            },
            "areaServed": {
              "@type": "State",
              "name": "Texas"
            },
            "serviceType": "Oyster Farming and Aquaculture",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Oyster Products and Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Fresh Oysters",
                    "description": "Premium half-shell market oysters grown in Keller Bay, Port Lavaca, Texas",
                    "image": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com') + '/oyster.png',
                    "category": "Seafood",
                    "brand": {
                      "@type": "Brand",
                      "name": "Three Sisters Oyster Co."
                    },
                    "offers": {
                      "@type": "Offer",
                      "price": "45.00",
                      "priceCurrency": "USD",
                      "availability": "https://schema.org/InStock",
                      "url": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com') + '/products',
                      "seller": {
                        "@type": "Organization",
                        "name": "Three Sisters Oyster Co."
                      }
                    }
                  },
                  "price": "45.00",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "url": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com') + '/products'
                }
              ]
            },
            "sameAs": [],
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+1-713-854-7427",
              "contactType": "customer service",
              "areaServed": "US",
              "availableLanguage": "English"
            }],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "106 Grant St.",
              "addressLocality": "Port Lavaca",
              "addressRegion": "TX",
              "postalCode": "77979",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "28.6144",
              "longitude": "-96.6250"
            }
          })
        }}
      />
      <Script id="local-business-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Three Sisters Oyster Co.",
            "image": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com') + '/logo.jpg',
            "description": "Family-owned sustainable oyster farm in Port Lavaca, Texas. Premium Gulf Coast oysters for restaurants, events, and seafood lovers.",
            "url": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'),
            "telephone": "+1-713-854-7427",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "106 Grant St.",
              "addressLocality": "Port Lavaca",
              "addressRegion": "TX",
              "postalCode": "77979",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "28.6144",
              "longitude": "-96.6250"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "08:00",
              "closes": "17:00"
            },
            "priceRange": "$$",
            "servesCuisine": "Seafood",
            "hasMap": "https://maps.google.com/?q=28.6144,-96.6250"
          })
        }}
      />
      <SeasonalFloatingParticles count={isMobile ? 5 : 15} />
      
      {/* Header */}
      <Navigation />
      
      {/* Environment Status (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="container mx-auto px-4 py-4">
          <EnvVarChecker />
          <AnalyticsTestButton />
        </div>
      )}

      {/* Main Content */}
      <main role="main">
        {/* Section 1: Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="aspect-video w-full h-full">
              <LazyVideoPlayer
                src="/homepage.MP4"
                alt="Sustainable oyster farm in Port Lavaca Texas with fresh Gulf Coast oysters"
                className="w-full h-full object-cover"
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                controls={false}
                preload="metadata"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-purpleBrand/60 via-transparent to-purpleBrand/60"></div>
          </div>
          <div className="relative z-10 container mx-auto max-w-7xl text-center">
            <ScrollAnimatedSection animationType="fade-in" delay={200}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
                Three Sisters
                <span className="block">Oyster Co.</span>
              </h1>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="fade-in" delay={400}>
              <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-lg">
                Premium Gulf Coast oysters from the pristine waters of Port Lavaca, Texas
              </p>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="fade-in" delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-white/90 text-purpleBrand min-h-[56px] text-lg px-8 shadow-xl"
                >
                  <Link href="/products">Order Oysters</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 min-h-[56px] text-lg px-8 shadow-xl"
                >
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Section 2: Products Showcase */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purpleBrand/10 to-blueBrand/10">
          <div className="container mx-auto max-w-7xl">
            <ScrollAnimatedSection animationType="fade-in" delay={200}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-4">Our Products</h2>
                <p className="text-lg md:text-xl text-purple-800 max-w-2xl mx-auto">
                  Premium oysters grown with care in Keller Bay
                </p>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="fade-in" delay={400}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Link href="/products" className="group">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <Image
                      src="/oyster.png"
                      alt="Premium fresh oysters"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purpleBrand/80 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">Fresh Oysters</h3>
                        <p className="text-lg">Premium half-shell market oysters</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="/nursery" className="group">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <Image
                      src="/nurserylog.JPEG"
                      alt="Oyster seed production"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-seafoamBrand/80 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">Oyster Seed</h3>
                        <p className="text-lg">Hardy Eastern oyster seed for growers</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Section 3: About/Story Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blueBrand/10 to-seafoamBrand/10">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollAnimatedSection animationType="slide-left" delay={200}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/aboutpic.jpg"
                    alt="Three Sisters Oyster Co. family and team"
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollAnimatedSection>
              <ScrollAnimatedSection animationType="slide-right" delay={400}>
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-6">Our Story</h2>
                  <p className="text-lg md:text-xl text-purple-800 mb-6 leading-relaxed">
                    Three Sisters Oyster Co. is a family-owned oyster farm on the coast of Texas. Named after Blake's three daughters, our team strives to create a better coastline for the future.
                  </p>
                  <p className="text-lg md:text-xl text-purple-800 mb-8 leading-relaxed">
                    With sustainable farming practices in the pristine waters of Keller Bay, we grow premium oysters while improving water quality and protecting our marine environment.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-purpleBrand hover:bg-lavenderBrand text-white"
                  >
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </ScrollAnimatedSection>
            </div>
          </div>
        </section>

        {/* Section 4A: Carbon Sequestration Impact - Instagram Worthy */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blueBrand/20 to-seafoamBrand/20">
          <div className="container mx-auto max-w-6xl">
            <ScrollAnimatedSection animationType="fade-in" delay={200}>
              <Link href="/blog/oysters-carbon-sequestration-climate-change" className="group block">
                <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purpleBrand/90 via-blueBrand/90 to-seafoamBrand/90"></div>
                  <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                    <div className="text-center text-white z-10">
                      <div className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-2xl">🌊</div>
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
                        Fighting Climate Change
                      </h2>
                      <p className="text-xl md:text-2xl lg:text-3xl mb-6 drop-shadow-lg">
                        Our oysters sequester carbon and restore ocean health
                      </p>
                      <div className="text-4xl md:text-6xl font-bold mb-2 drop-shadow-2xl">
                        50+ gallons
                      </div>
                      <p className="text-lg md:text-xl drop-shadow-lg">filtered per oyster daily</p>
                    </div>
                  </div>
                  <Image
                    src="/topFarm.JPG"
                    alt="Oyster farm fighting climate change through carbon sequestration"
                    fill
                    className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                  />
                </div>
              </Link>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Section 4B: Water Filtration Stats - Instagram Worthy */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-seafoamBrand/20 to-blueBrand/20">
          <div className="container mx-auto max-w-6xl">
            <ScrollAnimatedSection animationType="fade-in" delay={200}>
              <Link href="/blog/oysters-water-filtration-environmental-impact" className="group block">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <Image
                      src="/enviromentBlog.jpg"
                      alt="Oysters filtering water in Keller Bay"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-seafoamBrand/90 via-seafoamBrand/50 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <div className="text-5xl md:text-6xl font-bold mb-2">50</div>
                        <div className="text-xl md:text-2xl font-semibold">Gallons per Day</div>
                        <p className="text-sm md:text-base mt-2">Each oyster filters this much water</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blueBrand to-seafoamBrand flex items-center justify-center">
                    <div className="text-center p-8 text-white">
                      <div className="text-4xl md:text-5xl font-bold mb-4">💧</div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">Natural Water Purifiers</h3>
                      <p className="text-lg md:text-xl mb-6">Removing algae, sediment, and excess nutrients</p>
                      <div className="text-3xl md:text-4xl font-bold">Cleaner Oceans</div>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Section 4C: Marine Habitat Creation - Instagram Worthy */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purpleBrand/20 to-blueBrand/20">
          <div className="container mx-auto max-w-6xl">
            <ScrollAnimatedSection animationType="fade-in" delay={200}>
              <Link href="/blog/oyster-farming-ocean-restoration" className="group block">
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                  <Image
                    src="/gal2.jpg"
                    alt="Marine habitat created by oyster farming"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purpleBrand/80 via-transparent to-transparent flex items-center">
                    <div className="p-8 md:p-12 text-white max-w-2xl">
                      <div className="text-5xl md:text-6xl mb-4">🐟</div>
                      <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
                        Restoring Ocean Ecosystems
                      </h2>
                      <p className="text-xl md:text-2xl mb-6 drop-shadow-lg">
                        Our oyster beds create habitats for fish, crabs, and marine life
                      </p>
                      <div className="flex gap-4 text-lg md:text-xl">
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Biodiversity</span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Habitat</span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Restoration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Section 4D: Sustainable Practices Showcase - Instagram Worthy */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-seafoamBrand/20 to-purpleBrand/20">
          <div className="container mx-auto max-w-7xl">
            <ScrollAnimatedSection animationType="fade-in" delay={200}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-4">Sustainable Practices</h2>
                <p className="text-lg md:text-xl text-purple-800">Why oysters are the most sustainable seafood choice</p>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="fade-in" delay={400}>
              <Link href="/blog/why-oysters-sustainable-seafood-choice" className="group block">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purpleBrand to-lavenderBrand flex flex-col items-center justify-center text-white p-6">
                    <div className="text-5xl mb-4">🌱</div>
                    <h3 className="text-xl font-bold mb-2 text-center">Zero Feed</h3>
                    <p className="text-sm text-center">No additional feed required</p>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blueBrand to-seafoamBrand flex flex-col items-center justify-center text-white p-6">
                    <div className="text-5xl mb-4">♻️</div>
                    <h3 className="text-xl font-bold mb-2 text-center">Regenerative</h3>
                    <p className="text-sm text-center">Improves the environment</p>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-seafoamBrand to-mintBrand flex flex-col items-center justify-center text-white p-6">
                    <div className="text-5xl mb-4">🌍</div>
                    <h3 className="text-xl font-bold mb-2 text-center">Low Impact</h3>
                    <p className="text-sm text-center">Minimal carbon footprint</p>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-mintBrand to-purpleBrand flex flex-col items-center justify-center text-white p-6">
                    <div className="text-5xl mb-4">💚</div>
                    <h3 className="text-xl font-bold mb-2 text-center">Eco-Friendly</h3>
                    <p className="text-sm text-center">Cleans water naturally</p>
                  </div>
                </div>
              </Link>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Section 4E: Behind the Scenes - Instagram Worthy */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blueBrand/20 to-seafoamBrand/20">
          <div className="container mx-auto max-w-6xl">
            <ScrollAnimatedSection animationType="fade-in" delay={200}>
              <Link href="/blog/day-in-life-oyster-farmer" className="group block">
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0">
                    <Image
                      src="/aboutpic.jpg"
                      alt="Behind the scenes at Three Sisters Oyster Farm"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-purpleBrand/90 via-purpleBrand/50 to-transparent flex items-end">
                    <div className="p-8 md:p-12 text-white w-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">📸</div>
                        <span className="text-sm md:text-base font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Behind the Scenes</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
                        A Day in the Life
                      </h2>
                      <p className="text-xl md:text-2xl mb-6 drop-shadow-lg">
                        See what it's like to work at our sustainable oyster farm
                      </p>
                      <div className="flex gap-2 text-sm md:text-base">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">Farm Life</span>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">Team</span>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">Process</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Section 4: Gallery Preview */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-seafoamBrand/10 to-purpleBrand/10">
          <div className="container mx-auto max-w-7xl">
            <ScrollAnimatedSection animationType="fade-in" delay={200}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-4">Gallery</h2>
                <p className="text-lg md:text-xl text-purple-800 max-w-2xl mx-auto">
                  A glimpse into life at the farm
                </p>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="fade-in" delay={400}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <Link href="/gallery" className="group">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Image
                      src="/gal.jpg"
                      alt="Gallery image 1"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <Link href="/gallery" className="group">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Image
                      src="/gal1.jpg"
                      alt="Gallery image 2"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <Link href="/gallery" className="group">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Image
                      src="/gal2.jpg"
                      alt="Gallery image 3"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <Link href="/gallery" className="group">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Image
                      src="/gal3.jpg"
                      alt="Gallery image 4"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <Link href="/gallery" className="group">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Image
                      src="/topFarm.JPG"
                      alt="Farm view"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
              </div>
              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-purpleBrand text-purpleBrand hover:bg-purpleBrand hover:text-white"
                >
                  <Link href="/gallery">View Full Gallery</Link>
                </Button>
              </div>
            </ScrollAnimatedSection>
          </div>
        </section>

        {/* Section 5: Call-to-Action */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purpleBrand to-seafoamBrand">
          <div className="container mx-auto max-w-4xl text-center">
            <ScrollAnimatedSection animationType="scale-in" delay={200}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Experience Premium Texas Oysters?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                Order fresh oysters or learn more about our farm and nursery operations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-white/90 text-purpleBrand min-h-[56px] text-lg px-8 shadow-xl"
                >
                  <Link href="/products">Order Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 min-h-[56px] text-lg px-8 shadow-xl"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </ScrollAnimatedSection>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purpleBrand text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src="/logo.jpg"
                    alt="Three Sisters Oyster Co logo - Texas Gulf Coast oyster farm"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Three Sisters Oyster Co.</h3>
                  <p className="text-white text-sm">Premium Texas Oysters</p>
                </div>
              </div>
              <p className="text-white text-sm">
                Committed to sustainable aquaculture and environmental stewardship in the pristine waters of Keller Bay.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-white">
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/farm" className="hover:text-white transition-colors">Farm</Link></li>
                <li><Link href="/nursery" className="hover:text-white transition-colors">Nursery</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>

            {/* Company Info */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-white text-sm">
                <li>713-854-7427</li>
                <li>info@threesistersoyster.com</li>
                <li>106 Grant St. Port Lavaca, TX 77979</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/30 mt-8 pt-8 text-center text-white text-sm">
            <p>&copy; 2024 Three Sisters Oyster Co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
