import { ArrowLeft, ArrowRight, CheckCircle, Container, Package, Terminal } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { CopyButton } from '@/components/copy-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Installation | Create Awesome Python App Documentation',
  description:
    'Install create-awesome-python-app via uvx/PyPI, Homebrew, AUR, or Docker. Get up and running in seconds.',
  alternates: { canonical: '/docs/installation' },
  openGraph: {
    title: 'Installation | Create Awesome Python App Documentation',
    description:
      'Install create-awesome-python-app via uvx/PyPI, Homebrew, AUR, or Docker. Get up and running in seconds.',
    url: '/docs/installation',
    type: 'article',
  },
};

const methods = [
  {
    id: 'uv',
    label: 'uv / PyPI',
    icon: <Package className="h-4 w-4" />,
    recommended: true,
  },
  {
    id: 'homebrew',
    label: 'Homebrew',
    icon: <Terminal className="h-4 w-4" />,
    recommended: false,
  },
  {
    id: 'aur',
    label: 'AUR',
    icon: <Terminal className="h-4 w-4" />,
    recommended: false,
  },
  {
    id: 'docker',
    label: 'Docker',
    icon: <Container className="h-4 w-4" />,
    recommended: false,
  },
];

export default function InstallationPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Installation</h1>
          <p className="text-lg text-muted-foreground">
            Get <code>create-awesome-python-app</code> running in seconds. Choose the install method that fits your
            workflow.
          </p>
        </div>

        <Alert className="border-primary/30 bg-primary/5">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertTitle>No global install required</AlertTitle>
          <AlertDescription>
            The fastest way is <code>uvx create-awesome-python-app@latest</code> — no global install needed. Python
            3.12+ is required for generated projects; <code>uv</code> installs the CLI on the fly.
          </AlertDescription>
        </Alert>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Install methods</h2>

          <Tabs defaultValue="uv">
            <TabsList className="flex h-auto flex-wrap gap-1">
              {methods.map((m) => (
                <TabsTrigger key={m.id} value={m.id} className="flex items-center gap-1.5">
                  {m.icon}
                  {m.label}
                  {m.recommended && (
                    <Badge variant="secondary" className="ml-1 text-[10px] px-1 py-0">
                      recommended
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="uv" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    uv / PyPI
                  </CardTitle>
                  <CardDescription>
                    Works on macOS, Linux, and Windows. Requires{' '}
                    <a
                      href="https://docs.astral.sh/uv/"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      uv
                    </a>
                    .
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <p className="text-sm font-medium mb-2">Run without installing (recommended):</p>
                    <CopyButton
                      command="uvx create-awesome-python-app@latest my-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Pin a version:</p>
                    <CopyButton
                      command="uvx create-awesome-python-app@0.2.0 my-app --template fastapi-starter --no-interactive"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Install with pipx (optional):</p>
                    <CopyButton
                      command="pipx install create-awesome-python-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      After install you can run <code>create-awesome-python-app my-app</code> directly.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Install with pip into a virtualenv (optional):</p>
                    <CopyButton
                      command="pip install create-awesome-python-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Python 3.12 or later</p>
                      <p className="text-xs text-muted-foreground">
                        Check with <code>python --version</code>. Install via{' '}
                        <a
                          href="https://docs.astral.sh/uv/guides/install-python/"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          uv python install
                        </a>
                        ,{' '}
                        <a
                          href="https://github.com/pyenv/pyenv"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          pyenv
                        </a>
                        , or{' '}
                        <a
                          href="https://www.python.org/downloads/"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          python.org
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">uv (recommended)</p>
                      <p className="text-xs text-muted-foreground">
                        Install from{' '}
                        <a
                          href="https://docs.astral.sh/uv/getting-started/installation/"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          docs.astral.sh/uv
                        </a>
                        . Check with <code>uv --version</code>.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">git</p>
                      <p className="text-xs text-muted-foreground">
                        Used to initialize the project repository after scaffolding.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="homebrew" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    Homebrew
                  </CardTitle>
                  <CardDescription>macOS and Linux. Requires Homebrew installed.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">1. Add the tap:</p>
                    <CopyButton
                      command="brew tap Create-Python-App/tap"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">2. Install:</p>
                    <CopyButton
                      command="brew install create-awesome-python-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Update to latest version:</p>
                    <CopyButton
                      command="brew upgrade create-awesome-python-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>
                  <Alert>
                    <AlertDescription>
                      Homebrew will also install Python as a dependency if it is not already present on your system.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="aur" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    AUR (Arch Linux)
                  </CardTitle>
                  <CardDescription>Arch Linux and derivatives (Manjaro, EndeavourOS, etc.).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Using yay:</p>
                    <CopyButton
                      command="yay -S create-awesome-python-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Using paru:</p>
                    <CopyButton
                      command="paru -S create-awesome-python-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Manual build from PKGBUILD:</p>
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm font-mono overflow-x-auto">{`git clone https://github.com/Create-Python-App/aur-package.git
cd aur-package
makepkg -si`}</pre>
                    </div>
                  </div>
                  <Alert>
                    <AlertDescription>
                      The AUR package installs from PyPI. Python 3.12+ must be available (via the official Arch{' '}
                      <code>python</code> package or equivalent).
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="docker" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Container className="h-5 w-5 text-primary" />
                    Docker
                  </CardTitle>
                  <CardDescription>
                    Run without any local Python installation. Useful in CI/CD pipelines.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Scaffold a project into the current directory:</p>
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm font-mono overflow-x-auto">{`docker run --rm -it \\
  -v "\${PWD}:/app" -w /app \\
  ulisesjeremias/create-awesome-python-app:latest \\
  my-app --template fastapi-starter --no-interactive`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Pin to a specific version:</p>
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm font-mono overflow-x-auto">{`docker run --rm -it \\
  -v "\${PWD}:/app" -w /app \\
  ulisesjeremias/create-awesome-python-app:0.2.0 \\
  my-app --template fastapi-starter --addons python-docker github-setup --no-interactive`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Available tags:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {[
                        { tag: 'latest', desc: 'Always the newest release' },
                        { tag: '0.2.0', desc: 'Exact version (reproducible)' },
                        { tag: '0.2', desc: 'Latest 0.2.x patch' },
                        { tag: 'v0', desc: 'Latest 0.x.y release' },
                      ].map(({ tag, desc }) => (
                        <div key={tag} className="rounded border p-2">
                          <code className="text-xs font-bold">{tag}</code>
                          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Alert>
                    <AlertDescription>
                      Mount your working directory with <code>-v {'"${PWD}:/app"'}</code> and set <code>-w /app</code>{' '}
                      so the scaffolded project appears in your current folder.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Verify the installation</h2>
          <p>After installing, confirm the CLI is available and shows the correct version:</p>
          <CopyButton
            command="create-awesome-python-app --version"
            className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
          />
          <p className="text-sm text-muted-foreground">
            Or list all available templates to confirm the CLI can reach the catalog:
          </p>
          <CopyButton
            command="create-awesome-python-app --list-templates"
            className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Keeping up to date</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { method: 'uvx', cmd: 'uvx create-awesome-python-app@latest my-app' },
              { method: 'pipx', cmd: 'pipx upgrade create-awesome-python-app' },
              { method: 'Homebrew', cmd: 'brew upgrade create-awesome-python-app' },
              { method: 'AUR (yay)', cmd: 'yay -Syu create-awesome-python-app' },
            ].map(({ method, cmd }) => (
              <div key={method} className="rounded-lg border p-4">
                <p className="text-sm font-medium mb-2">{method}</p>
                <div className="rounded bg-muted p-3">
                  <pre className="text-xs font-mono">{cmd}</pre>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            When using <code>uvx</code> without a global install, always add <code>@latest</code> (or a pinned version)
            to ensure you get the release you expect rather than a cached one.
          </p>
        </section>

        <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
          <a
            href="https://github.com/Create-Python-App/create-python-app/releases"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View release notes →
          </a>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row mt-2">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Docs
          </Link>
          <Link
            href="/docs/templates"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            Browse templates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
