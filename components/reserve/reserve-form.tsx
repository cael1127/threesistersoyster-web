"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CalendarDays, Check, Clock, Loader2, MapPin, Minus, Plus } from "lucide-react"

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
  const [pickupDate, setPickupDate] = useState("")
  const [pickupTime, setPickupTime] = useState("12:00")

  const pickupTimeSlots = useMemo(
    () => [
      { value: "12:00", label: "12:00 PM" },
      { value: "13:00", label: "1:00 PM" },
      { value: "14:00", label: "2:00 PM" },
      { value: "15:00", label: "3:00 PM" },
      { value: "16:00", label: "4:00 PM" },
      { value: "17:00", label: "5:00 PM" },
      { value: "18:00", label: "6:00 PM" },
      { value: "19:00", label: "7:00 PM" },
    ],
    [],
  )

  const minPickupDate = useMemo(() => {
    if (typeof window === 'undefined') {
      // Server-side: use a safe default
      const base = new Date()
      base.setHours(0, 0, 0, 0)
      base.setDate(base.getDate() + 2)
      if (base.getDay() === 1) {
        base.setDate(base.getDate() + 1)
      }
      return base.toISOString().split("T")[0]
    }
    // Client-side: calculate properly
    const base = new Date()
    base.setHours(0, 0, 0, 0)
    base.setDate(base.getDate() + 2)
    if (base.getDay() === 1) {
      base.setDate(base.getDate() + 1)
    }
    return base.toISOString().split("T")[0]
  }, [])

  useEffect(() => {
    const initialQuantities = products.reduce<Record<string, number>>((acc, product) => {
      acc[product.id] = product.id === focusId ? 1 : 0
      return acc
    }, {})
    setQuantities(initialQuantities)
  }, [products, focusId])

  useEffect(() => {
    if (!pickupDate) {
      setPickupDate(minPickupDate)
    }
  }, [minPickupDate, pickupDate])

  useEffect(() => {
    if (!pickupTime) {
      setPickupTime(pickupTimeSlots[0]?.value ?? "12:00")
    }
  }, [pickupTime, pickupTimeSlots])

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

  const adjustQuantity = (productId: string, delta: number, max?: number | null) => {
    setQuantities((prev) => {
      const current = prev[productId] || 0
      const cap = typeof max === "number" ? max : 999
      const next = Math.min(Math.max(current + delta, 0), cap)
      return { ...prev, [productId]: next }
    })
  }

  const setExactQuantity = (productId: string, quantity: number, max?: number | null) => {
    const cap = typeof max === "number" ? max : 999
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.min(quantity, cap),
    }))
  }

  const clearSelectedItem = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: 0,
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

    if (!pickupDate) {
      setError("Select a pickup date (at least two days ahead, no Mondays).")
      return
    }

    const selectedDate = new Date(`${pickupDate}T00:00:00`)
    if (Number.isNaN(selectedDate.getTime())) {
      setError("Enter a valid pickup date.")
      return
    }

    const dayOfWeek = selectedDate.getUTCDay()
    if (dayOfWeek === 1) {
      setError("We do not schedule pickups on Mondays. Please choose another day.")
      return
    }

    const earliestDate = new Date(minPickupDate + "T00:00:00")
    if (selectedDate < earliestDate) {
      setError("Pickups must be scheduled at least two days in advance.")
      return
    }

    if (!pickupTime) {
      setError("Select a pickup window between 12 PM and 7 PM.")
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
          pickup_date: pickupDate,
          pickup_time: pickupTime,
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
          )}&total=${encodeURIComponent(totalAmount)}&pickupDate=${encodeURIComponent(
            pickupDate,
          )}&pickupTime=${encodeURIComponent(pickupTime)}`,
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
        <Card className="border-purpleBrand/20 bg-white/60 backdrop-blur md:sticky md:top-24 md:h-fit">
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
                placeholder="Share cooler needs, contact preferences, or special requests."
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
                Pick your pickup day (Tuesday–Sunday), at least two days ahead. We accept cash or card at pickup between
                12 PM and 7 PM.
              </p>
            </div>
            <div>
              <p className="text-sm text-purple-700">Items Selected</p>
              <p className="text-2xl font-bold text-purple-900">${total.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border border-purpleBrand/20 bg-white/80 p-3 text-sm text-purple-800 space-y-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-purple-600" />
                <span>
                  Date:{" "}
                  {pickupDate
                    ? new Date(`${pickupDate}T00:00:00`).toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })
                    : "Select a date"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span>
                  Time:{" "}
                  {pickupTime
                    ? pickupTimeSlots.find((slot) => slot.value === pickupTime)?.label ?? "Select a time"
                    : "Select a time"}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {selectedItems.length === 0 ? (
                <p className="text-sm text-purple-600">Add items below to build your pickup order.</p>
              ) : (
                selectedItems.map((item) => {
                  const productInventory = products.find((product) => product.id === item.id)?.inventory_count ?? null
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-purpleBrand/20 bg-white/80 px-3 py-2 text-sm text-purple-800 gap-3"
                    >
                      <div className="flex-1 text-left">
                        <p className="font-medium">
                          {item.name} × {item.quantity}
                        </p>
                        {typeof productInventory === "number" && (
                          <p className="text-xs text-purple-600">
                            {productInventory} available • ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-800"
                        onClick={() => clearSelectedItem(item.id)}
                      >
                        Clear
                      </Button>
                    </div>
                  )
                })
              )}
            </div>
            <div className="rounded-lg border border-mintBrand/30 bg-mintBrand/10 px-3 py-4 text-xs text-mintBrand">
              <p>
                After you submit, we’ll confirm your pickup details and help fine-tune timing if needed. Need help? Call{" "}
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
          <div className="md:col-span-2 lg:col-span-3 space-y-4 rounded-2xl border border-purpleBrand/20 bg-gradient-to-r from-purpleBrand/10 to-seafoamBrand/10 p-5">
            <div className="flex flex-wrap items-center gap-3 text-purple-900 font-semibold">
              <CalendarDays className="h-5 w-5" />
              <span>Select your pickup day and time</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pickup-date" className="text-sm text-purple-800">
                  Pickup Date (no Mondays, at least 2 days ahead)
                </Label>
                <Input
                  id="pickup-date"
                  type="date"
                  min={minPickupDate}
                  value={pickupDate}
                  onChange={(event) => setPickupDate(event.target.value)}
                  className="border-purpleBrand/30 focus-visible:ring-purpleBrand"
                />
                {pickupDate && new Date(`${pickupDate}T00:00:00`).getUTCDay() === 1 && (
                  <p className="text-xs text-red-600">Please choose a day other than Monday.</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickup-time" className="text-sm text-purple-800">
                  Pickup Window (12 PM – 7 PM)
                </Label>
                <select
                  id="pickup-time"
                  value={pickupTime}
                  onChange={(event) => setPickupTime(event.target.value)}
                  className="w-full rounded-md border border-purpleBrand/30 bg-white/80 p-2 text-purple-900 focus:outline-none focus:ring-2 focus:ring-purpleBrand"
                >
                  {pickupTimeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-purple-700">
              <MapPin className="h-4 w-4" />
              <span>Pickups happen at Three Sisters Oyster Co. between 12:00 PM and 7:00 PM.</span>
            </div>
          </div>

          {products.map((product) => {
            const quantity = quantities[product.id] || 0
            const maxInventory = product.inventory_count ?? undefined
            const isFocused = focusId && product.id === focusId

            const maxQuantity = typeof maxInventory === "number" ? Math.max(maxInventory, 0) : undefined
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
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-purpleBrand/20 bg-white/80 px-3 py-2">
                    <span className="text-xs font-semibold text-purple-800">Quantity</span>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-purpleBrand/30 text-purple-700"
                        onClick={() => adjustQuantity(product.id, -1)}
                        disabled={quantity <= 0}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center font-semibold text-purple-900">{quantity}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-purpleBrand/30 text-purple-700"
                        onClick={() => adjustQuantity(product.id, 1, maxQuantity)}
                        disabled={typeof maxQuantity === "number" && quantity >= maxQuantity}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 5, 10].map((preset) => (
                      <Button
                        key={preset}
                        type="button"
                        variant={quantity === preset ? "default" : "outline"}
                        size="sm"
                        className={
                          quantity === preset
                            ? "bg-purpleBrand text-white hover:bg-purpleBrand/90"
                            : "border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10"
                        }
                        onClick={() => setExactQuantity(product.id, preset, maxQuantity)}
                        disabled={typeof maxQuantity === "number" && preset > maxQuantity}
                      >
                        {preset}
                      </Button>
                    ))}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-800"
                      onClick={() => clearSelectedItem(product.id)}
                      disabled={quantity === 0}
                    >
                      Clear
                    </Button>
                  </div>
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

