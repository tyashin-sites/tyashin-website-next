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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
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

      <motion.div style={{ y, opacity }} className="mx-auto max-w-4xl px-6 text-center">
        <motion.a
          href="#how"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          data-cursor="hover"
          className="border-gradient mb-8 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur"
        >
          <Sparkles className="text-cyan-glow h-3.5 w-3.5" />
          Built it in Lovable or Bolt? Make it real.
          <ArrowRight className="h-3 w-3" />
        </motion.a>

        <h1 className="text-balance text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-7xl">
          {headline.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.25 + li * 0.12,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {li === 2 ? <span className="text-gradient">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Tyashin is the AI growth &amp; commerce OS. Bring or port your site — we run the chatbot
          that <em className="not-italic text-white/90">sells</em>, the SEO autopilot that gets you{' '}
          <em className="not-italic text-white/90">found</em>, and payments for India and the world.
          All on the edge.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="#cta">
            Start free <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="#demo" variant="ghost">
            See it sell live
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 text-xs text-white/35"
        >
          No card required · Free plan forever · India &amp; global payments built in
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-white/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}