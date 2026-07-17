import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Code,
  Database,
  Globe,
  Layers,
  Monitor,
  Package,
  Palette,
  Shield,
  TestTube,
  Wrench,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Extensions | Create Awesome Node App Documentation',
  description:
    'Learn about extensions and how to add features like state management, testing, and UI libraries to your project.',
  alternates: { canonical: '/docs/extensions' },
  openGraph: {
    title: 'Extensions | Create Awesome Node App Documentation',
    description:
      'Learn about extensions and how to add features like state management, testing, and UI libraries to your project.',
    url: '/docs/extensions',
    type: 'article',
  },
};

const categories = [
  {
    name: 'UI',
    description: 'Component libraries and design systems.',
    icon: <Palette className="h-5 w-5 text-primary" />,
    examples: ['Material UI', 'Tailwind CSS', 'Shadcn/UI', 'Semantic UI', 'Mantine'],
  },
  {
    name: 'State Management',
    description: 'Client-side state solutions.',
    icon: <Layers className="h-5 w-5 text-primary" />,
    examples: ['Zustand', 'Redux Toolkit', 'Recoil', 'Jotai'],
  },
  {
    name: 'Testing',
    description: 'Unit, integration, and end-to-end testing setups.',
    icon: <TestTube className="h-5 w-5 text-primary" />,
    examples: ['Vitest + Testing Library', 'Jest + Testing Library', 'Playwright'],
  },
  {
    name: 'Database',
    description: 'ORM, database adapters, and data persistence utilities.',
    icon: <Database className="h-5 w-5 text-primary" />,
    examples: ['Drizzle + PostgreSQL', 'Drizzle + SQLite', 'Mongoose', 'Prisma'],
  },
  {
    name: 'Data Fetching',
    description: 'API and data synchronization layers.',
    icon: <Zap className="h-5 w-5 text-primary" />,
    examples: ['React Query', 'Apollo Client', 'SWR', 'tRPC'],
  },
  {
    name: 'Auth',
    description: 'Authentication and authorization integrations.',
    icon: <Shield className="h-5 w-5 text-primary" />,
    examples: ['NextAuth.js', 'Clerk', 'Auth0', 'Supabase Auth'],
  },
  {
    name: 'Tooling',
    description: 'Developer experience and workflow extensions.',
    icon: <Wrench className="h-5 w-5 text-primary" />,
    examples: ['Storybook', 'GitHub Setup', 'Million.js', 'Electron'],
  },
  {
    name: 'Deployment',
    description: 'Hosting, CI/CD, and infrastructure configurations.',
    icon: <Cloud className="h-5 w-5 text-primary" />,
    examples: ['Vercel', 'Docker', 'GitHub Actions', 'Serverless'],
  },
  {
    name: 'Monitoring',
    description: 'Error tracking, logging, and observability.',
    icon: <Monitor className="h-5 w-5 text-primary" />,
    examples: ['Sentry', 'OpenTelemetry', 'Datadog', 'LogRocket'],
  },
  {
    name: 'Localization',
    description: 'Internationalization and translation tooling.',
    icon: <Globe className="h-5 w-5 text-primary" />,
    examples: ['i18next', 'react-intl', 'next-intl', 'Lingui'],
  },
  {
    name: 'API',
    description: 'API clients, code generation, and integration utilities.',
    icon: <Code className="h-5 w-5 text-primary" />,
    examples: ['Axios', 'Ky', 'OpenAPI Generator', 'GraphQL Codegen'],
  },
  {
    name: 'Cross Platform',
    description: 'Extensions targeting multiple platforms simultaneously.',
    icon: <Package className="h-5 w-5 text-primary" />,
    examples: ['Electron', 'Tauri', 'Capacitor', 'React Native Web'],
  },
];

export default function DocsExtensionsPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Extensions</h1>
          <p className="text-lg text-muted-foreground">
            Extensions are modular add-ons you apply on top of a{' '}
            <Link href="/docs/templates" className="text-primary hover:underline">
              template
            </Link>{' '}
            to layer in additional features — UI libraries, state management, testing setups, and more.
          </p>
        </div>

        <div className="space-y-8">
          <section id="what-is-an-extension" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">What is an extension?</h2>
            <p>
              An extension is a self-contained package that adds files, dependencies, and scripts to a scaffolded
              project. Extensions are composable: you can apply multiple compatible extensions in a single command and
              they are merged intelligently.
            </p>
            <p>
              Each extension declares which template <strong>types</strong> it is compatible with (e.g.{' '}
              <code>react</code>, <code>nestjs-backend</code>), so the CLI only shows you relevant options for your
              chosen template.
            </p>

            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-x-auto">
                <code>
                  npx create-awesome-node-app my-app --template react-vite-boilerplate --addons react-zustand
                  react-tailwindcss react-testing-library-with-vitest
                </code>
              </pre>
            </div>
          </section>

          <section id="extension-categories" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Extension categories</h2>
            <p>
              Extensions are organized into <strong>{categories.length} categories</strong> covering the most common
              project needs.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {categories.map((cat) => (
                <Card key={cat.name}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      {cat.icon}
                      {cat.name}
                    </CardTitle>
                    <CardDescription>{cat.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {cat.examples.map((ex) => (
                        <li key={ex} className="flex items-center gap-1">
                          <span className="text-primary">·</span> {ex}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button asChild>
                <Link href="/extensions">
                  Browse all extensions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

          <section id="how-extensions-work" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">How extensions work</h2>
            <p>
              When the CLI applies an extension it performs a deep merge of the extension's files and{' '}
              <code>package.json</code> fields into the scaffolded project:
            </p>

            <ol className="list-decimal pl-6 space-y-3 mt-2">
              <li>
                <strong>Files</strong> — source files from the extension are copied or appended to the project.
                Filenames ending in <code>.template</code> are processed as EJS templates before being written.
              </li>
              <li>
                <strong>Dependencies</strong> — <code>package/dependencies.js</code> and{' '}
                <code>package/devDependencies.js</code> entries are merged into the project's <code>package.json</code>.
              </li>
              <li>
                <strong>Scripts</strong> — any <code>scripts</code> defined by the extension are merged with existing
                scripts.
              </li>
              <li>
                <strong>Incompatibilities</strong> — extensions declare <code>incompatibleWith</code> slugs so the CLI
                prevents conflicting combinations (e.g. two different test runners).
              </li>
            </ol>
          </section>

          <section id="extension-structure" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Extension file structure</h2>
            <p>
              Extensions live in the <code>extensions/</code> directory of the{' '}
              <a
                href="https://github.com/Create-Node-App/cna-templates"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                cna-templates
              </a>{' '}
              repository:
            </p>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-x-auto">
                {`extensions/
└── your-extension-name/
    ├── [src]/            # Source files merged into the project's src/
    ├── package/
    │   ├── dependencies.js       # Runtime deps to add
    │   └── devDependencies.js    # Dev deps to add
    ├── package.json      # Extension metadata
    └── README.md`}
              </pre>
            </div>
          </section>

          <section id="listing-extensions" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Listing available extensions</h2>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>npx create-awesome-node-app --list-addons</code>
              </pre>
            </div>
            <p>
              Or browse the full catalogue on the{' '}
              <Link href="/extensions" className="text-primary hover:underline">
                Extensions page
              </Link>
              , where you can filter by template type and category.
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
              <Link href="/docs/contributing">
                Contributing extensions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
