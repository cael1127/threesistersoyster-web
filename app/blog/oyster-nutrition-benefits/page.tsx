import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowRight, Heart, Brain, Shield, Zap } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'Oyster Nutrition Benefits: Superfood from the Sea | Three Sisters Oyster Blog',
  description: 'Discover the incredible nutritional benefits of Texas Gulf oysters. Learn about vitamins, minerals, and health benefits that make oysters a true superfood.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-nutrition-benefits' },
  openGraph: {
    title: 'Oyster Nutrition Benefits: Superfood from the Sea | Three Sisters Oyster Blog',
    description: 'Discover the incredible nutritional benefits of Texas Gulf oysters. Learn about vitamins, minerals, and health benefits that make oysters a true superfood.',
    url: '/blog/oyster-nutrition-benefits',
    type: 'article',
    images: [
      {
        url: '/gal2.jpg',
        width: 1200,
        height: 630,
        alt: 'Oyster Nutrition Benefits - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Nutrition Benefits: Superfood from the Sea | Three Sisters Oyster Blog',
    description: 'Discover the incredible nutritional benefits of Texas Gulf oysters. Learn about vitamins, minerals, and health benefits that make oysters a true superfood.',
    images: ['/gal2.jpg'],
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Health</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 1, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oyster Nutrition Benefits: Superfood from the Sea
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Discover the incredible nutritional benefits of Texas Gulf oysters. Learn about vitamins, 
                minerals, and health benefits that make oysters a true superfood.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/gal2.jpg"
                alt="Oyster Nutrition Benefits - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Oysters are often called "the milk of the sea" for good reason. These incredible bivalves 
                are packed with essential nutrients that support overall health and well-being. Our Texas 
                Gulf oysters are not only delicious but also one of the most nutrient-dense foods you can eat.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Nutritional Powerhouse</h2>
              <p className="mb-6">
                A single serving of oysters (about 6 medium oysters) provides an impressive array of 
                vitamins, minerals, and other beneficial compounds. Let's explore what makes oysters 
                such a nutritional superfood.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Zap className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Macronutrients</h3>
                    </div>
                    <ul className="space-y-2 text-purple-700 text-sm">
                      <li>• <strong>Protein:</strong> 9g per serving (complete amino acids)</li>
                      <li>• <strong>Fat:</strong> 2g (mostly healthy omega-3s)</li>
                      <li>• <strong>Carbs:</strong> 4g (minimal impact on blood sugar)</li>
                      <li>• <strong>Calories:</strong> Only 70 calories per serving</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Shield className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Key Minerals</h3>
                    </div>
                    <ul className="space-y-2 text-purple-700 text-sm">
                      <li>• <strong>Zinc:</strong> 76mg (500% daily value)</li>
                      <li>• <strong>Iron:</strong> 5.7mg (32% daily value)</li>
                      <li>• <strong>Selenium:</strong> 63mcg (90% daily value)</li>
                      <li>• <strong>Phosphorus:</strong> 144mg (12% daily value)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Health Benefits</h2>
              
              <div className="space-y-8 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-red-50 to-pink-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Heart className="w-8 h-8 text-red-600 mr-3" />
                      <h3 className="text-2xl font-bold text-purple-900">Heart Health</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      Oysters are rich in omega-3 fatty acids, which have been shown to reduce inflammation, 
                      lower blood pressure, and decrease the risk of heart disease. The high zinc content 
                      also supports healthy blood vessel function.
                    </p>
                    <div className="bg-red-100 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">Key Benefits:</h4>
                      <ul className="text-red-800 text-sm space-y-1">
                        <li>• Reduces inflammation markers</li>
                        <li>• Supports healthy cholesterol levels</li>
                        <li>• Improves blood vessel elasticity</li>
                        <li>• May reduce risk of stroke</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Brain className="w-8 h-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-purple-900">Brain Function</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      The omega-3 fatty acids in oysters are essential for brain health and cognitive function. 
                      Zinc plays a crucial role in neurotransmitter function and may help protect against 
                      age-related cognitive decline.
                    </p>
                    <div className="bg-blue-100 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Key Benefits:</h4>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Supports memory and learning</li>
                        <li>• May reduce risk of dementia</li>
                        <li>• Improves mood and mental clarity</li>
                        <li>• Essential for brain development</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Shield className="w-8 h-8 text-green-600 mr-3" />
                      <h3 className="text-2xl font-bold text-purple-900">Immune System</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      Oysters are one of the best sources of zinc, a mineral that's crucial for immune function. 
                      They also contain selenium, which acts as an antioxidant and supports the body's 
                      natural defense mechanisms.
                    </p>
                    <div className="bg-green-100 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Key Benefits:</h4>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• Boosts immune cell function</li>
                        <li>• Reduces oxidative stress</li>
                        <li>• Supports wound healing</li>
                        <li>• May reduce infection risk</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Vitamins and Antioxidants</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Vitamin B12</h3>
                    <p className="text-3xl font-bold text-yellow-600 mb-2">324%</p>
                    <p className="text-purple-700 text-sm">Daily Value per serving</p>
                    <p className="text-purple-600 text-xs mt-2">Essential for nerve function and red blood cell formation</p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Vitamin D</h3>
                    <p className="text-3xl font-bold text-purple-600 mb-2">80%</p>
                    <p className="text-purple-700 text-sm">Daily Value per serving</p>
                    <p className="text-purple-600 text-xs mt-2">Supports bone health and immune function</p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Vitamin C</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-2">15%</p>
                    <p className="text-purple-700 text-sm">Daily Value per serving</p>
                    <p className="text-purple-600 text-xs mt-2">Antioxidant that supports collagen production</p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Why Texas Gulf Oysters Are Special</h2>
              <p className="mb-6">
                Our Texas Gulf oysters have unique nutritional advantages due to their growing environment. 
                The pristine waters of Keller Bay provide the perfect conditions for oysters to develop 
                their full nutritional potential.
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Environmental Benefits</h3>
                <ul className="space-y-3 text-purple-700">
                  <li>• <strong>Clean Water:</strong> Pristine Gulf waters ensure high-quality, contaminant-free oysters</li>
                  <li>• <strong>Natural Diet:</strong> Oysters feed on natural phytoplankton, enhancing their nutritional profile</li>
                  <li>• <strong>Optimal Salinity:</strong> Perfect salt levels promote healthy mineral absorption</li>
                  <li>• <strong>Sustainable Farming:</strong> Our methods ensure consistent quality and nutrition</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Incorporating Oysters into Your Diet</h2>
              <p className="mb-6">
                Adding oysters to your regular diet is easier than you might think. Here are some 
                simple ways to enjoy the nutritional benefits of our Texas Gulf oysters:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/5 to-lavenderBrand/5">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Raw Consumption</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      Eating oysters raw preserves all their nutrients and provides the most health benefits.
                    </p>
                    <ul className="text-purple-600 text-xs space-y-1">
                      <li>• On the half shell with lemon</li>
                      <li>• With mignonette sauce</li>
                      <li>• In oyster shooters</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/5 to-mintBrand/5">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">Cooked Preparations</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      Light cooking methods preserve most nutrients while adding variety to your diet.
                    </p>
                    <ul className="text-purple-600 text-xs space-y-1">
                      <li>• Grilled with herbs</li>
                      <li>• Steamed with aromatics</li>
                      <li>• In soups and stews</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Start Your Health Journey</h3>
                <p className="mb-4">
                  Experience the incredible nutritional benefits of our fresh Texas Gulf oysters. 
                  Whether you're looking to boost your immune system, support heart health, or simply 
                  enjoy one of nature's most nutritious foods, our oysters deliver.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Fresh Oysters</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/contact">Learn More About Nutrition</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-wine-pairing-guide">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Oyster Wine Pairing Guide
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-farming-challenges">
                Next: Oyster Farming Challenges
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
