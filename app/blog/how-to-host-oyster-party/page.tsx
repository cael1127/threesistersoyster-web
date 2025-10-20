import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ArrowRight, Users, ChefHat, Sparkles, Wine, ShoppingCart, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export const metadata: Metadata = {
  title: 'How to Host an Oyster Party at Home | Three Sisters Oyster Blog',
  description: 'Learn how to plan and host the perfect oyster party at home. Expert tips on quantities, setup, pairings, and creating an unforgettable oyster bar experience.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/blog/how-to-host-oyster-party' },
  openGraph: {
    title: 'How to Host an Oyster Party at Home | Three Sisters Oyster Blog',
    description: 'Learn how to plan and host the perfect oyster party at home. Expert tips on quantities, setup, pairings, and creating an unforgettable oyster bar experience.',
    url: '/blog/how-to-host-oyster-party',
    type: 'article',
    images: [
      {
        url: '/gal1.jpg',
        width: 1200,
        height: 630,
        alt: 'How to Host an Oyster Party - Three Sisters Oyster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Host an Oyster Party at Home | Three Sisters Oyster Blog',
    description: 'Learn how to plan and host the perfect oyster party at home. Expert tips on quantities, setup, pairings, and creating an unforgettable oyster bar experience.',
    images: ['/gal1.jpg'],
  },
}

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <SeasonalFloatingParticles count={8} />
      
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
              <Badge className="bg-purpleBrand/90 text-white mb-4">Events</Badge>
              <div className="flex items-center text-sm text-purple-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                December 15, 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
                How to Host an Oyster Party at Home
              </h1>
              <p className="text-xl text-purple-800 leading-relaxed">
                Learn how to plan and host the perfect oyster party at home. Expert tips on quantities, 
                setup, pairings, and creating an unforgettable oyster bar experience.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src="/gal1.jpg"
                alt="How to Host an Oyster Party - Three Sisters Oyster"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-purple-800">
              <p className="text-lg leading-relaxed mb-6">
                There's something special about gathering friends and family around a table laden with fresh 
                oysters. An oyster party combines casual elegance with interactive dining, making it perfect 
                for celebrations, game days, or any occasion worth commemorating. With proper planning and 
                the right setup, you can create an impressive oyster bar experience right in your own home.
              </p>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Planning Your Oyster Party</h2>
              
              <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-purple-700 mr-3" />
                    <h3 className="text-xl font-bold text-purple-900">How Many Oysters Per Person?</h3>
                  </div>
                  <div className="space-y-3 text-purple-700">
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">As an Appetizer:</h4>
                      <p className="text-sm">
                        <strong>4-6 oysters per person</strong> if you're serving other appetizers and a full meal afterward.
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">As the Main Event:</h4>
                      <p className="text-sm">
                        <strong>12-18 oysters per person</strong> if oysters are the star of your party with minimal other food.
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">For Enthusiasts:</h4>
                      <p className="text-sm">
                        <strong>24+ oysters per person</strong> for serious oyster lovers at a dedicated shucking party.
                      </p>
                    </div>
                  </div>
                  <p className="text-purple-600 text-sm mt-4">
                    <strong>Pro Tip:</strong> Always order 10-15% extra to account for enthusiastic guests and 
                    any oysters that might not open properly.
                  </p>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">The Essential Shopping List</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <ShoppingCart className="w-6 h-6 text-blue-600 mr-2" />
                      <h3 className="text-lg font-bold text-purple-900">Fresh Ingredients</h3>
                    </div>
                    <ul className="space-y-2 text-purple-700 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Fresh oysters (order 2-3 days ahead)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Lemons and limes (1-2 per dozen oysters)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Shallots (for mignonette)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Fresh horseradish root (or prepared)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Cocktail sauce ingredients</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Hot sauce (Tabasco, Louisiana style)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Champagne vinegar (for mignonette)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <ChefHat className="w-6 h-6 text-purple-600 mr-2" />
                      <h3 className="text-lg font-bold text-purple-900">Equipment & Supplies</h3>
                    </div>
                    <ul className="space-y-2 text-purple-700 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Oyster knife (multiple if guests will shuck)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Heavy kitchen towel or oyster glove</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Large platters or sheet pans</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Crushed ice (lots of it!)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Small bowls for sauces</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Oyster forks (cocktail forks work too)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Napkins (lots of them!)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Cooler or bucket for oyster storage</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Setting Up Your Oyster Bar</h2>
              <p className="mb-6">
                The presentation is half the fun! A well-organized oyster bar is both functional and impressive. 
                Here's how to create the perfect setup:
              </p>

              <Card className="border-purpleBrand/30 bg-gradient-to-br from-seafoamBrand/10 to-mintBrand/10 mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">The Perfect Oyster Bar Layout</h3>
                  <div className="space-y-4">
                    <div className="bg-white/60 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Layer 1: The Ice Bed</h4>
                      <p className="text-purple-700 text-sm">
                        Cover large platters or sheet pans with 2-3 inches of crushed ice. This keeps oysters 
                        cold and provides a stable, attractive base. Refresh ice throughout the party.
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Layer 2: The Oysters</h4>
                      <p className="text-purple-700 text-sm">
                        Arrange shucked oysters on the half shell in neat rows on the ice bed. Cup side down 
                        helps prevent spills. Leave shells slightly tilted so the liquor stays in.
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Layer 3: Garnishes</h4>
                      <p className="text-purple-700 text-sm">
                        Scatter lemon and lime wedges around the platter for color and easy access. Add fresh 
                        herbs like parsley or dill for visual appeal.
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Accompaniments Station</h4>
                      <p className="text-purple-700 text-sm">
                        Set up small bowls nearby with: classic mignonette, cocktail sauce, hot sauce, prepared 
                        horseradish, and extra lemon wedges. Label each sauce for guests unfamiliar with oysters.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Classic Oyster Accompaniments</h2>

              <div className="space-y-6 mb-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-red-50 to-rose-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-3">Classic Mignonette</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      The most traditional oyster sauce—a simple but elegant complement that enhances rather 
                      than masks the oyster's flavor.
                    </p>
                    <div className="bg-white/60 rounded-lg p-4">
                      <p className="text-purple-900 font-semibold mb-2 text-sm">Recipe:</p>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• 1/2 cup champagne vinegar</li>
                        <li>• 2 shallots, finely minced</li>
                        <li>• 1 tbsp cracked black pepper</li>
                        <li>• Pinch of salt</li>
                      </ul>
                      <p className="text-purple-600 text-xs mt-2">
                        Combine and let sit for 30 minutes before serving. Makes enough for 3-4 dozen oysters.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-orange-50 to-amber-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-3">Spicy Cocktail Sauce</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      An American classic that adds tangy sweetness and a horseradish kick.
                    </p>
                    <div className="bg-white/60 rounded-lg p-4">
                      <p className="text-purple-900 font-semibold mb-2 text-sm">Recipe:</p>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• 1 cup ketchup</li>
                        <li>• 2 tbsp prepared horseradish</li>
                        <li>• 2 tbsp lemon juice</li>
                        <li>• 1 tsp Worcestershire sauce</li>
                        <li>• Hot sauce to taste</li>
                      </ul>
                      <p className="text-purple-600 text-xs mt-2">
                        Mix well and refrigerate for at least 1 hour to let flavors meld.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Beverage Pairings</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-yellow-50 to-amber-50">
                  <CardContent className="p-6">
                    <Wine className="w-8 h-8 text-yellow-600 mb-3" />
                    <h3 className="text-lg font-bold text-purple-900 mb-2">Champagne & Sparkling</h3>
                    <p className="text-purple-700 text-sm">
                      The classic pairing. Crisp bubbles and bright acidity cut through the oyster's richness. 
                      Try Champagne, Prosecco, or Cava.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-6">
                    <Wine className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="text-lg font-bold text-purple-900 mb-2">Crisp White Wines</h3>
                    <p className="text-purple-700 text-sm">
                      Muscadet, Chablis, Albariño, or Sauvignon Blanc all offer bright acidity and mineral 
                      notes that complement oysters beautifully.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <Wine className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="text-lg font-bold text-purple-900 mb-2">Beer & Stout</h3>
                    <p className="text-purple-700 text-sm">
                      Light lagers and pilsners work well, but try a dry stout for a surprising classic 
                      pairing with briny oysters.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20 mb-8">
                <h3 className="text-xl font-bold text-purple-900 mb-3">Non-Alcoholic Options</h3>
                <p className="text-purple-700 text-sm">
                  Sparkling water with lemon, cucumber-mint water, or a crisp ginger beer all provide the 
                  palate-cleansing refreshment that pairs well with oysters.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Shucking Station Tips</h2>
              <p className="mb-6">
                If you want to involve your guests in the shucking process (which many find fun and rewarding), 
                set up a dedicated shucking station:
              </p>

              <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/5 to-lavenderBrand/5 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Sparkles className="w-8 h-8 text-purple-700 mr-3" />
                    <h3 className="text-xl font-bold text-purple-900">Interactive Shucking Setup</h3>
                  </div>
                  <ul className="space-y-3 text-purple-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-purpleBrand font-bold mr-2">•</span>
                      <span>
                        <strong>Safety First:</strong> Provide heavy towels or oyster gloves for every shucker. 
                        Demonstrate proper technique before letting guests try.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purpleBrand font-bold mr-2">•</span>
                      <span>
                        <strong>Multiple Knives:</strong> Have 2-3 oyster knives available so people can take 
                        turns without waiting.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purpleBrand font-bold mr-2">•</span>
                      <span>
                        <strong>Shell Disposal:</strong> Set up a large bowl or bucket specifically for empty shells.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purpleBrand font-bold mr-2">•</span>
                      <span>
                        <strong>Pre-Shuck Option:</strong> Consider shucking half the oysters in advance for guests 
                        who prefer not to participate.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Timing Your Party</h2>
              
              <div className="bg-gradient-to-r from-blueBrand/10 via-mintBrand/10 to-seafoamBrand/10 rounded-lg p-6 border border-purpleBrand/20 mb-8">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Party Timeline</h3>
                <div className="space-y-3 text-purple-700 text-sm">
                  <div className="flex">
                    <span className="font-bold text-purple-900 w-32">2-3 days before:</span>
                    <span>Order fresh oysters from Three Sisters Oyster</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-purple-900 w-32">1 day before:</span>
                    <span>Shop for accompaniments, make mignonette and cocktail sauce</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-purple-900 w-32">4-6 hours before:</span>
                    <span>Purchase ice, clean oyster shells if pre-shucking any</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-purple-900 w-32">2 hours before:</span>
                    <span>Set up oyster bar station, prepare garnishes</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-purple-900 w-32">1 hour before:</span>
                    <span>Begin shucking oysters if pre-shucking (shuck in batches)</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-purple-900 w-32">30 min before:</span>
                    <span>Set oysters on ice, arrange garnishes, chill beverages</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Safety and Handling</h2>
              
              <Card className="border-purpleBrand/30 bg-gradient-to-br from-red-50 to-pink-50 mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">Important Safety Tips</h3>
                  <ul className="space-y-2 text-purple-700 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Keep oysters refrigerated at 35-40°F until serving</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Once shucked, serve oysters within 2 hours</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Discard any oysters with broken shells or off odors</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Keep shucked oysters on ice at all times during the party</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Wash hands thoroughly before and after handling oysters</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Use separate towels for shucking and hand-drying</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-purple-900 mt-8 mb-4">Beyond Raw Oysters</h2>
              <p className="mb-6">
                While raw oysters are the star, consider adding variety to your party:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-orange-50 to-red-50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-purple-900 mb-2">Chargrilled Oysters</h4>
                    <p className="text-purple-700 text-sm">
                      Top with garlic butter, parmesan, and herbs, then grill until bubbly. A crowd-pleaser 
                      for those hesitant about raw oysters.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-green-50 to-teal-50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-purple-900 mb-2">Oyster Shooters</h4>
                    <p className="text-purple-700 text-sm">
                      Serve oysters in shot glasses with cocktail sauce and vodka for a fun, party-friendly 
                      presentation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-purple-900 mb-2">Oyster Po' Boys</h4>
                    <p className="text-purple-700 text-sm">
                      Lightly fried oysters on French bread with remoulade sauce make excellent sliders for 
                      a more substantial offering.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purpleBrand/30 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-purple-900 mb-2">Baked Oysters</h4>
                    <p className="text-purple-700 text-sm">
                      Oysters Rockefeller or Bienville add an elegant, cooked option that showcases oysters 
                      in a different way.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-purpleBrand/10 via-lavenderBrand/10 to-blueBrand/10 rounded-lg p-6 border border-purpleBrand/20">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Ready to Host Your Oyster Party?</h3>
                <p className="mb-4">
                  Order premium Texas Gulf oysters from Three Sisters Oyster and create an unforgettable 
                  experience for your guests. Our fresh, sustainably farmed oysters are perfect for any 
                  celebration. We'll help you calculate quantities and provide tips for your specific event.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <Link href="/products">Order Party Oysters</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <Link href="/contact">Get Party Planning Help</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation to Other Posts */}
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog/oyster-merroir-flavor-guide">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Oyster Merroir
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
              <Link href="/blog">
                Back to All Posts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

