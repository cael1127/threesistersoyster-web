import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'Texas Oyster Farm Blog | Three Sisters Oyster News & Recipes',
  description: 'Read about sustainable oyster farming, Texas Gulf Coast seafood, oyster recipes, and farm updates from Three Sisters Oyster in Port Lavaca.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Texas Oyster Farm Blog | Three Sisters Oyster News & Recipes',
    description: 'Read about sustainable oyster farming, Texas Gulf Coast seafood, oyster recipes, and farm updates from Three Sisters Oyster in Port Lavaca.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Oyster Farm Blog | Three Sisters Oyster News & Recipes',
    description: 'Read about sustainable oyster farming, Texas Gulf Coast seafood, oyster recipes, and farm updates from Three Sisters Oyster in Port Lavaca.',
  },
}

// Sample blog posts - in a real app, these would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: "Why Texas Gulf Oysters Taste Different",
    excerpt: "Discover what makes our Port Lavaca oysters unique. From water quality to farming methods, learn why Texas Gulf Coast oysters have a distinct flavor profile.",
    date: "2024-09-15",
    category: "Farming",
    image: "/farmlog.jpg",
    slug: "why-texas-gulf-oysters-taste-different"
  },
  {
    id: 2,
    title: "From Farm to Table: How We Harvest Our Oysters",
    excerpt: "Take a behind-the-scenes look at our sustainable oyster farming process. See how we grow, harvest, and prepare fresh Texas oysters for your table.",
    date: "2024-09-08",
    category: "Process",
    image: "/nurserylog.JPEG",
    slug: "from-farm-to-table-oyster-harvest"
  },
  {
    id: 3,
    title: "Top 5 Oyster Recipes for Summer Gatherings",
    excerpt: "Perfect your oyster preparation with these delicious recipes. From classic raw oysters to grilled specialties, impress your guests with fresh Gulf Coast oysters.",
    date: "2024-09-01",
    category: "Recipes",
    image: "/gal.jpg",
    slug: "top-5-oyster-recipes-summer"
  },
  {
    id: 4,
    title: "The Environmental Benefits of Oyster Farming",
    excerpt: "Learn how sustainable oyster farming helps clean our waters and support marine ecosystems. Discover the environmental impact of our Port Lavaca operations.",
    date: "2024-08-25",
    category: "Sustainability",
    image: "/topFarm.JPG",
    slug: "environmental-benefits-oyster-farming"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <SeasonalFloatingParticles count={8} />
      
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6 leading-tight">
              Texas Oyster Farm Blog
            </h1>
            <p className="text-xl md:text-2xl text-purple-800 max-w-3xl mx-auto leading-relaxed">
              Stories from our sustainable oyster farm in Port Lavaca, Texas. Learn about Gulf Coast oysters, 
              sustainable aquaculture, and delicious seafood recipes.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image}
                    alt={`${post.title} - Texas oyster farm blog post`}
                    fill
                    className="object-cover"
                    quality={90}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purpleBrand/90 text-white">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center text-sm text-purple-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <CardTitle className="text-xl font-bold text-purple-900 mb-3">
                    {post.title}
                  </CardTitle>
                  <p className="text-purple-700 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-purpleBrand/30">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">
              Stay Updated with Our Farm
            </h2>
            <p className="text-purple-800 mb-6 max-w-2xl mx-auto">
              Get the latest news about our sustainable oyster farming, new products, and seasonal updates 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                <Link href="/about">Learn About Our Farm</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-purpleBrand text-purpleBrand hover:bg-purpleBrand hover:text-white">
                <Link href="/products">Shop Fresh Oysters</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
