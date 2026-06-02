'use client';

import { Check } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import { usePricing, SELECTABLE_CURRENCIES } from '@/lib/usePricing';
import type { Tier } from '@/lib/pricing';

const CTA_LABEL: Record<string, string> = {
  free: 'Start free',
  starter: 'Start 14-day trial',
  pro: 'Start 14-day trial',
  business: 'Talk to us',
};

export default function Pricing() {
  const { data, loading, live, currencyOverride, setCurrency } = usePricing();
  const plans = data.platform.plans;

  return (
    <section id="pricing" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">Pricing</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Priced for the <span className="text-gradient">real world</span>
          </h2>
          <p className="mt-5 text-white/55">
            One subscription replaces a dozen. Free to start, shown in{' '}
            <span className="text-white/80">{data.displayCurrency}</span>{' '}
            {data.country ? `(detected for ${data.country})` : ''} — billed via{' '}
            {data.gateway === 'razorpay' ? 'Razorpay' : 'Stripe'}.
          </p>
        </Reveal>

        {/* currency switcher */}
        <Reveal delay={0.05} className="mt-8 flex justify-center">
          <div className="border-ink-line bg-ink-card/60 inline-flex flex-wrap items-center justify-center gap-1 rounded-full border p-1">
            {SELECTABLE_CURRENCIES.map((cur) => {
              const active = (currencyOverride ?? data.displayCurrency) === cur;
              return (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  data-cursor="hover"
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                    active ? 'bg-accent-gradient text-ink' : 'text-white/55 hover:text-white'
                  )}
                >
                  {cur}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          className={cn(
            'mt-12 grid grid-cols-1 gap-5 transition-opacity lg:grid-cols-4',
            loading && 'opacity-50'
          )}
        >
          {plans.map((t, i) => (
            <Reveal key={t.tier} delay={i * 0.08}>
              <PlanCard tier={t} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          {live
            ? 'Live pricing from the Tyashin billing service.'
            : 'Showing reference pricing — connect to see your local currency.'}{' '}
          Plugins are billed separately (see below). Prices exclude taxes.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ tier }: { tier: Tier }) {
  const highlight = !!tier.recommended;
  const [blurb, ...features] = tier.features;

  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-3xl p-7',
        highlight
          ? 'border-gradient bg-ink-card shadow-violet-glow/10 shadow-2xl'
          : 'border-ink-line bg-ink-card/60 border'
      )}
    >
      {highlight && (
        <>
          <div className="bg-accent-gradient absolute inset-x-0 top-0 h-px" />
          <span className="bg-accent-gradient text-ink absolute right-5 top-5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium">
            Popular
          </span>
        </>
      )}
      <h3 className="font-display text-lg font-semibold text-white">{tier.displayName}</h3>
      <p className="mt-1 min-h-[2.5rem] text-sm text-white/50">{blurb}</p>
      <div className="mt-5 flex items-end gap-1">
        <span className="font-display text-4xl font-semibold text-white">
          {tier.priceFormatted}
        </span>
        {tier.price > 0 && <span className="mb-1 text-sm text-white/45">/mo</span>}
      </div>
      <ul className="mt-6 flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
            <Check className="text-cyan-glow mt-0.5 h-4 w-4 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <Button href="#cta" variant={highlight ? 'primary' : 'ghost'} className="w-full">
          {CTA_LABEL[tier.tier] ?? 'Get started'}
        </Button>
      </div>
    </div>
  );
}