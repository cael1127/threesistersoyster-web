import { z } from 'zod'

// Security configuration
export const SECURITY_CONFIG = {
  MAX_REQUEST_SIZE: 1024 * 1024, // 1MB
  MAX_STRING_LENGTH: 1000,
  ALLOWED_EMAIL_DOMAINS: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'],
  BLOCKED_IPS: [], // Add IPs to block
  ALLOWED_ORIGINS: ['https://threesistersoyster.com', 'https://www.threesistersoyster.com'],
}

// Input validation schemas
export const contactFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email address')
    .max(254, 'Email too long')
    .refine((email) => {
      const domain = email.split('@')[1]
      return SECURITY_CONFIG.ALLOWED_EMAIL_DOMAINS.includes(domain) || 
             domain.endsWith('.edu') || 
             domain.endsWith('.gov')
    }, 'Email domain not allowed'),
  message: z.string()
    .min(1, 'Message is required')
    .max(SECURITY_CONFIG.MAX_STRING_LENGTH, 'Message too long')
    .refine((msg) => !containsMaliciousContent(msg), 'Message contains suspicious content'),
})

export const orderSchema = z.object({
  customer_name: z.string()
    .min(1, 'Customer name is required')
    .max(100, 'Customer name too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Customer name contains invalid characters'),
  customer_email: z.string()
    .email('Invalid email address')
    .max(254, 'Email too long'),
  items: z.array(z.object({
    id: z.string().uuid('Invalid product ID'),
    name: z.string().max(200, 'Product name too long'),
    quantity: z.number().int().positive('Quantity must be positive'),
    price: z.number().positive('Price must be positive'),
  })).min(1, 'At least one item required'),
  total_amount: z.number().positive('Total amount must be positive'),
})

// Security validation functions
export function containsMaliciousContent(input: string): boolean {
  const maliciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
    /<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi,
    /<meta\b[^<]*(?:(?!<\/meta>)<[^<]*)*<\/meta>/gi,
    /<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi,
    /eval\s*\(/gi,
    /setTimeout\s*\(/gi,
    /setInterval\s*\(/gi,
    /Function\s*\(/gi,
    /document\./gi,
    /window\./gi,
    /localStorage\./gi,
    /sessionStorage\./gi,
    /cookie/gi,
    /sql\s+injection/gi,
    /union\s+select/gi,
    /drop\s+table/gi,
    /insert\s+into/gi,
    /update\s+set/gi,
    /delete\s+from/gi,
  ]
  
  return maliciousPatterns.some(pattern => pattern.test(input))
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
}

export function validateOrigin(origin: string | null): boolean {
  if (!origin) return false
  return SECURITY_CONFIG.ALLOWED_ORIGINS.includes(origin)
}

export function validateIP(ip: string): boolean {
  if (SECURITY_CONFIG.BLOCKED_IPS.includes(ip)) return false
  
  // Basic IP validation
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipRegex.test(ip)
}

export function validateRequestSize(contentLength: number): boolean {
  return contentLength <= SECURITY_CONFIG.MAX_REQUEST_SIZE
}

// Rate limiting utilities
export class RateLimiter {
  private store = new Map<string, { count: number; resetTime: number }>()
  private windowMs: number
  private maxRequests: number

  constructor(windowMs: number = 60000, maxRequests: number = 100) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  isAllowed(key: string): boolean {
    const now = Date.now()
    const record = this.store.get(key)

    if (!record || now > record.resetTime) {
      this.store.set(key, { count: 1, resetTime: now + this.windowMs })
      return true
    }

    if (record.count >= this.maxRequests) {
      return false
    }

    record.count++
    return true
  }

  getRemaining(key: string): number {
    const record = this.store.get(key)
    if (!record) return this.maxRequests
    return Math.max(0, this.maxRequests - record.count)
  }

  reset(key: string): void {
    this.store.delete(key)
  }
}

// CSRF protection
export function generateCSRFToken(): string {
  return crypto.randomUUID()
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken && token.length > 0
}

// Security headers helper
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://*.supabase.co",
      "frame-src 'self' https://js.stripe.com https://checkout.stripe.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; '),
  }
} 