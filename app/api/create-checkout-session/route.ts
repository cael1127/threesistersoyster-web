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
      console.error('No items in order')
      return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    }

    if (!total_amount || isNaN(total_amount) || total_amount <= 0) {
      console.error('Invalid total amount:', total_amount)
      return NextResponse.json({ error: 'Invalid total amount' }, { status: 400 })
    }

    // Validate and clean items
    const validItems = items.filter(item => {
      if (!item.id || !item.name) {
        console.error('Invalid item missing id or name:', item)
        return false
      }
      const price = parseFloat(item.price)
      const quantity = parseInt(item.quantity) || 1
      if (isNaN(price) || price <= 0) {
        console.error('Invalid price for item:', item.name, item.price)
        return false
      }
      if (quantity <= 0) {
        console.error('Invalid quantity for item:', item.name, item.quantity)
        return false
      }
      return true
    })

    if (validItems.length === 0) {
      console.error('No valid items after filtering')
      return NextResponse.json({ error: 'No valid items in order. Please check that all items have valid prices and quantities.' }, { status: 400 })
    }

    // Create Stripe line items with validated data
    const lineItems = validItems.map(item => {
      const price = parseFloat(item.price)
      const quantity = parseInt(item.quantity) || 1
      const unitAmount = Math.round(price * 100) // Stripe expects cents
      
      if (unitAmount <= 0) {
        throw new Error(`Invalid price for ${item.name}: ${price}`)
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name || "Premium Texas Oysters",
            description: `Fresh, sustainably harvested oysters from the pristine waters of Texas. Premium quality guaranteed by Three Sisters Oyster Co.`,
            images: item.image_url && item.image_url.trim() ? [item.image_url.trim()] : [],
            metadata: {
              product_id: item.id,
              category: item.category || "oysters",
              origin: "Texas Gulf Coast",
              sustainability: "Sustainable Harvesting",
            },
          },
          unit_amount: unitAmount,
        },
        quantity: quantity,
      }
    })

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
        orderTotal: parseFloat(total_amount).toFixed(2),
        itemCount: validItems.length.toString(),
        businessName: "Three Sisters Oyster Co.",
        productType: "Fresh Texas Oysters",
        orderSource: "Website",
        customerName: body.customer_name || '',
        customerEmail: body.customer_email || '',
        items: JSON.stringify(validItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: parseInt(item.quantity) || 1,
          price: parseFloat(item.price)
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    console.error("Full error:", errorStack || errorMessage)
    
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      details: errorMessage,
      hint: 'Check that all cart items have valid prices and quantities'
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
