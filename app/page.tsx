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
      <header className="bg-purpleBrand border-b border-purple-300/30 sticky top-0 z-50">
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
                <h1 className="text-xl font-bold text-mintBrand text-center">
                  Three Sisters Oyster Co.
                </h1>
                <p className="text-xs text-seafoamBrand">Premium Texas Oysters</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="#home" className="text-mintBrand font-medium text-sm">
                  Home
                </Link>
                <Link href="/products" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  Products
                </Link>
                <Link
                  href="/inventory"
                  className="text-mintBrand hover:text-seafoamBrand font-medium text-sm"
                >
                  Inventory
                </Link>
                <Link href="/gallery" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  Gallery
                </Link>
                <Link href="/about" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  About
                </Link>
                <Link href="/contact" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  Contact
                </Link>
              </nav>
              
              {/* Mobile Layout - Restructured for better spacing */}
              <div className="flex md:hidden items-center w-full">
                {/* Mobile Navigation - Compact */}
                <nav className="flex items-center flex-1 px-4">
                  <Link href="/products" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
                    Shop
                  </Link>
                  <Link href="/inventory" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
                    Stock
                  </Link>
                  <Link href="/gallery" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
                    Gallery
                  </Link>
                  <Link href="/about" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
                    About
                  </Link>
                  <Link href="/contact" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-2 flex-1 text-center">
                    Contact
                  </Link>
                </nav>
                
                {/* Mobile Cart/Order Buttons */}
                <div className="flex items-center space-x-1 px-2">
                  <CartButton />
                  <Button
                    asChild
                    size="sm"
                    className="bg-mintBrand hover:bg-seafoamBrand text-white text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
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
                    className="bg-mintBrand hover:bg-seafoamBrand text-white text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Link href="/order">Order</Link>
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/20 via-blue-800/20 to-teal-800/20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.4] text-center">
                Three Sisters
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300 pb-2">
                  Oyster Co.
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 leading-relaxed">
                Committed to the long-term viability of off-bottom aquaculture and a thriving Texas coastline. Growing the
                finest oysters in the pristine waters of Keller Bay.
              </p>

              {/* Total Harvested Counter */}
              <div className="mb-6 md:mb-8">
                <TotalHarvestedCounter />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-mintBrand hover:bg-seafoamBrand text-white min-h-[48px] text-base shadow-lg"
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
                  preload="none"
                  className="w-full h-full object-cover"
                  style={{ 
                    objectPosition: 'center',
                    filter: 'brightness(1.1) contrast(1.05)'
                  }}
                  poster="/homepage-poster.jpg"
                >
                  <source src="/homepage.mp4" type="video/mp4" />
                  <source src="/homepage.webm" type="video/webm" />
                  {/* Fallback for browsers that don't support video */}
                  <img src="/homepage-poster.jpg" alt="Three Sisters Oyster Co. Farm" className="w-full h-full object-cover" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/20 via-blue-800/20 to-teal-800/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 px-2 text-center">Our Operations</h2>
            <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed px-4">
              From nursery to market, we provide premium oyster solutions for growers and consumers alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Nursery Card */}
            <Card id="nursery" className="border-teal-300/30 bg-gradient-to-b from-teal-900/40 to-blue-900/40 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
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
                  <h3 className="text-xl md:text-2xl font-bold text-white text-center">Oyster Nursery</h3>
                </div>
                <p className="text-sm md:text-base text-white mb-4 md:mb-6 leading-relaxed">
                  Three Sisters Nursery offers customers hardy oyster seed to meet
                  growers' needs with superior quality and reliability.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-white mb-4 md:mb-6">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                    Hardy Eastern oyster seed
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                    Reliable supply for growers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                    Expert cultivation support
                  </li>
                </ul>
                <p className="text-xs md:text-sm text-white">
                  For pricing and ordering information, please call{" "}
                  <a href="tel:713-854-7427" className="font-semibold text-teal-300 hover:text-teal-200 transition-colors duration-200">
                    713-854-7427
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Farm Card */}
            <Card id="farm" className="border-purple-300/30 bg-gradient-to-b from-purple-900/40 to-blue-900/40 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
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
                  <h3 className="text-xl md:text-2xl font-bold text-white text-center">Oyster Farm</h3>
                </div>
                <p className="text-sm md:text-base text-white mb-4 md:mb-6 leading-relaxed">
                  We grow oysters to market size for the premium half-shell market while providing essential habitat for
                  fish and other sea life in our sustainable farming operations.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-white">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Premium half-shell market oysters
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Sustainable aquaculture practices
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Marine habitat restoration
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight px-2 text-center">Named After Blake's Three Daughters</h2>
              <p className="text-sm md:text-base text-white mb-4 md:mb-6 leading-relaxed px-2">
                Three Sisters Oyster Co. is a family-owned oyster farm on the coast of Texas. Named after Blake's three
                daughters, our team strives to create a better coastline for the future.
              </p>
              <p className="text-sm md:text-base text-white mb-4 md:mb-6 leading-relaxed px-2">
                Blake grew up outdoors, learning to dive in the Thousand Islands in Indonesia and stayed active in wildlife and
                FFA during his youth. His love of the outdoors led him to oyster farming as a family and lifestyle
                choice.
              </p>
              <p className="text-sm md:text-base text-white mb-6 md:mb-8 leading-relaxed px-2">
                With a Range and Wildlife Management degree from Texas A&M Kingsville and eight years in Environmental
                Consulting, Blake discovered the pristine waters of Keller Bay - an excellent location for growing
                premium oysters while improving water quality and sequestering nitrogen and carbon.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-b from-purple-800/40 to-teal-800/40 rounded-2xl flex items-center justify-center border border-purple-300/30">
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
          <TeamScroller />
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/40 via-blue-800/40 to-teal-800/40">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Environmental Stewardship</h2>
          <p className="text-xl text-white mb-12 max-w-3xl mx-auto">
            We take pride in creating the best oysters while helping the environment, improving water quality and
            sequestering nitrogen and carbon.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-b from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Water Quality</h3>
              <p className="text-white">Improving coastal water quality through natural filtration</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-b from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Carbon Sequestration</h3>
              <p className="text-white">Capturing and storing carbon to combat climate change</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-b from-blue-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fish className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Marine Habitat</h3>
              <p className="text-white">Creating habitat for fish and marine life</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purpleBrand mb-4 text-center">Get In Touch</h2>
            <p className="text-xl text-gray-700">Ready to order premium oysters or learn more about our operations?</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-purpleBrand mb-6 text-center">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="tel:713-854-7427"
                  className="flex items-center text-gray-700 hover:text-purpleBrand transition-colors duration-200 group"
                >
                  <Phone className="w-5 h-5 text-mintBrand mr-3 group-hover:text-purpleBrand transition-colors duration-200" />
                  <span className="group-hover:underline">713-854-7427</span>
                </a>
                <a
                  href="mailto:info@threesistersoyster.com"
                  className="flex items-center text-gray-700 hover:text-purpleBrand transition-colors duration-200 group"
                >
                  <Mail className="w-5 h-5 text-mintBrand mr-3 group-hover:text-purpleBrand transition-colors duration-200" />
                  <span className="group-hover:underline">info@threesistersoyster.com</span>
                </a>
                <a
                  href="https://maps.google.com/?q=106+Grant+St.+Port+Lavaca,+TX+77979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-purpleBrand transition-colors duration-200 group"
                >
                  <MapPin className="w-5 h-5 text-mintBrand mr-3 group-hover:text-purpleBrand transition-colors duration-200" />
                  <span className="group-hover:underline">106 Grant St. Port Lavaca, TX 77979</span>
                </a>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-purpleBrand mb-4 text-center">Follow Us</h4>
                <a
                  href="https://instagram.com/threesistersoysterco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-purpleBrand transition-colors duration-200 hover:underline"
                >
                  @threesistersoysterco
                </a>
              </div>
            </div>

            <Card className="border-purple-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-purpleBrand mb-6 text-center">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-mintBrand hover:bg-seafoamBrand text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo.jpg"
                    alt="Three Sisters Oyster Co. Logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    quality={100}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-center">Three Sisters Oyster Co.</h3>
                  <p className="text-purple-300 text-sm">Premium Texas Oysters</p>
                </div>
              </div>
              <p className="text-purple-200 text-sm">
                Committed to the long-term viability of off-bottom aquaculture and a thriving Texas coastline.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-center">Quick Links</h4>
              <ul className="space-y-2 text-purple-200">
                <li>
                  <Link href="#home" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#nursery" className="hover:text-white">
                    Nursery
                  </Link>
                </li>
                <li>
                  <Link href="#farm" className="hover:text-white">
                    Farm
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-center">Contact</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li>
                  <a href="tel:713-854-7427" className="hover:text-white transition-colors duration-200">
                    713-854-7427
                  </a>
                </li>
                <li>
                  <a href="mailto:info@threesistersoyster.com" className="hover:text-white transition-colors duration-200">
                    info@threesistersoyster.com
                  </a>
                </li>
                <li>
                  <a href="https://maps.google.com/?q=106+Grant+St.+Port+Lavaca,+TX+77979" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                    106 Grant St. Port Lavaca, TX 77979
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-800 mt-8 pt-8 text-center text-purple-300 text-sm">
            <p>&copy; 2024 Three Sisters Oyster Co. All rights reserved.</p>
            <p className="mt-2">App developed by Cael Findley for Three Sisters Oyster Co.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
