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
      if (item.id && item.quantity > 0) {
        console.log(`Updating inventory for "${item.name}" (ID: ${item.id}): -${item.quantity}`)
        
        // First get current product data including description
        const { data: currentData, error: selectError } = await supabase
          .from("products")
          .select("id, name, inventory_count, description")
          .eq("id", item.id)
          .single()
        
        if (selectError) {
          console.error(`Error getting current product data for ${item.name}:`, selectError)
          updateResults.push({
            item: item.name,
            success: false,
            error: `Product not found: ${selectError.message}`
          })
          continue
        }
        
        if (!currentData) {
          console.error(`Product not found with ID: ${item.id}`)
          updateResults.push({
            item: item.name,
            success: false,
            error: `Product not found with ID: ${item.id}`
          })
          continue
        }
        
        // Calculate new inventory count
        const currentCount = currentData.inventory_count || 0
        const newCount = Math.max(0, currentCount - item.quantity)
        
        console.log(`Updating ${currentData.name} inventory: ${currentCount} → ${newCount}`)
        
        // Update both inventory_count and description JSON if it exists
        let updateData: any = { inventory_count: newCount }
        
        try {
          if (currentData.description) {
            const parsedDesc = JSON.parse(currentData.description)
            parsedDesc.inventory = newCount
            updateData.description = JSON.stringify(parsedDesc)
            console.log(`Updated description JSON with new inventory: ${newCount}`)
          }
        } catch (parseError) {
          console.log("Description is not JSON, updating only inventory_count")
        }
        
        // Update the product with new inventory count
        const { data: updateResult, error: updateError } = await supabase
          .from("products")
          .update(updateData)
          .eq("id", item.id)
          .select()
        
        if (updateError) {
          console.error(`Error updating inventory for ${currentData.name}:`, updateError)
          updateResults.push({
            item: currentData.name,
            success: false,
            error: updateError.message
          })
        } else {
          console.log(`Successfully updated inventory for ${currentData.name}:`, updateResult)
          updateResults.push({
            item: currentData.name,
            success: true,
            newCount: updateResult[0]?.inventory_count
          })
        }
      } else {
        console.error(`Invalid item data:`, item)
        updateResults.push({
          item: item.name || 'Unknown',
          success: false,
          error: 'Missing ID or invalid quantity'
        })
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
