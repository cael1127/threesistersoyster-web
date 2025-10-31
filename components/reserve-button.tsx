"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Check, Minus, Plus } from "lucide-react"
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

  const handleReserve = async () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in your name and email')
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
          total_amount: product.price * quantity
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
        router.push(`/success?reservation=true&code=${order.pickup_code || ''}&orderId=${order.id}&total=${total}`)
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
            Reserve this item to pay in person when you pick up. Your order will be ready for pickup on Friday. Orders placed by Thursday 11:59 PM are ready for Friday pickup.
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
                Pay in person when picking up
              </p>
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
                All oysters are for pickup in person at Three Sisters Oyster Co. Orders placed by Thursday 11:59 PM are ready for Friday pickup.
              </p>
            </div>

            <Button
              onClick={handleReserve}
              disabled={loading || !formData.name || !formData.email}
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

