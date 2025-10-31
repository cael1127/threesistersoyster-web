import { createClient, SupabaseClient } from "@supabase/supabase-js"

// Singleton pattern to prevent multiple client instances
let supabaseInstance: SupabaseClient | null = null

// Create a function to get Supabase client with proper error handling
export function createSupabaseClient(): SupabaseClient {
  // Return existing instance if available
  if (supabaseInstance) {
    return supabaseInstance
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Check if environment variables are available
    if (!supabaseUrl || !supabaseAnonKey) {
      // In production, fail fast if configuration is missing
      if (process.env.NODE_ENV === 'production') {
        throw new Error(
          "Supabase configuration is required in production. " +
          "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
        )
      }
      
      // Development fallback only - DO NOT use in production
      console.warn(
        "Missing Supabase environment variables. Using mock client for development only.\n" +
        "Please check your .env.local file:\n" +
        "NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co\n" +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here"
      )

      supabaseInstance = createClient(
        "https://placeholder.supabase.co",
        "placeholder-key"
      )
      return supabaseInstance
    }

    // Create real client if variables are available
    
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    return supabaseInstance
    
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    
    // Development fallback only - DO NOT use in production
    if (process.env.NODE_ENV === 'production') {
      throw new Error("Failed to create Supabase client. Configuration is required in production.")
    }
    
    supabaseInstance = createClient(
      "https://placeholder.supabase.co",
      "placeholder-key"
    )
    return supabaseInstance
  }
}

// Create the client immediately
export const supabase = createSupabaseClient()

// Export the function for dynamic client creation
export function getSupabaseClient(): SupabaseClient {
  return supabase
}

export type Product = {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  image_url: string | null
  inventory_count: number | null
  created_at: string
}

export type ProductDescription = {
  originalDescription: string
  inventory: number
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
  customer_phone?: string
  items: any
  total_amount: number
  status: "pending" | "confirmed" | "shipped" | "delivered"
  // These fields are stored in shipping_address jsonb in the database
  payment_status?: "paid" | "reserved" | "refunded" | "pending"
  order_type?: "online" | "reservation"
  pickup_code?: string
  pickup_week_start?: string
  shipping_address?: any // Stores reservation metadata: { payment_status, order_type, pickup_code, pickup_week_start }
  created_at: string
}

// Helper function to normalize order data - extracts metadata from shipping_address
export function normalizeOrder(order: any): Order {
  const shippingAddress = order.shipping_address || {}
  
  return {
    ...order,
    payment_status: shippingAddress.payment_status || (order.payment_status || 'paid'),
    order_type: shippingAddress.order_type || (order.order_type || 'online'),
    pickup_code: shippingAddress.pickup_code || order.pickup_code,
    pickup_week_start: shippingAddress.pickup_week_start || order.pickup_week_start
  }
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

// Helper function to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  try {
    return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && 
             process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
             process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co")
  } catch (error) {
    return false
  }
}

// Get ALL inventory (both farm and nursery)
export async function getAllInventory() {
  if (!isSupabaseConfigured()) {
    
    return []
  }

  const { data, error } = await supabase.from("inventory").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching all inventory:", error)
    return []
  }

  return data as Inventory[]
}

// Get total inventory count for counter
export async function getInventoryCount() {
  try {
    if (!isSupabaseConfigured()) {
      return 0
    }

    const { data, error } = await supabase.from("inventory").select("count").eq("harvestReady", true)

    if (error) {
      console.error("Error fetching inventory:", error)
      return 0
    }

    return data?.reduce((total, item) => total + item.count, 0) || 0
  } catch (error) {
    console.error("Supabase connection error:", error)
    return 0
  }
}

// Get harvest ready inventory count - parsing from description JSON (ALL inventory)
export async function getHarvestReadyInventoryCount() {
  try {
    // Check if we have valid Supabase credentials
    if (!isSupabaseConfigured()) {
      return 0
    }

    // Get ALL inventory data with descriptions (both farm and nursery)
    const { data: allData, error: allError } = await supabase.from("inventory").select("*")

    if (allError) {
      console.error("Database error:", allError)
      return 0
    }

    if (!allData || allData.length === 0) {
      return 0
    }

    // Parse each item's description to check harvest ready status
    let harvestReadyCount = 0
    let totalItems = 0
    const breakdown = { harvestReady: 0, notReady: 0, farmReady: 0, nurseryReady: 0 }

    allData.forEach((item) => {
      totalItems++
      const isHarvestReady = parseHarvestReady(item.description)



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



    return harvestReadyCount
  } catch (error) {
    console.error("Supabase connection error:", error)
    return 0
  }
}

// Get farm inventory count (all farm inventory, regardless of harvest ready status)
export async function getFarmInventoryCount() {
  try {
    // Check if we have valid Supabase credentials
    if (!isSupabaseConfigured()) {
      return 0
    }
    
    const { data, error } = await supabase.from("inventory").select("count").eq("type", "farm")

    if (error) {
      console.error("Error fetching farm inventory:", error)
      return 0
    }

    const total = data?.reduce((total, item) => total + item.count, 0) || 0
    return total
  } catch (error) {
    console.error("Supabase connection error:", error)
    return 0
  }
}

// Get nursery inventory count (all nursery inventory, regardless of harvest ready status)
export async function getNurseryInventoryCount() {
  try {
    // Check if we have valid Supabase credentials
    if (!isSupabaseConfigured()) {
      return 0
    }
    
    const { data, error } = await supabase.from("inventory").select("count").eq("type", "nursery")

    if (error) {
      console.error("Error fetching nursery inventory:", error)
      return 0
    }

    const total = data?.reduce((total, item) => total + item.count, 0) || 0
    return total
  } catch (error) {
    console.error("Supabase connection error:", error)
    return 0
  }
}

// Get all products
export async function getProducts() {
  try {
    if (!isSupabaseConfigured()) {

      return []
    }

    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return []
    }

    // Parse inventory from description JSON for each product
    const productsWithInventory = (data as Product[]).map(product => {
      let inventoryCount = product.inventory_count || 0;
      
      try {
        if (product.description) {
          const parsedDesc = JSON.parse(product.description);
          inventoryCount = parsedDesc.inventory || inventoryCount;
        }
      } catch (e) {
        // Keep the inventory_count value if parsing fails
      }
      
      return {
        ...product,
        inventory_count: inventoryCount
      };
    });

    return productsWithInventory;
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
// Note: Reservation metadata (payment_status, order_type, pickup_code, pickup_week_start) 
// is stored in shipping_address jsonb field to work with existing database schema
export async function createOrder(orderData: {
  customer_name: string
  customer_email: string
  customer_phone?: string
  items: any
  total_amount: number
  status?: string
  shipping_address?: any // Used to store reservation metadata for pickup orders
  // Legacy fields - if provided, will be stored in shipping_address
  payment_status?: string
  order_type?: string
  pickup_code?: string
  pickup_week_start?: string
}) {
  // If legacy fields are provided at top level, move them to shipping_address
  const finalOrderData: any = {
    customer_name: orderData.customer_name,
    customer_email: orderData.customer_email,
    customer_phone: orderData.customer_phone,
    items: orderData.items,
    total_amount: orderData.total_amount,
    status: orderData.status || 'pending',
    shipping_address: orderData.shipping_address || null
  }

  // If legacy fields exist, merge them into shipping_address
  if (orderData.payment_status || orderData.order_type || orderData.pickup_code || orderData.pickup_week_start) {
    finalOrderData.shipping_address = {
      ...(finalOrderData.shipping_address || {}),
      payment_status: orderData.payment_status,
      order_type: orderData.order_type,
      pickup_code: orderData.pickup_code,
      pickup_week_start: orderData.pickup_week_start
    }
  }

  const { data, error } = await supabase.from("orders").insert([finalOrderData]).select()

  if (error) {
    console.error("Error creating order:", error)
    throw error
  }

  return data[0] as Order
}

// Get total harvested count
export async function getTotalHarvested(): Promise<number> {
  try {


    const { data, error } = await supabase
      .from("harvested_counts")
      .select("total_harvested")
      .single()



    if (error) {
      console.error("Error fetching total harvested:", error)
      return 0
    }

    const result = data?.total_harvested || 0;
    return result;
  } catch (error) {
    console.error("Supabase connection error:", error)
    return 0
  }
}

// Update total harvested count (increment by amount)
export async function incrementHarvestedCount(amount: number): Promise<void> {
  try {

    // First try to get existing record
    const { data: existingData, error: fetchError } = await supabase
      .from("harvested_counts")
      .select("id, total_harvested")
      .single()



    if (existingData) {
      const newTotal = existingData.total_harvested + amount;
      
      // Update existing record
      const { error } = await supabase
        .from("harvested_counts")
        .update({ 
          total_harvested: newTotal,
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

// Update product inventory counts when orders are placed
export async function updateProductInventoryCounts(orderItems: any[]): Promise<void> {
  try {

    // Process each order item
    for (const item of orderItems) {
      if (item.id && item.quantity && item.quantity > 0) {
        
        // Get current product with description to parse inventory
        const { data: product, error: fetchError } = await supabase
          .from("products")
          .select("id, name, description, inventory_count")
          .eq("id", item.id)
          .single()

        if (fetchError) {
          console.error(`Error fetching product ${item.id}:`, fetchError)
          continue
        }

        if (product) {
          // Parse inventory from description JSON first, fallback to inventory_count
          let currentCount = 0;
          let parsedDesc = null;
          
          try {
            if (product.description) {
              parsedDesc = JSON.parse(product.description);
              currentCount = parsedDesc.inventory || 0;

            }
          } catch (e) {

            currentCount = product.inventory_count || 0;
          }
          

          const newCount = Math.max(0, currentCount - item.quantity)
          

          
          // Update both the description JSON and inventory_count field
          let newDescription = product.description;
          try {
            if (parsedDesc) {
              parsedDesc.inventory = newCount;
              newDescription = JSON.stringify(parsedDesc);

            }
          } catch (error) {

          }
          
          // Update the product with new inventory count and description
          const updateData: any = { inventory_count: newCount };
          if (newDescription !== product.description) {
            updateData.description = newDescription;
          }
          

          
          const { error: updateError } = await supabase
            .from("products")
            .update(updateData)
            .eq("id", item.id)

          if (updateError) {
            console.error(`Error updating product inventory for ${product.name}:`, updateError)
          } else {

          }
        } else {

        }
      }
    }
  } catch (error) {
    console.error("Error updating product inventory counts:", error)
    throw error
  }
}
