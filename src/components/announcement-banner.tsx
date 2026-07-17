'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const bannerVariants = cva(
  'relative w-full flex items-center justify-center px-4 md:px-6 py-3 text-sm md:text-base font-medium',
  {
    variants: {
      variant: {
        gradient: 'bg-gradient-to-r from-blue-600 via-blue-500 to-green-600 text-white',
        subtle: 'bg-[hsl(var(--background))] border-b border-border/60 text-foreground/90 dark:text-foreground/80',
        accent: 'bg-[hsl(var(--primary)/0.15)] text-foreground',
      },
      size: {
        sm: 'py-2 text-xs md:text-sm',
        md: 'py-3',
        lg: 'py-4 md:text-lg',
      },
    },
    defaultVariants: { variant: 'gradient', size: 'md' },
  },
);

export interface AnnouncementBannerProps extends VariantProps<typeof bannerVariants> {
  icon?: ReactNode;
  label?: string;
  message: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
  dismissible?: boolean; // future enhancement
}

export function AnnouncementBanner({
  icon = <Sparkles className="h-5 w-5 shrink-0 text-yellow-300" />,
  label = 'NEW',
  message,
  ctaHref,
  ctaLabel = 'Learn more',
  className,
  variant,
  size,
}: AnnouncementBannerProps) {
  return (
    <div className={cn(bannerVariants({ variant, size }), className)}>
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        {variant === 'gradient' && (
          <>
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-40 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-400/15 to-green-500/20 animate-gradient-text" />
          </>
        )}
      </div>
      <div className="relative z-10 flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center sm:text-left">
        {icon}
        {label && (
          <span className="shrink-0 font-semibold bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent tracking-wide">
            {label}
          </span>
        )}
        <span className="min-w-0 text-balance">{message}</span>
        {ctaHref && (
          <Link
            href={ctaHref}
            className="inline-flex shrink-0 items-center gap-1 underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors group"
          >
            {ctaLabel}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
