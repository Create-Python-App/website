import { ArrowRight, Layers, Package, Settings, Sparkles, Terminal } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Documentation | Create Awesome Node App',
  description: 'Comprehensive documentation for create-awesome-node-app',
  alternates: { canonical: '/docs' },
  openGraph: {
    title: 'Documentation | Create Awesome Node App',
    description: 'Comprehensive documentation for create-awesome-node-app',
    url: '/docs',
    type: 'article',
  },
};

export default function DocsPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Documentation</h1>
          <p className="text-lg text-muted-foreground">Comprehensive guide to using create-awesome-node-app</p>
        </div>

        <div className="space-y-8">
          <section id="introduction" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Introduction to create-awesome-node-app</h2>
            <p>
              <code>create-awesome-node-app</code> is a powerful command-line tool designed to streamline the process of
              setting up modern Node.js applications. It provides a collection of carefully crafted templates and
              extensions that help developers quickly bootstrap projects with best practices and optimal configurations.
            </p>

            <Card className="bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-teal-600/10 border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  New: Built-in Agents.md Guidance
                </CardTitle>
                <CardDescription>Every template now ships with an AGENTS.md file for AI assistants</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  All generated projects now include a curated <code>AGENTS.md</code> file (powered by{' '}
                  <a className="underline" href="https://agents.md" target="_blank" rel="noreferrer">
                    agents.md
                  </a>
                  ) that scopes how AI coding assistants (Cursor, GitHub Copilot Chat, PR bots) should interact with the
                  repository. This keeps human documentation clean while giving AI precise operating guidelines.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    className="bg-white/5 hover:bg-white/10 border-amber-500/20 hover:border-amber-500/40"
                    asChild
                  >
                    <Link href="/docs/agents-md" className="group">
                      Learn About AGENTS.md
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="my-6 rounded-lg border bg-card p-6">
              <h3 className="mb-4 text-xl font-semibold">Key Benefits</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-2">
                  <Terminal className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <span className="font-medium">Rapid Setup</span>
                    <p className="text-sm text-muted-foreground">Bootstrap projects in seconds with a single command</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Package className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <span className="font-medium">Curated Templates</span>
                    <p className="text-sm text-muted-foreground">
                      Choose from a variety of specialized project templates
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Layers className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <span className="font-medium">Modular Extensions</span>
                    <p className="text-sm text-muted-foreground">
                      Add only the features you need with optional extensions
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Settings className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <span className="font-medium">Customizable</span>
                    <p className="text-sm text-muted-foreground">Tailor templates to your specific requirements</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* AI tools section removed; replaced with Agents.md concept above */}

            <h3 className="text-xl font-semibold">Getting Started</h3>
            <p>
              Using <code>create-awesome-node-app</code> is straightforward. You can create a new project with a single
              command:
            </p>

            <Tabs defaultValue="npm" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="yarn">Yarn</TabsTrigger>
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              </TabsList>
              <TabsContent value="npm" className="mt-2">
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>npx create-awesome-node-app my-app</code>
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="yarn" className="mt-2">
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>yarn create awesome-node-app my-app</code>
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="pnpm" className="mt-2">
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>pnpm create awesome-node-app my-app</code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>

            <p className="mt-4">
              This will launch an interactive CLI that guides you through selecting a template and optional extensions
              for your project.
            </p>

            <h3 className="text-xl font-semibold mt-6">Prerequisites</h3>
            <p>Before using create-awesome-node-app, ensure you have the following installed:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Node.js (version 18.0.0 or higher)</li>
              <li>npm, Yarn, or pnpm package manager</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">Command Options</h3>
            <p>The CLI supports several options to customize your project creation:</p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Option</th>
                    <th className="py-2 px-4 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>-V, --version</code>
                    </td>
                    <td className="py-2 px-4">Output the version number</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>-v, --verbose</code>
                    </td>
                    <td className="py-2 px-4">Print additional logs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>-i, --info</code>
                    </td>
                    <td className="py-2 px-4">Print environment debug info</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>--no-install</code>
                    </td>
                    <td className="py-2 px-4">Generate package.json without installing dependencies</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>-t, --template &lt;template&gt;</code>
                    </td>
                    <td className="py-2 px-4">Specify a template for the created project</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>--addons [extensions...]</code>
                    </td>
                    <td className="py-2 px-4">Specify extensions to apply for the boilerplate generation</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>--use-yarn</code>
                    </td>
                    <td className="py-2 px-4">Use yarn instead of npm or pnpm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>--use-pnpm</code>
                    </td>
                    <td className="py-2 px-4">Use pnpm instead of yarn or npm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>--interactive</code>
                    </td>
                    <td className="py-2 px-4">Run in interactive mode to select options (default: false)</td>
                  </tr>
                  {/* --ai-tool flag removed (deprecated) */}
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>--list-templates</code>
                    </td>
                    <td className="py-2 px-4">List all available templates</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>--list-addons</code>
                    </td>
                    <td className="py-2 px-4">List all available addons</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code>-h, --help</code>
                    </td>
                    <td className="py-2 px-4">Display help for command</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mt-6">Examples</h3>
            <div className="space-y-4 mt-2">
              <div>
                <p className="font-medium">Create a project with interactive mode:</p>
                <div className="rounded-md bg-muted p-4 mt-2">
                  <pre className="text-sm">
                    <code>npx create-awesome-node-app my-app --interactive</code>
                  </pre>
                </div>
              </div>

              <div>
                <p className="font-medium">Create a project with a specific template:</p>
                <div className="rounded-md bg-muted p-4 mt-2">
                  <pre className="text-sm">
                    <code>npx create-awesome-node-app my-app --template react-vite-boilerplate</code>
                  </pre>
                </div>
              </div>

              <div>
                <p className="font-medium">Create a project with a template and extensions:</p>
                <div className="rounded-md bg-muted p-4 mt-2">
                  <pre className="text-sm">
                    <code>
                      npx create-awesome-node-app my-app --template react-vite-boilerplate --addons material-ui
                      github-setup
                    </code>
                  </pre>
                </div>
              </div>

              <div>
                <p className="font-medium">List all available templates:</p>
                <div className="rounded-md bg-muted p-4 mt-2">
                  <pre className="text-sm">
                    <code>npx create-awesome-node-app --list-templates</code>
                  </pre>
                </div>
              </div>

              <div>
                <p className="font-medium">List all available extensions:</p>
                <div className="rounded-md bg-muted p-4 mt-2">
                  <pre className="text-sm">
                    <code>npx create-awesome-node-app --list-addons</code>
                  </pre>
                </div>
              </div>

              {/* AI tool examples removed; Agents.md now default */}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Available Templates</h2>
            <p>create-awesome-node-app offers a variety of templates for different types of applications:</p>

            <div className="rounded-lg border bg-muted/40 p-6 flex items-center justify-between">
              <div>
                <p className="font-semibold">10 production-ready templates</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Frontend, backend, fullstack, monorepo, testing, and web extension starters.
                </p>
              </div>
              <Button asChild>
                <Link href="/templates">
                  Browse templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Documentation Sections</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Installation</CardTitle>
                  <CardDescription>npm, Homebrew, AUR, and Docker install options</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/docs/installation">
                      Install Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Templates</CardTitle>
                  <CardDescription>Learn about available templates and how to use them</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/docs/templates">
                      Explore Templates
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Extensions</CardTitle>
                  <CardDescription>Discover extensions to enhance your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/docs/extensions">
                      Browse Extensions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Contributing</CardTitle>
                  <CardDescription>Learn how to contribute templates and extensions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/docs/contributing">
                      Contribution Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Advanced Usage</CardTitle>
                  <CardDescription>Explore advanced features and configurations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/docs/advanced/usage">
                      Advanced Topics
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
