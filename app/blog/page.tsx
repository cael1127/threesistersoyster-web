'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Calendar, ArrowUpRight, Book, Users, TrendingUp, Clock, Star } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
// import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'


// Sample blog posts - in a real app, these would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: "Why Texas Gulf Oysters Taste Different",
    excerpt: "Discover what makes our Port Lavaca oysters unique. From water quality to farming methods, learn why Texas Gulf Coast oysters have a distinct flavor profile.",
    date: "2024-09-15",
    category: "Farming",
    image: "/texasOysBlog.jpg",
    slug: "why-texas-gulf-oysters-taste-different",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "From Farm to Table: How We Harvest Our Oysters",
    excerpt: "Take a behind-the-scenes look at our sustainable oyster farming process. See how we grow, harvest, and prepare fresh Texas oysters for your table.",
    date: "2024-09-08",
    category: "Process",
    image: "/process.JPEG",
    slug: "from-farm-to-table-oyster-harvest",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 3,
    title: "Top 5 Oyster Recipes for Summer Gatherings",
    excerpt: "Perfect your oyster preparation with these delicious recipes. From classic raw oysters to grilled specialties, impress your guests with fresh Gulf Coast oysters.",
    date: "2024-09-01",
    category: "Recipes",
    image: "/gal.jpg",
    slug: "top-5-oyster-recipes-summer",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 4,
    title: "The Environmental Benefits of Oyster Farming",
    excerpt: "Learn how sustainable oyster farming helps clean our waters and support marine ecosystems. Discover the environmental impact of our Port Lavaca operations.",
    date: "2024-08-25",
    category: "Sustainability",
    image: "/enviromentBlog.jpg",
    slug: "environmental-benefits-oyster-farming",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 5,
    title: "Oyster Season Guide: When to Enjoy the Best Texas Oysters",
    excerpt: "Learn about oyster seasons and when our Texas Gulf oysters are at their peak. Discover the best times to order and enjoy our premium oysters.",
    date: "2024-08-18",
    category: "Seasonal",
    image: "/topFarm.JPG",
    slug: "oyster-season-guide-texas",
    readTime: "4 min read",
    featured: false
  },
  {
    id: 6,
    title: "Sustainable Aquaculture: Our Commitment to the Gulf",
    excerpt: "Explore our commitment to sustainable aquaculture practices and how we're working to protect and preserve the Texas Gulf Coast ecosystem.",
    date: "2024-08-10",
    category: "Sustainability",
    image: "/gal2.jpg",
    slug: "sustainable-aquaculture-commitment",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 7,
    title: "Oyster Shucking Techniques: A Complete Guide",
    excerpt: "Master the art of oyster shucking with our comprehensive guide. Learn proper techniques, safety tips, and tools needed to safely open fresh Texas Gulf oysters.",
    date: "2024-12-05",
    category: "Techniques",
    image: "/placeholder.jpg",
    slug: "oyster-shucking-techniques",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 8,
    title: "Oyster Wine Pairing Guide: Perfect Matches",
    excerpt: "Discover the perfect wine pairings for Texas Gulf oysters. Learn which wines complement different oyster preparations and enhance your dining experience.",
    date: "2024-12-03",
    category: "Recipes",
    image: "/placeholder.jpg",
    slug: "oyster-wine-pairing-guide",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 9,
    title: "Oyster Nutrition Benefits: Superfood from the Sea",
    excerpt: "Discover the incredible nutritional benefits of Texas Gulf oysters. Learn about vitamins, minerals, and health benefits that make oysters a true superfood.",
    date: "2024-12-01",
    category: "Health",
    image: "/placeholder.jpg",
    slug: "oyster-nutrition-benefits",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 10,
    title: "Oyster Farming Challenges: Weather, Water, and Solutions",
    excerpt: "Learn about the challenges faced in sustainable oyster farming, from weather conditions to water quality, and how we overcome them at Three Sisters Oyster.",
    date: "2024-11-28",
    category: "Farming",
    image: "/placeholder.jpg",
    slug: "oyster-farming-challenges",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 11,
    title: "Oyster Storage & Handling: Keep Your Oysters Fresh",
    excerpt: "Learn proper oyster storage and handling techniques to maintain freshness and safety. Essential tips for restaurants, chefs, and home cooks.",
    date: "2024-11-25",
    category: "Process",
    image: "/placeholder.jpg",
    slug: "oyster-storage-handling",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 12,
    title: "Oyster Festival Guide: Texas Gulf Coast Events",
    excerpt: "Discover the best oyster festivals along the Texas Gulf Coast. Plan your visit to celebrate oysters, enjoy live music, and experience local culture.",
    date: "2024-11-22",
    category: "Events",
    image: "/placeholder.jpg",
    slug: "oyster-festival-guide",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 13,
    title: "Oyster Merroir: How Location Affects Oyster Flavor",
    excerpt: "Discover the concept of oyster merroir and learn how water salinity, temperature, and location create unique flavors in Texas Gulf oysters from Keller Bay.",
    date: "2024-12-12",
    category: "Education",
    image: "/gal3.jpg",
    slug: "oyster-merroir-flavor-guide",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 14,
    title: "How to Host an Oyster Party at Home",
    excerpt: "Learn how to plan and host the perfect oyster party at home. Expert tips on quantities, setup, pairings, and creating an unforgettable oyster bar experience.",
    date: "2024-12-15",
    category: "Events",
    image: "/gal1.jpg",
    slug: "how-to-host-oyster-party",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 15,
    title: "Oyster Storage Quick Guide",
    excerpt: "Quick tips for storing oysters properly. Keep your Texas Gulf oysters fresh with these essential storage guidelines. Perfect for Instagram sharing!",
    date: "2024-12-20",
    category: "Process",
    image: "/oyster.png",
    slug: "oyster-storage-quick-guide",
    readTime: "2 min read",
    featured: false
  },
  {
    id: 16,
    title: "Petite Oysters: Perfect 2.5 Inches",
    excerpt: "Discover our petite 2.5-inch oysters - perfectly sized for half-shell presentation. Learn why size matters and what makes these oysters special.",
    date: "2024-12-21",
    category: "Product",
    image: "/oyster.png",
    slug: "petite-oysters-2-5-inches",
    readTime: "3 min read",
    featured: false
  },
  {
    id: 17,
    title: "Oyster Freshness Checklist",
    excerpt: "Quick checklist to verify oyster freshness. Know what to look for when buying or using Texas Gulf oysters. Perfect for Instagram carousel!",
    date: "2024-12-22",
    category: "Process",
    image: "/oyster.png",
    slug: "oyster-freshness-checklist",
    readTime: "2 min read",
    featured: false
  },
  {
    id: 18,
    title: "Quick Oyster Facts",
    excerpt: "Fun facts about Texas Gulf oysters! Bite-sized interesting facts perfect for Instagram stories. Learn about oyster nutrition, farming, and more.",
    date: "2024-12-23",
    category: "Education",
    image: "/oyster.png",
    slug: "quick-oyster-facts",
    readTime: "3 min read",
    featured: false
  },
  {
    id: 19,
    title: "How Oysters Fight Climate Change: Carbon Sequestration Explained",
    excerpt: "Discover how oyster farming sequesters carbon and fights climate change. Learn about the environmental impact of sustainable aquaculture and how oysters help restore ocean health.",
    date: "2024-12-28",
    category: "Sustainability",
    image: "/topFarm.JPG",
    slug: "oysters-carbon-sequestration-climate-change",
    readTime: "7 min read",
    featured: true
  },
  {
    id: 20,
    title: "One Oyster Filters 50 Gallons of Water Per Day: The Environmental Impact",
    excerpt: "Discover how oysters filter water and improve water quality. Learn about the impressive environmental impact of oyster filtration and how it benefits marine ecosystems.",
    date: "2024-12-29",
    category: "Sustainability",
    image: "/enviromentBlog.jpg",
    slug: "oysters-water-filtration-environmental-impact",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 21,
    title: "Restoring Our Oceans: How Oyster Farming Rebuilds Marine Ecosystems",
    excerpt: "Learn how oyster farming creates habitats and restores marine ecosystems. Discover how sustainable aquaculture rebuilds biodiversity and supports ocean health.",
    date: "2024-12-30",
    category: "Sustainability",
    image: "/gal2.jpg",
    slug: "oyster-farming-ocean-restoration",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 22,
    title: "Why Oysters Are the Most Sustainable Seafood Choice",
    excerpt: "Discover why oysters are the most sustainable seafood option. Learn about their low environmental footprint, regenerative farming, and comparison to other seafood choices.",
    date: "2024-12-31",
    category: "Sustainability",
    image: "/oyster.png",
    slug: "why-oysters-sustainable-seafood-choice",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 23,
    title: "A Day in the Life: Behind the Scenes at Three Sisters Oyster Farm",
    excerpt: "Get an inside look at daily life on our sustainable oyster farm. Meet our team, see our process, and discover what it takes to grow premium Texas Gulf Coast oysters.",
    date: "2025-01-01",
    category: "Farming",
    image: "/aboutpic.jpg",
    slug: "day-in-life-oyster-farmer",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 24,
    title: "Oysters vs Other Seafood: Carbon Footprint Comparison",
    excerpt: "Compare the carbon footprint of oysters to other seafood options. Discover why oysters have the lowest environmental impact of any protein source.",
    date: "2025-01-05",
    category: "Sustainability",
    image: "/oyster.png",
    slug: "oysters-vs-other-seafood-carbon-footprint",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 25,
    title: "Why Keller Bay is Perfect for Oyster Farming",
    excerpt: "Discover why Keller Bay in Port Lavaca, Texas provides the perfect conditions for growing premium Gulf Coast oysters with exceptional flavor and quality.",
    date: "2025-01-06",
    category: "Farming",
    image: "/topFarm.JPG",
    slug: "keller-bay-oyster-farming-location",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 26,
    title: "Oyster Shell Recycling: Environmental Benefits",
    excerpt: "Learn how oyster shell recycling helps restore reefs, protect coastlines, and support marine ecosystems. Discover the environmental benefits of shell recycling programs.",
    date: "2025-01-07",
    category: "Sustainability",
    image: "/enviromentBlog.jpg",
    slug: "oyster-shell-recycling-environmental-benefits",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 27,
    title: "Best Oyster Recipes for Winter",
    excerpt: "Discover delicious winter oyster recipes perfect for cold weather. From grilled oysters to hearty stews, warm up with these comforting oyster dishes.",
    date: "2025-01-08",
    category: "Recipes",
    image: "/gal.jpg",
    slug: "best-oyster-recipes-winter",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 28,
    title: "Oyster Farming: The Future of Sustainable Food",
    excerpt: "Explore how oyster farming represents the future of sustainable food production. Learn about regenerative aquaculture and its role in feeding the world.",
    date: "2025-01-09",
    category: "Sustainability",
    image: "/topFarm.JPG",
    slug: "oyster-farming-sustainable-future",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 29,
    title: "How Oysters Improve Water Quality: The Science Explained",
    excerpt: "Learn the science behind how oysters improve water quality. Discover how filter feeding removes pollutants, reduces algae, and creates cleaner marine environments.",
    date: "2025-01-10",
    category: "Sustainability",
    image: "/enviromentBlog.jpg",
    slug: "how-oysters-improve-water-quality",
    readTime: "7 min read",
    featured: false
  }
]

// Helper function to get current week number (for rotation)
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

// Get all unique categories
const allCategories = Array.from(new Set(blogPosts.map(post => post.category))).sort()

// Weekly rotation for featured post
// Get posts that can be featured (high quality, important topics)
const featureablePosts = blogPosts.filter(post => 
  post.category === 'Sustainability' || 
  post.category === 'Farming' || 
  post.featured === true
)

// Calculate which featured post to show based on week
const currentWeek = getWeekNumber(new Date())
const featuredPostIndex = currentWeek % featureablePosts.length
const featuredPost = featureablePosts[featuredPostIndex] || blogPosts[0]

// Weekly rotation for spotlight posts (3-4 posts that rotate)
const spotlightPosts = blogPosts.filter(post => 
  post.id !== featuredPost.id && 
  (post.category === 'Sustainability' || post.category === 'Farming' || post.category === 'Recipes')
)
const spotlightStartIndex = currentWeek % Math.max(1, spotlightPosts.length - 3)
const weeklySpotlightPosts = spotlightPosts.slice(spotlightStartIndex, spotlightStartIndex + 4)

// Regular posts (exclude featured and spotlight)
const regularPosts = blogPosts.filter(post => 
  post.id !== featuredPost.id && 
  !weeklySpotlightPosts.some(spotlight => spotlight.id === post.id)
)

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return regularPosts
    }
    return regularPosts.filter(post => post.category === selectedCategory)
  }, [selectedCategory])

  // Count posts by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: regularPosts.length }
    allCategories.forEach(cat => {
      counts[cat] = regularPosts.filter(post => post.category === cat).length
    })
    return counts
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      {/* <SeasonalFloatingParticles count={8} /> */}
      
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="py-8 md:py-12 lg:py-20 px-4 sm:px-6 lg:px-8" role="main">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-4 md:mb-6 leading-tight">
              Texas Oyster Farm Blog
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-purple-800 max-w-4xl mx-auto leading-relaxed px-4">
              Stories from our sustainable oyster farm in Port Lavaca, Texas. Learn about Gulf Coast oysters, 
              sustainable aquaculture, and delicious seafood recipes.
            </p>
          </div>

          {/* Blog Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-purpleBrand/20">
              <Book className="w-6 h-6 text-purple-700 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">{blogPosts.length}</div>
              <div className="text-sm text-purple-600">Articles</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-purpleBrand/20">
              <Users className="w-6 h-6 text-purple-700 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">5+</div>
              <div className="text-sm text-purple-600">Categories</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-purpleBrand/20">
              <TrendingUp className="w-6 h-6 text-purple-700 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">Weekly</div>
              <div className="text-sm text-purple-600">Updates</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-purpleBrand/20">
              <Star className="w-6 h-6 text-purple-700 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">Fresh</div>
              <div className="text-sm text-purple-600">Content</div>
            </div>
          </div>

          {/* Featured Post */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6 text-center">Featured Article</h2>
            <p className="text-center text-purple-600 mb-6 text-sm">Rotates weekly to highlight different topics</p>
            <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-square relative overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={`${featuredPost.title} - Featured Texas oyster farm blog post`}
                    fill
                    className="object-cover"
                    quality={90}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purpleBrand/90 text-white text-sm">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-purple-600 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                  <Badge className="bg-purpleBrand/20 text-purple-800 border-purpleBrand/30 w-fit mb-4">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold text-purple-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-purple-700 leading-relaxed mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <Button asChild size="lg" className="bg-purpleBrand hover:bg-lavenderBrand text-white w-fit">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      Read Full Article
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Spotlight Posts (Weekly Rotation) */}
          {weeklySpotlightPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6 text-center">Weekly Spotlight</h2>
              <p className="text-center text-purple-600 mb-6 text-sm">Handpicked articles that rotate weekly</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {weeklySpotlightPosts.map((post) => (
                  <Card key={post.id} className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image
                        src={post.image}
                        alt={`${post.title} - Texas oyster farm blog post`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        quality={90}
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-purpleBrand/90 text-white text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-seafoamBrand/90 text-white text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Spotlight
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between text-xs text-purple-600 mb-2">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-lg font-bold text-purple-900 mb-2 line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <p className="text-purple-700 leading-relaxed text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Button asChild className="w-full bg-purpleBrand hover:bg-lavenderBrand text-white text-sm">
                        <Link href={`/blog/${post.slug}`}>
                          Read More
                          <ArrowUpRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Category Filter Tabs */}
          <div className="mb-8">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto bg-white/60 backdrop-blur-sm border border-purpleBrand/20 p-1">
                <TabsTrigger 
                  value="All" 
                  className="data-[state=active]:bg-purpleBrand data-[state=active]:text-white text-purple-900"
                >
                  All ({categoryCounts.All || 0})
                </TabsTrigger>
                {allCategories.map((category) => (
                  <TabsTrigger 
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-purpleBrand data-[state=active]:text-white text-purple-900"
                  >
                    {category} ({categoryCounts[category] || 0})
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={selectedCategory} className="mt-6">
                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                <Card key={post.id} className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image}
                      alt={`${post.title} - Texas oyster farm blog post`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      quality={90}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-purpleBrand/90 text-white text-xs">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between text-xs text-purple-600 mb-2">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-purple-900 mb-2 line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <p className="text-purple-700 leading-relaxed text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Button asChild className="w-full bg-purpleBrand hover:bg-lavenderBrand text-white text-sm">
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowUpRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-purple-600 text-lg">No posts found in this category.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-2xl p-6 md:p-8 border border-purpleBrand/20 mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-4">
                Stay Updated with Our Farm
              </h2>
              <p className="text-purple-800 mb-6 text-lg">
                Get the latest news about our sustainable oyster farming, new products, and seasonal updates 
                delivered straight to your inbox. Join our community of oyster enthusiasts!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-purpleBrand/30 focus:border-purpleBrand focus:ring-2 focus:ring-purpleBrand/20 text-purple-900 placeholder-purple-500"
                />
                <Button className="bg-purpleBrand hover:bg-lavenderBrand text-white px-6 py-3">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-purple-600 mt-3">
                No spam, just fresh oyster news. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purpleBrand/30">
            <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-4">
              Ready to Experience Our Oysters?
            </h2>
            <p className="text-purple-800 mb-6 max-w-2xl mx-auto text-lg">
              After reading about our sustainable farming practices and delicious recipes, 
              why not try our premium Texas Gulf oysters for yourself?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                <Link href="/products">Shop Fresh Oysters</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-purpleBrand text-purpleBrand hover:bg-purpleBrand hover:text-white">
                <Link href="/about">Learn About Our Farm</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-purpleBrand text-purpleBrand hover:bg-purpleBrand hover:text-white">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
