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
      return NextResponse.json({ error: 'Payment service unavailable' }, { status: 503 })
    }

    // Parse request body
    const body = await request.json()
    
    const { items, total_amount } = body
    
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
          name: item.name || "Premium Texas Oysters",
          description: `Fresh, sustainably harvested oysters from the pristine waters of Texas. Premium quality guaranteed by Three Sisters Oyster Co.`,
          images: item.image_url ? [item.image_url] : [],
          metadata: {
            category: item.category || "oysters",
            origin: "Texas Gulf Coast",
            sustainability: "Sustainable Harvesting",
          },
        },
        unit_amount: Math.round((item.price || 0) * 100), // Stripe expects cents
      },
      quantity: item.quantity || 1,
    }))

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      customer_email: undefined, // Let Stripe collect this
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      // Custom branding
      custom_text: {
        submit: {
          message: "Thank you for choosing Three Sisters Oyster Co. Your fresh Texas oysters will be ready for pickup or delivery within 24-48 hours.",
        },
        shipping_address: {
          message: "We'll contact you to arrange pickup or delivery of your fresh oysters.",
        },
      },
      // Payment method options
      payment_method_options: {
        card: {
          request_three_d_secure: "automatic",
        },
      },
      // Shipping options
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Local Pickup / Delivery",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 3,
              },
            },
          },
        },
      ],
      // Custom fields for better order tracking
      metadata: {
        orderTotal: total_amount.toString(),
        itemCount: items.length.toString(),
        businessName: "Three Sisters Oyster Co.",
        productType: "Fresh Texas Oysters",
        orderSource: "Website",
        items: JSON.stringify(items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity
        }))),
        session_id: body.session_id || 'unknown'
      },
      // Expire session after 30 minutes
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60),
    })

    console.log("Checkout session created:", session.id)

    // Items metadata is now included in the initial session creation

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
