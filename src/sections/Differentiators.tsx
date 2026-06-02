'use client';

import { Cpu, GitBranch, Lock, IndianRupee, Database } from 'lucide-react';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';

const POINTS = [
  {
    icon: Cpu,
    title: 'Edge-native, not bolted-on',
    body: 'Built entirely on Cloudflare Workers — compute, storage, DNS, SSL and CDN from one vendor. Sub-50ms globally, zero servers to manage.',
  },
  {
    icon: GitBranch,
    title: 'Real code you own',
    body: 'Generated sites are real Next.js committed to a GitHub repo you own. Fork it, edit it, redeploy it. No template lock-in, ever.',
  },
  {
    icon: Lock,
    title: 'Privacy-first by default',
    body: 'No third-party cookies, no forced Google Analytics. Cookieless analytics, signed webhooks, and a GDPR audit trail come standard.',
  },
  {
    icon: IndianRupee,
    title: 'India-aware, globally ready',
    body: 'Razorpay, GST, WhatsApp ordering and COD are first-class — alongside Stripe and multi-currency for the rest of the world.',
  },
  {
    icon: Database,
    title: 'One source of truth',
    body: 'Every feature reads the same data — store, CRM, chatbot, auth. Nothing is duplicated, nothing drifts, everything connects.',
  },
];

export default function Differentiators() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">
            Why Tyashin
          </p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Different where it <span className="text-gradient">actually matters</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.08} className={i === 0 ? 'lg:row-span-2' : ''}>
              <TiltCard max={6} className="flex h-full flex-col justify-between p-7">
                <div className="bg-accent-gradient text-ink inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                  <p.icon className="h-6 w-6" />
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{p.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}