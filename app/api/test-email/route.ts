import { NextRequest, NextResponse } from 'next/server'
import { sendOrderReceipt } from '@/lib/email'

// Test endpoint to verify email configuration
// Call this from admin dashboard or directly to test email sending
export async function POST(request: NextRequest) {
  try {
    // Check environment variables
    const hasApiKey = !!process.env.RESEND_API_KEY
    const hasFromEmail = !!process.env.RESEND_FROM_EMAIL
    
    if (!hasApiKey || !hasFromEmail) {
      return NextResponse.json({
        success: false,
        error: 'Email configuration missing',
        details: {
          RESEND_API_KEY: hasApiKey ? 'SET' : 'MISSING',
          RESEND_FROM_EMAIL: hasFromEmail ? process.env.RESEND_FROM_EMAIL : 'MISSING'
        }
      }, { status: 500 })
    }

    const body = await request.json()
    const testEmail = body.email || process.env.RESEND_FROM_EMAIL

    console.log('Testing email to:', testEmail)

    const result = await sendOrderReceipt({
      customerName: 'Test Customer',
      customerEmail: testEmail,
      orderId: 'test-' + Date.now(),
      items: [{
        name: 'Test Oysters',
        quantity: 1,
        price: 25.00
      }],
      totalAmount: 25.00,
      pickupWeekStart: new Date().toISOString().split('T')[0],
      paymentStatus: 'paid'
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully!',
        messageId: result.id
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

