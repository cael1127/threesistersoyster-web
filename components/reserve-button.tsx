"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Check, Minus, Plus, CalendarDays } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ReserveButtonProps = {
  product: {
    id: string
    name: string
    price: number
    maxInventory?: number
  }
  className?: string
}

export function ReserveButton({ product, className }: ReserveButtonProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
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
      const base = new Date()
      base.setHours(0, 0, 0, 0)
      base.setDate(base.getDate() + 2)
      if (base.getDay() === 1) {
        base.setDate(base.getDate() + 1)
      }
      return base.toISOString().split("T")[0]
    }
    const base = new Date()
    base.setHours(0, 0, 0, 0)
    base.setDate(base.getDate() + 2)
    if (base.getDay() === 1) {
      base.setDate(base.getDate() + 1)
    }
    return base.toISOString().split("T")[0]
  }, [])

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

  const handleReserve = async () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in your name and email')
      return
    }

    if (!pickupDate) {
      alert('Please select a pickup date')
      return
    }

    if (!pickupTime) {
      alert('Please select a pickup time')
      return
    }

    const selectedDate = new Date(`${pickupDate}T00:00:00`)
    if (Number.isNaN(selectedDate.getTime())) {
      alert('Please enter a valid pickup date')
      return
    }

    const dayOfWeek = selectedDate.getUTCDay()
    if (dayOfWeek === 1) {
      alert('We do not schedule pickups on Mondays. Please choose another day.')
      return
    }

    const earliestDate = new Date(minPickupDate + "T00:00:00")
    if (selectedDate < earliestDate) {
      alert('Pickups must be scheduled at least two days in advance.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/reserve-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          items: [{
            id: product.id,
            name: product.name,
            quantity: quantity,
            price: product.price
          }],
          total_amount: product.price * quantity,
          pickup_date: pickupDate,
          pickup_time: pickupTime
        })
      })

      const data = await response.json()

      if (!response.ok) {
        // Show detailed error message
        const errorMsg = data.details 
          ? `${data.error}\n\nDetails: ${data.details}\n\n${data.hint || ''}`
          : data.error || 'Failed to create reservation'
        alert(errorMsg)
        console.error('Reservation API error:', data)
        return
      }

      if (data.success) {
        const order = data.order
        const total = (product.price * quantity).toFixed(2)
        router.push(`/success?reservation=true&code=${order.pickup_code || ''}&orderId=${order.id}&total=${total}&pickupDate=${encodeURIComponent(pickupDate)}&pickupTime=${encodeURIComponent(pickupTime)}`)
      } else {
        const errorMsg = data.details 
          ? `${data.error}\n\nDetails: ${data.details}`
          : data.error || 'Failed to create reservation'
        alert(errorMsg)
      }
    } catch (error) {
      console.error('Reservation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Failed to create reservation. Please try again.\n\nError: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const incrementQuantity = () => {
    const maxQuantity = product.maxInventory || Number.POSITIVE_INFINITY
    setQuantity(Math.min(quantity + 1, maxQuantity))
  }

  const decrementQuantity = () => {
    setQuantity(Math.max(1, quantity - 1))
  }

  return (
    <div className={className}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10"
          >
            <Clock className="w-4 h-4 mr-2" />
            Reserve for Pickup
          </Button>
        </DialogTrigger>
        <DialogContent className="border-purpleBrand/30">
          <DialogHeader>
            <DialogTitle className="text-purple-900">Reserve {product.name}</DialogTitle>
          <DialogDescription>
            Reserve this item to pay in person when you pick up. Choose a pickup day (Tuesday–Sunday) at least two days in advance between 12 PM and 7 PM. We accept cash or card at pickup.
          </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Quantity Selector */}
            <div className="flex items-center justify-center space-x-3 py-2">
              <Button
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-8 w-8 p-0"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-lg font-semibold text-purple-900 min-w-[2rem] text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={incrementQuantity}
                disabled={product.maxInventory ? quantity >= product.maxInventory : false}
                className="h-8 w-8 p-0"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-purple-900">
                Total: ${(product.price * quantity).toFixed(2)}
              </p>
              <p className="text-sm text-purple-600 mt-1">
                Pay in person when picking up (cash or card)
              </p>
            </div>

            {/* Pickup Date and Time Selection */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-2 text-purple-900 font-semibold">
                <CalendarDays className="h-4 w-4" />
                <span>Select Pickup Date and Time</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="reserve-pickup-date" className="text-sm">Pickup Date *</Label>
                  <Input
                    id="reserve-pickup-date"
                    type="date"
                    min={minPickupDate}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="border-purpleBrand/30 focus:border-purpleBrand"
                    required
                  />
                  {pickupDate && new Date(`${pickupDate}T00:00:00`).getUTCDay() === 1 && (
                    <p className="text-xs text-red-600">Please choose a day other than Monday.</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reserve-pickup-time" className="text-sm">Pickup Time *</Label>
                  <select
                    id="reserve-pickup-time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full rounded-md border border-purpleBrand/30 bg-white p-2 text-sm text-purple-900 focus:outline-none focus:ring-2 focus:ring-purpleBrand"
                    required
                  >
                    {pickupTimeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Customer Info Form */}
            <div className="space-y-3 pt-4 border-t">
              <div>
                <Label htmlFor="reserve-name">Name *</Label>
                <Input
                  id="reserve-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reserve-email">Email *</Label>
                <Input
                  id="reserve-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reserve-phone">Phone (Optional)</Label>
                <Input
                  id="reserve-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Pickup Notice */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
              <p className="text-sm text-amber-800 font-semibold">
                🦪 PICKUP ONLY
              </p>
              <p className="text-xs text-amber-700 mt-1">
                All oysters are reserved for pickup at Three Sisters Oyster Co. Schedule at least two days ahead, Tuesday through Sunday, between 12 PM and 7 PM. We accept cash or card at pickup.
              </p>
            </div>

            <Button
              onClick={handleReserve}
              disabled={loading || !formData.name || !formData.email || !pickupDate || !pickupTime}
              className="w-full bg-gradient-to-r from-purpleBrand to-lavenderBrand"
            >
              {loading ? 'Processing...' : 'Confirm Reservation'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

