import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Extension, Template } from '@/lib/schemas';

interface TemplateExtensionComboProps {
  template: Template;
  extension: Extension;
}

export function TemplateExtensionCombo({ template, extension }: TemplateExtensionComboProps) {
  return (
    <div className="relative">
      <Card className="bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-md bg-gradient-to-br from-primary/20 to-teal-600/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">T</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium break-words">{template.name}</h3>
                  <p className="text-xs text-muted-foreground">{template.type}</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground rotate-90 sm:rotate-0 self-center" />
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-md bg-gradient-to-br from-teal-600/20 to-amber-500/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-teal-600">E</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium break-words">{extension.name}</h3>
                  <p className="text-xs text-muted-foreground">{extension.category}</p>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
              <p className="text-green-500">$ uvx create-awesome-python-app \</p>
              <p className="pl-4 break-all">--template {template.slug} \</p>
              <p className="pl-4 break-all">--addons {extension.slug}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-primary/20 via-teal-600/20 to-amber-500/20 -z-10 animate-pulse"></div>
    </div>
  );
}
