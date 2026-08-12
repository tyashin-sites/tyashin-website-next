'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';

export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: 'Is Tyashin an AI website builder?',
    a: "It's more than that. Tyashin generates a real site, then runs the business behind it — store, CRM, AI chatbot, SEO, content, analytics and payments. The site is the starting line, not the finish.",
  },
  {
    q: 'Can I bring a site I built in Lovable, Bolt or React?',
    a: 'Yes. We port your existing storefront into a server-rendered, indexable site on the edge, wired to payments, CRM and the chatbot — turning a good-looking prototype into a real business.',
  },
  {
    q: 'Do I own the code and my data?',
    a: 'Completely. Generated sites are real Next.js committed to a GitHub repo you own — fork, edit and redeploy freely. Your customer and store data live in one isolated, exportable place.',
  },
  {
    q: 'How do payments and currencies work?',
    a: "Currency is detected from your shopper's location and locked to their order. Payments route to the gateway that serves that market — Stripe for cards and wallets, Razorpay where UPI, cash-on-delivery and local tax rules matter. You don't wire anything up.",
  },
  {
    q: "What's included vs. paid?",
    a: 'Your plan includes the storefront, e-commerce, newsletter, contact forms and consent. Power plugins — AI chatbot, SEO Co-Pilot, auto-blogging and advanced analytics — are billed separately, with a free tier on each.',
  },
  {
    q: 'Is it really fast and private?',
    a: "Yes. Everything runs on Cloudflare's edge for sub-50ms responses worldwide, with cookieless analytics, signed webhooks and a GDPR audit trail by default.",
  },
];

/**
 * Reusable accordion. Shared by the homepage/pricing FAQ section and the
 * dedicated /faq page (which renders one per category) so the markup and
 * interaction live in exactly one place.
 */
export function FaqAccordion({
  items,
  defaultOpen = null,
}: {
  items: FaqItem[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-ink-line border-ink-line divide-y border-y">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={f.q} delay={i * 0.04}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              data-cursor="hover"
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-lg font-medium text-white">{f.q}</span>
              <span
                className={cn(
                  'border-ink-line flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-white/70 transition-transform duration-300',
                  isOpen && 'border-violet-glow/50 text-violet-glow rotate-45'
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-white/55">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="text-violet-glow text-sm font-medium uppercase tracking-[0.2em]">FAQ</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Questions, answered</h2>
          <p className="mt-4 text-white/55">
            More detail on our{' '}
            <a href="/faq" className="text-violet-glow underline underline-offset-2">
              full FAQ page
            </a>
            .
          </p>
        </Reveal>

        <div className="mt-12">
          <FaqAccordion items={FAQS} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
