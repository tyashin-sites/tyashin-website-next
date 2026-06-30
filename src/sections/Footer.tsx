'use client';

import Wordmark from '@/components/Wordmark';

type FooterLink = { label: string; href: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Platform',
    links: [
      { label: 'AI Chatbot', href: '#' },
      { label: 'SEO Autopilot', href: '#' },
      { label: 'Auto-Blogging', href: '#' },
      { label: 'Payments', href: '#' },
      { label: 'Plugins', href: '#' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Port from Lovable', href: '#' },
      { label: 'Shopify alternative', href: '#' },
      { label: 'Edge SSR', href: '#' },
      { label: 'For India', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
      { label: 'Docs', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-ink-line bg-ink-soft/40 relative border-t">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Wordmark className="h-7" />
            <p className="mt-4 max-w-xs text-sm text-white/55">
              The AI growth &amp; commerce OS for modern storefronts. Built on the edge, priced for
              the real world.
            </p>
            <a
              href="/linkedin"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink-line px-3.5 py-1.5 text-xs text-white/60 transition-colors hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#3b9bff]" />
              Also from Tyashin: grow your LinkedIn →
            </a>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-ink-line mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Tyashin · Aapastech Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white/70">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white/70">
              Terms
            </a>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}