import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    })
  : null

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      console.error("Stripe not configured")
      return NextResponse.json({ error: 'Payment service unavailable' }, { status: 503 })
    }

    // Parse request body
    const body = await request.json()
    console.log('Checkout request body:', body)
    
    const { items, total_amount, customer_name, customer_email } = body
    
    // Basic validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    }

    if (!total_amount || total_amount <= 0) {
      return NextResponse.json({ error: 'Invalid total amount' }, { status: 400 })
    }

    // Create Stripe line items
    const lineItems = items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name || "Premium Oysters",
          description: "Fresh Texas Oysters from Three Sisters Oyster Co.",
        },
        unit_amount: Math.round((item.price || 0) * 100), // Stripe expects cents
      },
      quantity: item.quantity || 1,
    }))

    console.log('Creating Stripe checkout session with items:', lineItems)

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      customer_email: customer_email || undefined,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      metadata: {
        orderTotal: total_amount.toString(),
        itemCount: items.length.toString(),
        customerName: customer_name || 'Not provided',
        customerEmail: customer_email || 'Not provided',
      },
    })

    console.log("Checkout session created:", session.id)

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Block other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
