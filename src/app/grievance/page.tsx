import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';
import LegalDoc from '@/components/LegalDoc';

const base = pageMetadata({
  title: 'Grievance Officer',
  description:
    'Complain to Tyashin about our service, content we host or your personal data: how to complain, response times, and appeals in India, the EU, the UK and Canada.',
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
              8/3, 2nd Floor, Roop Nagar, Delhi 110007, India (registered office; send legal
              notices here)
              <br />
              1st Floor, 145, Sector 44, Gurugram, Haryana 122003, India (principal place of
              business)
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
              <li>
                In the European Union you can complain to the Estonian Data Protection
                Inspectorate (Andmekaitse Inspektsioon, <a href="https://www.aki.ee">www.aki.ee</a>)
                or to the data protection authority where you live. In the United Kingdom you
                can complain to the Information Commissioner's Office{' '}
                (<a href="https://ico.org.uk">ico.org.uk</a>). Shikha Gupta is also the privacy
                contact for Aapastech OÜ.
              </li>
              <li>
                In Canada you can contact the Office of the Privacy Commissioner of Canada, and
                in Quebec the Commission d'accès à l'information. Shikha Gupta is also our
                Privacy Officer for 14818032 Canada Inc. and the person in charge of the
                protection of personal information for Quebec{' '}
                (<a href="mailto:contact@aapastech.com">contact@aapastech.com</a>,{' '}
                <a href="tel:+14378000190">+1 437 800 0190</a>).
              </li>
            </ul>

            <p>
              <strong>Who runs Tyashin.</strong> Tyashin is run by three companies in the same
              group. Which one you deal with depends on where you are. For a business account, that is the country of the
              business's billing address.
            </p>
            <ul>
              <li>
                <strong>India:</strong> Aapastech Private Limited (CIN U72900DL2022PTC395508;
                registered office 8/3, 2nd Floor, Roop Nagar, Delhi 110007; principal place of
                business 1st Floor, 145, Sector 44, Gurugram, Haryana 122003). It is the data
                fiduciary for your personal data under Indian law.
              </li>
              <li>
                <strong>European Union and United Kingdom:</strong> Aapastech OÜ (registry code
                16453146, VAT EE102489493, Tornimäe tn 3 // 5 // 7, 10145 Tallinn, Estonia). It
                is the controller of your personal data under the GDPR and the UK GDPR.
              </li>
              <li>
                <strong>Everywhere else:</strong> 14818032 Canada Inc. (Burlington, Ontario,
                Canada). It is the controller of your personal data.
              </li>
            </ul>
            <p>
              The three companies share engineering, hosting and support, and each processes
              personal data for the others under a written intra-group agreement. In this
              document "Tyashin", "we" and "us" mean whichever of them you deal with.
            </p>

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
