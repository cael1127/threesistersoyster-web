import { type NextRequest, NextResponse } from "next/server";
import { getTotalHarvested } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    console.log('=== DEBUG HARVESTED COUNT ===');
    
    // Test the getTotalHarvested function directly
    const total = await getTotalHarvested();
    
    console.log('Total harvested result:', total);
    
    return NextResponse.json({ 
      success: true, 
      totalHarvested: total,
      message: "Debug completed"
    });
  } catch (error) {
    console.error("=== DEBUG ERROR ===", error);
    return NextResponse.json(
      { error: "Debug failed", details: error }, 
      { status: 500 }
    );
  }
} 