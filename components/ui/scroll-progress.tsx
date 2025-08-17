"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  showPercentage?: boolean;
  smooth?: boolean;
}

export function ScrollProgress({
  className = "",
  color = "#8b5cf6",
  height = 3,
  showPercentage = false,
  smooth = true
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const [percentage, setPercentage] = useState(0);
  
  const scaleX = smooth 
    ? useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
    : scrollYProgress;

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <motion.div
        className="origin-left"
        style={{
          scaleX,
          backgroundColor: color,
          height: `${height}px`
        }}
      />
      
      {showPercentage && (
        <motion.div
          className="absolute right-4 top-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-mono"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {percentage}%
        </motion.div>
      )}
    </div>
  );
}

// Specialized progress bar for reading time
export function ReadingProgress({
  className = "",
  color = "#8b5cf6",
  height = 3
}: {
  className?: string;
  color?: string;
  height?: number;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <motion.div
        className="origin-left"
        style={{
          scaleX,
          backgroundColor: color,
          height: `${height}px`
        }}
      />
    </div>
  );
}

// Progress bar with custom colors and animations
export function AnimatedProgressBar({
  progress,
  className = "",
  color = "#8b5cf6",
  height = 4,
  animated = true
}: {
  progress: number;
  className?: string;
  color?: string;
  height?: number;
  animated?: boolean;
}) {
  const scaleX = useSpring(progress / 100, { 
    stiffness: 100, 
    damping: 30,
    duration: animated ? 1 : 0
  });

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full rounded-full"
        style={{
          scaleX,
          backgroundColor: color,
          height: `${height}px`
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: animated ? 1 : 0, ease: "easeOut" }}
      />
    </div>
  );
} 