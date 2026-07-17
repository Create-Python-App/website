import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

import { DiagramWorkflow } from '@/components/diagram-workflow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Contributing | Create Awesome Node App Documentation',
  description: 'Learn how to contribute templates and extensions to create-awesome-node-app',
};

export default function ContributingPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contributing to create-awesome-node-app</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to contribute templates and extensions to the project
          </p>
        </div>

        <div className="space-y-8">
          <section id="contributing-overview" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Contribution Overview</h2>
            <p>The create-awesome-node-app project welcomes contributions from the community. You can contribute by:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Adding new templates</li>
              <li>Adding new extensions</li>
              <li>Improving existing templates or extensions</li>
              <li>Fixing bugs or adding features to the CLI</li>
            </ul>

            <p>
              This guide focuses on contributing templates and extensions, which are the most common types of
              contributions.
            </p>

            <DiagramWorkflow
              title="Contribution Workflow"
              chart={`
graph TD
    A["Fork Repository"] --> B["Create New Template/Extension"]
    B --> C["Add Entry to templates.json"]
    C --> D["Test Locally"]
    D --> E["Create Pull Request"]
    E --> F["Review Process"]
    F --> G["Merged!"]
              `}
            />
          </section>

          <section id="contributing-templates" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Contributing New Templates</h2>
            <p>
              Templates are the foundation of create-awesome-node-app. They provide the initial structure and
              configuration for new projects. This guide will walk you through the process of creating and contributing
              a new template.
            </p>

            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    1
                  </span>
                  Template Structure
                </h3>
                <p>
                  A template is essentially a complete project structure that serves as a starting point. Here's the
                  recommended structure for a template:
                </p>

                <div className="rounded-md bg-muted p-4 mt-4">
                  <pre className="text-sm overflow-x-auto">
                    {`templates/
└── your-template-name/
    ├── public/           # Static assets
    ├── src/              # Source code
    │   ├── components/   # React components (for frontend templates)
    │   ├── lib/          # Utility functions and libraries
    │   └── styles/       # CSS and styling
    ├── .gitignore        # Git ignore file
    ├── package.json      # Package dependencies and scripts
    ├── README.md         # Template documentation
    └── tsconfig.json     # TypeScript configuration (if applicable)`}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    2
                  </span>
                  Adding Your Template to templates.json
                </h3>
                <p>
                  Each template must be registered in the <code>templates.json</code> file. This file helps the CLI
                  understand how to use and present your template.
                </p>

                <div className="rounded-md bg-muted p-4 mt-4">
                  <pre className="text-sm overflow-x-auto">
                    {`{
  "templates": [
    // ... existing templates
    {
      "name": "Your Template Name",
      "slug": "your-template-name",
      "description": "A concise description of your template",
      "url": "https://github.com/Create-Node-App/cna-templates/tree/main/templates/your-template-name",
      "type": "template-type",
      "category": "category-slug",
      "labels": ["Label1", "Label2", "Label3"]
    }
  ]
}`}
                  </pre>
                </div>

                <p className="mt-4">Here's what each property means:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>name</strong>: The display name of your template
                  </li>
                  <li>
                    <strong>slug</strong>: A unique identifier for your template (URL-friendly)
                  </li>
                  <li>
                    <strong>description</strong>: A brief description of what your template offers
                  </li>
                  <li>
                    <strong>url</strong>: The URL to your template in the repository
                  </li>
                  <li>
                    <strong>type</strong>: The type of template (e.g., "react", "nestjs-backend", "nextjs")
                  </li>
                  <li>
                    <strong>category</strong>: The category slug from the categories section
                  </li>
                  <li>
                    <strong>labels</strong>: Keywords that describe your template
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    3
                  </span>
                  Creating a Template
                </h3>
                <p>Follow these steps to create a new template:</p>

                <ol className="list-decimal pl-6 space-y-4 mt-4">
                  <li>
                    <strong>Start with a working project:</strong> Begin with a fully functional project that you want
                    to turn into a template.
                  </li>
                  <li>
                    <strong>Clean up the project:</strong> Remove any unnecessary files, personal configurations, or
                    environment-specific settings.
                  </li>
                  <li>
                    <strong>Add template documentation:</strong> Create a comprehensive README.md that explains the
                    template's purpose, features, and usage.
                  </li>
                  <li>
                    <strong>Add custom options (optional):</strong> If your template supports customization, add a{' '}
                    <code>customOptions</code> property to your template entry in <code>templates.json</code>.
                  </li>
                  <li>
                    <strong>Test your template:</strong> Ensure that your template can be used to create a new project
                    that works correctly.
                  </li>
                </ol>

                <div className="rounded-md bg-muted p-4 mt-4">
                  <pre className="text-sm overflow-x-auto">
                    {`// Example of customOptions in templates.json
"customOptions": [
  {
    "name": "srcDir",
    "type": "text",
    "message": "Subdirectory to put all source content (e.g., \`src\`). Leave blank to use the root directory.",
    "initial": "src"
  },
  {
    "name": "projectImportPath",
    "type": "text",
    "message": "Import alias to use for the project, e.g., \`@/\`",
    "initial": "@/"
  }
]`}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    4
                  </span>
                  Submitting Your Template
                </h3>
                <p>
                  Once your template is ready, you can submit it for inclusion in the create-awesome-node-app project:
                </p>

                <ol className="list-decimal pl-6 space-y-4 mt-4">
                  <li>
                    <strong>Fork the repository:</strong> Create a fork of the{' '}
                    <a
                      href="https://github.com/Create-Node-App/cna-templates"
                      target="_blank"
                      className="text-primary hover:underline"
                      rel="noreferrer"
                    >
                      cna-templates repository
                    </a>{' '}
                    on GitHub.
                  </li>
                  <li>
                    <strong>Add your template:</strong> Place your template in the <code>templates/</code> directory.
                  </li>
                  <li>
                    <strong>Update templates.json:</strong> Add your template to the <code>templates.json</code> file as
                    described above.
                  </li>
                  <li>
                    <strong>Create a pull request:</strong> Submit a pull request with a clear description of your
                    template.
                  </li>
                </ol>
              </div>

              <Alert className="mt-6">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Template Review Process</AlertTitle>
                <AlertDescription>
                  All submitted templates undergo a review process to ensure quality and compatibility. The maintainers
                  will provide feedback and may request changes before merging your contribution.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          <section id="contributing-extensions" className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">Contributing Extensions</h2>
            <p>
              Extensions enhance templates with additional functionality. They are modular and can be applied to
              compatible templates.
            </p>

            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    1
                  </span>
                  Extension Structure
                </h3>
                <p>
                  An extension typically consists of files that will be added to or modified in a template. Here's a
                  recommended structure:
                </p>

                <div className="rounded-md bg-muted p-4 mt-4">
                  <pre className="text-sm overflow-x-auto">
                    {`extensions/
└── your-extension-name/
    ├── files/           # Files to be added to the template
    │   ├── src/         # Source files to be added
    │   └── ...          # Other files
    ├── dependencies.json # Dependencies to be added to package.json
    ├── scripts.json     # Scripts to be added to package.json
    └── README.md        # Extension documentation`}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    2
                  </span>
                  Adding Your Extension to templates.json
                </h3>
                <p>
                  Each extension must be registered in the <code>templates.json</code> file:
                </p>

                <div className="rounded-md bg-muted p-4 mt-4">
                  <pre className="text-sm overflow-x-auto">
                    {`{
  "extensions": [
    // ... existing extensions
    {
      "name": "Your Extension Name",
      "slug": "your-extension-name",
      "description": "A concise description of your extension",
      "url": "https://github.com/Create-Node-App/cna-templates/tree/main/extensions/your-extension-name",
      "type": ["template-type1", "template-type2"],
      "category": "Extension Category",
      "labels": ["Label1", "Label2", "Label3"]
    }
  ]
}`}
                  </pre>
                </div>

                <p className="mt-4">Here's what each property means:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>name</strong>: The display name of your extension
                  </li>
                  <li>
                    <strong>slug</strong>: A unique identifier for your extension (URL-friendly)
                  </li>
                  <li>
                    <strong>description</strong>: A brief description of what your extension offers
                  </li>
                  <li>
                    <strong>url</strong>: The URL to your extension in the repository
                  </li>
                  <li>
                    <strong>type</strong>: The type(s) of templates this extension is compatible with (string or array
                    of strings)
                  </li>
                  <li>
                    <strong>category</strong>: The category of the extension (e.g., "UI", "State Management", "Tooling")
                  </li>
                  <li>
                    <strong>labels</strong>: Keywords that describe your extension
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    3
                  </span>
                  Creating an Extension
                </h3>
                <p>Follow these steps to create a new extension:</p>

                <ol className="list-decimal pl-6 space-y-4 mt-4">
                  <li>
                    <strong>Identify the need:</strong> Determine what functionality you want to add to existing
                    templates.
                  </li>
                  <li>
                    <strong>Create the extension files:</strong> Prepare the files that will be added to or modified in
                    the template.
                  </li>
                  <li>
                    <strong>Define dependencies:</strong> Create a <code>dependencies.json</code> file listing any npm
                    packages your extension requires.
                  </li>
                  <li>
                    <strong>Add scripts:</strong> If your extension needs to add scripts to <code>package.json</code>,
                    create a <code>scripts.json</code> file.
                  </li>
                  <li>
                    <strong>Document your extension:</strong> Create a README.md that explains how to use your extension
                    and what it provides.
                  </li>
                </ol>

                <div className="rounded-md bg-muted p-4 mt-4">
                  <pre className="text-sm overflow-x-auto">
                    {`// Example dependencies.json
{
  "dependencies": {
    "axios": "^1.3.4",
    "react-query": "^3.39.3"
  },
  "devDependencies": {
    "@types/axios": "^0.14.0"
  }
}

// Example scripts.json
{
  "scripts": {
    "api:generate": "openapi-generator-cli generate -i api-spec.yaml -g typescript-axios -o src/api"
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    4
                  </span>
                  Ensuring Compatibility
                </h3>
                <p>
                  Extensions must be compatible with the templates they're designed for. Here's how to ensure
                  compatibility:
                </p>

                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>
                    <strong>Specify compatible template types:</strong> In your extension's entry in{' '}
                    <code>templates.json</code>, list all compatible template types in the <code>type</code> property.
                  </li>
                  <li>
                    <strong>Test with all compatible templates:</strong> Verify that your extension works correctly with
                    all the template types you've specified.
                  </li>
                  <li>
                    <strong>Handle template variations:</strong> If templates have different structures (e.g., with or
                    without a <code>src</code> directory), make your extension adaptable.
                  </li>
                </ul>

                <div className="rounded-md bg-muted p-4 mt-4">
                  <pre className="text-sm overflow-x-auto">
                    {`// Example of specifying multiple compatible template types
"type": ["react", "nextjs", "webextension-react"]`}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    5
                  </span>
                  Submitting Your Extension
                </h3>
                <p>The process for submitting an extension is similar to submitting a template:</p>

                <ol className="list-decimal pl-6 space-y-4 mt-4">
                  <li>
                    <strong>Fork the repository:</strong> Create a fork of the{' '}
                    <a
                      href="https://github.com/Create-Node-App/cna-templates"
                      target="_blank"
                      className="text-primary hover:underline"
                      rel="noreferrer"
                    >
                      cna-templates repository
                    </a>{' '}
                    on GitHub.
                  </li>
                  <li>
                    <strong>Add your extension:</strong> Place your extension in the <code>extensions/</code> directory.
                  </li>
                  <li>
                    <strong>Update templates.json:</strong> Add your extension to the <code>templates.json</code> file
                    as described above.
                  </li>
                  <li>
                    <strong>Create a pull request:</strong> Submit a pull request with a clear description of your
                    extension.
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <section id="best-practices" className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">Best Practices for Template and Extension Design</h2>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Project Structure</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Follow a clear and logical directory structure</li>
                  <li>Group related files together</li>
                  <li>Use consistent naming conventions</li>
                  <li>Include appropriate configuration files</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Code Quality</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Include linting and formatting configurations</li>
                  <li>Set up TypeScript for type safety</li>
                  <li>Add comprehensive comments where necessary</li>
                  <li>Follow best practices for the technologies used</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide a detailed README.md</li>
                  <li>Include usage examples</li>
                  <li>Document available scripts and commands</li>
                  <li>Explain any non-standard configurations</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Compatibility</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ensure compatibility with supported extensions</li>
                  <li>Use the latest stable versions of dependencies</li>
                  <li>Test with different Node.js versions</li>
                  <li>Consider cross-platform compatibility</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="flex justify-center mt-8">
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
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
    </div>
  );
}
