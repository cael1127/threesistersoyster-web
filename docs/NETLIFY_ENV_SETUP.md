# Netlify Environment Variables Setup

This guide explains how to set up environment variables for the admin system on Netlify.

## Required Environment Variables

The following environment variables must be set in Netlify:

### Admin Authentication
- `ADMIN_PASSWORD` - Your admin login password (server-side only, not public)
- `SESSION_SECRET` - A random secret string for session encryption (optional but recommended)

### Email Service (Resend)
- `RESEND_API_KEY` - Your Resend API key from resend.com
- `RESEND_FROM_EMAIL` - Your verified sender email address

### Stripe (if not already set)
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook signing secret

### Other
- `NEXT_PUBLIC_SITE_URL` - Your site URL (e.g., https://threesistersoyster.com)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## How to Set Environment Variables in Netlify

### Method 1: Via Netlify Dashboard

1. Log in to your Netlify account
2. Go to your site dashboard
3. Navigate to **Site settings** → **Environment variables**
4. Click **Add variable** for each variable
5. Enter:
   - **Key**: The variable name (e.g., `ADMIN_PASSWORD`)
   - **Value**: The variable value
   - **Scopes**: Select where it applies:
     - **All scopes** (recommended for most)
     - **Production** (only for production)
     - **Deploy previews** (for previews)
     - **Branch deploys** (for branch-specific)

6. Click **Save**

### Method 2: Via netlify.toml

You can also set environment variables in your `netlify.toml` file:

```toml
[build.environment]
  ADMIN_PASSWORD = "your-password-here"
  RESEND_API_KEY = "re_xxxxx"
  # etc...
```

**⚠️ Important**: Never commit sensitive values like `ADMIN_PASSWORD` to your git repository! Use the dashboard method for secrets.

### Method 3: Via Netlify CLI

```bash
netlify env:set ADMIN_PASSWORD "your-password-here"
netlify env:set RESEND_API_KEY "re_xxxxx"
# etc...
```

## Verifying Environment Variables

After setting environment variables:

1. **Redeploy your site** - Environment variables are only loaded during build and runtime
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

2. **Check in runtime** - You can verify variables are set by checking the admin login endpoint (don't expose the actual value):
   ```bash
   # This will show an error if ADMIN_PASSWORD is not set
   curl https://your-site.netlify.app/api/admin/auth
   ```

## Troubleshooting

### Environment Variable Not Working

1. **Check variable name** - Must match exactly (case-sensitive)
   - ✅ `ADMIN_PASSWORD`
   - ❌ `admin_password` or `ADMINPASSWORD`

2. **Check scope** - Make sure the scope matches your deployment type
   - Production deploys need Production or All scopes
   - Preview deploys need Deploy previews or All scopes

3. **Redeploy required** - After adding/changing env vars, you must redeploy
   - Variables are loaded at build time for `NEXT_PUBLIC_*` vars
   - Variables are loaded at runtime for server-side vars like `ADMIN_PASSWORD`

4. **Check Netlify Functions** - If using Netlify Functions, they may need their own env vars
   - Most Next.js API routes work with site-level env vars

5. **Check logs** - View deployment logs in Netlify Dashboard → Deploys
   - Look for errors about missing environment variables

### Admin Password Not Working

If admin login isn't working:

1. Verify `ADMIN_PASSWORD` is set in Netlify
2. Check the variable value doesn't have extra spaces or quotes
3. Try logging in with the exact value from Netlify
4. Check browser console for errors
5. Check Netlify Functions logs for API errors

### Testing Locally

For local development, create a `.env.local` file:

```bash
ADMIN_PASSWORD=your-password-here
SESSION_SECRET=your-random-secret
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=orders@yourdomain.com
# etc...
```

**Note**: `.env.local` should be in `.gitignore` and never committed.

## Security Best Practices

1. **Use strong passwords** - Generate a random password for `ADMIN_PASSWORD`
2. **Don't commit secrets** - Never add `.env.local` or secrets to git
3. **Use different passwords** - Use different passwords for development and production
4. **Rotate regularly** - Change `ADMIN_PASSWORD` periodically
5. **Limit access** - Only share admin credentials with trusted team members

## Quick Reference

Minimum required for admin system:
```bash
ADMIN_PASSWORD=your-secure-password
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=orders@yourdomain.com
```

Full setup (including existing Stripe):
```bash
ADMIN_PASSWORD=your-secure-password
SESSION_SECRET=random-secret-string
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=orders@yourdomain.com
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_SITE_URL=https://threesistersoyster.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

