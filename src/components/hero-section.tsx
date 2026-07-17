import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  sideVisual?: ReactNode; // e.g., cards stack or illustration
  className?: string;
  containerClassName?: string;
  glow?: boolean;
  subtle?: boolean;
}

export function HeroSection({
  title,
  description,
  actions,
  sideVisual,
  className,
  containerClassName,
  glow = true,
  subtle = false,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden w-full py-16 md:py-24 lg:py-32 xl:py-44',
        subtle
          ? 'bg-gradient-to-b from-background to-background/80'
          : 'bg-gradient-to-b from-background via-background/60 to-background/20',
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 opacity-70">
        {!subtle && <div className="radial-layer pointer-events-none select-none w-full h-full" />}
      </div>
      <div className="absolute inset-0 -z-10">
        {/* Grid mask */}
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_70%)]" />
      </div>
      {glow && (
        <div className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen opacity-30">
          <div className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-[hsl(var(--primary)/0.45)] blur-[130px]" />
          <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-[hsl(var(--brand-teal)/0.35)] blur-[110px]" />
        </div>
      )}
      <div className={cn('container relative', containerClassName)}>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="space-y-4">
              <h1 className="text-balance font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-gradient-primary animate-gradient-text">
                {title}
              </h1>
              {description && (
                <p className="text-muted-foreground text-balance md:text-xl leading-relaxed fade-in-up-delay-1">
                  {description}
                </p>
              )}
            </div>
            {actions && <div className="flex flex-col sm:flex-row gap-3 fade-in-up-delay-2">{actions}</div>}
          </div>
          {sideVisual && (
            <div className="relative hidden md:flex items-center justify-center fade-in-up-delay-3 min-h-[320px]">
              {sideVisual}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
