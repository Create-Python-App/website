import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatedGradient } from '@/components/animated-gradient';
import { AnimatedTerminal } from '@/components/animated-terminal';
import { AnnouncementBanner } from '@/components/announcement-banner';
import { ContributorsSection } from '@/components/contributors-section';
import { CopyButton } from '@/components/copy-button';
import { EcosystemSection } from '@/components/ecosystem-section';
import { FeaturedTemplate } from '@/components/featured-template';
import { HeroSection } from '@/components/hero-section';
import { RecipesSection } from '@/components/recipes-section';
import { SaasAiBanner } from '@/components/saas-ai-banner';
import { StatsBar } from '@/components/stats-bar';
import { TemplateCategories } from '@/components/template-categories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getTemplatesData } from '@/lib/data';

const PRIMARY_COMMAND = 'npm create awesome-node-app@latest my-app';

export default async function Home() {
  const { templates, categories } = await getTemplatesData();

  const saasTemplate = templates.find((t) => t.slug === 'nextjs-saas-ai-starter');
  const otherTemplates = templates.filter((t) => t.slug !== 'nextjs-saas-ai-starter');
  const featuredTemplates = saasTemplate ? [saasTemplate, ...otherTemplates].slice(0, 3) : templates.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <AnnouncementBanner
          message={
            <>New: Next.js SaaS AI Starter — multi-tenant SaaS with AI, Auth.js v5, Drizzle + pgvector, and more.</>
          }
          ctaHref="/templates/nextjs-saas-ai-starter"
          ctaLabel="Explore template"
        />
        <HeroSection
          title={
            <>
              From zero to stack
              <br />
              <span className="text-gradient-primary animate-gradient-text">in one command.</span>
            </>
          }
          description="Choose a template, add addons, and ship a production-ready Node, Web, or AI-ready app from a cozy developer workbench."
          actions={
            <>
              <CopyButton
                command={PRIMARY_COMMAND}
                size="lg"
                className="bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-600/90 glow transition-all duration-300 text-primary-foreground"
              />
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-all duration-300"
                asChild
              >
                <Link href="/templates">Explore templates</Link>
              </Button>
            </>
          }
          sideVisual={<AnimatedTerminal />}
        />

        <StatsBar />

        <SaasAiBanner />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <AnimatedGradient />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm backdrop-blur-sm">
                  Featured templates
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">
                  Start with a solid foundation
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Curated starters for frontend, full-stack, and SaaS — not a dump of every option.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {featuredTemplates.length > 0 ? (
                featuredTemplates.map((template, index) => (
                  <div key={template.slug} className={`fade-in-up-delay-${(index % 3) + 1}`}>
                    <FeaturedTemplate
                      name={template.name}
                      slug={template.slug}
                      description={template.description}
                      type={template.type}
                      category={template.category}
                      labels={template.labels}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">No templates found. Please check back later.</p>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-all duration-300"
                asChild
              >
                <Link href="/templates">
                  View all templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <RecipesSection />

        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Categories</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">
                  Find your stack
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Browse by category when you already know the shape of the project.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <TemplateCategories categories={categories} />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <AnimatedGradient />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm backdrop-blur-sm">
                    How it works
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">
                    Compose, then generate
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Select a template, add extensions, and generate your project with a single command — interactive or
                    headless for CI.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    variant="outline"
                    className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-all duration-300"
                    asChild
                  >
                    <Link href="/docs">
                      Read the docs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full backdrop-blur-sm bg-card/50 border-primary/10 gradient-border-subtle">
                  <CardHeader>
                    <CardTitle>Create your project</CardTitle>
                    <CardDescription>Use the CLI to generate your app</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
                      <p className="text-teal-700 dark:text-teal-300">$ npm create awesome-node-app@latest my-app \</p>
                      <p className="pl-4">--template react-vite-boilerplate \</p>
                      <p className="pl-4">--addons tailwind-css zustand github-setup</p>
                    </div>
                    <CopyButton
                      command="npm create awesome-node-app@latest my-app -- --template react-vite-boilerplate --addons tailwind-css zustand github-setup --no-interactive"
                      variant="outline"
                      className="w-full"
                    />
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Generates a React app with Tailwind, Zustand, GitHub setup, and AI-ready conventions when enabled.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <ContributorsSection />

        <EcosystemSection />

        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600 animate-gradient-text">
                  Ready when you are
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  One command to scaffold. Browse templates when you want inspiration.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <CopyButton
                  command={PRIMARY_COMMAND}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-600/90 glow transition-all duration-300 text-primary-foreground"
                />
                <Button
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-all duration-300"
                  asChild
                >
                  <Link href="/templates">Explore templates</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
