'use client';

import {
  Wand2,
  MessagesSquare,
  Globe2,
  ShoppingBag,
  Users,
  Bot,
  Search,
  Newspaper,
  BarChart3,
  Mail,
  Palette,
  Link2,
  ShieldCheck,
  UsersRound,
  Code2,
  CreditCard,
  type LucideIcon,
} from 'lucide-react';
import Reveal from '@/components/Reveal';

type Item = { icon: LucideIcon; title: string; body: string };

const ITEMS: Item[] = [
  {
    icon: Wand2,
    title: 'AI website generator',
    body: 'A five-agent pipeline turns a prompt into a production Next.js site — real code, not templates, deployed in minutes.',
  },
  {
    icon: MessagesSquare,
    title: 'Conversational editor',
    body: '“Make the hero darker”, “add a pricing section.” AI edits the actual code, commits to GitHub, and redeploys.',
  },
  {
    icon: Globe2,
    title: 'Edge SSR hosting',
    body: 'Every site runs as its own Cloudflare Worker — indexable, sub-50ms globally, custom domain with auto-SSL.',
  },
  {
    icon: ShoppingBag,
    title: 'Full e-commerce',
    body: 'Products, variants, cart, checkout, orders, coupons, shipping zones, tax/GST, returns, reviews, COD.',
  },
  {
    icon: Users,
    title: 'Built-in CRM',
    body: 'Unified contacts, auto-logged activity timeline, a 7-stage sales pipeline, and deal tracking.',
  },
  {
    icon: Bot,
    title: 'AI chatbot',
    body: 'RAG over your catalog with live stock/order queries, lead capture into the CRM, and per-project metering.',
  },
  {
    icon: Search,
    title: 'SEO Co-Pilot',
    body: 'Schema, sitemap, llms.txt, daily audits and ranking monitoring — discoverable on Google and in AI answers.',
  },
  {
    icon: Newspaper,
    title: 'Blog & auto-content',
    body: 'Markdown CMS plus AI autonomous blogging that researches, writes, illustrates and publishes on a schedule.',
  },
  {
    icon: BarChart3,
    title: 'Privacy-first analytics',
    body: 'YourOwnMetrics — cookieless page views, sessions and events, dashboards inside your admin.',
  },
  {
    icon: Mail,
    title: 'Newsletter & forms',
    body: 'Double opt-in subscriptions, contact forms with spam protection, GDPR consent — all syncing to the CRM.',
  },
  {
    icon: Palette,
    title: 'Brand kit',
    body: 'Set logo, colors and fonts once. The generator, storefront, emails and platform pages stay on-brand.',
  },
  {
    icon: Link2,
    title: 'Custom domains & SSL',
    body: 'One-click custom hostnames, auto-DV SSL, and a DNS migration wizard that reads your current provider.',
  },
  {
    icon: ShieldCheck,
    title: 'GDPR & compliance',
    body: 'Consent center, data export/erasure workflows, and a tamper-evident audit log of every privileged action.',
  },
  {
    icon: UsersRound,
    title: 'Teams & roles',
    body: 'Owner / admin / editor / viewer access, email invites, and feature gating enforced server-side.',
  },
  {
    icon: Code2,
    title: 'API & JavaScript SDK',
    body: 'Per-project API keys, an embeddable SDK for cart/chatbot/lead capture, and subscribable webhooks.',
  },
  {
    icon: CreditCard,
    title: 'Global billing',
    body: 'Razorpay for INR, Stripe for everything else — currency auto-detected, vouchers and offline payments built in.',
  },
];

export default function Platform() {
  return (
    <section id="platform" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">
            The whole stack
          </p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
            One platform replaces <span className="text-gradient">a dozen tools</span>
          </h2>
          <p className="mt-5 text-white/55">
            One subscription. One dashboard. One database. One brand. Every feature sees the same
            data — your store, customers, content and automation, all on the edge.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.06}>
              <div className="group flex gap-4">
                <div className="border-ink-line bg-ink-card group-hover:border-violet-glow/40 group-hover:text-violet-glow flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-white/80 transition-colors">
                  <it.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{it.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}