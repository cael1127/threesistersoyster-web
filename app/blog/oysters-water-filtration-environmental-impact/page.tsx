import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'One Oyster Filters 50 Gallons of Water Per Day: The Environmental Impact | Three Sisters Oyster Blog',
  description: 'Discover how oysters filter water and improve water quality. Learn about the impressive environmental impact of oyster filtration and how it benefits marine ecosystems.',
  keywords: [
    'oyster water filtration',
    'oysters filter water',
    'water quality oysters',
    'oyster environmental impact',
    'marine ecosystem restoration',
    'oyster filtration benefits',
    'water purification oysters',
    'sustainable aquaculture water'
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oysters-water-filtration-environmental-impact' },
  openGraph: {
    title: 'One Oyster Filters 50 Gallons of Water Per Day: The Environmental Impact',
    description: 'Discover how oysters filter water and improve water quality. Learn about the impressive environmental impact of oyster filtration.',
    url: '/blog/oysters-water-filtration-environmental-impact',
    type: 'article',
    images: [
      {
        url: '/enviromentBlog.jpg',
        width: 1200,
        height: 630,
        alt: 'Oyster Water Filtration - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Oyster Filters 50 Gallons of Water Per Day: The Environmental Impact',
    description: 'Discover how oysters filter water and improve water quality.',
    images: ['/enviromentBlog.jpg'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const publishDate = '2024-12-29'

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'One Oyster Filters 50 Gallons of Water Per Day: The Environmental Impact',
            description: 'Discover how oysters filter water and improve water quality.',
            image: `${siteUrl}/enviromentBlog.jpg`,
            datePublished: publishDate,
            author: {
              '@type': 'Organization',
              name: 'Three Sisters Oyster Co.',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Three Sisters Oyster Co.',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.jpg`,
              },
            },
          }),
        }}
      />
      <Navigation />

      <main className="py-8 md:py-12 lg:py-20 px-4 sm:px-6 lg:px-8" role="main">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="ghost" className="text-purple-700 hover:text-purple-900">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purpleBrand/30">
            <div className="mb-8">
              <Badge className="bg-seafoamBrand/90 text-white mb-4">Sustainability</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 29, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                One Oyster Filters 50 Gallons of Water Per Day: The Environmental Impact
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Oysters are nature's most efficient water purifiers. Discover how these incredible bivalves 
                filter massive amounts of water daily, removing pollutants and improving ecosystem health.
              </p>
            </div>

            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/enviromentBlog.jpg"
                alt="Oysters filtering water in Keller Bay"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Imagine a natural water treatment system that runs 24/7, requires no electricity, and actually 
                improves over time. That's exactly what oysters do. A single adult oyster can filter up to 50 
                gallons of water per day, removing algae, sediment, excess nutrients, and even some pollutants 
                from the water column. At Three Sisters Oyster Co., our farm operations in Keller Bay create 
                a natural filtration system that benefits the entire ecosystem.
              </p>

              <Card className="border-seafoamBrand/30 bg-gradient-to-br from-seafoamBrand/20 to-blueBrand/20 mb-8">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">💧</div>
                  <div className="text-4xl md:text-5xl font-bold text-purple-900 mb-2">50 Gallons</div>
                  <p className="text-xl text-purple-800">Filtered per oyster, every single day</p>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">How Oysters Filter Water</h2>
              <p className="mb-6">
                Oysters are filter feeders, meaning they draw water through their gills to extract food particles. 
                As water passes through, oysters capture phytoplankton, algae, suspended particles, and excess 
                nutrients. This natural filtration process improves water clarity, reduces harmful algal blooms, 
                and helps maintain balanced nutrient levels in the ecosystem.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Cumulative Impact</h2>
              <p className="mb-6">
                When you consider that our oyster farm contains thousands of oysters, the cumulative filtration 
                capacity becomes staggering. Our operations in Keller Bay filter millions of gallons of water 
                daily, creating cleaner, healthier water for all marine life. This natural water treatment 
                benefits fish, crabs, and other organisms that depend on clean water for survival.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <Card className="border-blueBrand/30 bg-gradient-to-br from-blueBrand/20 to-seafoamBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🌊</div>
                    <div className="text-2xl font-bold text-purple-900 mb-2">Millions</div>
                    <p className="text-purple-800">Gallons filtered daily by our farm</p>
                  </CardContent>
                </Card>
                <Card className="border-seafoamBrand/30 bg-gradient-to-br from-seafoamBrand/20 to-blueBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🌱</div>
                    <div className="text-2xl font-bold text-purple-900 mb-2">Natural</div>
                    <p className="text-purple-800">No chemicals or energy required</p>
                  </CardContent>
                </Card>
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 to-seafoamBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🐟</div>
                    <div className="text-2xl font-bold text-purple-900 mb-2">Ecosystem</div>
                    <p className="text-purple-800">Benefits all marine life</p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Water Quality Improvements</h2>
              <p className="mb-6">
                The filtration provided by oysters leads to measurable improvements in water quality. Clearer water 
                allows sunlight to penetrate deeper, supporting seagrass growth and photosynthesis. Reduced nutrient 
                levels help prevent harmful algal blooms that can devastate marine ecosystems. The result is a 
                healthier, more balanced ecosystem that supports greater biodiversity.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Why This Matters</h2>
              <p className="mb-6">
                In an era where water quality is increasingly threatened by pollution and nutrient runoff, oysters 
                offer a natural, sustainable solution. By choosing oysters from Three Sisters Oyster Co., you're 
                supporting a food production system that actively improves water quality while providing delicious, 
                nutritious seafood. It's a win-win for both your health and the environment.
              </p>

              <Card className="border-seafoamBrand/30 bg-gradient-to-r from-seafoamBrand/20 to-blueBrand/20 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">
                    Support Natural Water Filtration
                  </h3>
                  <p className="text-purple-800 mb-6">
                    Choose oysters and help improve water quality in Keller Bay and beyond.
                  </p>
                  <Button asChild size="lg" className="bg-seafoamBrand hover:bg-blueBrand text-white">
                    <Link href="/products">Order Filter-Fed Oysters</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </article>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-purple-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button asChild variant="outline" className="h-auto p-6 justify-start border-purpleBrand/30">
                <Link href="/blog/oysters-carbon-sequestration-climate-change">
                  <div>
                    <div className="font-bold text-purple-900 mb-2">Carbon Sequestration</div>
                    <div className="text-sm text-purple-700">How oysters fight climate change</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-purple-600" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 justify-start border-purpleBrand/30">
                <Link href="/blog/oyster-farming-ocean-restoration">
                  <div>
                    <div className="font-bold text-purple-900 mb-2">Ocean Restoration</div>
                    <div className="text-sm text-purple-700">Rebuilding marine ecosystems</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-purple-600" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

