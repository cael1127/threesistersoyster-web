"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  delay = 0,
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !isAnimating) {
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
  }, [isInView, end, duration, delay, decimals, isAnimating]);

  // Clean up animation frame and timers on unmount
  useEffect(() => {
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
  }, []);

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