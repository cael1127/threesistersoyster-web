"use client";
import { useEffect, useState } from "react";
import { getTotalHarvested } from "@/lib/supabase";

export default function TotalHarvestedCounter() {
  const [totalHarvested, setTotalHarvested] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalHarvested = async () => {
      try {
        const total = await getTotalHarvested();
        setTotalHarvested(total);
      } catch (error) {
        console.error("Error fetching total harvested:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalHarvested();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-[#3a2a4d] mb-2 animate-pulse">0</div>
        <p className="text-sm md:text-base text-[#3a2a4d]">Total Harvested</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-[#3a2a4d] mb-2">
        {totalHarvested.toLocaleString()}
      </div>
      <p className="text-sm md:text-base text-[#3a2a4d]">Total Harvested</p>
    </div>
  );
} 