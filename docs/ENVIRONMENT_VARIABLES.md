# Environment Variables Checklist

This document lists all environment variables required for the admin dashboard and enhanced ordering system.

## Required Environment Variables for Netlify

Add these in **Netlify Dashboard → Site Settings → Environment Variables**:

### Admin Authentication

```bash
ADMIN_PASSWORD=your-secure-admin-password-here
SESSION_SECRET=your-random-secret-string-here
```

**Details:**
- `ADMIN_PASSWORD` - Your admin login password (set a strong password)
- `SESSION_SECRET` - A random string for session encryption (can be any random string, e.g., `openssl rand -hex 32`)

### Email Service (Resend)

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=orders@yourdomain.com
RESERVATION_NOTIFICATION_EMAIL=kathryn@threesistersoyster.com
```

**Details:**
- `RESEND_API_KEY` - Get from https://resend.com/api-keys (starts with `re_`)
- `RESEND_FROM_EMAIL` - Must be a verified email/domain in Resend
  - For testing: Use `onboarding@resend.dev` (pre-verified)
  - For production: Verify your domain first, then use `orders@yourdomain.com` or `noreply@yourdomain.com`
- `RESERVATION_NOTIFICATION_EMAIL` - Email address to receive reservation notifications (defaults to `kathryn@threesistersoyster.com` if not set)

**How to set up Resend:**
1. Sign up at https://resend.com
2. Go to API Keys → Create API Key
3. Copy the key (starts with `re_`)
4. For production: Add your domain in Domains section
5. Add DNS records (SPF, DKIM) that Resend provides
6. Wait for domain verification (can take up to 48 hours)

### Stripe (If not already configured)

```bash
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

**Details:**
- `STRIPE_SECRET_KEY` - From Stripe Dashboard → Developers → API keys
  - Use `sk_test_...` for testing
  - Use `sk_live_...` for production
- `STRIPE_WEBHOOK_SECRET` - From Stripe Dashboard → Developers → Webhooks
  - Copy the signing secret from your webhook endpoint

### Site Configuration

```bash
NEXT_PUBLIC_SITE_URL=https://threesistersoyster.com
```

**Details:**
- `NEXT_PUBLIC_SITE_URL` - Your full site URL (must match your actual domain)
- Used for webhook callbacks and email links

### Supabase (If not already configured)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Details:**
- Get these from your Supabase project settings
- Already configured if your site is working

## Complete Environment Variables List

Copy this complete list and fill in your values:

```bash
# Admin Authentication
ADMIN_PASSWORD=your-secure-password-here
SESSION_SECRET=your-random-secret-here

# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=orders@yourdomain.com
RESERVATION_NOTIFICATION_EMAIL=kathryn@threesistersoyster.com

# Stripe Payment Processing
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://threesistersoyster.com

# Supabase Database (if not already set)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## How to Add in Netlify

1. Go to **Netlify Dashboard**
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add variable** for each variable above
5. Enter the **Key** and **Value**
6. Select **All scopes** (or Production for production-only vars)
7. Click **Save**
8. **Redeploy your site** (Deploys → Trigger deploy → Deploy site)

## Verification Checklist

After setting up, verify:

- [ ] Admin login works at `/admin/login`
- [ ] Can create/edit/delete products in admin dashboard
- [ ] Can update inventory counts
- [ ] Orders appear in admin dashboard
- [ ] Checkout completes successfully
- [ ] Success page loads without 403 error
- [ ] Email receipts are sent (check Resend dashboard)
- [ ] Reservation notification emails are sent (check Resend dashboard)
- [ ] Webhook receives Stripe events (check Stripe Dashboard → Webhooks)

## Troubleshooting

### Admin login not working
- Verify `ADMIN_PASSWORD` is set correctly
- Redeploy after adding environment variables

### Emails not sending
- Check `RESEND_API_KEY` is correct (starts with `re_`)
- Verify `RESEND_FROM_EMAIL` is verified in Resend dashboard
- For reservation notifications: Verify `RESERVATION_NOTIFICATION_EMAIL` is set (defaults to `kathryn@threesistersoyster.com`)
- Check Resend dashboard for delivery status
- Check Netlify Functions logs for email errors

### Stripe checkout not working
- Verify `STRIPE_SECRET_KEY` is set
- Check if using test mode (`sk_test_`) vs live mode (`sk_live_`)
- Verify webhook endpoint is configured in Stripe Dashboard

### 403 errors on success page
- This should be fixed now with middleware updates
- If still happening, check Netlify Functions logs

## Security Notes

- **Never commit** these values to git
- Use different passwords for development and production
- Rotate `ADMIN_PASSWORD` periodically
- Keep `SESSION_SECRET` secret and random
- Only share admin credentials with trusted team members

