import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight, MapPin, Users, Star, Music } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'Oyster Festival Guide: Texas Gulf Coast Events | Three Sisters Oyster Blog',
  description: 'Discover the best oyster festivals along the Texas Gulf Coast. Plan your visit to celebrate oysters, enjoy live music, and experience local culture.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-festival-guide' },
  openGraph: {
    title: 'Oyster Festival Guide: Texas Gulf Coast Events | Three Sisters Oyster Blog',
    description: 'Discover the best oyster festivals along the Texas Gulf Coast. Plan your visit to celebrate oysters, enjoy live music, and experience local culture.',
    url: '/blog/oyster-festival-guide',
    type: 'article',
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'Oyster Festival Guide - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Festival Guide: Texas Gulf Coast Events | Three Sisters Oyster Blog',
    description: 'Discover the best oyster festivals along the Texas Gulf Coast. Plan your visit to celebrate oysters, enjoy live music, and experience local culture.',
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Events</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                November 22, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oyster Festival Guide: Texas Gulf Coast Events
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Discover the best oyster festivals along the Texas Gulf Coast. Plan your visit to 
                celebrate oysters, enjoy live music, and experience local culture.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/placeholder.jpg"
                alt="Oyster Festival Guide - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                The Texas Gulf Coast is home to some of the most vibrant and exciting oyster festivals 
                in the country. These celebrations bring together oyster lovers, local communities, 
                and visitors from around the world to enjoy fresh seafood, live music, and the unique 
                culture of the Gulf Coast. Here's your complete guide to the best oyster festivals 
                in our region.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Major Texas Gulf Coast Oyster Festivals</h2>
              
              <div className="space-y-8 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <MapPin className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-2xl font-bold text-purple-900">Galveston Island Oyster Festival</h3>
                    </div>
                    <div className="flex items-center text-sm text-purple-600 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>March 15-17, 2025</span>
                      <span className="mx-2">•</span>
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Galveston, TX</span>
                    </div>
                    <p className="text-purple-700 mb-4">
                      One of the largest oyster festivals in Texas, featuring live music, cooking 
                      competitions, and thousands of fresh oysters from local farms.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Highlights:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Oyster shucking competitions</li>
                          <li>• Live music and entertainment</li>
                          <li>• Local craft beer and wine</li>
                          <li>• Family-friendly activities</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Admission:</h4>
                        <p className="text-purple-700 text-sm">$15-25 per person, children under 12 free</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Users className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-2xl font-bold text-purple-900">Port Lavaca Oyster Festival</h3>
                    </div>
                    <div className="flex items-center text-sm text-purple-600 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>October 12-13, 2025</span>
                      <span className="mx-2">•</span>
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Port Lavaca, TX</span>
                    </div>
                    <p className="text-purple-700 mb-4">
                      A local favorite celebrating the oyster industry in Port Lavaca, featuring 
                      our very own Three Sisters Oyster Co. and other local producers.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Highlights:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Farm tours and educational exhibits</li>
                          <li>• Fresh oyster tastings</li>
                          <li>• Local seafood vendors</li>
                          <li>• Arts and crafts booths</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Admission:</h4>
                        <p className="text-purple-700 text-sm">$10 per person, free for children</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-mintBrand/10 to-seafoamBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Music className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-2xl font-bold text-purple-900">Rockport Oyster Festival</h3>
                    </div>
                    <div className="flex items-center text-sm text-purple-600 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>April 5-6, 2025</span>
                      <span className="mx-2">•</span>
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Rockport, TX</span>
                    </div>
                    <p className="text-purple-700 mb-4">
                      A charming coastal festival combining fresh oysters with live music, 
                      local art, and the beautiful scenery of Rockport Harbor.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Highlights:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Harbor-side dining</li>
                          <li>• Live music performances</li>
                          <li>• Local art and crafts</li>
                          <li>• Boat tours and fishing</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Admission:</h4>
                        <p className="text-purple-700 text-sm">$12-18 per person</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">What to Expect at an Oyster Festival</h2>
              <p className="mb-6">
                Oyster festivals offer a unique opportunity to experience the best of Gulf Coast 
                culture, cuisine, and community. Here's what you can expect when you attend:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Food & Drinks</h3>
                    <ul className="text-purple-700 text-sm space-y-2">
                      <li>• Fresh raw oysters on the half shell</li>
                      <li>• Grilled and fried oyster preparations</li>
                      <li>• Oyster po' boys and other local specialties</li>
                      <li>• Local craft beer and wine</li>
                      <li>• Non-seafood options for all dietary needs</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-pink-50 to-rose-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Entertainment</h3>
                    <ul className="text-purple-700 text-sm space-y-2">
                      <li>• Live music from local and regional artists</li>
                      <li>• Oyster shucking competitions</li>
                      <li>• Cooking demonstrations and contests</li>
                      <li>• Kids' activities and games</li>
                      <li>• Arts and crafts vendors</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Education</h3>
                    <ul className="text-purple-700 text-sm space-y-2">
                      <li>• Oyster farming demonstrations</li>
                      <li>• Sustainability and conservation exhibits</li>
                      <li>• Local history and culture displays</li>
                      <li>• Environmental education programs</li>
                      <li>• Meet the farmers and producers</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Community</h3>
                    <ul className="text-purple-700 text-sm space-y-2">
                      <li>• Local business showcases</li>
                      <li>• Non-profit organization booths</li>
                      <li>• Community service opportunities</li>
                      <li>• Networking with industry professionals</li>
                      <li>• Making new friends and connections</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Planning Your Festival Visit</h2>
              
              <div className="space-y-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Before You Go</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Essential Planning:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Check festival dates and times</li>
                          <li>• Purchase tickets in advance</li>
                          <li>• Book accommodations early</li>
                          <li>• Check weather forecasts</li>
                          <li>• Plan your transportation</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">What to Bring:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Comfortable walking shoes</li>
                          <li>• Sun protection (hat, sunscreen)</li>
                          <li>• Cash for vendors</li>
                          <li>• Camera for memories</li>
                          <li>• Appetite for oysters!</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Making the Most of Your Visit</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Pro Tips:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Arrive early for the best selection</li>
                          <li>• Try different oyster varieties</li>
                          <li>• Talk to the farmers and vendors</li>
                          <li>• Take advantage of educational opportunities</li>
                          <li>• Stay hydrated between tastings</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Safety First:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Only eat oysters from reputable vendors</li>
                          <li>• Check that oysters are properly chilled</li>
                          <li>• Avoid oysters with open shells</li>
                          <li>• Know your limits with alcohol</li>
                          <li>• Have a designated driver</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Supporting Local Oyster Industry</h2>
              <p className="mb-6">
                Attending oyster festivals is not just about having fun – it's also about supporting 
                the local oyster industry and the communities that depend on it. Here's how your 
                participation makes a difference:
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Economic Impact</h3>
                <ul className="space-y-3 text-purple-700">
                  <li>• <strong>Direct Support:</strong> Your ticket and food purchases directly support local oyster farmers</li>
                  <li>• <strong>Community Investment:</strong> Festival proceeds often fund local community projects</li>
                  <li>• <strong>Tourism Revenue:</strong> Visitors bring money to local hotels, restaurants, and shops</li>
                  <li>• <strong>Job Creation:</strong> Festivals create temporary and permanent employment opportunities</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20 mt-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Environmental Awareness</h3>
                <p className="mb-4">
                  Oyster festivals also play an important role in educating the public about 
                  sustainable aquaculture and environmental conservation. By attending, you're 
                  supporting efforts to protect our coastal waters and marine ecosystems.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Fresh Oysters</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/contact">Learn About Our Farm</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-storage-handling">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Oyster Storage & Handling
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/why-texas-gulf-oysters-taste-different">
                Next: Why Texas Gulf Oysters Taste Different
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
