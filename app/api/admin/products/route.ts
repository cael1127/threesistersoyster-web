import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/admin-auth'
import { getSupabaseClient, type Product } from '@/lib/supabase'

// Verify admin authentication for all routes
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
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ products: data })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (!auth.authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, price, category, image_url, inventory_count } = body

    // Validate category - must be 'merch' or 'oysters'
    const normalizedCategory = category.toLowerCase().trim()
    if (!['merch', 'oysters'].includes(normalizedCategory)) {
      return NextResponse.json({ 
        error: "Category must be either 'merch' or 'oysters'" 
      }, { status: 400 })
    }

    // Format description as JSON if it contains structured data, otherwise keep as plain text
    let formattedDescription = description
    if (description) {
      try {
        // If it's already JSON, keep it
        JSON.parse(description)
        formattedDescription = description
      } catch {
        // If it's plain text, format it as JSON with originalDescription
        formattedDescription = JSON.stringify({
          originalDescription: description,
          inventory: inventory_count || 0
        })
      }
    }

    const { data, error } = await auth.supabase
      .from('products')
      .insert([{
        name,
        description: formattedDescription,
        price: parseFloat(price),
        category: normalizedCategory,
        image_url: image_url || null,
        inventory_count: parseInt(inventory_count) || 0
      }])
      .select()
      .single()

    if (error) {
      console.error('Database error creating product:', error)
      throw error
    }

    return NextResponse.json({ success: true, product: data })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ 
      error: 'Failed to create product',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (!auth.authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, name, description, price, category, image_url, inventory_count } = body

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // Validate category - must be 'merch' or 'oysters'
    const normalizedCategory = category.toLowerCase().trim()
    if (!['merch', 'oysters'].includes(normalizedCategory)) {
      return NextResponse.json({ 
        error: "Category must be either 'merch' or 'oysters'" 
      }, { status: 400 })
    }

    // Format description - preserve existing JSON structure or create new one
    let formattedDescription = description
    if (description) {
      try {
        // Check if description is already JSON
        const parsed = JSON.parse(description)
        // Update inventory in JSON if it exists
        if (parsed && typeof parsed === 'object') {
          parsed.inventory = inventory_count || parsed.inventory || 0
          formattedDescription = JSON.stringify(parsed)
        } else {
          formattedDescription = description
        }
      } catch {
        // If it's plain text, format it as JSON
        formattedDescription = JSON.stringify({
          originalDescription: description,
          inventory: inventory_count || 0
        })
      }
    }

    // Build update object
    const updateData: any = {
      name,
      description: formattedDescription,
      price: parseFloat(price),
      category: normalizedCategory,
      inventory_count: parseInt(inventory_count) || 0
    }

    if (image_url !== undefined) {
      updateData.image_url = image_url || null
    }

    // Note: updated_at column may not exist, so we'll try to update it but won't fail if it doesn't
    try {
      updateData.updated_at = new Date().toISOString()
    } catch {}

    const { data, error } = await auth.supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error updating product:', error)
      throw error
    }

    if (!data) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, product: data })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ 
      error: 'Failed to update product',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (!auth.authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const { error } = await auth.supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}

