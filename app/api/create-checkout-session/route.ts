import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { orderSchema, RateLimiter, validateOrigin, validateRequestSize, sanitizeInput } from "@/lib/security"

// Initialize rate limiter for checkout
const checkoutRateLimiter = new RateLimiter(60000, 10) // 10 requests per minute

// Only create Stripe instance if we have the secret key
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    })
  : null

export async function POST(request: NextRequest) {
  try {
    // Security checks
    const origin = request.headers.get('origin')
    if (!validateOrigin(origin)) {
      console.log(`Invalid origin blocked: ${origin}`)
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
    }

    // Check request size
    const contentLength = parseInt(request.headers.get('content-length') || '0')
    if (!validateRequestSize(contentLength)) {
      console.log(`Request too large: ${contentLength} bytes`)
      return NextResponse.json({ error: 'Request too large' }, { status: 413 })
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkoutRateLimiter.isAllowed(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    if (!stripe) {
      console.error("Stripe not configured")
      return NextResponse.json({ error: 'Payment service unavailable' }, { status: 503 })
    }

    // Parse request body
    const body = await request.json()
    const { items, total_amount, customer_name, customer_email } = body
    
    // Basic validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    }

    if (!total_amount || total_amount <= 0) {
      return NextResponse.json({ error: 'Invalid total amount' }, { status: 400 })
    }

    // Validate total matches calculated total
    const calculatedTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    if (Math.abs(calculatedTotal - total_amount) > 0.01) { // Allow for small floating point differences
      console.log(`Total mismatch: calculated ${calculatedTotal}, received ${total_amount}`)
      return NextResponse.json({ error: 'Total amount mismatch' }, { status: 400 })
    }

    // Sanitize item data
    const sanitizedItems = items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: sanitizeInput(item.name),
          description: `Premium Texas Oysters from Three Sisters Oyster Co.`,
          images: [], // Remove external image URLs for security
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    }))

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: sanitizedItems,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      customer_email: customer_email || undefined, // Optional customer email
      shipping_address_collection: {
        allowed_countries: ["US"], // Restrict to US only
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Contact for shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
      ],
      metadata: {
        orderTotal: total_amount.toString(),
        itemCount: items.length.toString(),
        customerName: customer_name || 'Not provided',
        customerEmail: customer_email || 'Not provided',
        customerIP: ip,
        timestamp: new Date().toISOString(),
      },
    })

    // Log successful session creation
    console.log("Checkout session created:", {
      sessionId: session.id,
      amount: total_amount,
      itemCount: items.length,
      customerName: customer_name,
      customerEmail: customer_email,
      ip,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error("Error creating checkout session:", error)
    
    // Return more specific error for debugging
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
