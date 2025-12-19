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
  title: 'How Oysters Improve Water Quality: The Science Explained | Three Sisters Oyster Blog',
  description: 'Learn the science behind how oysters improve water quality. Discover how filter feeding removes pollutants, reduces algae, and creates cleaner marine environments.',
  keywords: [
    'oysters improve water quality',
    'oyster filtration science',
    'water quality oysters',
    'oyster filter feeding',
    'water purification oysters',
    'oyster ecosystem services',
    'marine water quality',
    'oyster environmental benefits'
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/how-oysters-improve-water-quality' },
  openGraph: {
    title: 'How Oysters Improve Water Quality: The Science Explained',
    description: 'Learn the science behind how oysters improve water quality.',
    url: '/blog/how-oysters-improve-water-quality',
    type: 'article',
    images: [{ url: '/enviromentBlog.jpg', width: 1200, height: 630, alt: 'Oysters Improving Water Quality' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Oysters Improve Water Quality: The Science Explained',
    description: 'Learn the science behind how oysters improve water quality.',
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
        headline: 'How Oysters Improve Water Quality: The Science Explained',
        description: 'Learn the science behind how oysters improve water quality.',
        image: `${siteUrl}/enviromentBlog.jpg`,
        datePublished: '2025-01-10',
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
              <Badge className="bg-blueBrand/90 text-white mb-4">Sustainability</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />January 10, 2025
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                How Oysters Improve Water Quality: The Science Explained
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Discover the fascinating science behind how oysters act as natural water purifiers, removing pollutants and improving ecosystem health.
              </p>
            </div>
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image src="/enviromentBlog.jpg" alt="Oysters improving water quality" fill className="object-cover" quality={90} />
            </div>
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Oysters are nature's most efficient water treatment system. Through their filter-feeding process, they remove particles, excess nutrients, and even some pollutants from the water column. Understanding this process helps explain why oyster farming is so beneficial for marine ecosystems.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Filter Feeding Process</h2>
              <p className="mb-6">
                Oysters draw water through their gills, where specialized cells capture particles as small as 2 microns. This includes phytoplankton, algae, suspended sediment, and excess nutrients. The efficiency of this process is remarkable - a single oyster can process 50 gallons of water per day.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Nutrient Removal</h2>
              <p className="mb-6">
                By consuming algae and phytoplankton, oysters remove excess nitrogen and phosphorus from the water. This helps prevent harmful algal blooms and maintains balanced nutrient levels, which is crucial for healthy marine ecosystems.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Sediment Reduction</h2>
              <p className="mb-6">
                Oysters also remove suspended particles and sediment from the water column, improving water clarity. Clearer water allows sunlight to penetrate deeper, supporting seagrass growth and photosynthesis.
              </p>
              <Card className="border-blueBrand/30 bg-gradient-to-r from-blueBrand/20 to-seafoamBrand/20 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">Support Water Quality</h3>
                  <p className="text-purple-800 mb-6">Choose oysters and help improve water quality.</p>
                  <Button asChild size="lg" className="bg-blueBrand hover:bg-seafoamBrand text-white">
                    <Link href="/products">Order Water-Purifying Oysters</Link>
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

