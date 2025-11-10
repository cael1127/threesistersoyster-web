"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Check, Loader2 } from "lucide-react"

type ReserveProduct = {
  id: string
  name: string
  price: number
  category: string
  image_url?: string | null
  inventory_count?: number | null
  description?: string | null
}

type ReserveFormProps = {
  products: ReserveProduct[]
  focusId?: string
}

export function ReserveForm({ products, focusId }: ReserveFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    const initialQuantities = products.reduce<Record<string, number>>((acc, product) => {
      acc[product.id] = product.id === focusId ? 1 : 0
      return acc
    }, {})
    setQuantities(initialQuantities)
  }, [products, focusId])

  const total = useMemo(() => {
    return products.reduce((sum, product) => {
      const quantity = quantities[product.id] || 0
      return sum + product.price * quantity
    }, 0)
  }, [products, quantities])

  const selectedItems = useMemo(() => {
    return products
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantities[product.id] || 0,
      }))
      .filter((item) => item.quantity > 0)
  }, [products, quantities])

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, Math.min(quantity, 999)),
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccessMessage(null)

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please provide your name and email so we can confirm your reservation.")
      return
    }

    if (selectedItems.length === 0) {
      setError("Choose at least one item to reserve for pickup.")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/reserve-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.name.trim(),
          customer_email: formData.email.trim(),
          customer_phone: formData.phone.trim(),
          notes: formData.notes.trim() || undefined,
          items: selectedItems,
          total_amount: total,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        const message =
          data?.details ||
          data?.error ||
          "We couldn't save your reservation. Please try again or call us at 713-854-7427."
        setError(message)
        return
      }

      const pickupCode = data.order?.pickup_code || ""
      const orderId = data.order?.id || ""
      const totalAmount = total.toFixed(2)

      setSuccessMessage("Reservation confirmed! Redirecting to your receipt…")

      setTimeout(() => {
        router.push(
          `/success?reservation=true&code=${encodeURIComponent(pickupCode)}&orderId=${encodeURIComponent(
            orderId,
          )}&total=${encodeURIComponent(totalAmount)}`,
        )
      }, 1200)
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Unexpected error while reserving. Please try again or contact us directly."
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <Card className="border-purpleBrand/20 bg-white/60 backdrop-blur">
          <CardHeader className="border-b border-purpleBrand/10">
            <CardTitle className="text-purple-900">Contact Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <Label htmlFor="reserve-name" className="text-purple-800">
                Name *
              </Label>
              <Input
                id="reserve-name"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                required
                className="border-purpleBrand/30 focus-visible:ring-purpleBrand"
              />
            </div>
            <div>
              <Label htmlFor="reserve-email" className="text-purple-800">
                Email *
              </Label>
              <Input
                id="reserve-email"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                required
                className="border-purpleBrand/30 focus-visible:ring-purpleBrand"
              />
            </div>
            <div>
              <Label htmlFor="reserve-phone" className="text-purple-800">
                Phone
              </Label>
              <Input
                id="reserve-phone"
                type="tel"
                value={formData.phone}
                onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                className="border-purpleBrand/30 focus-visible:ring-purpleBrand"
              />
            </div>
            <div>
              <Label htmlFor="reserve-notes" className="text-purple-800">
                Notes
              </Label>
              <textarea
                id="reserve-notes"
                value={formData.notes}
                onChange={(event) => setFormData((prev) => ({ ...prev, notes: event.target.value }))}
                className="mt-1 w-full rounded-md border border-purpleBrand/30 bg-white/80 p-3 text-sm text-purple-900 focus:outline-none focus:ring-2 focus:ring-purpleBrand"
                rows={3}
                placeholder="Let us know about pickup timing or special requests."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purpleBrand/20 bg-white/60 backdrop-blur">
          <CardHeader className="border-b border-purpleBrand/10">
            <CardTitle className="text-purple-900">Pickup Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <p className="text-sm font-semibold text-amber-800">🦪 Pickup Details</p>
              <p className="text-xs text-amber-700 mt-1">
                Reserve today, pick up Friday–Sunday at Three Sisters Oyster Co. We accept cash or card at pickup.
              </p>
            </div>
            <div>
              <p className="text-sm text-purple-700">Items Selected</p>
              <p className="text-2xl font-bold text-purple-900">${total.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              {selectedItems.length === 0 ? (
                <p className="text-sm text-purple-600">Add items below to build your pickup order.</p>
              ) : (
                selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-purpleBrand/20 bg-white/60 px-3 py-2 text-sm text-purple-800"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>
            <div className="rounded-lg border border-mintBrand/30 bg-mintBrand/10 px-3 py-4 text-xs text-mintBrand">
              <p>
                After you submit, we’ll email to confirm your pickup window. Need help? Call{" "}
                <a href="tel:713-854-7427" className="underline">
                  713-854-7427
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purpleBrand/20 bg-white/70 backdrop-blur">
        <CardHeader className="border-b border-purpleBrand/10">
          <CardTitle className="text-purple-900">Choose Your Items</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-6">
          {products.map((product) => {
            const quantity = quantities[product.id] || 0
            const maxInventory = product.inventory_count ?? undefined
            const isFocused = focusId && product.id === focusId

            return (
              <div
                key={product.id}
                className={`rounded-2xl border border-purpleBrand/20 bg-gradient-to-br from-purpleBrand/10 to-seafoamBrand/10 p-5 shadow-sm transition-all ${
                  isFocused ? "ring-2 ring-mintBrand" : "hover:shadow-lg"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-purple-900">{product.name}</h3>
                  <Badge className="bg-purpleBrand/20 text-purple-800 border border-purpleBrand/30">{product.category}</Badge>
                </div>
                <p className="text-2xl font-bold text-purple-900 mb-2">${product.price.toFixed(2)}</p>
                {typeof maxInventory === "number" && maxInventory >= 0 ? (
                  <p className="text-xs text-purple-700 mb-4">{maxInventory} available</p>
                ) : (
                  <p className="text-xs text-purple-700 mb-4">Available for pickup</p>
                )}
                <div className="flex items-center justify-between rounded-xl border border-purpleBrand/20 bg-white/80 px-3 py-2">
                  <Label htmlFor={`qty-${product.id}`} className="text-xs font-semibold text-purple-800">
                    Quantity
                  </Label>
                  <Input
                    id={`qty-${product.id}`}
                    type="number"
                    min={0}
                    max={maxInventory ?? undefined}
                    value={quantity}
                    onChange={(event) => handleQuantityChange(product.id, Number(event.target.value))}
                    className="w-20 text-right border-purpleBrand/30 focus-visible:ring-purpleBrand"
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {error && (
        <div className="flex items-center space-x-3 rounded-lg border border-red-400 bg-red-50/80 px-4 py-3 text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center space-x-3 rounded-lg border border-mintBrand/40 bg-mintBrand/20 px-4 py-3 text-mintBrand">
          <Check className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{successMessage}</p>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="outline"
          className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10"
          onClick={() => router.back()}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-purpleBrand/90 hover:to-seafoamBrand/90"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Reserving…
            </>
          ) : (
            "Reserve for Pickup"
          )}
        </Button>
      </div>
    </form>
  )
}

