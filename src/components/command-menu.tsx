'use client';

import { Command } from 'cmdk';
import { BookOpen, FileIcon, Layers, Package, Rocket, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { usePerformanceMode } from '@/components/performance-provider';
import { cn } from '@/lib/utils';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates?: { name: string; slug: string }[];
  extensions?: { name: string; slug: string }[];
}

export function CommandMenu({ open, onOpenChange, templates = [], extensions = [] }: CommandMenuProps) {
  const router = useRouter();
  const { performanceMode, togglePerformanceMode } = usePerformanceMode();
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const run = (cb: () => void) => {
    cb();
    onOpenChange(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed inset-0 z-[100] flex items-start justify-center px-4 pt-24 md:pt-40 pb-10 backdrop-blur-sm bg-background/40 transition-opacity',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <Command
        loop
        className="w-full max-w-xl rounded-lg border border-border/60 bg-background/90 backdrop-blur-md shadow-xl elevation-high overflow-hidden animate-in fade-in-0 zoom-in-95"
      >
        <div className="flex items-center border-b">
          <Command.Input
            autoFocus
            placeholder="Search templates, extensions, docs..."
            className="flex h-12 w-full bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={() => onOpenChange(false)}
            className="px-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close command menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <Command.List className="max-h-[400px] overflow-y-auto p-1">
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No results found.</Command.Empty>
          <Command.Group heading="Navigation">
            <Command.Item
              value="home"
              onSelect={() => run(() => router.push('/'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <FileIcon className="h-4 w-4 text-primary" /> Home
            </Command.Item>
            <Command.Item
              value="docs"
              onSelect={() => run(() => router.push('/docs'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-primary" /> Docs
            </Command.Item>
            <Command.Item
              value="templates"
              onSelect={() => run(() => router.push('/templates'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <Layers className="h-4 w-4 text-primary" /> Templates
            </Command.Item>
            <Command.Item
              value="extensions"
              onSelect={() => run(() => router.push('/extensions'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <Package className="h-4 w-4 text-primary" /> Extensions
            </Command.Item>
          </Command.Group>
          <Command.Group heading="Docs">
            <Command.Item
              value="docs-introduction"
              onSelect={() => run(() => router.push('/docs'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-primary" /> Docs — Introduction
            </Command.Item>
            <Command.Item
              value="docs-installation"
              onSelect={() => run(() => router.push('/docs/installation'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-primary" /> Docs — Installation
            </Command.Item>
            <Command.Item
              value="docs-agents-md"
              onSelect={() => run(() => router.push('/docs/agents-md'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-primary" /> Docs — AGENTS.md
            </Command.Item>
            <Command.Item
              value="docs-templates"
              onSelect={() => run(() => router.push('/docs/templates'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-primary" /> Docs — Templates
            </Command.Item>
            <Command.Item
              value="docs-templates-customization"
              onSelect={() => run(() => router.push('/docs/templates/customization'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-primary" /> Docs — Template Customization
            </Command.Item>
            <Command.Item
              value="docs-extensions"
              onSelect={() => run(() => router.push('/docs/extensions'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-primary" /> Docs — Extensions
            </Command.Item>
            <Command.Item
              value="docs-contributing"
              onSelect={() => run(() => router.push('/docs/contributing'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-primary" /> Docs — Contributing
            </Command.Item>
            <Command.Item
              value="docs-advanced-usage"
              onSelect={() => run(() => router.push('/docs/advanced/usage'))}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-primary" /> Docs — Advanced Usage
            </Command.Item>
          </Command.Group>
          <Command.Group heading="System">
            <Command.Item
              value="toggle-performance"
              onSelect={() => run(() => togglePerformanceMode())}
              className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
            >
              <Rocket className="h-4 w-4 text-primary" /> {performanceMode ? 'Disable' : 'Enable'} Performance Mode
            </Command.Item>
          </Command.Group>
          {templates.length > 0 && (
            <Command.Group heading="Templates">
              {templates.slice(0, 8).map((t) => (
                <Command.Item
                  key={t.slug}
                  value={`template-${t.slug}`}
                  onSelect={() => run(() => router.push(`/templates/${t.slug}`))}
                  className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
                >
                  <Layers className="h-4 w-4 text-primary" /> {t.name}
                </Command.Item>
              ))}
            </Command.Group>
          )}
          {extensions.length > 0 && (
            <Command.Group heading="Extensions">
              {extensions.slice(0, 8).map((e) => (
                <Command.Item
                  key={e.slug}
                  value={`extension-${e.slug}`}
                  onSelect={() => run(() => router.push(`/extensions/${e.slug}`))}
                  className="flex items-center gap-2 px-3 py-2 rounded-md aria-selected:bg-primary/10 aria-selected:text-foreground cursor-pointer"
                >
                  <Package className="h-4 w-4 text-primary" /> {e.name}
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>
        <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground bg-background/60">
          <div>Press Esc to close</div>
          <div className="flex items-center gap-1">
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium">Ctrl</kbd>
            <span>+</span>
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium">K</kbd>
          </div>
        </div>
      </Command>
    </div>
  );
}
