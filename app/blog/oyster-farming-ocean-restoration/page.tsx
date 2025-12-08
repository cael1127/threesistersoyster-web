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
  title: 'Restoring Our Oceans: How Oyster Farming Rebuilds Marine Ecosystems | Three Sisters Oyster Blog',
  description: 'Learn how oyster farming creates habitats and restores marine ecosystems. Discover how sustainable aquaculture rebuilds biodiversity and supports ocean health.',
  keywords: [
    'oyster habitat creation',
    'marine ecosystem restoration',
    'ocean restoration oysters',
    'biodiversity oyster farming',
    'marine habitat restoration',
    'sustainable ocean restoration',
    'oyster reef ecosystem',
    'aquaculture biodiversity'
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-farming-ocean-restoration' },
  openGraph: {
    title: 'Restoring Our Oceans: How Oyster Farming Rebuilds Marine Ecosystems',
    description: 'Learn how oyster farming creates habitats and restores marine ecosystems.',
    url: '/blog/oyster-farming-ocean-restoration',
    type: 'article',
    images: [
      {
        url: '/gal2.jpg',
        width: 1200,
        height: 630,
        alt: 'Ocean Restoration Through Oyster Farming - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restoring Our Oceans: How Oyster Farming Rebuilds Marine Ecosystems',
    description: 'Learn how oyster farming creates habitats and restores marine ecosystems.',
    images: ['/gal2.jpg'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const publishDate = '2024-12-30'

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Restoring Our Oceans: How Oyster Farming Rebuilds Marine Ecosystems',
            description: 'Learn how oyster farming creates habitats and restores marine ecosystems.',
            image: `${siteUrl}/gal2.jpg`,
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
              <Badge className="bg-blueBrand/90 text-white mb-4">Sustainability</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 30, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Restoring Our Oceans: How Oyster Farming Rebuilds Marine Ecosystems
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Oyster farming doesn't just produce food – it actively restores damaged marine ecosystems. 
                Discover how our sustainable practices in Keller Bay create habitats, support biodiversity, 
                and rebuild ocean health.
              </p>
            </div>

            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/gal2.jpg"
                alt="Marine ecosystem restoration through oyster farming"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                The world's oceans face unprecedented challenges: habitat loss, declining biodiversity, and 
                degraded ecosystems. But there's hope. Oyster farming offers a unique solution that not only 
                produces sustainable seafood but actively restores and rebuilds marine ecosystems. At Three 
                Sisters Oyster Co., our operations in Keller Bay demonstrate how aquaculture can be a force 
                for ocean restoration.
              </p>

              <Card className="border-blueBrand/30 bg-gradient-to-br from-blueBrand/20 to-purpleBrand/20 mb-8">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🐟</div>
                  <div className="text-4xl md:text-5xl font-bold text-purple-900 mb-2">Habitat Creation</div>
                  <p className="text-xl text-purple-800">Oyster reefs support 200+ species of marine life</p>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Building Three-Dimensional Habitats</h2>
              <p className="mb-6">
                Oyster farming structures create complex, three-dimensional habitats in areas that might otherwise 
                be barren seafloor. These structures provide shelter, feeding grounds, and nursery areas for a 
                diverse range of marine organisms. Fish, crabs, shrimp, and countless other species find refuge 
                and food among our oyster beds, creating thriving ecosystems where none existed before.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Biodiversity Hotspots</h2>
              <p className="mb-6">
                Research shows that oyster reefs support more than 200 species of marine life. Our farming 
                operations in Keller Bay create biodiversity hotspots that attract everything from small fish 
                to larger predators. This increased biodiversity strengthens the entire ecosystem, making it 
                more resilient to environmental changes and disturbances.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 to-blueBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🏗️</div>
                    <div className="text-2xl font-bold text-purple-900 mb-2">Structure</div>
                    <p className="text-purple-800">Creates complex 3D habitats</p>
                  </CardContent>
                </Card>
                <Card className="border-blueBrand/30 bg-gradient-to-br from-blueBrand/20 to-seafoamBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🌊</div>
                    <div className="text-2xl font-bold text-purple-900 mb-2">200+ Species</div>
                    <p className="text-purple-800">Supported by oyster reefs</p>
                  </CardContent>
                </Card>
                <Card className="border-seafoamBrand/30 bg-gradient-to-br from-seafoamBrand/20 to-purpleBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🔄</div>
                    <div className="text-2xl font-bold text-purple-900 mb-2">Restoration</div>
                    <p className="text-purple-800">Rebuilds damaged ecosystems</p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Nursery Grounds for Marine Life</h2>
              <p className="mb-6">
                The nooks and crannies of oyster structures provide perfect nursery grounds for juvenile fish 
                and other marine organisms. Young fish find protection from predators while having access to 
                abundant food sources. This early-life support is crucial for maintaining healthy fish 
                populations and supporting commercial and recreational fisheries.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Ecosystem Connectivity</h2>
              <p className="mb-6">
                Our oyster farming operations create connections between different parts of the marine ecosystem. 
                By improving water quality through filtration and providing habitat structure, we help link 
                seagrass beds, mangrove areas, and open water habitats. This connectivity is essential for 
                healthy, functioning marine ecosystems.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Restoration Impact</h2>
              <p className="mb-6">
                Over time, our sustainable oyster farming practices contribute to measurable ecosystem restoration. 
                Water quality improves, biodiversity increases, and the overall health of the marine environment 
                strengthens. This restoration happens while we produce premium oysters, demonstrating that food 
                production and environmental restoration can go hand in hand.
              </p>

              <Card className="border-blueBrand/30 bg-gradient-to-r from-blueBrand/20 to-purpleBrand/20 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">
                    Support Ocean Restoration
                  </h3>
                  <p className="text-purple-800 mb-6">
                    Choose oysters and help restore marine ecosystems while enjoying premium seafood.
                  </p>
                  <Button asChild size="lg" className="bg-blueBrand hover:bg-purpleBrand text-white">
                    <Link href="/products">Order Restoration Oysters</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </article>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-purple-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button asChild variant="outline" className="h-auto p-6 justify-start border-purpleBrand/30">
                <Link href="/blog/oysters-water-filtration-environmental-impact">
                  <div>
                    <div className="font-bold text-purple-900 mb-2">Water Filtration</div>
                    <div className="text-sm text-purple-700">50 gallons filtered per day</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-purple-600" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 justify-start border-purpleBrand/30">
                <Link href="/blog/why-oysters-sustainable-seafood-choice">
                  <div>
                    <div className="font-bold text-purple-900 mb-2">Sustainable Choice</div>
                    <div className="text-sm text-purple-700">Why oysters are the best</div>
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

