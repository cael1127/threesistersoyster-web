import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const stripeKey = process.env.STRIPE_SECRET_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    const envStatus = {
      stripeConfigured: !!stripeKey,
      supabaseConfigured: !!(supabaseUrl && supabaseKey),
      stripeKeyLength: stripeKey ? stripeKey.length : 0,
      supabaseUrl: supabaseUrl || 'Not set',
      supabaseKeyLength: supabaseKey ? supabaseKey.length : 0,
      nodeEnv: process.env.NODE_ENV || 'Not set'
    }
    
    return NextResponse.json({
      message: "Checkout debug information",
      timestamp: new Date().toISOString(),
      environment: envStatus,
      recommendations: [
        !stripeKey ? "STRIPE_SECRET_KEY is not configured" : "Stripe is configured",
        !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL is not configured" : "Supabase is configured",
        !supabaseKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured" : "Supabase key is configured"
      ].filter(rec => rec.includes("not configured"))
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Debug endpoint error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    return NextResponse.json({
      message: "Test checkout data received",
      receivedData: body,
      timestamp: new Date().toISOString(),
      validation: {
        hasItems: !!body.items,
        itemsCount: body.items?.length || 0,
        hasTotal: !!body.total_amount,
        totalAmount: body.total_amount,
        itemsValid: Array.isArray(body.items) && body.items.every(item => 
          item.id && item.name && item.quantity && item.price
        )
      }
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Test endpoint error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 