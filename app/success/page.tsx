"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Waves, Package, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      // Fetch session details
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSession(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching session:", error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Header */}
      <header className="bg-gradient-to-r from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand border-b border-purple-300/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-teal-600 rounded-full flex items-center justify-center">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-purple-900">Three Sisters Oyster Co.</h1>
              <p className="text-sm text-teal-600">Premium Texas Oysters</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold text-purple-900 mb-4">Order Confirmed!</h1>

              <p className="text-gray-600 mb-6">
                Thank you for your order! Your payment has been processed successfully and we'll begin preparing your
                fresh Texas oysters.
              </p>

              {session && (
                <div className="bg-white p-6 rounded-lg border border-green-200 mb-6">
                  <h3 className="font-semibold text-purple-900 mb-4 flex items-center justify-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-mono text-purple-700">{session.id?.slice(-8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-green-600">${(session.amount_total / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-green-600 font-medium">Confirmed</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-purple-100 to-teal-100 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-purple-900 mb-3">What happens next?</h3>
                <ul className="text-sm text-gray-700 space-y-2 text-left">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    You'll receive an email confirmation shortly
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    We'll contact you within 24 hours to arrange delivery or pickup
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Your fresh oysters will be prepared and ready
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Enjoy the finest Texas oysters from Keller Bay!
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <Phone className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Questions?</p>
                  <a href="tel:713-854-7427" className="text-xs text-purple-600 hover:underline">
                    713-854-7427
                  </a>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <Mail className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Email Us</p>
                  <a href="mailto:info@threesistersoyster.com" className="text-xs text-teal-600 hover:underline">
                    info@threesistersoyster.com
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-teal-600">
                    <Link href="/">Return Home</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
