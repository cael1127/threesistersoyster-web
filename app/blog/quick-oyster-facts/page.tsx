import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight, Lightbulb, Fish, Waves, Leaf } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Quick Oyster Facts | Three Sisters Oyster Blog',
  description: 'Fun facts about Texas Gulf oysters! Bite-sized interesting facts perfect for Instagram stories. Learn about oyster nutrition, farming, and more.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/quick-oyster-facts' },
  openGraph: {
    title: 'Quick Oyster Facts | Three Sisters Oyster Blog',
    description: 'Fun facts about Texas Gulf oysters! Bite-sized interesting facts perfect for Instagram stories.',
    url: '/blog/quick-oyster-facts',
    type: 'article',
    images: [
      {
        url: '/oyster.png',
        width: 1200,
        height: 630,
        alt: 'Quick Oyster Facts - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Oyster Facts | Three Sisters Oyster Blog',
    description: 'Fun facts about Texas Gulf oysters! Perfect for Instagram!',
    images: ['/oyster.png'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const articleUrl = `${siteUrl}/blog/quick-oyster-facts`
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script id="article-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Quick Oyster Facts",
            "description": "Fun facts about Texas Gulf oysters! Bite-sized interesting facts perfect for Instagram stories. Learn about oyster nutrition, farming, and more.",
            "image": `${siteUrl}/oyster.png`,
            "datePublished": "2024-12-23",
            "dateModified": "2024-12-23",
            "author": {
              "@type": "Organization",
              "name": "Three Sisters Oyster Co.",
              "url": siteUrl
            },
            "publisher": {
              "@type": "Organization",
              "name": "Three Sisters Oyster Co.",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.jpg`
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": articleUrl
            },
            "articleSection": "Education",
            "keywords": ["oyster facts", "oyster nutrition", "oyster farming", "Texas oysters", "oyster trivia"]
          })
        }}
      />
      
      <Navigation />

      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8" role="main">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-purpleBrand/30">
            <div className="mb-6">
              <Badge className="bg-purpleBrand/90 text-white mb-3">Education</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 23, 2024
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4 leading-tight">
                Quick Oyster Facts
              </h1>
              <p className="text-lg text-purple-900 drop-shadow-sm">
                Bite-sized facts about Texas Gulf oysters! Perfect for sharing on Instagram stories.
              </p>
            </div>

            {/* Facts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <Fish className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="text-lg font-bold text-purple-900">Super Filter Feeders</h3>
                  </div>
                  <p className="text-purple-900 text-sm">
                    One oyster can filter up to 50 gallons of water per day! They're nature's water purifiers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blueBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <Lightbulb className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-bold text-purple-900">Nutrition Powerhouse</h3>
                  </div>
                  <p className="text-purple-900 text-sm">
                    Oysters are packed with zinc, vitamin B12, and protein. One of the most nutrient-dense foods!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-mintBrand/30 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <Waves className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-bold text-purple-900">Merroir Matters</h3>
                  </div>
                  <p className="text-purple-900 text-sm">
                    Like wine terroir, oysters have "merroir" - their flavor reflects the water they grow in!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-lavenderBrand/30 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <Leaf className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="text-lg font-bold text-purple-900">Carbon Sequestration</h3>
                  </div>
                  <p className="text-purple-900 text-sm">
                    Oyster shells are made of calcium carbonate, which helps sequester carbon from the environment.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* More Facts */}
            <div className="space-y-4 mb-6">
              <Card className="border-blueBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">Did You Know?</h3>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong className="text-purple-900">Oysters change gender!</strong> They can switch between male and female during their lifetime.</p>
                    <p><strong className="text-purple-900">Texas Gulf oysters</strong> are known for their briny, sweet flavor thanks to our unique water chemistry.</p>
                    <p><strong className="text-purple-900">One acre of oyster reef</strong> can filter up to 24 million gallons of water per day!</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-mintBrand/30 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">Texas Gulf Coast Facts</h3>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong className="text-purple-900">Port Lavaca waters</strong> provide the perfect salinity for premium oyster flavor.</p>
                    <p><strong className="text-purple-900">Keller Bay</strong> is one of the best locations for sustainable oyster farming in Texas.</p>
                    <p><strong className="text-purple-900">Our oysters</strong> are harvested at peak maturity for optimal taste and texture.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">Fun Size Facts</h3>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong className="text-purple-900">Petite oysters (2.5")</strong> are perfect for half-shell presentation and one-bite enjoyment.</p>
                    <p><strong className="text-purple-900">Oyster size</strong> affects flavor - smaller oysters are often sweeter and more tender.</p>
                    <p><strong className="text-purple-900">Our 2.5-inch petite</strong> size is carefully selected for the best balance of flavor and presentation.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
              <h3 className="text-xl font-bold text-purple-900 mb-3">Try Our Oysters</h3>
              <p className="text-purple-800 mb-4 text-sm">
                Now you know the facts! Experience fresh Texas Gulf oysters from Three Sisters Oyster Co.
              </p>
              <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                <Link href="/products">Order Fresh Oysters</Link>
              </Button>
            </div>
          </article>

          <div className="mt-8 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-freshness-checklist">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Freshness Checklist
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/why-texas-gulf-oysters-taste-different">
                Next: Why They Taste Different
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

