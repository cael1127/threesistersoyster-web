"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, Minus, Plus } from "lucide-react"
import { useCart, type CartItem } from "@/contexts/cart-context"

type AddToCartButtonProps = {
  product: Omit<CartItem, "quantity">
  className?: string
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({ ...product, quantity })
    setIsAdded(true)

    // Reset the button state after 2 seconds
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  const incrementQuantity = () => {
    const maxQuantity = product.maxInventory || Number.POSITIVE_INFINITY
    setQuantity(Math.min(quantity + 1, maxQuantity))
  }

  const decrementQuantity = () => {
    setQuantity(Math.max(1, quantity - 1))
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Quantity Selector */}
      <div className="flex items-center justify-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={decrementQuantity}
          disabled={quantity <= 1}
          className="h-8 w-8 p-0 bg-transparent"
        >
          <Minus className="w-3 h-3" />
        </Button>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">Qty:</span>
          <span className="text-lg font-semibold text-purple-900 min-w-[2rem] text-center">{quantity}</span>
        </div>

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

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 transition-all duration-200"
        disabled={isAdded}
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Added {quantity > 1 ? `${quantity} items` : "to Cart"}!
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add {quantity > 1 ? `${quantity} ` : ""}to Cart
            {quantity > 1 && (
              <span className="ml-1 text-xs opacity-80">(${(product.price * quantity).toFixed(2)})</span>
            )}
          </>
        )}
      </Button>

      {/* Stock Warning */}
      {product.maxInventory && quantity >= product.maxInventory && (
        <p className="text-xs text-amber-600 text-center">Maximum available: {product.maxInventory}</p>
      )}
    </div>
  )
}
