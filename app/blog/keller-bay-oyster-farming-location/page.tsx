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
  title: 'Why Keller Bay is Perfect for Oyster Farming | Three Sisters Oyster Blog',
  description: 'Discover why Keller Bay in Port Lavaca, Texas is the ideal location for growing premium oysters. Learn about water quality, salinity, and environmental conditions.',
  keywords: [
    'Keller Bay oysters',
    'Port Lavaca oyster farming',
    'Texas Gulf Coast oysters',
    'oyster farming location',
    'Keller Bay water quality',
    'Texas oyster farm location',
    'Gulf Coast aquaculture',
    'premium oyster location'
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/keller-bay-oyster-farming-location' },
  openGraph: {
    title: 'Why Keller Bay is Perfect for Oyster Farming',
    description: 'Discover why Keller Bay in Port Lavaca, Texas is the ideal location for growing premium oysters.',
    url: '/blog/keller-bay-oyster-farming-location',
    type: 'article',
    images: [{ url: '/topFarm.JPG', width: 1200, height: 630, alt: 'Keller Bay Oyster Farm' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Keller Bay is Perfect for Oyster Farming',
    description: 'Discover why Keller Bay in Port Lavaca, Texas is the ideal location for growing premium oysters.',
    images: ['/topFarm.JPG'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Why Keller Bay is Perfect for Oyster Farming',
        description: 'Discover why Keller Bay in Port Lavaca, Texas is the ideal location for growing premium oysters.',
        image: `${siteUrl}/topFarm.JPG`,
        datePublished: '2025-01-06',
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
              <Badge className="bg-blueBrand/90 text-white mb-4">Farming</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />January 6, 2025
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Why Keller Bay is Perfect for Oyster Farming
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Discover why Keller Bay in Port Lavaca, Texas provides the perfect conditions for growing premium Gulf Coast oysters with exceptional flavor and quality.
              </p>
            </div>
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image src="/topFarm.JPG" alt="Keller Bay oyster farm location" fill className="object-cover" quality={90} />
            </div>
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Location matters when it comes to oyster farming. The unique conditions of Keller Bay in Port Lavaca, Texas create the perfect environment for growing premium oysters with exceptional flavor profiles. Here's what makes this location special.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Pristine Water Quality</h2>
              <p className="mb-6">
                Keller Bay benefits from excellent water quality with the right balance of salinity, nutrients, and temperature. These conditions allow oysters to develop their signature briny, sweet flavor that chefs and seafood lovers prize.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Ideal Growing Conditions</h2>
              <p className="mb-6">
                The bay's protected location provides calm waters that are perfect for oyster farming structures. The consistent water flow brings nutrients while protecting oysters from harsh weather conditions, ensuring steady, healthy growth.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Environmental Benefits</h2>
              <p className="mb-6">
                Beyond growing great oysters, Keller Bay's location allows us to contribute to environmental restoration. Our farming operations improve water quality, create habitats, and support the local marine ecosystem.
              </p>
              <Card className="border-blueBrand/30 bg-gradient-to-r from-blueBrand/20 to-purpleBrand/20 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">Experience Keller Bay Oysters</h3>
                  <p className="text-purple-800 mb-6">Taste the difference that location makes.</p>
                  <Button asChild size="lg" className="bg-blueBrand hover:bg-purpleBrand text-white">
                    <Link href="/products">Order Premium Oysters</Link>
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

