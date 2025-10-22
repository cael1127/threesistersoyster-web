import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight, Droplets, Thermometer, MapPin, Wind } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
// import { // SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'Oyster Merroir: How Location Affects Oyster Flavor | Three Sisters Oyster Blog',
  description: 'Discover the concept of oyster merroir and learn how water salinity, temperature, and location create unique flavors in Texas Gulf oysters from Keller Bay.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-merroir-flavor-guide' },
  openGraph: {
    title: 'Oyster Merroir: How Location Affects Oyster Flavor | Three Sisters Oyster Blog',
    description: 'Discover the concept of oyster merroir and learn how water salinity, temperature, and location create unique flavors in Texas Gulf oysters from Keller Bay.',
    url: '/blog/oyster-merroir-flavor-guide',
    type: 'article',
    images: [
      {
        url: '/gal3.jpg',
        width: 1200,
        height: 630,
        alt: 'Oyster Merroir - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Merroir: How Location Affects Oyster Flavor | Three Sisters Oyster Blog',
    description: 'Discover the concept of oyster merroir and learn how water salinity, temperature, and location create unique flavors in Texas Gulf oysters from Keller Bay.',
    images: ['/gal3.jpg'],
  },
}

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      {/* <SeasonalFloatingParticles count={8} /> */}
      
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Education</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 12, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oyster Merroir: How Location Affects Oyster Flavor
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Discover the concept of oyster merroir and learn how water salinity, temperature, and 
                location create unique flavors in Texas Gulf oysters from Keller Bay.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/gal3.jpg"
                alt="Oyster Merroir - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Just as wine enthusiasts talk about terroir—the unique characteristics imparted by a vineyard's 
                soil, climate, and location—oyster lovers celebrate merroir. This French term describes how the 
                specific waters where oysters grow influence their flavor, texture, and overall character. At 
                Three Sisters Oyster, our location in Keller Bay creates a distinctive merroir that makes our 
                Texas Gulf oysters truly special.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">What is Merroir?</h2>
              <p className="mb-6">
                Merroir (from the French "mer" meaning sea) encompasses all the environmental factors that 
                influence an oyster's taste. Unlike terrestrial crops, oysters are filter feeders that consume 
                microscopic algae and nutrients from the water around them. Every gallon of water that passes 
                through an oyster contributes to its unique flavor profile, making location absolutely critical 
                to the final product.
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20 mb-8">
                <h3 className="text-xl font-bold text-purple-900 mb-4">The Oyster's Journey</h3>
                <p className="mb-4">
                  An adult oyster filters 30-50 gallons of water every single day, extracting phytoplankton, 
                  minerals, and trace elements. Over months of growth, these filtered waters become the oyster's 
                  flavor signature—a liquid autobiography of its home waters.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Key Factors That Shape Merroir</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Droplets className="w-8 h-8 text-blue-600 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Salinity</h3>
                    </div>
                    <p className="text-purple-700 text-sm mb-3">
                      Water salinity dramatically affects oyster flavor. Higher salinity creates brinier, 
                      more mineral-forward oysters, while lower salinity produces sweeter, milder flavors.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-blue-900 text-xs font-semibold mb-1">Keller Bay Profile:</p>
                      <p className="text-blue-800 text-xs">
                        Moderate salinity (15-25 ppt) creates a balanced flavor—briny but not overwhelming, 
                        with a clean, sweet finish.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-red-50 to-orange-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Thermometer className="w-8 h-8 text-orange-600 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Temperature</h3>
                    </div>
                    <p className="text-purple-700 text-sm mb-3">
                      Water temperature influences oyster metabolism, growth rate, and the types of algae 
                      available for feeding—all of which affect flavor development.
                    </p>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-orange-900 text-xs font-semibold mb-1">Texas Gulf Advantage:</p>
                      <p className="text-orange-800 text-xs">
                        Warm Gulf waters promote year-round growth and create a rich, complex flavor profile 
                        with buttery undertones.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Wind className="w-8 h-8 text-green-600 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Water Flow</h3>
                    </div>
                    <p className="text-purple-700 text-sm mb-3">
                      Current patterns and tidal movement affect how much food oysters receive and how 
                      quickly water is exchanged around them.
                    </p>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-green-900 text-xs font-semibold mb-1">Keller Bay Currents:</p>
                      <p className="text-green-800 text-xs">
                        Consistent tidal flow ensures fresh nutrients while preventing stagnation, producing 
                        clean-tasting oysters.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <MapPin className="w-8 h-8 text-purple-600 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Minerals & Nutrients</h3>
                    </div>
                    <p className="text-purple-700 text-sm mb-3">
                      The mineral composition of surrounding waters—influenced by geology, freshwater 
                      input, and marine life—creates unique flavor notes.
                    </p>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-purple-900 text-xs font-semibold mb-1">Gulf Coast Character:</p>
                      <p className="text-purple-800 text-xs">
                        Rich mineral content from Gulf waters adds complexity with subtle copper and 
                        earthy notes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Keller Bay Difference</h2>
              <p className="mb-6">
                Three Sisters Oyster's location in Keller Bay, just off Port Lavaca on the Texas Gulf Coast, 
                provides an ideal merroir for growing premium oysters. Our waters offer a perfect balance of 
                factors that create oysters with distinctive characteristics.
              </p>

              <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/5 to-lavenderBrand/5 mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">Three Sisters Flavor Profile</h3>
                  <div className="space-y-3 text-purple-700">
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-1">Initial Taste:</h4>
                      <p className="text-sm">
                        Clean, briny first impression with a pleasant saltwater snap that awakens the palate 
                        without overwhelming it.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-1">Mid-Palate:</h4>
                      <p className="text-sm">
                        Creamy, buttery texture develops with subtle sweetness and hints of cucumber and melon. 
                        The oyster meat is plump and firm with a satisfying bite.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-1">Finish:</h4>
                      <p className="text-sm">
                        Long, clean finish with lingering mineral notes and a touch of natural sweetness. 
                        No muddy or metallic aftertaste—just pure Gulf Coast character.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Regional Merroir Comparison</h2>
              <p className="mb-6">
                Oysters from different regions develop distinctly different flavor profiles based on their 
                unique merroir. Here's how Texas Gulf oysters compare to other famous oyster-growing regions:
              </p>

              <div className="space-y-4 mb-8">
                <Card className="border-purpleBrand/30 bg-white/50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-purple-900 mb-2">Pacific Northwest (Washington, Oregon)</h4>
                    <p className="text-purple-700 text-sm mb-2">
                      <strong>Characteristics:</strong> Cold water, high salinity, strong currents
                    </p>
                    <p className="text-purple-600 text-sm">
                      <strong>Flavor:</strong> Intensely briny, crisp, with cucumber and melon notes. Smaller, 
                      firmer meat with a sharp mineral finish.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-white/50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-purple-900 mb-2">Northeast (Maine, Massachusetts)</h4>
                    <p className="text-purple-700 text-sm mb-2">
                      <strong>Characteristics:</strong> Cold Atlantic waters, rocky bottom, seasonal variation
                    </p>
                    <p className="text-purple-600 text-sm">
                      <strong>Flavor:</strong> Clean, bright, very briny with metallic notes. Firm texture with 
                      a crisp, saline finish.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-white/50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-purple-900 mb-2">Chesapeake Bay (Maryland, Virginia)</h4>
                    <p className="text-purple-700 text-sm mb-2">
                      <strong>Characteristics:</strong> Brackish estuary water, moderate salinity, nutrient-rich
                    </p>
                    <p className="text-purple-600 text-sm">
                      <strong>Flavor:</strong> Mild, sweet, buttery with less brine. Larger meat with softer 
                      texture and earthy undertones.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-purple-900 mb-2">Texas Gulf Coast (Keller Bay)</h4>
                    <p className="text-purple-700 text-sm mb-2">
                      <strong>Characteristics:</strong> Warm Gulf waters, balanced salinity, consistent year-round growing
                    </p>
                    <p className="text-purple-600 text-sm">
                      <strong>Flavor:</strong> Balanced brine and sweetness, creamy-buttery texture, clean finish 
                      with mineral complexity. The best of both worlds—enough salt for character, enough 
                      sweetness for accessibility.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Tasting Your Oysters</h2>
              <p className="mb-6">
                To fully appreciate the merroir of Three Sisters oysters, try this tasting approach used by 
                professional oyster sommeliers:
              </p>

              <div className="bg-gradient-to-r from-blueBrand/10 via-mintBrand/10 to-seafoamBrand/10 rounded-lg p-6 border border-purpleBrand/20 mb-8">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Professional Tasting Guide</h3>
                <ol className="space-y-3 text-purple-700 text-sm list-decimal list-inside">
                  <li>
                    <strong>Visual Inspection:</strong> Observe the oyster liquor (should be clear), meat color 
                    (creamy white to tan), and overall appearance.
                  </li>
                  <li>
                    <strong>Aroma:</strong> Smell the oyster first—it should smell like fresh ocean water, not 
                    fishy or sulfurous.
                  </li>
                  <li>
                    <strong>First Taste:</strong> Slurp the oyster with its liquor. Note the initial brine level 
                    and any immediate flavors.
                  </li>
                  <li>
                    <strong>Chew Gently:</strong> Give it 2-3 chews to release flavors. Notice the texture, 
                    creaminess, and how flavors develop.
                  </li>
                  <li>
                    <strong>Finish:</strong> Pay attention to the aftertaste. Quality oysters should leave a 
                    clean, pleasant finish without any off-flavors.
                  </li>
                  <li>
                    <strong>Compare:</strong> Try oysters from different batches or dates to notice subtle 
                    variations in merroir.
                  </li>
                </ol>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Seasonal Variations in Merroir</h2>
              <p className="mb-6">
                Even in the same location, merroir can vary throughout the year. At Keller Bay, we notice 
                subtle seasonal changes that affect our oysters' flavor:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-purple-900 mb-2">Spring/Summer</h4>
                    <p className="text-purple-700 text-sm">
                      Warmer waters, abundant phytoplankton, faster growth. Oysters tend to be plumper with 
                      slightly sweeter, more delicate flavors.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-purple-900 mb-2">Fall/Winter</h4>
                    <p className="text-purple-700 text-sm">
                      Cooler waters, slower growth, higher glycogen storage. Oysters develop firmer texture 
                      with more concentrated, complex flavors.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Experience Our Merroir</h3>
                <p className="mb-4">
                  The best way to understand merroir is to taste it yourself. Order fresh Three Sisters oysters 
                  and discover the unique flavor of Keller Bay. Each oyster tells the story of our Gulf Coast 
                  waters—clean, balanced, and full of character.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Fresh Oysters</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/about">Learn About Our Farm</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-festival-guide">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Oyster Festival Guide
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/how-to-host-oyster-party">
                Next: How to Host an Oyster Party
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

