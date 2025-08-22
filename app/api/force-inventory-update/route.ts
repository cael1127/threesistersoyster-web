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

    console.log(`=== FORCE INVENTORY UPDATE ===`)
    console.log(`Product ID: ${product_id}`)
    console.log(`Quantity to subtract: ${quantity}`)

    const supabase = createSupabaseClient()

    // Step 1: Get current product data
    console.log(`Step 1: Fetching current product data...`)
    const { data: currentData, error: selectError } = await supabase
      .from("products")
      .select("id, name, inventory_count")
      .eq("id", product_id)
      .single()

    if (selectError) {
      console.error(`❌ Error fetching product:`, selectError)
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

    console.log(`✅ Current product: ${currentData.name}`)
    console.log(`✅ Current inventory: ${currentData.inventory_count}`)

    // Step 2: Calculate new inventory count
    const currentCount = currentData.inventory_count || 0
    const newCount = Math.max(0, currentCount - quantity)

    console.log(`Step 2: Calculating new inventory...`)
    console.log(`📊 ${currentCount} - ${quantity} = ${newCount}`)

    // Step 3: Update inventory using direct SQL
    console.log(`Step 3: Updating database...`)
    
    // Method 1: Try direct update first
    const { data: updateResult, error: updateError } = await supabase
      .from("products")
      .update({ inventory_count: newCount })
      .eq("id", product_id)
      .select()

    if (updateError) {
      console.error(`❌ Direct update failed:`, updateError)
      
      // Method 2: Try using raw SQL
      console.log(`🔄 Trying raw SQL update...`)
      const { data: sqlResult, error: sqlError } = await supabase
        .rpc('update_product_inventory', {
          product_id: product_id,
          new_inventory_count: newCount
        })
      
      if (sqlError) {
        console.error(`❌ SQL function also failed:`, sqlError)
        return NextResponse.json({ 
          error: 'All update methods failed',
          details: {
            directUpdate: updateError.message,
            sqlFunction: sqlError.message
          }
        }, { status: 500 })
      } else {
        console.log(`✅ SQL function update successful:`, sqlResult)
      }
    } else {
      console.log(`✅ Direct update successful:`, updateResult)
    }

    // Step 4: Verify the update
    console.log(`Step 4: Verifying update...`)
    const { data: verifyData, error: verifyError } = await supabase
      .from("products")
      .select("inventory_count")
      .eq("id", product_id)
      .single()

    if (verifyError) {
      console.error(`❌ Could not verify update:`, verifyError)
      return NextResponse.json({ 
        error: 'Update completed but verification failed',
        details: verifyError.message
      }, { status: 500 })
    }

    const actualCount = verifyData.inventory_count || 0
    console.log(`🔍 Verification: Inventory is now ${actualCount}`)

    if (actualCount !== newCount) {
      console.error(`❌ INVENTORY UPDATE FAILED: Expected ${newCount}, got ${actualCount}`)
      return NextResponse.json({ 
        error: 'Inventory update failed verification',
        expected: newCount,
        actual: actualCount
      }, { status: 500 })
    }

    console.log(`✅ INVENTORY UPDATE SUCCESSFUL!`)
    console.log(`=== FORCE UPDATE COMPLETE ===`)

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
      verification: {
        expected: newCount,
        actual: actualCount,
        match: actualCount === newCount
      }
    })

  } catch (error) {
    console.error("❌ Force inventory update error:", error)
    return NextResponse.json(
      { error: "Force update failed", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Force inventory update endpoint',
    usage: 'POST with { product_id: "string", quantity: number }',
    description: 'This endpoint directly updates product inventory in the database'
  })
}
