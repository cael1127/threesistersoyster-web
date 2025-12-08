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
  title: 'How Oysters Fight Climate Change: Carbon Sequestration Explained | Three Sisters Oyster Blog',
  description: 'Discover how oyster farming sequesters carbon and fights climate change. Learn about the environmental impact of sustainable aquaculture and how oysters help restore ocean health.',
  keywords: [
    'oyster carbon sequestration',
    'climate change oysters',
    'carbon capture aquaculture',
    'sustainable seafood climate',
    'oyster farming environment',
    'carbon negative seafood',
    'ocean carbon storage',
    'regenerative aquaculture'
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oysters-carbon-sequestration-climate-change' },
  openGraph: {
    title: 'How Oysters Fight Climate Change: Carbon Sequestration Explained',
    description: 'Discover how oyster farming sequesters carbon and fights climate change. Learn about the environmental impact of sustainable aquaculture.',
    url: '/blog/oysters-carbon-sequestration-climate-change',
    type: 'article',
    images: [
      {
        url: '/topFarm.JPG',
        width: 1200,
        height: 630,
        alt: 'Oyster Farm Carbon Sequestration - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Oysters Fight Climate Change: Carbon Sequestration Explained',
    description: 'Discover how oyster farming sequesters carbon and fights climate change.',
    images: ['/topFarm.JPG'],
  },
}

export default function BlogPostPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const publishDate = '2024-12-28'

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'How Oysters Fight Climate Change: Carbon Sequestration Explained',
            description: 'Discover how oyster farming sequesters carbon and fights climate change.',
            image: `${siteUrl}/topFarm.JPG`,
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
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="ghost" className="text-purple-700 hover:text-purple-900">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purpleBrand/30">
            <div className="mb-8">
              <Badge className="bg-purpleBrand/90 text-white mb-4">Sustainability</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 28, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                How Oysters Fight Climate Change: Carbon Sequestration Explained
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Discover how sustainable oyster farming sequesters carbon and actively fights climate change. 
                Learn about the powerful environmental impact of choosing oysters as your seafood.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/topFarm.JPG"
                alt="Oyster farm sequestering carbon and fighting climate change"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                When you choose oysters, you're not just selecting a delicious seafood option – you're making 
                a choice that actively fights climate change. Oyster farming is one of the few forms of food 
                production that actually removes carbon from the atmosphere while improving the environment. 
                Here's how our sustainable oyster farming at Three Sisters Oyster Co. contributes to carbon 
                sequestration and climate solutions.
              </p>

              {/* Instagram-Worthy Stat Card */}
              <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 to-seafoamBrand/20 mb-8">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🌊</div>
                  <div className="text-4xl md:text-5xl font-bold text-purple-900 mb-2">Carbon Negative</div>
                  <p className="text-xl text-purple-800">
                    Oyster farming removes more carbon than it produces
                  </p>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">How Oysters Sequester Carbon</h2>
              <p className="mb-6">
                Oysters sequester carbon through multiple mechanisms. First, as they grow, they build calcium 
                carbonate shells that permanently store carbon. Unlike carbon stored in living tissue, this 
                carbon remains locked away even after the oyster is harvested. Second, oyster reefs and farming 
                structures create complex habitats that support seagrass and other marine plants, which also 
                capture and store carbon.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Numbers That Matter</h2>
              <p className="mb-6">
                Research shows that oyster reefs can sequester significant amounts of carbon. A single acre of 
                oyster reef can capture and store carbon equivalent to removing several cars from the road each 
                year. When you consider that our farm operations in Keller Bay create extensive reef structures, 
                the cumulative carbon sequestration impact becomes substantial.
              </p>

              {/* Visual Stat Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <Card className="border-blueBrand/30 bg-gradient-to-br from-blueBrand/20 to-seafoamBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">📊</div>
                    <div className="text-3xl font-bold text-purple-900 mb-2">Carbon Negative</div>
                    <p className="text-purple-800">Removes more CO₂ than produced</p>
                  </CardContent>
                </Card>
                <Card className="border-seafoamBrand/30 bg-gradient-to-br from-seafoamBrand/20 to-blueBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🔒</div>
                    <div className="text-3xl font-bold text-purple-900 mb-2">Permanent Storage</div>
                    <p className="text-purple-800">Carbon locked in shells forever</p>
                  </CardContent>
                </Card>
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/20 to-seafoamBrand/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🌱</div>
                    <div className="text-3xl font-bold text-purple-900 mb-2">Regenerative</div>
                    <p className="text-purple-800">Improves environment over time</p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Beyond Carbon: Additional Climate Benefits</h2>
              <p className="mb-6">
                Oyster farming's climate benefits extend beyond carbon sequestration. By filtering water and 
                improving water quality, oysters help maintain healthy marine ecosystems that are more resilient 
                to climate change impacts. Healthy oyster reefs also protect shorelines from erosion, reducing 
                the need for carbon-intensive coastal infrastructure.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Why This Matters for You</h2>
              <p className="mb-6">
                Every time you choose oysters from Three Sisters Oyster Co., you're supporting a food production 
                system that actively removes carbon from the atmosphere. Unlike many other food choices that 
                contribute to greenhouse gas emissions, oysters are a carbon-negative food source. This means 
                you can enjoy delicious, nutritious seafood while knowing you're making a positive environmental 
                choice.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Future of Sustainable Seafood</h2>
              <p className="mb-6">
                As we face the challenges of climate change, regenerative aquaculture practices like oyster 
                farming offer a path forward. By choosing carbon-sequestering seafood, consumers can play an 
                active role in climate solutions. At Three Sisters Oyster Co., we're committed to sustainable 
                practices that not only produce premium oysters but also contribute to a healthier planet.
              </p>

              {/* Call to Action */}
              <Card className="border-purpleBrand/30 bg-gradient-to-r from-purpleBrand/20 to-seafoamBrand/20 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">
                    Make a Climate-Positive Choice
                  </h3>
                  <p className="text-purple-800 mb-6">
                    Choose oysters and support carbon sequestration while enjoying premium Texas Gulf Coast seafood.
                  </p>
                  <Button asChild size="lg" className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Carbon-Negative Oysters</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </article>

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-purple-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button asChild variant="outline" className="h-auto p-6 justify-start border-purpleBrand/30">
                <Link href="/blog/oysters-water-filtration-environmental-impact">
                  <div>
                    <div className="font-bold text-purple-900 mb-2">Water Filtration Impact</div>
                    <div className="text-sm text-purple-700">Learn how oysters filter 50+ gallons daily</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-purple-600" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 justify-start border-purpleBrand/30">
                <Link href="/blog/why-oysters-sustainable-seafood-choice">
                  <div>
                    <div className="font-bold text-purple-900 mb-2">Most Sustainable Seafood</div>
                    <div className="text-sm text-purple-700">Why oysters are the best choice</div>
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

