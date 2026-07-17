import { Puzzle } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Extension } from '@/lib/schemas';

interface ExtensionCardProps {
  extension: Extension;
  templateSlug?: string; // Optional template slug for context-aware linking
}

export function ExtensionCard({ extension, templateSlug }: ExtensionCardProps) {
  // Determine the link based on context
  const href = templateSlug
    ? `/templates/${templateSlug}/extensions/${extension.slug}`
    : `/extensions/${extension.slug}`;

  return (
    <Link href={href}>
      <Card className="flex flex-col h-full overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10 hover:-translate-y-2 cursor-pointer group gradient-border-subtle hover-raise bg-card/70 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-green-600/20 to-blue-500/20 flex items-center justify-center group-hover:from-green-600/40 group-hover:to-blue-500/40 transition-all duration-300">
              <Puzzle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-xs font-medium text-muted-foreground">{extension.category}</div>
          </div>
          <CardTitle className="text-xl leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-500 transition-all duration-300">
            {extension.name}
          </CardTitle>
          <CardDescription className="line-clamp-3">{extension.description}</CardDescription>
          <div className="flex flex-wrap gap-1 mt-2">
            {(Array.isArray(extension.type) ? extension.type : [extension.type]).map((t) => (
              <span
                key={t}
                className="text-[10px] rounded border border-border/60 px-1.5 py-0.5 text-muted-foreground font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-1 pt-2">
          <div className="flex flex-wrap gap-1">
            {extension.labels.slice(0, 3).map((label) => (
              <Badge
                key={label}
                variant="secondary"
                className="text-xs bg-secondary/50 backdrop-blur-sm transition-all duration-300 hover:bg-green-600/20"
              >
                {label}
              </Badge>
            ))}
            {extension.labels.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{extension.labels.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-start gap-x-1 gap-y-1 text-xs text-muted-foreground">
          <span className="shrink-0">Compatible with:</span>
          <span className="min-w-0 break-words">
            {Array.isArray(extension.type) ? extension.type.join(', ') : extension.type}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
