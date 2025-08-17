"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  perspective?: number;
  maxTilt?: number;
  glare?: boolean;
  glareOpacity?: number;
  glareColor?: string;
}

export function TiltCard({
  children,
  className = "",
  intensity = 20,
  scale = 1.05,
  perspective = 1000,
  maxTilt = 15,
  glare = true,
  glareOpacity = 0.3,
  glareColor = "rgba(255, 255, 255, 0.3)"
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-intensity, intensity], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-intensity, intensity], [-maxTilt, maxTilt]);
  const scaleValue = useSpring(isHovered ? scale : 1, {
    stiffness: 300,
    damping: 20
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative ${className}`}
      style={{ perspective }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: scaleValue,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full"
      >
        {children}
        
        {/* Glare effect */}
        {glare && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-lg"
            style={{
              background: `linear-gradient(105deg, transparent 40%, ${glareColor} 45%, ${glareColor} 50%, transparent 54%)`,
              opacity: glareOpacity,
              transform: "translateZ(20px)"
            }}
            animate={{
              opacity: isHovered ? glareOpacity : 0
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </div>
  );
}

// Specialized tilt card for images
export function TiltImageCard({
  src,
  alt,
  className = "",
  ...tiltProps
}: TiltCardProps & { src: string; alt: string }) {
  return (
    <TiltCard className={className} {...tiltProps}>
      <div className="relative overflow-hidden rounded-lg shadow-xl">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </TiltCard>
  );
}

// Specialized tilt card for content
export function TiltContentCard({
  children,
  className = "",
  ...tiltProps
}: TiltCardProps) {
  return (
    <TiltCard className={className} {...tiltProps}>
      <div className="relative overflow-hidden rounded-lg shadow-xl bg-white/10 backdrop-blur-sm border border-white/20">
        {children}
      </div>
    </TiltCard>
  );
} 