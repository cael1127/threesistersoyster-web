import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowUpRight, CheckCircle, AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
// import { // // SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'Oyster Shucking Techniques: A Complete Guide | Three Sisters Oyster Blog',
  description: 'Master the art of oyster shucking with our comprehensive guide. Learn proper techniques, safety tips, and tools needed to safely open fresh Texas Gulf oysters.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/oyster-shucking-techniques' },
  openGraph: {
    title: 'Oyster Shucking Techniques: A Complete Guide | Three Sisters Oyster Blog',
    description: 'Master the art of oyster shucking with our comprehensive guide. Learn proper techniques, safety tips, and tools needed to safely open fresh Texas Gulf oysters.',
    url: '/blog/oyster-shucking-techniques',
    type: 'article',
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'Oyster Shucking Techniques - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyster Shucking Techniques: A Complete Guide | Three Sisters Oyster Blog',
    description: 'Master the art of oyster shucking with our comprehensive guide. Learn proper techniques, safety tips, and tools needed to safely open fresh Texas Gulf oysters.',
    images: ['/placeholder.jpg'],
  },
}

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Techniques</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 5, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Oyster Shucking Techniques: A Complete Guide
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Master the art of oyster shucking with our comprehensive guide. Learn proper techniques, 
                safety tips, and tools needed to safely open fresh Texas Gulf oysters.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/placeholder.jpg"
                alt="Oyster Shucking Techniques - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                Shucking oysters is both an art and a skill that every seafood lover should master. 
                With the right technique and tools, you can safely and efficiently open fresh Texas 
                Gulf oysters to enjoy their briny, delicious flavor. This guide will walk you through 
                everything you need to know.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Essential Tools</h2>
              <p className="mb-6">
                Before you start shucking, you'll need the right tools. A good oyster knife is essential, 
                along with a few other items to make the process safe and efficient.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Required Tools</h3>
                    <ul className="space-y-2 text-purple-700">
                      <li>• Oyster knife (short, thick blade)</li>
                      <li>• Heavy-duty gloves</li>
                      <li>• Clean kitchen towel</li>
                      <li>• Bowl for shells</li>
                      <li>• Ice for serving</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Safety First</h3>
                    <ul className="space-y-2 text-purple-700">
                      <li>• Always wear cut-resistant gloves</li>
                      <li>• Keep knives sharp and clean</li>
                      <li>• Work on a stable surface</li>
                      <li>• Discard any damaged oysters</li>
                      <li>• Keep children away from shucking area</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Step-by-Step Shucking Process</h2>
              
              <div className="space-y-6 my-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purpleBrand text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-lg font-bold text-purple-900 mb-2">Prepare Your Workstation</h3>
                    <p className="text-purple-700">Set up a clean, stable surface with all your tools within reach. Place a damp towel under the oyster to prevent slipping.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purpleBrand text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-lg font-bold text-purple-900 mb-2">Find the Hinge</h3>
                    <p className="text-purple-700">Locate the hinge where the two shells meet. This is where you'll insert your knife to pry the shells apart.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purpleBrand text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-lg font-bold text-purple-900 mb-2">Insert the Knife</h3>
                    <p className="text-purple-700">Gently but firmly insert the tip of your oyster knife into the hinge. Twist slightly to create a small opening.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purpleBrand text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-lg font-bold text-purple-900 mb-2">Cut the Muscle</h3>
                    <p className="text-purple-700">Once the shells are separated, slide the knife along the top shell to cut the adductor muscle that holds the oyster in place.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purpleBrand text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                  <div>
                    <h3 className="text-lg font-bold text-purple-900 mb-2">Remove Top Shell</h3>
                    <p className="text-purple-700">Carefully lift off the top shell, keeping the oyster and its liquid in the bottom shell. Check for any shell fragments.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purpleBrand text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">6</div>
                  <div>
                    <h3 className="text-lg font-bold text-purple-900 mb-2">Serve Immediately</h3>
                    <p className="text-purple-700">Place the shucked oyster on ice and serve immediately. The fresher, the better!</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Common Mistakes to Avoid</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
                      <h3 className="text-lg font-bold text-red-900">Don't Do This</h3>
                    </div>
                    <ul className="space-y-2 text-red-700 text-sm">
                      <li>• Using a regular kitchen knife</li>
                      <li>• Shucking without gloves</li>
                      <li>• Forcing the knife too hard</li>
                      <li>• Shucking damaged oysters</li>
                      <li>• Letting oysters sit too long after shucking</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                      <h3 className="text-lg font-bold text-green-900">Do This Instead</h3>
                    </div>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li>• Use a proper oyster knife</li>
                      <li>• Always wear safety gloves</li>
                      <li>• Work with gentle, firm pressure</li>
                      <li>• Inspect oysters before shucking</li>
                      <li>• Serve immediately after shucking</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Tips for Perfect Shucking</h2>
              <p className="mb-6">
                With practice, you'll develop your own rhythm and technique. Here are some pro tips 
                to help you shuck like a professional:
              </p>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Pro Tips</h3>
                <ul className="space-y-3 text-purple-700">
                  <li>• <strong>Keep it cold:</strong> Work with chilled oysters for easier shucking</li>
                  <li>• <strong>Practice makes perfect:</strong> Start with larger oysters and work your way down</li>
                  <li>• <strong>Use the right angle:</strong> Insert the knife at a slight angle to the hinge</li>
                  <li>• <strong>Be patient:</strong> Don't rush the process - safety first</li>
                  <li>• <strong>Clean as you go:</strong> Keep your workspace clean and organized</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20 mt-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Ready to Practice?</h3>
                <p className="mb-4">
                  Now that you know the techniques, it's time to practice with fresh Texas Gulf oysters. 
                  Our premium oysters are perfect for learning to shuck - they're fresh, clean, and 
                  have excellent shell integrity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Fresh Oysters</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/contact">Ask Our Experts</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/sustainable-aquaculture-commitment">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Sustainable Aquaculture
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-wine-pairing-guide">
                Next: Oyster Wine Pairing Guide
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
