import { NextRequest, NextResponse } from "next/server"
import { createSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { test_items } = body

    if (!test_items || !Array.isArray(test_items)) {
      return NextResponse.json({ 
        error: 'Test items array required',
        usage: 'POST with { test_items: [{ id: "string", name: "string", quantity: number }] }'
      }, { status: 400 })
    }

    console.log(`=== TESTING INVENTORY LOGIC ===`)
    console.log(`Test items:`, test_items)

    const supabase = createSupabaseClient()
    const results = []

    for (const testItem of test_items) {
      try {
        console.log(`\n🧪 Testing item: ${testItem.name} (ID: ${testItem.id})`)
        console.log(`📊 Test quantity: ${testItem.quantity}`)
        
        // Get current product data
        const { data: currentData, error: selectError } = await supabase
          .from("products")
          .select("id, name, inventory_count")
          .eq("id", testItem.id)
          .single()

        if (selectError) {
          console.error(`❌ Error fetching product:`, selectError)
          results.push({
            item: testItem.name,
            success: false,
            error: selectError.message
          })
          continue
        }

        if (!currentData) {
          console.error(`❌ Product not found`)
          results.push({
            item: testItem.name,
            success: false,
            error: 'Product not found'
          })
          continue
        }

        const currentCount = currentData.inventory_count || 0
        const testQuantity = parseInt(testItem.quantity) || 0
        const calculatedNewCount = Math.max(0, currentCount - testQuantity)

        console.log(`📊 Current inventory: ${currentCount}`)
        console.log(`📊 Test quantity: ${testQuantity}`)
        console.log(`📊 Calculated new count: ${currentCount} - ${testQuantity} = ${calculatedNewCount}`)

        // Test the calculation logic
        const testResult = {
          item: testItem.name,
          id: testItem.id,
          currentInventory: currentCount,
          testQuantity: testQuantity,
          calculatedNewCount: calculatedNewCount,
          calculation: `${currentCount} - ${testQuantity} = ${calculatedNewCount}`,
          isValid: calculatedNewCount >= 0 && calculatedNewCount <= currentCount
        }

        console.log(`✅ Test result:`, testResult)
        results.push(testResult)

      } catch (error) {
        console.error(`❌ Error testing item ${testItem.name}:`, error)
        results.push({
          item: testItem.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    console.log(`\n=== INVENTORY LOGIC TEST COMPLETE ===`)
    console.log(`Results:`, results)

    return NextResponse.json({ 
      success: true,
      message: 'Inventory logic test completed',
      results: results,
      summary: {
        totalItems: results.length,
        validCalculations: results.filter(r => r.isValid !== false).length,
        invalidCalculations: results.filter(r => r.isValid === false).length
      }
    })

  } catch (error) {
    console.error("❌ Inventory logic test error:", error)
    return NextResponse.json(
      { error: "Test failed", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Inventory logic test endpoint',
    usage: 'POST with { test_items: [{ id: "string", name: "string", quantity: number }] }',
    description: 'This endpoint tests the inventory calculation logic without making actual changes'
  })
}
