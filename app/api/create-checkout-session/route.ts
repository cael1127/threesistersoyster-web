import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe
// Check for Stripe key at module load time
const stripeKey = process.env.STRIPE_SECRET_KEY
const stripe = stripeKey 
  ? new Stripe(stripeKey, {
      apiVersion: "2024-11-20.acacia", // Use latest API version
    })
  : null

// Log Stripe initialization status (only key prefix for security)
if (stripeKey) {
  console.log('Stripe initialized with key:', stripeKey.substring(0, 7) + '...')
} else {
  console.error('Stripe NOT initialized - STRIPE_SECRET_KEY environment variable not set')
}

export async function POST(request: NextRequest) {
  try {
    console.log('Checkout session request received')
    
    if (!stripe) {
      console.error('Stripe not initialized - STRIPE_SECRET_KEY missing')
      return NextResponse.json({ error: 'Payment service unavailable. Please contact support.' }, { status: 503 })
    }

    // Parse request body
    let body
    try {
      body = await request.json()
      console.log('Request body received:', JSON.stringify(body, null, 2))
    } catch (parseError) {
      console.error('Error parsing request body:', parseError)
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 })
    }
    
    const { items, total_amount } = body
    
    // Basic validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('No items in order')
      return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    }

    console.log('Items received:', items.length, 'items')
    
    if (!total_amount || isNaN(total_amount) || total_amount <= 0) {
      console.error('Invalid total amount:', total_amount, typeof total_amount)
      return NextResponse.json({ error: 'Invalid total amount' }, { status: 400 })
    }

    console.log('Total amount:', total_amount)

    // Validate and clean items - ensure all required fields are present and correctly typed
    const validItems = items.map((item: any) => {
      // Ensure price is a number (not string from localStorage)
      const price = typeof item.price === 'number' ? item.price : parseFloat(String(item.price || 0))
      const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(String(item.quantity || 1))
      
      return {
        id: String(item.id || ''),
        name: String(item.name || 'Unknown Product'),
        price: price,
        quantity: quantity,
        image_url: item.image_url || null,
        category: String(item.category || 'oysters')
      }
    }).filter(item => {
      // Filter out invalid items
      if (!item.id || item.id === '') {
        console.error('Invalid item missing id:', item)
        return false
      }
      if (!item.name || item.name === 'Unknown Product') {
        console.error('Invalid item missing name:', item)
        return false
      }
      if (isNaN(item.price) || item.price <= 0) {
        console.error('Invalid price for item:', item.name, item.price, typeof item.price)
        return false
      }
      if (isNaN(item.quantity) || item.quantity <= 0) {
        console.error('Invalid quantity for item:', item.name, item.quantity, typeof item.quantity)
        return false
      }
      return true
    })

    if (validItems.length === 0) {
      console.error('No valid items after filtering')
      return NextResponse.json({ error: 'No valid items in order. Please check that all items have valid prices and quantities.' }, { status: 400 })
    }

    // Create Stripe line items with validated data
    // Items are already validated and have correct types
    const lineItems = validItems.map(item => {
      // Price and quantity are already validated as numbers
      const unitAmount = Math.round(item.price * 100) // Stripe expects cents
      
      if (unitAmount <= 0) {
        throw new Error(`Invalid price for ${item.name}: ${item.price}`)
      }

      if (item.quantity <= 0) {
        throw new Error(`Invalid quantity for ${item.name}: ${item.quantity}`)
      }

      console.log(`Creating line item: ${item.name}, price: $${item.price}, quantity: ${item.quantity}, unit_amount: ${unitAmount} cents`)

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: `Fresh, sustainably harvested oysters from the pristine waters of Texas. Premium quality guaranteed by Three Sisters Oyster Co.`,
            images: item.image_url && typeof item.image_url === 'string' && item.image_url.trim() ? [item.image_url.trim()] : [],
            metadata: {
              product_id: item.id,
              category: item.category || "oysters",
              origin: "Texas Gulf Coast",
              sustainability: "Sustainable Harvesting",
            },
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      }
    })

    console.log('Line items created:', lineItems.length)

    console.log('Creating Stripe checkout session with', lineItems.length, 'line items')
    
    // Create Stripe checkout session
    let session
    try {
      session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://threesistersoyster.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://threesistersoyster.com'}/cart`,
      customer_email: undefined, // Let Stripe collect this
      // For pickup-only, we don't need shipping address collection
      // Remove shipping collection since these are pickup-only orders
      billing_address_collection: "required",
      // Custom branding
      custom_text: {
        submit: {
          message: "Thank you for choosing Three Sisters Oyster Co. Your fresh Texas oysters will be ready for pickup on Friday at Three Sisters Oyster Co.",
        },
      },
      // Payment method options
      payment_method_options: {
        card: {
          request_three_d_secure: "automatic",
        },
      },
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
          quantity: item.quantity, // Already a number
          price: item.price // Already a number
        }))),
        session_id: body.session_id || 'unknown'
      },
      // Expire session after 30 minutes
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60),
      })
      
      console.log("Checkout session created successfully:", session.id)
      console.log("Session URL:", session.url)
    } catch (stripeError: any) {
      console.error("Stripe API error:", stripeError)
      console.error("Stripe error type:", stripeError?.type)
      console.error("Stripe error message:", stripeError?.message)
      console.error("Stripe error code:", stripeError?.code)
      throw new Error(`Stripe error: ${stripeError?.message || 'Unknown Stripe error'}`)
    }

    if (!session || !session.url) {
      console.error('Session created but no URL returned:', session)
      throw new Error('Failed to get checkout URL from Stripe')
    }

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error("=== CHECKOUT SESSION ERROR ===")
    console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error)
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace')
    
    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes('Stripe')) {
        console.error('This is a Stripe API error')
      }
      if (error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
        console.error('This appears to be a network error')
      }
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      details: errorMessage,
      hint: errorMessage.includes('Stripe') 
        ? 'Stripe configuration issue. Check STRIPE_SECRET_KEY and Stripe account status.'
        : 'Check that all cart items have valid prices and quantities. Check server logs for details.'
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
