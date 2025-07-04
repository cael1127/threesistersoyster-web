import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, Fish, Leaf, Phone, Mail, MapPin, ArrowLeft, Heart, Users, Globe, Award } from "lucide-react"
import { CartButton } from "@/components/cart-button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
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
                <Link href="/about" className="text-teal-600 font-medium text-sm">
                  About
                </Link>
                <Link href="/contact" className="text-purple-700 hover:text-teal-600 font-medium text-sm">
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
                <Link href="/about" className="text-teal-600 font-medium text-xs px-2 py-1">
                  About
                </Link>
                <Link href="/contact" className="text-purple-700 hover:text-teal-600 font-medium text-xs px-2 py-1">
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

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="outline" className="flex items-center space-x-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">Our Story</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">About Three Sisters Oyster Co.</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A family-owned oyster farm committed to sustainable aquaculture and environmental stewardship in the pristine waters of Keller Bay.
          </p>
        </div>

        {/* Our Story Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-purple-900 mb-6">Named After Blake's Three Daughters</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Three Sisters Oyster Co is a family-owned oyster farm on the coast of Texas. Named after Blake's three
                  daughters, our team strives to create a better coastline for the future.
                </p>
                <p>
                  Blake grew up outdoors, learning to dive in Thousand Island Indonesia and staying active in wildlife and
                  FFA during his youth. His love of the outdoors led him to oyster farming as a family and lifestyle
                  choice.
                </p>
                <p>
                  With a Range and Wildlife Management degree from Texas A&M Kingsville and 8 years in Environmental
                  Consulting, Blake discovered the pristine waters of Keller Bay - an excellent location for growing
                  premium oysters while improving water quality and sequestering nitrogen and carbon.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-200 to-teal-200 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <Heart className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-purple-900 mb-2">Family First</h3>
                  <p className="text-gray-600">Every oyster we grow represents our commitment to family, community, and the environment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to sustainable aquaculture practices that benefit both our community and the environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">Environmental Stewardship</h3>
                <p className="text-gray-600">
                  We believe in protecting and improving our coastal waters through sustainable aquaculture practices that enhance marine ecosystems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">Community Impact</h3>
                <p className="text-gray-600">
                  Supporting local economies and providing premium seafood while creating jobs and opportunities in coastal communities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">Quality Excellence</h3>
                <p className="text-gray-600">
                  Delivering the highest quality oysters through careful cultivation, rigorous standards, and attention to every detail.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Environmental Impact */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-100 to-teal-100 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-purple-900 mb-4">Environmental Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our oyster farming operations provide significant environmental benefits beyond just producing delicious seafood.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Water Filtration</h3>
                <p className="text-gray-600">
                  Each oyster filters up to 50 gallons of water per day, removing pollutants and improving water clarity.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Carbon Sequestration</h3>
                <p className="text-gray-600">
                  Oyster shells and tissue naturally capture and store carbon, helping combat climate change.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fish className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Habitat Creation</h3>
                <p className="text-gray-600">
                  Our oyster reefs provide essential habitat for fish, crabs, and other marine life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Operations */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Our Operations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From nursery to market, we provide comprehensive oyster solutions for growers and consumers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-teal-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mr-4">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900">Nursery Operations</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our nursery provides hardy Eastern oyster (Crassostrea virginica) seed to meet growers' needs with superior quality and reliability.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    Hardy Eastern oyster seed
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    Reliable supply for growers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    Expert cultivation support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mr-4">
                    <Fish className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900">Farm Operations</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We grow oysters to market size for the premium half-shell market while providing essential habitat for fish and other sea life.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Premium half-shell market oysters
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Sustainable aquaculture practices
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Marine habitat restoration
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="border-purple-200 bg-gradient-to-r from-purple-100 to-teal-100">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">Ready to Learn More?</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Whether you're interested in our products, want to visit our operations, or have questions about sustainable aquaculture, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
                  <Link href="/products">Browse Our Products</Link>
                </Button>
                <Button asChild variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent">
                  <a href="tel:713-854-7427">Call 713-854-7427</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
} 