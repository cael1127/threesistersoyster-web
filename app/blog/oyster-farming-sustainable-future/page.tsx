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
  title: 'Oyster Farming: The Future of Sustainable Food | Three Sisters Oyster Blog',
  description: 'Explore how oyster farming represents the future of sustainable food production. Learn about regenerative aquaculture and its role in feeding the world.',
  keywords: [
    'sustainable food future',
    'regenerative aquaculture',
    'future of seafood',
    'sustainable food production',
    'oyster farming future',
    'regenerative farming',
    'sustainable protein',
    'future food systems'
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-farming-sustainable-future' },
  openGraph: {
    title: 'Oyster Farming: The Future of Sustainable Food',
    description: 'Explore how oyster farming represents the future of sustainable food production.',
    url: '/blog/oyster-farming-sustainable-future',
    type: 'article',
    images: [{ url: '/topFarm.JPG', width: 1200, height: 630, alt: 'Future of Sustainable Oyster Farming' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Farming: The Future of Sustainable Food',
    description: 'Explore how oyster farming represents the future of sustainable food production.',
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
        headline: 'Oyster Farming: The Future of Sustainable Food',
        description: 'Explore how oyster farming represents the future of sustainable food production.',
        image: `${siteUrl}/topFarm.JPG`,
        datePublished: '2025-01-09',
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
                <Calendar className="w-4 h-4 mr-2" />January 9, 2025
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oyster Farming: The Future of Sustainable Food
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                As the world seeks sustainable solutions to feed a growing population, oyster farming offers a model for the future of food production.
              </p>
            </div>
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image src="/topFarm.JPG" alt="Future of sustainable oyster farming" fill className="object-cover" quality={90} />
            </div>
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                The future of food production must be sustainable, efficient, and environmentally positive. Oyster farming represents a model that achieves all three goals, making it a crucial part of the future of sustainable food systems.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">A Regenerative Model</h2>
              <p className="mb-6">
                Unlike most food production that degrades the environment, oyster farming improves it. This regenerative model is what the future of food must look like - producing nutrition while restoring ecosystems.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Scalable and Efficient</h2>
              <p className="mb-6">
                Oyster farming can be scaled to meet growing demand while maintaining environmental benefits. As technology and techniques improve, oyster farming becomes even more efficient and sustainable.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Climate Solutions</h2>
              <p className="mb-6">
                With the ability to sequester carbon and improve water quality, oyster farming addresses multiple climate challenges simultaneously. This makes it an essential part of climate-smart food production.
              </p>
              <Card className="border-seafoamBrand/30 bg-gradient-to-r from-seafoamBrand/20 to-blueBrand/20 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">Be Part of the Future</h3>
                  <p className="text-purple-800 mb-6">Choose sustainable oysters and support the future of food.</p>
                  <Button asChild size="lg" className="bg-seafoamBrand hover:bg-blueBrand text-white">
                    <Link href="/products">Order Sustainable Oysters</Link>
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

