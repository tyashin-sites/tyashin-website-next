import { pageMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';

export const metadata = pageMetadata({
  title: 'How Tyashin Compares',
  description:
    'An honest look at the common ways to get a business online — DIY builders, agencies, AI prototype tools, custom builds and marketplaces — and where Tyashin fits.',
  path: '/compare',
});

const APPROACHES = [
  {
    name: 'DIY website builders',
    what: 'Drag-and-drop templates you assemble yourself.',
    works: 'Genuinely good if you need a few brochure pages and nothing more. Cheap and quick to start.',
    hurts:
      'You tend to outgrow them. Deeper SEO control is limited, real commerce and automation arrive as paid add-ons that stack up, and the page format is proprietary — leaving means rebuilding.',
    diff: 'Tyashin gives you a real Next.js codebase in a repo you own, with commerce, CRM and AI already part of the platform rather than bolt-ons.',
  },
  {
    name: 'An agency or freelancer',
    what: 'Someone builds a custom site for you.',
    works: 'The right call when you need bespoke design or complex, unusual functionality and have the budget for it.',
    hurts:
      'Timelines run in months, costs are front-loaded, and afterwards you depend on them for routine changes. The growth work — SEO, content, chat, analytics — is usually a separate ongoing engagement.',
    diff: 'You get a professional, fast site without the wait, and you can make everyday changes yourself from the admin panel.',
  },
  {
    name: 'AI prototype and site generators',
    what: 'Tools that generate a beautiful front end from a prompt.',
    works: 'Excellent for exploring a design idea quickly and showing something convincing to stakeholders.',
    hurts:
      'The output is often client-rendered, so search engines struggle to index it. There is usually no real backend — no payments, no orders, no CRM — so it stays a demo rather than a business.',
    diff: 'Tyashin is built for exactly this handoff: bring that prototype, and we turn it into a server-rendered, indexable site wired to payments, CRM and support.',
  },
  {
    name: 'A fully custom build',
    what: 'In-house or contracted developers building on a framework of your choice.',
    works: 'Maximum control, and the right answer when your product genuinely is the software.',
    hurts:
      'The highest cost and longest timeline, and the work never really ends — hosting, security patches, integrations and performance all become your ongoing responsibility.',
    diff: 'Tyashin gives you most of that control — real code you own — while the platform carries the infrastructure, integrations and maintenance.',
  },
  {
    name: 'Selling only on marketplaces',
    what: 'Listing your products on someone else’s platform.',
    works: 'Instant access to an existing audience, which is a real advantage when you are starting out.',
    hurts:
      'You are renting the customer relationship. Commissions compound, the audience belongs to the marketplace, and none of the search or brand equity accrues to you.',
    diff: 'A Tyashin storefront builds your own channel — your domain, your SEO, your customer list — and works alongside marketplaces rather than replacing them.',
  },
];

const AT_A_GLANCE = [
  {
    dim: 'Time to launch',
    usual: 'Days for a template; months for a custom build',
    tyashin: 'Days, including migration of an existing design',
  },
  {
    dim: 'Found on Google & AI search',
    usual: 'Varies; prototype tools are often barely indexable',
    tyashin: 'Server-rendered, with sitemap, canonicals and structured data by default',
  },
  {
    dim: 'Payments',
    usual: 'A separate integration, or region-limited',
    tyashin: 'Razorpay for INR (UPI, GST, COD) and Stripe worldwide, detected automatically',
  },
  {
    dim: 'AI features',
    usual: 'Third-party add-ons, priced and managed separately',
    tyashin: 'Chatbot, SEO Co-Pilot and auto-blogging built in, each with a free tier',
  },
  {
    dim: 'Making everyday changes',
    usual: 'Depends on a developer or agency',
    tyashin: 'Admin panel for content, catalog and posts; code access when you want it',
  },
  {
    dim: 'Ownership',
    usual: 'Often a proprietary page format you cannot take with you',
    tyashin: 'Real Next.js in a GitHub repo you own, with exportable data',
  },
];

export default function ComparePage() {
  return (
    <section className="relative py-28">
      <div className="bg-radial-fade pointer-events-none absolute inset-x-0 top-0 h-[480px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">Compare</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            How Tyashin <span className="text-gradient">compares</span>
          </h1>
          <p className="mt-5 text-white/55">
            There are five common ways to get a business online. Each is genuinely the right
            answer for someone. Here is where each one shines, where it starts to hurt, and how
            we think about it differently.
          </p>
          <p className="mt-4 text-xs text-white/35">
            We compare approaches, not companies — no vendor names, no scoreboards.
          </p>
        </Reveal>

        <div className="mt-16 space-y-5">
          {APPROACHES.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.04}>
              <div className="border-ink-line bg-ink-card/50 rounded-3xl border p-7 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-white">{a.name}</h2>
                <p className="mt-1.5 text-sm text-white/45">{a.what}</p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300/80">
                      Where it works
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{a.works}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300/80">
                      Where it starts to hurt
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{a.hurts}</p>
                  </div>
                </div>
                <div className="border-ink-line mt-6 border-t pt-5">
                  <div className="text-violet-glow/90 text-xs font-semibold uppercase tracking-[0.14em]">
                    How Tyashin differs
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{a.diff}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="font-display mt-20 text-center text-2xl font-semibold text-white">
            At a glance
          </h2>
          <div className="border-ink-line mt-8 overflow-x-auto rounded-3xl border">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-ink-line border-b">
                  <th className="p-4 font-medium text-white/45"> </th>
                  <th className="p-4 font-medium text-white/45">Common approaches</th>
                  <th className="font-display p-4 font-semibold text-white">Tyashin</th>
                </tr>
              </thead>
              <tbody>
                {AT_A_GLANCE.map((r) => (
                  <tr key={r.dim} className="border-ink-line border-b last:border-0">
                    <td className="p-4 font-medium text-white/80">{r.dim}</td>
                    <td className="p-4 text-white/50">{r.usual}</td>
                    <td className="p-4 text-white/75">{r.tyashin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal>
          <div className="border-ink-line bg-ink-soft/30 mt-16 rounded-3xl border p-8">
            <h2 className="font-display text-lg font-semibold text-white">
              When Tyashin isn&apos;t the right fit
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              If you need a single static landing page and nothing else, a simple builder will
              serve you fine. If your software <em>is</em> the product and needs a bespoke
              architecture, you want a custom build. And if you are only testing whether an idea
              has demand, start with a marketplace listing and come to us once it does. We would
              rather tell you that up front than sell you the wrong thing.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 text-center">
            <h2 className="font-display text-2xl font-semibold text-white">
              Not sure which one you are?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
              Tell us where your business is today and we&apos;ll give you a straight answer.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" className="px-6 py-3">
                Talk to us
              </Button>
              <a
                href="/faq"
                className="border-ink-line rounded-full border px-6 py-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                Read the FAQ
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
