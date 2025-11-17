import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Contact Us | Three Sisters Oyster Co. | Port Lavaca Texas',
  description: 'Order fresh Texas oysters or schedule a farm visit. Call (713) 854-7427 or email info@threesistersoyster.com. Located in Port Lavaca, Texas.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Three Sisters Oyster Co. | Port Lavaca Texas',
    description: 'Get in touch with Three Sisters Oyster Co. for fresh oyster orders, custom requests, or farm visits. Located in Port Lavaca, Texas.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Three Sisters Oyster Co. | Port Lavaca Texas',
    description: 'Get in touch with Three Sisters Oyster Co. for fresh oyster orders, custom requests, or farm visits. Located in Port Lavaca, Texas.',
  },
}

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <Script id="local-business-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Three Sisters Oyster Co.",
            "image": `${siteUrl}/logo.jpg`,
            "description": "Family-owned sustainable oyster farm in Port Lavaca, Texas. Premium Gulf Coast oysters for restaurants, events, and seafood lovers.",
            "url": siteUrl,
            "telephone": "+1-713-854-7427",
            "email": "info@threesistersoyster.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "106 Grant St.",
              "addressLocality": "Port Lavaca",
              "addressRegion": "TX",
              "postalCode": "77979",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "28.6144",
              "longitude": "-96.6250"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "16:00"
              }
            ],
            "priceRange": "$$",
            "servesCuisine": "Seafood",
            "areaServed": {
              "@type": "State",
              "name": "Texas"
            }
          })
        }}
      />
      <SeasonalFloatingParticles count={8} />
      
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8" role="main">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-purple-800 max-w-3xl mx-auto leading-relaxed">
              Get in touch with Three Sisters Oyster Co. for premium oyster orders, custom dining requests, 
              or to learn more about our exceptional Gulf Coast oysters and sustainable farming practices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-900">Get In Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purpleBrand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">Phone</h3>
                      <p className="text-purple-800 mb-2">(713) 854-7427</p>
                      <p className="text-sm text-purple-600">Call for orders and inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purpleBrand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">Email</h3>
                      <p className="text-purple-800 mb-2">info@threesistersoyster.com</p>
                      <p className="text-sm text-purple-600">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purpleBrand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">Location</h3>
                      <p className="text-purple-800 mb-2">Port Lavaca, Texas</p>
                      <p className="text-sm text-purple-600">Keller Bay Oyster Farm</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purpleBrand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">Business Hours</h3>
                      <p className="text-purple-800 mb-1">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-purple-800 mb-2">Saturday: 9:00 AM - 4:00 PM</p>
                      <p className="text-sm text-purple-600">Sunday: By appointment only</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full bg-purpleBrand hover:bg-lavenderBrand text-white">
                    <a href="tel:713-854-7427">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <a href="mailto:info@threesistersoyster.com">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                    <a href="/products">
                      View Products
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-900">Send Us a Message</CardTitle>
                  <p className="text-purple-700">
                    Have a question about our oysters or need a custom order? We'd love to hear from you.
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-purple-900 font-medium">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Your first name"
                          className="mt-1 border-purpleBrand/30 focus:border-purpleBrand focus:ring-purpleBrand/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-purple-900 font-medium">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Your last name"
                          className="mt-1 border-purpleBrand/30 focus:border-purpleBrand focus:ring-purpleBrand/20"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-purple-900 font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="mt-1 border-purpleBrand/30 focus:border-purpleBrand focus:ring-purpleBrand/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-purple-900 font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="mt-1 border-purpleBrand/30 focus:border-purpleBrand focus:ring-purpleBrand/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-purple-900 font-medium">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="What can we help you with?"
                        className="mt-1 border-purpleBrand/30 focus:border-purpleBrand focus:ring-purpleBrand/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-purple-900 font-medium">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your inquiry, order requirements, or any questions you have..."
                        rows={6}
                        className="mt-1 border-purpleBrand/30 focus:border-purpleBrand focus:ring-purpleBrand/20"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-purpleBrand hover:bg-lavenderBrand text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16">
            <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">Why Choose Three Sisters Oyster?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purpleBrand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌊</span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Sustainable Farming</h3>
                    <p className="text-purple-700">
                      Our environmentally responsible methods enhance oyster flavor while protecting the Gulf Coast ecosystem.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purpleBrand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⭐</span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Premium Quality</h3>
                    <p className="text-purple-700">
                      Every oyster is carefully cultivated and quality-tested to deliver exceptional taste, texture, and freshness that elevates every dining experience.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purpleBrand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🚚</span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Fresh Delivery</h3>
                    <p className="text-purple-700">
                      From our farm to your table, we ensure fast, fresh delivery that preserves the peak flavor and quality of our premium Texas oysters.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
