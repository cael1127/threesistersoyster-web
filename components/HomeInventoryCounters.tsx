"use client";
import { useEffect, useState } from "react";
import {
  HarvestReadyInventoryCounter,
  FarmInventoryCounter,
  NurseryInventoryCounter,
} from "./inventory-counters";

export default function HomeInventoryCounters() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, show a placeholder
  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-purpleBrand mb-2 animate-pulse">0</div>
          <p className="text-sm md:text-base text-purpleBrand">Harvest Ready</p>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-purpleBrand mb-2 animate-pulse">0</div>
          <p className="text-sm md:text-base text-purpleBrand">Farm Stock</p>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-purpleBrand mb-2 animate-pulse">0</div>
          <p className="text-sm md:text-base text-purpleBrand">Nursery Seed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-purpleBrand mb-2">
          <HarvestReadyInventoryCounter />
        </div>
        <p className="text-sm md:text-base text-purpleBrand">Harvest Ready</p>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-purpleBrand mb-2">
          <FarmInventoryCounter />
        </div>
        <p className="text-sm md:text-base text-purpleBrand">Farm Stock</p>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-purpleBrand mb-2">
          <NurseryInventoryCounter />
        </div>
        <p className="text-sm md:text-base text-purpleBrand">Nursery Seed</p>
      </div>
    </div>
  );
} 