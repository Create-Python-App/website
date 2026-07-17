'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { CommandMenu } from '@/components/command-menu';
import { PerformanceProvider } from '@/components/performance-provider';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';

export function LayoutShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <PerformanceProvider>
      <ThemeProvider defaultTheme="dark">
        <div className="flex min-h-screen flex-col">
          <SiteHeader onOpenCommand={() => setOpen(true)} />
          <CommandMenu open={open} onOpenChange={setOpen} />
          {children}
          <footer className="w-full border-t mt-16">
            {/* Stats row */}
            <div className="border-b border-border/50">
              <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-xs text-muted-foreground">
                <span>
                  <strong className="text-foreground font-display font-semibold">5</strong> templates
                </span>
                <span className="text-border">·</span>
                <span>
                  <strong className="text-foreground font-display font-semibold">8</strong> extensions
                </span>
                <span className="text-border">·</span>
                <span>
                  <strong className="text-foreground font-display font-semibold">9</strong> categories
                </span>
                <span className="text-border">·</span>
                <span>MIT licensed</span>
                <span className="text-border">·</span>
                <span>uv-first</span>
              </div>
            </div>
            {/* 4-column content */}
            <div className="container py-10">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                {/* Col 1 — Brand */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {/* Reuse the SVG logo (same as header but slightly smaller) */}
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="55%" stopColor="#2563eb" />
                          <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                      </defs>
                      <circle cx="18" cy="18" r="5" fill="url(#footerLogoGrad)" />
                      <circle cx="7" cy="9" r="3.5" fill="#3b82f6" fillOpacity="0.85" />
                      <circle cx="29" cy="9" r="3.5" fill="#16a34a" fillOpacity="0.85" />
                      <circle cx="18" cy="30" r="3.5" fill="#16a34a" fillOpacity="0.7" />
                      <line x1="9.5" y1="11" x2="14.5" y2="15" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="1.5" />
                      <line
                        x1="26.5"
                        y1="11"
                        x2="21.5"
                        y2="15"
                        stroke="#16a34a"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                      />
                      <line x1="18" y1="23" x2="18" y2="26.5" stroke="#16a34a" strokeOpacity="0.5" strokeWidth="1.5" />
                    </svg>
                    <span className="font-display text-sm font-semibold">create-python-app</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
                    One command. Any stack. Compose templates and extensions into production-ready Python apps.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} Create Awesome Python App.
                  </p>
                </div>
                {/* Col 2 — Resources */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Resources</p>
                  <nav className="flex flex-col gap-2">
                    {[
                      { href: '/templates', label: 'Templates' },
                      { href: '/extensions', label: 'Extensions' },
                      { href: '/docs', label: 'Documentation' },
                      { href: '/docs/contributing', label: 'Contributing Guide' },
                      {
                        href: 'https://github.com/Create-Python-App/cpa-templates/releases',
                        label: 'Changelog',
                        external: true,
                      },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noreferrer' : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                {/* Col 3 — Community */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Community</p>
                  <nav className="flex flex-col gap-2">
                    {[
                      { href: 'https://github.com/Create-Python-App', label: 'GitHub Organization', external: true },
                      {
                        href: 'https://pypi.org/project/create-awesome-python-app/',
                        label: 'PyPI Package',
                        external: true,
                      },
                      {
                        href: 'https://github.com/Create-Python-App/cpa-templates/issues/new?template=bug-report.yml',
                        label: 'Report an issue',
                        external: true,
                      },
                      {
                        href: 'https://github.com/Create-Python-App/cpa-templates/issues/new?template=feature-request.yml',
                        label: 'Request a feature',
                        external: true,
                      },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                {/* Col 4 — Ecosystem */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Ecosystem</p>
                  <nav className="flex flex-col gap-2">
                    <Link
                      href="https://github.com/Create-Python-App"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm transition-colors hover:text-foreground"
                    >
                      <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span className="text-muted-foreground hover:text-foreground transition-colors">
                        Python
                        <span className="ml-1.5 text-[10px] font-medium text-primary/80">beta</span>
                      </span>
                    </Link>
                    <Link
                      href="https://github.com/Create-Node-App"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm transition-colors hover:text-foreground"
                    >
                      <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                      <span className="text-muted-foreground hover:text-foreground transition-colors">
                        Node.js
                        <span className="ml-1.5 text-[10px] font-medium text-muted-foreground">sibling</span>
                      </span>
                    </Link>
                    <Link
                      href="https://github.com/Create-Vlang-App"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm transition-colors hover:text-foreground"
                    >
                      <span className="h-2 w-2 rounded-full bg-violet-500 shrink-0" />
                      <span className="text-muted-foreground hover:text-foreground transition-colors">
                        V language
                        <span className="ml-1.5 text-[10px] font-medium text-muted-foreground">soon</span>
                      </span>
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </PerformanceProvider>
  );
}
