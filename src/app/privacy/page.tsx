import { pageMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';
import LegalDoc from '@/components/LegalDoc';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Tyashin (Aapastech Pvt Ltd) collects, uses, and protects your data, your rights, and how to contact us.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <section className="relative py-28">
      <div className="bg-radial-fade pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">Legal</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="mt-5 text-white/55">Last updated: July 2026</p>
        </Reveal>

        <Reveal delay={0.05}>
          <LegalDoc>
            <p>
              This Privacy Policy explains how Aapastech Private Limited (&ldquo;Tyashin&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, discloses, and safeguards your
              information when you use the Tyashin platform and this website. By using our
              services you agree to the practices described here.
            </p>

            <p>
              <strong>Who we are:</strong> Tyashin is a product brand owned and operated by
              AAPASTECH PRIVATE LIMITED, a private limited company registered in India
              (CIN: U72900DL2022PTC395508, Registration No. 395508, ROC Delhi), with its
              registered office in Roop Nagar, Delhi 110007, India. Our company record is
              verifiable on the Ministry of Corporate Affairs registry (mca.gov.in).
            </p>

            <h2>1. Information we collect</h2>
            <ul>
              <li>
                <strong>Account information</strong> — name, email, business name, and
                billing details you provide when you sign up or subscribe.
              </li>
              <li>
                <strong>Usage data</strong> — pages visited, features used, device and
                browser type, and approximate location derived from your IP address.
              </li>
              <li>
                <strong>Content</strong> — the storefront, catalog, and site data you create
                or import while using the platform.
              </li>
              <li>
                <strong>Communications</strong> — messages you send us by form, email, or
                WhatsApp.
              </li>
            </ul>

            <h2>2. How we use your information</h2>
            <ul>
              <li>To provide, operate, secure, and improve the Tyashin platform.</li>
              <li>To process payments and manage your subscription.</li>
              <li>To respond to your enquiries and provide support.</li>
              <li>To send service, security, and billing notices.</li>
              <li>To comply with legal obligations.</li>
            </ul>

            <h2>3. Cookies</h2>
            <p>
              We use essential cookies to keep you signed in and to remember your
              preferences, and privacy-respecting analytics to understand aggregate usage.
              You can control cookies through your browser settings.
            </p>

            <h2>4. Sharing &amp; third parties</h2>
            <p>
              We do not sell your personal data. We share it only with service providers who
              help us run the platform (for example payment gateways such as Razorpay and
              Stripe, and cloud infrastructure such as Cloudflare), under contracts that
              require them to protect it, or where required by law.
            </p>

            <h2>5. Data retention &amp; security</h2>
            <p>
              We keep your information for as long as your account is active or as needed to
              provide the service and meet legal requirements. We use industry-standard
              measures to protect it, though no method of transmission over the internet is
              completely secure.
            </p>

            <h2>6. Your rights</h2>
            <p>
              Subject to applicable law (including India&rsquo;s Digital Personal Data
              Protection Act), you may request access to, correction of, or deletion of your
              personal data, and you may withdraw consent at any time. To exercise these
              rights, contact us using the details below.
            </p>

            <h2>7. Contact</h2>
            <p>
              Aapastech Private Limited — email{' '}
              <a href="mailto:hello@tyashin.com">hello@tyashin.com</a>. For general questions
              you can also reach us via our <a href="/contact">contact page</a>.
            </p>
          </LegalDoc>
        </Reveal>
      </div>
    </section>
  );
}
