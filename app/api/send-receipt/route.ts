import { NextRequest, NextResponse } from 'next/server'
import { sendOrderReceipt, type OrderReceiptData } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    console.log('=== Send Receipt API Called ===')
    const body = await request.json()
    console.log('Request body received:', {
      customerEmail: body.customerEmail,
      customerName: body.customerName,
      orderId: body.orderId,
      itemCount: body.items?.length || 0
    })
    
    // Check environment variables
    console.log('Environment check:')
    console.log('- RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'SET' : 'MISSING')
    console.log('- RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || 'MISSING')
    
    const receiptData: OrderReceiptData = {
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      orderId: body.orderId,
      items: body.items,
      totalAmount: body.totalAmount,
      pickupWeekStart: body.pickupWeekStart,
      pickupCode: body.pickupCode,
      paymentStatus: body.paymentStatus || 'paid'
    }

    console.log('Calling sendOrderReceipt with data:', {
      customerEmail: receiptData.customerEmail,
      orderId: receiptData.orderId,
      paymentStatus: receiptData.paymentStatus
    })

    const result = await sendOrderReceipt(receiptData)
    console.log('sendOrderReceipt result:', result)

    if (result.success) {
      console.log('✅ Email sent successfully!')
      return NextResponse.json({ success: true, messageId: result.id })
    } else {
      console.error('❌ Email sending failed:', result.error)
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error('❌ Error in send-receipt endpoint:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    console.error('Error details:', { errorMessage, errorStack })
    return NextResponse.json(
      { success: false, error: `Failed to send receipt: ${errorMessage}` },
      { status: 500 }
    )
  }
}

