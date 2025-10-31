import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { createSupabaseClient } from "@/lib/supabase"

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
      const orderTotal = parseFloat(session.metadata?.orderTotal || "0")
      const itemCount = parseInt(session.metadata?.itemCount || "0")
      const customerName = session.metadata?.customerName || session.customer_details?.name || "Unknown"
      const customerEmail = session.metadata?.customerEmail || session.customer_details?.email || "Unknown"
      const customerPhone = session.customer_details?.phone || undefined
      

      
      // Get line items to update inventory - try multiple methods
      const supabase = createSupabaseClient()
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



      // Update inventory for all items using direct SQL for reliability
      for (const item of itemsToUpdate) {
        try {

          
          // Direct database update to avoid recursive API calls
          const { data: currentData, error: selectError } = await supabase
            .from("products")
            .select("id, name, inventory_count")
            .eq("id", item.id)
            .single()
          
          if (selectError) {
            continue
          }
          
          if (!currentData) {
            continue
          }
          
          // Calculate new inventory count
          const currentCount = currentData.inventory_count || 0
          const newCount = Math.max(0, currentCount - item.quantity)
          

          
          // Update the product with new inventory count
          const { data: updateResult, error: updateError } = await supabase
            .from("products")
            .update({ inventory_count: newCount })
            .eq("id", item.id)
            .select()
          
          if (updateError) {
            // Error updating inventory
          } else {

            
            // Verify the update actually happened
            const { data: verifyData, error: verifyError } = await supabase
              .from("products")
              .select("inventory_count")
              .eq("id", item.id)
              .single()
            
            if (verifyError) {
              // Could not verify update
            } else {
              const actualCount = verifyData.inventory_count || 0
              
              if (actualCount !== newCount) {
                // Inventory update failed
              } else {

              }
            }
          }
          
        } catch (error) {
          // Error processing item
        }
      }
      
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
      
      // Calculate pickup week start (Thursday 11:59 PM cutoff)
      const orderDate = new Date()
      const day = orderDate.getDay()
      const hours = orderDate.getHours()
      const minutes = orderDate.getMinutes()
      const isBeforeCutoff = day === 4 && (hours < 23 || (hours === 23 && minutes < 59))
      
      let pickupWeekStart: Date
      if (isBeforeCutoff) {
        pickupWeekStart = new Date(orderDate)
        pickupWeekStart.setDate(orderDate.getDate() + (5 - day))
      } else {
        const daysUntilNextFriday = (5 - day + 7) % 7 || 7
        pickupWeekStart = new Date(orderDate)
        pickupWeekStart.setDate(orderDate.getDate() + daysUntilNextFriday)
      }
      pickupWeekStart.setHours(0, 0, 0, 0)
      
      // Create order in database
      // Store metadata in shipping_address jsonb field (works with existing schema)
      let orderId: string | null = null
      try {
        const { createOrder: createOrderFunc } = await import('@/lib/supabase')
        const order = await createOrderFunc({
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          items: itemsToUpdate.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: (item as any).price || 0
          })),
          total_amount: orderTotal,
          status: 'confirmed',
          shipping_address: {
            payment_status: 'paid',
            order_type: 'online',
            pickup_week_start: pickupWeekStart.toISOString().split('T')[0]
          }
        })
        orderId = order.id
      } catch (orderError) {
        console.error('Error creating order:', orderError)
      }
      
      // Send receipt email directly (better than internal fetch)
      try {
        console.log('Attempting to send receipt email to:', customerEmail)
        const { sendOrderReceipt } = await import('@/lib/email')
        
        const emailResult = await sendOrderReceipt({
          customerName,
          customerEmail,
          customerPhone,
          orderId: orderId || session.id,
          items: itemsToUpdate.map(item => {
            const itemPrice = (item as any).price || itemPrices[item.id] || (orderTotal / itemsToUpdate.reduce((sum, i) => sum + i.quantity, 0))
            return {
              name: item.name,
              quantity: item.quantity,
              price: itemPrice
            }
          }),
          totalAmount: orderTotal,
          pickupWeekStart: pickupWeekStart.toISOString().split('T')[0],
          paymentStatus: 'paid'
        })
        
        console.log('Email send result:', emailResult)
        
        if (!emailResult.success) {
          console.error('Email sending failed:', emailResult.error || 'Unknown error')
        } else {
          console.log('Email sent successfully:', emailResult.id)
        }
      } catch (emailError) {
        console.error('Error sending receipt email:', emailError)
        const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error'
        console.error('Email error details:', errorMessage)
      }

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
