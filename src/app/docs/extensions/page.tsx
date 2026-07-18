import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Code,
  Container,
  Database,
  Monitor,
  Shield,
  Terminal,
  Wrench,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Extensions | Create Awesome Python App Documentation',
  description:
    'Learn about extensions and how to add Docker, Postgres, observability, auth, and CI tooling to your Python project.',
  alternates: { canonical: '/docs/extensions' },
  openGraph: {
    title: 'Extensions | Create Awesome Python App Documentation',
    description:
      'Learn about extensions and how to add Docker, Postgres, observability, auth, and CI tooling to your Python project.',
    url: '/docs/extensions',
    type: 'article',
  },
};

const categories = [
  {
    name: 'Containers',
    description: 'Docker images and Compose stacks for local and production runs.',
    icon: <Container className="h-5 w-5 text-primary" />,
    examples: ['fastapi-docker', 'django-docker', 'celery-docker'],
  },
  {
    name: 'Database',
    description: 'PostgreSQL services, ORM helpers, and migration scaffolding.',
    icon: <Database className="h-5 w-5 text-primary" />,
    examples: ['postgres', 'fastapi-sqlalchemy', 'fastapi-redis'],
  },
  {
    name: 'Observability',
    description: 'Error tracking and production diagnostics.',
    icon: <Monitor className="h-5 w-5 text-primary" />,
    examples: ['fastapi-sentry'],
  },
  {
    name: 'Security',
    description: 'Authentication and authorization skeletons.',
    icon: <Shield className="h-5 w-5 text-primary" />,
    examples: ['fastapi-auth-jwt'],
  },
  {
    name: 'CI & GitHub',
    description: 'GitHub Actions, lint gates, and repository automation.',
    icon: <Cloud className="h-5 w-5 text-primary" />,
    examples: ['github-setup'],
  },
  {
    name: 'Developer Experience',
    description: 'Editor integrations and remote development environments.',
    icon: <Terminal className="h-5 w-5 text-primary" />,
    examples: ['development-container'],
  },
  {
    name: 'API & Services',
    description: 'Backend-focused add-ons for FastAPI and similar templates.',
    icon: <Code className="h-5 w-5 text-primary" />,
    examples: ['fastapi-sqlalchemy', 'fastapi-redis', 'fastapi-auth-jwt'],
  },
  {
    name: 'Tooling',
    description: 'Cross-cutting workflow improvements for Python projects.',
    icon: <Wrench className="h-5 w-5 text-primary" />,
    examples: ['github-setup', 'development-container'],
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
            to layer in additional features — Docker packaging, Postgres, observability, auth, CI, and more.
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
              <code>fastapi-backend</code>, <code>django-backend</code>, <code>cli-app</code>), so the CLI only shows
              you relevant options for your chosen template.
            </p>

            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-x-auto">
                <code>
                  uvx create-awesome-python-app@latest my-app --template fastapi-starter --addons fastapi-docker
                  postgres github-setup
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
              When the CLI applies an extension it performs a deep merge of the extension&apos;s files and{' '}
              <code>pyproject.toml</code> fields into the scaffolded project:
            </p>

            <ol className="list-decimal pl-6 space-y-3 mt-2">
              <li>
                <strong>Files</strong> — source files from the extension are copied or appended to the project.
                Filenames ending in <code>.template</code> are processed as EJS templates before being written.
              </li>
              <li>
                <strong>Dependencies</strong> — extension dependency lists are merged into the project&apos;s{' '}
                <code>pyproject.toml</code> (runtime and dev groups).
              </li>
              <li>
                <strong>Scripts</strong> — any task scripts or Makefile targets defined by the extension are merged with
                existing project tooling.
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
                href="https://github.com/Create-Python-App/cpa-templates"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                cpa-templates
              </a>{' '}
              repository:
            </p>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-x-auto">
                {`extensions/
└── your-extension-name/
    ├── files/            # Files merged into the project tree
    ├── pyproject/        # Optional dependency fragments for merge
    ├── extension.json    # Extension metadata and compatibility
    └── README.md`}
              </pre>
            </div>
          </section>

          <section id="listing-extensions" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Listing available extensions</h2>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>uvx create-awesome-python-app --list-addons</code>
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
