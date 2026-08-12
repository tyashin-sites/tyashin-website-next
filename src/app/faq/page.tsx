import { pageMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { FaqAccordion } from '@/sections/FAQ';
import { FAQ_GROUPS, ALL_FAQS } from '@/lib/faq';

export const metadata = pageMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Answers about Tyashin — getting started, moving an existing site, pricing, multi-currency payments, SEO and AI search, and who owns your code and data.',
  path: '/faq',
});

// FAQPage structured data, derived from the same content rendered below so the
// two can never drift. Escaped so a stray "</script>" can't break out.
function faqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

export default function FaqPage() {
  return (
    <section className="relative py-28">
      <div className="bg-radial-fade pointer-events-none absolute inset-x-0 top-0 h-[480px]" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd() }}
      />

      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="text-violet-glow text-sm font-medium uppercase tracking-[0.2em]">FAQ</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Questions, <span className="text-gradient">answered</span>
          </h1>
          <p className="mt-5 text-white/55">
            Everything people usually ask before moving their business onto Tyashin. Still stuck?{' '}
            <a href="/contact" className="text-violet-glow underline underline-offset-2">
              Talk to us
            </a>
            .
          </p>
        </Reveal>

        <div className="mt-16 space-y-16">
          {FAQ_GROUPS.map((group, gi) => (
            <div key={group.title}>
              <Reveal>
                <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
                  {group.title}
                </h2>
              </Reveal>
              <div className="mt-5">
                <FaqAccordion items={group.items} defaultOpen={gi === 0 ? 0 : null} />
              </div>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="border-ink-line bg-ink-card/50 mt-20 rounded-3xl border p-10 text-center">
            <h2 className="font-display text-2xl font-semibold text-white">
              Still have a question?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
              Tell us about your business and we&apos;ll tell you honestly whether Tyashin is the
              right fit.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" className="px-6 py-3">
                Talk to us
              </Button>
              <a
                href="/pricing"
                className="border-ink-line rounded-full border px-6 py-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                See pricing
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
