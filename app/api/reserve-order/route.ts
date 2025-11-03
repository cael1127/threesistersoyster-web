import { NextRequest, NextResponse } from 'next/server'
import { createOrder, getServiceSupabaseClient, updateProductInventoryCounts } from '@/lib/supabase'

// Helper function to calculate pickup week start (Wednesday 11:59 PM cutoff)
function getPickupWeekStart(orderDate: Date): string {
  const date = new Date(orderDate)
  const day = date.getDay() // 0 = Sunday, 3 = Wednesday
  const hours = date.getHours()
  const minutes = date.getMinutes()
  
  // Orders placed Monday through Wednesday (before Wednesday 11:59 PM) → pickup this Friday
  // Orders placed after Wednesday 11:59 PM → pickup next Friday
  const isBeforeCutoff = (day >= 1 && day <= 3) && !(day === 3 && hours === 23 && minutes >= 59)
  
  let pickupDate: Date
  if (isBeforeCutoff) {
    // This Friday
    pickupDate = new Date(date)
    pickupDate.setDate(date.getDate() + (5 - day)) // Move to Friday
  } else {
    // Next week's Friday (after Wednesday cutoff)
    // Calculate days to next Friday, ensuring it's always next week's Friday
    let daysUntilNextFriday: number
    if (day === 0) { // Sunday
      daysUntilNextFriday = 5
    } else if (day === 4) { // Thursday
      daysUntilNextFriday = 8 // Next week's Friday
    } else if (day === 5) { // Friday
      daysUntilNextFriday = 7
    } else if (day === 6) { // Saturday
      daysUntilNextFriday = 6
    } else { // Shouldn't happen (day 1-3), but fallback
      daysUntilNextFriday = (5 - day + 7) % 7 || 7
    }
    pickupDate = new Date(date)
    pickupDate.setDate(date.getDate() + daysUntilNextFriday)
  }
  
  pickupDate.setHours(0, 0, 0, 0)
  return pickupDate.toISOString().split('T')[0]
}

// Generate a unique pickup code
function generatePickupCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Removed confusing chars
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer_name, customer_email, customer_phone, items, total_amount } = body

    if (!customer_name || !customer_email || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = getServiceSupabaseClient()

    // Check inventory availability
    for (const item of items) {
      const { data: product, error } = await supabase
        .from('products')
        .select('inventory_count, description')
        .eq('id', item.id)
        .single()

      if (error || !product) {
        return NextResponse.json(
          { error: `Product ${item.name} not found` },
          { status: 400 }
        )
      }

      // Parse inventory from description JSON or use inventory_count
      let currentInventory = product.inventory_count || 0
      try {
        if (product.description) {
          const parsed = JSON.parse(product.description)
          currentInventory = parsed.inventory || currentInventory
        }
      } catch {}

      if (currentInventory < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient inventory for ${item.name}. Only ${currentInventory} available.` },
          { status: 400 }
        )
      }
    }

    // Generate pickup code and calculate pickup week
    const pickupCode = generatePickupCode()
    const pickupWeekStart = getPickupWeekStart(new Date())

    // Create order with reservation status
    // Store reservation metadata in shipping_address jsonb field (since it's not used for pickup orders)
    const orderData = {
      customer_name,
      customer_email,
      customer_phone,
      items,
      total_amount,
      status: 'pending', // Using existing status field
      shipping_address: {
        // Store reservation metadata in shipping_address jsonb field
        payment_status: 'reserved',
        order_type: 'reservation',
        pickup_code: pickupCode,
        pickup_week_start: pickupWeekStart
      }
    }

    console.log('Creating order with data:', JSON.stringify(orderData, null, 2))
    
    let order
    try {
      order = await createOrder(orderData)
      console.log('Order created successfully:', order.id)
    } catch (orderError) {
      console.error('Error creating order:', orderError)
      const errorMessage = orderError instanceof Error ? orderError.message : 'Unknown error'
      const errorDetails = orderError instanceof Error && 'code' in orderError ? (orderError as any).code : 'no-code'
      console.error('Order error details:', { errorMessage, errorDetails, orderData })
      return NextResponse.json(
        { 
          error: 'Failed to create order in database',
          details: errorMessage,
          hint: 'Check if database migration has been run (scripts/database-migration-orders.sql)'
        },
        { status: 500 }
      )
    }

    // Update inventory counts (reserve the items)
    try {
      await updateProductInventoryCounts(items)
      console.log('Inventory updated successfully')
    } catch (inventoryError) {
      console.error('Error updating inventory:', inventoryError)
      // Don't fail the reservation if inventory update fails - order is already created
      // We can update inventory manually if needed
    }

    // Email sending removed - customers will screenshot the success page receipt

    // Normalize order to extract metadata from shipping_address
    const { normalizeOrder } = await import('@/lib/supabase')
    const normalizedOrder = normalizeOrder(order)

    return NextResponse.json({
      success: true,
      order: normalizedOrder
    })
  } catch (error) {
    console.error('Error creating reservation:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    console.error('Full error details:', { errorMessage, errorStack })
    
    return NextResponse.json(
      { 
        error: 'Failed to create reservation',
        details: errorMessage,
        hint: 'Check server logs for more details'
      },
      { status: 500 }
    )
  }
}

