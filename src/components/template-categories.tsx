import { ArrowRight, Box, Code, Container, Database, Eye, GitBranch, Layers, Shield, Terminal } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Category } from '@/lib/schemas';

interface TemplateCategoriesProps {
  categories: Category[];
}

export function TemplateCategories({ categories }: TemplateCategoriesProps) {
  const categoryIcons: Record<string, React.ReactNode> = {
    'backend-applications': <Code className="h-5 w-5 text-primary" />,
    ci: <GitBranch className="h-5 w-5 text-green-500" />,
    containers: <Container className="h-5 w-5 text-blue-500" />,
    database: <Database className="h-5 w-5 text-green-600" />,
    editor: <Box className="h-5 w-5 text-blue-400" />,
    'cli-applications': <Terminal className="h-5 w-5 text-cyan-600" />,
    observability: <Eye className="h-5 w-5 text-violet-500" />,
    security: <Shield className="h-5 w-5 text-amber-500" />,
    monorepo: <Layers className="h-5 w-5 text-green-500" />,
  };

  const categoryColors: Record<string, { bg: string; hover: string; border: string }> = {
    'backend-applications': {
      bg: 'from-primary/20 to-green-600/20',
      hover: 'from-primary/40 to-green-600/40',
      border: 'border-primary/40',
    },
    ci: {
      bg: 'from-green-500/20 to-blue-500/20',
      hover: 'from-green-500/40 to-blue-500/40',
      border: 'border-green-500/40',
    },
    containers: {
      bg: 'from-blue-500/20 to-cyan-500/20',
      hover: 'from-blue-500/40 to-cyan-500/40',
      border: 'border-blue-500/40',
    },
    database: {
      bg: 'from-green-600/20 to-blue-500/20',
      hover: 'from-green-600/40 to-blue-500/40',
      border: 'border-green-600/40',
    },
    editor: {
      bg: 'from-blue-400/20 to-primary/20',
      hover: 'from-blue-400/40 to-primary/40',
      border: 'border-blue-400/40',
    },
    'cli-applications': {
      bg: 'from-cyan-500/20 to-green-600/20',
      hover: 'from-cyan-500/40 to-green-600/40',
      border: 'border-cyan-500/40',
    },
    observability: {
      bg: 'from-violet-500/20 to-blue-500/20',
      hover: 'from-violet-500/40 to-blue-500/40',
      border: 'border-violet-500/40',
    },
    security: {
      bg: 'from-amber-500/20 to-green-600/20',
      hover: 'from-amber-500/40 to-green-600/40',
      border: 'border-amber-500/40',
    },
    monorepo: {
      bg: 'from-green-500/20 to-primary/20',
      hover: 'from-green-500/40 to-primary/40',
      border: 'border-green-500/40',
    },
  };

  const fallback = categoryColors['backend-applications'];

  return (
    <>
      {categories.map((category) => {
        const colors = categoryColors[category.slug] || fallback;
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
              <CardTitle className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-green-600 transition-all duration-300">
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
