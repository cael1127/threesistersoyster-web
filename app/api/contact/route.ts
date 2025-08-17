import { type NextRequest, NextResponse } from "next/server"
import { contactFormSchema, RateLimiter, sanitizeInput, validateOrigin, validateRequestSize } from "@/lib/security"

// Initialize rate limiter for contact form
const contactRateLimiter = new RateLimiter(60000, 5) // 5 requests per minute

// Simple email sending function using a free email service
async function sendEmail(name: string, email: string, message: string) {
  // Using EmailJS or similar service would be better for production
  // For now, we'll use a simple approach that logs the message
  // and could be integrated with services like SendGrid, Mailgun, etc.
  
  const emailContent = `
New Contact Form Submission from Three Sisters Oyster Co. Website

Name: ${name}
Email: ${email}
Message: ${message}

Timestamp: ${new Date().toISOString()}
  `.trim();

  // Log the email content (in production, this would send an actual email)
  console.log("=== EMAIL TO: caelfindley@gmail.com ===");
  console.log(emailContent);
  console.log("=== END EMAIL ===");

  // For testing purposes, we'll simulate a successful email send
  // In production, you would integrate with an email service here
  return { success: true, messageId: `test-${Date.now()}` };
}

export async function POST(request: NextRequest) {
  try {
    // Security checks
    const origin = request.headers.get('origin')
    if (!validateOrigin(origin)) {
      console.log(`Invalid origin blocked: ${origin}`)
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
    }

    // Check request size
    const contentLength = parseInt(request.headers.get('content-length') || '0')
    if (!validateRequestSize(contentLength)) {
      console.log(`Request too large: ${contentLength} bytes`)
      return NextResponse.json({ error: 'Request too large' }, { status: 413 })
    }

    // Rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    if (!contactRateLimiter.isAllowed(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    // Parse and validate request body
    const body = await request.json()
    
    // Validate input using schema
    const validationResult = contactFormSchema.safeParse(body)
    if (!validationResult.success) {
      console.log(`Validation failed: ${JSON.stringify(validationResult.error.errors)}`)
      return NextResponse.json({ 
        error: 'Invalid input data',
        details: validationResult.error.errors 
      }, { status: 400 })
    }

    const { name, email, message } = validationResult.data

    // Additional sanitization
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedMessage = sanitizeInput(message)

    // Log the sanitized contact form submission
    console.log("Contact form submission:", { 
      name: sanitizedName, 
      email: sanitizedEmail, 
      message: sanitizedMessage,
      ip,
      timestamp: new Date().toISOString()
    })

    // Send email to caelfindley@gmail.com
    try {
      const emailResult = await sendEmail(sanitizedName, sanitizedEmail, sanitizedMessage)
      
      if (!emailResult.success) {
        console.error("Failed to send email:", emailResult)
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    // TODO: Add Supabase integration with proper error handling
    // const supabase = createClient()
    // const { error } = await supabase.from('contacts').insert({ 
    //   name: sanitizedName, 
    //   email: sanitizedEmail, 
    //   message: sanitizedMessage,
    //   ip_address: ip,
    //   created_at: new Date().toISOString()
    // })
    
    // if (error) {
    //   console.error("Database error:", error)
    //   return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
    // }

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: "Message sent successfully!",
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error("Error processing contact form:", error)
    
    // Don't expose internal errors to client
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

// Block other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
