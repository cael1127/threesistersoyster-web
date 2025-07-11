import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

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

// Helper function to parse harvest ready status from description JSON
function parseHarvestReady(description: string | null): boolean {
  if (!description) return false

  try {
    const parsed = JSON.parse(description)
    return parsed.harvestReady === true
  } catch (error) {
    console.log("Could not parse description as JSON:", description)
    return false
  }
}

// Helper function to parse description JSON and extract fields
function parseDescriptionFields(description: string | null) {
  if (!description) return {}

  try {
    const parsed = JSON.parse(description)
    return {
      size: parsed.size || null,
      age: parsed.age || null,
      health: parsed.health || null,
      pricePerDozen: parsed.pricePerDozen || null,
      harvestReady: parsed.harvestReady === true,
      location: parsed.location || null,
      originalDescription: parsed.originalDescription || null,
    }
  } catch (error) {
    return { originalDescription: description }
  }
}

// Get ALL inventory (both farm and nursery)
export async function getAllInventory() {
  const { data, error } = await supabase.from("inventory").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching all inventory:", error)
    return []
  }

  return data as Inventory[]
}

// Get harvest ready inventory count - parsing from description JSON (ALL inventory)
export async function getHarvestReadyInventoryCount() {
  try {
    console.log("=== DEBUGGING HARVEST READY COUNT ===")

    // Get ALL inventory data with descriptions (both farm and nursery)
    const { data: allData, error: allError } = await supabase.from("inventory").select("*")

    console.log("Raw inventory data from database:", allData)

    if (allError) {
      console.error("Database error:", allError)
      return 0
    }

    if (!allData || allData.length === 0) {
      console.log("No inventory data found in database")
      return 0
    }

    // Parse each item's description to check harvest ready status
    let harvestReadyCount = 0
    let totalItems = 0
    const breakdown = { harvestReady: 0, notReady: 0, farmReady: 0, nurseryReady: 0 }

    allData.forEach((item) => {
      totalItems++
      const isHarvestReady = parseHarvestReady(item.description)

      console.log(`Item ${item.name} (${item.type}):`, {
        count: item.count,
        description: item.description,
        parsedHarvestReady: isHarvestReady,
      })

      if (isHarvestReady) {
        harvestReadyCount += item.count || 0
        breakdown.harvestReady += item.count || 0

        if (item.type === "farm") {
          breakdown.farmReady += item.count || 0
        } else if (item.type === "nursery") {
          breakdown.nurseryReady += item.count || 0
        }
      } else {
        breakdown.notReady += item.count || 0
      }
    })

    console.log("Harvest ready breakdown:", breakdown)
    console.log("Total harvest ready count:", harvestReadyCount)

    return harvestReadyCount
  } catch (error) {
    console.error("Supabase connection error:", error)
    return 0
  }
}

// Get farm inventory count (all farm inventory, regardless of harvest ready status)
export async function getFarmInventoryCount() {
  try {
    console.log("Querying farm inventory...")
    const { data, error } = await supabase.from("inventory").select("count").eq("type", "farm")

    console.log("Farm query result:", { data, error })

    if (error) {
      console.error("Error fetching farm inventory:", error)
      return 0
    }

    const total = data?.reduce((total, item) => total + item.count, 0) || 0
    console.log("Calculated farm total:", total)
    return total
  } catch (error) {
    console.error("Supabase connection error:", error)
    return 0
  }
}

// Get nursery inventory count (all nursery inventory, regardless of harvest ready status)
export async function getNurseryInventoryCount() {
  try {
    console.log("Querying nursery inventory...")
    const { data, error } = await supabase.from("inventory").select("count").eq("type", "nursery")

    console.log("Nursery query result:", { data, error })

    if (error) {
      console.error("Error fetching nursery inventory:", error)
      return 0
    }

    const total = data?.reduce((total, item) => total + item.count, 0) || 0
    console.log("Calculated nursery total:", total)
    return total
  } catch (error) {
    console.error("Supabase connection error:", error)
    return 0
  }
}

// Get all products
export async function getProducts() {
  try {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return []
    }

    return data as Product[]
  } catch (error) {
    console.error("Supabase connection error:", error)
    return []
  }
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

  // Parse description JSON and map to proper structure
  return (data as any[]).map((row) => {
    const descriptionFields = parseDescriptionFields(row.description)

    return {
      ...row,
      ...descriptionFields,
    }
  }) as Inventory[]
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
