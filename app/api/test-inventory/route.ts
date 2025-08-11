import { type NextRequest, NextResponse } from "next/server";
import { updateProductInventoryCounts, incrementHarvestedCount } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    console.log('=== TEST INVENTORY API CALLED ===');
    
    // Test data - simulate ordering 5 oysters from your product
    const testItems = [
      {
        id: "9032febb-71b5-4285-9d62-0f3222622b73", // Your product ID
        name: "ONLY CAEL ORDER",
        quantity: 5,
        category: "oysters" // Make sure it's tagged as oysters
      }
    ];

    console.log('Test items:', testItems);

    // Test harvested count update
    console.log('Testing harvested count update...');
    await incrementHarvestedCount(5);
    console.log('Harvested count updated successfully');

    // Test product inventory update
    console.log('Testing product inventory update...');
    await updateProductInventoryCounts(testItems);
    console.log('Product inventory updated successfully');

    return NextResponse.json({ 
      success: true, 
      message: "Test completed successfully",
      testItems: testItems
    });
  } catch (error) {
    console.error("=== TEST INVENTORY ERROR ===", error);
    return NextResponse.json(
      { error: "Test failed", details: error }, 
      { status: 500 }
    );
  }
} 