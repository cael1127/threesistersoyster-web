# Harvested Count System Setup

This document explains how to set up and use the new harvested count system that tracks total harvested oysters on the homepage.

## Overview

The system now displays a single "Total Harvested" counter on the homepage instead of the previous breakdown counters. When customers place orders, the harvested count automatically increments based on the quantity ordered.

## Database Setup

1. **Create the harvested_counts table** in your Supabase database by running the SQL script:
   ```sql
   -- Run the contents of scripts/create-harvested-counts-table.sql
   ```

2. **Table Structure**:
   - `id`: Unique identifier (UUID)
   - `total_harvested`: Integer count of total harvested oysters
   - `last_updated`: Timestamp of last update

## How It Works

### 1. Homepage Display
- The homepage now shows a single "Total Harvested" counter
- Uses the `TotalHarvestedCounter` component
- Fetches data from the `harvested_counts` table via `getTotalHarvested()`

### 2. Order Processing
- When a customer completes an order (reaches success page):
  - The success page calls `/api/order-complete`
  - This API calculates total quantity from order items
  - Calls `incrementHarvestedCount()` to update the harvested count
  - Calls `updateInventoryCounts()` to reduce inventory stock levels
  - Clears the cart after successful update

### 3. API Endpoints
- **GET** `/api/checkout-session?session_id={id}` - Retrieves Stripe session details
- **POST** `/api/order-complete` - Updates harvested count, reduces inventory stock, and processes order completion

## Files Modified

### New Files Created:
- `components/TotalHarvestedCounter.tsx` - Displays total harvested count
- `app/api/order-complete/route.ts` - Handles order completion and count updates
- `scripts/create-harvested-counts-table.sql` - Database setup script

### Files Modified:
- `app/page.tsx` - Updated to use TotalHarvestedCounter instead of HomeInventoryCounters
- `app/success/page.tsx` - Added logic to update harvested count on order completion
- `lib/supabase.ts` - Added new functions for harvested count and inventory management
- `app/api/order-complete/route.ts` - Enhanced to update both harvested count and inventory stock levels

## Environment Variables

Ensure your `.env.local` file contains:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Testing

1. **Initial Setup**: Verify the homepage shows "0" for Total Harvested
2. **Place an Order**: Complete a test order and verify the count increments
3. **Database Check**: Verify the `harvested_counts` table is updated in Supabase

## Troubleshooting

- **Count not updating**: Check browser console for API errors
- **Database connection**: Verify Supabase credentials and table exists
- **Order completion**: Ensure the success page is reached after payment

## Future Enhancements

- Add admin panel to manually adjust harvested counts
- Display harvest history/timeline
- Add notifications when milestones are reached
- Export harvest data for reporting 