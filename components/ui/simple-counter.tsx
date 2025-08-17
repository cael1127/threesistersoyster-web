"use client";

import React, { useState, useEffect, useRef } from 'react';

interface SimpleCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function SimpleCounter({
  end,
  duration = 2000,
  delay = 0,
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0
}: SimpleCounterProps) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            setIsAnimating(true);
            
            timerRef.current = setTimeout(() => {
              let startTime: number;

              const animate = (currentTime: number) => {
                try {
                  if (!startTime) startTime = currentTime;
                  const progress = Math.min((currentTime - startTime) / duration, 1);
                  
                  // Easing function for smooth animation
                  const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                  const currentCount = easeOutQuart * end;
                  
                  setCount(Number(currentCount.toFixed(decimals)));
                  
                  if (progress < 1) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                  }
                } catch (error) {
                  console.error('Animation error:', error);
                  // Fallback to final value
                  setCount(end);
                }
              };

              animationFrameRef.current = requestAnimationFrame(animate);
            }, delay);

            return () => {
              if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
              }
              if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
              }
            };
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      // Clean up any pending timers and animation frames
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [end, duration, delay, decimals, isAnimating]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {prefix}
      <span className="tabular-nums">
        {count.toLocaleString()}
      </span>
      {suffix}
    </span>
  );
} 