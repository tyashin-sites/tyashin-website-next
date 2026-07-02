import { pageMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';
import LegalDoc from '@/components/LegalDoc';

export const metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'The terms that govern your use of the Tyashin platform and website, operated by Aapastech Pvt Ltd.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <section className="relative py-28">
      <div className="bg-radial-fade pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">Legal</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="mt-5 text-white/55">Last updated: July 2026</p>
        </Reveal>

        <Reveal delay={0.05}>
          <LegalDoc>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the
              Tyashin platform, websites, and related services (the &ldquo;Service&rdquo;),
              operated by Aapastech Private Limited (&ldquo;Tyashin&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;). By using the Service you agree to these Terms.
            </p>

            <h2>1. The service</h2>
            <p>
              Tyashin provides an AI-powered growth and commerce platform for building,
              hosting, and operating storefronts and marketing sites. We may update, add, or
              remove features over time.
            </p>

            <h2>2. Accounts</h2>
            <p>
              You are responsible for keeping your account credentials secure and for all
              activity under your account. You must provide accurate information and be
              authorised to bind the business you represent.
            </p>

            <h2>3. Plans, billing &amp; renewals</h2>
            <p>
              Paid plans and add-ons are billed in advance on a recurring basis via our
              payment gateways. Subscriptions renew automatically until cancelled. Fees are
              non-refundable except where required by law or expressly stated. You can view
              your invoices and payment method in your account billing settings.
            </p>

            <h2>4. Acceptable use</h2>
            <ul>
              <li>Do not use the Service to violate any law or third-party right.</li>
              <li>Do not upload malware, attempt to breach security, or disrupt the Service.</li>
              <li>Do not resell or misrepresent the Service without authorisation.</li>
            </ul>

            <h2>5. Your content</h2>
            <p>
              You retain ownership of the content and data you create or import. You grant us
              the limited rights needed to host and operate your site and deliver the Service.
            </p>

            <h2>6. Intellectual property</h2>
            <p>
              The Tyashin platform, software, and brand are owned by Aapastech Private Limited
              and are protected by intellectual-property laws. These Terms grant you no rights
              to our marks except as needed to use the Service.
            </p>

            <h2>7. Disclaimers &amp; liability</h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; without warranties of any kind. To
              the maximum extent permitted by law, Tyashin is not liable for indirect or
              consequential damages, and our total liability is limited to the fees you paid
              in the twelve months preceding the claim.
            </p>

            <h2>8. Termination</h2>
            <p>
              You may cancel at any time. We may suspend or terminate access for breach of
              these Terms or non-payment. On termination, your right to use the Service ends.
            </p>

            <h2>9. Governing law</h2>
            <p>
              These Terms are governed by the laws of India, with exclusive jurisdiction of
              the courts of the company&rsquo;s registered location, unless applicable law
              requires otherwise.
            </p>

            <h2>10. Contact</h2>
            <p>
              Questions about these Terms? Email{' '}
              <a href="mailto:hello@tyashin.com">hello@tyashin.com</a> or visit our{' '}
              <a href="/contact">contact page</a>.
            </p>
          </LegalDoc>
        </Reveal>
      </div>
    </section>
  );
}
