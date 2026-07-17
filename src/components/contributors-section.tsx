import { ArrowRight, Github, HeartHandshake, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ContributorsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Open source</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-600">
              Build with us
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Users scaffold with one command. Contributors improve the CLI, templates, and docs in the open.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90"
                asChild
              >
                <Link href="https://github.com/Create-Python-App/create-python-app/blob/main/CONTRIBUTING.md">
                  Contributing guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/Create-Python-App">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub org
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-primary/10 bg-card/80 gradient-border-subtle">
              <CardHeader>
                <ShieldCheck className="h-6 w-6 text-green-600 mb-2" />
                <CardTitle className="text-lg">Trusted tooling</CardTitle>
                <CardDescription>CI-friendly scaffolding, MIT license, and curated templates.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-primary/10 bg-card/80 gradient-border-subtle">
              <CardHeader>
                <HeartHandshake className="h-6 w-6 text-primary mb-2" />
                <CardTitle className="text-lg">Welcoming PRs</CardTitle>
                <CardDescription>Docs, templates, extensions, and DX fixes are all welcome.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="https://pypi.org/project/create-awesome-python-app/"
                  className="text-sm text-green-700 dark:text-green-300 hover:underline"
                >
                  PyPI: create-awesome-python-app
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
