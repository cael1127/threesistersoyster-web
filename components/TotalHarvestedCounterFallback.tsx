"use client";

import React from 'react';
import { SimpleCounter } from './ui/simple-counter';

export default function TotalHarvestedCounterFallback() {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
        <SimpleCounter 
          end={50000} 
          suffix="+" 
          duration={2000}
          delay={0.5}
        />
      </div>
      <p className="text-sm md:text-base text-purple-800">Total Harvested</p>
    </div>
  );
} 