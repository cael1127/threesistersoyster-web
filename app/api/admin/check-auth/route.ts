import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const isAuthorized = await verifyAdminSession(request)
    
    if (!isAuthorized) {
      return NextResponse.json({ authorized: false }, { status: 401 })
    }

    return NextResponse.json({ authorized: true })
  } catch (error) {
    return NextResponse.json({ authorized: false }, { status: 500 })
  }
}

