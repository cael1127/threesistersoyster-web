"use client";

import { useEffect, useState, useRef } from 'react';

type AnimationType = 'fade-in' | 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'scale-in' | 'bounce-in';

interface UseScrollAnimationOptions {
  type: AnimationType;
  threshold?: number;
  delay?: number;
  duration?: number;
  distance?: number;
}

export function useScrollAnimation({
  type,
  threshold = 0.1,
  delay = 0,
  duration = 1000,
  distance = 50
}: UseScrollAnimationOptions) {
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
      switch (type) {
        case 'fade-in':
          return `${baseClasses} opacity-0`;
        case 'slide-left':
          return `${baseClasses} opacity-0 transform translate-x-${distance}`;
        case 'slide-right':
          return `${baseClasses} opacity-0 transform -translate-x-${distance}`;
        case 'slide-up':
          return `${baseClasses} opacity-0 transform translate-y-${distance}`;
        case 'slide-down':
          return `${baseClasses} opacity-0 transform -translate-y-${distance}`;
        case 'scale-in':
          return `${baseClasses} opacity-0 transform scale-95`;
        case 'bounce-in':
          return `${baseClasses} opacity-0 transform scale-75`;
        default:
          return baseClasses;
      }
    }

    switch (type) {
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

  return {
    elementRef,
    isVisible,
    animationClasses: getAnimationClasses()
  };
} 