import { pageMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';

export const metadata = pageMetadata({
  title: 'About Tyashin',
  description:
    'Tyashin is the AI growth & commerce OS by Aapastech Pvt Ltd — helping modern storefronts launch fast, get found, and sell on the edge.',
  path: '/about',
});

const STATS = [
  { value: 'Edge-native', label: 'Built on Cloudflare Workers, fast everywhere' },
  { value: 'AI-first', label: 'Chatbot, SEO autopilot & auto-blogging built in' },
  { value: 'Multi-currency', label: 'Stripe, Razorpay & local rails, priced for the real world' },
];

export default function AboutPage() {
  return (
    <section className="relative py-28">
      <div className="bg-radial-fade pointer-events-none absolute inset-x-0 top-0 h-[480px]" />

      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">About</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            The AI growth &amp; commerce <span className="text-gradient">OS</span>
          </h1>
          <p className="mt-5 text-white/55">
            Tyashin helps modern businesses launch a real storefront in days, get found on
            Google and AI search, and sell online — without stitching together a dozen tools.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.value}
                className="border-ink-line bg-ink-card/50 rounded-3xl border p-6 text-center"
              >
                <div className="font-display text-lg font-semibold text-white">{s.value}</div>
                <div className="mt-2 text-sm text-white/55">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 space-y-5 text-[15px] leading-relaxed text-white/65">
            <p>
              We started Tyashin because launching and growing an online business still takes
              too many disconnected tools — one for the site, another for SEO, another for
              chat, another for payments. Founders spend weeks wiring them together instead of
              serving customers.
            </p>
            <p>
              Tyashin brings it into one platform: port a design from Lovable or Bolt, make it
              a fast server-rendered site on the edge, and switch on AI chat, automated SEO and
              blogging, payments, and analytics as you need them. It&rsquo;s built for speed,
              discoverability, and the economics of real-world businesses — in every market
              where a small team is trying to sell online.
            </p>
            <p>
              Tyashin is built and operated by{' '}
              <strong className="text-white/85">Aapastech Private Limited</strong>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Button href="https://admin.tyashin.com" className="px-6 py-3">
              Get started
            </Button>
            <a
              href="/contact"
              className="border-ink-line rounded-full border px-6 py-3 text-sm text-white/70 transition-colors hover:text-white"
            >
              Talk to us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
