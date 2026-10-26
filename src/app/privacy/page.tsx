import { pageMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';
import LegalDoc from '@/components/LegalDoc';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'What personal data Tyashin (Aapastech Private Limited) collects and why, who we share it with, how long we keep it, your rights in India and how to complain.',
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
          <p className="mt-5 text-white/55">Last updated: 26 October 2026</p>
        </Reveal>

        <Reveal delay={0.05}>
          <LegalDoc>
            <p>
              This policy explains what personal data Tyashin collects, why we collect it, who
              we share it with and what rights you have. It covers tyashin.com, the Tyashin
              admin app at admin.tyashin.com, and the websites and stores we host for our
              customers. Our LinkedIn product at linkedin.tyashin.com has its own privacy
              policy.
            </p>

            <h2 id="who-we-are">1. Who we are</h2>
            <p>
              Tyashin is run by Aapastech Private Limited, a company registered in India (CIN
              U72900DL2022PTC395508) with its registered office at 8/3, 2nd Floor, Roop Nagar,
              Delhi 110007. In this document "Tyashin", "we" and "us" mean Aapastech Private
              Limited.
            </p>
            <p>
              For the personal data described in sections 2 and 3, we are the data fiduciary:
              we decide why and how it is used. For personal data that our customers collect
              on their own sites, the customer decides and we process it on their behalf (see
              section 4).
            </p>

            <h2 id="what-we-collect">2. What we collect and why</h2>
            <p>
              <strong>Your account.</strong> When you sign up we collect your name, email
              address and password, the name of your business, your country and your
              currency. We store your password only in hashed form. If you sign in with Google,
              Google shares your name, email address and profile photo with us. We use this
              data to create and run your account, sign you in, keep the account secure and
              contact you about it.
            </p>
            <p>
              <strong>Billing.</strong> If you buy a plan or an add-on, we keep your billing
              details, the products you bought, your invoices and your payment records. You
              enter card or bank details with Razorpay or Stripe, not with us; they tell us
              whether a payment succeeded and give us a reference for it. We use this data to
              take payment, issue tax invoices and meet our accounting and tax duties.
            </p>
            <p>
              <strong>How you use Tyashin.</strong> When you use the admin app we record the
              pages you open, links and downloads you click, errors and page speed, linked to
              your account ID, email address, name and role. Our servers also log your IP
              address, browser and device details and the time of each request, and we work
              out your approximate country from your IP address. We use this to run, secure,
              fix and improve Tyashin.
            </p>
            <p>
              <strong>Your sites and content.</strong> We store what you and your team put into
              Tyashin: pages, products, images, blog posts, brand details, briefs for Website
              Studio and the information your chatbot answers from. This can include personal
              data, such as the names and photos of your staff. We use it to build, host and
              run your site and to provide the features you turn on, including AI features.
              Section 5 names the AI providers.
            </p>
            <p>
              <strong>When you contact us.</strong> If you use our contact form we receive your
              name, email address, company, topic and message, your phone number if you give
              it, the page you wrote from and your country. If you sign up for product updates
              we keep your email address and where you signed up. If you chat with the
              assistant on tyashin.com, we keep the conversation. We also keep the emails and
              WhatsApp messages you send us. We use all of this to answer you, support you and
              send the updates you asked for.
            </p>
            <p>
              <strong>Visits to tyashin.com.</strong> When you browse tyashin.com we record the
              pages you view, the page you came from, your browser, screen size and language,
              and a random visitor ID. If a page shows an error, we receive the error message
              and the page address. We use this to count visits, see which pages are useful
              and fix problems.
            </p>

            <h2 id="cookies">3. Cookies and browser storage</h2>
            <p>
              tyashin.com does not use advertising cookies and does not load tracking scripts
              from other companies. The only cookie it may set is one that keeps you on the
              same version of the site while we test a new version; it records only which
              version you see. Our pages also keep a few items in your browser's storage:
            </p>
            <ul>
              <li>
                a random visitor ID (<code>aapas_vid</code>) that our analytics uses to tell
                new visits from return visits;
              </li>
              <li>
                the chat assistant's conversation and visitor IDs and a few display settings
                (items named <code>aapas_chat_</code>, <code>aapas_visit_count</code> and{' '}
                <code>aapas_nav_count</code>), so the assistant can pick up a conversation where
                you left it;
              </li>
              <li>
                a random session ID (<code>__tyTelSid</code>) attached to error reports, which
                your browser deletes when you close the tab.
              </li>
            </ul>
            <p>
              In the admin app we keep your sign-in session in your browser's local storage
              (<code>auth-storage</code>) so you stay signed in. Our analytics, YOM, stores a
              random ID (<code>yom_anon_id</code>) and a session ID, and it records nothing if
              your browser sends a Do Not Track or Global Privacy Control signal.
            </p>
            <p>
              Sites we host for our customers may use cookies or browser storage for sign-in,
              shopping carts, consent choices and their chat assistant. The business that runs
              each site decides this, and its own privacy policy should explain it.
            </p>
            <p>
              You can clear or block cookies and browser storage in your browser settings.
              tyashin.com still works if you do, but the chat assistant will forget your
              conversation.
            </p>

            <h2 id="customer-data">4. Data we process for our customers</h2>
            <p>
              Businesses that use Tyashin collect personal data from the people who visit and
              buy from their sites: contact form and lead details, orders and delivery
              addresses, newsletter sign-ups, shopper accounts, chat conversations, analytics,
              error reports, and visitors' IP addresses and device details. For this data the
              business is the data fiduciary and we are its processor. We process the data only
              to run the site and the features the business has turned on, and only on its
              instructions. The <a href="/dpa">Tyashin Data Processing Addendum</a> sets out
              the terms.
            </p>
            <p>
              If you visited or bought from a site hosted on Tyashin and want to use your
              rights, contact the business that runs the site. If you write to us instead, we
              will pass your request to that business and help it respond.
            </p>

            <h2 id="sub-processors">5. Who we share data with</h2>
            <p>
              We share personal data with the service providers below, which process it for us
              so we can run Tyashin. This is our sub-processors list. Where a provider runs a
              global network, your data can be processed in any country where it operates.
            </p>
            <ul>
              <li>
                <strong>Cloudflare, Inc.</strong> (United States; global network). Hosts and
                delivers tyashin.com, the admin app, our customers' sites and our API. Holds
                site data such as form submissions, chat conversations and analytics, stores
                uploaded files, protects against attacks, and runs the servers behind Website
                Studio.
              </li>
              <li>
                <strong>MongoDB, Inc.</strong> (MongoDB Atlas, hosted on Google Cloud in Mumbai,
                India). Our main database: accounts, teams, projects, billing records and store
                orders.
              </li>
              <li>
                <strong>Razorpay Software Private Limited</strong> (India). Takes payments in
                Indian rupees.
              </li>
              <li>
                <strong>Stripe</strong> (United States and other countries where Stripe
                operates). Takes payments in other currencies.
              </li>
              <li>
                <strong>Resend</strong> (United States). Sends emails from Tyashin, such as
                sign-in links, receipts and notices, and the emails our customers' sites send
                to their own customers, such as order confirmations.
              </li>
              <li>
                <strong>Google LLC</strong> (Google Workspace; United States and other
                countries). Our company email, including contact@aapastech.com and
                hello@tyashin.com.
              </li>
              <li>
                <strong>OpenAI</strong> (United States). Writes the chat assistant's replies on
                sites that use our chatbot, including tyashin.com, creates images for blog
                posts and powers some SEO and writing features. It receives the chat messages
                and site content these features need.
              </li>
              <li>
                <strong>Anthropic</strong> (United States). Builds sites in Website Studio,
                writes blog posts, powers AI editing in the site editor and fixes failed site
                builds. It receives the briefs, site content and code these features need.
              </li>
              <li>
                <strong>GitHub, Inc.</strong> (United States). Stores the source code of the
                sites we build and host, and runs their build and deploy jobs.
              </li>
              <li>
                <strong>Slack Technologies</strong> (United States). Carries our internal alerts
                about errors, service health and account usage. An alert can include a business
                or site name, the page where an error happened and the error message.
              </li>
              <li>
                <strong>YOM</strong> (the Aapastech analytics service at yom.aapastech.com,
                running on Cloudflare). Analytics for the admin app and for sites that use our
                analytics features.
              </li>
            </ul>
            <p>
              <strong>Services you choose to connect.</strong> If you sign in with Google, or
              connect Google Analytics, Google Search Console, Bing Webmaster Tools, a GitHub
              repository or Thridify to your project, data passes between us and that service
              so the connection works, and the service handles it under its own terms. If you
              message us on WhatsApp, WhatsApp handles the message under its own terms.
            </p>
            <p>
              <strong>Aggregated statistics.</strong> We may publish statistics built from data
              across many sites, such as benchmarks. They contain no personal data, and our{' '}
              <a href="/terms#aggregated-data">terms</a> set out the rules we follow.
            </p>
            <p>
              <strong>When the law requires it.</strong> We disclose personal data to courts,
              government agencies and law enforcement when the law requires us to.
            </p>
            <p>We do not sell personal data.</p>

            <h2 id="your-rights">6. Your rights</h2>
            <p>
              You can ask us for a summary of the personal data we hold about you and what we
              do with it, ask us to correct, complete, update or delete it, withdraw any
              consent you gave (as easily as you gave it), and nominate someone to act for you
              if you die or become unable to act. Email{' '}
              <a href="mailto:contact@aapastech.com">contact@aapastech.com</a>. We answer within
              one month, and never later than the law allows. We may ask you to confirm your
              identity, but only with information we already hold.
            </p>

            <h2 id="retention">7. How long we keep data</h2>
            <p>
              We keep personal data while your account is active and as long as we need it for
              the purpose you gave it for, then delete it. Some records stay longer because the
              law requires it: invoices and tax records for 8 years, and security logs for at
              least 180 days. Indian law also requires us to keep personal data, related
              traffic data and processing logs for one year from processing; when we delete
              your data from our systems we keep a sealed copy for the rest of that year, which
              nobody uses except to meet that legal duty, and then destroy it.
            </p>

            <h2 id="transfers">8. Where data goes</h2>
            <p>
              We use service providers in other countries, listed on our{' '}
              <a href="#sub-processors">sub-processors list</a>. Transfers out of India follow
              section 16 of the Digital Personal Data Protection Act, 2023; we will not
              transfer data to any country the Government of India restricts.
            </p>

            <h2 id="security">9. Security</h2>
            <p>
              We keep a documented information security programme: encryption in transit,
              access limited to staff who need it, logging, and incident response. If a breach
              affects your personal data we will tell you and the authorities as the law
              requires.
            </p>

            <h2 id="children">10. Children</h2>
            <p>
              Tyashin is a service for businesses and is not for anyone under 18. Do not create
              an account or send us personal data if you are under 18. If you think a child
              has given us personal data, tell us at{' '}
              <a href="mailto:contact@aapastech.com">contact@aapastech.com</a> and we will
              delete it.
            </p>

            <h2 id="complaints">11. Complaints and our Grievance Officer</h2>
            <p>
              Contact our Grievance Officer (see <a href="/grievance">/grievance</a>). If you
              are not satisfied, you can complain to the Data Protection Board of India once
              the relevant provisions apply.
            </p>
            <p>
              <strong>Grievance Officer:</strong> Shikha Gupta, Aapastech Private Limited, 8/3,
              2nd Floor, Roop Nagar, Delhi 110007, India. Email{' '}
              <a href="mailto:contact@aapastech.com">contact@aapastech.com</a>, phone{' '}
              <a href="tel:+919667747082">+91 96677 47082</a>.
            </p>

            <h2 id="changes">12. Changes to this policy</h2>
            <p>
              We may update this policy. When we do, we change the date at the top of this
              page, and if a change matters to you we tell you by email or in the product
              before it takes effect.
            </p>

            <h2 id="contact">13. Contact us</h2>
            <p>
              Aapastech Private Limited, 8/3, 2nd Floor, Roop Nagar, Delhi 110007, India.
              Email <a href="mailto:contact@aapastech.com">contact@aapastech.com</a>.
            </p>
            <p>
              Ask us at the address above if you need this policy in Hindi or in another
              language listed in the Eighth Schedule to the Constitution of India, and we will
              send it within 7 days.
            </p>
          </LegalDoc>
        </Reveal>
      </div>
    </section>
  );
}
