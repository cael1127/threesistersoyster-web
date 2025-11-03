import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { getServiceSupabaseClient } from "@/lib/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// In-memory store to prevent duplicate webhook processing
// In production, use Redis or database for this
const processedWebhooks = new Set<string>()

export async function POST(request: NextRequest) {
  try {

    const headersList = await headers()
    
    const body = await request.text()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    } catch (err) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Check if we've already processed this webhook
    if (processedWebhooks.has(event.id)) {
      return NextResponse.json({ received: true, alreadyProcessed: true })
    }

    // Mark this webhook as processed
    processedWebhooks.add(event.id)
    
    // Clean up old webhook IDs (keep last 1000)
    if (processedWebhooks.size > 1000) {
      const webhookArray = Array.from(processedWebhooks)
      processedWebhooks.clear()
      webhookArray.slice(-500).forEach(id => processedWebhooks.add(id))
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      

      
      // Extract order details from metadata or session
      const orderTotal = session.metadata?.orderTotal 
        ? parseFloat(session.metadata.orderTotal) 
        : (session.amount_total ? session.amount_total / 100 : 0)
      const itemCount = parseInt(session.metadata?.itemCount || "0")
      const customerName = session.metadata?.customerName || session.customer_details?.name || session.shipping_details?.name || "Unknown Customer"
      const customerEmail = session.metadata?.customerEmail || session.customer_details?.email || session.customer_email || "unknown@email.com"
      const customerPhone = session.customer_details?.phone || session.shipping_details?.phone || undefined
      
      console.log('Webhook processing checkout.session.completed:', {
        session_id: session.id,
        customer_name: customerName,
        customer_email: customerEmail,
        order_total: orderTotal,
        item_count: itemCount
      })
      

      
      // Get line items to update inventory - try multiple methods
      const supabase = getServiceSupabaseClient()
      let itemsToUpdate: Array<{id: string, name: string, quantity: number}> = []

      // Method 1: Try to get items from metadata (most reliable)
      let itemPrices: Record<string, number> = {}
      if (session.metadata?.items) {
        try {
          const metadataItems = JSON.parse(session.metadata.items)
          
          itemsToUpdate = metadataItems.map((item: any) => {
            if (item.price) {
              itemPrices[item.id] = item.price
            }
            return {
              id: item.id,
              name: item.name,
              quantity: parseInt(item.quantity) || 0,
              price: item.price || 0
            }
          })
          

        } catch (error) {
          // Error parsing items from metadata
        }
      }

      // Method 2: If metadata doesn't work, fetch line items from Stripe
      if (itemsToUpdate.length === 0) {
        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            expand: ['data.price.product']
          })
          

          
          for (const item of lineItems.data) {
            // Handle both old and new Stripe API versions
            const productName = (item.price as any)?.product_data?.name || 
                               (item.price as any)?.product?.name || 
                               item.description
            const quantity = item.quantity || 0
            
            if (productName && quantity > 0) {
              // Try to find product by name to get ID
              const { data: productData, error: productError } = await supabase
                .from("products")
                .select("id")
                .eq("name", productName)
                .single()
              
              if (productData && !productError) {
                itemsToUpdate.push({ 
                  id: productData.id, 
                  name: productName, 
                  quantity 
                })

              } else {
                // Could not find product with name
              }
            }
          }
        } catch (lineItemError) {
          // Error fetching line items
        }
      }



      // Update inventory for all items - decrement stock when order is placed
      console.log(`📦 Updating inventory for ${itemsToUpdate.length} items...`)
      
      for (const item of itemsToUpdate) {
        try {
          // Get current product data including description to update JSON if needed
          const { data: currentData, error: selectError } = await supabase
            .from("products")
            .select("id, name, inventory_count, description")
            .eq("id", item.id)
            .single()
          
          if (selectError) {
            console.error(`❌ Error fetching product ${item.id}:`, selectError.message)
            continue
          }
          
          if (!currentData) {
            console.error(`❌ Product ${item.id} not found`)
            continue
          }
          
          // Calculate new inventory count (decrement by quantity ordered)
          const currentCount = currentData.inventory_count || 0
          const newCount = Math.max(0, currentCount - item.quantity)
          
          console.log(`📉 Updating ${currentData.name}: ${currentCount} → ${newCount} (decrementing ${item.quantity})`)
          
          // Prepare update data - update both inventory_count and description JSON
          let updateData: any = { inventory_count: newCount }
          
          // Also update inventory in description JSON if it exists
          try {
            if (currentData.description) {
              const parsedDesc = JSON.parse(currentData.description)
              if (parsedDesc && typeof parsedDesc === 'object' && !Array.isArray(parsedDesc)) {
                parsedDesc.inventory = newCount
                updateData.description = JSON.stringify(parsedDesc)
                console.log(`✅ Updated description JSON for ${currentData.name}`)
              }
            }
          } catch (parseError) {
            // If description is not JSON, keep it as is and only update inventory_count
            console.warn(`⚠️ Could not parse description for ${currentData.name}, updating inventory_count only`)
          }
          
          // Update the product with new inventory count
          const { data: updateResult, error: updateError } = await supabase
            .from("products")
            .update(updateData)
            .eq("id", item.id)
            .select("inventory_count")
          
          if (updateError) {
            console.error(`❌ Error updating inventory for ${currentData.name}:`, updateError.message)
            console.error('Update error details:', updateError)
          } else {
            // Verify the update actually happened
            const { data: verifyData, error: verifyError } = await supabase
              .from("products")
              .select("inventory_count")
              .eq("id", item.id)
              .single()
            
            if (verifyError) {
              console.error(`❌ Could not verify inventory update for ${currentData.name}:`, verifyError.message)
            } else {
              const actualCount = verifyData.inventory_count || 0
              
              if (actualCount !== newCount) {
                console.error(`❌ Inventory update verification failed for ${currentData.name}: expected ${newCount}, got ${actualCount}`)
              } else {
                console.log(`✅ Inventory updated successfully for ${currentData.name}: ${actualCount}`)
              }
            }
          }
          
        } catch (error) {
          console.error(`❌ Error processing item ${item.id}:`, error instanceof Error ? error.message : 'Unknown error')
          console.error('Item processing error stack:', error instanceof Error ? error.stack : undefined)
        }
      }
      
      console.log(`✅ Finished inventory updates`)
      
      // Release inventory reservations for this session
      if (session.metadata?.session_id) {
        try {
          const releaseResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/reserve-inventory`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              session_id: session.metadata.session_id
            })
          })
          
          if (releaseResponse.ok) {
            const releaseData = await releaseResponse.json()
          } else {
            // Failed to release reservations
          }
        } catch (releaseError) {
          // Error releasing reservations
        }
      }
      
      // Calculate pickup week start (Wednesday 11:59 PM cutoff)
      const orderDate = new Date()
      const day = orderDate.getDay()
      const hours = orderDate.getHours()
      const minutes = orderDate.getMinutes()
      // Orders placed Monday through Wednesday (before Wednesday 11:59 PM) → pickup this Friday
      // Orders placed after Wednesday 11:59 PM → pickup next Friday
      const isBeforeCutoff = (day >= 1 && day <= 3) && !(day === 3 && hours === 23 && minutes >= 59)
      
      let pickupWeekStart: Date
      if (isBeforeCutoff) {
        pickupWeekStart = new Date(orderDate)
        pickupWeekStart.setDate(orderDate.getDate() + (5 - day))
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
        pickupWeekStart = new Date(orderDate)
        pickupWeekStart.setDate(orderDate.getDate() + daysUntilNextFriday)
      }
      pickupWeekStart.setHours(0, 0, 0, 0)
      
      // Create order in database
      // Store metadata in shipping_address jsonb field (works with existing schema)
      let orderId: string | null = null
      try {
        console.log('Creating order in database...')
        console.log('Order details:', {
          customer_name: customerName,
          customer_email: customerEmail,
          items_count: itemsToUpdate.length,
          total_amount: orderTotal,
          pickup_week_start: pickupWeekStart.toISOString().split('T')[0]
        })
        
        // Ensure we have at least basic order data even if items extraction failed
        const orderItems = itemsToUpdate.length > 0 
          ? itemsToUpdate.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: (item as any).price || 0
            }))
          : [{
              id: 'unknown',
              name: 'Order Items',
              quantity: itemCount || 1,
              price: orderTotal || 0
            }]
        
        if (orderItems.length === 0) {
          throw new Error('Cannot create order without items')
        }
        
        const { createOrder: createOrderFunc } = await import('@/lib/supabase')
        const order = await createOrderFunc({
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          items: orderItems,
          total_amount: orderTotal,
          status: 'confirmed',
          shipping_address: {
            payment_status: 'paid',
            order_type: 'online',
            pickup_week_start: pickupWeekStart.toISOString().split('T')[0]
          }
        })
        orderId = order.id
        console.log('✅ Order created successfully in database:', orderId)
        console.log('Order details:', {
          id: order.id,
          customer: customerName,
          email: customerEmail,
          total: orderTotal,
          items: itemsToUpdate.length
        })
      } catch (orderError) {
        console.error('❌ ERROR creating order in database:', orderError)
        console.error('Order error details:', {
          message: orderError instanceof Error ? orderError.message : 'Unknown error',
          stack: orderError instanceof Error ? orderError.stack : undefined,
          customer_name: customerName,
          customer_email: customerEmail,
          order_total: orderTotal,
          items_count: itemsToUpdate.length
        })
        // Don't throw - webhook should still return success to Stripe
        // but log the error for debugging
        // TODO: Consider sending alert/notification when order creation fails
      }
      
      // Email sending removed - customers will screenshot the success page receipt

    } else {

    }

    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}
