import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight, CheckCircle2, XCircle, Thermometer, Clock } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Oyster Storage Quick Guide | Three Sisters Oyster Blog',
  description: 'Quick tips for storing oysters properly. Keep your Texas Gulf oysters fresh with these essential storage guidelines. Perfect for Instagram sharing!',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-storage-quick-guide' },
  openGraph: {
    title: 'Oyster Storage Quick Guide | Three Sisters Oyster Blog',
    description: 'Quick tips for storing oysters properly. Keep your Texas Gulf oysters fresh with these essential storage guidelines.',
    url: '/blog/oyster-storage-quick-guide',
    type: 'article',
    images: [
      {
        url: '/oyster.png',
        width: 1200,
        height: 630,
        alt: 'Oyster Storage Quick Guide - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Storage Quick Guide | Three Sisters Oyster Blog',
    description: 'Quick tips for storing oysters properly. Keep your Texas Gulf oysters fresh!',
    images: ['/oyster.png'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const articleUrl = `${siteUrl}/blog/oyster-storage-quick-guide`
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script id="article-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Oyster Storage Quick Guide",
            "description": "Quick tips for storing oysters properly. Keep your Texas Gulf oysters fresh with these essential storage guidelines.",
            "image": `${siteUrl}/oyster.png`,
            "datePublished": "2024-12-20",
            "dateModified": "2024-12-20",
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
            "articleSection": "Process",
            "keywords": ["oyster storage", "oyster handling", "fresh oysters", "oyster tips", "Texas oysters"]
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
              <Badge className="bg-purpleBrand/90 text-white mb-3">Process</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 20, 2024
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4 leading-tight">
                Oyster Storage Quick Guide
              </h1>
              <p className="text-lg text-purple-900 drop-shadow-sm">
                Keep your Texas Gulf oysters fresh with these essential storage tips. Quick, easy, and Instagram-worthy!
              </p>
            </div>

            {/* Quick Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="border-blueBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <Thermometer className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-bold text-purple-900">Temperature</h3>
                  </div>
                  <p className="text-purple-900 font-semibold text-2xl mb-2">35-40°F</p>
                  <p className="text-sm text-purple-700">Keep them cold, but not frozen!</p>
                </CardContent>
              </Card>

              <Card className="border-mintBrand/30 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <Clock className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-bold text-purple-900">Freshness</h3>
                  </div>
                  <p className="text-purple-900 font-semibold text-2xl mb-2">3-5 Days</p>
                  <p className="text-sm text-purple-700">Best quality within first few days</p>
                </CardContent>
              </Card>
            </div>

            {/* Do's and Don'ts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-5">
                  <div className="flex items-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="text-lg font-bold text-green-900">Do This</h3>
                  </div>
                  <ul className="text-green-800 text-sm space-y-2">
                    <li>• Store on ice in a colander</li>
                    <li>• Keep cupped side down</li>
                    <li>• Drain melted ice daily</li>
                    <li>• Store in coldest part of fridge</li>
                    <li>• Handle gently</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-5">
                  <div className="flex items-center mb-4">
                    <XCircle className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="text-lg font-bold text-red-900">Don't Do This</h3>
                  </div>
                  <ul className="text-red-800 text-sm space-y-2">
                    <li>• Don't store in airtight containers</li>
                    <li>• Don't submerge in fresh water</li>
                    <li>• Don't freeze live oysters</li>
                    <li>• Don't store at room temp</li>
                    <li>• Don't use cracked shells</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Quick Steps */}
            <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Quick Storage Steps</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-purpleBrand text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                    <p className="text-purple-900">Place oysters in a colander or perforated container</p>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-purpleBrand text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                    <p className="text-purple-900">Set over a bowl to catch melting ice</p>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-purpleBrand text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                    <p className="text-purple-900">Cover with crushed ice</p>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-purpleBrand text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                    <p className="text-purple-900">Keep in coldest part of refrigerator</p>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-purpleBrand text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                    <p className="text-purple-900">Drain and refresh ice daily</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Freshness Check */}
            <Card className="border-mintBrand/30 bg-gradient-to-br from-mintBrand/10 to-seafoamBrand/10 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Freshness Check</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-purple-900">Tight shells</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-purple-900">Heavy weight</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-purple-900">Ocean smell</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-purple-900">Clear liquid</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
              <h3 className="text-xl font-bold text-purple-900 mb-3">Ready for Fresh Oysters?</h3>
              <p className="text-purple-800 mb-4 text-sm">
                Now you know how to store them properly! Order fresh Texas Gulf oysters and keep them at peak quality.
              </p>
              <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                <Link href="/products">Order Fresh Oysters</Link>
              </Button>
            </div>
          </article>

          <div className="mt-8 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-storage-handling">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Full Storage Guide
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/petite-oysters-2-5-inches">
                Next: Petite Oysters
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

