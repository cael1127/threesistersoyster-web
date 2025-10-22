import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight, CheckCircle, Leaf, Waves, Heart } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'Sustainable Aquaculture: Our Commitment to the Gulf | Three Sisters Oyster Blog',
  description: 'Explore our commitment to sustainable aquaculture practices and how we\'re working to protect and preserve the Texas Gulf Coast ecosystem.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/sustainable-aquaculture-commitment' },
  openGraph: {
    title: 'Sustainable Aquaculture: Our Commitment to the Gulf | Three Sisters Oyster Blog',
    description: 'Explore our commitment to sustainable aquaculture practices and how we\'re working to protect and preserve the Texas Gulf Coast ecosystem.',
    url: '/blog/sustainable-aquaculture-commitment',
    type: 'article',
    images: [
      {
        url: '/gal2.jpg',
        width: 1200,
        height: 630,
        alt: 'Sustainable Aquaculture - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sustainable Aquaculture: Our Commitment to the Gulf | Three Sisters Oyster Blog',
    description: 'Explore our commitment to sustainable aquaculture practices and how we\'re working to protect and preserve the Texas Gulf Coast ecosystem.',
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Sustainability</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                August 10, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Sustainable Aquaculture: Our Commitment to the Gulf
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Explore our commitment to sustainable aquaculture practices and how we're working to protect 
                and preserve the Texas Gulf Coast ecosystem.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/gal2.jpg"
                alt="Sustainable Aquaculture - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                At Three Sisters Oyster, sustainability isn't just a buzzword – it's the foundation of everything we do. 
                Our commitment to sustainable aquaculture goes beyond producing delicious oysters; we're dedicated to 
                protecting and enhancing the Texas Gulf Coast ecosystem for future generations.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Our Environmental Mission</h2>
              <p className="mb-6">
                We believe that the best oysters come from the healthiest waters. That's why our environmental mission 
                focuses on three core principles: protecting water quality, preserving marine biodiversity, and 
                supporting the long-term health of the Gulf Coast ecosystem.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-purple-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-purple-900 mb-3">Water Protection</h3>
                    <p className="text-purple-700">
                      Regular water quality monitoring and testing to ensure our farming practices maintain 
                      the pristine condition of Keller Bay.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10">
                  <CardContent className="p-6 text-center">
                    <Leaf className="w-12 h-12 text-purple-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-purple-900 mb-3">Ecosystem Health</h3>
                    <p className="text-purple-700">
                      Our oyster farming actually improves water quality by filtering nutrients and providing 
                      habitat for marine life.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-mintBrand/10 to-seafoamBrand/10">
                  <CardContent className="p-6 text-center">
                    <Waves className="w-12 h-12 text-purple-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-purple-900 mb-3">Marine Conservation</h3>
                    <p className="text-purple-700">
                      Supporting local marine conservation efforts and working with researchers to advance 
                      sustainable aquaculture science.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Sustainable Farming Practices</h2>
              <p className="mb-6">
                Our farming methods are designed to work with nature, not against it. We use off-bottom farming 
                techniques that minimize impact on the seafloor while maximizing the environmental benefits of 
                our operations.
              </p>

              <h3 className="text-xl font-bold text-purple-900 mt-6 mb-4">Off-Bottom Farming</h3>
              <p className="mb-6">
                Unlike traditional bottom culture, our off-bottom farming methods keep oysters suspended in the 
                water column. This approach reduces sediment disturbance, prevents oyster mortality from 
                predators, and allows for better water flow and nutrient exchange.
              </p>

              <h3 className="text-xl font-bold text-purple-900 mt-6 mb-4">Biodegradable Materials</h3>
              <p className="mb-6">
                We use biodegradable materials wherever possible in our farming operations. Our nets, lines, 
                and other equipment are designed to break down naturally over time, leaving no lasting impact 
                on the marine environment.
              </p>

              <h3 className="text-xl font-bold text-purple-900 mt-6 mb-4">Selective Harvesting</h3>
              <p className="mb-6">
                Our harvesting practices are designed to maintain the health of the oyster population. We 
                carefully select mature oysters for harvest while leaving younger ones to continue growing, 
                ensuring a sustainable population for future seasons.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Community and Research Partnerships</h2>
              <p className="mb-6">
                We believe in the power of collaboration to advance sustainable aquaculture. We work closely 
                with local universities, marine research institutions, and conservation organizations to 
                develop and implement best practices for sustainable oyster farming.
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20 my-8">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Research and Innovation</h3>
                <p className="mb-4">
                  We actively participate in research programs focused on sustainable aquaculture, water quality 
                  monitoring, and marine ecosystem health. Our farm serves as a living laboratory for 
                  developing new techniques and technologies.
                </p>
                <ul className="list-disc list-inside text-purple-700 space-y-2">
                  <li>Water quality monitoring and data collection</li>
                  <li>Oyster health and growth studies</li>
                  <li>Marine biodiversity assessments</li>
                  <li>Ecosystem impact evaluations</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Our Future Vision</h2>
              <p className="mb-6">
                Looking ahead, we're committed to continuing our leadership in sustainable aquaculture. We're 
                exploring new technologies and methods that will further reduce our environmental impact while 
                improving the quality and sustainability of our oyster production.
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Join Our Mission</h3>
                <p className="mb-4">
                  When you choose Three Sisters Oyster, you're not just buying delicious seafood – you're 
                  supporting sustainable aquaculture and environmental conservation. Every oyster you enjoy 
                  represents our commitment to protecting the Gulf Coast ecosystem.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Sustainable Oysters</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/about">Learn About Our Practices</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/top-5-oyster-recipes-summer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Top 5 Oyster Recipes
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-season-guide-texas">
                Next: Oyster Season Guide
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
