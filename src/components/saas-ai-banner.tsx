import {
  BookOpen,
  Bot,
  Building2,
  Database,
  Globe,
  Key,
  LayoutDashboard,
  Package,
  Shield,
  Webhook,
} from 'lucide-react';
import Link from 'next/link';
import { AnimatedGradient } from '@/components/animated-gradient';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Building2, label: 'FastAPI feature architecture' },
  { icon: Bot, label: 'uv-first tooling' },
  { icon: Key, label: 'JWT auth extension' },
  { icon: Database, label: 'PostgreSQL + SQLAlchemy' },
  { icon: Shield, label: 'Typed settings & config' },
  { icon: LayoutDashboard, label: 'Health checks + OpenAPI' },
  { icon: Webhook, label: 'Redis & Celery-ready addons' },
  { icon: Globe, label: 'Docker + Dev Container' },
  { icon: BookOpen, label: 'Docs & testing guides' },
  { icon: Package, label: 'GitHub Actions setup' },
];

export function SaasAiBanner() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/80">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AnimatedGradient />
      </div>
      {/* Node-graph dot pattern background */}
      <div className="node-graph-bg absolute inset-0 z-0 opacity-20" />
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_80%)] z-0" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-200 backdrop-blur-sm">
              <span>✨</span>
              <span>Flagship Template</span>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-green-300 leading-tight">
                FastAPI Starter
              </h2>
              <p className="text-lg text-slate-300 max-w-lg">
                Production-ready FastAPI scaffold with composable Python extensions
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-3 w-3 text-blue-400 shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-400 hover:to-green-500 text-white shadow-lg shadow-blue-900/40 transition-all duration-300"
                asChild
              >
                <Link href="/templates/fastapi-starter">Get Started →</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-400/30 bg-white/5 text-slate-200 hover:bg-white/10 hover:border-blue-400/50 backdrop-blur-sm transition-all duration-300"
                asChild
              >
                <a
                  href="https://github.com/Create-Python-App/cpa-templates/tree/main/templates/fastapi-starter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub →
                </a>
              </Button>
            </div>
          </div>

          {/* Right: code block */}
          <div className="flex items-center justify-center">
            <div className="w-full rounded-xl border border-blue-400/20 bg-slate-900/80 shadow-2xl shadow-blue-900/30 backdrop-blur-sm overflow-hidden">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/60 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-slate-400 font-mono">terminal</span>
              </div>
              {/* Code */}
              <div className="p-4 sm:p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <p className="text-green-400">$ uvx create-awesome-python-app my-api \</p>
                <p className="text-slate-300 pl-4">--template fastapi-starter \</p>
                <p className="text-slate-300 pl-4">--addons python-docker github-setup</p>
                <p className="mt-4 text-slate-500"># ✅ FastAPI scaffold ready</p>
                <p className="text-slate-500"># ✅ uv workspace + typed settings</p>
                <p className="text-slate-500"># ✅ Compose Docker + CI extensions</p>
                <p className="mt-4 animate-pulse text-blue-400">▊</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
