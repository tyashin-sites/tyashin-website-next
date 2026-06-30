import { pageMetadata } from '@/lib/seo';
import { Mail, Clock } from 'lucide-react';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import WhatsAppPanel from '@/components/WhatsAppPanel';

export const metadata = pageMetadata({
  title: 'Contact Tyashin',
  description:
    'Get in touch with the Tyashin team. Reach us by form, email, or WhatsApp — replies within one business day.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <section className="relative py-28">
      <div className="bg-radial-fade pointer-events-none absolute inset-x-0 top-0 h-[480px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Let&apos;s <span className="text-gradient">talk</span>
          </h1>
          <p className="mt-5 text-white/55">
            Tell us about your business — pricing, a live demo, partnership, anything. We reply
            within one business day.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_minmax(0,420px)]">
          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.15}>
            <aside className="flex h-full flex-col gap-5">
              <WhatsAppPanel />

              <a
                href="mailto:hello@tyashin.com"
                className="border-ink-line bg-ink-card/60 group flex items-start gap-4 rounded-3xl border p-6 transition-colors hover:border-white/25"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-base font-semibold text-white">Email us</div>
                  <div className="mt-1 text-sm text-white/55">hello@tyashin.com</div>
                  <div className="mt-2 text-xs text-white/40">
                    Good for longer threads and attachments.
                  </div>
                </div>
              </a>

              <div className="border-ink-line bg-ink-card/40 flex items-start gap-4 rounded-3xl border p-6">
                <div className="text-cyan-glow/80 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-base font-semibold text-white">
                    Reply time
                  </div>
                  <div className="mt-1 text-sm text-white/55">
                    One business day, usually much sooner.
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
