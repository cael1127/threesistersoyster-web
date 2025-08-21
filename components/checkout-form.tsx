"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, User, Mail, MapPin, Phone } from "lucide-react"

interface CheckoutFormProps {
  onSubmit: (customerInfo: { name: string; email: string; phone: string; address: string }) => void
  onCancel: () => void
  isLoading: boolean
}

export function CheckoutForm({ onSubmit, onCancel, isLoading }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 border-purpleBrand/20">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purpleBrand to-lavenderBrand rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-purpleBrand">Complete Your Order</CardTitle>
        <p className="text-lavenderBrand/80">Please provide your contact information</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-purpleBrand font-semibold">
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your full name"
              required
              className="border-purpleBrand/30 focus:border-purpleBrand bg-white/50 focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-purpleBrand font-semibold">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
              required
              className="border-purpleBrand/30 focus:border-purpleBrand bg-white/50 focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-purpleBrand font-semibold">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              required
              className="border-purpleBrand/30 focus:border-purpleBrand bg-white/50 focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-purpleBrand font-semibold">
              <MapPin className="w-4 h-4 inline mr-2" />
              Shipping Address
            </Label>
            <Input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter your shipping address"
              required
              className="border-purpleBrand/30 focus:border-purpleBrand bg-white/50 focus:bg-white"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 border-purpleBrand/30 text-purpleBrand hover:bg-purpleBrand/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-purpleBrand to-lavenderBrand hover:from-purpleBrand/90 hover:to-lavenderBrand/90 text-white"
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
