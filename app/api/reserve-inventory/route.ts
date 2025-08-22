import { NextRequest, NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

// In-memory storage for reservations (in production, consider Redis or similar)
const activeReservations = new Map<string, {
  product_name: string
  session_id: string
  quantity: number
  expires_at: Date
}>()

// Clean up expired reservations every time this endpoint is called
function cleanupExpiredReservations() {
  const now = new Date()
  for (const [key, reservation] of activeReservations.entries()) {
    if (reservation.expires_at < now) {
      activeReservations.delete(key)
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, session_id } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    console.log("Reserving inventory for session:", session_id)
    console.log("Items to reserve:", items)

    // Clean up expired reservations first
    cleanupExpiredReservations()

    const supabase = getSupabaseClient()
    const reservationResults = []
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 2 * 60 * 1000) // 2 minutes from now

    for (const item of items) {
      if (item.name && item.quantity > 0) {
        try {
          console.log(`Reserving inventory for "${item.name}": ${item.quantity}`)
          
          // Check current inventory and existing reservations
          const { data: currentData, error: selectError } = await supabase
            .from("products")
            .select("inventory_count")
            .eq("name", item.name)
            .single()

          if (selectError) {
            console.error(`Error checking inventory for ${item.name}:`, selectError)
            reservationResults.push({
              item: item.name,
              success: false,
              error: `Product not found: ${selectError.message}`
            })
            continue
          }

          const currentInventory = currentData.inventory_count || 0
          
          // Calculate how much is already reserved by other sessions
          let reservedQuantity = 0
          for (const reservation of activeReservations.values()) {
            if (reservation.product_name === item.name && reservation.session_id !== session_id) {
              reservedQuantity += reservation.quantity
            }
          }
          
          const availableInventory = currentInventory - reservedQuantity
          
          if (availableInventory < item.quantity) {
            reservationResults.push({
              item: item.name,
              success: false,
              error: `Insufficient available inventory. Available: ${availableInventory}, Requested: ${item.quantity}`
            })
            continue
          }

          // Create reservation in memory
          const reservationKey = `${session_id}_${item.name}`
          activeReservations.set(reservationKey, {
            product_name: item.name,
            session_id: session_id,
            quantity: item.quantity,
            expires_at: expiresAt
          })

          console.log(`Successfully reserved ${item.quantity} of ${item.name}`)
          reservationResults.push({
            item: item.name,
            success: true,
            quantity: item.quantity,
            expiresAt: expiresAt.toISOString(),
            availableAfterReservation: availableInventory - item.quantity
          })

        } catch (error) {
          console.error(`Error processing reservation for ${item.name}:`, error)
          reservationResults.push({
            item: item.name,
            success: false,
            error: 'Internal server error'
          })
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Inventory reservation completed",
      results: reservationResults,
      expiresAt: expiresAt.toISOString(),
      totalActiveReservations: activeReservations.size
    })

  } catch (error) {
    console.error("Error reserving inventory:", error)
    return NextResponse.json(
      { error: "Failed to reserve inventory" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { session_id } = body

    if (!session_id) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    console.log("Releasing reservations for session:", session_id)

    // Remove all reservations for this session
    let releasedCount = 0
    for (const [key, reservation] of activeReservations.entries()) {
      if (reservation.session_id === session_id) {
        activeReservations.delete(key)
        releasedCount++
      }
    }

    console.log(`Released ${releasedCount} reservations for session ${session_id}`)

    return NextResponse.json({ 
      success: true, 
      message: "Reservations released",
      releasedCount: releasedCount,
      totalActiveReservations: activeReservations.size
    })

  } catch (error) {
    console.error("Error releasing reservations:", error)
    return NextResponse.json(
      { error: "Failed to release reservations" },
      { status: 500 }
    )
  }
}

// GET endpoint to view current reservations (for debugging)
export async function GET() {
  cleanupExpiredReservations()
  
  const reservations = Array.from(activeReservations.values()).map(reservation => ({
    product_name: reservation.product_name,
    session_id: reservation.session_id,
    quantity: reservation.quantity,
    expires_at: reservation.expires_at.toISOString(),
    expires_in_seconds: Math.max(0, Math.floor((reservation.expires_at.getTime() - Date.now()) / 1000))
  }))

  return NextResponse.json({ 
    message: "Current active reservations",
    totalReservations: reservations.length,
    reservations: reservations
  })
}
