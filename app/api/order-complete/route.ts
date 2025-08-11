import { type NextRequest, NextResponse } from "next/server";
import { incrementHarvestedCount, updateProductInventoryCounts } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    console.log('=== ORDER COMPLETION API CALLED ===');
    const body = await request.json();
    console.log('Request body:', body);
    
    const { items, total_amount } = body;

    // Calculate total quantity from oyster items only
    let oysterQuantity = 0;
    if (items && Array.isArray(items)) {
      oysterQuantity = items.reduce((sum: number, item: any) => {
        // Only count items that are tagged as "oysters"
        if (item.category && item.category.toLowerCase() === 'oysters') {
          console.log(`Counting ${item.quantity} ${item.name} as oyster product`);
          return sum + (item.quantity || 0);
        } else {
          console.log(`Skipping ${item.name} - not an oyster product (category: ${item.category})`);
          return sum;
        }
      }, 0);
      console.log('Oyster quantity calculated:', oysterQuantity);
    }

    // Update the harvested count in Supabase only for oyster products
    if (oysterQuantity > 0) {
      console.log(`Updating harvested count with ${oysterQuantity} oysters...`);
      await incrementHarvestedCount(oysterQuantity);
      console.log('Harvested count updated successfully');
    } else {
      console.log('No oyster products in order, harvested count not updated');
    }

    // Update product inventory counts (reduce stock levels)
    if (items && Array.isArray(items) && items.length > 0) {
      console.log('Updating product inventory counts...');
      await updateProductInventoryCounts(items);
      console.log('Product inventory counts updated successfully');
    }

    console.log('=== ORDER COMPLETION SUCCESSFUL ===');
    return NextResponse.json({ 
      success: true, 
      message: "Order completed, harvested count updated for oyster products, and inventory counts reduced",
      quantityAdded: oysterQuantity,
      inventoryUpdated: true
    });
  } catch (error) {
    console.error("=== ORDER COMPLETION ERROR ===", error);
    return NextResponse.json(
      { error: "Failed to process order completion" }, 
      { status: 500 }
    );
  }
} 