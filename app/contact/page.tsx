import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, Phone, Mail, MapPin, ArrowLeft, Users, Briefcase, Heart, Leaf } from "lucide-react"
import { CartButton } from "@/components/cart-button"
import Image from "next/image"
import ContactForm from "@/components/ContactForm"
import EmploymentForm from "@/components/EmploymentForm"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Header */}
      <header className="bg-purpleBrand border-b border-purple-300/30 sticky top-0 z-50">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="Three Sisters Oyster Co. Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-mintBrand">
                  Three Sisters Oyster Co.
                </h1>
                <p className="text-xs text-seafoamBrand">Premium Texas Oysters</p>
              </div>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  Home
                </Link>
                <Link href="/products" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  Products
                </Link>
                <Link href="/inventory" className="text-mintBrand hover:text-seafoamBrand font-medium text-sm">
                  Inventory
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
                  <Link href="/products" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-3 flex-1 text-center">
                    Shop
                  </Link>
                  <Link href="/inventory" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-3 flex-1 text-center">
                    Stock
                  </Link>
                  <Link href="/about" className="text-mintBrand hover:text-seafoamBrand font-medium text-xs py-3 flex-1 text-center">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">


        <div className="text-center mb-12">
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

          <ContactForm />
        </div>

        {/* Employment Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-teal-100 text-purple-800 hover:from-purple-200 hover:to-teal-200">
              <Users className="w-4 h-4 mr-2" />
              Join Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Employment Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Join our growing team and be part of sustainable aquaculture in the beautiful Texas Gulf Coast
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Why Work With Us */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-teal-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900">Why Work With Us</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Family-owned business with a supportive work environment</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Work outdoors in beautiful coastal Texas</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Learn sustainable aquaculture practices</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Contribute to environmental conservation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Current Positions */}
            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-teal-900">Current Positions</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-white rounded-lg border border-teal-200">
                    <h4 className="font-semibold text-teal-800 mb-1">Farm Hand</h4>
                    <p className="text-sm text-gray-600">Full-time position working on oyster farm operations</p>
                    <Badge className="mt-2 bg-teal-100 text-teal-800">Full-time</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Requirements</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Comfortable working outdoors in all weather</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Capable of lifting heavy objects</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Reliable transportation to Port Lavaca</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Passion for environmental conservation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <EmploymentForm />
        </div>
      </div>
    </div>
  )
} 