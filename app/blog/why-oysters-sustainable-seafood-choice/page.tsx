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
  title: 'Why Oysters Are the Most Sustainable Seafood Choice | Three Sisters Oyster Blog',
  description: 'Discover why oysters are the most sustainable seafood option. Learn about their low environmental footprint, regenerative farming, and comparison to other seafood choices.',
  keywords: [
    'sustainable seafood',
    'oysters sustainable',
    'eco-friendly seafood',
    'sustainable aquaculture',
    'regenerative seafood',
    'low impact seafood',
    'sustainable food choice',
    'environmental seafood'
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/why-oysters-sustainable-seafood-choice' },
  openGraph: {
    title: 'Why Oysters Are the Most Sustainable Seafood Choice',
    description: 'Discover why oysters are the most sustainable seafood option with low environmental footprint.',
    url: '/blog/why-oysters-sustainable-seafood-choice',
    type: 'article',
    images: [
      {
        url: '/oyster.png',
        width: 1200,
        height: 630,
        alt: 'Sustainable Oyster Seafood Choice - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Oysters Are the Most Sustainable Seafood Choice',
    description: 'Discover why oysters are the most sustainable seafood option.',
    images: ['/oyster.png'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const publishDate = '2024-12-31'

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Why Oysters Are the Most Sustainable Seafood Choice',
            description: 'Discover why oysters are the most sustainable seafood option.',
            image: `${siteUrl}/oyster.png`,
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
              <Badge className="bg-mintBrand/90 text-white mb-4">Sustainability</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 31, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Why Oysters Are the Most Sustainable Seafood Choice
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                When it comes to sustainable seafood, oysters stand out as the clear winner. Discover why 
                oysters have the lowest environmental footprint of any seafood and how they actually improve 
                the environment while being produced.
              </p>
            </div>

            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/oyster.png"
                alt="Sustainable oyster seafood choice"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                In a world increasingly concerned about food sustainability and environmental impact, choosing 
                the right seafood can feel overwhelming. But there's one clear winner: oysters. Oysters are 
                not just sustainable – they're regenerative, meaning they actually improve the environment 
                while being produced. Here's why oysters are the most sustainable seafood choice you can make.
              </p>

              <Card className="border-mintBrand/30 bg-gradient-to-br from-mintBrand/20 to-seafoamBrand/20 mb-8">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">💚</div>
                  <div className="text-4xl md:text-5xl font-bold text-purple-900 mb-2">#1 Sustainable</div>
                  <p className="text-xl text-purple-800">Lowest environmental impact of all seafood</p>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Zero Feed Required</h2>
              <p className="mb-6">
                Unlike farmed fish that require massive amounts of feed (often made from wild-caught fish), 
                oysters are filter feeders that eat naturally occurring plankton and algae. They require zero 
                additional feed, eliminating the environmental cost of feed production and transportation. 
                This makes oysters incredibly efficient at converting natural resources into food.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Regenerative, Not Just Sustainable</h2>
              <p className="mb-6">
                Most sustainable foods simply minimize harm. Oysters go further – they actively improve the 
                environment. They filter water, sequester carbon, create habitats, and support biodiversity. 
                When you choose oysters, you're supporting a food production system that makes the environment 
                better, not just less bad.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-seafoamBrand/30 bg-gradient-to-br from-seafoamBrand/20 to-mintBrand/20">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">✅</div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Zero Feed</h3>
                    <p className="text-purple-800">No additional feed required</p>
                  </CardContent>
                </Card>
                <Card className="border-mintBrand/30 bg-gradient-to-br from-mintBrand/20 to-seafoamBrand/20">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">♻️</div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Regenerative</h3>
                    <p className="text-purple-800">Improves the environment</p>
                  </CardContent>
                </Card>
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 to-blueBrand/20">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">🌍</div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Low Impact</h3>
                    <p className="text-purple-800">Minimal carbon footprint</p>
                  </CardContent>
                </Card>
                <Card className="border-blueBrand/30 bg-gradient-to-br from-blueBrand/20 to-purpleBrand/20">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">💧</div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Water Quality</h3>
                    <p className="text-purple-800">Cleans water naturally</p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Comparison to Other Seafood</h2>
              <p className="mb-6">
                When compared to other seafood options, oysters consistently rank as the most sustainable choice. 
                Farmed salmon requires large amounts of feed and can impact local ecosystems. Tuna fishing 
                contributes to overfishing and bycatch. Shrimp farming often involves habitat destruction. 
                Oysters, by contrast, require no feed, create habitat, and improve water quality.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Low Carbon Footprint</h2>
              <p className="mb-6">
                Oysters have an incredibly low carbon footprint compared to other protein sources. They require 
                no feed production, minimal transportation (often grown locally), and actually sequester carbon 
                as they grow. This makes oysters one of the most climate-friendly protein choices available.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Making the Right Choice</h2>
              <p className="mb-6">
                When you choose oysters from Three Sisters Oyster Co., you're making the most sustainable 
                seafood choice possible. You're supporting regenerative aquaculture that improves the environment 
                while providing delicious, nutritious food. It's a choice that's good for you, good for the 
                planet, and good for future generations.
              </p>

              <Card className="border-mintBrand/30 bg-gradient-to-r from-mintBrand/20 to-seafoamBrand/20 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">
                    Choose the Most Sustainable Seafood
                  </h3>
                  <p className="text-purple-800 mb-6">
                    Make the best choice for the planet – choose regenerative oysters.
                  </p>
                  <Button asChild size="lg" className="bg-mintBrand hover:bg-seafoamBrand text-white">
                    <Link href="/products">Order Sustainable Oysters</Link>
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
                    <div className="text-sm text-purple-700">Fighting climate change</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-purple-600" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 justify-start border-purpleBrand/30">
                <Link href="/blog/oyster-farming-ocean-restoration">
                  <div>
                    <div className="font-bold text-purple-900 mb-2">Ocean Restoration</div>
                    <div className="text-sm text-purple-700">Rebuilding ecosystems</div>
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

