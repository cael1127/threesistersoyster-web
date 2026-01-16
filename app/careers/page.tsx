import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import EmploymentForm from "@/components/EmploymentForm"
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Waves, Users, Heart, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers | Join Our Team | Three Sisters Oyster Co.",
  description:
    "Join the Three Sisters Oyster Co. team! We're looking for passionate individuals interested in sustainable aquaculture and oyster farming in Port Lavaca, Texas.",
  keywords: [
    "oyster farm jobs",
    "aquaculture careers",
    "marine biology jobs",
    "Port Lavaca jobs",
    "Texas oyster farming",
    "sustainable agriculture jobs",
    "Three Sisters Oyster jobs",
    "farming jobs Texas"
  ],
  openGraph: {
    title: "Careers | Join Our Team | Three Sisters Oyster Co.",
    description:
      "Join the Three Sisters Oyster Co. team! We're looking for passionate individuals interested in sustainable aquaculture and oyster farming.",
    images: [
      {
        url: '/oyster.png',
        width: 1200,
        height: 630,
        alt: 'Three Sisters Oyster Co. Careers',
      },
    ],
  },
}

export default function CareersPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative overflow-hidden">
      <SeasonalFloatingParticles count={10} />
      <Navigation />

      <main className="flex-1 py-10 px-4" role="main">
        <div className="container mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <header className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">Join Our Team</h1>
            <p className="text-lg text-purple-900 max-w-3xl mx-auto drop-shadow-sm">
              We're passionate about sustainable aquaculture and growing the best oysters on the Texas Gulf Coast. 
              Join us in making a difference while working in a beautiful coastal environment.
            </p>
          </header>

          {/* Why Work With Us */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purpleBrand to-lavenderBrand rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-center text-purple-900">Sustainable Aquaculture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800 text-center">
                  Be part of a mission to improve water quality and support marine ecosystems through sustainable oyster farming.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-mintBrand to-seafoamBrand rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-center text-purple-900">Family-Owned Business</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800 text-center">
                  Work with a tight-knit team where your contributions matter and you're part of something meaningful.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blueBrand to-mintBrand rounded-full flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-center text-purple-900">Growth Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800 text-center">
                  Learn valuable skills in aquaculture, marine biology, and sustainable farming practices.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div className="mb-8">
            <EmploymentForm />
          </div>

          {/* Additional Information */}
          <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-purple-900 text-center">What We're Looking For</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-purple-800">
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">Passion for the Environment</h3>
                <p>
                  We're committed to sustainable practices and improving our local marine environment. 
                  Ideal candidates share our passion for environmental stewardship.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">Willingness to Learn</h3>
                <p>
                  Oyster farming involves hands-on work in various conditions. We provide training, but a positive attitude 
                  and willingness to learn are essential.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">Team Player</h3>
                <p>
                  As a small, family-owned operation, teamwork and communication are crucial. 
                  We work together to ensure the best quality oysters reach our customers.
                </p>
              </div>
              <div className="pt-4 border-t border-purpleBrand/20">
                <p className="text-sm text-purple-700">
                  Have questions? Feel free to reach out to us at{" "}
                  <a href="mailto:blake@threesistersoyster.com" className="text-purpleBrand underline">
                    blake@threesistersoyster.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:713-854-7427" className="text-purpleBrand underline">
                    713-854-7427
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
