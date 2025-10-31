# Stripe Webhook Setup Guide

This guide shows you exactly how to set up Stripe webhooks for your site.

## Quick Setup Steps

### 1. Get Your Webhook URL

Your webhook URL is:
```
https://threesistersoyster.com/api/webhook
```

This is already set up in your code at `app/api/webhook/route.ts`.

### 2. Create Webhook Endpoint in Stripe

1. **Go to Stripe Dashboard**
   - https://dashboard.stripe.com/webhooks
   - **Important:** Make sure you're in **LIVE mode** (not Test mode) for production

2. **Click "Add endpoint"**

3. **Enter your webhook URL:**
   ```
   https://threesistersoyster.com/api/webhook
   ```

4. **Select Events to Listen To:**
   Click "Select events" and choose:
   - ✅ **`checkout.session.completed`** (REQUIRED - this is when payment succeeds)
   - ✅ `payment_intent.succeeded` (recommended - backup confirmation)
   - ✅ `payment_intent.payment_failed` (optional - handle failures)

5. **Click "Add endpoint"**

### 3. Get Your Webhook Signing Secret

1. **After creating the endpoint**, click on it in the webhooks list

2. **Find "Signing secret"** section

3. **Click "Reveal"** or **"Click to reveal"** to show the secret

4. **Copy the secret** - it will look like:
   ```
   whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

5. **This is your `STRIPE_WEBHOOK_SECRET`**

### 4. Add to Netlify Environment Variables

1. Go to **Netlify Dashboard** → Your Site → **Site settings** → **Environment variables**

2. Click **"Add variable"**

3. Enter:
   - **Key:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_xxxxxxxxxxxxx` (the secret you copied)
   - **Scopes:** Production (or All scopes)

4. Click **"Save"**

5. **Redeploy your site** (Deploys → Trigger deploy → Deploy site)

### 5. Test Your Webhook

1. **Make a test purchase** on your site

2. **Check Stripe Dashboard** → Webhooks → Your endpoint → "Recent events"
   - You should see `checkout.session.completed` events
   - Green checkmark = successful delivery
   - Red X = failed delivery (check logs)

3. **Check Netlify Functions logs** for webhook processing:
   - Netlify Dashboard → Functions → View logs
   - Look for webhook processing messages

## Troubleshooting

### Webhook Not Receiving Events

1. **Check webhook URL is correct:**
   - Must be: `https://threesistersoyster.com/api/webhook`
   - No trailing slash
   - Must use HTTPS

2. **Check signing secret matches:**
   - Verify `STRIPE_WEBHOOK_SECRET` in Netlify matches the secret in Stripe Dashboard
   - Redeploy after changing environment variables

3. **Check webhook is enabled:**
   - In Stripe Dashboard → Webhooks → Your endpoint
   - Make sure status is "Enabled"

4. **Check Stripe Dashboard for errors:**
   - Go to Webhooks → Your endpoint → Recent events
   - Click on failed events to see error details
   - Common errors:
     - 403 Forbidden = Signing secret mismatch
     - 500 Error = Code error (check Netlify logs)
     - Timeout = Netlify function timeout

### Webhook Secret Not Working

1. **Verify the secret format:**
   - Must start with `whsec_`
   - Should be about 64 characters long

2. **Check for extra spaces:**
   - When copying, make sure no extra spaces before/after

3. **Verify environment variable name:**
   - Must be exactly: `STRIPE_WEBHOOK_SECRET`
   - Case-sensitive

4. **Redeploy after adding/changing:**
   - Environment variables are loaded at deploy time
   - Always redeploy after changing env vars

### Testing Webhooks Locally

If you want to test webhooks on your local machine:

1. **Install Stripe CLI:**
   ```bash
   # Download from: https://stripe.com/docs/stripe-cli
   ```

2. **Login:**
   ```bash
   stripe login
   ```

3. **Forward webhooks:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

4. **Copy the webhook secret** it gives you (starts with `whsec_`)

5. **Add to `.env.local`:**
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx  # The test secret from Stripe CLI
   ```

6. **Test with:**
   ```bash
   stripe trigger checkout.session.completed
   ```

## Webhook Security

Your webhook endpoint (`app/api/webhook/route.ts`) verifies:
- ✅ Stripe signature using the signing secret
- ✅ Prevents duplicate processing
- ✅ Validates event structure

**Never share your webhook signing secret publicly!**

## Important Notes

- **Different secrets for Test vs Live:**
  - Test mode webhook = different secret
  - Live mode webhook = different secret
  - Use the correct one based on your `STRIPE_SECRET_KEY` mode

- **Webhook URL must be publicly accessible:**
  - Stripe can't reach `localhost` or private networks
  - Must be deployed to a public URL (like Netlify)

- **Multiple endpoints:**
  - You can have separate endpoints for test and live
  - Each has its own signing secret
  - Your code handles both modes automatically

## Verification Checklist

After setup, verify:

- [ ] Webhook endpoint created in Stripe Dashboard
- [ ] Webhook URL is correct: `https://threesistersoyster.com/api/webhook`
- [ ] Events selected: `checkout.session.completed`
- [ ] Signing secret copied from Stripe Dashboard
- [ ] `STRIPE_WEBHOOK_SECRET` added to Netlify environment variables
- [ ] Site redeployed after adding environment variable
- [ ] Test purchase completes successfully
- [ ] Webhook events appear in Stripe Dashboard
- [ ] Emails are sent after successful payment
- [ ] Orders appear in admin dashboard

## Need Help?

- Stripe Webhook Docs: https://stripe.com/docs/webhooks
- Stripe Webhook Testing: https://stripe.com/docs/webhooks/test
- Check Netlify Functions logs for detailed error messages

