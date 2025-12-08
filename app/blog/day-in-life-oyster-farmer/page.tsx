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
  title: 'A Day in the Life: Behind the Scenes at Three Sisters Oyster Farm | Three Sisters Oyster Blog',
  description: 'Get an inside look at daily life on our sustainable oyster farm. Meet our team, see our process, and discover what it takes to grow premium Texas Gulf Coast oysters.',
  keywords: [
    'oyster farmer life',
    'oyster farm behind scenes',
    'oyster farming daily',
    'oyster farm team',
    'sustainable farming life',
    'oyster farm process',
    'aquaculture daily operations',
    'oyster farm work'
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/day-in-life-oyster-farmer' },
  openGraph: {
    title: 'A Day in the Life: Behind the Scenes at Three Sisters Oyster Farm',
    description: 'Get an inside look at daily life on our sustainable oyster farm.',
    url: '/blog/day-in-life-oyster-farmer',
    type: 'article',
    images: [
      {
        url: '/aboutpic.jpg',
        width: 1200,
        height: 630,
        alt: 'Day in the Life at Three Sisters Oyster Farm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Day in the Life: Behind the Scenes at Three Sisters Oyster Farm',
    description: 'Get an inside look at daily life on our sustainable oyster farm.',
    images: ['/aboutpic.jpg'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const publishDate = '2025-01-01'

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'A Day in the Life: Behind the Scenes at Three Sisters Oyster Farm',
            description: 'Get an inside look at daily life on our sustainable oyster farm.',
            image: `${siteUrl}/aboutpic.jpg`,
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Farming</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                January 1, 2025
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                A Day in the Life: Behind the Scenes at Three Sisters Oyster Farm
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Ever wondered what it's like to work on an oyster farm? Join us for a day in the life at 
                Three Sisters Oyster Co. and discover the dedication, passion, and hard work that goes into 
                growing premium Texas Gulf Coast oysters.
              </p>
            </div>

            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/aboutpic.jpg"
                alt="Team at Three Sisters Oyster Farm"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Life on an oyster farm is anything but ordinary. It's a blend of hard work, connection with 
                nature, and dedication to sustainable practices. At Three Sisters Oyster Co., our days start 
                early and are filled with the rhythms of the tides, the care of our oysters, and the 
                satisfaction of growing premium seafood that also helps the environment.
              </p>

              <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 to-lavenderBrand/20 mb-8">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🌅</div>
                  <div className="text-4xl md:text-5xl font-bold text-purple-900 mb-2">Sunrise to Sunset</div>
                  <p className="text-xl text-purple-800">Dedicated to growing premium oysters</p>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Early Morning: Checking the Farm</h2>
              <p className="mb-6">
                Our day begins before sunrise, checking water conditions, monitoring oyster growth, and 
                assessing the health of our farm. We work with the tides, which dictate much of our schedule. 
                Low tide means we can access our oyster beds for maintenance and inspection, while high tide 
                brings the nutrients and conditions oysters need to thrive.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Mid-Morning: Farm Maintenance</h2>
              <p className="mb-6">
                Farm maintenance is crucial for healthy oyster growth. We clean equipment, check structures, 
                and monitor water quality. Every detail matters – from ensuring proper water flow to protecting 
                our oysters from predators. This hands-on work keeps us connected to every aspect of the 
                farming process.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <Card className="border-blueBrand/30 bg-gradient-to-br from-blueBrand/20 to-seafoamBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🌊</div>
                    <div className="text-2xl font-bold text-purple-900 mb-2">Tide-Based</div>
                    <p className="text-purple-800">Work follows natural rhythms</p>
                  </CardContent>
                </Card>
                <Card className="border-seafoamBrand/30 bg-gradient-to-br from-seafoamBrand/20 to-mintBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">👥</div>
                    <div className="text-2xl font-bold text-purple-900 mb-2">Team Work</div>
                    <p className="text-purple-800">Dedicated team effort</p>
                  </CardContent>
                </Card>
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 to-lavenderBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">💚</div>
                    <div className="text-2xl font-bold text-purple-900 mb-2">Sustainable</div>
                    <p className="text-purple-800">Caring for the environment</p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Afternoon: Quality Control</h2>
              <p className="mb-6">
                Quality is everything. We carefully inspect our oysters, ensuring they meet our high standards 
                for size, shell quality, and health. This attention to detail is what sets premium oysters 
                apart. We're not just growing oysters – we're cultivating excellence, one oyster at a time.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Our Team: The Heart of the Farm</h2>
              <p className="mb-6">
                Our team is what makes Three Sisters Oyster Co. special. From Blake's vision and expertise to 
                every team member's dedication, we work together to produce the finest oysters while protecting 
                and improving our marine environment. It's more than a job – it's a passion for sustainable 
                aquaculture and premium seafood.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Rewards</h2>
              <p className="mb-6">
                Working on an oyster farm comes with unique rewards. There's the satisfaction of growing 
                premium seafood, the connection to nature and the ocean, and the knowledge that we're 
                contributing to environmental restoration. Every day brings new challenges and new 
                accomplishments, from watching oysters grow to seeing the positive impact on water quality 
                and marine life.
              </p>

              <Card className="border-purpleBrand/30 bg-gradient-to-r from-purpleBrand/20 to-lavenderBrand/20 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">
                    Experience Our Premium Oysters
                  </h3>
                  <p className="text-purple-800 mb-6">
                    Taste the dedication and care that goes into every oyster we grow.
                  </p>
                  <Button asChild size="lg" className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Farm-Fresh Oysters</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </article>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-purple-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button asChild variant="outline" className="h-auto p-6 justify-start border-purpleBrand/30">
                <Link href="/blog/from-farm-to-table-oyster-harvest">
                  <div>
                    <div className="font-bold text-purple-900 mb-2">Farm to Table</div>
                    <div className="text-sm text-purple-700">Our harvest process</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-purple-600" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 justify-start border-purpleBrand/30">
                <Link href="/about">
                  <div>
                    <div className="font-bold text-purple-900 mb-2">Our Story</div>
                    <div className="text-sm text-purple-700">Learn more about us</div>
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

