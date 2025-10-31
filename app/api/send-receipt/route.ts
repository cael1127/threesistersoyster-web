import { NextRequest, NextResponse } from 'next/server'
import { sendOrderReceipt, type OrderReceiptData } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
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

    const result = await sendOrderReceipt(receiptData)

    if (result.success) {
      return NextResponse.json({ success: true, messageId: result.id })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in send-receipt endpoint:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send receipt' },
      { status: 500 }
    )
  }
}

