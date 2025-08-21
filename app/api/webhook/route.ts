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
      
      // Get line items to update inventory
      if (session.line_items?.data) {
        const supabase = createSupabaseClient()
        
        for (const item of session.line_items.data) {
          if (item.price?.product_data?.name) {
            const productName = item.price.product_data.name
            const quantity = item.quantity || 0
            
            console.log(`Updating inventory for ${productName}: -${quantity}`)
            
            // Update inventory in the products table
            const { error: updateError } = await supabase
              .from("products")
              .update({ 
                inventory_count: supabase.raw(`inventory_count - ${quantity}`)
              })
              .eq("name", productName)
              .gte("inventory_count", quantity) // Ensure we don't go below 0
            
            if (updateError) {
              console.error("Error updating inventory:", updateError)
            } else {
              console.log(`Successfully updated inventory for ${productName}`)
            }
          }
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
