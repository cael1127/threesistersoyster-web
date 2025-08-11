import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log('=== SIMPLE TEST API ===');
    
    return NextResponse.json({ 
      success: true, 
      message: "API is working",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("=== SIMPLE TEST ERROR ===", error);
    return NextResponse.json(
      { error: "Test failed" }, 
      { status: 500 }
    );
  }
} 