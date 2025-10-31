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

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
   - Direct link: https://dashboard.stripe.com/webhooks

2. Click **"Add endpoint"**

3. Enter your webhook URL:
   ```
   https://your-domain.com/api/webhook
   ```
   Replace `your-domain.com` with your actual domain

4. Select events to listen to:
   - `checkout.session.completed` (required)
   - Optionally: `payment_intent.succeeded`, `payment_intent.payment_failed`

5. Click **"Add endpoint"**

6. **Important**: Copy the **Signing secret** (starts with `whsec_`)
   - You'll need to add this to your environment variables

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

