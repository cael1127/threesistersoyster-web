import React from 'react';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold text-purple-900 mb-6">
            Interactive Elements Demo
          </h1>
          <p className="text-xl md:text-2xl text-purple-800 max-w-3xl mx-auto">
            This page demonstrates various interactive elements and animations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Animated Counters</h3>
            <p className="text-purple-800">
              Smooth counting animations for displaying statistics and numbers.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold text-purple-900 mb-4">3D Tilt Effects</h3>
            <p className="text-purple-800">
              Interactive cards that respond to mouse movement with realistic perspective.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Scroll Animations</h3>
            <p className="text-purple-800">
              Elements that animate in as they come into view during scrolling.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Floating Elements</h3>
            <p className="text-purple-800">
              Subtle background animations that add life without being distracting.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Progress Bars</h3>
            <p className="text-purple-800">
              Animated progress indicators for showing completion status.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Hover Effects</h3>
            <p className="text-purple-800">
              Interactive hover states that provide visual feedback to users.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">
            Ready to Implement?
          </h2>
          <p className="text-xl text-purple-800 mb-8 max-w-2xl mx-auto">
            These interactive elements can be easily integrated into your existing pages
            to create a more engaging user experience.
          </p>
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-mintBrand to-seafoamBrand text-white font-semibold rounded-full hover:from-seafoamBrand hover:to-mintBrand transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started
          </div>
        </div>
      </div>
    </div>
  );
} 