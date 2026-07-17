import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { DiagramWorkflow } from '@/components/diagram-workflow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata = {
  title: 'Advanced Usage | Create Awesome Python App Documentation',
  description: 'Advanced usage guide for create-awesome-python-app',
};

export default function AdvancedUsagePage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Advanced Usage</h1>
          <p className="text-lg text-muted-foreground">
            Advanced techniques and configurations for create-awesome-python-app
          </p>
        </div>

        <div className="space-y-8">
          <section id="uv-workflow" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Working with uv in Generated Projects</h2>
            <p>
              Every CPA template is uv-first: dependencies live in <code>pyproject.toml</code>, the lockfile is{' '}
              <code>uv.lock</code>, and day-to-day commands go through <code>uv run</code>.
            </p>

            <Tabs defaultValue="sync" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sync">uv sync</TabsTrigger>
                <TabsTrigger value="run">uv run</TabsTrigger>
                <TabsTrigger value="add">uv add</TabsTrigger>
              </TabsList>
              <TabsContent value="sync" className="mt-2">
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm overflow-x-auto">
                    {`# Create a project (uv sync runs automatically unless --no-install)
uvx create-awesome-python-app@latest my-app --template fastapi-starter

# Install or refresh dependencies later
cd my-app
uv sync`}
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="run" className="mt-2">
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm overflow-x-auto">
                    {`# Run the dev server (FastAPI example)
cd my-app
uv run uvicorn app.main:app --reload

# Run tests
uv run pytest

# Run lint and type checks
uv run ruff check .
uv run mypy .`}
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="add" className="mt-2">
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm overflow-x-auto">
                    {`# Add a runtime dependency
uv add httpx

# Add a dev dependency
uv add --dev pytest-cov

# Remove a dependency
uv remove unused-package`}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>

            <Alert className="mt-4">
              <AlertTitle>Skip automatic install</AlertTitle>
              <AlertDescription>
                Use <code>--no-install</code> when scaffolding if you want to review <code>pyproject.toml</code> before
                running <code>uv sync</code> yourself.
              </AlertDescription>
            </Alert>
          </section>

          <section id="ci-cd" className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">CI/CD Integration</h2>
            <p>
              Most templates offer extensions that include files for different CI/CD tools. These extensions provide
              ready-to-use configurations for popular CI/CD platforms:
            </p>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">GitHub Actions</h3>
                <p className="text-sm text-muted-foreground">
                  The GitHub Setup extension adds GitHub Actions workflows for CI/CD, along with issue templates and
                  other GitHub-specific configurations.
                </p>
                <div className="mt-4">
                  <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
                    uvx create-awesome-python-app@latest my-app --template fastapi-starter --addons github-setup
                  </pre>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Docker</h3>
                <p className="text-sm text-muted-foreground">
                  The <code>python-docker</code> extension adds a Dockerfile and Compose files for local and production
                  container runs.
                </p>
                <div className="mt-4">
                  <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
                    uvx create-awesome-python-app@latest my-app --template fastapi-starter --addons python-docker
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">Deployment Workflow</h3>
              <p className="mt-2">Here's a typical deployment workflow for a create-awesome-python-app project:</p>

              <DiagramWorkflow
                className="mt-4"
                title="Deployment Workflow"
                chart={`
graph TD
    A["Developer Pushes Code"] --> B["CI/CD Pipeline Triggered"]
    B --> C["Install Dependencies"]
    C --> D["Run Linting"]
    C --> E["Run Tests"]
    D --> F["Build Application"]
    E --> F
    F --> G["Deploy to Staging"]
    G --> H["Run Integration Tests"]
    H --> I{"Tests Pass?"}
    I -->|Yes| J["Deploy to Production"]
    I -->|No| K["Notify Team & Fix Issues"]
    K --> A
                `}
              />
            </div>
          </section>

          <section id="monorepo" className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">Monorepo Setup</h2>
            <p>
              create-awesome-python-app offers the <code>uv-workspace-starter</code> template for Python monorepos with
              a single lockfile and shared tooling:
            </p>

            <div className="rounded-md bg-muted p-4 mt-4">
              <pre className="text-sm overflow-x-auto">
                {`# Create a new uv workspace monorepo
uvx create-awesome-python-app@latest my-monorepo --template uv-workspace-starter

# Navigate to the project
cd my-monorepo

# Sync all workspace members
uv sync

# Run a member app (example)
uv run --package apps-api uvicorn app.main:app --reload

# Run tests across the workspace
uv run pytest`}
              </pre>
            </div>

            <p className="mt-4">The uv workspace starter includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                uv workspace configuration with shared <code>pyproject.toml</code> tooling
              </li>
              <li>
                Separate <code>packages/</code> libraries and <code>apps/</code> deployables
              </li>
              <li>Shared Ruff, Pyright, and pytest configuration</li>
              <li>Example members demonstrating cross-package imports</li>
            </ul>
          </section>

          <section id="troubleshooting" className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">Troubleshooting Common Issues</h2>

            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-blue-500" />
                  Installation Failures
                </h3>
                <p className="mt-2">If you encounter issues during installation:</p>
                <div className="mt-2 space-y-2">
                  <p>
                    <strong>Problem:</strong> Dependencies fail to install
                  </p>
                  <p>
                    <strong>Solution:</strong> Try using the <code>--no-install</code> flag and then install
                    dependencies manually
                  </p>
                  <div className="rounded-md bg-muted p-2 mt-2">
                    <code>uvx create-awesome-python-app my-app --no-install</code>
                  </div>
                  <div className="rounded-md bg-muted p-2 mt-2">
                    <code>cd my-app && uv sync</code>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-blue-500" />
                  Template or Extension Not Found
                </h3>
                <p className="mt-2">If a template or extension is not found:</p>
                <div className="mt-2 space-y-2">
                  <p>
                    <strong>Problem:</strong> Specified template or extension doesn't exist
                  </p>
                  <p>
                    <strong>Solution:</strong> List available templates and extensions to check the correct names
                  </p>
                  <div className="rounded-md bg-muted p-2 mt-2">
                    <code>uvx create-awesome-python-app --list-templates</code>
                  </div>
                  <div className="rounded-md bg-muted p-2 mt-2">
                    <code>uvx create-awesome-python-app --list-addons</code>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-blue-500" />
                  Compatibility Issues
                </h3>
                <p className="mt-2">If you encounter compatibility issues between templates and extensions:</p>
                <div className="mt-2 space-y-2">
                  <p>
                    <strong>Problem:</strong> Extension is not compatible with the selected template
                  </p>
                  <p>
                    <strong>Solution:</strong> Check the extension's compatibility in the documentation or use the
                    interactive mode
                  </p>
                  <div className="rounded-md bg-muted p-2 mt-2">
                    <code>uvx create-awesome-python-app my-app --interactive</code>
                  </div>
                </div>
              </div>
            </div>

            <Alert className="mt-6">
              <AlertTitle>Debugging Tips</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>
                    Use the <code>--verbose</code> flag to see detailed logs during project creation
                  </li>
                  <li>
                    Check the <code>--info</code> flag to print environment debug information
                  </li>
                  <li>If all else fails, try creating a project with minimal options and then add features manually</li>
                </ul>
              </AlertDescription>
            </Alert>
          </section>

          <section id="templates-extensions-list" className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">Available Templates and Extensions</h2>
            <p>create-awesome-python-app offers a variety of templates and extensions. Here's how to list them:</p>

            <div className="rounded-md bg-muted p-4 mt-4">
              <pre className="text-sm overflow-x-auto">
                {`# List all available templates
uvx create-awesome-python-app --list-templates

# List all available extensions
uvx create-awesome-python-app --list-addons`}
              </pre>
            </div>

            <p className="mt-4">
              You can also view the templates and extensions on the project's website or GitHub repository.
            </p>
          </section>

          <section id="interactive-mode" className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">Interactive Mode</h2>
            <p>The interactive mode provides a guided experience for creating projects:</p>

            <div className="rounded-md bg-muted p-4 mt-4">
              <pre className="text-sm overflow-x-auto">{`uvx create-awesome-python-app my-app --interactive`}</pre>
            </div>

            <p className="mt-4">In interactive mode, you'll be prompted to:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Select a template from the available options</li>
              <li>Choose extensions compatible with the selected template</li>
              <li>Configure template-specific options (if available)</li>
              <li>Confirm your choices before project creation</li>
            </ol>

            <p className="mt-4">
              This mode is especially useful for beginners or when you're not sure which template or extensions to use.
            </p>
          </section>

          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/docs/templates/customization">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Template Customization
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
