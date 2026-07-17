import { ArrowRight, Code, Database, GitBranch, Globe, Layers, TestTube } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Category } from '@/lib/schemas';

interface TemplateCategoriesProps {
  categories: Category[];
}

export function TemplateCategories({ categories }: TemplateCategoriesProps) {
  // Map of category slugs to their respective icons
  const categoryIcons: Record<string, React.ReactNode> = {
    'frontend-applications': <Code className="h-5 w-5 text-primary" />,
    'backend-applications': <Database className="h-5 w-5 text-teal-600" />,
    'fullstack-applications': <Layers className="h-5 w-5 text-amber-500" />,
    'monorepo-boilerplate': <GitBranch className="h-5 w-5 text-green-500" />,
    'user-acceptance-testing': <TestTube className="h-5 w-5 text-amber-500" />,
    'web-extension': <Globe className="h-5 w-5 text-blue-500" />,
  };

  // Map of category slugs to their respective color classes
  const categoryColors: Record<string, { bg: string; hover: string; border: string }> = {
    'frontend-applications': {
      bg: 'from-primary/20 to-teal-600/20',
      hover: 'from-primary/40 to-teal-600/40',
      border: 'border-primary/40',
    },
    'backend-applications': {
      bg: 'from-teal-600/20 to-amber-500/20',
      hover: 'from-teal-600/40 to-amber-500/40',
      border: 'border-teal-600/40',
    },
    'fullstack-applications': {
      bg: 'from-amber-500/20 to-teal-600/20',
      hover: 'from-amber-500/40 to-teal-600/40',
      border: 'border-amber-500/40',
    },
    'monorepo-boilerplate': {
      bg: 'from-green-500/20 to-teal-500/20',
      hover: 'from-green-500/40 to-teal-500/40',
      border: 'border-green-500/40',
    },
    'user-acceptance-testing': {
      bg: 'from-amber-500/20 to-orange-500/20',
      hover: 'from-amber-500/40 to-orange-500/40',
      border: 'border-amber-500/40',
    },
    'web-extension': {
      bg: 'from-blue-500/20 to-cyan-500/20',
      hover: 'from-blue-500/40 to-cyan-500/40',
      border: 'border-blue-500/40',
    },
  };

  return (
    <>
      {categories.map((category) => {
        const colors = categoryColors[category.slug] || categoryColors['frontend-applications'];
        const icon = categoryIcons[category.slug] || <Code className="h-5 w-5 text-primary" />;

        return (
          <Card
            key={category.slug}
            className="flex flex-col overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-2 group gradient-border shimmer"
          >
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`h-10 w-10 rounded-md bg-gradient-to-br ${colors.bg} flex items-center justify-center group-hover:${colors.hover} transition-all duration-300`}
                >
                  {icon}
                </div>
              </div>
              <CardTitle className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-teal-600 transition-all duration-300">
                {category.name}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{category.details}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className={`w-full backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-all duration-300 group-hover:${colors.border}`}
                asChild
              >
                <Link href={`/templates?category=${category.slug}`}>
                  View Templates
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}
