'use client';

import { useEffect, useRef } from 'react';
import { usePerformanceMode } from '@/components/performance-provider';

interface ParticlesBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  linkColor?: string;
  speed?: number;
}

export function ParticlesBackground({
  className,
  particleCount = 50,
  particleColor = 'rgba(13, 148, 136, 0.55)',
  linkColor = 'rgba(245, 158, 11, 0.12)',
  speed = 0.5,
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { performanceMode } = usePerformanceMode();

  useEffect(() => {
    if (performanceMode) return; // skip heavy animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      dirX: number;
      dirY: number;
      size: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.dirX = (Math.random() - 0.5) * speed;
        this.dirY = (Math.random() - 0.5) * speed;
        this.size = Math.random() * 3 + 1;
      }

      update() {
        if (canvas && (this.x > canvas.width || this.x < 0)) {
          this.dirX = -this.dirX;
        }
        if (canvas && (this.y > canvas.height || this.y < 0)) {
          this.dirY = -this.dirY;
        }

        this.x += this.dirX;
        this.y += this.dirY;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = particleColor;
        ctx!.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        if (canvas) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          particles.push(new Particle(x, y));
        }
      }
    }

    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx!.beginPath();
            ctx!.strokeStyle = linkColor;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    }

    function animate() {
      if (canvas) {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      connect();
      animationFrameId = requestAnimationFrame(animate);
    }

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      init();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, particleColor, linkColor, speed, performanceMode]);

  if (performanceMode) return null;
  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className || ''}`} />;
}
