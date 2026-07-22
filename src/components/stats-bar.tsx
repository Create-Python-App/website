'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number | string;
  label: string;
  suffix?: string;
}

const STATS: Stat[] = [
  { value: 5, label: 'Templates' },
  { value: 12, label: 'Extensions' },
  { value: 9, label: 'Categories' },
  { value: 'MIT', label: 'Licensed' },
];

function Counter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export function StatsBar() {
  return (
    <div className="w-full border-y border-border/50 bg-muted/20">
      <div className="container flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6 md:gap-x-16">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-0.5">
            <span className="font-display text-2xl font-bold text-foreground md:text-3xl">
              {typeof stat.value === 'number' ? <Counter target={stat.value} /> : stat.value}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
