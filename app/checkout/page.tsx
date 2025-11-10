import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout | Three Sisters Oyster Co.",
  description: "Online checkout is paused. Reserve your oysters for pickup and pay with cash or card when you arrive.",
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative overflow-hidden">
      <SeasonalFloatingParticles count={10} />
      <Navigation />

      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="border-purpleBrand/20 bg-white/70 backdrop-blur">
            <CardContent className="space-y-6 p-8 text-center text-purple-800">
              <h1 className="text-3xl font-bold text-purple-900">Reserve Instead of Checkout</h1>
              <p>
                Stripe checkout is currently offline. Reserve your oysters for pickup and pay safely with cash or card at
                the farm. We’ll confirm availability and pickup details by email.
              </p>
              <div className="rounded-lg border border-amber-400 bg-amber-50/70 px-4 py-3 text-sm text-amber-800">
                All pickups happen Friday–Sunday. Orders placed Monday–Wednesday are ready the same weekend.
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-purpleBrand/90 hover:to-seafoamBrand/90"
                >
                  <Link href="/reserve">Reserve for Pickup</Link>
                </Button>
                <Button asChild variant="outline" className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10">
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
              <p className="text-sm text-purple-700">
                Questions? Call <a href="tel:713-854-7427" className="underline">713-854-7427</a> or email{" "}
                <a href="mailto:info@threesistersoyster.com" className="underline">info@threesistersoyster.com</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
