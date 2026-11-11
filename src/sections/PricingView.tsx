'use client';

import { useMemo, useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import { usePricing } from '@/lib/usePricing';
import {
  estimatePlan,
  formatMoney,
  formatNumber,
  type AllPricingV2,
  type PlanV2,
} from '@/lib/pricing';
import type { InitialPricing } from '@/lib/pricing-server';
import { SIGNUP_URL } from '@/lib/app-links';

/** The plan the estimator starts from, and the one card that is highlighted. */
const DEFAULT_MIX_PLAN = 'starter';
const HIGHLIGHT_PLAN = 'pro';
/** Actions whose credit cost varies with the size of the job. */
const APPROX_OPS = new Set(['site_edit']);
const MAX_PER_ROW = 100_000;

/** Only same-site paths and https links are followed from the payload. */
function safeHref(url: string): string {
  return /^\/(?!\/)/.test(url) || /^https:\/\//i.test(url) ? url : '/contact';
}

export default function PricingView({ initial }: { initial: InitialPricing }) {
  const { data } = usePricing(initial);
  const money = (n: number) => formatMoney(n, data.currency);

  return (
    <section id="pricing" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">Pricing</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
            One plan. <span className="text-gradient">Two numbers.</span>
          </h2>
          <p className="mt-5 text-white/55">
            One subscription for your business. Pick it by how many visits you get. Every feature
            is on every plan, and AI work is paid in credits. Prices in{' '}
            <span className="text-white/80">{data.currency}</span>.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.plans.map((p, i) => (
            <Reveal key={p.plan} delay={i * 0.08} className="h-full">
              <PlanCard plan={p} price={p.price > 0 ? money(p.price) : 'Free'} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <ul className="mx-auto mt-8 grid max-w-4xl gap-x-8 gap-y-2 text-sm text-white/55 sm:grid-cols-2">
            {[
              'Traffic is a soft limit. We never take a site down for traffic.',
              'Monthly credits reset each month. Unused ones expire at month end.',
              "A new site's first build is free.",
              'Prices exclude taxes. GST or VAT is added at checkout.',
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check className="text-cyan-glow mt-0.5 h-4 w-4 shrink-0" />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Everything included */}
        <Reveal>
          <div className="border-ink-line bg-ink-card/60 mt-16 rounded-3xl border p-6 sm:p-10">
            <h3 className="font-display text-2xl font-semibold text-white">Everything included</h3>
            <p className="mt-2 text-sm text-white/55">
              On every plan, Free too. None of this uses credits.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
              {data.included.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                  <Check className="text-cyan-glow mt-0.5 h-4 w-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <Estimator data={data} />
        </Reveal>

        {/* Top-up + Enterprise */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="border-ink-line bg-ink-card/60 flex h-full flex-col rounded-3xl border p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-white">Top-up</h3>
              <p className="mt-3 text-white/80">
                <span className="font-display text-2xl font-semibold text-white">
                  {formatNumber(data.topup.credits)} credits
                </span>{' '}
                for{' '}
                <span className="font-display text-2xl font-semibold text-white">
                  {money(data.topup.price)}
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                For a busy month. Buy as many as you need. Top-up credits are valid for{' '}
                {data.topup.validityMonths} months, and your monthly credits are always spent
                first.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="border-ink-line bg-ink-card/60 flex h-full flex-col rounded-3xl border p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-white">Enterprise</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                More traffic, sites or seats than {data.plans[data.plans.length - 1].name}? Tell us
                what you run and we will quote it.
              </p>
              <div className="mt-6">
                <Button href={safeHref(data.enterprise.contactUrl)} variant="ghost">
                  Talk to us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan, price }: { plan: PlanV2; price: string }) {
  const highlight = plan.plan === HIGHLIGHT_PLAN;
  const typical = plan.typicalMonth.map((t) => `${formatNumber(t.count)} ${t.label}`).join(', ');

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
      <h3 className="font-display text-lg font-semibold text-white">{plan.name}</h3>
      {plan.featureLines[0] && (
        <p className="mt-1 text-sm text-white/50 lg:min-h-[2.5rem]">{plan.featureLines[0]}</p>
      )}
      <div className="mt-5 flex items-end gap-1">
        <span className="font-display text-4xl font-semibold text-white">{price}</span>
        {plan.price > 0 && <span className="mb-1 text-sm text-white/55">/mo</span>}
      </div>

      <div className="border-ink-line mt-6 space-y-3 border-t pt-5">
        <p>
          <span className="font-display block text-xl font-semibold text-white">
            {formatNumber(plan.visitsPerMonth)}
          </span>
          <span className="text-sm text-white/55">visits a month</span>
        </p>
        <p>
          <span className="font-display block text-xl font-semibold text-white">
            {formatNumber(plan.creditsPerMonth)}
          </span>
          <span className="text-sm text-white/55">credits a month</span>
        </p>
      </div>

      <p className="mt-4 text-sm text-white/65">
        {formatNumber(plan.sites)} {plan.sites === 1 ? 'site' : 'sites'} ·{' '}
        {formatNumber(plan.seats)} {plan.seats === 1 ? 'seat' : 'seats'}
      </p>

      {typical && (
        <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">
          <span className="text-white/80">A typical month:</span> {typical}.
        </p>
      )}

      <div className="mt-7">
        <Button href={SIGNUP_URL} variant={highlight ? 'primary' : 'ghost'} className="w-full">
          {plan.price > 0 ? `Choose ${plan.name}` : 'Start free'}
        </Button>
      </div>
    </div>
  );
}

/** Mix and match: how much AI work a month, and which plan's credits cover it. */
function Estimator({ data }: { data: AllPricingV2 }) {
  const defaults = useMemo(() => {
    const base =
      data.plans.find((p) => p.plan === DEFAULT_MIX_PLAN)?.typicalMonth ??
      data.plans[0]?.typicalMonth ??
      [];
    return Object.fromEntries(base.map((t) => [t.op, t.count]));
  }, [data.plans]);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const clamp = (n: number): number =>
    Number.isFinite(n) ? Math.min(MAX_PER_ROW, Math.max(0, Math.round(n))) : 0;
  const countOf = (op: string): number => counts[op] ?? defaults[op] ?? 0;
  const setCount = (op: string, n: number) => setCounts((c) => ({ ...c, [op]: clamp(n) }));
  // Functional update, so fast repeated taps each count.
  const bump = (op: string, by: number) =>
    setCounts((c) => ({ ...c, [op]: clamp((c[op] ?? defaults[op] ?? 0) + by) }));

  const total = data.creditExamples.reduce((sum, ex) => sum + countOf(ex.op) * ex.credits, 0);
  const est = estimatePlan(data, total);
  const money = (n: number) => formatMoney(n, data.currency);
  const planPrice = est.plan.price > 0 ? `${money(est.plan.price)}/mo` : 'Free';

  return (
    <div className="border-ink-line bg-ink-card/60 mt-5 rounded-3xl border p-6 sm:p-10">
      <h3 className="font-display text-2xl font-semibold text-white">Work out your credits</h3>
      <p className="mt-2 text-sm text-white/55">
        Set what you expect in a month. Mix it any way you like: credits are one pool.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <ul className="divide-ink-line divide-y">
          {data.creditExamples.map((ex) => {
            const n = countOf(ex.op);
            const step = ex.credits < 20 ? 25 : 1;
            const id = `mix-${ex.op}`;
            return (
              <li key={ex.op} className="flex items-center justify-between gap-4 py-4">
                <label htmlFor={id} className="min-w-0">
                  <span className="block text-sm font-medium text-white">{ex.label}</span>
                  <span className="block text-xs text-white/50">
                    {APPROX_OPS.has(ex.op) ? 'about ' : ''}
                    {formatNumber(ex.credits)} credits each
                  </span>
                </label>
                <div className="flex shrink-0 items-center gap-1.5">
                  <StepButton
                    label={`Fewer: ${ex.label}`}
                    disabled={n <= 0}
                    onClick={() => bump(ex.op, -step)}
                  >
                    <Minus className="h-4 w-4" />
                  </StepButton>
                  <input
                    id={id}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={MAX_PER_ROW}
                    value={n}
                    onChange={(e) => setCount(ex.op, Number(e.target.value))}
                    className="border-ink-line bg-ink-soft h-10 w-16 rounded-xl border text-center text-sm text-white [appearance:textfield] focus:border-white/40 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <StepButton label={`More: ${ex.label}`} onClick={() => bump(ex.op, step)}>
                    <Plus className="h-4 w-4" />
                  </StepButton>
                </div>
              </li>
            );
          })}
        </ul>

        <div
          aria-live="polite"
          className="border-gradient bg-ink-card flex flex-col justify-center rounded-2xl p-6"
        >
          <p className="text-sm text-white/55">Credits you need a month</p>
          <p className="font-display mt-1 text-4xl font-semibold text-white">
            {formatNumber(total)}
          </p>
          <p className="mt-5 text-sm text-white/55">Covered by</p>
          <p className="font-display mt-1 text-2xl font-semibold text-white">
            {est.plan.name}
            {est.topups > 0 && ` + ${formatNumber(est.topups)} top-up${est.topups === 1 ? '' : 's'}`}
          </p>
          <p className="mt-1 text-sm text-white/65">
            {formatNumber(est.plan.creditsPerMonth)} credits a month · {planPrice}
            {est.topups > 0 && ` + ${money(est.topups * data.topup.price)} in top-ups`}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-white/50">
            {est.topups > 0
              ? `This is more than ${est.plan.name} includes. Add top-ups, or talk to us about Enterprise.`
              : `Then check your visits: ${est.plan.name} covers ${formatNumber(est.plan.visitsPerMonth)} a month. Take the plan that covers both numbers.`}
          </p>
        </div>
      </div>
    </div>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      data-cursor="hover"
      className="border-ink-line inline-flex h-10 w-10 items-center justify-center rounded-xl border text-white/75 transition-colors hover:border-white/40 hover:text-white disabled:opacity-30"
    >
      {children}
    </button>
  );
}
