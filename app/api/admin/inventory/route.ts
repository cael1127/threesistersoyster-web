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

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (!auth.authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await auth.supabase
      .from('inventory')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ inventory: data })
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (!auth.authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, count, description } = body

    const { data, error } = await auth.supabase
      .from('inventory')
      .update({
        count,
        description
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ item: data })
  } catch (error) {
    console.error('Error updating inventory:', error)
    return NextResponse.json({ error: 'Failed to update inventory' }, { status: 500 })
  }
}

