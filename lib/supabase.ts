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
    console.log("=== FETCHING TOTAL HARVESTED ===");
    // Check if we have valid Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
      console.log("Supabase not configured, returning fallback value")
      return 0
    }

    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Querying harvested_counts table...");

    const { data, error } = await supabase
      .from("harvested_counts")
      .select("total_harvested")
      .single()

    console.log("Supabase response:", { data, error });

    if (error) {
      console.error("Error fetching total harvested:", error)
      return 0
    }

    const result = data?.total_harvested || 0;
    console.log("Total harvested result:", result);
    return result;
  } catch (error) {
    console.error("Supabase connection error:", error)
    return 0
  }
}

// Update total harvested count (increment by amount)
export async function incrementHarvestedCount(amount: number): Promise<void> {
  try {
    console.log("=== INCREMENTING HARVESTED COUNT ===");
    console.log("Amount to add:", amount);
    
    // Check if we have valid Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
      console.log("Supabase not configured, cannot update harvested count")
      return
    }

    // First try to get existing record
    console.log("Fetching existing harvested count record...");
    const { data: existingData, error: fetchError } = await supabase
      .from("harvested_counts")
      .select("id, total_harvested")
      .single()

    console.log("Fetch result:", { existingData, fetchError });

    if (existingData) {
      console.log("Updating existing record:", existingData);
      const newTotal = existingData.total_harvested + amount;
      console.log("New total will be:", newTotal);
      
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
      console.log("Successfully updated harvested count to:", newTotal);
    } else {
      console.log("No existing record found, creating new one...");
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
      console.log("Successfully created new harvested count record with:", amount);
    }
  } catch (error) {
    console.error("Error incrementing harvested count:", error)
    throw error
  }
}

// Update product inventory counts when orders are placed
export async function updateProductInventoryCounts(orderItems: any[]): Promise<void> {
  try {
    console.log("=== UPDATING PRODUCT INVENTORY COUNTS ===");
    console.log("Order items:", orderItems);
    
    // Check if we have valid Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
      console.log("Supabase not configured, cannot update product inventory counts")
      return
    }

    // Process each order item
    for (const item of orderItems) {
      if (item.id && item.quantity && item.quantity > 0) {
        console.log(`Processing item: ${item.name} (ID: ${item.id}), Quantity: ${item.quantity}`);
        
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
              console.log(`Parsed inventory from description: ${currentCount}`);
            }
          } catch (e) {
            console.log("Could not parse description JSON, using inventory_count");
            currentCount = product.inventory_count || 0;
          }
          
          console.log(`Current inventory for ${product.name}: ${currentCount}`);
          const newCount = Math.max(0, currentCount - item.quantity)
          
          console.log(`Updating ${product.name} inventory: ${currentCount} → ${newCount}`);
          
          // Update both the description JSON and inventory_count field
          let newDescription = product.description;
          try {
            if (parsedDesc) {
              parsedDesc.inventory = newCount;
              newDescription = JSON.stringify(parsedDesc);
              console.log(`New description JSON: ${newDescription}`);
            }
          } catch (e) {
            console.log("Could not update description JSON");
          }
          
          // Update the product with new inventory count and description
          const updateData: any = { inventory_count: newCount };
          if (newDescription !== product.description) {
            updateData.description = newDescription;
          }
          
          console.log(`Updating product with data:`, updateData);
          
          const { error: updateError } = await supabase
            .from("products")
            .update(updateData)
            .eq("id", item.id)

          if (updateError) {
            console.error(`Error updating product inventory for ${product.name}:`, updateError)
          } else {
            console.log(`Successfully updated ${product.name} inventory to: ${newCount}`)
          }
        } else {
          console.log(`Product not found with ID: ${item.id}`)
        }
      }
    }
  } catch (error) {
    console.error("Error updating product inventory counts:", error)
    throw error
  }
}
