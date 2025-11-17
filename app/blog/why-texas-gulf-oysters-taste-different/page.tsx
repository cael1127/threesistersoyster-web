import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Script from 'next/script'
// import { // SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'Why Texas Gulf Oysters Taste Different | Three Sisters Oyster Blog',
  description: 'Discover what makes our Port Lavaca oysters unique. From water quality to farming methods, learn why Texas Gulf Coast oysters have a distinct flavor profile.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/why-texas-gulf-oysters-taste-different' },
  openGraph: {
    title: 'Why Texas Gulf Oysters Taste Different | Three Sisters Oyster Blog',
    description: 'Discover what makes our Port Lavaca oysters unique. From water quality to farming methods, learn why Texas Gulf Coast oysters have a distinct flavor profile.',
    url: '/blog/why-texas-gulf-oysters-taste-different',
    type: 'article',
    images: [
      {
        url: '/farmlog.jpg',
        width: 1200,
        height: 630,
        alt: 'Texas Gulf Oyster Farm - Port Lavaca',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Texas Gulf Oysters Taste Different | Three Sisters Oyster Blog',
    description: 'Discover what makes our Port Lavaca oysters unique. From water quality to farming methods, learn why Texas Gulf Coast oysters have a distinct flavor profile.',
    images: ['/farmlog.jpg'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const articleUrl = `${siteUrl}/blog/why-texas-gulf-oysters-taste-different`
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script id="article-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Why Texas Gulf Oysters Taste Different",
            "description": "Discover what makes our Port Lavaca oysters unique. From water quality to farming methods, learn why Texas Gulf Coast oysters have a distinct flavor profile.",
            "image": `${siteUrl}/farmlog.jpg`,
            "datePublished": "2024-09-15",
            "dateModified": "2024-09-15",
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
            "articleSection": "Farming",
            "keywords": ["Texas oysters", "Port Lavaca oysters", "Gulf Coast oysters", "oyster farming", "sustainable aquaculture"]
          })
        }}
      />
      {/* <SeasonalFloatingParticles count={8} /> */}
      
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purpleBrand/30">
            <div className="mb-8">
              <Badge className="bg-purpleBrand/90 text-white mb-4">Farming</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                September 15, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Why Texas Gulf Oysters Taste Different
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Discover what makes our Port Lavaca oysters unique. From water quality to farming methods, 
                learn why Texas Gulf Coast oysters have a distinct flavor profile.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/farmlog.jpg"
                alt="Texas Gulf Oyster Farm - Port Lavaca"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                When you taste a Texas Gulf oyster, you're experiencing something truly special. Our oysters from 
                Port Lavaca's Keller Bay have a unique flavor profile that sets them apart from oysters grown 
                elsewhere. But what exactly makes them taste different?
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Perfect Water Chemistry</h2>
              <p className="mb-6">
                Keller Bay's unique water chemistry is the foundation of our oysters' distinctive taste. The bay's 
                salinity levels, temperature fluctuations, and nutrient composition create an ideal environment 
                for oyster development. Our waters have the perfect balance of salt and fresh water, creating 
                a briny yet sweet flavor profile that's uniquely Texan.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Sustainable Farming Methods</h2>
              <p className="mb-6">
                At Three Sisters Oyster, we use sustainable farming techniques that enhance the natural flavor 
                of our oysters. Our off-bottom farming methods allow oysters to develop in their natural 
                environment while protecting them from predators and sediment. This approach results in 
                cleaner, more flavorful oysters with a firmer texture.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Gulf Coast Advantage</h2>
              <p className="mb-6">
                The Texas Gulf Coast offers unique advantages for oyster farming. Our location provides access 
                to nutrient-rich waters that support the growth of phytoplankton, which oysters filter and 
                convert into their distinctive flavor compounds. The warm Gulf waters also contribute to 
                faster growth rates while maintaining quality.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Seasonal Variations</h2>
              <p className="mb-6">
                Like fine wine, our oysters develop different flavor profiles throughout the year. Spring oysters 
                tend to be more delicate and sweet, while fall oysters develop a richer, more complex flavor. 
                This seasonal variation is one of the many reasons why our customers keep coming back for more.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Quality Control</h2>
              <p className="mb-8">
                Every oyster that leaves our farm undergoes rigorous quality control. We test water quality 
                regularly, monitor oyster health, and ensure proper handling throughout the process. This 
                attention to detail ensures that every oyster delivers the consistent, high-quality taste 
                that our customers expect.
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Experience the Difference</h3>
                <p className="mb-4">
                  Ready to taste the difference for yourself? Our fresh Texas Gulf oysters are available 
                  for restaurants, events, and home delivery. Experience the unique flavor profile that 
                  only comes from sustainable farming in Port Lavaca's pristine waters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Fresh Oysters</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/about">Learn About Our Farm</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/from-farm-to-table-oyster-harvest">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: From Farm to Table
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/top-5-oyster-recipes-summer">
                Next: Top 5 Oyster Recipes
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
