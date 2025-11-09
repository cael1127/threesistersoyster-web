import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/admin-auth'
import { getServiceSupabaseClient } from '@/lib/supabase'
import { calculatePickupWeekStart } from '@/lib/orders'

// Verify admin authentication
async function verifyAdmin(request: NextRequest) {
  const isAuthorized = await verifyAdminSession(request)
  if (!isAuthorized) {
    return { authorized: false }
  }
  return { authorized: true, supabase: getServiceSupabaseClient() }
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
        normalized.pickup_week_start = calculatePickupWeekStart(new Date(order.created_at))
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

