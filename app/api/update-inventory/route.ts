import { NextRequest, NextResponse } from "next/server"
import { createSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, session_id } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    console.log("Manual inventory update for session:", session_id)
    console.log("Items to update:", items)

    const supabase = createSupabaseClient()
    const updateResults = []

    for (const item of items) {
      if (item.name && item.quantity > 0) {
        console.log(`Updating inventory for "${item.name}": -${item.quantity}`)
        
        // Update inventory in the products table
        const { data: updateResult, error: updateError } = await supabase
          .from("products")
          .update({ 
            inventory_count: supabase.raw(`GREATEST(inventory_count - ${item.quantity}, 0)`)
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
            newCount: updateResult[0]?.inventory_count
          })
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Inventory updated",
      results: updateResults
    })

  } catch (error) {
    console.error("Error updating inventory:", error)
    return NextResponse.json(
      { error: "Failed to update inventory" },
      { status: 500 }
    )
  }
}
