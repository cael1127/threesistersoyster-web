import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowRight, Sun, Snowflake, Leaf, Droplets } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'Oyster Season Guide: When to Enjoy the Best Texas Oysters | Three Sisters Oyster Blog',
  description: 'Learn about oyster seasons and when our Texas Gulf oysters are at their peak. Discover the best times to order and enjoy our premium oysters.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-season-guide-texas' },
  openGraph: {
    title: 'Oyster Season Guide: When to Enjoy the Best Texas Oysters | Three Sisters Oyster Blog',
    description: 'Learn about oyster seasons and when our Texas Gulf oysters are at their peak. Discover the best times to order and enjoy our premium oysters.',
    url: '/blog/oyster-season-guide-texas',
    type: 'article',
    images: [
      {
        url: '/gal1.jpg',
        width: 1200,
        height: 630,
        alt: 'Oyster Season Guide - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Season Guide: When to Enjoy the Best Texas Oysters | Three Sisters Oyster Blog',
    description: 'Learn about oyster seasons and when our Texas Gulf oysters are at their peak. Discover the best times to order and enjoy our premium oysters.',
    images: ['/gal1.jpg'],
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Seasonal</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                August 18, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oyster Season Guide: When to Enjoy the Best Texas Oysters
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Learn about oyster seasons and when our Texas Gulf oysters are at their peak. 
                Discover the best times to order and enjoy our premium oysters.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/gal1.jpg"
                alt="Oyster Season Guide - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Understanding oyster seasons is key to enjoying the best possible experience with our Texas Gulf oysters. 
                While our sustainable farming methods allow us to provide fresh oysters year-round, there are certain 
                times when our oysters are at their absolute peak in terms of flavor, texture, and quality.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Traditional "R" Rule</h2>
              <p className="mb-6">
                You may have heard the old saying about only eating oysters in months that contain the letter "R" 
                (September through April). While this rule had historical merit for wild oysters, our modern 
                sustainable farming practices and strict quality controls allow us to provide safe, delicious 
                oysters throughout the year.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Peak Season: Fall and Winter</h2>
              <p className="mb-6">
                Our Texas Gulf oysters are typically at their best during the cooler months from October through March. 
                During this time, the water temperature is ideal for oyster development, resulting in firmer texture, 
                cleaner taste, and optimal flavor profile. The cooler waters also mean less algae growth, which 
                contributes to the oysters' clean, briny taste.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Leaf className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Fall (October - November)</h3>
                    </div>
                    <p className="text-purple-700">
                      Perfect time for harvesting. Oysters are plump, flavorful, and have excellent texture. 
                      Ideal for both raw consumption and cooking.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Snowflake className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Winter (December - March)</h3>
                    </div>
                    <p className="text-purple-700">
                      Peak quality season. Cold water produces the cleanest, most flavorful oysters. 
                      Perfect for special occasions and holiday gatherings.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Spring and Summer Considerations</h2>
              <p className="mb-6">
                While spring and summer are traditionally considered "off-season" for oysters, our sustainable 
                farming methods and quality controls ensure that our oysters remain safe and delicious year-round. 
                However, you may notice some differences in texture and flavor during the warmer months.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-mintBrand/10 to-seafoamBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Sun className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Spring (April - May)</h3>
                    </div>
                    <p className="text-purple-700">
                      Oysters may be slightly softer but still delicious. Great for cooking and grilling. 
                      Perfect for spring celebrations and outdoor dining.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-lavenderBrand/10 to-purpleBrand/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Droplets className="w-8 h-8 text-purple-700 mr-3" />
                      <h3 className="text-xl font-bold text-purple-900">Summer (June - September)</h3>
                    </div>
                    <p className="text-purple-700">
                      Warmer waters may affect texture slightly, but our quality controls ensure safety. 
                      Excellent for cooked preparations and summer recipes.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Our Quality Guarantee</h2>
              <p className="mb-6">
                Regardless of the season, we maintain strict quality standards for all our oysters. We test water 
                quality regularly, monitor oyster health, and ensure proper handling throughout the year. Our 
                commitment to quality means you can enjoy our oysters with confidence any time of year.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Best Practices for Each Season</h2>
              <p className="mb-6">
                <strong>Fall & Winter:</strong> Perfect for raw consumption, on the half shell, or simple preparations 
                that let the natural flavor shine.<br/><br/>
                <strong>Spring & Summer:</strong> Ideal for cooked preparations, grilling, frying, or in recipes where 
                the oyster is part of a larger dish.
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Order with Confidence</h3>
                <p className="mb-4">
                  No matter the season, our fresh Texas Gulf oysters are carefully selected and handled to ensure 
                  the best possible quality. Order with confidence knowing that we maintain the highest standards 
                  year-round.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Fresh Oysters</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/contact">Ask About Seasonality</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/sustainable-aquaculture-commitment">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Sustainable Aquaculture
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/environmental-benefits-oyster-farming">
                Next: Environmental Benefits
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
