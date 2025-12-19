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
  title: 'Best Oyster Recipes for Winter | Three Sisters Oyster Blog',
  description: 'Discover delicious winter oyster recipes perfect for cold weather. From grilled oysters to hearty stews, warm up with these comforting oyster dishes.',
  keywords: [
    'winter oyster recipes',
    'oyster recipes cold weather',
    'grilled oysters winter',
    'oyster stew recipe',
    'warm oyster dishes',
    'winter seafood recipes',
    'oyster comfort food',
    'seasonal oyster recipes'
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/best-oyster-recipes-winter' },
  openGraph: {
    title: 'Best Oyster Recipes for Winter',
    description: 'Discover delicious winter oyster recipes perfect for cold weather.',
    url: '/blog/best-oyster-recipes-winter',
    type: 'article',
    images: [{ url: '/gal.jpg', width: 1200, height: 630, alt: 'Winter Oyster Recipes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Oyster Recipes for Winter',
    description: 'Discover delicious winter oyster recipes perfect for cold weather.',
    images: ['/gal.jpg'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Best Oyster Recipes for Winter',
        description: 'Discover delicious winter oyster recipes perfect for cold weather.',
        image: `${siteUrl}/gal.jpg`,
        datePublished: '2025-01-08',
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Recipes</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />January 8, 2025
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Best Oyster Recipes for Winter
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Winter doesn't mean giving up fresh oysters! Discover delicious recipes that make the most of premium Texas Gulf oysters during the colder months.
              </p>
            </div>
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image src="/gal.jpg" alt="Winter oyster recipes" fill className="object-cover" quality={90} />
            </div>
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Winter is actually a great time for oysters! The colder water temperatures often result in firmer, more flavorful oysters. Here are some of our favorite recipes to enjoy premium Texas Gulf oysters during the winter months.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Grilled Oysters with Garlic Butter</h2>
              <p className="mb-6">
                Grilling oysters brings out their natural sweetness and adds a smoky flavor. Top with garlic butter and fresh herbs for a warm, comforting dish perfect for winter gatherings.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Oyster Stew</h2>
              <p className="mb-6">
                A classic winter comfort food, oyster stew is creamy, rich, and warming. Our Texas Gulf oysters add exceptional flavor to this traditional dish.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Oyster Po' Boy</h2>
              <p className="mb-6">
                Fried oysters on a warm, crusty roll make for the perfect hearty winter sandwich. Add your favorite toppings for a satisfying meal.
              </p>
              <Card className="border-purpleBrand/30 bg-gradient-to-r from-purpleBrand/20 to-lavenderBrand/20 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">Try These Recipes</h3>
                  <p className="text-purple-800 mb-6">Start with premium Texas Gulf oysters from Three Sisters.</p>
                  <Button asChild size="lg" className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Fresh Oysters</Link>
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

