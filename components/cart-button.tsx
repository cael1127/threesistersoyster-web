"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export function CartButton() {
  const { state } = useCart()

  return (
    <Button asChild size="sm" className="relative bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white shadow-md text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0">
      <Link href="/cart" className="flex items-center space-x-2">
        <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 text-white" />
        <span className="hidden sm:inline text-white">Cart</span>
        {state.itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
            {state.itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
