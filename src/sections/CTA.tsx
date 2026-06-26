'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="cta" ref={ref} className="relative overflow-hidden py-32">
      <motion.div
        style={{ y: glowY }}
        className="bg-violet-glow/20 pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
      />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">
            Stop building websites.
            <br />
            <span className="text-shimmer">Start growing a business.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-white/55">
            Bring your site or port it in minutes. Turn on the AI that sells and the SEO that gets
            you found. Free to start — no card, no lock-in.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="https://admin.tyashin.com">
              Start free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#demo" variant="ghost">
              Watch it sell
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}