"use client";

import React, { useEffect, useRef } from 'react';

interface FloatingParticlesProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
}

export function FloatingParticles({ 
  className = '', 
  particleCount = 8,
  interactive = true 
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      type: 'bubble' | 'dot';

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.type = Math.random() > 0.5 ? 'bubble' : 'dot';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x <= 0 || this.x >= canvas.width) {
          this.speedX *= -0.8;
          this.x = Math.max(0, Math.min(canvas.width, this.x));
        }
        if (this.y <= 0 || this.y >= canvas.height) {
          this.speedY *= -0.8;
          this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        // Add gentle drift
        this.speedX += (Math.random() - 0.5) * 0.01;
        this.speedY += (Math.random() - 0.5) * 0.01;

        // Limit speed
        this.speedX = Math.max(-0.5, Math.min(0.5, this.speedX));
        this.speedY = Math.max(-0.5, Math.min(0.5, this.speedY));
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);

        if (this.type === 'bubble') {
          // Draw bubble
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Inner glow
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fill();
          
          // Highlight
          ctx.beginPath();
          ctx.arc(this.size * 0.3, -this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fill();
        } else {
          // Draw dot
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    if (interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        // Reset mouse moving flag after a delay
        setTimeout(() => {
          isMouseMoving = false;
        }, 100);
      };

      document.addEventListener('mousemove', handleMouseMove);

      // Apply mouse repulsion to particles
      particles.forEach(particle => {
        if (isMouseMoving) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            
            particle.speedX -= Math.cos(angle) * force * 0.5;
            particle.speedY -= Math.sin(angle) * force * 0.5;
          }
        }
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [particleCount, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}

// Specialized floating elements for different themes
export function FloatingBubbles({ count = 8, className = "" }: { count?: number; className?: string }) {
  return (
    <FloatingParticles
      particleCount={count}
      className={className}
      interactive={true}
    />
  );
}

export function FloatingDots({ count = 12, className = "" }: { count?: number; className?: string }) {
  return (
    <FloatingParticles
      particleCount={count}
      className={className}
      interactive={true}
    />
  );
}

export function FloatingLeaves({ count = 6, className = "" }: { count?: number; className?: string }) {
  return (
    <FloatingParticles
      particleCount={count}
      className={className}
      interactive={true}
    />
  );
} 