import { NextRequest, NextResponse } from 'next/server'
import { sendOrderReceipt } from '@/lib/email'
import { calculatePickupWeekStart } from '@/lib/orders'

// Test endpoint to verify email configuration
// Call this from admin dashboard or directly to test email sending
export async function POST(request: NextRequest) {
  try {
    // Check environment variables
    const hasApiKey = !!process.env.RESEND_API_KEY
    const hasFromEmail = !!process.env.RESEND_FROM_EMAIL
    
    const configStatus = {
      RESEND_API_KEY: hasApiKey ? 'SET' : 'MISSING',
      RESEND_FROM_EMAIL: hasFromEmail ? process.env.RESEND_FROM_EMAIL : 'MISSING'
    }
    
    if (!hasApiKey || !hasFromEmail) {
      return NextResponse.json({
        success: false,
        error: 'Email configuration missing',
        config: configStatus
      }, { status: 500 })
    }

    const body = await request.json().catch(() => ({}))
    // Default to caelfindley1@gmail.com for testing
    const testEmail = body.email || 'caelfindley1@gmail.com'

    console.log('Testing email to:', testEmail)

    // Calculate realistic pickup week start
    const pickupWeekStart = calculatePickupWeekStart(new Date())

    // Use realistic test order data with multiple items
    const testOrderData = {
      customerName: 'Test Customer',
      customerEmail: testEmail,
      orderId: 'test-' + Date.now(),
      items: [
        {
          name: 'Farm Oysters - 50 count',
          quantity: 2,
          price: 45.00
        },
        {
          name: 'Nursery Oysters - 25 count',
          quantity: 1,
          price: 30.00
        }
      ],
      totalAmount: 120.00,
      pickupWeekStart: pickupWeekStart,
      pickupCode: 'TEST1234',
      paymentStatus: 'paid' as const
    }

    const result = await sendOrderReceipt(testOrderData)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully!',
        messageId: result.id,
        config: configStatus,
        sentTo: testEmail
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
        config: configStatus
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      config: {
        RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET' : 'MISSING',
        RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'MISSING'
      }
    }, { status: 500 })
  }
}

// GET endpoint to check email configuration without sending
export async function GET() {
  const hasApiKey = !!process.env.RESEND_API_KEY
  const hasFromEmail = !!process.env.RESEND_FROM_EMAIL
  
  return NextResponse.json({
    configured: hasApiKey && hasFromEmail,
    config: {
      RESEND_API_KEY: hasApiKey ? 'SET' : 'MISSING',
      RESEND_FROM_EMAIL: hasFromEmail ? process.env.RESEND_FROM_EMAIL : 'MISSING'
    }
  })
}

