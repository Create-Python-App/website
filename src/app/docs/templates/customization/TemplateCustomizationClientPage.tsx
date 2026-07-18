'use client';

import { ArrowLeft, ArrowRight, FileCode, Layers, Package, Settings } from 'lucide-react';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TemplateCustomizationClientPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Template Customization</h1>
          <p className="text-lg text-muted-foreground">Learn how to customize templates to fit your specific needs</p>
        </div>

        <div className="space-y-8">
          <section id="customization-basics" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Customization Basics</h2>
            <p>
              Templates provided by create-awesome-python-app are designed to be customizable. This guide shows how to
              adapt generated Python projects — from project layout and tooling configuration to dependencies and
              environment settings.
            </p>

            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  Project Structure Customization
                </h3>
                <p>After scaffolding, reorganize modules to match your domain. Common patterns across CPA templates:</p>

                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Feature modules</h4>
                    <p className="text-sm text-muted-foreground">
                      Group routers, services, and schemas by feature (e.g. <code>src/users/</code>,{' '}
                      <code>src/billing/</code>).
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Shared core</h4>
                    <p className="text-sm text-muted-foreground">
                      Keep cross-cutting code in <code>src/core/</code> or <code>packages/common/</code> for workspace
                      templates.
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Settings layout</h4>
                    <p className="text-sm text-muted-foreground">
                      Centralize configuration with pydantic-settings; extend the generated settings class rather than
                      scattering env reads.
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Tests mirror src</h4>
                    <p className="text-sm text-muted-foreground">
                      Place tests under <code>tests/</code> mirroring the package layout for easier navigation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Configuration Customization
                </h3>
                <p>Templates ship with uv, Ruff, pytest, and type-checker defaults you can tune:</p>

                <Tabs defaultValue="pyproject" className="w-full mt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pyproject">pyproject.toml</TabsTrigger>
                    <TabsTrigger value="ruff">Ruff</TabsTrigger>
                    <TabsTrigger value="pytest">pytest</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pyproject" className="mt-2">
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm overflow-x-auto">
                        {`[project]
name = "my-app"
requires-python = ">=3.12"
dependencies = [
  "fastapi>=0.115",
  "uvicorn[standard]>=0.32",
]

[dependency-groups]
dev = [
  "pytest>=8.0",
  "ruff>=0.8",
  "mypy>=1.13",
]

[tool.uv]
dev-dependencies = []`}
                      </pre>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Adjust Python version bounds, add runtime deps with <code>uv add</code>, and extend dev tooling in{' '}
                      <code>[dependency-groups]</code>.
                    </p>
                  </TabsContent>
                  <TabsContent value="ruff" className="mt-2">
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm overflow-x-auto">
                        {`[tool.ruff]
line-length = 100
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B"]
ignore = ["B008"]  # example: allow Depends() in FastAPI defaults`}
                      </pre>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Run <code>uv run ruff check .</code> and <code>uv run ruff format .</code> after changing rules.
                    </p>
                  </TabsContent>
                  <TabsContent value="pytest" className="mt-2">
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm overflow-x-auto">
                        {`[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-q"
filterwarnings = [
  "error::DeprecationWarning",
]`}
                      </pre>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      FastAPI templates use <code>httpx.AsyncClient</code> fixtures; Django templates use pytest-django
                      markers — extend rather than replace them.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Dependency Customization
                </h3>
                <p>Manage dependencies with uv after scaffolding:</p>

                <div className="rounded-md bg-muted p-4 mt-4">
                  <pre className="text-sm overflow-x-auto">
                    {`# Add a runtime dependency
uv add httpx

# Add a dev dependency
uv add --dev pytest-asyncio

# Update the lockfile after manual pyproject edits
uv sync

# Remove a dependency
uv remove unused-package`}
                  </pre>
                </div>

                <p className="mt-4">
                  After adding packages that need app wiring (ORM, Redis, Sentry), follow the extension or template docs
                  for initialization hooks.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Adding Extensions After Project Creation
                </h3>
                <p>
                  If you want extensions on an existing project, you can manually port the files from{' '}
                  <a
                    href="https://github.com/Create-Python-App/cpa-templates/tree/main/extensions"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    cpa-templates/extensions
                  </a>{' '}
                  or re-scaffold with the desired combination:
                </p>

                <ol className="list-decimal pl-6 space-y-4 mt-4">
                  <li>
                    <strong>Manual integration:</strong> Copy extension files and merge <code>pyproject.toml</code>{' '}
                    fragments, then run <code>uv sync</code>.
                  </li>
                  <li>
                    <strong>Re-scaffold:</strong> Create a fresh project with the same template plus extensions, then
                    migrate your application code.
                  </li>
                  <li>
                    <strong>Git branch:</strong> Apply extension changes on a branch and merge after review.
                  </li>
                </ol>

                <Alert className="mt-4">
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>
                    The CLI applies extensions at scaffold time only. Post-create extension application may be added in
                    future releases.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </section>

          <section id="template-specific-customization" className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">Template-Specific Customization</h2>
            <p>Different CPA templates have distinct extension points:</p>

            <Tabs defaultValue="fastapi" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="fastapi">FastAPI</TabsTrigger>
                <TabsTrigger value="django">Django</TabsTrigger>
                <TabsTrigger value="cli">CLI</TabsTrigger>
                <TabsTrigger value="workspace">uv Workspace</TabsTrigger>
              </TabsList>
              <TabsContent value="fastapi" className="mt-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">FastAPI Starter</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Routers:</strong> Register new routers in the app factory; pair with{' '}
                      <code>fastapi-sqlalchemy</code> or <code>fastapi-auth-jwt</code> when needed.
                    </li>
                    <li>
                      <strong>Settings:</strong> Extend the generated <code>Settings</code> class for new env vars.
                    </li>
                    <li>
                      <strong>Observability:</strong> Add <code>fastapi-sentry</code> during scaffold or wire Sentry
                      manually in lifespan hooks.
                    </li>
                  </ul>
                  <div className="rounded-md bg-muted p-4 mt-4">
                    <pre className="text-sm overflow-x-auto">
                      {`# app/main.py (simplified)
from fastapi import FastAPI
from app.api.routes import health, users

app = FastAPI(title="my-app")
app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(users.router, prefix="/users", tags=["users"])`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="django" className="mt-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Django API</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Apps:</strong> Add Django apps under the project package; register in{' '}
                      <code>INSTALLED_APPS</code>.
                    </li>
                    <li>
                      <strong>DRF:</strong> Define serializers and viewsets; keep URL routing in <code>urls.py</code>.
                    </li>
                    <li>
                      <strong>Database:</strong> Pair with <code>postgres</code> for local Compose services.
                    </li>
                    <li>
                      <strong>Containers:</strong> Add <code>django-docker</code> for gunicorn/runserver images.
                    </li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="cli" className="mt-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">CLI Starter</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Commands:</strong> Add Typer subcommands under the generated CLI package.
                    </li>
                    <li>
                      <strong>Entry point:</strong> Console script is declared in <code>pyproject.toml</code> — update
                      the target if you rename modules.
                    </li>
                    <li>
                      <strong>Testing:</strong> Use Typer&apos;s <code>CliRunner</code> in pytest for command coverage.
                    </li>
                  </ul>
                  <div className="rounded-md bg-muted p-4 mt-4">
                    <pre className="text-sm overflow-x-auto">
                      {`import typer

app = typer.Typer()

@app.command()
def greet(name: str) -> None:
    typer.echo(f"Hello, {name}!")`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="workspace" className="mt-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">uv Workspace Starter</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Members:</strong> Add libraries under <code>packages/</code> and apps under{' '}
                      <code>apps/</code>; declare workspace members in root <code>pyproject.toml</code>.
                    </li>
                    <li>
                      <strong>Shared tooling:</strong> Keep Ruff/pytest config at the workspace root.
                    </li>
                    <li>
                      <strong>Running:</strong> Use <code>uv run --package &lt;member&gt; ...</code> to target a
                      specific app or library.
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          <section id="advanced-customization" className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">Advanced Customization</h2>
            <p>For deeper changes, adjust runtime configuration and deployment artifacts:</p>

            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Environment Variables</h3>
                <p>
                  Use <code>.env</code> locally (never commit secrets) and typed settings in code:
                </p>

                <div className="rounded-md bg-muted p-4 mt-4">
                  <pre className="text-sm overflow-x-auto">
                    {`# .env.example
APP_ENV=development
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/app
SENTRY_DSN=`}
                  </pre>
                </div>

                <div className="rounded-md bg-muted p-4 mt-2">
                  <pre className="text-sm overflow-x-auto">
                    {`from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    app_env: str = "development"
    database_url: str`}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Docker & Compose</h3>
                <p>
                  When you scaffold with <code>fastapi-docker</code>, customize <code>Dockerfile</code>,{' '}
                  <code>compose.yml</code>, and health checks for your deployment target. Rebuild with{' '}
                  <code>docker compose up --build</code> after changes.
                </p>
              </div>
            </div>
          </section>

          <div className="flex justify-center mt-8">
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button variant="outline" asChild>
                <Link href="/docs/contributing">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Contributing
                </Link>
              </Button>
              <Button asChild>
                <Link href="/docs/advanced/usage">
                  Advanced Usage
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
