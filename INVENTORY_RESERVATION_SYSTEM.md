# Inventory Reservation System (No Database Changes Required)

This system prevents overselling by temporarily reserving inventory when customers add items to their cart. **No new database tables are required** - it works with your existing `products` table structure.

## How It Works

### 1. **Cart Session Management**
- Each cart gets a unique session ID when created
- Session ID is generated using timestamp + random string for uniqueness
- Session persists until cart is cleared or checkout completes

### 2. **Inventory Reservation Process**
When a customer adds items to cart:
1. **Reservation Request**: Cart context calls `/api/reserve-inventory` with items and session ID
2. **Availability Check**: System verifies sufficient inventory exists (accounting for other active reservations)
3. **Reservation Creation**: Creates entry in memory (no database changes)
4. **Expiration Set**: Reservation expires after 2 minutes

### 3. **Reservation Storage**
- **In-Memory Storage**: Reservations are stored in server memory using a Map
- **No Database Tables**: Works with your existing `products` table structure
- **Automatic Cleanup**: Expired reservations are automatically removed
- **Session-Based**: Each cart session has its own reservations

### 4. **Reservation Lifecycle**
- **Active**: Item is reserved and unavailable to other customers
- **Expired**: Reservation timed out (2 minutes), item becomes available again
- **Completed**: Reservation released after successful checkout

### 5. **Smart Inventory Calculation**
The system calculates available inventory as:
```
Available = Current Inventory - Reserved by Other Sessions
```

This prevents overselling while allowing multiple customers to see accurate availability.

## API Endpoints

### `/api/reserve-inventory`
- **POST**: Reserve inventory for cart items
- **DELETE**: Release reservations for a session
- **GET**: View current active reservations (for debugging)

## Integration Points

### Cart Context
- Automatically reserves inventory when `addItem()` is called
- Releases reservations when `removeItem()` or `clearCart()` is called
- Provides `getSessionId()` for checkout process

### Checkout Process
- Session ID is passed to Stripe checkout
- Webhook releases reservations after successful payment
- Prevents inventory conflicts during checkout

### Webhook Handler
- Processes `checkout.session.completed` events
- Updates actual inventory counts in your existing `products` table
- Releases reservations for completed orders

## Benefits

1. **No Database Changes**: Works with your existing Supabase setup
2. **Prevents Overselling**: Multiple customers can't order the same limited inventory
3. **Improves User Experience**: Customers see real-time availability
4. **Reduces Order Cancellations**: No more "sorry, out of stock" after payment
5. **Automatic Cleanup**: Expired reservations don't block inventory permanently
6. **Memory Efficient**: Only stores active reservations temporarily

## Configuration

### Reservation Timeout
- Default: 2 minutes
- Configurable in `/api/reserve-inventory/route.ts`
- Balance between user experience and inventory availability

### Memory Management
- Reservations are automatically cleaned up on each API call
- No manual cleanup required
- Memory usage scales with active cart sessions

## Monitoring

### Key Metrics
- Number of active reservations
- Reservation expiration rate
- Failed reservation attempts
- Memory usage of active reservations

### Logs
- All reservation operations are logged
- Check console for reservation status
- Monitor webhook processing

### Debug Endpoint
- **GET** `/api/reserve-inventory` shows all active reservations
- Useful for monitoring and debugging

## Troubleshooting

### Common Issues
1. **Reservations not being created**: Check Supabase connection and product names
2. **Inventory not updating**: Check webhook configuration and Stripe setup
3. **Memory concerns**: Monitor active reservation count via GET endpoint

### Debug Endpoints
- `/api/reserve-inventory` (GET): View all active reservations
- `/api/test-inventory-update`: Test inventory updates manually
- `/api/debug-checkout`: Debug checkout process
- Check browser console for cart context logs

## Security Considerations

- Session IDs are generated client-side but validated server-side
- Reservations are tied to specific sessions
- No sensitive data stored in reservations
- Automatic expiration prevents abuse
- In-memory storage is isolated per server instance

## Production Considerations

### Memory Usage
- Each reservation uses minimal memory (~100 bytes)
- With 100 active reservations = ~10KB memory usage
- Monitor via GET endpoint

### Server Restarts
- In-memory reservations are lost on server restart
- This is acceptable for most use cases
- Consider Redis for production if persistence is critical

### Scaling
- Works well for single server deployments
- For multiple servers, consider Redis or database-based approach
- Current implementation is perfect for most small-medium businesses
