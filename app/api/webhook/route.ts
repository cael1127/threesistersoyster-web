import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { createSupabaseClient } from "@/lib/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = headers().get("stripe-signature")

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      
      console.log("Processing completed checkout session:", session.id)
      
      // Extract order details from metadata
      const orderTotal = parseFloat(session.metadata?.orderTotal || "0")
      const itemCount = parseInt(session.metadata?.itemCount || "0")
      const customerName = session.metadata?.customerName || "Unknown"
      const customerEmail = session.metadata?.customerEmail || "Unknown"
      
      // Get line items to update inventory - try multiple methods
      const supabase = createSupabaseClient()
      let itemsToUpdate: Array<{name: string, quantity: number}> = []

      // Method 1: Try to get items from metadata (most reliable)
      if (session.metadata?.items) {
        try {
          const metadataItems = JSON.parse(session.metadata.items)
          itemsToUpdate = metadataItems.map((item: any) => ({
            name: item.name,
            quantity: item.quantity
          }))
          console.log("Using items from metadata:", itemsToUpdate)
        } catch (error) {
          console.error("Error parsing items from metadata:", error)
        }
      }

      // Method 2: If metadata doesn't work, fetch line items from Stripe
      if (itemsToUpdate.length === 0) {
        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            expand: ['data.price.product']
          })
          
          console.log("Retrieved line items from Stripe:", lineItems.data.length)
          
          for (const item of lineItems.data) {
            const productName = item.price?.product_data?.name || item.description
            const quantity = item.quantity || 0
            
            if (productName && quantity > 0) {
              itemsToUpdate.push({ name: productName, quantity })
            }
          }
        } catch (lineItemError) {
          console.error("Error fetching line items:", lineItemError)
        }
      }

      // Update inventory for all items
      for (const item of itemsToUpdate) {
        try {
          console.log(`Updating inventory for "${item.name}": -${item.quantity}`)
          
          // Update inventory in the products table
          const { data: updateResult, error: updateError } = await supabase
            .from("products")
            .update({ 
              inventory_count: supabase.raw(`GREATEST(inventory_count - ${item.quantity}, 0)`)
            })
            .eq("name", item.name)
            .select()
          
          if (updateError) {
            console.error(`Error updating inventory for ${item.name}:`, updateError)
          } else {
            console.log(`Successfully updated inventory for ${item.name}:`, updateResult)
          }
        } catch (error) {
          console.error(`Error processing item ${item.name}:`, error)
        }
      }
      
      // Release inventory reservations for this session
      if (session.metadata?.session_id) {
        try {
          console.log(`Releasing reservations for session: ${session.metadata.session_id}`)
          
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
            console.log(`Released ${releaseData.releasedCount} reservations`)
          } else {
            console.error('Failed to release reservations:', await releaseResponse.text())
          }
        } catch (releaseError) {
          console.error('Error releasing reservations:', releaseError)
        }
      }
      
      // You could also save the order to a separate orders table here
      console.log(`Order completed: ${customerName} (${customerEmail}) - $${orderTotal}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}
