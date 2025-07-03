import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Here you would integrate with Supabase to store the contact form data
    // For now, we'll just log it and return success
    console.log("Contact form submission:", { name, email, message })

    // TODO: Add Supabase integration
    // const supabase = createClient()
    // await supabase.from('contacts').insert({ name, email, message })

    return NextResponse.json({ success: true, message: "Message sent successfully!" })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 })
  }
}
