import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';
import LegalDoc from '@/components/LegalDoc';

const base = pageMetadata({
  title: 'Grievance Officer',
  description:
    'Complain to Tyashin (Aapastech Private Limited) about our service, content we host or your personal data: how to complain, our response times and how to appeal.',
  path: '/grievance',
});

export const metadata: Metadata = {
  ...base,
  alternates: { canonical: '/grievance', languages: { en: '/grievance', hi: '/grievance/hi' } },
};

export default function GrievancePage() {
  return (
    <section className="relative py-28">
      <div className="bg-radial-fade pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">Legal</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Grievance <span className="text-gradient">Officer</span>
          </h1>
          <p className="mt-5 text-white/55">
            <a href="/grievance/hi" lang="hi" className="underline underline-offset-2 hover:text-white/80">
              यह पेज हिंदी में पढ़ें
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <LegalDoc>
            <p>
              Write to us if you have a complaint about Tyashin, about content on a page or
              site we host, or about how we handle your personal data. Complaints from anyone
              are welcome, whether or not you have an account.
            </p>

            <p>
              <strong>Grievance Officer</strong>
              <br />
              Shikha Gupta
              <br />
              Aapastech Private Limited
              <br />
              8/3, 2nd Floor, Roop Nagar, Delhi 110007, India
              <br />
              Email: <a href="mailto:contact@aapastech.com">contact@aapastech.com</a>
              <br />
              Phone: <a href="tel:+919667747082">+91 96677 47082</a>
            </p>

            <p>
              <strong>How to complain.</strong> Email us with "Grievance" in the subject line.
              Tell us your name and how to reach you, the page, site or account the complaint
              is about, what happened, and what you would like us to do. Attach screenshots or
              links if you have them. For a request about your personal data, tell us which
              product you use and the email address you use with us, so we can find your
              records without asking for more than we need.
            </p>

            <p>
              <strong>What happens next.</strong>
            </p>
            <ul>
              <li>We acknowledge your complaint within 24 hours and give you a reference number.</li>
              <li>We resolve it within 7 days.</li>
              <li>
                If you ask us to remove content we host that breaks our rules for users (see
                our <a href="/terms#content-rules">terms</a>), we act within 36 hours. Claims
                about who owns the content, or about intellectual property, can take up to 7
                days because we need to hear from both sides.
              </li>
              <li>
                If content shows you in a private or sexual way, or pretends to be you,
                including images changed with AI, report it and we will remove it or block
                access within 2 hours.
              </li>
              <li>
                Requests to see, correct or delete your personal data, or to withdraw consent,
                are answered within one month. Most take far less.
              </li>
              <li>
                Orders and notices from courts and government authorities can be sent to the
                same address. We act on them within the time the law sets.
              </li>
            </ul>

            <p>
              <strong>If you are not satisfied.</strong>
            </p>
            <ul>
              <li>
                Under India's Information Technology (Intermediary Guidelines and Digital Media
                Ethics Code) Rules, 2021, you can appeal our decision to the Grievance Appellate
                Committee at <a href="https://gac.gov.in">gac.gov.in</a> within 30 days of
                hearing from us.
              </li>
              <li>
                For personal data, once the relevant parts of the Digital Personal Data
                Protection Act, 2023 apply, you can complain to the Data Protection Board of
                India after using this process.
              </li>
            </ul>

            <p>
              This page is also available in <a href="/grievance/hi">Hindi</a>. Ask us at the
              address above if you need it in another language listed in the Eighth Schedule
              to the Constitution of India and we will send it within 7 days.
            </p>
          </LegalDoc>
        </Reveal>
      </div>
    </section>
  );
}
