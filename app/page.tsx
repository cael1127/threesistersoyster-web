"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, Fish, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic";
import TeamScroller from "@/components/TeamScroller";
import { VideoPlayer } from '@/components/ui/video-player';
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";
import { FloatingParticles } from "@/components/ui/floating-particles";
import Navigation from "@/components/Navigation";


const TotalHarvestedCounter = dynamic(() => import("@/components/TotalHarvestedCounter"));


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <FloatingParticles particleCount={15} interactive={true} />
      {/* Header */}
      <header className="bg-purpleBrand border-b border-purpleBrand/30 sticky top-0 z-50">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
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
            </div>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="#home" className="text-white font-medium text-sm">
                  Home
                </Link>
                <Link href="/products" className="text-white hover:text-white font-medium text-sm">
                  Products
                </Link>
                <Link
                  href="/inventory"
                  className="text-white hover:text-white font-medium text-sm"
                >
                  Inventory
                </Link>
                <Link href="/gallery" className="text-white hover:text-white font-medium text-sm">
                  Gallery
                </Link>
                <Link href="/about" className="text-white hover:text-white font-medium text-sm">
                  About
                </Link>

              </nav>
              
              {/* Mobile Layout - Improved spacing and touch targets */}
              <div className="flex md:hidden items-center w-full">
                {/* Mobile Navigation - Better spaced and larger touch targets */}
                <nav className="flex items-center justify-between flex-1 px-2 space-x-1">
                  <Link 
                    href="/products" 
                    className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                  >
                    Shop
                  </Link>
                  <Link 
                    href="/inventory" 
                    className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                  >
                    Stock
                  </Link>
                  <Link 
                    href="/gallery" 
                    className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                  >
                    Gallery
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-white hover:text-white font-medium text-sm py-3 px-2 flex-1 text-center rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                  >
                    About
                  </Link>

                </nav>
                
                {/* Mobile Cart/Order Buttons - Better spaced */}
                <div className="flex items-center space-x-2 px-3">
                  <CartButton />
                  <Button
                    asChild
                    size="sm"
                    className="bg-mintBrand text-white hover:bg-seafoamBrand text-sm px-3 min-h-[44px] focus-visible:ring-0 focus-visible:ring-offset-0"
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
                    className="bg-mintBrand text-white hover:bg-seafoamBrand text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Link href="/order">Order</Link>
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purpleBrand/20 via-blueBrand/20 to-seafoamBrand/20">
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
                Committed to the long-term viability of off-bottom aquaculture and a thriving Texas coastline. Growing the
                finest oysters in the pristine waters of Keller Bay.
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
                  <Link href="/products">Shop Fresh Oysters</Link>
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
                <VideoPlayer
                  src="/homepage.MP4"
                  alt="Three Sisters Oyster Farm Tour"
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
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purpleBrand/20 via-blueBrand/20 to-seafoamBrand/20">
        <div className="container mx-auto max-w-7xl">
          <ScrollAnimatedSection animationType="fade-in" delay={200}>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-3 md:mb-4 px-2 text-center">Our Operations</h2>
              <p className="text-base sm:text-lg md:text-xl text-purple-800 max-w-2xl mx-auto leading-relaxed px-4">
                From nursery to market, we provide premium oyster solutions for growers and consumers alike.
              </p>
            </div>
          </ScrollAnimatedSection>

          {/* First Row: Nursery Card (Left) + Picture (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            {/* Nursery Card - Left Side */}
            <ScrollAnimatedSection animationType="slide-left" delay={400}>
              <Card className="border-seafoamBrand/30 bg-gradient-to-b from-seafoamBrand/40 to-blueBrand/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center mr-3 md:mr-4">
                      <Image
                        src="/nurserylog.JPEG"
                        alt="Three Sisters Oyster Nursery"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        quality={90}
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-purple-900 text-center">Oyster Nursery</h3>
                  </div>
                  <p className="text-sm md:text-base text-purple-800 mb-4 md:mb-6 leading-relaxed">
                    Three Sisters Nursery offers customers hardy oyster seed to meet
                    growers' needs with superior quality and reliability.
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-purple-800 mb-4 md:mb-6">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-seafoamBrand rounded-full mr-3"></div>
                      Hardy Eastern oyster seed
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-seafoamBrand rounded-full mr-3"></div>
                      Reliable supply for growers
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-seafoamBrand rounded-full mr-3"></div>
                      Expert cultivation support
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
            <ScrollAnimatedSection animationType="slide-right" delay={500}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-b from-seafoamBrand/40 to-blueBrand/40 rounded-2xl flex items-center justify-center border border-seafoamBrand/30 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-seafoamBrand/20 to-blueBrand/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-seafoamBrand/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Image
                          src="/nurserylog.JPEG"
                          alt="Nursery Operations"
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                          quality={90}
                        />
                      </div>
                      <p className="text-purple-800 font-medium">Nursery Operations</p>
                      <p className="text-purple-700 text-sm">Seed Production & Cultivation</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>

          {/* Second Row: Picture (Left) + Farm Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Farm Picture - Left Side */}
            <ScrollAnimatedSection animationType="slide-left" delay={700}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-b from-purpleBrand/40 to-blueBrand/40 rounded-2xl flex items-center justify-center border border-purpleBrand/30 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purpleBrand/20 to-blueBrand/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purpleBrand/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Image
                          src="/farmlog.jpg"
                          alt="Farm Operations"
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                          quality={90}
                        />
                      </div>
                      <p className="text-purple-800 font-medium">Farm Operations</p>
                      <p className="text-purple-700 text-sm">Grow-out & Harvest</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* Farm Card - Right Side */}
            <ScrollAnimatedSection animationType="slide-right" delay={800}>
              <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/40 to-blueBrand/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center mr-3 md:mr-4">
                      <Image
                        src="/farmlog.jpg"
                        alt="Three Sisters Oyster Farm"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        quality={90}
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-purple-900 text-center">Oyster Farm</h3>
                  </div>
                  <p className="text-sm md:text-base text-purple-800 mb-4 md:mb-6 leading-relaxed">
                    We grow oysters to market size for the premium half-shell market while providing essential habitat for
                    fish and other sea life in our sustainable farming operations.
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-purple-800">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mr-3"></div>
                      Premium half-shell market oysters
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mr-3"></div>
                      Sustainable aquaculture practices
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

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blueBrand/20 to-purpleBrand/20">
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
            <ScrollAnimatedSection animationType="slide-right" delay={300}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-b from-purpleBrand/40 to-seafoamBrand/40 rounded-2xl flex items-center justify-center border border-purpleBrand/30">
                  <Image
                    src="/aboutpic.jpg"
                    alt="Blake and family at the oyster farm"
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
      <section className="py-20 px-4 bg-gradient-to-b from-purpleBrand/40 via-blueBrand/40 to-seafoamBrand/40">
        <div className="container mx-auto text-center">
          <ScrollAnimatedSection animationType="fade-in" delay={200}>
            <h2 className="text-4xl font-bold text-purple-900 mb-6 text-center">Environmental Stewardship</h2>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection animationType="fade-in" delay={400}>
            <p className="text-xl text-purple-800 mb-12 max-w-3xl mx-auto">
              We take pride in creating the best oysters while helping the environment, improving water quality and
              sequestering nitrogen and carbon.
            </p>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimatedSection animationType="slide-left" delay={600}>
              <div className="text-center group cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-b from-purpleBrand to-blueBrand rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-125 group-hover:shadow-lg">
                  <Waves className="w-8 h-8 text-white transition-all duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2 text-center">Water Quality</h3>
                <p className="text-purple-800">Improving coastal water quality through natural filtration</p>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="fade-in" delay={800}>
              <div className="text-center group cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-b from-seafoamBrand to-blueBrand rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-125 group-hover:shadow-lg">
                  <Leaf className="w-8 h-8 text-white transition-all duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2 text-center">Carbon Sequestration</h3>
                <p className="text-purple-800">Capturing and storing carbon to combat climate change</p>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animationType="slide-right" delay={1000}>
              <div className="text-center group cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-b from-blueBrand to-seafoamBrand rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-125 group-hover:shadow-lg">
                  <Fish className="w-8 h-8 text-white transition-all duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2 text-center">Marine Habitat</h3>
                <p className="text-purple-800">Creating habitat for fish and marine life</p>
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
                    alt="Three Sisters Oyster Co. Logo"
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
            <p>&copy; 2024 Three Sisters Oyster Co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
