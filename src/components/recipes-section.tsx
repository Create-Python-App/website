import { ArrowRight, Layers, Server, Sparkles, Workflow } from 'lucide-react';
import Link from 'next/link';
import type { ElementType } from 'react';
import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';

interface Recipe {
  title: string;
  description: string;
  icon: ElementType;
  labels: string[];
  command: {
    base: string;
    templateFlag: string;
    templateValue: string;
    addonsFlag?: string;
    addonsValue?: string;
  };
  rawCommand: string;
  href: string;
}

const recipes: Recipe[] = [
  {
    title: 'Modern SPA',
    description: 'React + Vite with Tailwind and Zustand for a fast client app.',
    icon: Layers,
    labels: ['React', 'Vite', 'Tailwind', 'Zustand'],
    command: {
      base: 'npx create-awesome-node-app my-app ',
      templateFlag: '--template',
      templateValue: ' react-vite-boilerplate ',
      addonsFlag: '--addons',
      addonsValue: ' tailwind-css zustand vitest-react-testing-library',
    },
    rawCommand:
      'npm create awesome-node-app@latest my-spa -- --template react-vite-boilerplate --addons tailwind-css zustand --no-interactive',
    href: '/templates/react-vite-boilerplate',
  },
  {
    title: 'Full-stack web',
    description: 'Next.js with Auth.js and Drizzle for a production app foundation.',
    icon: Workflow,
    labels: ['Next.js', 'Auth.js', 'Drizzle', 'PostgreSQL'],
    command: {
      base: 'npx create-awesome-node-app my-app ',
      templateFlag: '--template',
      templateValue: ' nextjs-starter ',
      addonsFlag: '--addons',
      addonsValue: ' nextjs-auth nextjs-drizzle-postgres',
    },
    rawCommand:
      'npm create awesome-node-app@latest my-app -- --template nextjs-starter --addons nextjs-auth nextjs-drizzle-postgres --no-interactive',
    href: '/templates/nextjs-starter',
  },
  {
    title: 'API platform',
    description: 'NestJS with Docker and GitHub Actions for a shippable backend.',
    icon: Server,
    labels: ['NestJS', 'Docker', 'GitHub Actions', 'OpenAPI'],
    command: {
      base: 'npx create-awesome-node-app my-api ',
      templateFlag: '--template',
      templateValue: ' nestjs-boilerplate ',
      addonsFlag: '--addons',
      addonsValue: ' docker-compose-setup github-setup',
    },
    rawCommand:
      'npm create awesome-node-app@latest my-api -- --template nestjs-boilerplate --addons docker-compose-setup github-setup --no-interactive',
    href: '/templates/nestjs-boilerplate',
  },
  {
    title: 'SaaS + AI flagship',
    description: 'Multi-tenant Next.js SaaS with AI, Auth, and pgvector built in.',
    icon: Sparkles,
    labels: ['Next.js', 'AI', 'pgvector', 'Multi-tenant'],
    command: {
      base: 'npx create-awesome-node-app my-saas ',
      templateFlag: '--template',
      templateValue: ' nextjs-saas-ai-starter',
    },
    rawCommand: 'npm create awesome-node-app@latest my-saas -- --template nextjs-saas-ai-starter --no-interactive',
    href: '/templates/nextjs-saas-ai-starter',
  },
];

export function RecipesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Popular recipes</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">
              Choose a path. Ship faster.
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Curated template + addon combinations with copy-paste commands.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl divide-y divide-border/40">
          {recipes.map((recipe, index) => {
            const Icon = recipe.icon;
            return (
              <div
                key={recipe.title}
                className={`flex flex-col md:flex-row md:items-center gap-6 py-8 px-4 rounded-lg ${index % 2 === 1 ? 'bg-muted/20' : 'bg-transparent'}`}
              >
                {/* Left: icon + title + description + labels */}
                <div className="flex-1 space-y-3 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-md bg-gradient-to-br from-amber-500/20 to-teal-600/20 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg leading-snug">{recipe.title}</h3>
                      <p className="text-sm text-muted-foreground">{recipe.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-1">
                    {recipe.labels.map((label) => (
                      <span
                        key={label}
                        className="inline-block rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: syntax-highlighted command block + actions */}
                <div className="flex-1 space-y-3 min-w-0">
                  <div className="rounded-lg bg-card/60 border border-border/50 p-3 font-mono text-xs overflow-x-auto">
                    <span className="text-muted-foreground">{recipe.command.base}</span>
                    <span className="text-primary font-medium">{recipe.command.templateFlag}</span>
                    <span className="text-foreground">{recipe.command.templateValue}</span>
                    {recipe.command.addonsFlag && (
                      <>
                        <span className="text-[hsl(var(--brand-teal))] font-medium">{recipe.command.addonsFlag}</span>
                        <span className="text-foreground">{recipe.command.addonsValue}</span>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <CopyButton command={recipe.rawCommand} size="sm" className="w-full sm:w-auto" />
                    <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                      <Link href={recipe.href}>
                        View template
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
