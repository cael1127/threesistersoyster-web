import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight, Ruler, Star, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Petite Oysters: Perfect 2.5 Inches | Three Sisters Oyster Blog',
  description: 'Discover our petite 2.5-inch oysters - perfectly sized for half-shell presentation. Learn why size matters and what makes these oysters special.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/petite-oysters-2-5-inches' },
  openGraph: {
    title: 'Petite Oysters: Perfect 2.5 Inches | Three Sisters Oyster Blog',
    description: 'Discover our petite 2.5-inch oysters - perfectly sized for half-shell presentation. Learn why size matters!',
    url: '/blog/petite-oysters-2-5-inches',
    type: 'article',
    images: [
      {
        url: '/oyster.png',
        width: 1200,
        height: 630,
        alt: 'Petite 2.5 Inch Oysters - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petite Oysters: Perfect 2.5 Inches | Three Sisters Oyster Blog',
    description: 'Discover our petite 2.5-inch oysters - perfectly sized for half-shell presentation!',
    images: ['/oyster.png'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const articleUrl = `${siteUrl}/blog/petite-oysters-2-5-inches`
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script id="article-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Petite Oysters: Perfect 2.5 Inches",
            "description": "Discover our petite 2.5-inch oysters - perfectly sized for half-shell presentation. Learn why size matters and what makes these oysters special.",
            "image": `${siteUrl}/oyster.png`,
            "datePublished": "2024-12-21",
            "dateModified": "2024-12-21",
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
            "articleSection": "Product",
            "keywords": ["petite oysters", "2.5 inch oysters", "half-shell oysters", "oyster size", "Texas oysters"]
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
              <Badge className="bg-purpleBrand/90 text-white mb-3">Product</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 21, 2024
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4 leading-tight">
                Petite Oysters: Perfect 2.5 Inches
              </h1>
              <p className="text-lg text-purple-900 drop-shadow-sm">
                Size matters! Our petite oysters are perfectly sized at 2.5 inches - ideal for half-shell presentation and maximum flavor.
              </p>
            </div>

            {/* Size Highlight */}
            <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 to-lavenderBrand/20 mb-8">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Ruler className="w-12 h-12 text-purple-700 mr-3" />
                  <div>
                    <p className="text-5xl font-bold text-purple-900">2.5"</p>
                    <p className="text-lg text-purple-700">Perfect Size</p>
                  </div>
                </div>
                <p className="text-purple-900 font-semibold text-lg">
                  Our petite oysters are precisely 2.5 inches - the sweet spot for flavor and presentation!
                </p>
              </CardContent>
            </Card>

            {/* Why Size Matters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-blueBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="p-5 text-center">
                  <Star className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Perfect Bite</h3>
                  <p className="text-sm text-purple-700">2.5 inches is the ideal size for one perfect bite - not too big, not too small!</p>
                </CardContent>
              </Card>

              <Card className="border-mintBrand/30 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-5 text-center">
                  <Sparkles className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Visual Appeal</h3>
                  <p className="text-sm text-purple-700">Perfectly sized for elegant half-shell presentation on any plate.</p>
                </CardContent>
              </Card>

              <Card className="border-lavenderBrand/30 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-5 text-center">
                  <Star className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Optimal Flavor</h3>
                  <p className="text-sm text-purple-700">This size captures the perfect balance of briny sweetness and texture.</p>
                </CardContent>
              </Card>
            </div>

            {/* What Makes Them Special */}
            <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Why 2.5 Inches is Perfect</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🦪</span>
                    <div>
                      <p className="font-semibold text-purple-900">Half-Shell Ready</p>
                      <p className="text-sm text-purple-700">Perfect size for elegant half-shell presentation without overwhelming the plate.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">⚖️</span>
                    <div>
                      <p className="font-semibold text-purple-900">Balanced Flavor</p>
                      <p className="text-sm text-purple-700">At 2.5 inches, oysters have developed rich flavor without becoming too large or tough.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">👨‍🍳</span>
                    <div>
                      <p className="font-semibold text-purple-900">Chef Favorite</p>
                      <p className="text-sm text-purple-700">Restaurants love this size for consistent plating and portion control.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">✨</span>
                    <div>
                      <p className="font-semibold text-purple-900">Premium Quality</p>
                      <p className="text-sm text-purple-700">Carefully selected at peak maturity for the best taste and texture.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Size Comparison */}
            <Card className="border-blueBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Size Matters</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/80 rounded-lg">
                    <span className="text-purple-900 font-medium">Petite (2.5")</span>
                    <Badge className="bg-purpleBrand text-white">Our Specialty</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                    <span className="text-purple-700">Small (3")</span>
                    <span className="text-sm text-purple-600">Good</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                    <span className="text-purple-700">Medium (3.5")</span>
                    <span className="text-sm text-purple-600">Larger</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                    <span className="text-purple-700">Large (4"+)</span>
                    <span className="text-sm text-purple-600">Very Large</span>
                  </div>
                </div>
                <p className="text-sm text-purple-700 mt-4 italic">
                  Our 2.5-inch petite oysters are the perfect size for most diners - elegant, flavorful, and easy to enjoy!
                </p>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
              <h3 className="text-xl font-bold text-purple-900 mb-3">Try Our Petite Oysters</h3>
              <p className="text-purple-800 mb-4 text-sm">
                Experience the perfect 2.5-inch size! Order fresh petite oysters from Three Sisters Oyster Co.
              </p>
              <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                <Link href="/products">Order Petite Oysters</Link>
              </Button>
            </div>
          </article>

          <div className="mt-8 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-storage-quick-guide">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Storage Guide
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-freshness-checklist">
                Next: Freshness Checklist
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

