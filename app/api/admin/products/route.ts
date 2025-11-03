import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/admin-auth'
import { getServiceSupabaseClient, type Product } from '@/lib/supabase'

// Verify admin authentication for all routes
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

    // Validate price
    const priceValue = parseFloat(price)
    if (isNaN(priceValue) || priceValue < 0) {
      return NextResponse.json({ error: 'Invalid price value' }, { status: 400 })
    }

    // Prepare product data
    const productData: any = {
      name: name || '',
      description: formattedDescription || null,
      price: priceValue,
      category: normalizedCategory,
      image_url: image_url ? image_url.trim() : null,
      inventory_count: parseInt(inventory_count) || 0
    }

    console.log('Creating product with data:', JSON.stringify(productData, null, 2))

    const { data, error } = await auth.supabase
      .from('products')
      .insert([productData])
      .select()
      .single()

    if (error) {
      console.error('Database error creating product:', error)
      console.error('Error code:', error.code)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
      return NextResponse.json({ 
        error: 'Failed to create product',
        details: error.message || 'Database error',
        code: error.code,
        hint: error.hint
      }, { status: 500 })
    }

    if (!data) {
      console.error('Product creation returned no data')
      return NextResponse.json({ 
        error: 'Product created but no data returned',
        details: 'Please refresh the products list to verify creation'
      }, { status: 500 })
    }

    console.log('Product created successfully:', data.id, data.name)
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
    let formattedDescription: string | null = null
    if (description && description.trim()) {
      try {
        // Check if description is already JSON
        const parsed = JSON.parse(description)
        // Update inventory in JSON if it exists
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          parsed.inventory = inventory_count || parsed.inventory || 0
          formattedDescription = JSON.stringify(parsed)
        } else {
          // Invalid JSON structure, create new one
          formattedDescription = JSON.stringify({
            originalDescription: description.trim(),
            inventory: inventory_count || 0
          })
        }
      } catch {
        // If it's plain text, format it as JSON
        formattedDescription = JSON.stringify({
          originalDescription: description.trim(),
          inventory: inventory_count || 0
        })
      }
    } else if (description === null || description === '') {
      formattedDescription = null
    }

    // Build update object - ensure all values are valid
    const priceValue = parseFloat(price)
    const inventoryValue = parseInt(inventory_count) || 0

    if (isNaN(priceValue) || priceValue < 0) {
      return NextResponse.json({ error: 'Invalid price value' }, { status: 400 })
    }

    const updateData: any = {
      name: (name || '').trim(),
      price: priceValue,
      category: normalizedCategory,
      inventory_count: inventoryValue
    }

    // Only update description if we have a valid value
    if (formattedDescription !== null) {
      updateData.description = formattedDescription
    }

    // Only update image_url if it's explicitly provided
    if (image_url !== undefined) {
      updateData.image_url = image_url && image_url.trim() ? image_url.trim() : null
    }

    // Don't try to update updated_at - it may not exist and will auto-update if it does
    // If you need updated_at, add it to the database schema first

    console.log('Updating product:', { id, updateData })
    
    const { data, error } = await auth.supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error updating product:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      console.error('Update data attempted:', updateData)
      return NextResponse.json({ 
        error: 'Database error',
        details: error.message || 'Unknown database error',
        hint: 'Check console logs for details'
      }, { status: 500 })
    }

    if (!data) {
      console.error('Product update returned no data for id:', id)
      return NextResponse.json({ error: 'Product not found or update failed' }, { status: 404 })
    }

    console.log('Product updated successfully:', data)
    return NextResponse.json({ success: true, product: data })
  } catch (error) {
    console.error('Error updating product:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    console.error('Full error:', errorStack || errorMessage)
    
    return NextResponse.json({ 
      error: 'Failed to update product',
      details: errorMessage
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

    console.log('Deleting product:', id)

    const { data, error } = await auth.supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select()

    if (error) {
      console.error('Database error deleting product:', error)
      throw error
    }

    console.log('Product deleted successfully:', id)
    return NextResponse.json({ success: true, deletedId: id })
  } catch (error) {
    console.error('Error deleting product:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      error: 'Failed to delete product',
      details: errorMessage
    }, { status: 500 })
  }
}

