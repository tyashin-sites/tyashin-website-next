'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Store, Globe, PenTool, Building2, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';

const SOLUTIONS = [
  {
    id: 'india',
    label: 'Indian D2C',
    icon: Store,
    headline: 'Razorpay, GST, WhatsApp & COD — first-class, not afterthoughts.',
    body: 'Sell to India the way India buys. INR pricing, Razorpay checkout, GST tax rules, regional shipping zones, cash-on-delivery, and deep WhatsApp cart links.',
    points: [
      'Razorpay checkout + UPI',
      'GST-compliant tax rules',
      'WhatsApp catalog ordering',
      'Cash on Delivery, auto-confirmed',
    ],
  },
  {
    id: 'global',
    label: 'Global D2C',
    icon: Globe,
    headline: 'Multi-currency, Stripe, and GDPR-grade UX out of the box.',
    body: 'Currency auto-detected at signup and locked thereafter. Stripe checkout, consent banner, returns and reviews — the scattered stack, unified.',
    points: [
      'Stripe, 9+ currencies',
      'Auto currency detection',
      'GDPR consent + privacy workflows',
      'Returns & verified reviews',
    ],
  },
  {
    id: 'creators',
    label: 'Creators',
    icon: PenTool,
    headline: 'SEO and AI writing without hiring a developer.',
    body: 'Spin up an indexable site, then let the SEO Co-Pilot and auto-blogging engine compound long-tail traffic week after week.',
    points: [
      'AI blog generator',
      'Schema, sitemap, llms.txt',
      'Google & AI-answer discoverability',
      'Newsletter + audience capture',
    ],
  },
  {
    id: 'agencies',
    label: 'Agencies',
    icon: Building2,
    headline: 'Run many client sites from one workspace.',
    body: 'Multi-project workspace with role-based access, per-plan feature gating, and white-labelable platform pages. One place, many brands.',
    points: [
      'Owner / admin / editor / viewer roles',
      'Per-project isolation & billing',
      'Customer-owned GitHub repos',
      'White-label platform pages',
    ],
  },
  {
    id: 'compliance',
    label: 'Regulated',
    icon: ShieldCheck,
    headline: 'Auditable, consent-first, no third-party trackers.',
    body: 'For clinics, lawyers and EU retailers: built-in audit log, consent records, data export/erasure requests, and cookieless analytics.',
    points: [
      'Tamper-evident audit log',
      'GDPR Art. 15 / 17 workflows',
      '7-category consent center',
      'Cookieless analytics (YOM)',
    ],
  },
];

export default function Solutions() {
  const [active, setActive] = useState(0);
  const sol = SOLUTIONS[active];

  return (
    <section id="solutions" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-violet-glow text-sm font-medium uppercase tracking-[0.2em]">
            Built for you
          </p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
            One platform, <span className="text-gradient">many businesses</span>
          </h2>
        </Reveal>

        {/* tabs */}
        <Reveal delay={0.05} className="mt-12 flex flex-wrap justify-center gap-2">
          {SOLUTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              data-cursor="hover"
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                i === active
                  ? 'bg-accent-gradient text-ink'
                  : 'border-ink-line border text-white/60 hover:text-white'
              )}
            >
              <s.icon className="h-4 w-4" />
              {s.label}
            </button>
          ))}
        </Reveal>

        {/* panel */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="border-gradient bg-ink-card mx-auto grid max-w-4xl gap-8 rounded-3xl p-8 md:grid-cols-2 md:p-12"
            >
              <div>
                <div className="bg-accent-gradient text-ink inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                  <sol.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">{sol.headline}</h3>
                <p className="mt-4 text-white/55">{sol.body}</p>
              </div>
              <ul className="grid content-center gap-3">
                {sol.points.map((p) => (
                  <li
                    key={p}
                    className="border-ink-line bg-ink-soft/60 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm text-white/75"
                  >
                    <span className="bg-accent-gradient text-ink inline-flex h-5 w-5 items-center justify-center rounded-full">
                      <Check className="h-3 w-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}