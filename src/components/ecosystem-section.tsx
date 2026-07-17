import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EcosystemEntry {
  name: string;
  slug: string;
  description: string;
  status: 'production' | 'beta' | 'planned';
  href: string;
  colors: {
    node1: string;
    node2: string;
    gradStart: string;
    gradEnd: string;
    glow: string;
    border: string;
    badge: string;
    badgeText: string;
  };
}

const ECOSYSTEM: EcosystemEntry[] = [
  {
    name: 'Create Python App',
    slug: 'create-python-app',
    description:
      'Composition-first scaffolding for Python — FastAPI, Django, Celery, CLIs, and uv workspaces with composable extensions.',
    status: 'beta',
    href: 'https://create-awesome-python-app.vercel.app',
    colors: {
      node1: '#3b82f6',
      node2: '#16a34a',
      gradStart: '#3b82f6',
      gradEnd: '#16a34a',
      glow: 'rgba(59,130,246,0.12)',
      border: 'rgba(59,130,246,0.25)',
      badge: 'rgba(59,130,246,0.12)',
      badgeText: '#60a5fa',
    },
  },
  {
    name: 'Create Node App',
    slug: 'create-node-app',
    description:
      'The original. Templates and extensions for the full Node.js ecosystem — React, NestJS, Next.js, Remix, Astro, Hono, and more.',
    status: 'production',
    href: 'https://github.com/Create-Node-App',
    colors: {
      node1: '#f59e0b',
      node2: '#0d9488',
      gradStart: '#f59e0b',
      gradEnd: '#0d9488',
      glow: 'rgba(245,158,11,0.15)',
      border: 'rgba(245,158,11,0.25)',
      badge: 'rgba(245,158,11,0.12)',
      badgeText: '#fbbf24',
    },
  },
  {
    name: 'Create Vlang App',
    slug: 'create-vlang-app',
    description:
      'Scaffolding for the V language — by a V core team member and author of vsl, vtl, rxv, and setup-v. Coming soon.',
    status: 'planned',
    href: 'https://github.com/Create-Vlang-App',
    colors: {
      node1: '#a78bfa',
      node2: '#06b6d4',
      gradStart: '#a78bfa',
      gradEnd: '#06b6d4',
      glow: 'rgba(167,139,250,0.12)',
      border: 'rgba(167,139,250,0.25)',
      badge: 'rgba(167,139,250,0.12)',
      badgeText: '#c4b5fd',
    },
  },
];

function NodeGraphIcon({ colors }: { colors: EcosystemEntry['colors'] }) {
  const id = `grad-${colors.node1.replace('#', '')}`;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.gradStart} />
          <stop offset="100%" stopColor={colors.gradEnd} />
        </linearGradient>
      </defs>
      <line
        x1="11"
        y1="14"
        x2="19"
        y2="20"
        stroke={colors.node1}
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="33"
        y1="14"
        x2="25"
        y2="20"
        stroke={colors.node2}
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="28"
        x2="22"
        y2="34"
        stroke={colors.node2}
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="9" cy="12" r="5" fill={colors.node1} fillOpacity="0.85" />
      <circle cx="35" cy="12" r="5" fill={colors.node2} fillOpacity="0.85" />
      <circle cx="22" cy="24" r="7" fill={`url(#${id})`} />
      <circle cx="22" cy="38" r="4" fill={colors.node2} fillOpacity="0.7" />
    </svg>
  );
}

function statusLabel(status: EcosystemEntry['status']) {
  if (status === 'production') return '✅ Production';
  if (status === 'beta') return '🧪 Beta';
  return '🔜 Planned';
}

export function EcosystemSection() {
  return (
    <section className="w-full py-12 md:py-20 border-t border-border/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Ecosystem expanding
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            One philosophy.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-[hsl(var(--brand-teal))] animate-gradient-text">
              Any language.
            </span>
          </h2>
          <p className="max-w-2xl text-muted-foreground md:text-lg">
            The composition-first scaffolding approach spans ecosystems. Start with Python Beta today — Node.js is
            production-ready, and V is on the way.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {ECOSYSTEM.map((entry) => (
            <Card
              key={entry.slug}
              className="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ borderColor: entry.colors.border }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: `linear-gradient(90deg, ${entry.colors.gradStart}, ${entry.colors.gradEnd})`,
                }}
              />

              <CardHeader className="pb-3 pt-5">
                <div className="flex items-start justify-between gap-3">
                  <NodeGraphIcon colors={entry.colors} />
                  <span
                    className="text-xs font-semibold rounded-full px-2.5 py-1 mt-0.5"
                    style={{
                      background: entry.colors.badge,
                      color: entry.colors.badgeText,
                    }}
                  >
                    {statusLabel(entry.status)}
                  </span>
                </div>
                <CardTitle className="text-base font-display mt-2">{entry.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{entry.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-xs gap-1.5 -ml-2 text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link href={entry.href} target="_blank" rel="noreferrer">
                    {entry.status === 'planned' ? (
                      <>
                        Follow on GitHub
                        <ExternalLink className="h-3 w-3" />
                      </>
                    ) : (
                      <>
                        Explore
                        <ArrowRight className="h-3 w-3" />
                      </>
                    )}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
