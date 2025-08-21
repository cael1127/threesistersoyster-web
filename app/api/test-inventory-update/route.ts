import { NextRequest, NextResponse } from "next/server"
import { createSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Test inventory update with sample data
    const testItems = [
      { name: "ONLY CAEL ORDER", quantity: 1 }
    ]

    console.log("TEST: Updating inventory with test items:", testItems)

    const supabase = createSupabaseClient()
    const updateResults = []

    for (const item of testItems) {
      console.log(`TEST: Updating inventory for "${item.name}": -${item.quantity}`)
      
      // First, check current inventory
      const { data: currentData, error: selectError } = await supabase
        .from("products")
        .select("inventory_count")
        .eq("name", item.name)
        .single()

      if (selectError) {
        console.error(`Error checking current inventory for ${item.name}:`, selectError)
        updateResults.push({
          item: item.name,
          success: false,
          error: `Product not found: ${selectError.message}`
        })
        continue
      }

      console.log(`Current inventory for ${item.name}:`, currentData.inventory_count)
      
      // Update inventory in the products table
      const { data: updateResult, error: updateError } = await supabase
        .from("products")
        .update({ 
          inventory_count: Math.max(0, (currentData.inventory_count || 0) - item.quantity)
        })
        .eq("name", item.name)
        .select()
      
      if (updateError) {
        console.error(`Error updating inventory for ${item.name}:`, updateError)
        updateResults.push({
          item: item.name,
          success: false,
          error: updateError.message
        })
      } else {
        console.log(`Successfully updated inventory for ${item.name}:`, updateResult)
        updateResults.push({
          item: item.name,
          success: true,
          oldCount: currentData.inventory_count,
          newCount: updateResult[0]?.inventory_count,
          decreased: item.quantity
        })
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Test inventory update completed",
      results: updateResults
    })

  } catch (error) {
    console.error("Error in test inventory update:", error)
    return NextResponse.json(
      { error: "Failed to test inventory update" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Test inventory update endpoint. Use POST to trigger a test update." 
  })
}
