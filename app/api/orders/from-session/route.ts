import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { calculatePickupWeekStart, type OrderItem } from "@/lib/orders"
import {
  createOrder,
  getOrderByCheckoutSessionId,
  isSupabaseConfigured,
} from "@/lib/supabase"

const stripeKey = process.env.STRIPE_SECRET_KEY
const stripe = stripeKey
  ? new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    })
  : null

export async function POST(request: NextRequest) {
  let sessionId: string | null = null

  try {
    if (!stripe) {
      console.error("Stripe secret key not configured")
      return NextResponse.json(
        { success: false, message: "Payment service unavailable" },
        { status: 503 },
      )
    }

    if (!isSupabaseConfigured()) {
      console.error("Supabase is not configured")
      return NextResponse.json(
        { success: false, message: "Database not configured" },
        { status: 500 },
      )
    }

    let body: any
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 },
      )
    }

    sessionId =
      typeof body?.session_id === "string"
        ? body.session_id
        : typeof body?.sessionId === "string"
          ? body.sessionId
          : null

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "session_id is required" },
        { status: 400 },
      )
    }

    const existingOrder = await getOrderByCheckoutSessionId(sessionId)
    if (existingOrder) {
      return NextResponse.json({ success: true, order: existingOrder, alreadyExists: true })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    })

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Checkout session not found" },
        { status: 404 },
      )
    }

    const metadataItemsRaw =
      typeof session.metadata?.items === "string" ? session.metadata.items : null

    let items: OrderItem[] = []

    if (metadataItemsRaw) {
      try {
        const parsed = JSON.parse(metadataItemsRaw)
        if (Array.isArray(parsed)) {
          items = parsed
            .map((item: any) => ({
              id: typeof item.id === "string" ? item.id : String(item.id || ""),
              name: typeof item.name === "string" ? item.name : String(item.name || "Product"),
              quantity:
                typeof item.quantity === "number"
                  ? item.quantity
                  : parseInt(String(item.quantity || 0), 10),
              price:
                typeof item.price === "number"
                  ? item.price
                  : parseFloat(String(item.price || 0)),
            }))
            .filter((item: OrderItem) => item.id && item.name && item.quantity > 0 && item.price >= 0)
        }
      } catch (error) {
        console.warn("Failed to parse metadata items for session", sessionId, error)
      }
    }

    if (items.length === 0 && session.line_items) {
      const lineItems = session.line_items.data || []
      items = lineItems
        .map((lineItem) => {
          const product = (lineItem.price as any)?.product
          const metadata =
            product && typeof product === "object" ? product.metadata || {} : {}

          const productId =
            typeof metadata.product_id === "string"
              ? metadata.product_id
              : lineItem.id || ""

          const productName =
            (product && typeof product === "object" && product.name) ||
            lineItem.description ||
            metadata.name ||
            "Product"

          return {
            id: productId,
            name: productName,
            quantity: lineItem.quantity || 0,
            price:
              typeof lineItem.amount_total === "number" && lineItem.quantity
                ? lineItem.amount_total / lineItem.quantity / 100
                : 0,
          }
        })
        .filter((item) => item.id && item.quantity > 0)
    }

    if (items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No line items available for checkout session" },
        { status: 400 },
      )
    }

    const customerName =
      session.metadata?.customerName ||
      session.customer_details?.name ||
      session.shipping_details?.name ||
      "Customer"

    const customerEmail =
      session.metadata?.customerEmail ||
      session.customer_details?.email ||
      session.customer_email

    const customerPhone =
      session.customer_details?.phone ||
      session.shipping_details?.phone ||
      undefined

    if (!customerEmail) {
      return NextResponse.json(
        { success: false, message: "Checkout session missing customer email" },
        { status: 400 },
      )
    }

    const totalAmount =
      typeof session.amount_total === "number"
        ? session.amount_total / 100
        : (session.metadata?.orderTotal && parseFloat(session.metadata.orderTotal)) || 0

    const pickupSourceDate =
      typeof session.created === "number" ? new Date(session.created * 1000) : new Date()
    const pickupWeekStart = calculatePickupWeekStart(pickupSourceDate)

    const order = await createOrder({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      items,
      total_amount: totalAmount,
      status: "confirmed",
      payment_status: "paid",
      order_type: "online",
      pickup_week_start: pickupWeekStart,
      checkout_session_id: sessionId,
    })

    return NextResponse.json({ success: true, order })
  } catch (error) {
    const errorPayload: Record<string, unknown> = {}

    if (typeof error === "object" && error !== null) {
      if ("message" in error && typeof (error as any).message === "string") {
        errorPayload.message = (error as any).message
      }
      if ("code" in error) {
        errorPayload.code = (error as any).code
      }
      if ("details" in error) {
        errorPayload.details = (error as any).details
      }
      if ("hint" in error) {
        errorPayload.hint = (error as any).hint
      }
    } else if (error instanceof Error) {
      errorPayload.message = error.message
    }

    console.error("Error creating order from session:", { sessionId, error })

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order from session",
        error: Object.keys(errorPayload).length > 0 ? errorPayload : String(error),
      },
      { status: 500 },
    )
  }
}

