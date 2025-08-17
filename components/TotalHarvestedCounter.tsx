"use client";

import React, { useState } from 'react';
import { AnimatedCounter } from './ui/animated-counter';

export default function TotalHarvestedCounter() {
  const [count, setCount] = useState(50000);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(count.toString());

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(count.toString());
  };

  const handleSave = () => {
    const newCount = parseInt(editValue) || 0;
    setCount(newCount);
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
            <AnimatedCounter 
              end={count} 
              suffix="+" 
              duration={2000}
              delay={0.5}
            />
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