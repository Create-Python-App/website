import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Template } from '@/lib/schemas';

type FeaturedTemplateProps = Pick<Template, 'name' | 'slug' | 'description' | 'type' | 'category' | 'labels'>;

export function FeaturedTemplate({ name, slug, description, type: _, category, labels }: FeaturedTemplateProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden border-primary/10 transition-all duration-300 group gradient-border-subtle hover-raise elevation-low hover:elevation-md bg-card/80 backdrop-blur">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-10 w-10 shrink-0 rounded-md bg-gradient-to-br from-primary/20 to-green-600/20 flex items-center justify-center group-hover:from-primary/40 group-hover:to-green-600/40 transition-all duration-300">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div className="text-xs font-medium text-muted-foreground truncate">{category}</div>
        </div>
        <CardTitle className="text-xl leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-green-600 transition-all duration-300">
          {name}
        </CardTitle>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <div className="flex flex-wrap gap-1 mb-4">
          {labels.slice(0, 3).map((label) => (
            <Badge
              key={label}
              variant="secondary"
              className="text-xs bg-secondary/50 backdrop-blur-sm transition-all duration-300 hover:bg-primary/20"
            >
              {label}
            </Badge>
          ))}
          {labels.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{labels.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          className="w-full justify-between group-hover:text-primary transition-all duration-300"
          asChild
        >
          <Link href={`/templates/${slug}`}>
            View Template
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
