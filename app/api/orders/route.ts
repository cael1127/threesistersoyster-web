import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
      return NextResponse.json({ 
        success: false, 
        message: "Database not configured" 
      }, { status: 500 })
    }

    // Dynamically import Supabase functions to avoid build-time issues
    const { createOrder } = await import("../../../lib/supabase")
    
    const orderData = await request.json()

    const order = await createOrder(orderData)

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, message: "Failed to create order" }, { status: 500 })
  }
}
