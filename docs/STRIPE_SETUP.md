# Stripe Setup Guide for Three Sisters Oyster Co.

This guide will help you connect your Stripe account to your bank account and configure payment processing.

## Prerequisites

- A Stripe account (sign up at https://stripe.com if you don't have one)
- Access to your business bank account information
- Your website environment variables configured

## Step 1: Create or Access Your Stripe Account

1. Go to https://stripe.com and sign in (or create an account)
2. Complete your business profile if you haven't already:
   - Business type, location, tax ID
   - Business address and contact information

## Step 2: Connect Your Bank Account

1. In the Stripe Dashboard, navigate to **Settings** → **Bank accounts and scheduling**
   - Or go directly to: https://dashboard.stripe.com/settings/bank_accounts

2. Click **"Add bank account"** or **"Connect bank account"**

3. Choose your connection method:
   - **Instant verification** (recommended): Enter your online banking credentials
   - **Manual verification**: Enter account and routing numbers, then verify with micro-deposits

4. For instant verification:
   - Select your bank
   - Enter your online banking username and password
   - Complete any additional authentication steps your bank requires

5. For manual verification:
   - Enter your account number and routing number
   - Wait for 2 small test deposits (takes 1-3 business days)
   - Once deposits arrive, verify the amounts in Stripe

6. Set up transfer schedule (optional):
   - Daily: Funds available next business day
   - Weekly: Funds transferred on a specific day
   - Monthly: Funds transferred on a specific date

## Step 3: Configure Webhook Endpoints

Your website needs to receive events from Stripe (like successful payments).

### For Production (Live Mode)

1. **Get your production webhook URL:**
   ```
   https://threesistersoyster.com/api/webhook
   ```
   (This is your live site URL + `/api/webhook`)

2. In Stripe Dashboard, go to **Developers** → **Webhooks**
   - Direct link: https://dashboard.stripe.com/webhooks
   - **Make sure you're in LIVE mode** (toggle in top right)

3. Click **"Add endpoint"**

4. Enter your webhook URL:
   ```
   https://threesistersoyster.com/api/webhook
   ```

5. **Select events to listen to:**
   - Click "Select events" or "Add events"
   - **Required:** `checkout.session.completed` (when payment succeeds)
   - **Optional but recommended:**
     - `payment_intent.succeeded` (backup confirmation)
     - `payment_intent.payment_failed` (handle failures)
     - `charge.refunded` (handle refunds)

6. Click **"Add endpoint"**

7. **IMPORTANT - Copy the Signing Secret:**
   - After creating the endpoint, click on it to view details
   - Look for **"Signing secret"** section
   - Click **"Reveal"** or **"Click to reveal"**
   - Copy the secret (starts with `whsec_`)
   - **This is your `STRIPE_WEBHOOK_SECRET`**

8. **Add to Netlify Environment Variables:**
   - Go to Netlify → Site Settings → Environment Variables
   - Add: `STRIPE_WEBHOOK_SECRET` = `whsec_xxxxx` (the secret you copied)
   - Redeploy your site

### For Testing (Test Mode)

1. **Switch to Test Mode** in Stripe Dashboard (toggle in top right)

2. Repeat steps above but use:
   - Webhook URL: `https://threesistersoyster.com/api/webhook` (same URL works for both)
   - Or use Stripe CLI for local testing (see below)

3. Get a **separate test webhook secret** and add it as `STRIPE_WEBHOOK_SECRET` for testing

### Testing Webhooks Locally (Optional)

If you want to test webhooks locally during development:

1. **Install Stripe CLI:**
   ```bash
   # Windows (using Chocolatey)
   choco install stripe
   
   # Or download from: https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe CLI:**
   ```bash
   stripe login
   ```

3. **Forward webhooks to local server:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   This will give you a test webhook secret starting with `whsec_`

4. **Use the test secret** in your `.env.local` for local development

## Step 4: Get Your API Keys

1. In Stripe Dashboard, go to **Developers** → **API keys**
   - Direct link: https://dashboard.stripe.com/apikeys

2. Copy your keys:
   - **Publishable key** (starts with `pk_`) - for client-side
   - **Secret key** (starts with `sk_`) - for server-side (keep this secret!)

3. Note: Stripe has **Test mode** and **Live mode**
   - Test mode: For testing, uses test cards
   - Live mode: Real payments go to your bank account

## Step 5: Configure Environment Variables

Add these to your `.env.local` file or your hosting platform's environment variables:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_xxxxx  # Use sk_test_xxxxx for testing
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx  # Use pk_test_xxxxx for testing
STRIPE_WEBHOOK_SECRET=whsec_xxxxx  # From webhook endpoint settings

# Site URL (for webhooks)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Important Notes:**
- Use test keys (`sk_test_`, `pk_test_`) when developing/testing
- Switch to live keys (`sk_live_`, `pk_live_`) for production
- Never commit these keys to version control

## Step 6: Test Your Setup

### Test Mode

1. Use test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Use any future expiry date and any 3-digit CVC

2. Test the checkout flow:
   - Add items to cart
   - Complete checkout
   - Verify webhook receives the event
   - Check your Stripe Dashboard → Payments for the test payment

### Live Mode

1. Switch to live keys in your environment variables
2. Process a small test order with your own card
3. Verify the payment appears in Stripe Dashboard
4. Check your bank account for the transfer (may take 2-7 business days initially)

## Step 7: Monitor Your Account

### Dashboard
- View all payments: https://dashboard.stripe.com/payments
- View transfers: https://dashboard.stripe.com/balance/overview
- View disputes/refunds: https://dashboard.stripe.com/disputes

### Settings
- Configure business information: https://dashboard.stripe.com/settings/business
- Set up email receipts: https://dashboard.stripe.com/settings/branding
- Configure tax settings: https://dashboard.stripe.com/settings/tax

## Troubleshooting

### Payments not going through
1. Check your bank account is verified in Stripe
2. Verify your API keys are correct and in the right mode (test vs live)
3. Check webhook logs in Stripe Dashboard → Developers → Webhooks
4. Review application logs for errors

### Webhooks not working
1. Verify your webhook URL is correct and publicly accessible
2. Check the webhook signing secret matches your environment variable
3. View webhook delivery attempts in Stripe Dashboard
4. Test using Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhook`

### Bank transfers delayed
1. Initial transfers may take 7-14 days (standard hold period)
2. After first successful transfer, payments typically arrive in 2 business days
3. Check your transfer schedule in Settings → Bank accounts
4. Verify your bank account status in Stripe Dashboard

## Security Best Practices

1. **Never commit API keys** to version control
2. Use environment variables for all sensitive data
3. Enable two-factor authentication on your Stripe account
4. Regularly review your Stripe Dashboard for suspicious activity
5. Keep your secret keys secret - never share them publicly

## Support

- Stripe Support: https://support.stripe.com
- Stripe Documentation: https://stripe.com/docs
- Contact your developer if you need help with the website integration

## Next Steps

Once Stripe is configured:
1. Test a few orders in test mode
2. When ready, switch to live mode
3. Process your first real order
4. Monitor your Stripe Dashboard regularly
5. Set up email notifications for new payments (optional)

Your Stripe account is now connected and ready to receive payments!

