import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Waves, Fish, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CartButton } from "@/components/cart-button"
import dynamic from "next/dynamic";
import TeamScroller from "@/components/TeamScroller";

const ClientInventoryCounters = dynamic(() => import("@/components/ClientInventoryCounters"));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Header */}
      <header className="bg-gradient-to-r from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand border-b border-purple-300/30 sticky top-0 z-50">
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
              <div>
                <h1 className="text-sm md:text-xl font-bold text-[#3a2a4d]">
                  <span className="md:hidden">Three Sisters</span>
                  <span className="hidden md:inline">Three Sisters Oyster Co.</span>
                </h1>
                <p className="text-xs text-[#3a2a4d] hidden sm:block">Premium Texas Oysters</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="#home" className="text-[#3a2a4d] hover:text-teal-300 font-medium text-sm transition-colors">
                  Home
                </Link>
                <Link href="/products" className="text-[#3a2a4d] hover:text-teal-300 font-medium text-sm transition-colors">
                  Products
                </Link>
                <Link
                  href="/inventory"
                  className="text-[#3a2a4d] hover:text-teal-300 font-medium text-sm transition-colors"
                >
                  Inventory
                </Link>
                <Link href="/about" className="text-[#3a2a4d] hover:text-teal-300 font-medium text-sm transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-[#3a2a4d] hover:text-teal-300 font-medium text-sm transition-colors">
                  Contact
                </Link>
              </nav>
              
              {/* Mobile Navigation - Compact */}
              <nav className="flex md:hidden space-x-2">
                <Link href="/products" className="text-[#3a2a4d] hover:text-teal-300 font-medium text-xs px-2 py-1 transition-colors">
                  Shop
                </Link>
                <Link href="/inventory" className="text-[#3a2a4d] hover:text-teal-300 font-medium text-xs px-2 py-1 transition-colors">
                  Stock
                </Link>
                <Link href="/about" className="text-[#3a2a4d] hover:text-teal-300 font-medium text-xs px-2 py-1 transition-colors">
                  About
                </Link>
              </nav>
              
              <div className="flex items-center space-x-1 md:space-x-2">
                <CartButton />
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-xs md:text-sm px-2 md:px-4 min-h-[36px] md:min-h-[44px]"
                >
                  <Link href="/order">Order</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Video - Optimized for Performance */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
          style={{ objectPosition: 'center' }}
        >
          <source src="/homepage.mp4" type="video/mp4" />
        </video>
        {/* Removed overlay for better video visibility */}
        <div className="container mx-auto text-center max-w-7xl relative z-20">
          <Badge className="mb-3 md:mb-5 bg-gradient-to-r from-purple-400/20 to-teal-400/20 text-[#3a2a4d] border border-purple-300/30 hover:from-purple-400/30 hover:to-teal-400/30 text-sm md:text-base backdrop-blur-sm">Family Owned, Ocean Grown</Badge>
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#3a2a4d] mb-4 md:mb-6 leading-[1.4] px-2 pb-4">
            Three Sisters
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300 pb-2">
              Oyster Co.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#3a2a4d] mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Committed to the long-term viability of off-bottom aquaculture and a thriving Texas coastline. Growing the
            finest oysters in the pristine waters of Keller Bay.
          </p>

          {/* Inventory Counters */}
          <div className="max-w-4xl mx-auto">
            <ClientInventoryCounters />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 min-h-[48px] text-base text-[#3a2a4d] shadow-lg"
            >
              <Link href="/products">Shop Fresh Oysters</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white min-h-[48px] text-base shadow-lg"
            >
              <Link href="/about">Learn Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/20 via-blue-800/20 to-teal-800/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3a2a4d] mb-3 md:mb-4 px-2">Our Operations</h2>
            <p className="text-base sm:text-lg md:text-xl text-[#3a2a4d] max-w-2xl mx-auto leading-relaxed px-4">
              From nursery to market, we provide premium oyster solutions for growers and consumers alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Nursery Card */}
            <Card id="nursery" className="border-teal-300/30 bg-gradient-to-br from-teal-900/40 to-blue-900/40 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center mr-3 md:mr-4">
                    <Leaf className="w-5 h-5 md:w-6 md:h-6 text-[#3a2a4d]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#3a2a4d]">Oyster Nursery</h3>
                </div>
                <p className="text-sm md:text-base text-[#3a2a4d] mb-4 md:mb-6 leading-relaxed">
                  Three Sisters Nursery offers customers hardy oyster seed to meet
                  growers' needs with superior quality and reliability.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-[#3a2a4d] mb-4 md:mb-6">
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
                <p className="text-xs md:text-sm text-[#3a2a4d]">
                  For pricing and ordering information, please call{" "}
                  <span className="font-semibold text-teal-300">713-854-7427</span>
                </p>
              </CardContent>
            </Card>

            {/* Farm Card */}
            <Card id="farm" className="border-purple-300/30 bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mr-3 md:mr-4">
                    <Fish className="w-5 h-5 md:w-6 md:h-6 text-[#3a2a4d]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#3a2a4d]">Oyster Farm</h3>
                </div>
                <p className="text-sm md:text-base text-[#3a2a4d] mb-4 md:mb-6 leading-relaxed">
                  We grow oysters to market size for the premium half-shell market while providing essential habitat for
                  fish and other sea life in our sustainable farming operations.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-[#3a2a4d]">
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
      <section id="about" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-teal-400/20 to-blue-400/20 text-[#3a2a4d] border border-teal-300/30 hover:from-teal-400/30 hover:to-blue-400/30 text-sm md:text-base backdrop-blur-sm">Our Story</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3a2a4d] mb-4 md:mb-6 leading-tight px-2">Named After Blake's Three Daughters</h2>
              <p className="text-sm md:text-base text-[#3a2a4d] mb-4 md:mb-6 leading-relaxed px-2">
                Three Sisters Oyster Co. is a family-owned oyster farm on the coast of Texas. Named after Blake's three
                daughters, our team strives to create a better coastline for the future.
              </p>
              <p className="text-sm md:text-base text-[#3a2a4d] mb-4 md:mb-6 leading-relaxed px-2">
                Blake grew up outdoors, learning to dive in the Thousand Islands in Indonesia and stayed active in wildlife and
                FFA during his youth. His love of the outdoors led him to oyster farming as a family and lifestyle
                choice.
              </p>
              <p className="text-sm md:text-base text-[#3a2a4d] mb-6 md:mb-8 leading-relaxed px-2">
                With a Range and Wildlife Management degree from Texas A&M Kingsville and eight years in Environmental
                Consulting, Blake discovered the pristine waters of Keller Bay - an excellent location for growing
                premium oysters while improving water quality and sequestering nitrogen and carbon.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-800/40 to-teal-800/40 rounded-2xl flex items-center justify-center border border-purple-300/30">
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
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900/40 via-blue-800/40 to-teal-800/40">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#3a2a4d] mb-6">Environmental Stewardship</h2>
          <p className="text-xl text-[#3a2a4d] mb-12 max-w-3xl mx-auto">
            We take pride in creating the best oysters while helping the environment, improving water quality and
            sequestering nitrogen and carbon.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-[#3a2a4d]" />
              </div>
              <h3 className="text-xl font-bold text-[#3a2a4d] mb-2">Water Quality</h3>
              <p className="text-[#3a2a4d]">Improving coastal water quality through natural filtration</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-[#3a2a4d]" />
              </div>
              <h3 className="text-xl font-bold text-[#3a2a4d] mb-2">Carbon Sequestration</h3>
              <p className="text-[#3a2a4d]">Capturing and storing carbon to combat climate change</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fish className="w-8 h-8 text-[#3a2a4d]" />
              </div>
              <h3 className="text-xl font-bold text-[#3a2a4d] mb-2">Marine Habitat</h3>
              <p className="text-[#3a2a4d]">Creating habitat for fish and marine life</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#3a2a4d] mb-4">Get In Touch</h2>
            <p className="text-xl text-[#3a2a4d]">Ready to order premium oysters or learn more about our operations?</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#3a2a4d] mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="tel:713-854-7427"
                  className="flex items-center text-[#3a2a4d] hover:text-purple-600 transition-colors duration-200 group"
                >
                  <Phone className="w-5 h-5 text-teal-600 mr-3 group-hover:text-purple-600 transition-colors duration-200" />
                  <span className="group-hover:underline">713-854-7427</span>
                </a>
                <a
                  href="mailto:info@threesistersoyster.com"
                  className="flex items-center text-[#3a2a4d] hover:text-purple-600 transition-colors duration-200 group"
                >
                  <Mail className="w-5 h-5 text-teal-600 mr-3 group-hover:text-purple-600 transition-colors duration-200" />
                  <span className="group-hover:underline">info@threesistersoyster.com</span>
                </a>
                <a
                  href="https://maps.google.com/?q=106+Grant+St.+Port+Lavaca,+TX+77979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#3a2a4d] hover:text-purple-600 transition-colors duration-200 group"
                >
                  <MapPin className="w-5 h-5 text-teal-600 mr-3 group-hover:text-purple-600 transition-colors duration-200" />
                  <span className="group-hover:underline">106 Grant St. Port Lavaca, TX 77979</span>
                </a>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-[#3a2a4d] mb-4">Follow Us</h4>
                <a
                  href="https://instagram.com/threesistersoysterco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3a2a4d] hover:text-purple-600 transition-colors duration-200 hover:underline"
                >
                  @threesistersoysterco
                </a>
              </div>
            </div>

            <Card className="border-purple-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#3a2a4d] mb-6">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#3a2a4d] mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#3a2a4d] mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#3a2a4d] mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
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
                  <h3 className="text-lg font-bold">Three Sisters Oyster Co.</h3>
                  <p className="text-purple-300 text-sm">Premium Texas Oysters</p>
                </div>
              </div>
              <p className="text-purple-200 text-sm">
                Committed to the long-term viability of off-bottom aquaculture and a thriving Texas coastline.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
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
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li>713-854-7427</li>
                <li>info@threesistersoyster.com</li>
                <li>106 Grant St. Port Lavaca, TX 77979</li>
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
