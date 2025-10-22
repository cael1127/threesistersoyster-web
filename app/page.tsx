"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, Fish, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic";
import TeamScroller from "@/components/TeamScroller";
// import { VideoPlayer } from '@/components/ui/video-player'; // Now using LazyVideoPlayer
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles";
import Navigation from "@/components/Navigation";
import Script from "next/script";
import EnvVarChecker from "@/components/EnvVarChecker";
import { AnalyticsTestButton } from "@/components/AnalyticsTestButton";
import { useState, useEffect } from "react";

const TotalHarvestedCounter = dynamic(() => import("@/components/TotalHarvestedCounter"));
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
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product", 
                    "name": "Oyster Seed",
                    "description": "Hardy Eastern oyster seed for growers and aquaculture operations",
                    "image": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com') + '/oyster.png',
                    "category": "Aquaculture",
                    "brand": {
                      "@type": "Brand",
                      "name": "Three Sisters Oyster Co."
                    },
                    "offers": {
                      "@type": "Offer",
                      "price": "25.00",
                      "priceCurrency": "USD",
                      "availability": "https://schema.org/InStock",
                      "url": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com') + '/inventory',
                      "seller": {
                        "@type": "Organization",
                        "name": "Three Sisters Oyster Co."
                      }
                    }
                  },
                  "price": "25.00",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "url": (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com') + '/inventory'
                }
              ]
            },
            "sameAs": [
              // Add social URLs if available
            ],
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

      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purpleBrand/20 via-blueBrand/20 to-seafoamBrand/20 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-purple-900 mb-4 md:mb-6 leading-[1.4] text-center">
                Three Sisters
                <span className="block text-purple-900 pb-2">
                  Oyster Co.
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-purple-800 mb-6 md:mb-8 leading-relaxed">
                Growing the finest Gulf Coast oysters in the pristine waters of Port Lavaca, Texas. Our sustainable farming practices deliver exceptional flavor, texture, and freshness that chefs and seafood lovers trust. From our farm to your table, experience the superior taste of premium Texas oysters for restaurants, catering, and home dining.
              </p>

              {/* Total Harvested Counter */}
              <div className="mb-6 md:mb-8">
                <TotalHarvestedCounter />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-purpleBrand hover:bg-lavenderBrand text-white min-h-[48px] text-base shadow-lg"
                >
                  <Link href="/products">Order Premium Oysters</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-mintBrand hover:bg-seafoamBrand text-white min-h-[48px] text-base shadow-lg"
                >
                  <Link href="/about">Learn Our Story</Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Video */}
            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <LazyVideoPlayer
                  src="/homepage.MP4"
                  alt="Sustainable oyster farm in Port Lavaca Texas with fresh Gulf Coast oysters"
                  className="w-full h-full"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  playsInline={true}
                  controls={false}
                  preload="metadata"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purpleBrand/20 via-blueBrand/20 to-seafoamBrand/20 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <ScrollAnimatedSection animationType="fade-in" delay={200}>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-3 md:mb-4 px-2 text-center">Crafting Premium Oysters</h2>
              <p className="text-base sm:text-lg md:text-xl text-purple-800 max-w-2xl mx-auto leading-relaxed px-4">
                From seed to shuck, our meticulous farming process ensures every oyster delivers exceptional taste, texture, and freshness. Sustainable practices that enhance flavor and quality in every bite.
              </p>
            </div>
          </ScrollAnimatedSection>

          {/* First Row: Nursery Card (Left) + Picture (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            {/* Nursery Card - Left Side */}
            <ScrollAnimatedSection animationType="slide-left-far" delay={400}>
              <Card className="border-seafoamBrand/30 bg-gradient-to-b from-seafoamBrand/40 to-blueBrand/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center mr-3 md:mr-4">
                      <Image
                        src="/nurserylog.JPEG"
                        alt="Oyster nursery equipment used for sustainable oyster farming in Texas"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        quality={90}
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-purple-900 text-center">Premium Seed for Superior Taste</h3>
                  </div>
                  <p className="text-sm md:text-base text-purple-800 mb-4 md:mb-6 leading-relaxed">
                    Our nursery produces hardy Eastern oyster seed that develops into oysters with exceptional flavor profiles. 
                    Quality seed stock ensures consistent taste and texture that chefs and oyster lovers expect.
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-purple-800 mb-4 md:mb-6">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-seafoamBrand rounded-full mr-3"></div>
                      Superior flavor development
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-seafoamBrand rounded-full mr-3"></div>
                      Consistent taste profiles
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-seafoamBrand rounded-full mr-3"></div>
                      Quality-focused cultivation
                    </li>
                  </ul>
                  <p className="text-xs md:text-sm text-purple-800">
                    For pricing and ordering information, please call{" "}
                    <a href="tel:713-854-7427" className="font-semibold text-white hover:text-white transition-colors duration-200">
                      713-854-7427
                    </a>
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>

            {/* Nursery Picture - Right Side */}
            <ScrollAnimatedSection animationType="slide-right-far" delay={500}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-b from-seafoamBrand/40 to-blueBrand/40 rounded-2xl flex items-center justify-center border border-seafoamBrand/30 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-seafoamBrand/20 to-blueBrand/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-seafoamBrand/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Image
                          src="/nurserylog.JPEG"
                          alt="Texas oyster nursery operations showing sustainable aquaculture equipment"
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                          quality={90}
                        />
                      </div>
                      <p className="text-purple-800 font-medium">Quality Seed Production</p>
                      <p className="text-purple-700 text-sm">Flavor-Focused Cultivation</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>

          {/* Second Row: Picture (Left) + Farm Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Farm Picture - Left Side */}
            <ScrollAnimatedSection animationType="slide-left-far" delay={700}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-b from-purpleBrand/40 to-blueBrand/40 rounded-2xl flex items-center justify-center border border-purpleBrand/30 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purpleBrand/20 to-blueBrand/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purpleBrand/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Image
                          src="/farmlog.jpg"
                          alt="Texas oyster farm operations showing Gulf Coast oyster cultivation"
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                          quality={90}
                        />
                      </div>
                      <p className="text-purple-800 font-medium">Premium Harvest</p>
                      <p className="text-purple-700 text-sm">Quality & Flavor Focus</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* Farm Card - Right Side */}
            <ScrollAnimatedSection animationType="slide-right-far" delay={800}>
              <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/40 to-blueBrand/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center mr-3 md:mr-4">
                      <Image
                        src="/farmlog.jpg"
                        alt="Fresh oysters for sale online from Port Lavaca Texas oyster farm"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        quality={90}
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-purple-900 text-center">Premium Oyster Harvest</h3>
                  </div>
                  <p className="text-sm md:text-base text-purple-800 mb-4 md:mb-6 leading-relaxed">
                    We carefully grow oysters to perfect market size, ensuring optimal flavor, texture, and brininess. 
                    Our sustainable farming in Keller Bay's pristine waters creates oysters that deliver an exceptional dining experience.
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-purple-800">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mr-3"></div>
                      Perfect half-shell presentation
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mr-3"></div>
                      Enhanced flavor through sustainable practices
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mr-3"></div>
                      Clean, pristine growing environment
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blueBrand/20 to-purpleBrand/20 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center lg:text-left">
              <ScrollAnimatedSection animationType="fade-in" delay={200}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6 leading-tight px-2 text-center">Named After Blake's Three Daughters</h2>
              </ScrollAnimatedSection>
              <ScrollAnimatedSection animationType="fade-in" delay={400}>
                <p className="text-sm md:text-base text-purple-800 mb-4 md:mb-6 leading-relaxed px-2">
                  Three Sisters Oyster Co. is a family-owned oyster farm on the coast of Texas. Named after Blake's three
                  daughters, our team strives to create a better coastline for the future.
                </p>
              </ScrollAnimatedSection>
              <ScrollAnimatedSection animationType="fade-in" delay={600}>
                <p className="text-sm md:text-base text-purple-800 mb-4 md:mb-6 leading-relaxed px-2">
                  Blake grew up outdoors, learning to dive in the Thousand Islands in Indonesia and stayed active in wildlife and
                  FFA during his youth. His love of the outdoors led him to oyster farming as a family and lifestyle
                  choice.
                </p>
              </ScrollAnimatedSection>
              <ScrollAnimatedSection animationType="fade-in" delay={800}>
                <p className="text-sm md:text-base text-purple-800 mb-6 md:mb-8 leading-relaxed px-2">
                  With a Range and Wildlife Management degree from Texas A&M Kingsville and eight years in Environmental
                  Consulting, Blake discovered the pristine waters of Keller Bay - an excellent location for growing
                  premium oysters while improving water quality and sequestering nitrogen and carbon.
                </p>
              </ScrollAnimatedSection>
            </div>
            <ScrollAnimatedSection animationType="slide-right-far" delay={300}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-b from-purpleBrand/40 to-seafoamBrand/40 rounded-2xl flex items-center justify-center border border-purpleBrand/30">
                  <Image
                    src="/aboutpic.jpg"
                    alt="Three Sisters Oyster farmers harvesting sustainable oysters in Port Lavaca Texas"
                    width={400}
                    height={400}
                    className="rounded-2xl object-cover"
                    quality={90}
                  />
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
          <ScrollAnimatedSection animationType="fade-in" delay={1000}>
            <div className="mt-16 text-center">
              <h2 className="text-4xl font-bold text-purple-900 mb-8 text-center">Meet Our Team</h2>
              <p className="text-xl text-purple-800 mb-12 max-w-3xl mx-auto">
                The dedicated team behind Three Sisters Oyster Co. - passionate about sustainable aquaculture and premium oysters.
              </p>
            </div>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection animationType="scale-in" delay={1200}>
            <TeamScroller />
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 px-4 bg-gradient-to-b from-purpleBrand/40 via-blueBrand/40 to-seafoamBrand/40 overflow-hidden">
        <div className="container mx-auto text-center">
          <ScrollAnimatedSection animationType="fade-in" delay={200}>
            <h2 className="text-4xl font-bold text-purple-900 mb-6 text-center">Environmental Stewardship</h2>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection animationType="fade-in" delay={400}>
            <p className="text-xl text-purple-800 mb-12 max-w-3xl mx-auto">
              Our environmental practices don't just protect the coast—they enhance the flavor and quality of our oysters. 
              Clean water means better taste, and sustainable farming creates superior culinary experiences.
            </p>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimatedSection animationType="slide-left-far" delay={600}>
              <div className="text-center group cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-b from-purpleBrand to-blueBrand rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-125 group-hover:shadow-lg">
                  <Waves className="w-8 h-8 text-white transition-all duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2 text-center">Water Quality</h3>
                <p className="text-purple-800">Clean water creates cleaner, more flavorful oysters</p>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="zoom-in" delay={800}>
              <div className="text-center group cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-b from-seafoamBrand to-blueBrand rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-125 group-hover:shadow-lg">
                  <Leaf className="w-8 h-8 text-white transition-all duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2 text-center">Carbon Sequestration</h3>
                <p className="text-purple-800">Healthy ecosystems produce healthier, tastier oysters</p>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="slide-right-far" delay={1000}>
              <div className="text-center group cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-b from-blueBrand to-seafoamBrand rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-125 group-hover:shadow-lg">
                  <Fish className="w-8 h-8 text-white transition-all duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2 text-center">Marine Habitat</h3>
                <p className="text-purple-800">Rich marine environments enhance oyster flavor complexity</p>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

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
                <li><Link href="/inventory" className="hover:text-white transition-colors">Inventory</Link></li>
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
            <p>&copy; 2024 Three Sisters Oyster Co. All rights reserved. | Designed and built by Cael Findley</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
