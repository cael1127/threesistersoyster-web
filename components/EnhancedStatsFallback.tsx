"use client";

import React from 'react';
import { SimpleCounter } from './ui/simple-counter';

export default function EnhancedStatsFallback() {
  return (
    <div className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purpleBrand/20 via-blueBrand/20 to-seafoamBrand/20 rounded-2xl overflow-hidden">
      <div className="relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            Our Impact by the Numbers
          </h2>
          <p className="text-base sm:text-lg text-purple-800 max-w-2xl mx-auto">
            Discover the scale of our sustainable aquaculture operations and environmental contributions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Total Harvested */}
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <div className="w-16 h-16 bg-gradient-to-b from-purpleBrand to-blueBrand rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
              <SimpleCounter 
                end={50000} 
                suffix="+" 
                duration={2500}
                delay={0.2}
              />
            </div>
            <p className="text-sm md:text-base text-purple-800 font-medium">Oysters Harvested</p>
          </div>

          {/* Water Quality Improvement */}
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <div className="w-16 h-16 bg-gradient-to-b from-blueBrand to-seafoamBrand rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
              <SimpleCounter 
                end={95} 
                suffix="%" 
                duration={2000}
                delay={0.4}
              />
            </div>
            <p className="text-sm md:text-base text-purple-800 font-medium">Water Quality Improvement</p>
          </div>

          {/* Carbon Sequestered */}
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <div className="w-16 h-16 bg-gradient-to-b from-seafoamBrand to-mintBrand rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
              <SimpleCounter 
                end={2500} 
                suffix=" lbs" 
                duration={2200}
                delay={0.6}
              />
            </div>
            <p className="text-sm md:text-base text-purple-800 font-medium">Carbon Sequestered</p>
          </div>

          {/* Years of Operation */}
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <div className="w-16 h-16 bg-gradient-to-b from-mintBrand to-purpleBrand rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
              <SimpleCounter 
                end={8} 
                suffix="+" 
                duration={1800}
                delay={0.8}
              />
            </div>
            <p className="text-sm md:text-base text-purple-800 font-medium">Years of Operation</p>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Daily Production */}
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-purple-900 mb-2">
              <SimpleCounter 
                end={500} 
                suffix="+" 
                duration={2000}
                delay={1.0}
              />
            </div>
            <p className="text-sm text-purple-800">Daily Production Capacity</p>
          </div>

          {/* Customer Satisfaction */}
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-purple-900 mb-2">
              <SimpleCounter 
                end={98} 
                suffix="%" 
                decimals={1}
                duration={1800}
                delay={1.2}
              />
            </div>
            <p className="text-sm text-purple-800">Customer Satisfaction</p>
          </div>

          {/* Marine Species Supported */}
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-purple-900 mb-2">
              <SimpleCounter 
                end={25} 
                suffix="+" 
                duration={2200}
                delay={1.4}
              />
            </div>
            <p className="text-sm text-purple-800">Marine Species Supported</p>
          </div>
        </div>
      </div>
    </div>
  );
} 