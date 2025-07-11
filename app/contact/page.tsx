import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, Phone, Mail, MapPin, ArrowLeft } from "lucide-react"
import { CartButton } from "@/components/cart-button"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Header */}
      <header className="bg-gradient-to-r from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand border-b border-purple-300/30 sticky top-0 z-50">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-teal-600 rounded-full flex items-center justify-center">
                <Waves className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-sm md:text-xl font-bold text-purple-900">
                  <span className="md:hidden">Three Sisters</span>
                  <span className="hidden md:inline">Three Sisters Oyster Co.</span>
                </h1>
                <p className="text-xs text-teal-600 hidden sm:block">Premium Texas Oysters</p>
              </div>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  Home
                </Link>
                <Link href="/products" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  Products
                </Link>
                <Link href="/inventory" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  Inventory
                </Link>
                <Link href="/about" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
                  About
                </Link>
                <Link href="/contact" className="text-teal-600 font-medium text-sm">
                  Contact
                </Link>
              </nav>
              {/* Mobile Navigation - Compact */}
              <nav className="flex md:hidden space-x-2">
                <Link href="/" className="text-purple-700 hover:text-teal-600 font-medium text-xs px-2 py-1">
                  Home
                </Link>
                <Link href="/products" className="text-purple-700 hover:text-teal-600 font-medium text-xs px-2 py-1">
                  Shop
                </Link>
                <Link href="/inventory" className="text-purple-700 hover:text-teal-600 font-medium text-xs px-2 py-1">
                  Stock
                </Link>
                <Link href="/about" className="text-purple-700 hover:text-teal-600 font-medium text-xs px-2 py-1">
                  About
                </Link>
                <Link href="/contact" className="text-teal-600 font-medium text-xs px-2 py-1">
                  Contact
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="outline" className="flex items-center space-x-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-200">Contact Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 px-2">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Ready to order premium oysters or learn more about our operations? Reach out to us below.
          </p>
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
    </div>
  )
} 