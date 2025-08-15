"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Waves, Fish, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CartButton } from "@/components/cart-button"
import dynamic from "next/dynamic";
import TeamScroller from "@/components/TeamScroller";

const TotalHarvestedCounter = dynamic(() => import("@/components/TotalHarvestedCounter"));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
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
                  <Link href="/inventory" className="text-white hover:text-white font-medium text-xs py-2 flex-1 text-center">
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
                    className="bg-mintBrand text-white hover:bg-seafoamBrand text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
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
              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-purple-900 mb-4 md:mb-6 leading-[1.4] text-center">
                Three Sisters
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mintBrand to-seafoamBrand pb-2">
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
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover bg-black"
                  style={{ 
                    objectPosition: 'center',
                    filter: 'brightness(1.1) contrast(1.05)'
                  }}
                >
                  <source src="/homepage.MP4" type="video/mp4" />
                  {/* Fallback for browsers that don't support video */}
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <span className="text-purple-900 text-lg">Video loading...</span>
                  </div>
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purpleBrand/20 via-blueBrand/20 to-seafoamBrand/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-3 md:mb-4 px-2 text-center">Our Operations</h2>
            <p className="text-base sm:text-lg md:text-xl text-purple-800 max-w-2xl mx-auto leading-relaxed px-4">
              From nursery to market, we provide premium oyster solutions for growers and consumers alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Nursery Card */}
            <Card className="border-seafoamBrand/30 bg-gradient-to-b from-seafoamBrand/40 to-blueBrand/40 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
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

            {/* Farm Card */}
            <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/40 to-blueBrand/40 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
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
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blueBrand/20 to-purpleBrand/20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6 leading-tight px-2 text-center">Named After Blake's Three Daughters</h2>
              <p className="text-sm md:text-base text-purple-800 mb-4 md:mb-6 leading-relaxed px-2">
                Three Sisters Oyster Co. is a family-owned oyster farm on the coast of Texas. Named after Blake's three
                daughters, our team strives to create a better coastline for the future.
              </p>
              <p className="text-sm md:text-base text-purple-800 mb-4 md:mb-6 leading-relaxed px-2">
                Blake grew up outdoors, learning to dive in the Thousand Islands in Indonesia and stayed active in wildlife and
                FFA during his youth. His love of the outdoors led him to oyster farming as a family and lifestyle
                choice.
              </p>
              <p className="text-sm md:text-base text-purple-800 mb-6 md:mb-8 leading-relaxed px-2">
                With a Range and Wildlife Management degree from Texas A&M Kingsville and eight years in Environmental
                Consulting, Blake discovered the pristine waters of Keller Bay - an excellent location for growing
                premium oysters while improving water quality and sequestering nitrogen and carbon.
              </p>
            </div>
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
          </div>
          <div className="mt-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Meet Our Team</h2>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              The dedicated team behind Three Sisters Oyster Co. - passionate about sustainable aquaculture and premium oysters.
            </p>
          </div>
          <TeamScroller />
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 px-4 bg-gradient-to-b from-purpleBrand/40 via-blueBrand/40 to-seafoamBrand/40">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-purple-900 mb-6 text-center">Environmental Stewardship</h2>
          <p className="text-xl text-purple-800 mb-12 max-w-3xl mx-auto">
            We take pride in creating the best oysters while helping the environment, improving water quality and
            sequestering nitrogen and carbon.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-b from-purpleBrand to-blueBrand rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2 text-center">Water Quality</h3>
              <p className="text-purple-800">Improving coastal water quality through natural filtration</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-b from-seafoamBrand to-blueBrand rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2 text-center">Carbon Sequestration</h3>
              <p className="text-purple-800">Capturing and storing carbon to combat climate change</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-b from-blueBrand to-seafoamBrand rounded-full flex items-center justify-center mx-auto mb-4">
                <Fish className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2 text-center">Marine Habitat</h3>
              <p className="text-purple-800">Creating habitat for fish and marine life</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-blueBrand/20 to-purpleBrand/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-900 mb-4 text-center">Get In Touch</h2>
            <p className="text-xl text-purple-800">Ready to order premium oysters or learn more about our operations?</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="tel:713-854-7427"
                  className="flex items-center text-purple-800 hover:text-white transition-colors duration-200 group"
                >
                  <Phone className="w-5 h-5 text-white mr-3 group-hover:text-white transition-colors duration-200" />
                  <span className="group-hover:underline">713-854-7427</span>
                </a>
                <a
                  href="mailto:info@threesistersoyster.com"
                  className="flex items-center text-purple-800 hover:text-white transition-colors duration-200 group"
                >
                  <Mail className="w-5 h-5 text-white mr-3 group-hover:text-white transition-colors duration-200" />
                  <span className="group-hover:underline">info@threesistersoyster.com</span>
                </a>
                <a
                  href="https://maps.google.com/?q=106+Grant+St.+Port+Lavaca,+TX+77979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-purple-800 hover:text-white transition-colors duration-200 group"
                >
                  <MapPin className="w-5 h-5 text-white mr-3 group-hover:text-white transition-colors duration-200" />
                  <span className="group-hover:underline">106 Grant St. Port Lavaca, TX 77979</span>
                </a>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-purple-900 mb-4 text-center">Follow Us</h4>
                <a
                  href="https://instagram.com/threesistersoysterco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-800 hover:text-white transition-colors duration-200 hover:underline"
                >
                  @threesistersoysterco
                </a>
              </div>
            </div>

            <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/40 to-blueBrand/40 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-purple-900 placeholder-purple-600"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-purple-900 placeholder-purple-600"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white/10 text-purple-900 placeholder-purple-600"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-mintBrand hover:bg-seafoamBrand text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
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
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
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
