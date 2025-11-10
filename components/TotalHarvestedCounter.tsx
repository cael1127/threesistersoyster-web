"use client";

import React, { useState, useEffect } from 'react';

export default function TotalHarvestedCounter() {
  const [count, setCount] = useState(4225);//Change this to change the total harvested
  const [displayCount, setDisplayCount] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);

  function formatCount(value: number) {
    const millions = value / 1_000_000;
    return `${millions.toFixed(2)}M`;
  }

  // Initial roll-up animation when component first loads
  useEffect(() => {
    if (!hasInitialized) {
      const startCount = 0;
      const endCount = count;
      const duration = 2000; // 2 second animation for initial load
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(startCount + (endCount - startCount) * easeOutQuart);
        
        setDisplayCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setHasInitialized(true);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [count, hasInitialized]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
        <span>{formatCount(displayCount)}</span>
      </div>
      <p className="text-sm md:text-base text-purple-800">Total Harvested</p>
    </div>
  );
} 