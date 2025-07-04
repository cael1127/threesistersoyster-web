import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Waves, Fish, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CartButton } from "@/components/cart-button"
import {
  HarvestReadyInventoryCounter,
  FarmInventoryCounter,
  NurseryInventoryCounter,
} from "@/components/inventory-counters"
import TeamScroller from "@/components/TeamScroller"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-teal-600 rounded-full flex items-center justify-center">
                <Waves className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-sm md:text-xl font-bold text-purple-900">Three Sisters Oyster Co.</h1>
                <p className="text-xs text-teal-600 hidden sm:block">Premium Texas Oysters</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="#home" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  Home
                </Link>
                <Link href="/products" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  Products
                </Link>
                <Link
                  href="/inventory"
                  className="text-purple-700 hover:text-teal-600 font-medium text-sm"
                >
                  Inventory
                </Link>
                <Link href="#about" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  About
                </Link>
                <Link href="#contact" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  Contact
                </Link>
              </nav>
              
              {/* Mobile Navigation - Compact */}
              <nav className="flex md:hidden space-x-2">
                <Link href="/products" className="text-purple-700 hover:text-teal-600 font-medium text-xs px-2 py-1">
                  Shop
                </Link>
                <Link href="/inventory" className="text-purple-700 hover:text-teal-600 font-medium text-xs px-2 py-1">
                  Stock
                </Link>
                <Link href="#about" className="text-purple-700 hover:text-teal-600 font-medium text-xs px-2 py-1">
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
      <section id="home" className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 md:mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200 text-sm md:text-base">Family-Owned Since 2024</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-purple-900 mb-4 md:mb-6 leading-tight">
            Premium Texas
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
              Oysters
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            Committed to the long-term viability of off-bottom aquaculture and a thriving Texas coastline. Growing the
            finest oysters in the pristine waters of Keller Bay.
          </p>

          {/* Inventory Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 max-w-4xl mx-auto">
            {/* Harvest Ready Count */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-purple-100">
              <h3 className="text-base md:text-lg font-bold text-purple-900 mb-2">Harvest Ready</h3>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600 mb-1">
                <HarvestReadyInventoryCounter />
              </div>
              <p className="text-xs md:text-sm text-gray-600">Ready for harvest</p>
            </div>

            {/* Farm Count */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-purple-100">
              <h3 className="text-base md:text-lg font-bold text-purple-900 mb-2">Farm Oysters</h3>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-700 mb-1">
                <FarmInventoryCounter />
              </div>
              <p className="text-xs md:text-sm text-gray-600">Total farm stock</p>
            </div>

            {/* Nursery Count */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-teal-100 sm:col-span-2 md:col-span-1">
              <h3 className="text-base md:text-lg font-bold text-purple-900 mb-2">Nursery Seed</h3>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-700 mb-1">
                <NurseryInventoryCounter />
              </div>
              <p className="text-xs md:text-sm text-gray-600">Total seed stock</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 min-h-[48px] text-base"
            >
              <Link href="/products">Shop Fresh Oysters</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent min-h-[48px] text-base"
            >
              <Link href="#about">Learn Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-3 md:mb-4">Our Operations</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From nursery to market, we provide premium oyster solutions for growers and consumers alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Farm Card */}
            <Card id="farm" className="border-purple-200 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mr-3 md:mr-4">
                    <Fish className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-purple-900">Oyster Farm</h3>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                  We grow oysters to market size for the premium half-shell market while providing essential habitat for
                  fish and other sea life in our sustainable farming operations.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    Premium half-shell market oysters
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    Sustainable aquaculture practices
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    Marine habitat restoration
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Nursery Card */}
            <Card id="nursery" className="border-teal-200 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mr-3 md:mr-4">
                    <Leaf className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-purple-900">Oyster Nursery</h3>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                  Three Sisters Nursery offers customers hardy Eastern oyster (Crassostrea virginica) seed to meet
                  growers' needs with superior quality and reliability.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Hardy Eastern oyster seed
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Reliable supply for growers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Expert cultivation support
                  </li>
                </ul>
                <p className="text-xs md:text-sm text-gray-500">
                  For pricing and ordering information, please call{" "}
                  <span className="font-semibold text-teal-600">713-854-7427</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <Badge className="mb-4 md:mb-6 bg-teal-100 text-teal-800 hover:bg-teal-200 text-sm md:text-base">Our Story</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6 leading-tight">Named After Blake's Three Daughters</h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                Three Sisters Oyster Co is a family-owned oyster farm on the coast of Texas. Named after Blake's three
                daughters, our team strives to create a better coastline for the future.
              </p>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                Blake grew up outdoors, learning to dive in Thousand Island Indonesia and staying active in wildlife and
                FFA during his youth. His love of the outdoors led him to oyster farming as a family and lifestyle
                choice.
              </p>
              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed">
                With a Range and Wildlife Management degree from Texas A&M Kingsville and 8 years in Environmental
                Consulting, Blake discovered the pristine waters of Keller Bay - an excellent location for growing
                premium oysters while improving water quality and sequestering nitrogen and carbon.
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 min-h-[48px] text-base">
                Learn More About Our Mission
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-200 to-teal-200 rounded-2xl flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Blake and family at the oyster farm"
                  width={400}
                  height={400}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
          <TeamScroller />
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-100 to-teal-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-purple-900 mb-6">Environmental Stewardship</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            We take pride in creating the best oysters while helping the environment, improving water quality and
            sequestering nitrogen and carbon.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Water Quality</h3>
              <p className="text-gray-600">Improving coastal water quality through natural filtration</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Carbon Sequestration</h3>
              <p className="text-gray-600">Capturing and storing carbon to combat climate change</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fish className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Marine Habitat</h3>
              <p className="text-gray-600">Creating habitat for fish and marine life</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Ready to order premium oysters or learn more about our operations?</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-purple-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="tel:713-854-7427"
                  className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200 group"
                >
                  <Phone className="w-5 h-5 text-teal-600 mr-3 group-hover:text-purple-600 transition-colors duration-200" />
                  <span className="group-hover:underline">713-854-7427</span>
                </a>
                <a
                  href="mailto:info@threesistersoyster.com"
                  className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200 group"
                >
                  <Mail className="w-5 h-5 text-teal-600 mr-3 group-hover:text-purple-600 transition-colors duration-200" />
                  <span className="group-hover:underline">info@threesistersoyster.com</span>
                </a>
                <a
                  href="https://maps.google.com/?q=106+Grant+St.+Port+Lavaca,+TX+77979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200 group"
                >
                  <MapPin className="w-5 h-5 text-teal-600 mr-3 group-hover:text-purple-600 transition-colors duration-200" />
                  <span className="group-hover:underline">106 Grant St. Port Lavaca, TX 77979</span>
                </a>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-purple-900 mb-4">Follow Us</h4>
                <a
                  href="https://instagram.com/threesistersoysterco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 hover:underline"
                >
                  @threesistersoysterco
                </a>
              </div>
            </div>

            <Card className="border-purple-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-purple-900 mb-6">Send Us a Message</h3>
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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-teal-400 rounded-full flex items-center justify-center">
                  <Waves className="w-5 h-5 text-white" />
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
                  <Link href="#about" className="hover:text-white">
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
          </div>
        </div>
      </footer>
    </div>
  )
}
