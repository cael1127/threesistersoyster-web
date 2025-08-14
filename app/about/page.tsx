"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, Fish, Leaf, Phone, Mail, MapPin, ArrowLeft, Heart, Users, Globe, Award } from "lucide-react"
import { CartButton } from "@/components/cart-button"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Header */}
      <header className="bg-purpleBrand border-b border-purpleBrand/30 sticky top-0 z-50">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
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
                <p className="text-xs text-mintBrand">Premium Texas Oysters</p>
              </div>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-white hover:text-mintBrand font-medium text-sm">Home</Link>
                <Link href="/products" className="text-white hover:text-mintBrand font-medium text-sm">Products</Link>
                <Link href="/inventory" className="text-white hover:text-mintBrand font-medium text-sm">Inventory</Link>
                <Link href="/gallery" className="text-white hover:text-mintBrand font-medium text-sm">Gallery</Link>
                <Link href="/about" className="text-white hover:text-mintBrand font-medium text-sm">About</Link>
                <Link href="/contact" className="text-white hover:text-mintBrand font-medium text-sm">Contact</Link>
              </nav>
              {/* Mobile Layout - Restructured for better spacing */}
              <div className="flex md:hidden items-center w-full">
                {/* Mobile Navigation - Compact */}
                <nav className="flex items-center flex-1 px-4">
                  <Link href="/products" className="text-white hover:text-mintBrand font-medium text-xs py-3 flex-1 text-center">Shop</Link>
                  <Link href="/inventory" className="text-white hover:text-mintBrand font-medium text-xs py-3 flex-1 text-center">Stock</Link>
                  <Link href="/gallery" className="text-white hover:text-mintBrand font-medium text-xs py-3 flex-1 text-center">Gallery</Link>
                  <Link href="/about" className="text-white hover:text-mintBrand font-medium text-xs py-3 flex-1 text-center">About</Link>
                  <Link href="/contact" className="text-white hover:text-mintBrand font-medium text-xs py-3 flex-1 text-center">Contact</Link>
                </nav>
                
                {/* Mobile Cart/Order Buttons */}
                <div className="flex items-center space-x-1 px-2">
                  <CartButton />
                  <Button asChild size="sm" className="bg-mintBrand hover:bg-seafoamBrand text-white text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0">
                    <Link href="/order">Order</Link>
                  </Button>
                </div>
              </div>
              
              {/* Desktop Cart/Order Buttons */}
              <div className="hidden md:flex items-center space-x-1">
                <CartButton />
                <Button asChild size="sm" className="bg-mintBrand hover:bg-seafoamBrand text-white text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0">
                  <Link href="/order">Order</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">


        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 px-2 text-center">About Three Sisters Oyster Co.</h1>
          <p className="text-xl text-white max-w-3xl mx-auto px-4">
            A family-owned oyster farm committed to sustainable aquaculture and environmental stewardship in the pristine waters of Keller Bay.
          </p>
        </div>

        {/* Our Story Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Named After Blake's Three Daughters</h2>
              <div className="space-y-4 text-white">
                <p>
                  Three Sisters Oyster Co. is a family-owned oyster farm on the coast of Texas. Named after Blake's three
                  daughters, our team strives to create a better coastline for the future.
                </p>
                <p>
                Blake grew up outdoors, learning to dive in the Thousand Islands in Indonesia and stayed active in wildlife and
                FFA during his youth. His love of the outdoors led him to oyster farming as a family and lifestyle
                choice.
                </p>
                <p>
                With a Range and Wildlife Management degree from Texas A&M Kingsville and eight years in Environmental
                Consulting, Blake discovered the pristine waters of Keller Bay - an excellent location for growing
                premium oysters while improving water quality and sequestering nitrogen and carbon.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purpleBrand/40 to-seafoamBrand/40 rounded-2xl flex items-center justify-center border border-purpleBrand/30">
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
        </section>

        {/* Mission & Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Our Mission & Values</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              We're committed to sustainable aquaculture practices that benefit both our business and the environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/40 to-blueBrand/40 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purpleBrand to-lavenderBrand rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Environmental Stewardship</h3>
                <p className="text-white/80">
                  We prioritize sustainable practices that protect and enhance the coastal ecosystem.
                </p>
              </CardContent>
            </Card>

            <Card className="border-seafoamBrand/30 bg-gradient-to-b from-seafoamBrand/40 to-blueBrand/40 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-seafoamBrand to-blueBrand rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Community Impact</h3>
                <p className="text-white/80">
                  Supporting local economies and providing opportunities for coastal communities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purpleBrand/30 bg-gradient-to-b from-purpleBrand/40 to-seafoamBrand/40 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purpleBrand to-seafoamBrand rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Quality Excellence</h3>
                <p className="text-white/80">
                  Maintaining the highest standards in oyster production and customer service.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Environmental Impact Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purpleBrand/40 to-seafoamBrand/40 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 text-center">Environmental Impact</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Our oyster farming operations provide significant environmental benefits beyond just producing delicious seafood.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purpleBrand to-lavenderBrand rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">Water Filtration</h3>
                <p className="text-white/80">
                  Each oyster filters up to 50 gallons of water per day, improving water clarity and quality.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-seafoamBrand to-blueBrand rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">Carbon Sequestration</h3>
                <p className="text-white/80">
                  Oyster shells and tissue store carbon, helping mitigate climate change impacts.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purpleBrand to-seafoamBrand rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fish className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">Habitat Creation</h3>
                <p className="text-white/80">
                  Our oyster reefs provide essential habitat for fish, crabs, and other marine life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Operations Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Our Operations</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              From nursery to market, we maintain the highest standards in every aspect of our operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
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
                  <h3 className="text-xl md:text-2xl font-bold text-white text-center">Oyster Nursery</h3>
                </div>
                <p className="text-sm md:text-base text-white mb-4 md:mb-6 leading-relaxed">
                  Our nursery produces hardy Eastern oyster seed with superior survival rates and growth characteristics.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-white mb-4 md:mb-6">
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
                <p className="text-xs md:text-sm text-white">
                  For pricing and ordering information, please call{" "}
                  <a href="tel:713-854-7427" className="font-semibold text-seafoamBrand hover:text-mintBrand transition-colors duration-200">
                    713-854-7427
                  </a>
                </p>
              </CardContent>
            </Card>

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
                  <h3 className="text-xl md:text-2xl font-bold text-white text-center">Oyster Farm</h3>
                </div>
                <p className="text-sm md:text-base text-white mb-4 md:mb-6 leading-relaxed">
                  We grow oysters to market size for the premium half-shell market while providing essential habitat for
                  fish and other sea life in our sustainable farming operations.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-white">
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
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="border-purpleBrand/30 bg-gradient-to-r from-purpleBrand/40 to-seafoamBrand/40">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Ready to Experience Premium Oysters?</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Whether you're a restaurant looking for consistent quality or an individual wanting the freshest oysters,
                we're here to help you discover the taste of the Texas Gulf Coast.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-lavenderBrand hover:to-blueBrand">
                  <Link href="/products">Shop Our Products</Link>
                </Button>
                <Button asChild variant="outline" className="border-mintBrand text-mintBrand hover:bg-mintBrand/20 bg-transparent">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
} 