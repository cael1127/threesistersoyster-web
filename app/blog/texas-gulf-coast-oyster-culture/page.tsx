import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, Heart, MapPin, Users } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'The Texas Gulf Coast Oyster Culture | Three Sisters Oyster Blog',
  description: 'Explore the rich cultural heritage of oyster farming along the Texas Gulf Coast. Discover traditions, communities, and the deep connection between people and oysters.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/texas-gulf-coast-oyster-culture' },
  openGraph: {
    title: 'The Texas Gulf Coast Oyster Culture | Three Sisters Oyster Blog',
    description: 'Explore the rich cultural heritage of oyster farming along the Texas Gulf Coast. Discover traditions and communities.',
    url: '/blog/texas-gulf-coast-oyster-culture',
    type: 'article',
    images: [{ url: '/gal.jpg', width: 1200, height: 630, alt: 'Texas Gulf Coast Oyster Culture' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Texas Gulf Coast Oyster Culture | Three Sisters Oyster Blog',
    description: 'Explore the rich cultural heritage of oyster farming along the Texas Gulf Coast.',
    images: ['/gal.jpg'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const articleUrl = `${siteUrl}/blog/texas-gulf-coast-oyster-culture`
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script id="article-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Texas Gulf Coast Oyster Culture",
            "description": "Explore the rich cultural heritage of oyster farming along the Texas Gulf Coast.",
            "image": `${siteUrl}/gal.jpg`,
            "datePublished": "2025-01-16",
            "dateModified": "2025-01-16",
            "author": { "@type": "Organization", "name": "Three Sisters Oyster Co.", "url": siteUrl },
            "publisher": { "@type": "Organization", "name": "Three Sisters Oyster Co.", "logo": { "@type": "ImageObject", "url": `${siteUrl}/logo.jpg` } },
            "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
            "articleSection": "Education",
            "keywords": ["Texas Gulf Coast", "oyster culture", "oyster traditions", "coastal culture", "Texas seafood"]
          })
        }}
      />
      <Navigation />
      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
            </Button>
          </div>
          <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purpleBrand/30">
            <div className="mb-8">
              <Badge className="bg-purpleBrand/90 text-white mb-4">Culture</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />January 16, 2025
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                The Texas Gulf Coast Oyster Culture
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Explore the rich cultural heritage of oyster farming along the Texas Gulf Coast. Discover traditions, 
                communities, and the deep connection between people and oysters.
              </p>
            </div>
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image src="/gal.jpg" alt="Texas Gulf Coast Oyster Culture" fill className="object-cover" quality={90} />
            </div>
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                The Texas Gulf Coast has a rich and vibrant oyster culture that stretches back generations. 
                From Port Lavaca to Galveston Bay, oyster farming is more than just an industry—it's a way of life 
                that connects communities, families, and the sea.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">A Legacy of Coastal Living</h2>
              <p className="mb-6">
                For centuries, the Texas Gulf Coast has been home to oyster harvesters who understand the rhythm of 
                the tides, the seasons, and the delicate balance of marine ecosystems. This knowledge has been passed 
                down through generations, creating a cultural tradition that values sustainability, community, and 
                respect for the ocean.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Community and Connection</h2>
              <p className="mb-6">
                Oyster culture along the Gulf Coast is deeply rooted in community. Family-owned operations like Three 
                Sisters Oyster Co. represent a tradition of passing knowledge from one generation to the next. Local 
                oyster festivals, seafood restaurants, and community markets celebrate this shared heritage, bringing 
                people together around the table.
              </p>
              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Preserving Traditions</h2>
              <p className="mb-6">
                Today's oyster farmers honor traditional methods while embracing sustainable practices for the future. 
                This blend of old and new ensures that the Texas Gulf Coast oyster culture will continue to thrive for 
                generations to come.
              </p>
              <div className="bg-mintBrand/20 border border-mintBrand/40 rounded-lg p-6 mt-8">
                <p className="text-purple-900 font-semibold mb-2">Experience Texas Gulf Coast oysters</p>
                <p className="text-purple-800 mb-4">Discover the taste that comes from this rich cultural tradition.</p>
                <Button asChild className="bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                  <Link href="/products">Shop Fresh Oysters</Link>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}
