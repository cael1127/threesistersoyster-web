import { type NextRequest, NextResponse } from "next/server";
import { incrementHarvestedCount, updateInventoryCounts } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { items, total_amount } = await request.json();

    // Calculate total quantity from order items
    let totalQuantity = 0;
    if (items && Array.isArray(items)) {
      totalQuantity = items.reduce((sum: number, item: any) => {
        return sum + (item.quantity || 0);
      }, 0);
    }

    // Update the harvested count in Supabase
    if (totalQuantity > 0) {
      await incrementHarvestedCount(totalQuantity);
    }

    // Update inventory counts (reduce stock levels)
    if (items && Array.isArray(items) && items.length > 0) {
      await updateInventoryCounts(items);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Order completed, harvested count updated, and inventory counts reduced",
      quantityAdded: totalQuantity,
      inventoryUpdated: true
    });
  } catch (error) {
    console.error("Error processing order completion:", error);
    return NextResponse.json(
      { error: "Failed to process order completion" }, 
      { status: 500 }
    );
  }
} 