import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';
import LegalDoc from '@/components/LegalDoc';

const base = pageMetadata({
  title: 'Terms of Service',
  description:
    'The user agreement for Tyashin: who you contract with, the service, billing, rules for content you host, AI content, data processing, website analytics, liability and governing law.',
  path: '/terms',
});

export const metadata: Metadata = {
  ...base,
  alternates: { canonical: '/terms', languages: { en: '/terms', hi: '/terms/hi' } },
};

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
          <p className="mt-5 text-white/55">Last updated: 11 November 2026</p>
          <p className="mt-2 text-white/55">
            <a
              href="/terms/hi"
              lang="hi"
              hrefLang="hi"
              className="underline underline-offset-2 hover:text-white/80"
            >
              हिन्दी में पढ़ें
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <LegalDoc>
            <p>
              These terms are the user agreement between you and us for the Tyashin platform,
              websites and related services (the "Service"). By creating an account or using
              the Service you agree to them. Our <a href="/privacy">privacy policy</a> explains
              how we handle personal data, and the{' '}
              <a href="/dpa">Tyashin Data Processing Addendum</a> covers the personal data your
              site collects from its visitors and buyers.
            </p>

            <h2 id="who-we-are">1. Who we are</h2>
            <p>
              Tyashin is run by three companies in the same group. Which one you deal with
              depends on where you are. For a business account, that is the country of the
              business's billing address.
            </p>
            <ul>
              <li>
                <strong>India:</strong> Aapastech Private Limited (CIN U72900DL2022PTC395508;
                registered office 8/3, 2nd Floor, Roop Nagar, Delhi 110007, India). It is the
                data fiduciary for your personal data under Indian law.
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

            <h2 id="service">2. The service</h2>
            <p>
              Tyashin provides an AI-powered growth and commerce platform for building,
              hosting, and operating storefronts and marketing sites. We may update, add, or
              remove features over time.
            </p>

            <h2 id="accounts">3. Accounts</h2>
            <p>
              You are responsible for keeping your account credentials secure and for all
              activity under your account. You must provide accurate information and be
              authorised to bind the business you represent. You must be at least 18 to open
              an account.
            </p>

            <h2 id="billing">4. Plans, credits, billing and renewals</h2>
            <p>
              <strong>Plans.</strong> You subscribe to one plan per business. A plan sets how
              much traffic (visits) and how many credits are included each month, and how many
              sites and team seats you can have. Every feature of the Service is available on
              every plan. Current plans and prices are on our{' '}
              <a href="/pricing">pricing page</a>. Paid plans are billed in advance for each
              billing month through our payment gateways and renew automatically until you
              cancel. You can cancel or change your plan in your account billing settings,
              where you can also see your invoices and payment method.
            </p>
            <p>
              <strong>Credits.</strong> Work done by AI (for example a chatbot reply, an
              AI-written blog post, an AI image, an SEO research run or a site edit made by
              the AI) is paid for in credits. A credit is a prepaid unit that can only be used
              inside the Service. Credits are not money. They have no cash value, cannot be
              refunded or exchanged for cash, and cannot be sold or transferred to another
              person or account, except where the law gives you a right that we cannot
              exclude.
            </p>
            <p>
              <strong>Monthly allowance.</strong> Each plan includes a credit allowance for
              each billing month. Any part of the allowance you do not use expires at the end
              of that billing month and does not carry over.
            </p>
            <p>
              <strong>Top-ups.</strong> You can buy extra credits as top-ups. Top-up credits
              are valid for 12 months from the date of purchase and expire after that. Your
              monthly allowance is always used before your top-up credits.
            </p>
            <p>
              <strong>Credit costs.</strong> The number of credits each action uses is shown
              on the pricing page. We may change these costs. When we do, we will give notice
              of the change on the pricing page before it takes effect. A change does not
              affect credits you have already spent.
            </p>
            <p>
              <strong>When credits run out.</strong> AI features pause until your next
              monthly allowance starts or you buy a top-up. Your site stays online, and the
              features that do not use credits keep working.
            </p>
            <p>
              <strong>Traffic.</strong> The traffic allowance is a soft limit. We do not take
              a site offline for going over it. If your traffic is persistently above your
              plan's allowance, you must move to a plan that covers it. We will tell you
              first and give you reasonable time to change.
            </p>
            <p>
              <strong>Regional prices and currency.</strong> We set prices separately for
              each currency we bill in. They are not conversions of one another at an
              exchange rate. Your billing currency is fixed when you sign up and stays the
              same for that account.
            </p>
            <p>
              <strong>Taxes.</strong> Prices do not include taxes. GST, VAT and similar taxes
              that apply are added at checkout and shown on your invoice.
            </p>
            <p>
              <strong>Refunds.</strong> Fees, including fees for top-ups, are non-refundable
              except where the law requires a refund or we expressly say otherwise.
            </p>
            <p>
              Each company bills and collects payment from its own customers: Aapastech Private
              Limited in India, Aapastech OÜ in the European Union and the United Kingdom, and
              14818032 Canada Inc. everywhere else.
            </p>

            <h2 id="content-rules">5. Rules for content you put on Tyashin</h2>
            <p>
              You are responsible for everything you upload, publish or host through Tyashin,
              including content your own visitors or staff add. You must not use Tyashin, and
              must not let anyone use your account or site, to host, display, upload, change,
              publish, send, store or share anything that:
            </p>
            <ol>
              <li>belongs to someone else and that you have no right to use;</li>
              <li>
                is obscene, pornographic or paedophilic, invades someone's privacy (including
                bodily privacy), insults or harasses anyone on the basis of gender, is racially
                or ethnically objectionable, relates to or encourages money laundering or
                gambling, or promotes enmity between groups on grounds of religion or caste
                with intent to incite violence;
              </li>
              <li>is harmful to children;</li>
              <li>infringes a patent, trademark, copyright or other proprietary right;</li>
              <li>
                deceives or misleads people about where a message came from, or knowingly
                spreads misinformation or anything false and misleading;
              </li>
              <li>impersonates another person;</li>
              <li>
                threatens the unity, integrity, defence, security or sovereignty of India,
                India's friendly relations with other countries, or public order, incites any
                cognisable offence, prevents the investigation of an offence, or insults
                another nation;
              </li>
              <li>
                contains a virus or other code meant to interrupt, destroy or limit any
                computer resource;
              </li>
              <li>
                is an online game that is not verified as permissible, or advertises or
                promotes one; or
              </li>
              <li>breaks any law in force.</li>
            </ol>
            <p>
              <strong>What we can do.</strong> If you break these rules, our privacy policy or
              these terms, we can suspend or end your access immediately, and remove or
              disable access to the content, or both. If the content breaks the law, you may
              face penalties under the Information Technology Act, 2000 and other laws. If the
              breach is an offence that the law requires us to report, for example under the
              Bharatiya Nagarik Suraksha Sanhita, 2023 or the Protection of Children from
              Sexual Offences Act, 2012, we will report it to the authorities. We remind all
              users of these rules at least once every three months.
            </p>

            <h2 id="acceptable-use">6. Acceptable use</h2>
            <ul>
              <li>Do not use the Service to violate any law or third-party right.</li>
              <li>Do not upload malware, attempt to breach security, or disrupt the Service.</li>
              <li>Do not resell or misrepresent the Service without authorisation.</li>
            </ul>

            <h2 id="ai-content">7. Content made with our AI tools</h2>
            <p>
              Some Tyashin features create or change images, video or audio with AI. You must
              not use them to make anything unlawful, including realistic fakes of real people
              or events. Misusing them can lead to penalties under the Information Technology
              Act, 2000, the Bharatiya Nyaya Sanhita, 2023, the Protection of Children from
              Sexual Offences Act, 2012, the Representation of the People Act, 1951, the
              Indecent Representation of Women (Prohibition) Act, 1986, the Sexual Harassment
              of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 and the
              Immoral Traffic (Prevention) Act, 1956. If you misuse them we may remove the
              content at once, suspend or close your account (keeping the evidence), tell a
              victim who complains who you are where the law allows, and report offences to
              the authorities. Do not remove labels or metadata that mark content as
              AI-generated.
            </p>

            <h2 id="your-content">8. Your content</h2>
            <p>
              You retain ownership of the content and data you create or import. You grant us
              the limited rights needed to host and operate your site and deliver the Service.
            </p>

            <h2 id="data-processing">9. Personal data on your site</h2>
            <p>
              When your site collects personal data from its visitors and buyers, such as form
              submissions, orders, chat conversations and analytics, you are the data
              fiduciary (or controller) for that data and we process it for you as your
              processor. The <a href="/dpa">Tyashin Data Processing Addendum</a> forms part of
              these terms and applies to that data. If the addendum and these terms conflict
              about that data, the addendum applies.
            </p>

            <h3 id="website-analytics">Website analytics and your YOM account</h3>
            <p>
              Sites on Tyashin can include analytics from YOM (Your Own Metrics), an analytics
              service run by our group. When we turn it on for your account, this is how it
              works.
            </p>
            <ul>
              <li>
                <strong>Your YOM account.</strong> We open a YOM account in your business's name,
                with a project for each of your sites, and run it for you. You authorise us to
                do this. You see the reports inside Tyashin. You can claim the YOM account at any
                time and use YOM directly, and when you do, YOM's{' '}
                <a href="https://yom.aapastech.com/terms">Terms of Service</a> also apply to your
                use of YOM. After claiming, you can remove our access in YOM under Settings,
                Access. We then stop showing those reports in Tyashin.
              </li>
              <li>
                <strong>Turning it off.</strong> You can turn analytics off for any site in its
                plugin settings. We will not turn it back on unless you ask us to.
              </li>
              <li>
                <strong>Your visitors' data.</strong> Analytics data about your visitors is Site
                Data. It is yours, and the <a href="/dpa">Data Processing Addendum</a> applies to
                it.
              </li>
              <li>
                <strong>What we keep for ourselves.</strong> We keep a record of results on each
                site: the number of leads, orders and chat conversations, and the value of
                orders. It holds nothing that identifies your visitors. We use it to run, bill,
                secure and improve Tyashin, and in combined statistics only as section 10
                allows.
              </li>
              <li>
                <strong>Consent.</strong> For visitors in India, the European Union, the United
                Kingdom, Switzerland and Quebec, and anywhere we cannot tell, analytics does not
                store anything on the visitor's device or give them an ID until they agree in
                your site's cookie banner. These defaults help you, but they are not legal
                advice. You are still responsible for your privacy notice and for any consent
                the law requires, as section 14 of the Data Processing Addendum says.
              </li>
              <li>
                <strong>The numbers are estimates.</strong> Ad blockers, browser settings and
                visitors who refuse cookies mean some visits are never counted. Don't treat the
                figures as exact, and don't rely on them alone for decisions about money, staff
                or legal matters. Section 12 applies to analytics like the rest of the Service.
              </li>
              <li>
                <strong>When you leave Tyashin.</strong> If you have not claimed the YOM account,
                we keep it for 30 days after your Tyashin account ends so you can claim it or
                export your data, and then delete it as section 11 of the Data Processing
                Addendum says. If you have claimed it, it stays yours under YOM's terms, and
                from then on YOM's own plans and fees apply to it.
              </li>
            </ul>
            <p>
              If your Tyashin account was opened before 3 November 2026, this part of section 9
              applies to it 30 days after we email you about it, and never before 4 December
              2026. We will not turn YOM analytics on for your sites before then.
            </p>

            <h2 id="aggregated-data">10. Aggregated and de-identified data</h2>
            <p>
              We may combine data from the operation of the Service, such as visits, orders
              and the use of features on your site, with the same kind of data from other
              sites on Tyashin to produce statistics. We use these statistics to run, secure
              and improve the Service, and to publish benchmarks and industry reports, which we
              may share with others. We, YOM (the analytics service we use) and the service
              providers that process data for us follow these rules:
            </p>
            <ul>
              <li>
                A statistic never names you, your site or your customers, and we never present
                it in a way that would let someone work out who you or they are.
              </li>
              <li>
                Every statistic we publish or share comes from at least 100 people and at
                least 5 sites, and no single site makes up more than a quarter of it.
              </li>
              <li>
                We use only data that is at least 30 days old, a statistic never shows prices
                or forecasts, and we leave out data about people in Quebec.
              </li>
              <li>
                It contains no personal data. We take reasonable technical and organisational
                steps so it can't be linked back to anyone, we won't try to re-identify
                anyone, and anyone we share it with must agree not to try either.
              </li>
              <li>
                We never use data we receive through Shopify (its APIs, webhooks, pixels or
                app extensions) for this.
              </li>
              <li>
                This does not change section 8: your content and data stay yours. The
                statistics, once your data can no longer be identified in them, are ours.
              </li>
            </ul>
            <p>
              If you would rather your site's data were left out of benchmarks, email{' '}
              <a href="mailto:contact@aapastech.com">contact@aapastech.com</a> and we will leave
              it out of future ones.
            </p>

            <h2 id="intellectual-property">11. Intellectual property</h2>
            <p>
              The Tyashin platform, software, and brand are owned by Aapastech Private Limited
              and are protected by intellectual-property laws. These terms grant you no rights
              to our marks except as needed to use the Service.
            </p>

            <h2 id="liability">12. Disclaimers and liability</h2>
            <p>The Service is provided "as is" without warranties of any kind.</p>
            <p>
              Each party's total liability under these terms is limited to the fees you paid in
              the 12 months before the event giving rise to the claim. For breaches of data
              protection or confidentiality obligations the limit is three times that amount.
              These limits do not apply to fraud, wilful misconduct, your obligation to pay
              fees, or your responsibility for your own content and for personal data you had
              no right to give us. Neither party is liable for indirect or consequential loss,
              or for lost profits, except in case of fraud. Nothing in these terms limits
              liability that the law does not allow to be limited.
            </p>

            <h2 id="termination">13. Termination</h2>
            <p>
              You may cancel at any time. We may suspend or terminate access for breach of
              these terms or non-payment. On termination, your right to use the Service ends.
            </p>

            <h2 id="changes">14. Changes to these terms</h2>
            <p>
              We may change these terms. If a change matters to you, we will tell you by email
              or in the product at least 30 days before it takes effect, unless the change is
              required by law sooner. Using Tyashin after a change takes effect means you
              accept it. If you do not agree, you can cancel before that date and we will
              refund any prepaid fees for the unused period.
            </p>

            <h2 id="governing-law">15. Governing law and courts</h2>
            <p>
              If you are in India, Indian law governs these terms and the courts at Delhi have
              jurisdiction. If you are in the European Union or the United Kingdom, Estonian law
              governs them and the Harju County Court in Tallinn has jurisdiction, but you keep
              any protection that the mandatory law of the country where you live gives
              consumers. Everywhere else, the laws of the Province of Ontario and the federal
              laws of Canada that apply there govern them, and the courts of Ontario have
              jurisdiction.
            </p>

            <h2 id="grievances">16. Complaints and our Grievance Officer</h2>
            <p>
              If you have a complaint about Tyashin, about content on a page or site we host,
              or about how we handle personal data, contact our Grievance Officer, Shikha
              Gupta, at <a href="mailto:contact@aapastech.com">contact@aapastech.com</a> or{' '}
              <a href="tel:+919667747082">+91 96677 47082</a>. The{' '}
              <a href="/grievance">Grievance Officer page</a> explains how to complain, how
              quickly we respond and how to appeal.
            </p>

            <h2 id="contact">17. Contact</h2>
            <p>
              Questions about these terms? Email{' '}
              <a href="mailto:contact@aapastech.com">contact@aapastech.com</a>, or write to the
              company you deal with:
            </p>
            <ul>
              <li>
                <strong>Aapastech Private Limited</strong>, CIN U72900DL2022PTC395508.
                Registered office: 8/3, 2nd Floor, Roop Nagar, Delhi 110007, India.
              </li>
              <li>
                <strong>Aapastech OÜ</strong>, registry code 16453146, VAT EE102489493.
                Tornimäe tn 3 // 5 // 7, 10145 Tallinn, Estonia.
              </li>
              <li>
                <strong>14818032 Canada Inc.</strong>, Burlington, Ontario, Canada.
              </li>
            </ul>
            <p>
              A Hindi version is available:{' '}
              <a href="/terms/hi" lang="hi" hrefLang="hi">
                हिन्दी में पढ़ें
              </a>
              . Ask us at contact@aapastech.com if you need these terms in another language
              listed in the Eighth Schedule to the Constitution of India, and we will send them
              within 7 days.
            </p>
          </LegalDoc>
        </Reveal>
      </div>
    </section>
  );
}
