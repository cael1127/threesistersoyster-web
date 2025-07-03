import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  image_url: string | null
  created_at: string
}

export type Inventory = {
  id: string
  name: string
  type: "nursery" | "farm"
  count: number
  description: string | null
  size: string | null
  age: string | null
  health: string | null
  pricePerDozen: number | null
  harvestReady: boolean | null
  location: string | null
  created_at: string
}

export type Order = {
  id: string
  customer_name: string
  customer_email: string
  items: any
  total_amount: number
  status: "pending" | "confirmed" | "shipped" | "delivered"
  created_at: string
}

// Get total inventory count for counter
export async function getInventoryCount() {
  const { data, error } = await supabase.from("inventory").select("count").eq("harvestReady", true)

  if (error) {
    console.error("Error fetching inventory:", error)
    return 0
  }

  return data?.reduce((total, item) => total + item.count, 0) || 0
}

// Get all products
export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data as Product[]
}

// Get inventory by type
export async function getInventoryByType(type: "nursery" | "farm") {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("type", type)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching inventory:", error)
    return []
  }

  return data as Inventory[]
}

// Create new order
export async function createOrder(orderData: {
  customer_name: string
  customer_email: string
  items: any
  total_amount: number
}) {
  const { data, error } = await supabase.from("orders").insert([orderData]).select()

  if (error) {
    console.error("Error creating order:", error)
    throw error
  }

  return data[0] as Order
}
