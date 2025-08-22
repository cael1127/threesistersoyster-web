import { NextRequest, NextResponse } from "next/server"
import { createSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product_id, quantity } = body

    if (!product_id || !quantity) {
      return NextResponse.json({ 
        error: 'Product ID and quantity required',
        received: { product_id, quantity }
      }, { status: 400 })
    }

    console.log(`Testing inventory update for product ${product_id}, quantity: ${quantity}`)

    const supabase = createSupabaseClient()

    // First, get current product data
    const { data: currentData, error: selectError } = await supabase
      .from("products")
      .select("id, name, inventory_count, description")
      .eq("id", product_id)
      .single()

    if (selectError) {
      console.error(`Error fetching product:`, selectError)
      return NextResponse.json({ 
        error: 'Product not found',
        details: selectError.message
      }, { status: 404 })
    }

    if (!currentData) {
      return NextResponse.json({ 
        error: 'Product not found',
        product_id 
      }, { status: 404 })
    }

    console.log(`Current product data:`, currentData)

    // Calculate new inventory count
    const currentCount = currentData.inventory_count || 0
    const newCount = Math.max(0, currentCount - quantity)

    console.log(`Updating inventory: ${currentCount} → ${newCount}`)

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

    // Update the product
    const { data: updateResult, error: updateError } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", product_id)
      .select()

    if (updateError) {
      console.error(`Error updating product:`, updateError)
      return NextResponse.json({ 
        error: 'Failed to update product',
        details: updateError.message
      }, { status: 500 })
    }

    console.log(`Successfully updated product:`, updateResult)

    return NextResponse.json({ 
      success: true,
      message: 'Inventory updated successfully',
      product: {
        id: currentData.id,
        name: currentData.name,
        oldInventory: currentCount,
        newInventory: newCount,
        quantityReduced: quantity
      },
      updateResult: updateResult[0]
    })

  } catch (error) {
    console.error("Test inventory update error:", error)
    return NextResponse.json(
      { error: "Test failed", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Test inventory update endpoint',
    usage: 'POST with { product_id: "string", quantity: number }'
  })
}
