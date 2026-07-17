'use client';

import { BookOpen, ChevronRight, Code, Download, FileText, Home, Layers, Menu, Package, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/docs', icon: <Home className="h-4 w-4" /> },
      { label: 'Installation', href: '/docs/installation', icon: <Download className="h-4 w-4" /> },
      { label: 'AGENTS.md', href: '/docs/agents-md', icon: <FileText className="h-4 w-4" />, badge: 'NEW' },
    ],
  },
  {
    title: 'Templates',
    items: [
      { label: 'Overview', href: '/docs/templates', icon: <Layers className="h-4 w-4" /> },
      { label: 'Customization', href: '/docs/templates/customization', icon: <Code className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Extensions',
    items: [{ label: 'Overview', href: '/docs/extensions', icon: <Package className="h-4 w-4" /> }],
  },
  {
    title: 'Contributing & Reference',
    items: [
      { label: 'Contributing', href: '/docs/contributing', icon: <BookOpen className="h-4 w-4" /> },
      { label: 'Advanced Usage', href: '/docs/advanced/usage', icon: <ChevronRight className="h-4 w-4" /> },
    ],
  },
];

function SidebarContent() {
  const pathname = usePathname();
  const [query, setQuery] = useState('');

  const filtered = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="px-3 pt-3 pb-1">
        <h2 className="font-display text-sm font-semibold text-foreground">Documentation</h2>
      </div>
      <div className="px-3 pt-1">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <Home className="h-3 w-3" />
          Back to home
        </Link>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1 px-3 pb-4">
        <nav className="space-y-4">
          {filtered.map((group) => (
            <div key={group.title} className="space-y-1">
              <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{group.title}</p>
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                      active
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {item.icon}
                    {item.label}
                    {item.badge && (
                      <span className="ml-auto text-[10px] font-semibold rounded px-1 py-0.5 bg-primary/15 text-primary leading-none">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="px-2 py-4 text-sm text-muted-foreground text-center">No pages match &ldquo;{query}&rdquo;</p>
          )}
        </nav>
      </ScrollArea>
      <div className="px-3 pb-4 pt-2 border-t border-border/50 mt-auto">
        <a
          href="https://github.com/Create-Python-App/cpa-templates"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  );
}

export function DocsSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r bg-background/50 h-[calc(100vh-4rem)] sticky top-16">
        <SidebarContent />
      </aside>

      <div className="md:hidden fixed bottom-4 left-4 z-40">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Open docs navigation">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 pt-6">
            <SheetHeader className="px-4 pb-2">
              <SheetTitle className="flex items-center justify-between">
                Docs Navigation
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close">
                  <X className="h-4 w-4" />
                </Button>
              </SheetTitle>
            </SheetHeader>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
