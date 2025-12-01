import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Oyster Freshness Checklist | Three Sisters Oyster Blog',
  description: 'Quick checklist to verify oyster freshness. Know what to look for when buying or using Texas Gulf oysters. Perfect for Instagram carousel!',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-freshness-checklist' },
  openGraph: {
    title: 'Oyster Freshness Checklist | Three Sisters Oyster Blog',
    description: 'Quick checklist to verify oyster freshness. Know what to look for when buying or using Texas Gulf oysters.',
    url: '/blog/oyster-freshness-checklist',
    type: 'article',
    images: [
      {
        url: '/oyster.png',
        width: 1200,
        height: 630,
        alt: 'Oyster Freshness Checklist - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Freshness Checklist | Three Sisters Oyster Blog',
    description: 'Quick checklist to verify oyster freshness. Perfect for Instagram!',
    images: ['/oyster.png'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const articleUrl = `${siteUrl}/blog/oyster-freshness-checklist`
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script id="article-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Oyster Freshness Checklist",
            "description": "Quick checklist to verify oyster freshness. Know what to look for when buying or using Texas Gulf oysters.",
            "image": `${siteUrl}/oyster.png`,
            "datePublished": "2024-12-22",
            "dateModified": "2024-12-22",
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
            "keywords": ["oyster freshness", "fresh oysters", "oyster quality", "oyster checklist", "Texas oysters"]
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
                December 22, 2024
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4 leading-tight">
                Oyster Freshness Checklist
              </h1>
              <p className="text-lg text-purple-900 drop-shadow-sm">
                Use this quick checklist to verify your oysters are fresh and safe. Perfect for Instagram carousel sharing!
              </p>
            </div>

            {/* Freshness Indicators */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-bold text-green-900">Fresh Oyster Signs</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-900">Tight Shells</p>
                      <p className="text-sm text-green-700">Shells should be closed or close when tapped</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-900">Heavy Weight</p>
                      <p className="text-sm text-green-700">Fresh oysters feel heavy for their size</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-900">Ocean Smell</p>
                      <p className="text-sm text-green-700">Should smell fresh like the ocean, not fishy</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-900">Clean Shells</p>
                      <p className="text-sm text-green-700">No cracks, chips, or damage</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-900">Clear Liquid</p>
                      <p className="text-sm text-green-700">When opened, liquid should be clear, not cloudy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warning Signs */}
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-pink-50 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <XCircle className="w-6 h-6 text-red-600 mr-2" />
                  <h3 className="text-xl font-bold text-red-900">Warning Signs - Don't Use</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900">Open Shells</p>
                      <p className="text-sm text-red-700">Oysters that don't close when tapped are dead</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900">Bad Odor</p>
                      <p className="text-sm text-red-700">Fishy, ammonia, or rotten smell</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900">Cloudy Liquid</p>
                      <p className="text-sm text-red-700">Indicates the oyster may be spoiled</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900">Light Weight</p>
                      <p className="text-sm text-red-700">May indicate the oyster has died and dried out</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900">Cracked Shells</p>
                      <p className="text-sm text-red-700">Can allow bacteria to enter</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Test */}
            <Card className="border-blueBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-bold text-purple-900">The Tap Test</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/80 rounded-lg p-4">
                    <p className="font-semibold text-purple-900 mb-2">How to Test:</p>
                    <ol className="text-sm text-purple-700 space-y-1 list-decimal list-inside">
                      <li>Gently tap the shell with your finger</li>
                      <li>Fresh oysters will close tightly</li>
                      <li>If it stays open, the oyster is dead - discard it</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visual Checklist */}
            <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4 text-center">Quick Visual Checklist</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-white/80 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-purple-900">Tight</p>
                  </div>
                  <div className="text-center p-3 bg-white/80 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-purple-900">Heavy</p>
                  </div>
                  <div className="text-center p-3 bg-white/80 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-purple-900">Clean</p>
                  </div>
                  <div className="text-center p-3 bg-white/80 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-purple-900">Fresh Smell</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
              <h3 className="text-xl font-bold text-purple-900 mb-3">Get Fresh Oysters</h3>
              <p className="text-purple-800 mb-4 text-sm">
                Now you know how to check for freshness! Order fresh Texas Gulf oysters from Three Sisters Oyster Co.
              </p>
              <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                <Link href="/products">Order Fresh Oysters</Link>
              </Button>
            </div>
          </article>

          <div className="mt-8 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/petite-oysters-2-5-inches">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Petite Oysters
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/quick-oyster-facts">
                Next: Quick Facts
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

