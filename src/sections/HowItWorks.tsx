'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Upload, Palette, TrendingUp, ShoppingBag } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    icon: Upload,
    title: 'Bring or port your site',
    body: 'Already built it in Lovable, Bolt, or plain React? We port it to SSR — indexable, fast, on the edge. Or start from a Tyashin template.',
  },
  {
    n: '02',
    icon: Palette,
    title: 'Brand it once',
    body: 'Drop in colors, logo, and fonts. Your brand kit flows into checkout, emails, the chatbot, and every plugin surface automatically.',
  },
  {
    n: '03',
    icon: TrendingUp,
    title: 'Switch on growth',
    body: 'Flip on the AI chatbot, SEO autopilot, and auto-blogging. Opt-in, plan-gated, and working while you sleep.',
  },
  {
    n: '04',
    icon: ShoppingBag,
    title: 'Sell, anywhere',
    body: 'Razorpay and Stripe, multi-currency checkout, CRM, reviews, returns. The whole funnel, one platform, one bill.',
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  // 4 panels → translate across 3 panel-widths
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="how" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 w-full max-w-6xl px-6">
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">
            How it works
          </p>
          <h2 className="mt-3 max-w-xl text-4xl font-semibold sm:text-5xl">
            From idea to selling, in <span className="text-gradient">four moves</span>
          </h2>
          {/* progress rail */}
          <div className="mt-6 h-px w-full max-w-xs overflow-hidden bg-white/10">
            <motion.div style={{ width: progress }} className="bg-accent-gradient h-full" />
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-6 px-6 md:px-[8vw]">
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="border-gradient bg-ink-card relative flex h-[58vh] w-[78vw] shrink-0 flex-col justify-between rounded-3xl p-8 md:w-[40vw] md:p-12"
            >
              <div className="font-display absolute right-8 top-8 text-7xl font-bold text-white/[0.04] md:text-8xl">
                {s.n}
              </div>
              <div className="bg-accent-gradient text-ink inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white md:text-3xl">{s.title}</h3>
                <p className="mt-4 max-w-md text-white/55">{s.body}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}