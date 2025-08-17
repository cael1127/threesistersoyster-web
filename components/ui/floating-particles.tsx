"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  color?: string;
  sizeRange?: [number, number];
  durationRange?: [number, number];
}

export function FloatingParticles({
  count = 20,
  className = "",
  color = "rgba(255, 255, 255, 0.1)",
  sizeRange = [2, 6],
  durationRange = [20, 40]
}: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Generate particles
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      duration: Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0],
      delay: Math.random() * 5
    }));
  }, [count, sizeRange, durationRange]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particlesRef.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            left: particle.x,
            top: particle.y
          }}
          animate={{
            y: [0, -100, -200, -300],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

// Specialized floating elements for different themes
export function FloatingBubbles({ count = 15, className = "" }: { count?: number; className?: string }) {
  return (
    <FloatingParticles
      count={count}
      className={className}
      color="rgba(255, 255, 255, 0.15)"
      sizeRange={[4, 12]}
      durationRange={[15, 30]}
    />
  );
}

export function FloatingDots({ count = 25, className = "" }: { count?: number; className?: string }) {
  return (
    <FloatingParticles
      count={count}
      className={className}
      color="rgba(255, 255, 255, 0.08)"
      sizeRange={[1, 3]}
      durationRange={[25, 45]}
    />
  );
}

export function FloatingLeaves({ count = 10, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/20 text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -200, -400],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
} 