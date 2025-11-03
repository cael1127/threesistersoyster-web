import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/admin-auth'
import { getSupabaseClient } from '@/lib/supabase'

// Verify admin authentication
async function verifyAdmin(request: NextRequest) {
  const isAuthorized = await verifyAdminSession(request)
  if (!isAuthorized) {
    return { authorized: false }
  }
  return { authorized: true, supabase: getSupabaseClient() }
}

// Helper function to calculate pickup week start (Wednesday 11:59 PM cutoff)
function getPickupWeekStart(orderDate: Date): Date {
  const date = new Date(orderDate)
  const day = date.getDay() // 0 = Sunday, 3 = Wednesday
  const hours = date.getHours()
  const minutes = date.getMinutes()
  
  // Orders placed Monday through Wednesday (before Wednesday 11:59 PM) → pickup this Friday
  // Orders placed after Wednesday 11:59 PM → pickup next Friday
  const isBeforeCutoff = (day >= 1 && day <= 3) && !(day === 3 && hours === 23 && minutes >= 59)
  
  if (isBeforeCutoff) {
    // This Friday
    const friday = new Date(date)
    friday.setDate(date.getDate() + (5 - day)) // Move to Friday
    friday.setHours(0, 0, 0, 0)
    return friday
  } else {
    // Next week's Friday (after Wednesday cutoff)
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
    const nextFriday = new Date(date)
    nextFriday.setDate(date.getDate() + daysUntilNextFriday)
    nextFriday.setHours(0, 0, 0, 0)
    return nextFriday
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (!auth.authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const weekStart = searchParams.get('week_start')

    let query = auth.supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    // Note: We can't filter by pickup_week_start directly in the query
    // because it's stored in shipping_address jsonb. We'll filter after normalization.

    const { data, error } = await query

    if (error) {
      console.error('Database error fetching orders:', error)
      throw error
    }

    console.log('Raw orders fetched from database:', data?.length || 0)

    // Import normalizeOrder helper
    const { normalizeOrder } = await import('@/lib/supabase')

    // Normalize orders (extract metadata from shipping_address) and calculate pickup week
    const ordersWithPickupWeek = (data || []).map(order => {
      const normalized = normalizeOrder(order)
      
      // Calculate pickup week start if not already set
      if (!normalized.pickup_week_start) {
        const pickupWeek = getPickupWeekStart(new Date(order.created_at))
        normalized.pickup_week_start = pickupWeek.toISOString().split('T')[0]
      }
      
      return normalized
    })

    console.log('Orders after normalization:', ordersWithPickupWeek.length)

    // Filter by week if specified (using normalized pickup_week_start)
    let filteredOrders = ordersWithPickupWeek
    if (weekStart) {
      filteredOrders = ordersWithPickupWeek.filter(order => {
        return order.pickup_week_start === weekStart
      })
      console.log('Orders filtered by week:', filteredOrders.length)
    }

    return NextResponse.json({ orders: filteredOrders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (!auth.authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, status, payment_status } = body

    // Get current order to preserve shipping_address metadata
    const { data: currentOrder } = await auth.supabase
      .from('orders')
      .select('shipping_address')
      .eq('id', id)
      .single()

    const updateData: any = {}
    if (status) updateData.status = status
    
    // Update payment_status in shipping_address jsonb field
    if (payment_status) {
      const shippingAddress = currentOrder?.shipping_address || {}
      updateData.shipping_address = {
        ...shippingAddress,
        payment_status
      }
    }

    const { data, error } = await auth.supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Normalize the response
    const { normalizeOrder } = await import('@/lib/supabase')
    return NextResponse.json({ order: normalizeOrder(data) })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

