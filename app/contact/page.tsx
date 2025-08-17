import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, Phone, Mail, MapPin, ArrowLeft, Users, Briefcase, Heart, Leaf } from "lucide-react"
import { CartButton } from "@/components/cart-button"
import Image from "next/image"
import ContactForm from "@/components/ContactForm"
import EmploymentForm from "@/components/EmploymentForm"
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection"
import { FloatingParticles } from "@/components/ui/floating-particles"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <FloatingParticles particleCount={12} interactive={true} />
      {/* Header */}
      <header className="bg-purpleBrand border-b border-purpleBrand/30 sticky top-0 z-50">
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
                <h1 className="text-xl font-bold text-white text-center">
                  Three Sisters Oyster Co.
                </h1>
                <p className="text-xs text-white">Premium Texas Oysters</p>
              </div>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-white hover:text-white font-medium text-sm">
                  Home
                </Link>
                <Link href="/products" className="text-white hover:text-white font-medium text-sm">
                  Products
                </Link>
                <Link href="/inventory" className="text-white hover:text-white font-medium text-sm">
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
                  <Link href="/products" className="text-white hover:text-white font-medium text-xs py-3 flex-1 text-center">
                    Shop
                  </Link>
                  <Link href="/inventory" className="text-white hover:text-white font-medium text-xs py-3 flex-1 text-center">
                    Stock
                  </Link>
                  <Link href="/gallery" className="text-white hover:text-white font-medium text-xs py-3 flex-1 text-center">
                    Gallery
                  </Link>
                  <Link href="/about" className="text-white hover:text-white font-medium text-xs py-3 flex-1 text-center">
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


        <ScrollAnimatedSection animationType="fade-in" delay={200}>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 px-2 text-center">Get In Touch</h1>
            <p className="text-xl text-purple-800 max-w-2xl mx-auto px-4">
              Ready to order premium oysters or learn more about our operations? Reach out to us below.
            </p>
          </div>
        </ScrollAnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollAnimatedSection animationType="slide-left" delay={400}>
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
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animationType="slide-right" delay={600}>
            <ContactForm />
          </ScrollAnimatedSection>
        </div>

        {/* Employment Section */}
        <div className="mt-20">
          <ScrollAnimatedSection animationType="fade-in" delay={200}>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-white/20 text-white border border-white/30 hover:bg-white/30">
                <Users className="w-4 h-4 mr-2" />
                Join Our Team
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6 text-center">Employment Opportunities</h2>
              <p className="text-xl text-purple-800 max-w-3xl mx-auto px-4">
                Join our growing team and be part of sustainable aquaculture in the beautiful Texas Gulf Coast
              </p>
            </div>
          </ScrollAnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Why Work With Us */}
            <ScrollAnimatedSection animationType="slide-left" delay={400}>
              <Card className="border-purple-200 bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-mintBrand rounded-full flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-900 text-center">Why Work With Us</h3>
                  </div>
                  <ul className="space-y-3 text-purple-800">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-mintBrand rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Family-owned business with a supportive work environment</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-mintBrand rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Work outdoors in beautiful coastal Texas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-mintBrand rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Learn sustainable aquaculture practices</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-mintBrand rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Contribute to environmental conservation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>

            {/* Current Positions */}
            <ScrollAnimatedSection animationType="fade-in" delay={600}>
              <Card className="border-purple-200 bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-seafoamBrand rounded-full flex items-center justify-center mr-4">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-900 text-center">Current Positions</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 bg-seafoamBrand/10 rounded-lg border border-seafoamBrand/30">
                      <h4 className="font-semibold text-purple-900 mb-1 text-center">Farm Hand</h4>
                      <p className="text-sm text-purple-800">Full-time position working on oyster farm operations</p>
                      <Badge className="mt-2 bg-white/20 text-white border border-white/30">Full-time</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>

            {/* Requirements */}
            <ScrollAnimatedSection animationType="slide-right" delay={800}>
              <Card className="border-purple-200 bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blueBrand rounded-full flex items-center justify-center mr-4">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-900 text-center">Requirements</h3>
                  </div>
                  <ul className="space-y-3 text-purple-800">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Comfortable working outdoors in all weather</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Capable of lifting heavy objects</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Reliable transportation to Port Lavaca</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blueBrand rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Passion for environmental conservation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>
          </div>

          {/* Application Form */}
          <ScrollAnimatedSection animationType="scale-in" delay={1000}>
            <EmploymentForm />
          </ScrollAnimatedSection>
        </div>
      </div>
    </div>
  )
} 