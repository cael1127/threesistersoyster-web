import { type NextRequest, NextResponse } from "next/server"
import { createOrder } from "../../lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const order = await createOrder(orderData)

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, message: "Failed to create order" }, { status: 500 })
  }
}
