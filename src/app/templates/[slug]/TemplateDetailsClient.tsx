'use client';
import { ArrowLeft, ArrowRight, Check, Code, Github, Package, Puzzle, Server } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { AnimatedGradient } from '@/components/animated-gradient';
import { CopyButton } from '@/components/copy-button';
import { ExtensionCard } from '@/components/extension-card';
import { ParticlesBackground } from '@/components/particles-background';
import { TemplateExtensionCombo } from '@/components/template-extension-combo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Extension, Template } from '@/lib/schemas';

function getTemplateIcon(type: string) {
  switch (type) {
    case 'react':
    case 'vue':
      return <Code className="h-6 w-6 text-primary" />;
    case 'nestjs':
    case 'express':
      return <Server className="h-6 w-6 text-primary" />;
    default:
      return <Package className="h-6 w-6 text-primary" />;
  }
}

export interface TemplateDetailsClientProps {
  template: Template;
  compatibleExtensions: Extension[];
}

export function TemplateDetailsClient({ template, compatibleExtensions }: TemplateDetailsClientProps) {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <AnimatedGradient />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="mb-8 fade-in-up">
            <Link href="/templates">
              <Button variant="ghost" className="pl-0 hover:bg-background/20 transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Templates
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="fade-in-up-delay-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary/20 to-teal-600/20 flex items-center justify-center floating">
                  {getTemplateIcon(template.type)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600 animate-gradient-text glow-text">
                    {template.name}
                  </h1>
                  <p className="text-muted-foreground">{template.category}</p>
                </div>
              </div>

              <p className="text-lg mb-6">{template.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {template.labels.map((label) => (
                  <Badge
                    key={label}
                    variant="secondary"
                    className="bg-secondary/50 backdrop-blur-sm transition-all duration-300 hover:bg-primary/20"
                  >
                    {label}
                  </Badge>
                ))}
              </div>

              <Tabs defaultValue="overview" className="fade-in-up-delay-2">
                <TabsList className="mb-4 bg-background/50 backdrop-blur-sm">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-primary/20 transition-all duration-300"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="usage" className="data-[state=active]:bg-primary/20 transition-all duration-300">
                    Usage
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="data-[state=active]:bg-primary/20 transition-all duration-300"
                  >
                    Features
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                      About this template
                    </h3>
                    <p>
                      This template provides a solid foundation for building {template.type} applications. It comes with
                      all the essential tools and configurations to help you get started quickly.
                    </p>
                    <p>
                      The {template.name} template is designed to help developers jumpstart their projects with best
                      practices, modern tooling, and a well-structured codebase.
                    </p>
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                      Key Benefits
                    </h3>
                    <ul>
                      <li>Pre-configured development environment</li>
                      <li>Modern tooling and best practices</li>
                      <li>TypeScript support out of the box</li>
                      <li>Linting and formatting setup</li>
                      <li>Testing infrastructure ready to go</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="usage" className="space-y-4">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                      Getting Started
                    </h3>
                    <p>To use this template, run the following command:</p>
                    <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto shimmer">
                      <p>npx create-awesome-node-app --template {template.slug}</p>
                    </div>
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                      With Extensions
                    </h3>
                    <p>You can also add extensions to enhance your template:</p>
                    <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto shimmer">
                      <p>
                        npx create-awesome-node-app --template {template.slug} --addons{' '}
                        {compatibleExtensions.length >= 2
                          ? `${compatibleExtensions[0].slug} ${compatibleExtensions[1].slug}`
                          : compatibleExtensions.length === 1
                            ? compatibleExtensions[0].slug
                            : 'no-compatible-extensions-found'}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="space-y-4">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                      Core Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                      {[
                        {
                          title: 'TypeScript Support',
                          desc: 'Full TypeScript integration with properly configured tsconfig.',
                        },
                        {
                          title: 'Modern Tooling',
                          desc: 'ESLint, Prettier, and other tools preconfigured for code quality.',
                        },
                        {
                          title: 'Testing Setup',
                          desc: 'Testing framework and utilities ready for unit and integration tests.',
                        },
                        {
                          title: 'Optimized Build',
                          desc: 'Production-ready build configuration for optimal performance.',
                        },
                      ].map((f) => (
                        <Card key={f.title} className="bg-background/50 backdrop-blur-sm border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                              <Check className="h-5 w-5 mr-2 text-green-500" />
                              {f.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{f.desc}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-6 fade-in-up-delay-3">
              <Card className="backdrop-blur-sm bg-card/50 border-primary/10 gradient-border shimmer">
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription>Get up and running in seconds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto mb-4">
                    <p className="text-green-500">$ npx create-awesome-node-app \</p>
                    <p className="pl-4">--template {template.slug}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <CopyButton
                    className="w-full bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-600/90 glow transition-all duration-300"
                    command={`npx create-awesome-node-app --template ${template.slug}`}
                  />
                  <Link href={template.url} className="w-full" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="w-full backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-all duration-300"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="backdrop-blur-sm bg-card/50 border-primary/10 gradient-border shimmer">
                <CardHeader>
                  <CardTitle>Template Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                    <span className="text-muted-foreground shrink-0">Type</span>
                    <span className="font-medium min-w-0 break-words sm:text-right">{template.type}</span>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                    <span className="text-muted-foreground shrink-0">Category</span>
                    <span className="font-medium min-w-0 break-words sm:text-right">{template.category}</span>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                    <span className="text-muted-foreground shrink-0">Compatible Extensions</span>
                    <span className="font-medium sm:text-right">{compatibleExtensions.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParticlesBackground particleCount={30} speed={0.3} />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-amber-500 animate-gradient-text glow-text">
                Compatible Extensions
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Enhance your {template.name} with these powerful extensions
              </p>
            </div>
          </div>
          {compatibleExtensions.length > 0 ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {compatibleExtensions.map((extension, index) => (
                <div key={extension.slug} className={`fade-in-up-delay-${(index % 3) + 1}`}>
                  <ExtensionCard extension={extension} templateSlug={template.slug} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-background/30 backdrop-blur-sm rounded-lg border border-primary/10">
              <Puzzle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No compatible extensions found for this template.</p>
              <Button
                variant="outline"
                className="mt-4 backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-all duration-300"
                asChild
              >
                <Link href="/extensions">Browse All Extensions</Link>
              </Button>
            </div>
          )}
          {compatibleExtensions.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                size="lg"
                className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-all duration-300"
                asChild
              >
                <Link href="/extensions">
                  View All Extensions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {compatibleExtensions.length > 0 && (
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-50">
            <AnimatedGradient />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600 animate-gradient-text glow-text">
                  Recommended Combinations
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started quickly with these popular template and extension combinations
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
              {compatibleExtensions.slice(0, 4).map((extension, index) => (
                <div key={extension.slug} className={`fade-in-up-delay-${(index % 2) + 1}`}>
                  <TemplateExtensionCombo template={template} extension={extension} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <AnimatedGradient />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600 animate-gradient-text glow-text">
                Ready to Build?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start creating your awesome Node.js app with this template
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-600/90 glow transition-all duration-300"
                onClick={() => {
                  navigator.clipboard?.writeText?.(`npx create-awesome-node-app --template ${template.slug}`);
                }}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-all duration-300"
                asChild
              >
                <Link href="/extensions">Browse Extensions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
