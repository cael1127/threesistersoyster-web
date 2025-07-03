"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export function CartButton() {
  const { state } = useCart()

  return (
    <Button asChild variant="outline" className="relative bg-transparent">
      <Link href="/cart" className="flex items-center space-x-2">
        <ShoppingCart className="w-4 h-4" />
        <span className="hidden sm:inline">Cart</span>
        {state.itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
            {state.itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
