import { createClient } from "@supabase/supabase-js"

// Check for required environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// If environment variables are missing, create a mock client that won't crash the app
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase environment variables are missing. Please create a .env.local file with:\n" +
    "NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co\n" +
    "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here\n" +
    "\nGet these values from your Supabase project dashboard > Settings > API"
  )
}

// Create Supabase client with fallback for missing env vars
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
)

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

export type HarvestedCount = {
  id: string
  total_harvested: number
  last_updated: string
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

    // Check if we have valid Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
      console.log("Supabase not configured, returning fallback value")
      return 0
    }

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
    
    // Check if we have valid Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
      console.log("Supabase not configured, returning fallback value")
      return 0
    }
    
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
    
    // Check if we have valid Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
      console.log("Supabase not configured, returning fallback value")
      return 0
    }
    
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

// Get total harvested count
export async function getTotalHarvested(): Promise<number> {
  try {
    // Check if we have valid Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
      console.log("Supabase not configured, returning fallback value")
      return 0
    }

    const { data, error } = await supabase
      .from("harvested_counts")
      .select("total_harvested")
      .single()

    if (error) {
      console.error("Error fetching total harvested:", error)
      return 0
    }

    return data?.total_harvested || 0
  } catch (error) {
    console.error("Supabase connection error:", error)
    return 0
  }
}

// Update total harvested count (increment by amount)
export async function incrementHarvestedCount(amount: number): Promise<void> {
  try {
    // Check if we have valid Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
      console.log("Supabase not configured, cannot update harvested count")
      return
    }

    // First try to get existing record
    const { data: existingData } = await supabase
      .from("harvested_counts")
      .select("id, total_harvested")
      .single()

    if (existingData) {
      // Update existing record
      const { error } = await supabase
        .from("harvested_counts")
        .update({ 
          total_harvested: existingData.total_harvested + amount,
          last_updated: new Date().toISOString()
        })
        .eq("id", existingData.id)

      if (error) {
        console.error("Error updating harvested count:", error)
        throw error
      }
    } else {
      // Create new record if none exists
      const { error } = await supabase
        .from("harvested_counts")
        .insert([{
          total_harvested: amount,
          last_updated: new Date().toISOString()
        }])

      if (error) {
        console.error("Error creating harvested count:", error)
        throw error
      }
    }
  } catch (error) {
    console.error("Error incrementing harvested count:", error)
    throw error
  }
}

// Update inventory counts when orders are placed
export async function updateInventoryCounts(orderItems: any[]): Promise<void> {
  try {
    // Check if we have valid Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
      console.log("Supabase not configured, cannot update inventory counts")
      return
    }

    // Process each order item
    for (const item of orderItems) {
      if (item.id && item.quantity && item.quantity > 0) {
        // Get current inventory item
        const { data: inventoryItem, error: fetchError } = await supabase
          .from("inventory")
          .select("id, count, name")
          .eq("id", item.id)
          .single()

        if (fetchError) {
          console.error(`Error fetching inventory item ${item.id}:`, fetchError)
          continue
        }

        if (inventoryItem) {
          const newCount = Math.max(0, inventoryItem.count - item.quantity)
          
          // Update the inventory count
          const { error: updateError } = await supabase
            .from("inventory")
            .update({ count: newCount })
            .eq("id", item.id)

          if (updateError) {
            console.error(`Error updating inventory count for ${inventoryItem.name}:`, updateError)
          } else {
            console.log(`Updated inventory for ${inventoryItem.name}: ${inventoryItem.count} → ${newCount}`)
          }
        }
      }
    }
  } catch (error) {
    console.error("Error updating inventory counts:", error)
    throw error
  }
}
