import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowRight, Thermometer, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'Oyster Storage & Handling: Keep Your Oysters Fresh | Three Sisters Oyster Blog',
  description: 'Learn proper oyster storage and handling techniques to maintain freshness and safety. Essential tips for restaurants, chefs, and home cooks.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-storage-handling' },
  openGraph: {
    title: 'Oyster Storage & Handling: Keep Your Oysters Fresh | Three Sisters Oyster Blog',
    description: 'Learn proper oyster storage and handling techniques to maintain freshness and safety. Essential tips for restaurants, chefs, and home cooks.',
    url: '/blog/oyster-storage-handling',
    type: 'article',
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'Oyster Storage & Handling - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Storage & Handling: Keep Your Oysters Fresh | Three Sisters Oyster Blog',
    description: 'Learn proper oyster storage and handling techniques to maintain freshness and safety. Essential tips for restaurants, chefs, and home cooks.',
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Process</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                November 25, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oyster Storage & Handling: Keep Your Oysters Fresh
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Learn proper oyster storage and handling techniques to maintain freshness and safety. 
                Essential tips for restaurants, chefs, and home cooks.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/placeholder.jpg"
                alt="Oyster Storage & Handling - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Proper storage and handling are crucial for maintaining the quality, safety, and 
                delicious taste of fresh oysters. Whether you're a professional chef or a home cook, 
                following these guidelines will ensure your Texas Gulf oysters stay fresh and safe 
                from harvest to plate.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Temperature Control: The Golden Rule</h2>
              <p className="mb-6">
                Temperature is the most critical factor in oyster storage. Oysters are living 
                creatures, and maintaining the proper temperature is essential for their survival 
                and quality.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Thermometer className="w-8 h-8 text-blue-600 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Ideal Temperature</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      Store oysters at 35-40°F (1.7-4.4°C) to keep them alive and fresh. 
                      This temperature range slows their metabolism without freezing them.
                    </p>
                    <div className="bg-blue-100 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Temperature Guidelines:</h4>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Refrigerator: 35-40°F (1.7-4.4°C)</li>
                        <li>• Ice storage: 32-35°F (0-1.7°C)</li>
                        <li>• Never freeze live oysters</li>
                        <li>• Never store above 45°F (7.2°C)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Clock className="w-8 h-8 text-green-600 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Storage Duration</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      Fresh oysters can be stored for 7-10 days when properly handled, 
                      but quality is best within the first 3-5 days.
                    </p>
                    <div className="bg-green-100 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Timeline:</h4>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• Days 1-3: Peak quality</li>
                        <li>• Days 4-5: Still excellent</li>
                        <li>• Days 6-7: Good quality</li>
                        <li>• Days 8-10: Use with caution</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Proper Storage Methods</h2>
              
              <div className="space-y-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Method 1: Ice Storage (Recommended)</h3>
                    <p className="text-purple-700 mb-4">
                      The best way to store oysters is on ice, which maintains the proper temperature 
                      and humidity while keeping them alive.
                    </p>
                    <div className="bg-purple-100 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Step-by-Step:</h4>
                      <ol className="text-purple-800 text-sm space-y-1 list-decimal list-inside">
                        <li>Place oysters in a colander or perforated container</li>
                        <li>Set the container over a bowl or pan to catch melting ice</li>
                        <li>Cover oysters with crushed ice</li>
                        <li>Drain melted ice daily and add fresh ice</li>
                        <li>Keep in the coldest part of your refrigerator</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Method 2: Refrigerator Storage</h3>
                    <p className="text-purple-700 mb-4">
                      If ice storage isn't possible, store oysters in the refrigerator with proper 
                      ventilation and moisture control.
                    </p>
                    <div className="bg-blue-100 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Requirements:</h4>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Store in a perforated container or colander</li>
                        <li>• Cover with a damp towel (not plastic wrap)</li>
                        <li>• Place in the coldest part of the refrigerator</li>
                        <li>• Ensure good air circulation</li>
                        <li>• Check daily for freshness</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Handling Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                      <h3 className="text-lg font-bold text-green-900">Do This</h3>
                    </div>
                    <ul className="text-green-800 text-sm space-y-2">
                      <li>• Handle oysters gently to avoid damaging shells</li>
                      <li>• Keep oysters alive until ready to shuck</li>
                      <li>• Store with the cupped side down</li>
                      <li>• Use clean, sanitized tools and surfaces</li>
                      <li>• Discard any oysters with cracked or damaged shells</li>
                      <li>• Wash hands thoroughly before and after handling</li>
                      <li>• Keep raw and cooked oysters separate</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
                      <h3 className="text-lg font-bold text-red-900">Don't Do This</h3>
                    </div>
                    <ul className="text-red-800 text-sm space-y-2">
                      <li>• Don't store oysters in airtight containers</li>
                      <li>• Don't submerge oysters in fresh water</li>
                      <li>• Don't store at room temperature</li>
                      <li>• Don't freeze live oysters</li>
                      <li>• Don't store in standing water</li>
                      <li>• Don't use oysters with open shells</li>
                      <li>• Don't cross-contaminate with other foods</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Signs of Freshness and Quality</h2>
              <p className="mb-6">
                Knowing how to identify fresh, high-quality oysters is essential for both safety 
                and taste. Here are the key indicators to look for:
              </p>

              <div className="space-y-4 my-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-lg font-bold text-green-900 mb-3">Fresh Oyster Indicators</h3>
                  <ul className="text-green-800 text-sm space-y-2">
                    <li>• <strong>Tight shells:</strong> Oysters should be tightly closed or close when tapped</li>
                    <li>• <strong>Heavy weight:</strong> Fresh oysters feel heavy for their size</li>
                    <li>• <strong>Clean appearance:</strong> Shells should be clean and free of cracks</li>
                    <li>• <strong>Fresh smell:</strong> Should smell like the ocean, not fishy or ammonia-like</li>
                    <li>• <strong>Clear liquid:</strong> When opened, the liquid should be clear, not cloudy</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
                  <h3 className="text-lg font-bold text-red-900 mb-3">Warning Signs to Avoid</h3>
                  <ul className="text-red-800 text-sm space-y-2">
                    <li>• <strong>Open shells:</strong> Oysters that don't close when tapped are dead</li>
                    <li>• <strong>Bad odor:</strong> Fishy, ammonia, or rotten smell</li>
                    <li>• <strong>Cloudy liquid:</strong> Indicates the oyster may be spoiled</li>
                    <li>• <strong>Light weight:</strong> May indicate the oyster has died and dried out</li>
                    <li>• <strong>Cracked shells:</strong> Can allow bacteria to enter</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Restaurant and Commercial Storage</h2>
              <p className="mb-6">
                For restaurants and commercial kitchens, proper oyster storage is even more critical 
                due to volume, food safety regulations, and customer expectations.
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Commercial Best Practices</h3>
                <ul className="space-y-3 text-purple-700">
                  <li>• <strong>Dedicated Storage Area:</strong> Separate refrigerator or cooler for oysters only</li>
                  <li>• <strong>Temperature Monitoring:</strong> Use thermometers and data loggers for compliance</li>
                  <li>• <strong>Rotation System:</strong> First in, first out (FIFO) inventory management</li>
                  <li>• <strong>Staff Training:</strong> Ensure all staff understand proper handling procedures</li>
                  <li>• <strong>Regular Cleaning:</strong> Sanitize storage areas and equipment daily</li>
                  <li>• <strong>Documentation:</strong> Keep records of temperatures and storage times</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Food Safety Considerations</h2>
              <p className="mb-6">
                Oysters are filter feeders and can accumulate bacteria and viruses from their environment. 
                Proper handling and storage are essential for food safety.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">High-Risk Groups</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      Certain individuals should avoid raw oysters due to increased risk of foodborne illness.
                    </p>
                    <ul className="text-purple-600 text-xs space-y-1">
                      <li>• Pregnant women</li>
                      <li>• Young children</li>
                      <li>• Elderly individuals</li>
                      <li>• People with weakened immune systems</li>
                      <li>• Those with liver disease</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Safe Handling Tips</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      Follow these guidelines to minimize food safety risks.
                    </p>
                    <ul className="text-purple-600 text-xs space-y-1">
                      <li>• Keep cold until ready to serve</li>
                      <li>• Shuck just before serving</li>
                      <li>• Use clean, sanitized tools</li>
                      <li>• Discard any questionable oysters</li>
                      <li>• Cook thoroughly if concerned</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Ready to Store Your Oysters Properly?</h3>
                <p className="mb-4">
                  Now that you know the proper storage and handling techniques, you're ready to 
                  enjoy the freshest possible Texas Gulf oysters. Remember, proper handling 
                  ensures both safety and the best possible taste experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Fresh Oysters</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/contact">Get Storage Advice</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-farming-challenges">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Oyster Farming Challenges
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/why-texas-gulf-oysters-taste-different">
                Next: Why Texas Gulf Oysters Taste Different
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
