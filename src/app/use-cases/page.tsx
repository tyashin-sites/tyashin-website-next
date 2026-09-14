import { pageMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';

export const metadata = pageMetadata({
  title: 'Use cases — launch, sell direct & get found',
  description:
    'Launch a D2C brand, sell beyond marketplaces, turn a Lovable prototype into a real store, get found on Google and AI search, or ship client sites faster.',
  path: '/use-cases',
});

/**
 * Job/outcome-driven page. Deliberately distinct from /solutions, which is
 * organised by business TYPE (Indian D2C, creators, agencies, regulated).
 * This one is organised by what you are trying to DO, so the two target
 * different search intent instead of competing for the same queries.
 * Each scenario carries an `id` so footer/nav deep-links stay valid.
 */
const SCENARIOS = [
  {
    id: 'launch-d2c',
    eyebrow: 'Starting out',
    title: 'Launch a D2C brand online',
    situation:
      'You have a product and want to sell it directly — your own store, your own customers, without waiting months to get going.',
    hard: 'Storefront, payments, shipping, tax, order emails and analytics are five different tools, and wiring them together is the part nobody warns you about.',
    how: 'You get a real storefront with catalog, cart and checkout, Razorpay or Stripe already connected, GST and COD handled for India, and order emails that go out on their own.',
    outcome: 'Selling in days, on your own domain.',
  },
  {
    id: 'beyond-marketplaces',
    eyebrow: 'Reducing dependence',
    title: 'Build a direct channel beyond marketplaces',
    situation:
      'Marketplaces are working, but commissions compound and the customer relationship is not really yours. You want a channel you own — running alongside, not instead of.',
    hard: 'Repeat buyers stay with the marketplace, none of the search equity accrues to your brand, and pricing pressure never lets up.',
    how: 'Your own storefront on your own domain, with the SEO, structured data and content engine to get found directly, plus a customer list and CRM that belong to you.',
    outcome: 'Higher-margin repeat orders you are not paying commission on.',
  },
  {
    id: 'prototype-to-business',
    eyebrow: 'Making it real',
    title: 'Turn a prototype into a real business',
    situation:
      'You built something in Lovable, Bolt, or React. It looks great — but it does not rank, it cannot take money, and there is nothing behind it.',
    hard: 'Client-rendered prototypes are hard for search engines to index, and there is no backend for orders, enquiries, or customers.',
    how: 'We port it into a server-rendered, indexable site on the edge and wire it to payments, CRM and support — keeping the design you already have.',
    outcome: 'The same look, now an actual business that gets found and sells.',
  },
  {
    id: 'get-found',
    eyebrow: 'Growth',
    title: 'Get found on Google and AI search',
    situation:
      'Your site exists, but almost nobody arrives from search — and increasingly buyers ask an AI assistant before they ever open Google.',
    hard: 'Real discoverability needs server-rendered pages, per-page metadata, structured data, a live sitemap and a steady stream of content. Most sites miss several of those.',
    how: 'All of it is built in and automatic, plus keyword and trend research that turns into publishable posts on a schedule you approve.',
    outcome: 'Traffic that compounds instead of depending on ads.',
  },
  {
    id: 'agencies',
    eyebrow: 'For agencies',
    title: 'Deliver client sites faster',
    situation:
      'You run a web or SEO agency and every client needs the same foundation rebuilt — fast site, good SEO, payments, analytics — before the interesting work starts.',
    hard: 'That foundation eats the budget, and afterwards you are on the hook for hosting, patches and every small content change.',
    how: 'Ship the foundation in days on infrastructure you do not maintain, hand clients an admin panel for their own edits, and keep the code in a repo you control.',
    outcome: 'More clients served, less time on plumbing and maintenance.',
  },
  {
    id: 'service-leads',
    eyebrow: 'Leads, not carts',
    title: 'Capture enquiries for a service business',
    situation:
      'You are not selling products online — you need the right people to find you and get in touch, whether that is a hostel, a manufacturer, a clinic or a consultancy.',
    hard: 'Enquiries arrive across forms, WhatsApp, email and phone, and get lost between them. Meanwhile local search barely knows you exist.',
    how: 'Contact and enquiry forms, WhatsApp routing, a 24/7 AI chatbot that answers and qualifies, and local business structured data — all feeding one CRM.',
    outcome: 'Fewer missed enquiries, and more of them from search.',
  },
];

export default function UseCasesPage() {
  return (
    <section className="relative py-28">
      <div className="bg-radial-fade pointer-events-none absolute inset-x-0 top-0 h-[480px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">Use cases</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            What are you trying <span className="text-gradient">to do?</span>
          </h1>
          <p className="mt-5 text-white/55">
            Six things people come to Tyashin for. Find the one that sounds like your situation —
            each explains what makes it hard and what actually changes.
          </p>
          <p className="mt-4 text-xs text-white/35">
            Looking for your industry instead?{' '}
            <a href="/solutions" className="text-cyan-glow underline underline-offset-2">
              Browse by business type
            </a>
            .
          </p>
        </Reveal>

        <div className="mt-16 space-y-5">
          {SCENARIOS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <div
                id={s.id}
                className="border-ink-line bg-ink-card/50 scroll-mt-28 rounded-3xl border p-7 sm:p-8"
              >
                <p className="text-violet-glow/90 text-xs font-semibold uppercase tracking-[0.16em]">
                  {s.eyebrow}
                </p>
                <h2 className="font-display mt-2 text-xl font-semibold text-white sm:text-2xl">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{s.situation}</p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300/80">
                      What makes it hard
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{s.hard}</p>
                  </div>
                  <div>
                    <div className="text-cyan-glow/80 text-xs font-semibold uppercase tracking-[0.14em]">
                      How Tyashin handles it
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{s.how}</p>
                  </div>
                </div>

                <div className="border-ink-line mt-6 flex items-center gap-2 border-t pt-5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <p className="text-sm text-white/75">{s.outcome}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="border-ink-line bg-ink-soft/30 mt-16 rounded-3xl border p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-white">
              Not sure which one is you?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
              Most businesses are a mix of two. Tell us where you are and we&apos;ll point you at
              the shortest path.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" className="px-6 py-3">
                Talk to us
              </Button>
              <a
                href="/compare"
                className="border-ink-line rounded-full border px-6 py-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                Compare approaches
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
