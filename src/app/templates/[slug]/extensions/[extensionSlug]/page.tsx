'use client';

import { ArrowLeft, Check, Loader2, Package, Puzzle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { AnimatedGradient } from '@/components/animated-gradient';
import { CopyButton } from '@/components/copy-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTemplatesData } from '@/lib/data';
import type { Extension, Template } from '@/lib/schemas';
import { isCompatible } from '@/lib/utils';

export default function TemplateExtensionPage({
  params,
}: {
  params: Promise<{ slug: string; extensionSlug: string }>;
}) {
  const [resolvedParams, setResolvedParams] = useState<{
    slug: string;
    extensionSlug: string;
  } | null>(null);
  const [template, setTemplate] = useState<Template | null>(null);
  const [extension, setExtension] = useState<Extension | null>(null);
  const [isExtensionCompatible, setIsExtensionCompatible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    async function fetchData() {
      if (!resolvedParams) return;

      setIsLoading(true);
      const { templates, extensions } = await getTemplatesData();

      const foundTemplate = templates.find((t) => t.slug === resolvedParams.slug);
      const foundExtension = extensions.find((e) => e.slug === resolvedParams.extensionSlug);

      if (!foundTemplate || !foundExtension) {
        notFound();
        return;
      }

      setTemplate(foundTemplate);
      setExtension(foundExtension);

      // Check if the extension is compatible with the template
      setIsExtensionCompatible(isCompatible(foundTemplate, foundExtension));
      setIsLoading(false);
    }

    fetchData();
  }, [resolvedParams?.slug, resolvedParams?.extensionSlug]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!template || !extension) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-50">
            <AnimatedGradient />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mb-8 fade-in-up">
              <Link href={`/templates/${template.slug}`}>
                <Button variant="ghost" className="pl-0 hover:bg-background/20 transition-all duration-300">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to {template.name}
                </Button>
              </Link>
            </div>

            {!isExtensionCompatible && (
              <Alert variant="destructive" className="mb-8">
                <AlertTitle>Compatibility Warning</AlertTitle>
                <AlertDescription>
                  This extension may not be fully compatible with the {template.name} template. Please check the
                  documentation for more information.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div className="fade-in-up-delay-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary/20 to-teal-600/20 flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div className="mx-2 text-muted-foreground">+</div>
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-teal-600/20 to-amber-500/20 flex items-center justify-center">
                      <Puzzle className="h-6 w-6 text-teal-600" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-teal-600 to-amber-500 animate-gradient-text glow-text">
                      {template.name} + {extension.name}
                    </h1>
                    <p className="text-muted-foreground">
                      Enhance your {template.type} project with {extension.name}
                    </p>
                  </div>
                </div>

                <p className="text-lg mb-6">
                  Add {extension.name} to your {template.name} project to enhance its functionality with{' '}
                  {extension.description.toLowerCase()}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {extension.labels.map((label) => (
                    <Badge
                      key={label}
                      variant="secondary"
                      className="bg-secondary/50 backdrop-blur-sm transition-all duration-300 hover:bg-teal-600/20"
                    >
                      {label}
                    </Badge>
                  ))}
                </div>

                <Tabs defaultValue="overview" className="fade-in-up-delay-2">
                  <TabsList className="mb-4 bg-background/50 backdrop-blur-sm">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-teal-600/20 transition-all duration-300"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="installation"
                      className="data-[state=active]:bg-teal-600/20 transition-all duration-300"
                    >
                      Installation
                    </TabsTrigger>
                    <TabsTrigger
                      value="benefits"
                      className="data-[state=active]:bg-teal-600/20 transition-all duration-300"
                    >
                      Benefits
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-amber-500">
                        Perfect Combination
                      </h3>
                      <p>
                        The {template.name} template and {extension.name} extension work together seamlessly to provide
                        an enhanced development experience. This combination gives you all the benefits of the{' '}
                        {template.type}
                        template with the added functionality of {extension.name}.
                      </p>

                      <p>
                        By adding {extension.name} to your {template.name} project, you'll be able to:
                      </p>

                      <ul>
                        <li>Accelerate your development workflow</li>
                        <li>Add powerful features specific to {extension.name}</li>
                        <li>Maintain a clean, well-structured codebase</li>
                        <li>Follow best practices for {template.type} development</li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="installation" className="space-y-4">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-amber-500">
                        One-Command Installation
                      </h3>
                      <p>
                        You can create a new project with {template.name} and {extension.name} using a single command:
                      </p>

                      <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto shimmer">
                        <p>
                          <span className="text-green-500">$ uvx create-awesome-python-app</span>{' '}
                          <span className="break-all">--template {template.slug}</span>{' '}
                          <span className="break-all">--addons {extension.slug}</span>
                        </p>
                      </div>

                      <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-amber-500">
                        What Happens Next
                      </h3>
                      <p>After running this command:</p>

                      <ol>
                        <li>A new project will be created using the {template.name} template</li>
                        <li>The {extension.name} extension will be automatically integrated</li>
                        <li>All necessary dependencies will be installed</li>
                        <li>Configuration files will be set up for you</li>
                        <li>You'll be ready to start developing right away</li>
                      </ol>
                    </div>
                  </TabsContent>
                  <TabsContent value="benefits" className="space-y-4">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-amber-500">
                        Why This Combination Works
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                        <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                              <Check className="h-5 w-5 mr-2 text-green-500" />
                              Perfect Integration
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {extension.name} is designed to work seamlessly with {template.name}, ensuring a smooth
                              development experience.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                              <Check className="h-5 w-5 mr-2 text-green-500" />
                              Enhanced Productivity
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Save time with pre-configured settings and optimized workflows specific to this
                              combination.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                              <Check className="h-5 w-5 mr-2 text-green-500" />
                              Best Practices
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Follow industry standards and best practices with this template and extension combination.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                              <Check className="h-5 w-5 mr-2 text-green-500" />
                              Community Support
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Benefit from active community support for both {template.name} and {extension.name}.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6 fade-in-up-delay-3">
                <Card className="backdrop-blur-sm bg-card/50 border-primary/10 gradient-border shimmer">
                  <CardHeader>
                    <CardTitle>Quick Start</CardTitle>
                    <CardDescription>Create your project with one command</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto mb-4">
                      <p>
                        <span className="text-green-500">$ uvx create-awesome-python-app</span>{' '}
                        <span className="break-all">--template {template.slug}</span>{' '}
                        <span className="break-all">--addons {extension.slug}</span>
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-4">
                    <CopyButton
                      className="w-full bg-gradient-to-r from-primary via-teal-600 to-amber-500 hover:from-primary/90 hover:via-teal-600/90 hover:to-amber-500/90 glow transition-all duration-300"
                      command={`uvx create-awesome-python-app --template ${template.slug} --addons ${extension.slug}`}
                    />
                    <div className="flex w-full gap-2">
                      <Link href={template.url} className="flex-1" target="_blank">
                        <Button
                          variant="outline"
                          className="w-full backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-all duration-300"
                        >
                          <Package className="mr-2 h-4 w-4" />
                          Template
                        </Button>
                      </Link>
                      <Link href={extension.url} className="flex-1" target="_blank">
                        <Button
                          variant="outline"
                          className="w-full backdrop-blur-sm bg-background/30 border-teal-600/20 hover:bg-background/50 transition-all duration-300"
                        >
                          <Puzzle className="mr-2 h-4 w-4" />
                          Extension
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>

                <Card className="backdrop-blur-sm bg-card/50 border-primary/10 gradient-border shimmer">
                  <CardHeader>
                    <CardTitle>Combination Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Template</span>
                      <span className="font-medium">{template.name}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Extension</span>
                      <span className="font-medium">{extension.name}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Compatibility</span>
                      <span className={`font-medium ${isExtensionCompatible ? 'text-green-500' : 'text-yellow-500'}`}>
                        {isExtensionCompatible ? 'Fully Compatible' : 'Check Documentation'}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-card/50 border-primary/10 gradient-border shimmer">
                  <CardHeader>
                    <CardTitle>What You'll Get</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      <span>
                        A {template.type} project with {template.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      <span>Enhanced with {extension.name} functionality</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      <span>Pre-configured settings and dependencies</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      <span>Ready-to-use development environment</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      <span>Best practices for {template.type} development</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-50">
            <AnimatedGradient />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-teal-600 to-amber-500 animate-gradient-text glow-text">
                  Ready to Build?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create your {template.name} project with {extension.name} now
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <CopyButton
                  className="bg-gradient-to-r from-primary via-teal-600 to-amber-500 hover:from-primary/90 hover:via-teal-600/90 hover:to-amber-500/90 glow transition-all duration-300"
                  command={`uvx create-awesome-python-app --template ${template.slug} --addons ${extension.slug}`}
                  size="lg"
                />
                <Button
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-all duration-300"
                  asChild
                >
                  <Link href={`/templates/${template.slug}`}>Back to {template.name}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
