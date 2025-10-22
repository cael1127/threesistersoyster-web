import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
// import { // SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'Top 5 Oyster Recipes for Summer Gatherings | Three Sisters Oyster Blog',
  description: 'Perfect your oyster preparation with these delicious recipes. From classic raw oysters to grilled specialties, impress your guests with fresh Gulf Coast oysters.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/top-5-oyster-recipes-summer' },
  openGraph: {
    title: 'Top 5 Oyster Recipes for Summer Gatherings | Three Sisters Oyster Blog',
    description: 'Perfect your oyster preparation with these delicious recipes. From classic raw oysters to grilled specialties, impress your guests with fresh Gulf Coast oysters.',
    url: '/blog/top-5-oyster-recipes-summer',
    type: 'article',
    images: [
      {
        url: '/gal.jpg',
        width: 1200,
        height: 630,
        alt: 'Summer Oyster Recipes - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 5 Oyster Recipes for Summer Gatherings | Three Sisters Oyster Blog',
    description: 'Perfect your oyster preparation with these delicious recipes. From classic raw oysters to grilled specialties, impress your guests with fresh Gulf Coast oysters.',
    images: ['/gal.jpg'],
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Recipes</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                September 1, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Top 5 Oyster Recipes for Summer Gatherings
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Perfect your oyster preparation with these delicious recipes. From classic raw oysters to 
                grilled specialties, impress your guests with fresh Gulf Coast oysters.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/gal.jpg"
                alt="Summer Oyster Recipes - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Summer is the perfect time to showcase fresh Gulf Coast oysters at your gatherings. Whether 
                you're hosting a backyard barbecue or an elegant dinner party, these five recipes will help 
                you create memorable oyster dishes that highlight the natural flavors of our premium Texas oysters.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">1. Classic Raw Oysters with Mignonette</h2>
              <p className="mb-4">
                Sometimes the simplest preparation is the best. Our fresh Texas Gulf oysters are perfect 
                served raw with a classic mignonette sauce.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-purple-900 mb-2">Mignonette Recipe:</h3>
                <ul className="list-disc list-inside text-purple-700 space-y-1">
                  <li>1/4 cup red wine vinegar</li>
                  <li>1 tablespoon minced shallot</li>
                  <li>1 teaspoon freshly ground black pepper</li>
                  <li>1/2 teaspoon salt</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">2. Grilled Oysters with Garlic Butter</h2>
              <p className="mb-4">
                Heat up your summer gatherings with these smoky, buttery grilled oysters. Perfect for 
                outdoor cooking and guaranteed to impress your guests.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-purple-900 mb-2">Instructions:</h3>
                <ol className="list-decimal list-inside text-purple-700 space-y-1">
                  <li>Preheat grill to medium-high heat</li>
                  <li>Mix melted butter with minced garlic and herbs</li>
                  <li>Place oysters on grill, cup side down</li>
                  <li>Cook for 5-7 minutes until shells open</li>
                  <li>Add garlic butter and serve immediately</li>
                </ol>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">3. Oyster Shooters with Bloody Mary Mix</h2>
              <p className="mb-4">
                Add some spice to your summer party with these refreshing oyster shooters. Perfect for 
                cocktail hour or as appetizers.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-purple-900 mb-2">Bloody Mary Mix:</h3>
                <ul className="list-disc list-inside text-purple-700 space-y-1">
                  <li>Tomato juice, vodka, Worcestershire sauce</li>
                  <li>Hot sauce, celery salt, black pepper</li>
                  <li>Fresh lemon juice and horseradish</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">4. Oyster Po' Boy Sandwiches</h2>
              <p className="mb-4">
                A Louisiana classic that's perfect for summer picnics and casual gatherings. Our fresh 
                oysters make the best po' boys.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-purple-900 mb-2">Key Ingredients:</h3>
                <ul className="list-disc list-inside text-purple-700 space-y-1">
                  <li>Fresh French bread or hoagie rolls</li>
                  <li>Cornmeal-breaded fried oysters</li>
                  <li>Lettuce, tomato, and pickles</li>
                  <li>Remoulade sauce</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">5. Oyster Ceviche with Citrus</h2>
              <p className="mb-8">
                Light and refreshing, this citrus-marinated oyster ceviche is perfect for hot summer days. 
                The acidity of the citrus "cooks" the oysters while preserving their fresh, clean taste.
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Pro Tips for Summer Oyster Success</h3>
                <ul className="space-y-2 text-purple-700">
                  <li>• Keep oysters on ice until ready to serve</li>
                  <li>• Serve raw oysters within 2 hours of shucking</li>
                  <li>• Always discard any oysters that don't open when cooked</li>
                  <li>• Pair with crisp white wines or light beers</li>
                  <li>• Have plenty of napkins and lemon wedges ready</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20 mt-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Ready to Get Cooking?</h3>
                <p className="mb-4">
                  Start with the freshest ingredients - our premium Texas Gulf oysters. Order online 
                  for your next summer gathering and taste the difference that quality makes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Fresh Oysters</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/contact">Ask Our Chefs</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/environmental-benefits-oyster-farming">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Environmental Benefits
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/from-farm-to-table-oyster-harvest">
                Next: From Farm to Table
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
