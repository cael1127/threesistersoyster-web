import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Oyster Safety: How to Ensure Fresh, Safe Oysters | Three Sisters Oyster Blog',
  description: 'Learn essential oyster safety tips. Discover how to identify fresh oysters, proper storage methods, and safe handling practices for Texas Gulf oysters.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-safety-fresh-safe-oysters' },
  openGraph: {
    title: 'Oyster Safety: How to Ensure Fresh, Safe Oysters | Three Sisters Oyster Blog',
    description: 'Learn essential oyster safety tips. Discover how to identify fresh oysters, proper storage methods, and safe handling practices.',
    url: '/blog/oyster-safety-fresh-safe-oysters',
    type: 'article',
    images: [
      {
        url: '/oyster.png',
        width: 1200,
        height: 630,
        alt: 'Fresh Oyster Safety - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Safety: How to Ensure Fresh, Safe Oysters | Three Sisters Oyster Blog',
    description: 'Learn essential oyster safety tips. Discover how to identify fresh oysters, proper storage methods, and safe handling practices.',
    images: ['/oyster.png'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const articleUrl = `${siteUrl}/blog/oyster-safety-fresh-safe-oysters`
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script id="article-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Oyster Safety: How to Ensure Fresh, Safe Oysters",
            "description": "Learn essential oyster safety tips. Discover how to identify fresh oysters, proper storage methods, and safe handling practices for Texas Gulf oysters.",
            "image": `${siteUrl}/oyster.png`,
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
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
            "articleSection": "Safety",
            "keywords": ["oyster safety", "fresh oysters", "oyster storage", "seafood safety", "Texas oysters"]
          })
        }}
      />
      
      <Navigation />

      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purpleBrand/30">
            <div className="mb-8">
              <Badge className="bg-purpleBrand/90 text-white mb-4">Safety</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                January 15, 2025
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oyster Safety: How to Ensure Fresh, Safe Oysters
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Learn essential oyster safety tips. Discover how to identify fresh oysters, proper storage methods, 
                and safe handling practices for Texas Gulf oysters.
              </p>
            </div>

            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/oyster.png"
                alt="Fresh Oyster Safety - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Enjoying fresh oysters is one of life's great pleasures, but safety should always come first. 
                When handled and stored properly, oysters are a safe and delicious treat. At Three Sisters Oyster Co., 
                we're committed to providing the freshest, safest oysters possible. Here's everything you need to know 
                about oyster safety.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Identifying Fresh Oysters
              </h2>
              <p className="mb-4">
                The first step in oyster safety is ensuring you're working with fresh oysters. Here are the key 
                indicators of freshness:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Tightly closed shells:</strong> Live oysters should have shells that are closed tight or 
                close quickly when tapped. If shells are gaping open and don't close, discard them.</li>
                <li><strong>Fresh ocean smell:</strong> Oysters should smell like the ocean—briny and fresh. Any 
                strong, unpleasant odors indicate spoilage.</li>
                <li><strong>Heavy for their size:</strong> Fresh oysters feel heavy because they're full of water 
                and meat. Lightweight oysters may be dried out or dead.</li>
                <li><strong>Clear liquid:</strong> When you open an oyster, the liquid inside should be clear, not 
                cloudy or milky.</li>
              </ul>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Proper Storage Methods
              </h2>
              <p className="mb-4">
                Proper storage is crucial for maintaining oyster freshness and safety:
              </p>
              <div className="bg-purpleBrand/10 border-l-4 border-purpleBrand p-4 mb-6 rounded">
                <p className="font-semibold text-purple-900 mb-2">Storage Guidelines:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Store oysters in the refrigerator at 35-40°F (2-4°C)</li>
                  <li>Keep oysters in a bowl covered with a damp towel, or in their original container</li>
                  <li>Never store oysters in an airtight container or submerged in water</li>
                  <li>Store flat side up to preserve the liquid inside</li>
                  <li>Use within 7-10 days of harvest for best quality</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Safe Handling Practices
              </h2>
              <p className="mb-4">
                Following proper handling procedures ensures your oysters remain safe to eat:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Clean hands and tools:</strong> Always wash your hands and oyster knife thoroughly before 
                handling oysters.</li>
                <li><strong>Discard damaged oysters:</strong> If an oyster shell is cracked or broken, discard it. 
                Only use oysters with intact shells.</li>
                <li><strong>Rinse before shucking:</strong> Gently rinse oysters under cold running water to remove 
                any surface debris or sand.</li>
                <li><strong>Shuck carefully:</strong> Use a proper oyster knife and shucking technique to avoid 
                injury. Always protect your hand with a towel or glove.</li>
              </ul>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">When in Doubt, Throw It Out</h2>
              <p className="mb-6">
                This is the golden rule of seafood safety. If you're unsure whether an oyster is safe to eat, 
                err on the side of caution and discard it. The cost of a few oysters is never worth risking your health. 
                Signs that an oyster should be discarded include:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Open shells that don't close when tapped</li>
                <li>Unpleasant or off-putting odors</li>
                <li>Cloudy or discolored liquid</li>
                <li>Dry or shriveled meat</li>
                <li>Any signs of damage or cracks in the shell</li>
              </ul>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Trust Your Source</h2>
              <p className="mb-6">
                At Three Sisters Oyster Co., we harvest our oysters with safety as our top priority. Our oysters are 
                harvested from clean waters, handled with care, and delivered fresh to ensure the highest quality and 
                safety standards. When you purchase from us, you can trust that we've taken every precaution to ensure 
                your oysters are safe and fresh.
              </p>

              <div className="bg-mintBrand/20 border border-mintBrand/40 rounded-lg p-6 mt-8">
                <p className="text-purple-900 font-semibold mb-2">Ready to enjoy fresh, safe oysters?</p>
                <p className="text-purple-800 mb-4">
                  Visit our products page to reserve fresh Texas Gulf oysters for pickup. We harvest to order to ensure 
                  maximum freshness.
                </p>
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
