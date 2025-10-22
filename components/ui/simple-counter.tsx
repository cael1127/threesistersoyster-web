"use client";

import React from 'react';

interface SimpleCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  decimals?: number;
  className?: string;
}

export function SimpleCounter({ end, suffix = "", className = "" }: SimpleCounterProps) {
  return (
    <span className={className}>
      {end.toLocaleString()}{suffix}
    </span>
  );
}
