import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight, Cloud, Thermometer, Waves, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'Oyster Farming Challenges: Weather, Water, and Solutions | Three Sisters Oyster Blog',
  description: 'Learn about the challenges faced in sustainable oyster farming, from weather conditions to water quality, and how we overcome them at Three Sisters Oyster.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-farming-challenges' },
  openGraph: {
    title: 'Oyster Farming Challenges: Weather, Water, and Solutions | Three Sisters Oyster Blog',
    description: 'Learn about the challenges faced in sustainable oyster farming, from weather conditions to water quality, and how we overcome them at Three Sisters Oyster.',
    url: '/blog/oyster-farming-challenges',
    type: 'article',
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'Oyster Farming Challenges - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Farming Challenges: Weather, Water, and Solutions | Three Sisters Oyster Blog',
    description: 'Learn about the challenges faced in sustainable oyster farming, from weather conditions to water quality, and how we overcome them at Three Sisters Oyster.',
    images: ['/placeholder.jpg'],
  },
}

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <SeasonalFloatingParticles count={8} />
      
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purpleBrand/30">
            <div className="mb-8">
              <Badge className="bg-purpleBrand/90 text-white mb-4">Farming</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                November 28, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oyster Farming Challenges: Weather, Water, and Solutions
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Learn about the challenges faced in sustainable oyster farming, from weather conditions 
                to water quality, and how we overcome them at Three Sisters Oyster.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/placeholder.jpg"
                alt="Oyster Farming Challenges - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Oyster farming is not for the faint of heart. While the rewards are incredible – 
                producing some of the most delicious and nutritious seafood on the planet – the 
                challenges are real and constant. At Three Sisters Oyster, we've learned to adapt 
                and overcome these obstacles while maintaining our commitment to sustainable practices.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Weather and Climate Challenges</h2>
              <p className="mb-6">
                The Texas Gulf Coast presents unique weather challenges that can significantly impact 
                our oyster farming operations. From hurricanes to extreme temperatures, we must be 
                prepared for anything Mother Nature throws our way.
              </p>

              <div className="space-y-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Cloud className="w-8 h-8 text-blue-600 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Hurricanes and Storms</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      The Gulf Coast is no stranger to hurricanes and tropical storms, which can 
                      cause significant damage to our farming infrastructure and oyster beds.
                    </p>
                    <div className="bg-blue-100 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Our Solutions:</h4>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Storm-resistant farming equipment and structures</li>
                        <li>• Early warning systems and evacuation protocols</li>
                        <li>• Diversified farming locations to reduce risk</li>
                        <li>• Insurance coverage for storm damage</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-orange-50 to-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Thermometer className="w-8 h-8 text-orange-600 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Temperature Extremes</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      Both extreme heat and cold can stress oysters and affect their growth and survival. 
                      Texas summers can be brutal, while occasional freezes can be devastating.
                    </p>
                    <div className="bg-orange-100 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 mb-2">Our Solutions:</h4>
                      <ul className="text-orange-800 text-sm space-y-1">
                        <li>• Water depth management for temperature regulation</li>
                        <li>• Shade structures during extreme heat</li>
                        <li>• Monitoring systems for early warning</li>
                        <li>• Seasonal farming adjustments</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Water Quality Challenges</h2>
              <p className="mb-6">
                Water quality is perhaps the most critical factor in oyster farming success. 
                Oysters are filter feeders, so the quality of the water directly impacts their 
                health, growth, and safety for human consumption.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-red-50 to-pink-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Red Tide and Algal Blooms</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      Harmful algal blooms can produce toxins that make oysters unsafe to eat, 
                      forcing temporary closures of our farming areas.
                    </p>
                    <div className="bg-red-100 rounded-lg p-3">
                      <h4 className="font-semibold text-red-900 mb-1 text-sm">Impact:</h4>
                      <p className="text-red-800 text-xs">Can shut down operations for weeks or months</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Freshwater Influx</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      Heavy rains can bring large amounts of fresh water into the bay, 
                      affecting salinity levels that oysters need to survive.
                    </p>
                    <div className="bg-yellow-100 rounded-lg p-3">
                      <h4 className="font-semibold text-yellow-900 mb-1 text-sm">Impact:</h4>
                      <p className="text-yellow-800 text-xs">Can stress or kill oysters if salinity drops too low</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-gray-50 to-slate-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Pollution and Runoff</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      Agricultural runoff, urban pollution, and other contaminants can 
                      affect water quality and oyster health.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Impact:</h4>
                      <p className="text-gray-800 text-xs">Can contaminate oysters and require closures</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Sediment and Turbidity</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      High sediment levels can clog oyster gills and reduce their ability 
                      to filter feed effectively.
                    </p>
                    <div className="bg-blue-100 rounded-lg p-3">
                      <h4 className="font-semibold text-blue-900 mb-1 text-sm">Impact:</h4>
                      <p className="text-blue-800 text-xs">Reduces growth rates and oyster health</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Biological Challenges</h2>
              
              <div className="space-y-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Waves className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Predators and Pests</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      Oysters face numerous natural predators, from crabs and fish to birds and 
                      other marine life. Managing these threats while maintaining ecological balance 
                      is a constant challenge.
                    </p>
                    <div className="bg-purple-100 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Common Predators:</h4>
                      <ul className="text-purple-800 text-sm space-y-1">
                        <li>• Blue crabs and stone crabs</li>
                        <li>• Oyster drills and whelks</li>
                        <li>• Fish species like sheepshead and black drum</li>
                        <li>• Birds like oystercatchers and gulls</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Disease and Parasites</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      Oysters can be affected by various diseases and parasites that can impact 
                      their health, growth, and survival. Early detection and management are crucial.
                    </p>
                    <div className="bg-green-100 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Our Prevention Methods:</h4>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• Regular health monitoring and testing</li>
                        <li>• Quarantine protocols for new stock</li>
                        <li>• Water quality management</li>
                        <li>• Collaboration with marine biologists</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Economic and Market Challenges</h2>
              <p className="mb-6">
                Beyond the natural challenges, oyster farming also faces economic pressures 
                and market fluctuations that can impact our business sustainability.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-yellow-50 to-amber-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Market Price Volatility</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      Oyster prices can fluctuate significantly based on supply, demand, 
                      and market conditions, affecting our profitability.
                    </p>
                    <div className="bg-yellow-100 rounded-lg p-3">
                      <h4 className="font-semibold text-yellow-900 mb-1 text-sm">Our Strategy:</h4>
                      <p className="text-yellow-800 text-xs">Diversified customer base and direct-to-consumer sales</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-indigo-50 to-purple-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Regulatory Compliance</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      Meeting health department regulations, environmental standards, 
                      and food safety requirements adds complexity and cost.
                    </p>
                    <div className="bg-indigo-100 rounded-lg p-3">
                      <h4 className="font-semibold text-indigo-900 mb-1 text-sm">Our Approach:</h4>
                      <p className="text-indigo-800 text-xs">Proactive compliance and quality management systems</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Our Solutions and Adaptations</h2>
              <p className="mb-6">
                Despite these challenges, we've developed strategies and solutions that allow us 
                to maintain consistent, high-quality oyster production while protecting the environment.
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Innovation and Technology</h3>
                <ul className="space-y-3 text-purple-700">
                  <li>• <strong>Real-time Monitoring:</strong> Advanced sensors track water quality, temperature, and salinity</li>
                  <li>• <strong>Predictive Analytics:</strong> Data analysis helps us anticipate and prepare for challenges</li>
                  <li>• <strong>Resilient Infrastructure:</strong> Storm-resistant equipment and flexible farming systems</li>
                  <li>• <strong>Quality Control:</strong> Comprehensive testing and monitoring protocols</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20 mt-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Community and Collaboration</h3>
                <ul className="space-y-3 text-purple-700">
                  <li>• <strong>Research Partnerships:</strong> Working with universities and marine scientists</li>
                  <li>• <strong>Industry Collaboration:</strong> Sharing knowledge and best practices with other farmers</li>
                  <li>• <strong>Community Engagement:</strong> Educating the public about sustainable aquaculture</li>
                  <li>• <strong>Regulatory Cooperation:</strong> Working with agencies to develop practical regulations</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20 mt-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Resilience Through Diversity</h3>
                <p className="mb-4">
                  We've learned that the key to overcoming challenges is building resilience through 
                  diversity – in our farming methods, customer base, and business practices. This 
                  approach has helped us weather storms, both literal and figurative.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/about">Learn About Our Farm</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/contact">Ask About Our Methods</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-nutrition-benefits">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Oyster Nutrition Benefits
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-storage-handling">
                Next: Oyster Storage & Handling
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
