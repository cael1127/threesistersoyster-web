import { type NextRequest, NextResponse } from "next/server"
import { calculatePickupWeekStart, type OrderItem } from "@/lib/orders"
import { createOrder, getOrderByCheckoutSessionId, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message: "Database not configured",
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const {
      customer_name,
      customer_email,
      customer_phone,
      items,
      total_amount,
      status,
      payment_status,
      order_type,
      pickup_week_start,
      shipping_address,
      session_id,
    } = body

    if (!customer_name || !customer_email) {
      return NextResponse.json(
        { success: false, message: "Missing customer information" },
        { status: 400 }
      )
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Order must include at least one item" },
        { status: 400 }
      )
    }

    const normalizedItems: OrderItem[] = items
      .map((item: any) => {
        const id = typeof item.id === "string" ? item.id.trim() : String(item.id || "")
        const name = typeof item.name === "string" ? item.name.trim() : String(item.name || "")
        const quantity = typeof item.quantity === "number" ? item.quantity : parseInt(String(item.quantity || 0), 10)
        const price = typeof item.price === "number" ? item.price : parseFloat(String(item.price || 0))

        return {
          id,
          name,
          quantity,
          price,
        }
      })
      .filter((item) => item.id && item.name && item.quantity > 0 && item.price >= 0)

    if (normalizedItems.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid items to create order" },
        { status: 400 }
      )
    }

    const parsedTotalAmount =
      typeof total_amount === "number" ? total_amount : parseFloat(String(total_amount ?? 0))

    if (Number.isNaN(parsedTotalAmount)) {
      return NextResponse.json(
        { success: false, message: "Invalid total amount" },
        { status: 400 }
      )
    }

    if (session_id) {
      const existingOrder = await getOrderByCheckoutSessionId(session_id)
      if (existingOrder) {
        return NextResponse.json({ success: true, order: existingOrder, alreadyExists: true })
      }
    }

    const pickupWeek = pickup_week_start || calculatePickupWeekStart(new Date())

    const order = await createOrder({
      customer_name,
      customer_email,
      customer_phone,
      items: normalizedItems,
      total_amount: parsedTotalAmount,
      status: status || "pending",
      payment_status: payment_status || "paid",
      order_type: order_type || "online",
      pickup_week_start: pickupWeek,
      checkout_session_id: session_id,
      shipping_address,
    })

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, message: "Failed to create order" }, { status: 500 })
  }
}
