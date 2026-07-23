'use client';

import { Gauge, Github, Menu, Package, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CommunityLogo } from '@/components/community-logo';
import { usePerformanceMode } from '@/components/performance-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DISCORD_INVITE_URL } from '@/lib/community';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/templates', label: 'Templates' },
  { href: '/extensions', label: 'Extensions' },
  { href: '/docs', label: 'Docs' },
];

export function SiteHeader({ onOpenCommand }: { onOpenCommand?: () => void }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { performanceMode, togglePerformanceMode } = usePerformanceMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors backdrop-blur supports-[backdrop-filter]:bg-background/60',
        scrolled
          ? 'bg-background/85 shadow-sm border-b border-primary/10'
          : 'bg-background/40 border-b border-transparent',
      )}
    >
      <div className="container flex h-16 items-center gap-2 sm:gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 group" aria-label="Create Python App home">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="55%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>
            {/* Center node */}
            <circle cx="18" cy="18" r="5" fill="url(#logoGrad)" />
            {/* Top-left node */}
            <circle cx="7" cy="9" r="3.5" fill="#3b82f6" fillOpacity="0.85" />
            {/* Top-right node */}
            <circle cx="29" cy="9" r="3.5" fill="#16a34a" fillOpacity="0.85" />
            {/* Bottom node */}
            <circle cx="18" cy="30" r="3.5" fill="#16a34a" fillOpacity="0.7" />
            {/* Edges */}
            <line x1="9.5" y1="11" x2="14.5" y2="15" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="26.5" y1="11" x2="21.5" y2="15" stroke="#16a34a" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="18" y1="23" x2="18" y2="26.5" stroke="#16a34a" strokeOpacity="0.5" strokeWidth="1.5" />
          </svg>
          <div className="hidden min-w-0 flex-col sm:flex">
            <span className="font-display text-sm font-semibold leading-tight tracking-tight truncate">
              create-python-app
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight hidden md:block">
              one command · any stack
            </span>
          </div>
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                  active && 'text-foreground',
                )}
              >
                <span>{item.label}</span>
                {active && (
                  <span className="absolute left-1/2 -bottom-px h-1 w-1 -translate-x-1/2 rounded-full bg-primary animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
        <Button
          size="sm"
          className="hidden lg:inline-flex bg-gradient-to-r from-primary to-[hsl(var(--brand-teal))] text-white border-0 hover:opacity-90 transition-opacity glow text-xs font-medium"
          asChild
        >
          <Link href="/templates">Get started</Link>
        </Button>
        <div className="ml-auto flex items-center gap-0.5 sm:gap-1 md:gap-2 lg:ml-0">
          <Button
            variant={performanceMode ? 'secondary' : 'ghost'}
            size="icon"
            aria-label="Toggle performance mode"
            onClick={togglePerformanceMode}
            className={cn('hidden sm:inline-flex', performanceMode && 'text-primary')}
          >
            <Gauge className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            aria-label="Open command palette (Ctrl+K)"
            onClick={onOpenCommand}
          >
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Link href="https://pypi.org/project/create-awesome-python-app/" target="_blank" aria-label="PyPI Package">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Package className="h-5 w-5" />
            </Button>
          </Link>
          <Link href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer" aria-label="Discord Community">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <CommunityLogo size={20} className="rounded" />
            </Button>
          </Link>
          <Link href="https://github.com/Create-Python-App" target="_blank" aria-label="GitHub">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Search" onClick={onOpenCommand}>
            <Search className="h-4 w-4" />
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle>Navigate</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted',
                        active ? 'bg-muted text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
