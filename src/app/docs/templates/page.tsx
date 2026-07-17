import { ArrowLeft, ArrowRight, Globe, Layers, Package, Server, Settings, Terminal, Wrench, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTemplatesData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Templates | Create Awesome Node App Documentation',
  description: 'Learn about the available project templates and how to use them with create-awesome-node-app.',
  alternates: { canonical: '/docs/templates' },
  openGraph: {
    title: 'Templates | Create Awesome Node App Documentation',
    description: 'Learn about the available project templates and how to use them with create-awesome-node-app.',
    url: '/docs/templates',
    type: 'article',
  },
};

const typeIcons: Record<string, React.ReactNode> = {
  'nestjs-backend': <Server className="h-5 w-5 text-primary" />,
  nextjs: <Layers className="h-5 w-5 text-primary" />,
  monorepo: <Settings className="h-5 w-5 text-primary" />,
  react: <Terminal className="h-5 w-5 text-primary" />,
  'webextension-react': <Wrench className="h-5 w-5 text-primary" />,
  webdriverio: <Package className="h-5 w-5 text-primary" />,
  'nextjs-saas-ai': <Zap className="h-5 w-5 text-primary" />,
  remix: <Globe className="h-5 w-5 text-primary" />,
  astro: <Globe className="h-5 w-5 text-primary" />,
  hono: <Server className="h-5 w-5 text-primary" />,
};

export default async function DocsTemplatesPage() {
  const data = await getTemplatesData();
  const templates = data.templates;

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Templates</h1>
          <p className="text-lg text-muted-foreground">
            Project templates are the starting point for every <code>create-awesome-node-app</code> project. Each
            template is a complete, production-ready project skeleton for a specific technology stack.
          </p>
        </div>

        <div className="space-y-8">
          <section id="what-is-a-template" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">What is a template?</h2>
            <p>
              A template provides the initial directory structure, configuration files, and tooling for a new project.
              When you run <code>create-awesome-node-app</code>, you pick a template and optionally layer{' '}
              <Link href="/docs/extensions" className="text-primary hover:underline">
                extensions
              </Link>{' '}
              on top of it to add functionality like state management, testing, or UI libraries.
            </p>

            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-x-auto">
                <code>npx create-awesome-node-app my-app --template react-vite-boilerplate</code>
              </pre>
            </div>

            <p>
              Each template ships with an <code>AGENTS.md</code> file that scopes how AI coding assistants interact with
              the generated repository.{' '}
              <Link href="/docs/agents-md" className="text-primary hover:underline">
                Learn more about AGENTS.md →
              </Link>
            </p>
          </section>

          <section id="available-templates" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Available templates</h2>
            <p>
              The following templates are maintained in the{' '}
              <a
                href="https://github.com/Create-Node-App/cna-templates"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                cna-templates
              </a>{' '}
              repository. There are currently <strong>{templates.length} templates</strong> available.
            </p>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {templates.map((t) => (
                <Card key={t.slug}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      {typeIcons[t.type] ?? <Layers className="h-5 w-5 text-primary" />}
                      {t.name}
                    </CardTitle>
                    <CardDescription>{t.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3 font-mono">type: {t.type}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/templates/${t.slug}`}>
                        View template
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button asChild>
                <Link href="/templates">
                  Browse all templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

          <section id="using-templates" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Using templates</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Interactive mode</h3>
                <p className="mb-3">
                  Run without arguments and the CLI will prompt you to pick a template and extensions:
                </p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>npx create-awesome-node-app my-app --interactive</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Non-interactive mode</h3>
                <p className="mb-3">
                  Pass <code>--template</code> (and optionally <code>--addons</code>) to skip prompts:
                </p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm overflow-x-auto">
                    <code>
                      npx create-awesome-node-app my-app --template react-vite-boilerplate --addons react-zustand
                      react-testing-library-with-vitest
                    </code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">List all templates</h3>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>npx create-awesome-node-app --list-templates</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section id="template-structure" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Template structure</h2>
            <p>
              Every template lives in the <code>templates/</code> directory of the cna-templates repository and follows
              this layout:
            </p>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-x-auto">
                {`templates/
└── your-template-name/
    ├── src/              # Source code
    ├── public/           # Static assets (frontend templates)
    ├── .gitignore
    ├── package.json
    ├── README.md
    ├── AGENTS.md         # AI assistant contract
    └── tsconfig.json`}
              </pre>
            </div>
            <p>
              Template files can use EJS-style template tags (<code>{'<%= variable %>'}</code>) to inject values
              collected during project creation (e.g. project name, src directory).
            </p>
          </section>

          <div className="flex flex-col gap-2 min-[400px]:flex-row mt-8">
            <Button variant="outline" asChild>
              <Link href="/docs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Documentation
              </Link>
            </Button>
            <Button asChild>
              <Link href="/docs/templates/customization">
                Template Customization
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
