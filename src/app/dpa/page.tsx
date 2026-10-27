import { pageMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';
import LegalDoc from '@/components/LegalDoc';

export const metadata = pageMetadata({
  title: 'Data Processing Addendum',
  description:
    'The Tyashin Data Processing Addendum: how we process personal data of your site visitors and buyers on your behalf as your processor, including the GDPR Article 28 terms.',
  path: '/dpa',
});

export default function DpaPage() {
  return (
    <section className="relative py-28">
      <div className="bg-radial-fade pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-cyan-glow text-sm font-medium uppercase tracking-[0.2em]">Legal</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Data Processing <span className="text-gradient">Addendum</span>
          </h1>
          <p className="mt-5 text-white/55">Last updated: 26 October 2026</p>
        </Reveal>

        <Reveal delay={0.05}>
          <LegalDoc>
            <p>
              This Tyashin Data Processing Addendum (the "Addendum") forms part of the{' '}
              <a href="/terms">Tyashin Terms of Service</a> (the "Terms"). It applies when we
              process personal data about the people who visit or buy from your site on your
              behalf. "You" means the business that holds the Tyashin account.
            </p>

            <h2 id="who-we-are">1. Who we are</h2>
            <p>
              Tyashin is run by two companies in the same group. If you pay in Indian rupees,
              or use Tyashin in India without paying, your contract is with{' '}
              <strong>Aapastech Private Limited</strong>, a company registered in India (CIN
              U72900DL2022PTC395508, registered office 8/3, 2nd Floor, Roop Nagar, Delhi
              110007; principal place of business 1st Floor, 145, Sector 44, Gurugram, Haryana
              122003), which is also the data fiduciary for your personal data. If you pay in
              any other currency, or use Tyashin outside India without paying, your contract is
              with <strong>Aapastech OÜ</strong>, a company registered in Estonia (registry
              code 16453146, VAT EE102489493, Tornimäe tn 3 // 5 // 7, 10145 Tallinn), which is
              the controller of your personal data under the EU General Data Protection
              Regulation. Aapastech Private Limited builds and operates the platform for both.
              In this document "Tyashin", "we" and "us" mean whichever of them you deal with.
            </p>

            <h2 id="roles">2. Roles</h2>
            <p>
              "Site Data" means personal data about the visitors and buyers on any site you run
              on Tyashin that we process to provide the Service. For Site Data, you are the data
              fiduciary (the controller, under laws that use that word) and we are your
              processor. Personal data about you and your team as our account holders is not
              Site Data; our <a href="/privacy">privacy policy</a> covers it.
            </p>
            <p>
              If you are a customer of Aapastech OÜ, this Addendum is the contract between you
              and Aapastech OÜ required by Article 28 of the EU General Data Protection
              Regulation.
            </p>

            <h2 id="scope">3. Scope and duration</h2>
            <p>
              This Addendum applies from the moment we first process Site Data for you. It
              lasts as long as we process Site Data, including after your account ends while
              we delete or return it, or keep it because the law requires (section 11).
            </p>

            <h2 id="data">4. The data and the people it is about</h2>
            <p>
              Site Data is about visitors to your site, buyers and shoppers (including those
              with accounts on your site), and people who fill in your forms, subscribe to
              your newsletter or use your chat assistant. It can include:
            </p>
            <ul>
              <li>
                form submissions and leads: names, email addresses, phone numbers, messages and
                any other fields you add to your forms;
              </li>
              <li>
                orders: names, contact details, delivery and billing addresses, items bought,
                amounts, and payment status and references (buyers enter card and bank details
                with the payment provider, not with us);
              </li>
              <li>shopper accounts and newsletter sign-ups;</li>
              <li>
                chat conversations with your site's chat assistant, including anything people
                type into it;
              </li>
              <li>
                analytics and error telemetry: pages viewed, clicks and other events, random
                visitor and session IDs, the referring page and error messages;
              </li>
              <li>
                visitor IP addresses and device data: IP address, the approximate location
                worked out from it, browser and device details, and request logs;
              </li>
              <li>the consent choices people make on your site.</li>
            </ul>
            <p>
              We process Site Data to host and run your site, provide the features you turn on,
              keep the Service secure, support you and meet our legal duties.
            </p>

            <h2 id="instructions">5. Processing only on your instructions</h2>
            <p>
              We process Site Data only on your documented instructions. Your instructions are
              the Terms, this Addendum, your settings and the features you turn on, and any
              other written instructions we agree with you. We will tell you if we think an
              instruction breaks the law. We do not use Site Data for our own purposes. By
              accepting the Terms you also instruct us to produce the aggregated statistics
              described in section 10 of the Terms. We may process Site Data where the law
              requires us to, and if so we will tell you first unless the law forbids it.
            </p>

            <h2 id="confidentiality">6. Confidentiality</h2>
            <p>
              We limit access to Site Data to staff and contractors who need it for their work
              and who are bound by a duty of confidentiality.
            </p>

            <h2 id="security">7. Security</h2>
            <p>We will keep at least these measures in place to protect Site Data:</p>
            <ul>
              <li>TLS on every public endpoint;</li>
              <li>encryption at rest provided by our hosting and database providers;</li>
              <li>access to production systems limited to staff who need it;</li>
              <li>secrets kept in managed secret stores, never in source code;</li>
              <li>logging of security and administrative events;</li>
              <li>incident response with the notification times in this Addendum;</li>
              <li>backups provided by our database providers.</li>
            </ul>
            <p>We are extending log retention to 180 days across all systems by 31 December 2026.</p>

            <h2 id="sub-processors">8. Sub-processors</h2>
            <p>
              You authorise us to use the sub-processors named in the{' '}
              <a href="/privacy#sub-processors">sub-processors list in our privacy policy</a>.
              We will use a sub-processor only under written terms that require it to protect
              Site Data in line with this Addendum. We will tell you by email or in the product
              at least 30 days before we add or replace a sub-processor that processes Site
              Data. If you object to the change, you can end the Service before it takes
              effect.
            </p>

            <h2 id="breaches">9. Personal data breaches</h2>
            <p>
              If we become aware of a personal data breach affecting Site Data, we will tell
              you without undue delay and in any case within 24 hours of becoming aware of it.
              We will give you what you need for your report to the Data Protection Board of
              India within 72 hours (or, if you are a customer of Aapastech OÜ, to your
              supervisory authority under the GDPR):
            </p>
            <ul>
              <li>what happened, and its nature, extent, timing and location;</li>
              <li>its likely impact;</li>
              <li>the events, circumstances and reasons that led to it;</li>
              <li>what we have done, or plan to do, to reduce the risk;</li>
              <li>what we know about who caused it;</li>
              <li>the steps we are taking to stop it happening again.</li>
            </ul>
            <p>
              We will update you as we learn more, and help you prepare your notices to the
              people affected. We also report cyber security incidents to CERT-In where the law
              requires us to.
            </p>

            <h2 id="requests">10. Requests from individuals</h2>
            <p>
              If someone asks us to give them, correct, complete, update or delete their Site
              Data, to withdraw their consent or to nominate someone to act for them, we will
              pass the request to you promptly. We will not answer it ourselves unless you ask
              us to or the law requires it. We will help you answer these requests within the
              time the law gives you, through the admin app where it covers the request and by
              hand where it does not. We will also give you reasonable help with data
              protection impact assessments, and with consulting a supervisory authority, where
              they concern our processing of Site Data.
            </p>

            <h2 id="deletion">11. Deletion or return at the end</h2>
            <p>
              When the Service ends, or earlier if you ask, we will delete Site Data or return
              a copy to you, as you choose. Some data stays longer because the law requires it.
              The CERT-In Directions of 28 April 2022 require us to keep logs for 180 days, and
              from 13 May 2027 Rule 8(3) of the Digital Personal Data Protection Rules, 2025
              will require us to keep personal data, related traffic data and processing logs
              for one year from processing. We keep data held for these reasons as a sealed
              copy that nobody uses except to meet those legal duties, and then destroy it.
            </p>

            <h2 id="audits">12. Information and audits</h2>
            <p>
              We will give you the information you reasonably need to show that we meet this
              Addendum. We will also allow reasonable audits by you, or by an independent
              auditor you appoint, on reasonable written notice and under a duty of
              confidentiality, carried out in a way that does not expose other customers' data
              or weaken our security.
            </p>

            <h2 id="transfers">13. Transfers out of India</h2>
            <p>
              We may process Site Data outside India through the sub-processors on our list.
              Transfers out of India follow section 16 of the Digital Personal Data Protection
              Act, 2023, and we will not transfer Site Data to any country the Government of
              India restricts by notification.
            </p>
            <p>
              If you are a customer of Aapastech OÜ, transfers of Site Data outside the European
              Economic Area, to Aapastech Private Limited in India and to sub-processors
              outside the European Economic Area, are covered by the EU Standard Contractual
              Clauses (Commission Implementing Decision (EU) 2021/914), Module 3, which are
              incorporated into this Addendum by reference. We will send you a copy on request.
            </p>

            <h2 id="your-duties">14. Your responsibilities</h2>
            <p>You must:</p>
            <ul>
              <li>
                have a lawful basis for collecting Site Data, including consent where the law
                requires it, and publish a privacy notice on your site that tells people what
                you collect, why, who processes it for you (including Tyashin) and how they can
                use their rights;
              </li>
              <li>
                where your site has visitors in the European Union, get their consent before
                your site stores or reads non-essential cookies or other data on their devices;
              </li>
              <li>
                not collect personal data of children under 18 unless you have the verifiable
                consent of a parent or lawful guardian that the law requires, and not use your
                site to track children or target advertising at them;
              </li>
              <li>
                not collect sensitive personal data, such as health or medical information,
                sexual orientation, biometric data or financial account or card details, unless
                you have the consent the law requires;
              </li>
              <li>
                not upload or import personal data you have no right to use, such as contact
                lists bought from others; and
              </li>
              <li>make sure your instructions to us are lawful.</li>
            </ul>

            <h2 id="liability">15. Liability</h2>
            <p>
              Each party's liability under this Addendum is subject to the limits and
              exclusions in section 12 of the Terms.
            </p>

            <h2 id="precedence">16. If documents conflict, and governing law</h2>
            <p>
              If this Addendum and the Terms conflict about Site Data, this Addendum applies.
              Section 15 of the Terms (governing law and courts) also applies to this
              Addendum.
            </p>

            <h2 id="contact">17. Contact</h2>
            <p>
              Send questions about this Addendum, breach questions and audit requests to{' '}
              <a href="mailto:contact@aapastech.com">contact@aapastech.com</a>. Our Grievance
              Officer is Shikha Gupta; see the <a href="/grievance">Grievance Officer page</a>.
            </p>
          </LegalDoc>
        </Reveal>
      </div>
    </section>
  );
}
