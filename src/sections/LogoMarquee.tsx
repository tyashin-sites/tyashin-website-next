'use client';

import Marquee from '@/components/Marquee';

const RUNS_ON = [
  'Cloudflare Workers',
  'Razorpay',
  'Stripe',
  'Next.js',
  'OpenNext',
  'MongoDB Atlas',
  'Lovable',
  'TanStack Start',
  'R2 Storage',
];

export default function LogoMarquee() {
  return (
    <section className="border-ink-line bg-ink-soft/40 relative border-y py-8">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.25em] text-white/50">
        Ports from · runs on · pays out through
      </p>
      <div className="relative">
        {/* edge fades */}
        <div className="from-ink pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r to-transparent" />
        <div className="from-ink pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l to-transparent" />
        <Marquee>
          {RUNS_ON.map((name) => (
            <span
              key={name}
              className="font-display whitespace-nowrap text-xl font-medium text-white/50 transition-colors hover:text-white/70"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}