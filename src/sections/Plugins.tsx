'use client';

import {
  MessageSquareText,
  TrendingUp,
  PenLine,
  BarChart3,
  Mail,
  ShoppingCart,
  ContactRound,
  ImageIcon,
  Wand2,
  Globe,
  FileSearch,
  ScanSearch,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import SpotlightCard from '@/components/SpotlightCard';
import { cn } from '@/lib/utils';

/**
 * What a plan contains. There are no per-feature prices any more: every
 * feature is on every plan. The only split is whether a feature uses credits
 * (AI work) or never does. Prices and credit costs live in the Pricing section.
 */
type Feature = { icon: LucideIcon; name: string; body: string; credits: boolean };

const FEATURES: Feature[] = [
  {
    icon: MessageSquareText,
    name: 'AI chatbot',
    body: 'Answers customers from your own content and catalog. If credits run out, it offers your contact form instead.',
    credits: true,
  },
  {
    icon: PenLine,
    name: 'AI blog posts',
    body: 'Researched and written for your business, each with a cover image. Nothing is published unless you allow it.',
    credits: true,
  },
  {
    icon: TrendingUp,
    name: 'SEO research',
    body: 'Keyword and topic research for your industry, so you know what to write next.',
    credits: true,
  },
  {
    icon: ImageIcon,
    name: 'AI images',
    body: 'Images made for your pages and blog posts.',
    credits: true,
  },
  {
    icon: Wand2,
    name: 'Site edits by the AI',
    body: 'Describe the change you want and the AI makes it in your site.',
    credits: true,
  },
  {
    icon: Globe,
    name: 'Hosting, SSL and your domain',
    body: 'Your site runs on the edge with HTTPS, on your own domain.',
    credits: false,
  },
  {
    icon: ShoppingCart,
    name: 'Online store',
    body: 'Catalog, cart, checkout, orders, returns and the emails that go with them.',
    credits: false,
  },
  {
    icon: ContactRound,
    name: 'Forms and CRM',
    body: 'Contact forms with spam protection. Every enquiry lands in the CRM.',
    credits: false,
  },
  {
    icon: Mail,
    name: 'Newsletter',
    body: 'Double opt-in sign-up and sending, tied to the same customer list.',
    credits: false,
  },
  {
    icon: BarChart3,
    name: 'Analytics',
    body: 'Cookieless page views, sessions and events, in your admin.',
    credits: false,
  },
  {
    icon: FileSearch,
    name: 'Sitemap, schema and llms.txt',
    body: 'What search engines and AI assistants need to read your site, kept up to date for you.',
    credits: false,
  },
  {
    icon: ScanSearch,
    name: 'SEO audits and image optimization',
    body: 'Non-AI SEO audits of your pages, and images served in modern formats.',
    credits: false,
  },
];

export default function Plugins() {
  return (
    <section id="marketplace" className="relative py-28">
      <div className="bg-cyan-glow/5 pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full blur-[150px]" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-violet-glow text-sm font-medium uppercase tracking-[0.2em]">
            <Layers className="mr-1.5 inline h-4 w-4" />
            What you get
          </p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Every feature, on <span className="text-gradient">every plan</span>
          </h2>
          <p className="mt-5 text-white/55">
            Nothing is sold feature by feature. The store, CRM, forms, newsletter and analytics
            are included. AI work uses credits from your plan&apos;s monthly allowance.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.name} delay={(i % 3) * 0.06}>
              <SpotlightCard className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      'inline-flex h-11 w-11 items-center justify-center rounded-xl',
                      f.credits ? 'bg-accent-gradient text-ink' : 'bg-white/5 text-white/80'
                    )}
                  >
                    <f.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-[0.7rem] font-medium',
                      f.credits
                        ? 'border-violet-glow/40 text-violet-glow'
                        : 'border-cyan-glow/30 text-cyan-glow'
                    )}
                  >
                    {f.credits ? 'Uses credits' : 'Included'}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{f.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{f.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-white/55">
          Plans and credit costs are on the{' '}
          <a href="/pricing" className="text-violet-glow underline underline-offset-2">
            pricing page
          </a>
          .
        </p>
      </div>
    </section>
  );
}
