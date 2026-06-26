'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import AuroraCanvas from '@/components/AuroraCanvas';
import Button from '@/components/Button';

const headline = ['Your storefront,', 'now a self-growing', 'business.'];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      // pt-28/pb-16: keep hero content clear of the fixed nav. With min-h (not
      // h) the section grows when content is taller than a short mobile
      // viewport, so the badge/headline never tuck up under the nav bar.
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pb-16 pt-28"
    >
      {/* interactive constellation */}
      <div className="absolute inset-0 -z-10">
        <AuroraCanvas />
      </div>
      {/* drifting gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-violet-glow/20 absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[140px]" />
        <div className="bg-cyan-glow/10 absolute bottom-[-20%] right-[5%] h-[420px] w-[520px] rounded-full blur-[120px]" />
      </div>
      {/* top fade for nav legibility */}
      <div className="from-ink pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b to-transparent" />
      <div className="from-ink pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t to-transparent" />

      {/* Parallax wrapper (scroll-driven; renders visible at scroll 0 so it
          never delays first paint). Entrance below is pure CSS → no JS gate. */}
      <motion.div style={{ y, opacity }} className="mx-auto max-w-4xl px-6 text-center">
        <a
          href="#how"
          data-cursor="hover"
          className="border-gradient hero-in mb-8 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur"
          style={{ animationDelay: '0.05s' }}
        >
          <Sparkles className="text-cyan-glow h-3.5 w-3.5" />
          Built it in Lovable or Bolt? Make it real.
          <ArrowRight className="h-3 w-3" />
        </a>

        <h1 className="text-balance text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-7xl">
          {headline.map((line, li) => (
            <span
              key={li}
              className="hero-in block"
              style={{ animationDelay: `${li * 0.07}s` }}
            >
              {li === 2 ? <span className="text-gradient">{line}</span> : line}
            </span>
          ))}
        </h1>

        <p
          className="hero-in mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg"
          style={{ animationDelay: '0.28s' }}
        >
          Tyashin is the AI growth &amp; commerce OS. Bring or port your site — we run the chatbot
          that <em className="not-italic text-white/90">sells</em>, the SEO autopilot that gets you{' '}
          <em className="not-italic text-white/90">found</em>, and payments for India and the world.
          All on the edge.
        </p>

        <div
          className="hero-in mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: '0.38s' }}
        >
          <Button href="https://admin.tyashin.com">
            Start free <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="#demo" variant="ghost">
            See it sell live
          </Button>
        </div>

        <p className="hero-in mt-6 text-xs text-white/50" style={{ animationDelay: '0.48s' }}>
          No card required · Free plan forever · India &amp; global payments built in
        </p>
      </motion.div>

      {/* scroll cue */}
      <div
        className="hero-in absolute bottom-7 left-1/2 -translate-x-1/2"
        style={{ animationDelay: '0.6s' }}
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="cue-bounce h-1.5 w-1 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
