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
  title: 'Oysters vs Other Seafood: Carbon Footprint Comparison | Three Sisters Oyster Blog',
  description: 'Compare the carbon footprint of oysters to other seafood options. Discover why oysters have the lowest environmental impact of any protein source.',
  keywords: [
    'oyster carbon footprint',
    'sustainable seafood comparison',
    'low carbon seafood',
    'oyster vs salmon carbon',
    'oyster vs tuna carbon',
    'environmental seafood impact',
    'carbon negative seafood',
    'sustainable protein'
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oysters-vs-other-seafood-carbon-footprint' },
  openGraph: {
    title: 'Oysters vs Other Seafood: Carbon Footprint Comparison',
    description: 'Compare the carbon footprint of oysters to other seafood options.',
    url: '/blog/oysters-vs-other-seafood-carbon-footprint',
    type: 'article',
    images: [{ url: '/oyster.png', width: 1200, height: 630, alt: 'Oyster Carbon Footprint Comparison' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oysters vs Other Seafood: Carbon Footprint Comparison',
    description: 'Compare the carbon footprint of oysters to other seafood options.',
    images: ['/oyster.png'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Oysters vs Other Seafood: Carbon Footprint Comparison',
        description: 'Compare the carbon footprint of oysters to other seafood options.',
        image: `${siteUrl}/oyster.png`,
        datePublished: '2025-01-05',
        author: { '@type': 'Organization', name: 'Three Sisters Oyster Co.' },
        publisher: { '@type': 'Organization', name: 'Three Sisters Oyster Co.', logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.jpg` } },
      }) }} />
      <Navigation />
      <main className="py-8 md:py-12 lg:py-20 px-4 sm:px-6 lg:px-8" role="main">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="ghost" className="text-purple-700 hover:text-purple-900">
              <Link href="/blog"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
            </Button>
          </div>
          <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purpleBrand/30">
            <div className="mb-8">
              <Badge className="bg-purpleBrand/90 text-white mb-4">Sustainability</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />January 5, 2025
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oysters vs Other Seafood: Carbon Footprint Comparison
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                When it comes to carbon footprint, oysters are in a league of their own. See how they compare to other popular seafood choices.
              </p>
            </div>
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image src="/oyster.png" alt="Oyster carbon footprint comparison" fill className="object-cover" quality={90} />
            </div>
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Making sustainable food choices means understanding the environmental impact of what we eat. When comparing seafood options, oysters consistently rank as the most climate-friendly choice. Here's how they stack up against other popular seafood.
              </p>
              <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 to-seafoamBrand/20 mb-8">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <div className="text-4xl md:text-5xl font-bold text-purple-900 mb-2">Lowest Carbon</div>
                  <p className="text-xl text-purple-800">Oysters have the smallest carbon footprint</p>
                </CardContent>
              </Card>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Carbon Footprint Rankings</h2>
              <p className="mb-6">
                Research shows that oysters have an incredibly low carbon footprint compared to other protein sources. Farmed salmon requires feed production and transportation. Tuna fishing involves fuel-intensive operations. Shrimp farming can involve habitat destruction. Oysters, by contrast, require no feed, sequester carbon, and improve water quality.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Why Oysters Win</h2>
              <p className="mb-6">
                Oysters don't just have a low carbon footprint - they're carbon negative. They remove more carbon from the atmosphere than they produce, making them one of the few foods that actively fight climate change while being produced.
              </p>
              <Card className="border-purpleBrand/30 bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">Make the Climate-Friendly Choice</h3>
                  <p className="text-purple-800 mb-6">Choose oysters and reduce your carbon footprint.</p>
                  <Button asChild size="lg" className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Low-Carbon Oysters</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}

