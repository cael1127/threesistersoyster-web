import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-this-secret-in-production'

// Note: ADMIN_PASSWORD is now read directly in API routes to ensure Netlify env vars work

// Simple token generation (in production, use a proper JWT library)
function generateToken(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2)
  return Buffer.from(`${timestamp}-${random}`).toString('base64')
}

function verifyToken(token: string): boolean {
  try {
    // Simple verification - in production, use proper JWT verification
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [timestamp] = decoded.split('-')
    const age = Date.now() - parseInt(timestamp, 10)
    // Token expires after 24 hours
    return age < 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

export async function createAdminSession(): Promise<string> {
  const token = generateToken()
  return token
}

export async function verifyAdminSession(request: Request): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
  
  if (!sessionToken) {
    return false
  }
  
  return verifyToken(sessionToken)
}

export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return sessionToken || null
}

export async function setSessionCookie(token: string) {
  // This will be handled in the route handler
  return token
}

export async function clearSessionCookie() {
  // This will be handled in the route handler
}

// Note: verifyPassword is deprecated - password verification now happens in API routes
// to ensure Netlify environment variables are properly accessed
export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  return password === adminPassword
}

