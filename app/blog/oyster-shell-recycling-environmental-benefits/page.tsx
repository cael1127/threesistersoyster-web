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
  title: 'Oyster Shell Recycling: Environmental Benefits | Three Sisters Oyster Blog',
  description: 'Learn how oyster shell recycling helps restore reefs, protect coastlines, and support marine ecosystems. Discover the environmental benefits of shell recycling programs.',
  keywords: [
    'oyster shell recycling',
    'shell recycling benefits',
    'oyster reef restoration',
    'shell recycling programs',
    'coastal protection',
    'marine habitat restoration',
    'sustainable shell use',
    'oyster shell reuse'
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-shell-recycling-environmental-benefits' },
  openGraph: {
    title: 'Oyster Shell Recycling: Environmental Benefits',
    description: 'Learn how oyster shell recycling helps restore reefs and protect coastlines.',
    url: '/blog/oyster-shell-recycling-environmental-benefits',
    type: 'article',
    images: [{ url: '/enviromentBlog.jpg', width: 1200, height: 630, alt: 'Oyster Shell Recycling' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Shell Recycling: Environmental Benefits',
    description: 'Learn how oyster shell recycling helps restore reefs and protect coastlines.',
    images: ['/enviromentBlog.jpg'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Oyster Shell Recycling: Environmental Benefits',
        description: 'Learn how oyster shell recycling helps restore reefs and protect coastlines.',
        image: `${siteUrl}/enviromentBlog.jpg`,
        datePublished: '2025-01-07',
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
              <Badge className="bg-seafoamBrand/90 text-white mb-4">Sustainability</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />January 7, 2025
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oyster Shell Recycling: Environmental Benefits
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Oyster shells don't have to be waste. Learn how shell recycling programs restore reefs, protect coastlines, and create new habitats for marine life.
              </p>
            </div>
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image src="/enviromentBlog.jpg" alt="Oyster shell recycling environmental benefits" fill className="object-cover" quality={90} />
            </div>
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                When you enjoy oysters, you're not just getting delicious seafood - you're also getting shells that can be recycled to benefit the environment. Oyster shell recycling programs turn what might be waste into valuable resources for reef restoration and coastal protection.
              </p>
              <Card className="border-seafoamBrand/30 bg-gradient-to-br from-seafoamBrand/20 to-blueBrand/20 mb-8">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🔄</div>
                  <div className="text-4xl md:text-5xl font-bold text-purple-900 mb-2">100% Recyclable</div>
                  <p className="text-xl text-purple-800">Every shell can be reused for restoration</p>
                </CardContent>
              </Card>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Reef Restoration</h2>
              <p className="mb-6">
                Recycled oyster shells are used to build new oyster reefs and restore damaged ones. These reefs provide habitat for marine life, improve water quality, and protect coastlines from erosion. It's a perfect example of circular economy principles in action.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Coastal Protection</h2>
              <p className="mb-6">
                Oyster reefs created from recycled shells act as natural breakwaters, reducing wave energy and protecting shorelines from erosion. This natural coastal defense is more sustainable and cost-effective than artificial structures.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Habitat Creation</h2>
              <p className="mb-6">
                Recycled shells create three-dimensional structures that support diverse marine ecosystems. Fish, crabs, and other organisms use these structures for shelter, feeding, and reproduction, increasing local biodiversity.
              </p>
              <Card className="border-seafoamBrand/30 bg-gradient-to-r from-seafoamBrand/20 to-blueBrand/20 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">Support Shell Recycling</h3>
                  <p className="text-purple-800 mb-6">Every oyster you enjoy can help restore the environment.</p>
                  <Button asChild size="lg" className="bg-seafoamBrand hover:bg-blueBrand text-white">
                    <Link href="/products">Order Oysters</Link>
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

