import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { DiagramWorkflow } from '@/components/diagram-workflow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata = {
  title: 'Advanced Usage | Create Awesome Node App Documentation',
  description: 'Advanced usage guide for create-awesome-node-app',
};

export default function AdvancedUsagePage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Advanced Usage</h1>
          <p className="text-lg text-muted-foreground">
            Advanced techniques and configurations for create-awesome-node-app
          </p>
        </div>

        <div className="space-y-8">
          <section id="package-managers" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Using Different Package Managers</h2>
            <p>
              create-awesome-node-app supports multiple package managers. You can choose the one that best fits your
              workflow:
            </p>

            <Tabs defaultValue="npm" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="yarn">Yarn</TabsTrigger>
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              </TabsList>
              <TabsContent value="npm" className="mt-2">
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm overflow-x-auto">
                    {`# Create a new project with npm
npx create-awesome-node-app my-app

# Specify package manager explicitly
npx create-awesome-node-app my-app --use-npm

# Install dependencies
cd my-app
npm install

# Run development server
npm run dev`}
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="yarn" className="mt-2">
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm overflow-x-auto">
                    {`# Create a new project with Yarn
yarn create awesome-node-app my-app

# Specify package manager explicitly
npx create-awesome-node-app my-app --use-yarn

# Install dependencies
cd my-app
yarn

# Run development server
yarn dev`}
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="pnpm" className="mt-2">
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm overflow-x-auto">
                    {`# Create a new project with pnpm
pnpm create awesome-node-app my-app

# Specify package manager explicitly
npx create-awesome-node-app my-app --use-pnpm

# Install dependencies
cd my-app
pnpm install

# Run development server
pnpm dev`}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>

            <Alert className="mt-4">
              <AlertTitle>Package Manager Detection</AlertTitle>
              <AlertDescription>
                create-awesome-node-app automatically detects the package manager you're using. If you want to override
                this behavior, use the <code>--use-yarn</code> or <code>--use-pnpm</code> flag.
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
                    npx create-awesome-node-app my-app --addons github-setup
                  </pre>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Docker Compose</h3>
                <p className="text-sm text-muted-foreground">
                  The Docker Compose Setup extension adds Docker environments for development and production.
                </p>
                <div className="mt-4">
                  <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
                    npx create-awesome-node-app my-app --addons docker-compose-setup
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">Deployment Workflow</h3>
              <p className="mt-2">Here's a typical deployment workflow for a create-awesome-node-app project:</p>

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
            <p>create-awesome-node-app offers a Turborepo Boilerplate template for monorepo setups:</p>

            <div className="rounded-md bg-muted p-4 mt-4">
              <pre className="text-sm overflow-x-auto">
                {`# Create a new monorepo project
npx create-awesome-node-app my-monorepo --template turborepo-boilerplate

# Navigate to the project
cd my-monorepo

# Run all packages in development mode
npm run dev

# Build all packages
npm run build`}
              </pre>
            </div>

            <p className="mt-4">The Turborepo Boilerplate template includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Turborepo configuration for efficient builds</li>
              <li>Workspace setup for managing multiple packages</li>
              <li>Shared configurations for TypeScript, ESLint, and other tools</li>
              <li>Example packages to demonstrate the monorepo structure</li>
            </ul>
          </section>

          <section id="troubleshooting" className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">Troubleshooting Common Issues</h2>

            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
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
                    <code>npx create-awesome-node-app my-app --no-install</code>
                  </div>
                  <div className="rounded-md bg-muted p-2 mt-2">
                    <code>cd my-app && npm install</code>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
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
                    <code>npx create-awesome-node-app --list-templates</code>
                  </div>
                  <div className="rounded-md bg-muted p-2 mt-2">
                    <code>npx create-awesome-node-app --list-addons</code>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
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
                    <code>npx create-awesome-node-app my-app --interactive</code>
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
            <p>create-awesome-node-app offers a variety of templates and extensions. Here's how to list them:</p>

            <div className="rounded-md bg-muted p-4 mt-4">
              <pre className="text-sm overflow-x-auto">
                {`# List all available templates
npx create-awesome-node-app --list-templates

# List all available extensions
npx create-awesome-node-app --list-addons`}
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
              <pre className="text-sm overflow-x-auto">{`npx create-awesome-node-app my-app --interactive`}</pre>
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
