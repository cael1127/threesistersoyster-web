"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from "react"
import { useState } from "react"
// import { useAnalyticsContext } from "@/components/AnalyticsProvider"

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
  getSessionId: () => string | undefined
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
  const [isClient, setIsClient] = useState(false)
  
  // Get analytics context (with fallback for when not available)
  // let analytics: any = null
  // try {
  //   analytics = useAnalyticsContext()
  // } catch (error) {
  //   // Analytics not available, continue without tracking
  // }

  // Generate a unique session ID for this cart session
  const sessionIdRef = useRef<string | null>(null)

  // Debounced localStorage save
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
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
        // Error saving cart to localStorage
      }
    }, 100) // 100ms debounce
  }, [])

  // Set mounted state and generate session ID
  useEffect(() => {
    setIsClient(true)
    setMounted(true)
    
    // Generate a unique session ID for this cart session
    if (!sessionIdRef.current) {
      sessionIdRef.current = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
  }, [])

  // Load cart from localStorage on mount (only on client) - optimized for performance
  useEffect(() => {
    if (!mounted || !isClient) return
    
    // Use requestIdleCallback for non-critical cart loading to avoid blocking initial render
    const loadCart = () => {
      try {
        if (typeof window !== 'undefined') {
          const savedCart = localStorage.getItem("three-sisters-cart")
          if (savedCart) {
            const cartItems = JSON.parse(savedCart)
            dispatch({ type: "LOAD_CART", payload: cartItems })
          }
        }
      } catch (error) {
        // Error loading cart from localStorage
      }
    }
    
    // Load cart when browser is idle to avoid blocking initial render
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(loadCart)
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(loadCart, 100)
    }
  }, [mounted, isClient])

  // Save cart to localStorage whenever it changes (debounced)
  useEffect(() => {
    if (!mounted || !isClient) return
    
    saveToLocalStorage(state.items)
    
    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [state.items, saveToLocalStorage, mounted, isClient])

  const addItem = useCallback(async (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    try {
      // Reserve inventory when adding to cart
      if (sessionIdRef.current && item.maxInventory && item.maxInventory > 0) {
        const response = await fetch('/api/reserve-inventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [{ 
              id: item.id,
              name: item.name, 
              quantity: item.quantity || 1 
            }],
            session_id: sessionIdRef.current
          })
        })

        if (!response.ok) {
          // Still add to cart but log the error
        }
      }
    } catch (error) {
      // Still add to cart even if reservation fails
    }

    dispatch({ type: "ADD_ITEM", payload: item })
    
    // Track cart action - analytics tracking disabled for now
    // if (analytics) {
    //   analytics.trackCartAction('add', item.id, item.quantity || 1)
    // }
  }, [])

  const removeItem = useCallback(async (id: string) => {
    // Find the item being removed to release its reservation
    const itemToRemove = state.items.find(item => item.id === id)
    
    if (sessionIdRef.current && itemToRemove) {
      try {
        await fetch('/api/reserve-inventory', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: sessionIdRef.current
          })
        })
      } catch (error) {
        console.error('Error releasing reservations:', error)
      }
    }
    
    dispatch({ type: "REMOVE_ITEM", payload: id })
    
    // Track cart action - analytics tracking disabled for now
    // if (analytics && itemToRemove) {
    //   analytics.trackCartAction('remove', itemToRemove.id, itemToRemove.quantity)
    // }
  }, [state.items])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    const item = state.items.find(item => item.id === id)
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
    
    // Track cart action - analytics tracking disabled for now
    // if (analytics && item) {
    //   analytics.trackCartAction('update', item.id, quantity)
    // }
  }, [state.items])

  const clearCart = useCallback(async () => {
    // Release all reservations when clearing cart
    if (sessionIdRef.current) {
      try {
        await fetch('/api/reserve-inventory', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: sessionIdRef.current
          })
        })
      } catch (error) {
        console.error('Error releasing reservations:', error)
      }
    }
    
    dispatch({ type: "CLEAR_CART" })
    
    // Track cart action - analytics tracking disabled for now
    // if (analytics) {
    //   analytics.trackCartAction('clear', 'all', state.items.length)
    // }
  }, [state.items.length])

  const getSessionId = useCallback(() => {
    return sessionIdRef.current
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
        getSessionId: () => getSessionId() || undefined,
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
