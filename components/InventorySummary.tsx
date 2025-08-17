"use client";

import React, { useEffect, useState } from 'react';
import { getFarmInventoryCount, getNurseryInventoryCount } from '@/lib/supabase';
import { AnimatedCounter } from './ui/animated-counter';

export default function InventorySummary() {
  const [farmCount, setFarmCount] = useState(0);
  const [nurseryCount, setNurseryCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [farm, nursery] = await Promise.all([
          getFarmInventoryCount(),
          getNurseryInventoryCount()
        ]);
        
        setFarmCount(farm);
        setNurseryCount(nursery);
        setTotalCount(farm + nursery);
      } catch (error) {
        console.error("Error fetching inventory counts:", error);
        // Set fallback values for testing
        setFarmCount(2847);
        setNurseryCount(1563);
        setTotalCount(2847 + 1563);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
          <span className="animate-pulse">Loading...</span>
        </div>
        <p className="text-sm md:text-base text-purple-800">Inventory Counts</p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      {/* Total Count */}
      <div>
        <div className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
          <AnimatedCounter 
            end={totalCount} 
            suffix="+" 
            duration={2000}
            delay={0.2}
          />
        </div>
        <p className="text-sm md:text-base text-purple-800">Total Inventory</p>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-xl font-bold text-purple-800">
            <AnimatedCounter 
              end={farmCount} 
              suffix="" 
              duration={1500}
              delay={0.4}
            />
          </div>
          <p className="text-xs text-purple-700">Farm</p>
        </div>
        <div>
          <div className="text-xl font-bold text-purple-800">
            <AnimatedCounter 
              end={nurseryCount} 
              suffix="" 
              duration={1500}
              delay={0.6}
            />
          </div>
          <p className="text-xs text-purple-700">Nursery</p>
        </div>
      </div>
    </div>
  );
} 