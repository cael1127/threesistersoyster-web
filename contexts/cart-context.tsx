"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from "react"
import { useState } from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image_url?: string | null
  category: string
  maxInventory?: number
}

type CartState = {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      let newItems: CartItem[]

      if (existingItem) {
        const newQuantity = existingItem.quantity + (action.payload.quantity || 1)
        const maxQuantity = action.payload.maxInventory || Number.POSITIVE_INFINITY
        const finalQuantity = Math.min(newQuantity, maxQuantity)

        newItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: finalQuantity } : item,
        )
      } else {
        const quantity = Math.min(action.payload.quantity || 1, action.payload.maxInventory || Number.POSITIVE_INFINITY)
        newItems = [...state.items, { ...action.payload, quantity }]
      }

      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: action.payload.id })
      }

      const newItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )

      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case "CLEAR_CART":
      return { items: [], total: 0, itemCount: 0 }

    case "LOAD_CART": {
      const total = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      return { items: action.payload, total, itemCount }
    }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  })
  const [mounted, setMounted] = useState(false)

  // Debounced localStorage save
  const saveTimeoutRef = useRef<NodeJS.Timeout>()
  
  const saveToLocalStorage = useCallback((items: CartItem[]) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem("three-sisters-cart", JSON.stringify(items))
        }
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }
    }, 100) // 100ms debounce
  }, [])

  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load cart from localStorage on mount (only on client)
  useEffect(() => {
    if (!mounted) return
    
    try {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem("three-sisters-cart")
        if (savedCart) {
          const cartItems = JSON.parse(savedCart)
          dispatch({ type: "LOAD_CART", payload: cartItems })
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    }
  }, [mounted])

  // Save cart to localStorage whenever it changes (debounced)
  useEffect(() => {
    if (!mounted) return
    
    saveToLocalStorage(state.items)
    
    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [state.items, saveToLocalStorage, mounted])

  const addItem = useCallback((item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }, [])

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" })
  }, [])

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
