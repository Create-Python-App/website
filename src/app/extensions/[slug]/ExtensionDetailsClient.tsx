'use client';
import { ArrowLeft, ArrowRight, Check, Copy, Github, Puzzle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { AnimatedGradient } from '@/components/animated-gradient';
import { CopyButton } from '@/components/copy-button';
import { ParticlesBackground } from '@/components/particles-background';
import { TemplateCard } from '@/components/template-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Extension, Template } from '@/lib/schemas';

export interface ExtensionDetailsClientProps {
  extension: Extension;
  compatibleTemplates: Template[];
}

export function ExtensionDetailsClient({ extension, compatibleTemplates }: ExtensionDetailsClientProps) {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <AnimatedGradient />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="mb-8 fade-in-up">
            <Link href="/extensions">
              <Button variant="ghost" className="pl-0 hover:bg-background/20 transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Extensions
              </Button>
            </Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="fade-in-up-delay-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-teal-600/20 to-amber-500/20 flex items-center justify-center floating">
                  <Puzzle className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-amber-500 animate-gradient-text glow-text">
                    {extension.name}
                  </h1>
                  <p className="text-muted-foreground">{extension.category}</p>
                </div>
              </div>
              <p className="text-lg mb-6">{extension.description}</p>
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
                  <TabsTrigger value="usage" className="data-[state=active]:bg-teal-600/20 transition-all duration-300">
                    Usage
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="data-[state=active]:bg-teal-600/20 transition-all duration-300"
                  >
                    Features
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-500">
                      About this extension
                    </h3>
                    <p>
                      This extension enhances your project with {extension.name} functionality. It's designed to
                      integrate seamlessly with compatible templates and provide additional features to improve your
                      development experience.
                    </p>
                    <p>
                      The {extension.name} extension is compatible with{' '}
                      {Array.isArray(extension.type) ? extension.type.join(', ') : extension.type} templates, making it
                      versatile for different project types.
                    </p>
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-500">
                      Key Benefits
                    </h3>
                    <ul>
                      <li>Seamless integration with compatible templates</li>
                      <li>Enhanced development experience</li>
                      <li>Additional features specific to {extension.name}</li>
                      <li>Well-documented and maintained</li>
                      <li>Community-supported and regularly updated</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="usage" className="space-y-4">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-500">
                      Getting Started
                    </h3>
                    <p>To use this extension with a compatible template, run the following command:</p>
                    <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto shimmer">
                      <p>uvx create-awesome-python-app --template [template-name] --addons {extension.slug}</p>
                    </div>
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-500">
                      With Specific Templates
                    </h3>
                    <p>Here are some examples of using this extension with compatible templates:</p>
                    {compatibleTemplates.slice(0, 2).map((template) => (
                      <div
                        key={template.slug}
                        className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto shimmer mb-4"
                      >
                        <p>
                          uvx create-awesome-python-app --template {template.slug} --addons {extension.slug}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="features" className="space-y-4">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-500">
                      Core Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                      {[
                        {
                          title: 'Easy Integration',
                          desc: 'Seamlessly integrates with compatible templates with minimal configuration.',
                        },
                        {
                          title: 'Enhanced Functionality',
                          desc: 'Adds powerful features to your project that improve development workflow.',
                        },
                        {
                          title: 'Well Documented',
                          desc: 'Comprehensive documentation to help you get the most out of the extension.',
                        },
                        {
                          title: 'Regular Updates',
                          desc: 'Maintained and updated regularly for compatibility and security.',
                        },
                      ].map((f) => (
                        <Card key={f.title} className="bg-background/50 backdrop-blur-sm border-teal-600/10">
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
              <Card className="backdrop-blur-sm bg-card/50 border-teal-600/10 gradient-border shimmer">
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription>Add this extension to your project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto mb-4">
                    <p className="text-green-500">$ uvx create-awesome-python-app \\</p>
                    <p className="pl-4">--template [template-name] \\</p>
                    <p className="pl-4">--addons {extension.slug}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <CopyButton
                    className="w-full bg-gradient-to-r from-teal-600 to-amber-500 hover:from-teal-600/90 hover:to-amber-500/90 glow transition-all duration-300"
                    command={`uvx create-awesome-python-app --template [template-name] --addons ${extension.slug}`}
                  />
                  <Link href={extension.url} className="w-full" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="w-full backdrop-blur-sm bg-background/30 border-teal-600/20 hover:bg-background/50 transition-all duration-300"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="backdrop-blur-sm bg-card/50 border-teal-600/10 gradient-border shimmer">
                <CardHeader>
                  <CardTitle>Extension Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                    <span className="text-muted-foreground shrink-0">Compatible with</span>
                    <span className="font-medium min-w-0 break-words sm:text-right">
                      {Array.isArray(extension.type) ? extension.type.join(', ') : extension.type}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                    <span className="text-muted-foreground shrink-0">Category</span>
                    <span className="font-medium min-w-0 break-words sm:text-right">{extension.category}</span>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                    <span className="text-muted-foreground shrink-0">Compatible Templates</span>
                    <span className="font-medium sm:text-right">{compatibleTemplates.length}</span>
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
                Compatible Templates
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Use {extension.name} with these templates to enhance your project
              </p>
            </div>
          </div>
          {compatibleTemplates.length > 0 ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {compatibleTemplates.map((template, index) => (
                <div key={template.slug} className={`fade-in-up-delay-${(index % 3) + 1}`}>
                  <Link href={`/templates/${template.slug}/extensions/${extension.slug}`}>
                    <TemplateCard template={template} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-background/30 backdrop-blur-sm rounded-lg border border-teal-600/10">
              <Puzzle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No compatible templates found for this extension.</p>
              <Button
                variant="outline"
                className="mt-4 backdrop-blur-sm bg-background/30 border-teal-600/20 hover:bg-background/50 transition-all duration-300"
                asChild
              >
                <Link href="/templates">Browse All Templates</Link>
              </Button>
            </div>
          )}
          {compatibleTemplates.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                size="lg"
                className="backdrop-blur-sm bg-background/30 border-teal-600/20 hover:bg-background/50 transition-all duration-300"
                asChild
              >
                <Link href="/templates">
                  View All Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <AnimatedGradient />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-amber-500 animate-gradient-text glow-text">
                Ready to Enhance Your Project?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Add {extension.name} to your template and start building
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-amber-500 hover:from-teal-600/90 hover:to-amber-500/90 glow transition-all duration-300"
                onClick={() => {
                  navigator.clipboard?.writeText?.(
                    `uvx create-awesome-python-app --template [template-name] --addons ${extension.slug}`,
                  );
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Installation Command
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-sm bg-background/30 border-teal-600/20 hover:bg-background/50 transition-all duration-300"
                asChild
              >
                <Link href="/templates">Choose a Template</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
