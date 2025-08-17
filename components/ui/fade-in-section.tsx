"use client";

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
}

export function FadeInSection({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 50,
  threshold = 0.1
}: FadeInSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold });

  const getVariants = (): Variants => {
    const baseVariants: Variants = {
      hidden: {
        opacity: 0,
        transition: {
          duration,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
        }
      },
      visible: {
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    };

    switch (direction) {
      case 'up':
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, y: distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case 'down':
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, y: -distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case 'left':
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, x: distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      case 'right':
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, x: -distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      case 'none':
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Specialized components for common use cases
export function FadeInText({ children, ...props }: FadeInSectionProps) {
  return (
    <FadeInSection {...props}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: props.delay }}
      >
        {children}
      </motion.div>
    </FadeInSection>
  );
}

export function FadeInCard({ children, ...props }: FadeInSectionProps) {
  return (
    <FadeInSection {...props}>
      <motion.div
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
        className="transform-gpu"
      >
        {children}
      </motion.div>
    </FadeInSection>
  );
} 