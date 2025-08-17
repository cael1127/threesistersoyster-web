"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  animationType: 'fade-in' | 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'scale-in' | 'bounce-in';
  delay?: number;
  className?: string;
  threshold?: number;
}

export default function ScrollAnimatedSection({
  children,
  animationType,
  delay = 0,
  className = '',
  threshold = 0.1
}: ScrollAnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, delay]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-1000 ease-out';
    
    if (!isVisible) {
      switch (animationType) {
        case 'fade-in':
          return `${baseClasses} opacity-0`;
        case 'slide-left':
          return `${baseClasses} opacity-0 transform translate-x-12`;
        case 'slide-right':
          return `${baseClasses} opacity-0 transform -translate-x-12`;
        case 'slide-up':
          return `${baseClasses} opacity-0 transform translate-y-12`;
        case 'slide-down':
          return `${baseClasses} opacity-0 transform -translate-y-12`;
        case 'scale-in':
          return `${baseClasses} opacity-0 transform scale-95`;
        case 'bounce-in':
          return `${baseClasses} opacity-0 transform scale-75`;
        default:
          return baseClasses;
      }
    }

    switch (animationType) {
      case 'fade-in':
        return `${baseClasses} opacity-100`;
      case 'slide-left':
        return `${baseClasses} opacity-100 transform translate-x-0`;
      case 'slide-right':
        return `${baseClasses} opacity-100 transform translate-x-0`;
      case 'slide-up':
        return `${baseClasses} opacity-100 transform translate-y-0`;
      case 'slide-down':
        return `${baseClasses} opacity-100 transform translate-y-0`;
      case 'scale-in':
        return `${baseClasses} opacity-100 transform scale-100`;
      case 'bounce-in':
        return `${baseClasses} opacity-100 transform scale-100`;
      default:
        return baseClasses;
    }
  };

  return (
    <div ref={elementRef} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  );
} 