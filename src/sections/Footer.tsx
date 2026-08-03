'use client';

import Wordmark from '@/components/Wordmark';

type FooterLink = { label: string; href: string };

// Every href MUST resolve to a real, existing page (200) — never `#` or a
// route that doesn't exist. Feature links point at the page that describes
// them (/platform, /solutions); there are no per-feature pages yet.
const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Platform',
    links: [
      { label: 'AI Chatbot', href: '/platform' },
      { label: 'SEO Autopilot', href: '/platform' },
      { label: 'Auto-Blogging', href: '/platform' },
      { label: 'Payments', href: '/platform' },
      { label: 'Plugins', href: '/platform' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      // Anchor targets below are section ids that exist on /use-cases —
      // keep them in sync if a scenario id changes.
      { label: 'Use cases', href: '/use-cases' },
      { label: 'Port a prototype', href: '/use-cases#prototype-to-business' },
      { label: 'Sell beyond marketplaces', href: '/use-cases#beyond-marketplaces' },
      { label: 'For agencies', href: '/use-cases#agencies' },
      { label: 'Edge SSR', href: '/platform' },
      { label: 'For India', href: '/solutions' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Compare', href: '/compare' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Blog', href: '/blog' },
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
          <p>
            © {new Date().getFullYear()} Tyashin — a product of AAPASTECH PRIVATE LIMITED (CIN:
            U72900DL2022PTC395508), Delhi, India. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="transition-colors hover:text-white/70">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-white/70">
              Terms
            </a>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              All systems operational
            </span>
          </div>
        </div>

        {/* Platform attribution (addendum §3f) — every Tyashin site carries this,
            including our own, so the pattern customers see matches ours. */}
        <p className="mt-8 text-center text-xs text-white/40">
          Made with ♥ by{' '}
          <a href="https://tyashin.com" className="transition-colors hover:text-white/70">
            Tyashin
          </a>
        </p>
      </div>
    </footer>
  );
}