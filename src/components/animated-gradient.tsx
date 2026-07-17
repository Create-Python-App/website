'use client';

import { useEffect, useRef } from 'react';
import { usePerformanceMode } from '@/components/performance-provider';

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className }: AnimatedGradientProps) {
  const { performanceMode } = usePerformanceMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (performanceMode) return; // Skip animation in performance mode
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let hue = 38; // Start with amber nest hue

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createGradient = (x: number, y: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(canvas.width, canvas.height) * 0.5);

      // Amber → teal nest range
      gradient.addColorStop(0, `hsla(${hue}, 92%, 50%, 0.35)`);
      gradient.addColorStop(0.5, `hsla(${(hue + 140) % 360}, 70%, 40%, 0.18)`);
      gradient.addColorStop(1, 'hsla(222, 47%, 11%, 0)');

      return gradient;
    };

    const render = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create multiple gradient points that move
      const time = Date.now() * 0.001;
      const points = [
        {
          x: canvas.width * (0.5 + 0.3 * Math.sin(time * 0.3)),
          y: canvas.height * (0.5 + 0.2 * Math.cos(time * 0.2)),
        },
        {
          x: canvas.width * (0.5 + 0.25 * Math.sin(time * 0.4 + 2)),
          y: canvas.height * (0.5 + 0.3 * Math.cos(time * 0.3 + 1)),
        },
        {
          x: canvas.width * (0.5 + 0.2 * Math.sin(time * 0.5 + 4)),
          y: canvas.height * (0.5 + 0.25 * Math.cos(time * 0.4 + 3)),
        },
      ];

      // Draw each gradient point
      points.forEach((point) => {
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = createGradient(point.x, point.y);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Slowly oscillate between amber and teal
      hue = 38 + Math.sin(Date.now() * 0.0003) * 20;

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [performanceMode]);

  if (performanceMode) {
    return null;
  }
  return (
    <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className || ''}`} style={{ opacity: 0.8 }} />
  );
}
