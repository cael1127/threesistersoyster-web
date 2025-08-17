"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'bubble' | 'dot' | 'leaf';
  rotation: number;
  rotationSpeed: number;
}

interface FloatingParticlesProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
}

export function FloatingParticles({ 
  className = '', 
  particleCount = 15,
  interactive = true 
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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

    // Initialize particles
    const initParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 6 + 3,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.8 + 0.4,
          type: Math.random() > 0.7 ? 'leaf' : Math.random() > 0.5 ? 'bubble' : 'dot',
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.8
        });
      }
      setParticles(newParticles);
    };

    initParticles();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Mouse enter/leave handlers
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    if (interactive) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          let newSpeedX = particle.speedX;
          let newSpeedY = particle.speedY;
          let newOpacity = particle.opacity;

          // Mouse interaction
          if (interactive && isHovering) {
            const dx = mousePos.x - particle.x;
            const dy = mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;

            if (distance < maxDistance) {
              const force = (maxDistance - distance) / maxDistance;
              const angle = Math.atan2(dy, dx);
              
              // Gentle repulsion effect
              newSpeedX -= Math.cos(angle) * force * 0.008;
              newSpeedY -= Math.sin(angle) * force * 0.008;
              
              // Increase opacity when near mouse
              newOpacity = Math.min(particle.opacity + force * 0.3, 0.8);
            }
          }

          // Bounce off edges
          if (newX <= 0 || newX >= canvas.width) {
            newSpeedX *= -0.8;
            newX = Math.max(0, Math.min(canvas.width, newX));
          }
          if (newY <= 0 || newY >= canvas.height) {
            newSpeedY *= -0.8;
            newY = Math.max(0, Math.min(canvas.height, newY));
          }

          // Add some randomness to movement
          newSpeedX += (Math.random() - 0.5) * 0.0003;
          newSpeedY += (Math.random() - 0.5) * 0.0003;

          // Limit speed
          newSpeedX = Math.max(-1, Math.min(1, newSpeedX));
          newSpeedY = Math.max(-1, Math.min(1, newSpeedY));

          return {
            ...particle,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
            opacity: newOpacity,
            rotation: particle.rotation + particle.rotationSpeed
          };
        })
      );

      // Draw particles
      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);

                 if (particle.type === 'bubble') {
           // Draw bubble with enhanced visibility
           ctx.beginPath();
           ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
           ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
           ctx.lineWidth = 2;
           ctx.stroke();
           
           // Enhanced inner glow
           ctx.beginPath();
           ctx.arc(0, 0, particle.size * 0.7, 0, Math.PI * 2);
           ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
           ctx.fill();
           
           // Add highlight dot
           ctx.beginPath();
           ctx.arc(particle.size * 0.3, -particle.size * 0.3, particle.size * 0.2, 0, Math.PI * 2);
           ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
           ctx.fill();
         } else if (particle.type === 'leaf') {
           // Enhanced leaf with better visibility
           ctx.fillStyle = 'rgba(144, 238, 144, 0.6)';
           ctx.beginPath();
           ctx.ellipse(0, 0, particle.size * 1.5, particle.size * 0.8, 0, 0, Math.PI * 2);
           ctx.fill();
           
           // Add leaf vein
           ctx.strokeStyle = 'rgba(144, 238, 144, 0.8)';
           ctx.lineWidth = 1;
           ctx.beginPath();
           ctx.moveTo(-particle.size * 0.8, 0);
           ctx.lineTo(particle.size * 0.8, 0);
           ctx.stroke();
         } else {
           // Enhanced dot with glow effect
           ctx.beginPath();
           ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
           ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
           ctx.fill();
           
           // Add outer glow
           ctx.beginPath();
           ctx.arc(0, 0, particle.size * 1.3, 0, Math.PI * 2);
           ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
           ctx.fill();
         }

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [particleCount, interactive, mousePos, isHovering, particles]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}

// Specialized floating elements for different themes
export function FloatingBubbles({ count = 15, className = "" }: { count?: number; className?: string }) {
  return (
    <FloatingParticles
      count={count}
      className={className}
      color="rgba(255, 255, 255, 0.15)"
      sizeRange={[4, 12]}
      durationRange={[15, 30]}
    />
  );
}

export function FloatingDots({ count = 25, className = "" }: { count?: number; className?: string }) {
  return (
    <FloatingParticles
      count={count}
      className={className}
      color="rgba(255, 255, 255, 0.08)"
      sizeRange={[1, 3]}
      durationRange={[25, 45]}
    />
  );
}

export function FloatingLeaves({ count = 10, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/20 text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -200, -400],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
} 