"use client";

import React, { useState, useEffect } from 'react';

export default function TotalHarvestedCounter() {
  const [count, setCount] = useState(50000);
  const [displayCount, setDisplayCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(count.toString());
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initial roll-up animation when component first loads
  useEffect(() => {
    if (!hasInitialized) {
      setIsAnimating(true);
      const startCount = 0;
      const endCount = count;
      const duration = 2000; // 2 second animation for initial load
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(startCount + (endCount - startCount) * easeOutQuart);
        
        setDisplayCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          setHasInitialized(true);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [count, hasInitialized]);

  // Animate the counter when count changes (after initial load)
  useEffect(() => {
    if (hasInitialized && isAnimating) {
      const startCount = displayCount;
      const endCount = count;
      const duration = 1000; // 1 second animation for changes
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(startCount + (endCount - startCount) * easeOutQuart);
        
        setDisplayCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [count, displayCount, isAnimating, hasInitialized]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(count.toString());
  };

  const handleSave = () => {
    const newCount = parseInt(editValue) || 0;
    if (newCount !== count) {
      setIsAnimating(true);
      setCount(newCount);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(count.toString());
    setIsEditing(false);
  };

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
        {isEditing ? (
          <div className="flex items-center justify-center space-x-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-24 text-center bg-white/20 border border-white/30 rounded px-2 py-1 text-purple-900"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
            >
              ✓
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span>{displayCount.toLocaleString()}+</span>
            <button
              onClick={handleEdit}
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs opacity-70 hover:opacity-100 transition-opacity"
              title="Click to edit number for testing"
            >
              ✏️
            </button>
          </div>
        )}
      </div>
      <p className="text-sm md:text-base text-purple-800">Total Harvested</p>
    </div>
  );
} 