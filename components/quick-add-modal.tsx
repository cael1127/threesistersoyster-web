"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Minus, Plus, ShoppingCart, Check } from "lucide-react"
import { useCart, type CartItem } from "@/contexts/cart-context"
import Image from "next/image"

type QuickAddModalProps = {
  product: Omit<CartItem, "quantity">
  trigger?: React.ReactNode
}

export function QuickAddModal({ product, trigger }: QuickAddModalProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleAddToCart = () => {
    addItem({ ...product, quantity })
    setIsAdded(true)

    // Close modal and reset state after 1.5 seconds
    setTimeout(() => {
      setIsAdded(false)
      setIsOpen(false)
      setQuantity(1)
    }, 1500)
  }

  const incrementQuantity = () => {
    const maxQuantity = product.maxInventory || Number.POSITIVE_INFINITY
    setQuantity(Math.min(quantity + 1, maxQuantity))
  }

  const decrementQuantity = () => {
    setQuantity(Math.max(1, quantity - 1))
  }

  const totalPrice = product.price * quantity

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Quick Add
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-purple-900">Add to Cart</DialogTitle>
          <DialogDescription>Choose quantity and add to your cart</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-teal-100 rounded-lg overflow-hidden flex-shrink-0">
              {product.image_url ? (
                <Image
                  src={product.image_url || "/logo.jpg"}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  quality={90}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-purple-400 text-xl">🦪</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 text-center">{product.name}</h3>
                              <Badge className="bg-white/20 text-white text-xs">{product.category}</Badge>
              <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600 mt-1">
                ${product.price.toFixed(2)} each
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-purple-900">Quantity</label>
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10 p-0 bg-transparent border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Minus className="w-4 h-4" />
              </Button>

              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900 min-w-[3rem]">{quantity}</div>
                {product.maxInventory && (
                  <div className="text-xs text-purple-600">of {product.maxInventory} available</div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={incrementQuantity}
                disabled={product.maxInventory ? quantity >= product.maxInventory : false}
                className="h-10 w-10 p-0 border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Total Price */}
          <div className="bg-gradient-to-r from-purple-50 to-teal-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-purple-900">Total:</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purpleBrand to-seafoamBrand">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-lg py-6"
            disabled={isAdded}
          >
            {isAdded ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add {quantity > 1 ? `${quantity} items` : "to Cart"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
