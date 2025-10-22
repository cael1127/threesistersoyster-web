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
  title: 'The Environmental Benefits of Oyster Farming | Three Sisters Oyster Blog',
  description: 'Learn how sustainable oyster farming helps clean our waters and support marine ecosystems. Discover the environmental impact of our Port Lavaca operations.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/environmental-benefits-oyster-farming' },
  openGraph: {
    title: 'The Environmental Benefits of Oyster Farming | Three Sisters Oyster Blog',
    description: 'Learn how sustainable oyster farming helps clean our waters and support marine ecosystems. Discover the environmental impact of our Port Lavaca operations.',
    url: '/blog/environmental-benefits-oyster-farming',
    type: 'article',
    images: [
      {
        url: '/topFarm.JPG',
        width: 1200,
        height: 630,
        alt: 'Sustainable Oyster Farming - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Environmental Benefits of Oyster Farming | Three Sisters Oyster Blog',
    description: 'Learn how sustainable oyster farming helps clean our waters and support marine ecosystems. Discover the environmental impact of our Port Lavaca operations.',
    images: ['/topFarm.JPG'],
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Sustainability</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                August 25, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                The Environmental Benefits of Oyster Farming
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Learn how sustainable oyster farming helps clean our waters and support marine ecosystems. 
                Discover the environmental impact of our Port Lavaca operations.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/topFarm.JPG"
                alt="Sustainable Oyster Farming - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                At Three Sisters Oyster, we're not just growing delicious seafood – we're actively contributing 
                to the health of our local ecosystem. Sustainable oyster farming provides numerous environmental 
                benefits that extend far beyond the dinner table, making it one of the most environmentally 
                responsible forms of aquaculture.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Natural Water Filtration</h2>
              <p className="mb-6">
                Oysters are nature's water purifiers. A single adult oyster can filter up to 50 gallons of 
                water per day, removing algae, sediment, and excess nutrients from the water column. Our 
                oyster farm in Keller Bay acts as a natural filtration system, helping to maintain water 
                clarity and quality for the entire ecosystem.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Habitat Creation</h2>
              <p className="mb-6">
                Our oyster farming structures create complex three-dimensional habitats that support a diverse 
                range of marine life. Fish, crabs, and other marine organisms use our oyster beds as shelter, 
                feeding grounds, and nursery areas. This biodiversity enhancement is crucial for maintaining 
                healthy marine ecosystems.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Carbon Sequestration</h2>
              <p className="mb-6">
                Oyster shells are composed primarily of calcium carbonate, which stores carbon dioxide from 
                the atmosphere. As oysters grow and their shells develop, they help sequester carbon, 
                contributing to climate change mitigation. Our sustainable farming practices ensure that 
                this carbon remains stored in the shells.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Erosion Prevention</h2>
              <p className="mb-6">
                Oyster reefs and farming structures help protect shorelines from erosion by reducing wave 
                energy and stabilizing sediments. This is particularly important in areas like the Texas 
                Gulf Coast, where coastal protection is essential for both human communities and wildlife habitats.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Nutrient Cycling</h2>
              <p className="mb-6">
                Our oyster farming operations help cycle nutrients through the ecosystem. Oysters consume 
                phytoplankton and other organic matter, converting it into biomass and shell material. 
                When oysters are harvested, they remove excess nutrients from the water, helping to prevent 
                harmful algal blooms and maintain water quality.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Sustainable Practices at Three Sisters</h2>
              <p className="mb-6">
                We've implemented several practices to maximize our environmental benefits while minimizing 
                our impact. Our off-bottom farming methods reduce disturbance to the seafloor, and we use 
                biodegradable materials wherever possible. We also participate in oyster shell recycling 
                programs to return shells to the water, where they can serve as substrate for new oyster growth.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Monitoring and Research</h2>
              <p className="mb-8">
                We regularly monitor water quality, biodiversity, and ecosystem health around our farm to 
                ensure our operations are having a positive impact. We also collaborate with local research 
                institutions to study the environmental benefits of oyster farming and develop even more 
                sustainable practices.
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Supporting Environmental Stewardship</h3>
                <p className="mb-4">
                  When you choose Three Sisters Oyster, you're not just getting premium seafood – you're 
                  supporting environmental conservation and sustainable aquaculture. Every oyster you enjoy 
                  represents a positive contribution to the health of our Gulf Coast ecosystem.
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
