import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles"
import Link from "next/link"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative overflow-hidden">
      <SeasonalFloatingParticles count={10} />
      <Navigation />

      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="border-purpleBrand/20 bg-white/70 backdrop-blur">
            <CardContent className="space-y-6 p-8 text-center text-purple-800">
              <h1 className="text-3xl font-bold text-purple-900">Online Checkout Paused</h1>
              <p>
                We’ve moved away from online cart checkout so we can focus on fresh, made-to-order pickup. Reserve what
                you need and pay with cash or card when you arrive at Three Sisters Oyster Co.
              </p>
              <div className="rounded-lg border border-amber-400 bg-amber-50/70 px-4 py-3 text-sm text-amber-800">
                Reserve the exact pickup day you want (Tuesday–Sunday), at least two days ahead, between 12 PM and 7 PM.
                We’ll follow up quickly with any updates.
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
                Need help? Call or text <a href="tel:713-854-7427" className="underline">713-854-7427</a>—we’ll get back to you quickly.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
