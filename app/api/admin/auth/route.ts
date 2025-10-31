import { NextRequest, NextResponse } from 'next/server'
import { createAdminSession } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    // Read ADMIN_PASSWORD directly from environment in the route handler
    // This ensures Netlify environment variables are properly accessed
    // On Netlify, make sure ADMIN_PASSWORD is set in Site Settings > Environment Variables
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not set')
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('ADMIN') || k.includes('NETLIFY')))
      return NextResponse.json({ 
        error: 'Server configuration error: ADMIN_PASSWORD not configured',
        details: process.env.NODE_ENV === 'development' ? 'Set ADMIN_PASSWORD in .env.local' : 'Set ADMIN_PASSWORD in Netlify environment variables'
      }, { status: 500 })
    }

    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Create session token
    const token = await createAdminSession()

    // Set session cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin_session')
  return response
}

