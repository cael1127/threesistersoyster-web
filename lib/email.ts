import { Resend } from 'resend'

// Helper function to get Resend client instance
// Create it dynamically to ensure env vars are available
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }
  
  try {
    return new Resend(apiKey)
  } catch (error) {
    console.error('Failed to initialize Resend client:', error)
    return null
  }
}

export interface OrderReceiptData {
  customerName: string
  customerEmail: string
  customerPhone?: string
  orderId: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  totalAmount: number
  pickupWeekStart: string
  pickupCode?: string
  paymentStatus: 'paid' | 'reserved'
}

export async function sendOrderReceipt(data: OrderReceiptData) {
  // Get Resend client instance
  const resend = getResendClient()
  
  // Check if Resend is configured
  if (!process.env.RESEND_API_KEY || !resend) {
    console.warn('RESEND_API_KEY not configured, skipping email send')
    return { success: false, error: 'Email service not configured. RESEND_API_KEY is missing.' }
  }

  if (!process.env.RESEND_FROM_EMAIL) {
    console.warn('RESEND_FROM_EMAIL not configured, skipping email send')
    return { success: false, error: 'From email not configured. RESEND_FROM_EMAIL is missing.' }
  }

  // Validate email address
  if (!data.customerEmail || !data.customerEmail.includes('@')) {
    console.error('Invalid customer email:', data.customerEmail)
    return { success: false, error: 'Invalid customer email address' }
  }

  try {
    const pickupDate = new Date(data.pickupWeekStart)
    const isThisWeek = pickupDate <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const pickupMessage = isThisWeek 
      ? `Your order will be ready for pickup Friday through Sunday, starting ${pickupDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.`
      : `Your order will be ready for pickup Friday through Sunday, starting ${pickupDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} (next week).`

    const itemsHtml = data.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('')

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">🦪 Three Sisters Oyster Co.</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Order Confirmation</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #667eea; margin-top: 0;">Thank you for your order, ${data.customerName}!</h2>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; font-weight: bold; color: #856404;">🦪 PICKUP ONLY</p>
              <p style="margin: 5px 0 0 0; color: #856404;">
                All oysters are for pickup in person at Three Sisters Oyster Co.
              </p>
            </div>

            <p style="font-size: 16px; margin: 20px 0;">
              ${pickupMessage}
            </p>

            ${data.pickupCode ? `
              <div style="background: #e7f3ff; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; font-weight: bold; color: #1565C0;">Your Pickup Code:</p>
                <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #1565C0; letter-spacing: 2px;">${data.pickupCode}</p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #1565C0;">Please bring this code when picking up your order.</p>
              </div>
            ` : ''}

            <h3 style="color: #667eea; margin-top: 30px;">Order Details</h3>
            <p style="margin: 5px 0;"><strong>Order ID:</strong> #${data.orderId.slice(-8)}</p>
            <p style="margin: 5px 0;"><strong>Payment Status:</strong> ${data.paymentStatus === 'paid' ? '✅ Paid' : '📋 Reserved (Pay in Person - Cash Only)'}</p>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #667eea; color: white;">
                  <th style="padding: 10px; text-align: left;">Item</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                  <th style="padding: 10px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #667eea;">Total:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 18px; border-top: 2px solid #667eea; color: #667eea;">$${data.totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h3 style="color: #667eea; margin-top: 0;">Pickup Information</h3>
              <p style="margin: 5px 0;"><strong>Location:</strong> Three Sisters Oyster Co.</p>
              <p style="margin: 5px 0;"><strong>Pickup Dates:</strong> Friday through Sunday, starting ${pickupDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              ${data.paymentStatus === 'reserved' ? '<p style="margin: 5px 0; font-size: 14px; color: #856404;"><strong>Payment:</strong> Cash only at this time</p>' : ''}
              <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
                Please arrive during our pickup hours. We'll contact you if we need any additional information.
              </p>
            </div>

            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #666; text-align: center;">
              Questions? Contact us at <a href="tel:713-854-7427" style="color: #667eea;">713-854-7427</a>
            </p>
          </div>
        </body>
      </html>
    `

    console.log('Sending email via Resend to:', data.customerEmail)
    console.log('From email:', process.env.RESEND_FROM_EMAIL)
    
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: data.customerEmail,
      subject: `Order Confirmation - Three Sisters Oyster Co. #${data.orderId.slice(-8)}`,
      html
    })

    // Resend v4 returns { data: { id: string } } on success or { error: {...} } on failure
    if ('error' in result && result.error) {
      console.error('Resend API error:', result.error)
      const errorMsg = typeof result.error === 'object' && result.error !== null && 'message' in result.error
        ? String(result.error.message)
        : 'Failed to send email'
      return { success: false, error: errorMsg }
    }

    // Success - extract message ID
    const messageId = result.data?.id || 'unknown'
    console.log('Email sent successfully. Message ID:', messageId)
    return { success: true, id: messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = error instanceof Error && 'response' in error 
      ? JSON.stringify((error as any).response) 
      : ''
    console.error('Error details:', errorDetails)
    return { success: false, error: errorMessage }
  }
}

export interface ReservationNotificationData {
  productName: string
  quantity: number
  sessionId: string
  reservationTime: Date
}

export async function sendReservationNotification(data: ReservationNotificationData) {
  // Get Resend client instance
  const resend = getResendClient()
  
  // Check if Resend is configured
  if (!process.env.RESEND_API_KEY || !resend) {
    console.warn('RESEND_API_KEY not configured, skipping reservation notification email')
    return { success: false, error: 'Email service not configured. RESEND_API_KEY is missing.' }
  }

  if (!process.env.RESEND_FROM_EMAIL) {
    console.warn('RESEND_FROM_EMAIL not configured, skipping reservation notification email')
    return { success: false, error: 'From email not configured. RESEND_FROM_EMAIL is missing.' }
  }

  // Get notification email address (with fallback)
  const notificationEmail = process.env.RESERVATION_NOTIFICATION_EMAIL || 'kathryn@threesistersoyster.com'

  try {
    const reservationTime = new Date(data.reservationTime)
    const formattedTime = reservationTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    })

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">🦪 Three Sisters Oyster Co.</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">New Reservation Notification</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #667eea; margin-top: 0;">New Oyster Reservation</h2>
            
            <div style="background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <p style="margin: 10px 0;"><strong style="color: #667eea;">Product:</strong> ${data.productName}</p>
              <p style="margin: 10px 0;"><strong style="color: #667eea;">Quantity:</strong> ${data.quantity}</p>
              <p style="margin: 10px 0;"><strong style="color: #667eea;">Reservation Time:</strong> ${formattedTime}</p>
              <p style="margin: 10px 0;"><strong style="color: #667eea;">Session ID:</strong> <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${data.sessionId}</code></p>
            </div>

            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #666; text-align: center;">
              This is an automated notification from the Three Sisters Oyster Co. reservation system.
            </p>
          </div>
        </body>
      </html>
    `

    console.log('Sending reservation notification email to:', notificationEmail)
    console.log('Reservation details:', { product: data.productName, quantity: data.quantity })
    
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: notificationEmail,
      subject: `New Oyster Reservation - ${data.productName}`,
      html
    })

    // Resend v4 returns { data: { id: string } } on success or { error: {...} } on failure
    if ('error' in result && result.error) {
      console.error('Resend API error:', result.error)
      const errorMsg = typeof result.error === 'object' && result.error !== null && 'message' in result.error
        ? String(result.error.message)
        : 'Failed to send email'
      return { success: false, error: errorMsg }
    }

    // Success - extract message ID
    const messageId = result.data?.id || 'unknown'
    console.log('Reservation notification email sent successfully. Message ID:', messageId)
    return { success: true, id: messageId }
  } catch (error) {
    console.error('Error sending reservation notification email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

