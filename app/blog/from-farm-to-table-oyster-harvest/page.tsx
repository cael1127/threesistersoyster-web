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
  title: 'From Farm to Table: How We Harvest Our Oysters | Three Sisters Oyster Blog',
  description: 'Take a behind-the-scenes look at our sustainable oyster farming process. See how we grow, harvest, and prepare fresh Texas oysters for your table.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/from-farm-to-table-oyster-harvest' },
  openGraph: {
    title: 'From Farm to Table: How We Harvest Our Oysters | Three Sisters Oyster Blog',
    description: 'Take a behind-the-scenes look at our sustainable oyster farming process. See how we grow, harvest, and prepare fresh Texas oysters for your table.',
    url: '/blog/from-farm-to-table-oyster-harvest',
    type: 'article',
    images: [
      {
        url: '/nurserylog.JPEG',
        width: 1200,
        height: 630,
        alt: 'Oyster Nursery Process - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Farm to Table: How We Harvest Our Oysters | Three Sisters Oyster Blog',
    description: 'Take a behind-the-scenes look at our sustainable oyster farming process. See how we grow, harvest, and prepare fresh Texas oysters for your table.',
    images: ['/nurserylog.JPEG'],
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Process</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                September 8, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                From Farm to Table: How We Harvest Our Oysters
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Take a behind-the-scenes look at our sustainable oyster farming process. See how we grow, 
                harvest, and prepare fresh Texas oysters for your table.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/nurserylog.JPEG"
                alt="Oyster Nursery Process - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Ever wondered how those delicious oysters on your plate made their journey from the Gulf waters 
                to your table? At Three Sisters Oyster, we're proud to share our sustainable farming process 
                that ensures every oyster meets our high standards for quality and taste.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Nursery Stage</h2>
              <p className="mb-6">
                Our oyster journey begins in our carefully managed nursery. Here, we start with premium oyster 
                seed and nurture them through their most vulnerable early stages. Our nursery provides protection 
                from predators while allowing the oysters to develop their shells and feeding mechanisms in 
                the nutrient-rich waters of Keller Bay.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Growing in the Gulf</h2>
              <p className="mb-6">
                Once our oysters reach a certain size, we transfer them to our off-bottom farming systems in 
                the open waters of Keller Bay. This method allows the oysters to develop naturally while 
                protecting them from sediment and predators. The constant water flow ensures they receive 
                fresh nutrients and develop the firm texture and clean taste our customers love.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Quality Monitoring</h2>
              <p className="mb-6">
                Throughout the growing process, we regularly monitor water quality, oyster health, and growth 
                rates. Our team conducts daily checks to ensure optimal conditions and identify any issues 
                early. This attention to detail is what sets our oysters apart and ensures consistent quality 
                in every harvest.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Harvest Process</h2>
              <p className="mb-6">
                When our oysters reach the perfect size and maturity, our experienced team carefully harvests 
                them by hand. We select only the best oysters, checking each one for quality, size, and 
                shell integrity. This selective harvesting ensures that only premium oysters make it to our 
                customers.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Processing and Packaging</h2>
              <p className="mb-6">
                Immediately after harvest, our oysters are cleaned, sorted, and packaged in our on-site 
                processing facility. We use temperature-controlled environments to maintain freshness and 
                quality. Each package is carefully labeled with harvest dates and handling instructions to 
                ensure optimal quality when they reach your kitchen.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Sustainable Practices</h2>
              <p className="mb-8">
                Throughout our entire process, we maintain our commitment to sustainable aquaculture. Our 
                farming methods actually help improve water quality by filtering nutrients, and we use 
                environmentally friendly materials and practices. We believe that great-tasting oysters 
                and environmental responsibility go hand in hand.
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Experience Freshness</h3>
                <p className="mb-4">
                  Ready to taste the difference that our careful farming process makes? Our fresh Texas 
                  Gulf oysters are available for restaurants, events, and home delivery. Experience the 
                  quality that comes from sustainable, hands-on farming.
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
