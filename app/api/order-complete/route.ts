import { type NextRequest, NextResponse } from "next/server";
import { incrementHarvestedCount, updateInventoryCounts } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    console.log('=== ORDER COMPLETION API CALLED ===');
    const body = await request.json();
    console.log('Request body:', body);
    
    const { items, total_amount } = body;

    // Calculate total quantity from order items
    let totalQuantity = 0;
    if (items && Array.isArray(items)) {
      totalQuantity = items.reduce((sum: number, item: any) => {
        return sum + (item.quantity || 0);
      }, 0);
      console.log('Total quantity calculated:', totalQuantity);
    }

    // Update the harvested count in Supabase
    if (totalQuantity > 0) {
      console.log('Updating harvested count...');
      await incrementHarvestedCount(totalQuantity);
      console.log('Harvested count updated successfully');
    }

    // Update inventory counts (reduce stock levels)
    if (items && Array.isArray(items) && items.length > 0) {
      console.log('Updating inventory counts...');
      await updateInventoryCounts(items);
      console.log('Inventory counts updated successfully');
    }

    console.log('=== ORDER COMPLETION SUCCESSFUL ===');
    return NextResponse.json({ 
      success: true, 
      message: "Order completed, harvested count updated, and inventory counts reduced",
      quantityAdded: totalQuantity,
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