import { ArrowLeft, ArrowRight, CheckCircle, Container, Package, Terminal } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { CopyButton } from '@/components/copy-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Installation | Create Awesome Node App Documentation',
  description: 'Install create-awesome-node-app via npm, Homebrew, AUR, or Docker. Get up and running in seconds.',
  alternates: { canonical: '/docs/installation' },
  openGraph: {
    title: 'Installation | Create Awesome Node App Documentation',
    description: 'Install create-awesome-node-app via npm, Homebrew, AUR, or Docker. Get up and running in seconds.',
    url: '/docs/installation',
    type: 'article',
  },
};

const methods = [
  {
    id: 'npm',
    label: 'npm / npx',
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
            Get <code>create-awesome-node-app</code> running in seconds. Choose the install method that fits your
            workflow.
          </p>
        </div>

        {/* Quick start */}
        <Alert className="border-primary/30 bg-primary/5">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertTitle>No global install required</AlertTitle>
          <AlertDescription>
            The fastest way is to use <code>npm create</code> or <code>npx</code> — no global install needed. Node.js
            22+ must be installed.
          </AlertDescription>
        </Alert>

        {/* Method tabs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Install methods</h2>

          <Tabs defaultValue="npm">
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

            {/* npm */}
            <TabsContent value="npm" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    npm / npx
                  </CardTitle>
                  <CardDescription>Works on macOS, Linux, and Windows. Requires Node.js 22+.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <p className="text-sm font-medium mb-2">Run without installing (recommended for one-off use):</p>
                    <CopyButton
                      command="npx create-awesome-node-app my-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">
                      Shorthand via <code>npm create</code>:
                    </p>
                    <CopyButton
                      command="npm create awesome-node-app@latest my-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Install globally (optional):</p>
                    <CopyButton
                      command="npm install -g create-awesome-node-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      After global install you can run <code>create-awesome-node-app my-app</code> directly.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Alternative package managers:</p>
                    <Tabs defaultValue="yarn">
                      <TabsList>
                        <TabsTrigger value="yarn">Yarn</TabsTrigger>
                        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                        <TabsTrigger value="bun">Bun</TabsTrigger>
                      </TabsList>
                      <TabsContent value="yarn" className="mt-2">
                        <div className="rounded-md bg-muted p-4">
                          <pre className="text-sm font-mono">yarn create awesome-node-app my-app</pre>
                        </div>
                      </TabsContent>
                      <TabsContent value="pnpm" className="mt-2">
                        <div className="rounded-md bg-muted p-4">
                          <pre className="text-sm font-mono">pnpm create awesome-node-app my-app</pre>
                        </div>
                      </TabsContent>
                      <TabsContent value="bun" className="mt-2">
                        <div className="rounded-md bg-muted p-4">
                          <pre className="text-sm font-mono">bunx create-awesome-node-app my-app</pre>
                        </div>
                      </TabsContent>
                    </Tabs>
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
                      <p className="text-sm font-medium">Node.js 22 LTS or later</p>
                      <p className="text-xs text-muted-foreground">
                        Check with <code>node --version</code>. Install via{' '}
                        <a
                          href="https://github.com/Schniz/fnm"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          fnm
                        </a>
                        ,{' '}
                        <a
                          href="https://github.com/volta-cli/volta"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Volta
                        </a>
                        , or{' '}
                        <a
                          href="https://nodejs.org"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          nodejs.org
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">npm 11+, yarn, pnpm, or bun</p>
                      <p className="text-xs text-muted-foreground">
                        npm 11 ships with Node 22. Check with <code>npm --version</code>.
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

            {/* Homebrew */}
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
                      command="brew tap Create-Node-App/tap"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">2. Install:</p>
                    <CopyButton
                      command="brew install create-awesome-node-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Update to latest version:</p>
                    <CopyButton
                      command="brew upgrade create-awesome-node-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>
                  <Alert>
                    <AlertDescription>
                      Homebrew will also install Node.js as a dependency if it is not already present on your system.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AUR */}
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
                      command="yay -S create-awesome-node-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Using paru:</p>
                    <CopyButton
                      command="paru -S create-awesome-node-app"
                      className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Manual build from PKGBUILD:</p>
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm font-mono overflow-x-auto">{`git clone https://github.com/Create-Node-App/aur-package.git
cd aur-package
makepkg -si`}</pre>
                    </div>
                  </div>
                  <Alert>
                    <AlertDescription>
                      The AUR package installs via npm under the hood. Node.js and npm must be installed as dependencies
                      (e.g. via the <code>nodejs</code> and <code>npm</code> packages from the official Arch repos).
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Docker */}
            <TabsContent value="docker" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Container className="h-5 w-5 text-primary" />
                    Docker
                  </CardTitle>
                  <CardDescription>
                    Run without any local Node.js installation. Useful in CI/CD pipelines.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Scaffold a project into the current directory:</p>
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm font-mono overflow-x-auto">{`docker run --rm -it \\
  -v "\${PWD}:/app" -w /app \\
  ulisesjeremias/create-awesome-node-app:latest \\
  my-app --template react-vite-boilerplate`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Pin to a specific version:</p>
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-sm font-mono overflow-x-auto">{`docker run --rm -it \\
  -v "\${PWD}:/app" -w /app \\
  ulisesjeremias/create-awesome-node-app:0.12.0 \\
  my-app --template nestjs-boilerplate --addons drizzle-orm-postgresql`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Available tags:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {[
                        { tag: 'latest', desc: 'Always the newest release' },
                        { tag: '0.12.0', desc: 'Exact version (reproducible)' },
                        { tag: '0.12', desc: 'Latest 0.12.x patch' },
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
                      The container image runs as the non-root <code>node</code> user. Mount your working directory with{' '}
                      <code>-v {'"${PWD}:/app"'}</code> and set <code>-w /app</code> so the scaffolded project appears
                      in your current folder.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Verify */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Verify the installation</h2>
          <p>After installing, confirm the CLI is available and shows the correct version:</p>
          <CopyButton
            command="create-awesome-node-app --version"
            className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
          />
          <p className="text-sm text-muted-foreground">
            Or list all available templates to confirm the CLI can reach the catalog:
          </p>
          <CopyButton
            command="create-awesome-node-app --list-templates"
            className="w-full justify-start font-mono text-sm bg-muted rounded-md px-4 py-3"
          />
        </section>

        {/* Update */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Keeping up to date</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { method: 'npm (global)', cmd: 'npm install -g create-awesome-node-app@latest' },
              { method: 'npx', cmd: 'npx create-awesome-node-app@latest my-app' },
              { method: 'Homebrew', cmd: 'brew upgrade create-awesome-node-app' },
              { method: 'AUR (yay)', cmd: 'yay -Syu create-awesome-node-app' },
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
            When using <code>npx</code> without a global install, always add <code>@latest</code> to ensure you get the
            newest version rather than a cached one.
          </p>
        </section>

        {/* Nav */}
        <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
          <a
            href="https://github.com/Create-Node-App/create-node-app/releases"
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
