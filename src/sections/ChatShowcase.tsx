'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import { prefersReducedMotion } from '@/lib/utils';

type Msg = { from: 'user' | 'bot'; text: string };

const SCRIPT: Msg[] = [
  { from: 'user', text: 'Do you have the walnut dining table in stock?' },
  {
    from: 'bot',
    text: 'Yes — the Walnut 6-seater is in stock (4 left). It ships free in 3–5 days. Want me to hold one for you?',
  },
  { from: 'user', text: "What's the price in INR?" },
  {
    from: 'bot',
    text: '₹48,900, or 3 months EMI at ₹16,300 via Razorpay. I can also apply code WELCOME10 for 10% off your first order. 🛒',
  },
];

const TYPE_MS = 26;

export default function ChatShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const [shown, setShown] = useState<Msg[]>([]);
  const [typing, setTyping] = useState('');
  const [botThinking, setBotThinking] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));

    const run = async () => {
      if (prefersReducedMotion()) {
        setShown(SCRIPT);
        return;
      }
      await wait(400);
      for (const msg of SCRIPT) {
        if (cancelled) return;
        if (msg.from === 'bot') {
          setBotThinking(true);
          await wait(900);
          setBotThinking(false);
          // type out
          for (let i = 1; i <= msg.text.length; i++) {
            if (cancelled) return;
            setTyping(msg.text.slice(0, i));
            await wait(TYPE_MS);
          }
          setShown((p) => [...p, msg]);
          setTyping('');
        } else {
          await wait(700);
          setShown((p) => [...p, msg]);
        }
        await wait(500);
      }
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView]);

  return (
    <section id="demo" className="relative overflow-hidden py-28">
      <div className="bg-violet-glow/10 pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[480px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-violet-glow text-sm font-medium uppercase tracking-[0.2em]">
              Live demo
            </p>
            <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
              An assistant that <span className="text-gradient">actually closes</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-white/55">
              Trained on your catalog, wired to live stock, orders, and pricing. It answers in your
              voice, applies coupons, and turns questions into checkouts — across web, streaming,
              and WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 space-y-3 text-sm text-white/70">
              {[
                'Real-time stock & order lookups',
                'Multi-currency, EMI-aware answers',
                'Auto-trained from your own content',
                'Metered & billed per plan, brand-aware',
              ].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="bg-accent-gradient text-ink inline-flex h-5 w-5 items-center justify-center rounded-full">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div ref={ref}>
            <TiltCard max={7} className="p-5 sm:p-6">
              {/* window chrome */}
              <div className="border-ink-line mb-4 flex items-center gap-2 border-b pb-4">
                <span className="bg-accent-gradient text-ink inline-flex h-8 w-8 items-center justify-center rounded-full">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white">Store Assistant</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online · powered by Tyashin
                  </p>
                </div>
              </div>

              {/* messages */}
              <div className="flex min-h-[280px] flex-col justify-end gap-3">
                <AnimatePresence>
                  {shown.map((m, i) => (
                    <Bubble key={i} msg={m} />
                  ))}
                </AnimatePresence>
                {botThinking && <Thinking />}
                {typing && <Bubble msg={{ from: 'bot', text: typing }} typing />}
              </div>

              {/* input */}
              <div className="border-ink-line bg-ink-soft mt-4 flex items-center gap-2 rounded-full border px-4 py-2.5">
                <span className="flex-1 text-sm text-white/50">
                  Ask about products, orders, shipping…
                </span>
                <span className="bg-accent-gradient text-ink inline-flex h-7 w-7 items-center justify-center rounded-full">
                  <Send className="h-3.5 w-3.5" />
                </span>
              </div>
            </TiltCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Bubble({ msg, typing }: { msg: Msg; typing?: boolean }) {
  const isBot = msg.from === 'bot';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isBot
            ? 'bg-ink-soft rounded-tl-sm text-white/85'
            : 'bg-accent-gradient text-ink rounded-tr-sm'
        }`}
      >
        {msg.text}
        {typing && <span className="animate-blink ml-0.5 inline-block">▋</span>}
      </div>
    </motion.div>
  );
}

function Thinking() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
      <div className="bg-ink-soft flex gap-1 rounded-2xl rounded-tl-sm px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-white/50"
            animate={{ y: [0, -4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.9,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}