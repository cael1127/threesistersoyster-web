import { NextRequest, NextResponse } from 'next/server'
import { sendJobApplication } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, address, email, phone, position, startDate, workHistoryFileName, workHistoryBase64 } = body

    // Basic validation
    if (!name || !address || !email || !phone || !position || !startDate) {
      return NextResponse.json(
        { error: 'Missing required fields. Please fill in all required fields.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address format.' },
        { status: 400 }
      )
    }

    // Sanitize and validate input lengths
    if (name.length > 200) {
      return NextResponse.json(
        { error: 'Name must be less than 200 characters.' },
        { status: 400 }
      )
    }

    if (address.length > 500) {
      return NextResponse.json(
        { error: 'Address must be less than 500 characters.' },
        { status: 400 }
      )
    }

    // Send email
    const result = await sendJobApplication({
      name: name.trim(),
      address: address.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      position: position.trim(),
      startDate: startDate.trim(),
      workHistoryFileName: workHistoryFileName || undefined,
      workHistoryBase64: workHistoryBase64 || undefined
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send job application. Please try again or contact us directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Your job application has been submitted successfully. We will review it and get back to you soon.'
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error processing job application:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process job application. Please try again or contact us directly.',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}
