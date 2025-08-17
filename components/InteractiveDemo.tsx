"use client";

import React from 'react';
import { AnimatedCounter } from './ui/animated-counter';
import { FadeInSection, FadeInText, FadeInCard } from './ui/fade-in-section';
import { TiltCard, TiltImageCard, TiltContentCard } from './ui/tilt-card';
import { FloatingBubbles, FloatingDots, FloatingLeaves } from './ui/floating-particles';
import { ScrollProgress, AnimatedProgressBar } from './ui/scroll-progress';

export default function InteractiveDemo() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Scroll Progress Bar */}
      <ScrollProgress color="#8b5cf6" height={4} />
      
      {/* Floating Background Elements */}
      <FloatingBubbles count={20} />
      <FloatingDots count={30} />
      
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section with Fade In */}
        <FadeInSection direction="up" delay={0.2}>
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-bold text-purple-900 mb-6">
              Interactive Elements
            </h1>
            <p className="text-xl md:text-2xl text-purple-800 max-w-3xl mx-auto">
              Experience the modern web with these engaging animations and effects
            </p>
          </div>
        </FadeInSection>

        {/* Animated Counters Section */}
        <FadeInSection direction="up" delay={0.4}>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
              Animated Counters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-900 mb-2">
                  <AnimatedCounter end={1250000} prefix="$" suffix="+" />
                </div>
                <p className="text-purple-800">Annual Revenue</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-900 mb-2">
                  <AnimatedCounter end={50000} suffix="+" />
                </div>
                <p className="text-purple-800">Oysters Harvested</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-900 mb-2">
                  <AnimatedCounter end={98} suffix="%" decimals={1} />
                </div>
                <p className="text-purple-800">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* 3D Tilt Cards Section */}
        <FadeInSection direction="up" delay={0.6}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
              3D Tilt Effects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TiltImageCard
                src="/topFarm.JPG"
                alt="Farm View"
                intensity={25}
                scale={1.08}
                className="h-64"
              />
              <TiltContentCard
                intensity={20}
                scale={1.05}
                className="h-64 p-6"
              >
                <h3 className="text-xl font-bold text-purple-900 mb-4">
                  Interactive Cards
                </h3>
                <p className="text-purple-800">
                  Move your mouse over these cards to see the 3D tilt effect in action.
                  Each card responds to mouse movement with realistic perspective.
                </p>
              </TiltContentCard>
              <TiltImageCard
                src="/farmlog.jpg"
                alt="Farm Operations"
                intensity={30}
                scale={1.1}
                className="h-64"
              />
            </div>
          </div>
        </FadeInSection>

        {/* Fade In Cards Section */}
        <FadeInSection direction="up" delay={0.8}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
              Scroll-Triggered Animations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FadeInCard direction="left" delay={0.1}>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 h-full">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">
                    Fade In Left
                  </h3>
                  <p className="text-purple-800">
                    This card fades in from the left when it comes into view.
                  </p>
                </div>
              </FadeInCard>
              
              <FadeInCard direction="up" delay={0.2}>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 h-full">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">
                    Fade In Up
                  </h3>
                  <p className="text-purple-800">
                    This card fades in from below when it comes into view.
                  </p>
                </div>
              </FadeInCard>
              
              <FadeInCard direction="right" delay={0.3}>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 h-full">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">
                    Fade In Right
                  </h3>
                  <p className="text-purple-800">
                    This card fades in from the right when it comes into view.
                  </p>
                </div>
              </FadeInCard>
            </div>
          </div>
        </FadeInSection>

        {/* Progress Bars Section */}
        <FadeInSection direction="up" delay={1.0}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
              Animated Progress Bars
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-purple-800 font-medium">Oyster Growth</span>
                  <span className="text-purple-800">85%</span>
                </div>
                <AnimatedProgressBar progress={85} color="#10b981" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-purple-800 font-medium">Water Quality</span>
                  <span className="text-purple-800">92%</span>
                </div>
                <AnimatedProgressBar progress={92} color="#3b82f6" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-purple-800 font-medium">Sustainability Score</span>
                  <span className="text-purple-800">98%</span>
                </div>
                <AnimatedProgressBar progress={98} color="#8b5cf6" />
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Floating Elements Section */}
        <FadeInSection direction="up" delay={1.2}>
          <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-16 overflow-hidden">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center relative z-10">
              Floating Background Elements
            </h2>
            <p className="text-purple-800 text-center relative z-10 mb-8">
              Notice the subtle floating bubbles and dots in the background. 
              These elements add life to the page without being distracting.
            </p>
            
            {/* Custom floating elements for this section */}
            <FloatingLeaves count={8} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="bg-white/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">
                  Subtle Animation
                </h3>
                <p className="text-purple-800">
                  Background animations should enhance the content, not compete with it.
                  These floating elements create a sense of movement and life.
                </p>
              </div>
              
              <div className="bg-white/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">
                  Performance Optimized
                </h3>
                <p className="text-purple-800">
                  All animations use CSS transforms and are optimized for smooth performance
                  across all devices and browsers.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Call to Action */}
        <FadeInSection direction="up" delay={1.4}>
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
        </FadeInSection>
      </div>
    </div>
  );
} 