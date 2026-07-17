import { Package } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Template } from '@/lib/schemas';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  template: Template;
}

const categoryColors: Record<string, string> = {
  'frontend-applications': 'border-l-amber-500',
  'backend-applications': 'border-l-teal-500',
  'full-stack-applications': 'border-l-violet-500',
  'monorepo-boilerplate': 'border-l-blue-500',
  'user-acceptance-testing': 'border-l-orange-500',
  'web-extension': 'border-l-cyan-500',
};

export function TemplateCard({ template }: TemplateCardProps) {
  const accentColor = categoryColors[template.category] ?? 'border-l-primary';
  return (
    <Card
      className={cn(
        'flex flex-col h-full overflow-hidden border-primary/10 transition-all duration-300 cursor-pointer group gradient-border-subtle hover-raise bg-card/70 backdrop-blur-sm border-l-4',
        accentColor,
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-10 w-10 rounded-md bg-gradient-to-br from-primary/20 to-teal-600/20 flex items-center justify-center group-hover:from-primary/40 group-hover:to-teal-600/40 transition-all duration-300">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div className="text-xs font-medium text-muted-foreground">{template.category}</div>
        </div>
        <CardTitle className="text-xl leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-teal-600 transition-all duration-300">
          {template.name}
        </CardTitle>
        <CardDescription className="line-clamp-3">{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-2">
        <div className="flex flex-wrap gap-1">
          {template.labels.slice(0, 3).map((label) => (
            <Badge
              key={label}
              variant="secondary"
              className="text-xs bg-secondary/50 backdrop-blur-sm transition-all duration-300 hover:bg-primary/20"
            >
              {label}
            </Badge>
          ))}
          {template.labels.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{template.labels.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">Type: {template.type}</CardFooter>
    </Card>
  );
}
