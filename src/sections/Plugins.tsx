'use client';

import {
  MessageSquareText,
  TrendingUp,
  PenLine,
  BarChart3,
  Mail,
  ShoppingCart,
  ContactRound,
  Cookie,
  LineChart,
  Megaphone,
  Box,
  Puzzle,
  type LucideIcon,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import SpotlightCard from '@/components/SpotlightCard';
import { usePricing } from '@/lib/usePricing';
import type { PluginPricing } from '@/lib/pricing';
import { cn } from '@/lib/utils';

const ICONS: Record<string, LucideIcon> = {
  chatbot: MessageSquareText,
  'seo-copilot': TrendingUp,
  blog: PenLine,
  analytics: BarChart3,
  newsletter: Mail,
  ecommerce: ShoppingCart,
  'contact-form': ContactRound,
  'consent-manager': Cookie,
  'google-analytics': LineChart,
  'facebook-pixel': Megaphone,
  thridify: Box,
};

function priceLabel(p: PluginPricing): { text: string; tone: 'free' | 'included' | 'paid' } {
  const paidTiers = p.tiers.filter((t) => t.price > 0);
  if (paidTiers.length > 0) {
    const min = paidTiers.reduce((a, b) => (a.price < b.price ? a : b));
    return { text: `from ${min.priceFormatted}/mo`, tone: 'paid' };
  }
  if (p.pricingModel === 'included') return { text: 'Included', tone: 'included' };
  return { text: 'Free', tone: 'free' };
}

export default function Plugins() {
  const { data } = usePricing();
  const plugins = data.plugins;

  return (
    <section id="marketplace" className="relative py-28">
      <div className="bg-cyan-glow/5 pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full blur-[150px]" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-violet-glow text-sm font-medium uppercase tracking-[0.2em]">
            <Puzzle className="mr-1.5 inline h-4 w-4" />
            Plugin marketplace
          </p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Switch capabilities <span className="text-gradient">on demand</span>
          </h2>
          <p className="mt-5 text-white/55">
            Commerce, newsletter, forms and consent come included. Turn on the AI chatbot, SEO
            Co-Pilot, auto-blogging and analytics when you're ready — metered, brand-aware, and
            priced in {data.pluginCurrency}.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plugins.map((p, i) => {
            const Icon = ICONS[p.id] ?? Puzzle;
            const label = priceLabel(p);
            return (
              <Reveal key={p.id} delay={(i % 3) * 0.06}>
                <SpotlightCard className="flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        'inline-flex h-11 w-11 items-center justify-center rounded-xl',
                        label.tone === 'paid'
                          ? 'bg-accent-gradient text-ink'
                          : 'bg-white/5 text-white/80'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-1 text-[0.7rem] font-medium',
                        label.tone === 'paid'
                          ? 'border-violet-glow/40 text-violet-glow border'
                          : label.tone === 'included'
                            ? 'border-cyan-glow/30 text-cyan-glow border'
                            : 'border border-white/15 text-white/55'
                      )}
                    >
                      {label.text}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                    {p.description}
                  </p>

                  {p.tiers.filter((t) => t.price > 0).length > 0 && (
                    <div className="border-ink-line mt-4 flex flex-wrap gap-1.5 border-t pt-4">
                      {p.tiers.map((t) => (
                        <span
                          key={t.tier}
                          className="rounded-md bg-white/5 px-2 py-1 text-[0.7rem] text-white/50"
                        >
                          {t.displayName} · {t.priceFormatted}
                        </span>
                      ))}
                    </div>
                  )}
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}