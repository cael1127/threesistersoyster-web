# Checkout System Setup & Testing Guide

## 🚀 **Checkout System Overview**

The Three Sisters Oyster Co. website now has a fully functional Stripe checkout system that:

1. **Creates Stripe checkout sessions** from cart items
2. **Processes payments** securely through Stripe
3. **Updates inventory** automatically when orders are completed
4. **Tracks harvested counts** for oyster products
5. **Provides order confirmation** and success pages

## 🔧 **Required Environment Variables**

Create a `.env.local` file in your project root with:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Environment
NODE_ENV=development
```

## 🧪 **Testing the Checkout System**

### **Step 1: Add Items to Cart**
1. Go to `/products` page
2. Add some products to your cart
3. Navigate to `/cart` page

### **Step 2: Test Checkout Flow**
1. In the cart page, click **"Proceed to Checkout"**
2. You should be redirected to Stripe checkout
3. Complete the payment (use Stripe test card: 4242 4242 4242 4242)
4. You'll be redirected to `/success` page

### **Step 3: Verify Order Completion**
1. Check the success page shows order details
2. Verify inventory is updated (check console logs)
3. Cart should be cleared automatically

## 🐛 **Debugging Tools**

### **Debug Endpoint**
Visit `/api/debug-checkout` to check:
- Environment variable configuration
- Stripe and Supabase setup status
- System recommendations

### **Console Logging**
The checkout process logs extensively to the console:
- Cart items and totals
- API request/response data
- Inventory update progress
- Error details

### **Test Button**
Use the **"Test Checkout (Debug)"** button in the cart to:
- Test API connectivity
- Validate cart data format
- Check for configuration issues

## 🔍 **Troubleshooting Common Issues**

### **1. "Payment service unavailable" Error**
- Check `STRIPE_SECRET_KEY` is set in `.env.local`
- Verify the key is valid and active
- Ensure you're using the correct environment (test/live)

### **2. "Invalid origin" Error**
- Check your domain is in the allowed origins list
- For development, localhost should work automatically
- Update `lib/security.ts` if needed

### **3. "Rate limit exceeded" Error**
- Wait 1 minute before trying again
- Check if you're making too many requests
- Rate limits: 100/min general, 20/min for API endpoints

### **4. Inventory Not Updating**
- Check Supabase credentials are correct
- Verify the `products` table exists with proper structure
- Check console logs for database errors

### **5. Cart Not Clearing**
- Ensure the success page loads completely
- Check if there are JavaScript errors
- Verify the order completion API is called

## 📊 **Inventory Management Flow**

### **When Order Completes:**
1. **Success page loads** with Stripe session data
2. **Order completion API** is called automatically
3. **Inventory counts** are reduced for all products
4. **Harvested count** is incremented for oyster products
5. **Cart is cleared** and success message shown

### **Database Updates:**
- `products.inventory_count` field is updated
- `products.description` JSON is updated if it contains inventory data
- `harvested_counts.total_harvested` is incremented for oysters

## 🎯 **Testing Checklist**

- [ ] Environment variables configured
- [ ] Products can be added to cart
- [ ] Cart shows correct totals
- [ ] Checkout button works
- [ ] Stripe checkout loads
- [ ] Payment can be completed
- [ ] Success page loads
- [ ] Inventory is updated
- [ ] Cart is cleared
- [ ] Console shows success logs

## 🚨 **Security Features**

- **Origin validation** prevents unauthorized domains
- **Rate limiting** prevents abuse
- **Input sanitization** blocks malicious content
- **Request size limits** prevent large payload attacks
- **Security headers** protect against common attacks

## 🔄 **Development vs Production**

### **Development:**
- More permissive security settings
- Debug endpoints enabled
- Detailed console logging
- Localhost origins allowed

### **Production:**
- Strict security validation
- Debug endpoints disabled
- Minimal logging
- Only approved domains allowed

## 📞 **Getting Help**

If you encounter issues:

1. **Check the console** for error messages
2. **Use the debug endpoint** to verify configuration
3. **Test with the debug button** in the cart
4. **Review environment variables** are set correctly
5. **Check Stripe dashboard** for payment status
6. **Verify Supabase connection** is working

## 🎉 **Success Indicators**

When everything is working correctly, you should see:
- Smooth checkout flow from cart to Stripe
- Successful payment processing
- Automatic inventory updates
- Cart clearing after order completion
- Success page with order confirmation
- Console logs showing successful processing

---

**Ready to test your checkout system?** Start by adding items to your cart and clicking "Proceed to Checkout"! 