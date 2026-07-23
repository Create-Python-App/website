import { ArrowRight, MessagesSquare, Sparkles } from 'lucide-react';
import { AnimatedGradient } from '@/components/animated-gradient';
import { CommunityLogo } from '@/components/community-logo';
import { Button } from '@/components/ui/button';
import { DISCORD_INVITE_URL, DISCORD_WIDGET_SRC } from '@/lib/community';

const highlights = [
  { icon: MessagesSquare, label: 'Chat across Node, Python, and V' },
  { icon: Sparkles, label: 'Good first issues and contributor help' },
];

export function DiscordCommunitySection() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/70">
      <div className="absolute inset-0 z-0 opacity-35">
        <AnimatedGradient />
      </div>
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_80%)] z-0" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <CommunityLogo size={88} className="rounded-2xl border border-white/10 shadow-lg shadow-teal-900/30" />

            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-100 backdrop-blur-sm">
              <span>Community</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-amber-300 leading-tight">
                Hang out on Discord
              </h2>
              <p className="text-lg text-slate-300 max-w-lg">
                Join Create Awesome for live chat, good first issues, and collaboration across the Node, Python, and V
                ecosystems.
              </p>
            </div>

            <ul className="space-y-2">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-slate-200">
                  <Icon className="h-4 w-4 shrink-0 text-amber-400" aria-hidden />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-400 hover:to-amber-400 text-slate-950 font-semibold shadow-lg shadow-teal-900/40 transition-all duration-300"
                asChild
              >
                <a href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
                  Join Discord
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-2 shadow-2xl shadow-indigo-950/40 backdrop-blur-sm">
              <iframe
                src={DISCORD_WIDGET_SRC}
                width={350}
                height={500}
                allowTransparency
                frameBorder={0}
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                title="Create Awesome Discord server widget"
                className="max-w-full rounded-lg bg-slate-950"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
