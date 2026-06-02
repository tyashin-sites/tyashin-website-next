'use client';

import Counter from '@/components/Counter';
import Reveal from '@/components/Reveal';

const STATS = [
  { value: 40, suffix: 'ms', label: 'Edge response, p50', prefix: '<' },
  { value: 135, suffix: '+', label: 'Currencies & locales' },
  { value: 24, suffix: '/7', label: 'AI chatbot that closes sales' },
  { value: 99.99, suffix: '%', label: 'Storefront uptime', decimals: 2 },
];

export default function Stats() {
  return (
    <section className="relative py-20">
      <div className="border-ink-line bg-ink-line mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="bg-ink px-6 py-10 text-center">
            <div className="font-display text-4xl font-semibold text-white md:text-5xl">
              <span className="text-gradient">
                {s.prefix ?? ''}
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </span>
            </div>
            <p className="mt-3 text-sm text-white/50">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}