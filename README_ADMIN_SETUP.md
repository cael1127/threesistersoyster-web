# Admin Dashboard & Ordering System Setup Guide

This guide will help you set up and use the new admin dashboard and enhanced ordering features.

## Quick Start

1. **Run Database Migration**
   - Open your Supabase SQL Editor
   - Run the migration script: `scripts/database-migration-orders.sql`
   - This adds the necessary columns for payment status, order types, pickup codes, and pickup weeks

2. **Configure Environment Variables**
   
   Add these to your `.env.local` file:
   ```bash
   # Admin Authentication
   ADMIN_PASSWORD=your-secure-admin-password-here
   SESSION_SECRET=your-random-session-secret-here
   
   # Resend Email Service
   RESEND_API_KEY=re_xxxxx  # Get from resend.com
   RESEND_FROM_EMAIL=orders@yourdomain.com  # Must be verified in Resend
   
   # Stripe (if not already configured)
   STRIPE_SECRET_KEY=sk_live_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

3. **Install Dependencies**
   
   You'll need to install the Resend package:
   ```bash
   npm install resend
   ```
   
   Note: The package.json has been updated to include `resend`, but you'll need to run the install command.

4. **Set Up Resend Email**
   - Sign up at https://resend.com
   - Verify your sender email address (or domain)
   - Get your API key from the dashboard
   - Add to environment variables

5. **Access Admin Dashboard**
   - Navigate to `/admin/login`
   - Enter your admin password (from `ADMIN_PASSWORD` env var)
   - You'll have access to:
     - Products management
     - Inventory management
     - Orders management with weekly filtering

## Features Overview

### Admin Dashboard (`/admin`)

#### Products Management
- Add new products
- Edit existing products (name, price, inventory, category, etc.)
- Delete products
- Manage inventory counts per product

#### Inventory Management
- View farm and nursery inventory totals
- Update inventory counts for individual items
- See real-time totals

#### Orders Management
- View all customer orders
- Filter orders by pickup week (Thursday to Thursday)
- Export weekly order lists as CSV
- Mark orders as fulfilled
- View order details including pickup codes

### Purchase Options

#### Online Purchase (Existing Stripe Flow)
- Customers add items to cart
- Complete checkout via Stripe
- Automatic inventory deduction
- Email receipt sent immediately
- Order ready for pickup on Friday

#### Reserve for Pickup (New)
- Customers can reserve items without paying online
- Generate unique pickup code
- Items are reserved in inventory
- Customer pays when picking up
- Email confirmation with pickup code
- Only available for oyster products

### Weekly Order Sorting

Orders are automatically sorted by pickup week:
- **Orders placed before Thursday 11:59 PM** → Pickup this Friday
- **Orders placed after Thursday 11:59 PM** → Pickup next Friday

This ensures all orders are organized correctly for Friday pickup days.

### Email Receipts

All orders (both online and reservations) receive an email receipt with:
- Order details and items
- Total amount
- Pickup date and location
- Pickup code (for reservations)
- Prominent pickup-only notice

## Database Structure

The system works with your existing database structure. The migration script adds these columns to the `orders` table:

- `payment_status` - 'paid', 'reserved', 'refunded', or 'pending'
- `order_type` - 'online' or 'reservation'
- `pickup_code` - Unique code for reservations
- `pickup_week_start` - Date of Friday pickup

## Pickup Notices

Pickup-only notices appear on:
- Product pages (for oyster products)
- Checkout page
- Success/confirmation page
- Email receipts

Message: "🦪 **PICKUP ONLY**: All oysters are for pickup in person at Three Sisters Oyster Co. Orders placed by Thursday 11:59 PM are ready for Friday pickup. Orders after Thursday are for the following week."

## Testing

### Test Admin Login
1. Set `ADMIN_PASSWORD` in your environment
2. Go to `/admin/login`
3. Enter the password
4. You should be redirected to `/admin`

### Test Online Purchase
1. Add items to cart
2. Go to checkout
3. Complete Stripe checkout (use test card: 4242 4242 4242 4242)
4. Check email for receipt
5. Verify order appears in admin dashboard

### Test Reservation
1. Go to products page
2. Click "Reserve for Pickup" on an oyster product
3. Fill in customer information
4. Submit reservation
5. Check for pickup code on success page
6. Check email for receipt with pickup code
7. Verify order appears in admin dashboard with "reserved" status

## Troubleshooting

### Admin login not working
- Verify `ADMIN_PASSWORD` is set correctly
- Check browser console for errors
- Ensure cookies are enabled

### Emails not sending
- Verify `RESEND_API_KEY` is set
- Verify `RESEND_FROM_EMAIL` is verified in Resend dashboard
- Check Resend dashboard for delivery status
- Check server logs for email errors

### Orders not appearing in admin
- Verify database migration was run successfully
- Check that orders are being created in webhook
- Verify admin authentication is working

### Pickup week calculation wrong
- Verify the cutoff is Thursday 11:59 PM
- Check timezone settings
- Review order `created_at` timestamps

## Security Notes

- Admin password is stored in environment variable (never commit to git)
- Sessions use encrypted cookies
- All admin routes are protected with authentication
- API endpoints verify admin status before allowing changes

## Next Steps

1. Configure Stripe webhooks (see `docs/STRIPE_SETUP.md`)
2. Test the full ordering flow
3. Train staff on using the admin dashboard
4. Set up regular order review schedule
5. Monitor email delivery and adjust as needed

For Stripe setup instructions, see `docs/STRIPE_SETUP.md`.

