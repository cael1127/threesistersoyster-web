import { ReserveForm } from "@/components/reserve/reserve-form"
import Navigation from "@/components/Navigation"
import { SeasonalFloatingParticles } from "@/components/ui/floating-particles"
import { getProducts, type Product } from "@/lib/supabase"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reserve Fresh Oysters | Three Sisters Oyster Co.",
  description:
    "Reserve fresh Texas oysters for pickup at Three Sisters Oyster Co. Choose your items, schedule pickup, and pay with cash or card when you arrive.",
}

type ReservePageProps = {
  searchParams?: Record<string, string | string[] | undefined>
}

export default async function ReservePage({ searchParams }: ReservePageProps) {
  let products: Product[] = []

  try {
    products = await getProducts()
  } catch (error) {
    console.error("Failed to load products for reservations:", error)
  }

  const focusParam = searchParams?.focus
  const focusId = Array.isArray(focusParam) ? focusParam[0] : focusParam

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative overflow-hidden">
      <SeasonalFloatingParticles count={12} />
      <Navigation />
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-6xl space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-purple-900">Reserve Your Pickup</h1>
            <p className="text-lg text-purple-800 max-w-3xl mx-auto">
              Build your oyster order and reserve a pickup window with the Three Sisters crew. We’ll confirm by email and
              you can pay with cash or card when you arrive.
            </p>
          </header>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-purpleBrand/20 bg-white/70 p-10 text-center text-purple-800 shadow-lg">
              <h2 className="text-2xl font-semibold text-purple-900 mb-3">Reservations Temporarily Unavailable</h2>
              <p className="mb-4">
                We couldn’t load our product list right now. Please refresh the page or call{" "}
                <a href="tel:713-854-7427" className="underline">
                  713-854-7427
                </a>{" "}
                to schedule your pickup.
              </p>
            </div>
          ) : (
            <ReserveForm products={products} focusId={focusId} />
          )}
        </div>
      </main>
    </div>
  )
}

