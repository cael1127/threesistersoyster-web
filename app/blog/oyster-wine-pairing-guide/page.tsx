// import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight, Wine, Star, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
// import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

// Metadata moved to layout.tsx for client components

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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Recipes</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 3, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oyster Wine Pairing Guide: Perfect Matches
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Discover the perfect wine pairings for Texas Gulf oysters. Learn which wines complement 
                different oyster preparations and enhance your dining experience.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/placeholder.jpg"
                alt="Oyster Wine Pairing Guide - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                The perfect wine pairing can elevate your oyster experience from good to extraordinary. 
                Our Texas Gulf oysters have a unique flavor profile that pairs beautifully with a variety 
                of wines. Whether you prefer raw oysters on the half shell or cooked preparations, 
                there's a perfect wine match waiting to be discovered.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Science of Oyster and Wine Pairing</h2>
              <p className="mb-6">
                The key to successful oyster and wine pairing lies in balancing the oyster's natural 
                brininess with the wine's acidity, minerality, and body. Our Texas Gulf oysters have 
                a clean, briny taste with subtle sweetness that pairs beautifully with crisp, mineral-driven wines.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Perfect Wine Matches</h2>
              
              <div className="space-y-8 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Wine className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-2xl font-bold text-purple-900">Champagne & Sparkling Wines</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      <strong>Why it works:</strong> The high acidity and effervescence of Champagne cut through 
                      the oyster's richness while the minerality complements the briny flavor.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Recommended Bottles:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Veuve Clicquot Yellow Label</li>
                          <li>• Dom Pérignon</li>
                          <li>• Prosecco Superiore</li>
                          <li>• Cava Brut</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Best With:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Raw oysters on half shell</li>
                          <li>• Oyster shooters</li>
                          <li>• Oyster Rockefeller</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Star className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-2xl font-bold text-purple-900">Sauvignon Blanc</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      <strong>Why it works:</strong> The crisp acidity and citrus notes of Sauvignon Blanc 
                      enhance the oyster's natural flavors without overwhelming them.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Recommended Bottles:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Sancerre</li>
                          <li>• Pouilly-Fumé</li>
                          <li>• New Zealand Sauvignon Blanc</li>
                          <li>• California Sauvignon Blanc</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Best With:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Raw oysters with mignonette</li>
                          <li>• Grilled oysters</li>
                          <li>• Oyster ceviche</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-mintBrand/10 to-seafoamBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Sparkles className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-2xl font-bold text-purple-900">Muscadet</h3>
                    </div>
                    <p className="text-purple-700 mb-4">
                      <strong>Why it works:</strong> This classic oyster wine from the Loire Valley has 
                      the perfect balance of acidity and minerality to complement briny oysters.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Recommended Bottles:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Muscadet Sèvre et Maine</li>
                          <li>• Domaine de la Pépière</li>
                          <li>• Château de la Ragotière</li>
                          <li>• Luneau-Papin</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">Best With:</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Raw oysters with lemon</li>
                          <li>• Oyster po' boys</li>
                          <li>• Fried oysters</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Seasonal Pairing Recommendations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Spring & Summer</h3>
                    <p className="text-purple-700 mb-4">
                      Light, crisp wines that refresh and complement the oyster's natural brininess.
                    </p>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Prosecco or Cava</li>
                      <li>• Pinot Grigio</li>
                      <li>• Albariño</li>
                      <li>• Dry Riesling</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Fall & Winter</h3>
                    <p className="text-purple-700 mb-4">
                      Fuller-bodied wines that provide warmth and complexity to your oyster experience.
                    </p>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Champagne or sparkling</li>
                      <li>• Chardonnay (unoaked)</li>
                      <li>• Chenin Blanc</li>
                      <li>• White Burgundy</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Cooking Method Pairings</h2>
              <p className="mb-6">
                Different cooking methods can change the flavor profile of oysters, requiring different 
                wine pairings to achieve the perfect balance.
              </p>

              <div className="space-y-6 my-8">
                <div className="bg-gradient-to-r from-purpleBrand/5 to-lavenderBrand/5 rounded-lg p-6 border border-purpleBrand/20">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">Raw Oysters</h3>
                  <p className="text-purple-700 mb-3">
                    The pure, briny flavor of raw oysters pairs best with crisp, mineral-driven wines 
                    that won't overpower the delicate taste.
                  </p>
                  <p className="text-purple-600 text-sm font-medium">Best matches: Champagne, Muscadet, Sauvignon Blanc</p>
                </div>

                <div className="bg-gradient-to-r from-blueBrand/5 to-mintBrand/5 rounded-lg p-6 border border-purpleBrand/20">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">Grilled Oysters</h3>
                  <p className="text-purple-700 mb-3">
                    The smoky, charred flavors of grilled oysters can handle slightly fuller-bodied wines 
                    with good acidity to cut through the richness.
                  </p>
                  <p className="text-purple-600 text-sm font-medium">Best matches: Chardonnay, White Burgundy, Albariño</p>
                </div>

                <div className="bg-gradient-to-r from-mintBrand/5 to-seafoamBrand/5 rounded-lg p-6 border border-purpleBrand/20">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">Fried Oysters</h3>
                  <p className="text-purple-700 mb-3">
                    The crispy, rich texture of fried oysters needs wines with enough acidity and 
                    body to stand up to the preparation.
                  </p>
                  <p className="text-purple-600 text-sm font-medium">Best matches: Prosecco, Cava, Dry Riesling</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Pro Tips for Perfect Pairings</h2>
              
              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Expert Advice</h3>
                <ul className="space-y-3 text-purple-700">
                  <li>• <strong>Serve wines chilled:</strong> Cold temperatures enhance the crisp, refreshing qualities</li>
                  <li>• <strong>Match intensity:</strong> Lighter oysters pair with lighter wines, richer preparations with fuller wines</li>
                  <li>• <strong>Consider the sauce:</strong> Mignonette, cocktail sauce, and other accompaniments affect the pairing</li>
                  <li>• <strong>Experiment:</strong> Personal taste preferences play a big role in wine pairing</li>
                  <li>• <strong>Quality matters:</strong> Better wines generally make better pairings</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20 mt-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Ready to Host a Wine and Oyster Tasting?</h3>
                <p className="mb-4">
                  Create the perfect pairing experience with our fresh Texas Gulf oysters. Whether you're 
                  planning an intimate dinner or a grand celebration, the right wine can make all the difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Fresh Oysters</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/contact">Get Pairing Advice</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-shucking-techniques">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Oyster Shucking Techniques
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-nutrition-benefits">
                Next: Oyster Nutrition Benefits
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
