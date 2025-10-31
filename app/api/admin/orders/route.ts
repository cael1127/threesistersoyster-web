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

// Helper function to calculate pickup week start (Thursday 11:59 PM cutoff)
function getPickupWeekStart(orderDate: Date): Date {
  const date = new Date(orderDate)
  const day = date.getDay() // 0 = Sunday, 4 = Thursday
  const hours = date.getHours()
  const minutes = date.getMinutes()
  
  // If order is on Thursday before 11:59 PM, pickup is this Friday
  // If order is on Thursday after 11:59 PM or later, pickup is next Friday
  const isBeforeCutoff = day === 4 && (hours < 23 || (hours === 23 && minutes < 59))
  
  if (isBeforeCutoff) {
    // This Friday
    const friday = new Date(date)
    friday.setDate(date.getDate() + (5 - day)) // Move to Friday
    friday.setHours(0, 0, 0, 0)
    return friday
  } else {
    // Next Friday
    const daysUntilNextFriday = (5 - day + 7) % 7 || 7
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

    // If filtering by week, calculate the date range
    if (weekStart) {
      const startDate = new Date(weekStart)
      const endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 7)
      
      query = query
        .gte('pickup_week_start', startDate.toISOString().split('T')[0])
        .lt('pickup_week_start', endDate.toISOString().split('T')[0])
    }

    const { data, error } = await query

    if (error) throw error

    // Calculate pickup week start for each order if not already set
    const ordersWithPickupWeek = (data || []).map(order => {
      if (!order.pickup_week_start) {
        const pickupWeek = getPickupWeekStart(new Date(order.created_at))
        return {
          ...order,
          pickup_week_start: pickupWeek.toISOString().split('T')[0]
        }
      }
      return order
    })

    return NextResponse.json({ orders: ordersWithPickupWeek })
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

    const updateData: any = {}
    if (status) updateData.status = status
    if (payment_status) updateData.payment_status = payment_status

    const { data, error } = await auth.supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ order: data })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

