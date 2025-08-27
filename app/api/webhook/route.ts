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
      console.error("No signature provided")
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    } catch (err) {
      console.error("Webhook signature verification failed:", err)
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
      

      
      // Extract order details from metadata
      const orderTotal = parseFloat(session.metadata?.orderTotal || "0")
      const itemCount = parseInt(session.metadata?.itemCount || "0")
      const customerName = session.metadata?.customerName || "Unknown"
      const customerEmail = session.metadata?.customerEmail || "Unknown"
      

      
      // Get line items to update inventory - try multiple methods
      const supabase = createSupabaseClient()
      let itemsToUpdate: Array<{id: string, name: string, quantity: number}> = []

      // Method 1: Try to get items from metadata (most reliable)
      if (session.metadata?.items) {
        try {
          const metadataItems = JSON.parse(session.metadata.items)
          
          itemsToUpdate = metadataItems.map((item: any) => ({
            id: item.id,
            name: item.name,
            quantity: parseInt(item.quantity) || 0
          }))
          

        } catch (error) {
          console.error("❌ Error parsing items from metadata:", error)
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
                console.error(`❌ Could not find product with name: ${productName}`)
              }
            }
          }
        } catch (lineItemError) {
          console.error("❌ Error fetching line items:", lineItemError)
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
            console.error(`❌ Error getting current product data for ${item.name}:`, selectError)
            continue
          }
          
          if (!currentData) {
            console.error(`❌ Product not found with ID: ${item.id}`)
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
            console.error(`❌ Error updating inventory for ${currentData.name}:`, updateError)
          } else {

            
            // Verify the update actually happened
            const { data: verifyData, error: verifyError } = await supabase
              .from("products")
              .select("inventory_count")
              .eq("id", item.id)
              .single()
            
            if (verifyError) {
              console.error(`❌ Could not verify update for ${currentData.name}:`, verifyError)
            } else {
              const actualCount = verifyData.inventory_count || 0
              
              if (actualCount !== newCount) {
                console.error(`❌ INVENTORY UPDATE FAILED: Expected ${newCount}, got ${actualCount}`)
              } else {

              }
            }
          }
          
        } catch (error) {
          console.error(`❌ Error processing item ${item.name}:`, error)
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
            console.error('❌ Failed to release reservations:', await releaseResponse.text())
          }
        } catch (releaseError) {
          console.error('❌ Error releasing reservations:', releaseError)
        }
      }
      
      // You could also save the order to a separate orders table here

    } else {

    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("❌ Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}
