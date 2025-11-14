import { NextRequest, NextResponse } from 'next/server'
import { createOrder, getServiceSupabaseClient, updateProductInventoryCounts } from '@/lib/supabase'
import { calculatePickupWeekStart } from '@/lib/orders'

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
    const { customer_name, customer_email, customer_phone, items, total_amount, notes, pickup_date, pickup_time } = body

    if (!customer_name || !customer_email || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!pickup_date || !pickup_time) {
      return NextResponse.json(
        { error: 'Pickup date and time are required.' },
        { status: 400 }
      )
    }

    const pickupDate = new Date(`${pickup_date}T00:00:00`)
    if (Number.isNaN(pickupDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid pickup date provided.' },
        { status: 400 }
      )
    }

    const monday = 1
    if (pickupDate.getUTCDay() === monday) {
      return NextResponse.json(
        { error: 'Pickups are not available on Mondays. Please choose another day.' },
        { status: 400 }
      )
    }

    const minDate = new Date()
    minDate.setHours(0, 0, 0, 0)
    minDate.setDate(minDate.getDate() + 2)
    const minDateStart = new Date(`${minDate.toISOString().split('T')[0]}T00:00:00`)

    if (pickupDate < minDateStart) {
      return NextResponse.json(
        { error: 'Pickups must be scheduled at least two days in advance.' },
        { status: 400 }
      )
    }

    const allowedTimes = new Set(['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'])
    if (!allowedTimes.has(pickup_time)) {
      return NextResponse.json(
        { error: 'Pickup time must be between 12:00 PM and 7:00 PM.' },
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
    const pickupWeekStart = calculatePickupWeekStart(pickupDate)

    // Create order with reservation status
    // Store reservation metadata in shipping_address jsonb field (since it's not used for pickup orders)
    const orderData = {
      customer_name,
      customer_email,
      customer_phone,
      items,
      total_amount,
      status: 'pending', // Using existing status field
      pickup_week_start: pickupWeekStart,
      shipping_address: {
        // Store reservation metadata in shipping_address jsonb field
        payment_status: 'reserved',
        order_type: 'reservation',
        pickup_code: pickupCode,
        pickup_requested_date: pickup_date,
        pickup_requested_time: pickup_time,
        pickup_week_start: pickupWeekStart,
        ...(notes ? { customer_notes: notes } : {})
      },
      payment_status: 'reserved',
      order_type: 'reservation',
      pickup_code: pickupCode,
      pickup_week_start: pickupWeekStart
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

