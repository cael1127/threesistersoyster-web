import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Only create Stripe instance if we have the secret key
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-06-30.basil",
    })
  : null

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 })
  }

  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json(session)
  } catch (error) {
    console.error("Error retrieving session:", error)
    return NextResponse.json({ error: "Failed to retrieve session" }, { status: 500 })
  }
}
