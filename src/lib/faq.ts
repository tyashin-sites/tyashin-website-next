import type { FaqItem } from '@/sections/FAQ';

export type FaqGroup = { title: string; items: FaqItem[] };

/**
 * Full FAQ used by /faq. Single source of truth — the page renders these
 * groups AND derives the FAQPage JSON-LD from them, so the rich-result
 * markup can never drift from what's on screen.
 */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: 'Getting started',
    items: [
      {
        q: 'What exactly is Tyashin?',
        a: "Tyashin is an AI growth and commerce platform. It gives you a real, fast website and then runs the business behind it — storefront, payments, CRM, AI chatbot, SEO and content — in one place instead of a dozen stitched-together tools.",
      },
      {
        q: 'How long does it take to go live?',
        a: 'Most sites are live within days, not months. If you already have a design or an existing site, porting it is usually the fastest route — we turn it into a server-rendered site on the edge and connect the business features you need.',
      },
      {
        q: 'Do I need to be technical to use it?',
        a: "No. Day-to-day work — editing content, adding products, publishing posts, reading enquiries — happens in the admin panel. If you are technical, the underlying code is real Next.js you can fork and extend.",
      },
      {
        q: 'What kinds of businesses is it built for?',
        a: 'Small and growing businesses that need a credible online presence and want to sell or capture leads: retail and e-commerce, manufacturers and suppliers, hospitality and stays, and service businesses.',
      },
    ],
  },
  {
    title: 'Moving an existing site',
    items: [
      {
        q: 'Can I bring a site I built in Lovable, Bolt, or React?',
        a: 'Yes — this is one of the most common ways people start. We port your existing storefront into a server-rendered, indexable site on the edge and wire it to payments, CRM and the chatbot, turning a good-looking prototype into a working business.',
      },
      {
        q: 'Will moving hurt my Google rankings?',
        a: 'Handled properly, it helps. Client-rendered prototypes are often poorly indexed to begin with. We move you to server-rendered pages with proper titles, canonical URLs, sitemaps and structured data, which usually improves how search engines see the site.',
      },
      {
        q: 'Can I keep my existing domain?',
        a: 'Yes. You point your domain at Tyashin and keep it. Both your apex domain and the www version work, and HTTPS is handled for you.',
      },
    ],
  },
  {
    title: 'Pricing and billing',
    items: [
      {
        q: 'How does pricing work?',
        a: 'You pay a plan for the platform itself, and power features are available as separate add-ons so you only pay for what you switch on. Current plans and numbers are on the pricing page.',
      },
      {
        q: 'Is there a free tier?',
        a: 'The power plugins — AI chatbot, SEO Co-Pilot, auto-blogging and analytics — each include a free tier so you can try them before you commit to a paid tier.',
      },
      {
        q: 'Which currency will I be billed in?',
        a: 'Currency is detected automatically. Indian customers are billed in INR through Razorpay; everywhere else is billed through Stripe in the appropriate currency.',
      },
      {
        q: 'Can I cancel any time?',
        a: 'Yes. Subscriptions renew automatically until you cancel, and you can cancel from your billing settings. Your invoices and payment method are always visible there too.',
      },
    ],
  },
  {
    title: 'Selling and payments',
    items: [
      {
        q: 'How do payments work in India versus the rest of the world?',
        a: "INR is billed through Razorpay, including UPI, GST handling and cash on delivery. Every other currency goes through Stripe. You don't have to wire either of them up yourself.",
      },
      {
        q: 'Can I run a full online store?',
        a: 'Yes — product catalog, categories, cart, checkout, orders, and order-status and returns pages are part of the platform, along with the emails that go with them.',
      },
      {
        q: 'What if I only want leads, not a shop?',
        a: 'That works too. You can run purely as a marketing site with contact forms, WhatsApp enquiries, newsletter capture and the AI chatbot, and leave e-commerce switched off.',
      },
    ],
  },
  {
    title: 'SEO, speed and AI search',
    items: [
      {
        q: 'Will my site actually get found on Google?',
        a: 'That is a core design goal. Pages are server-rendered and indexable, with per-page titles and descriptions, canonical URLs, an automatic sitemap and schema.org structured data — the things that decide whether you get crawled and ranked.',
      },
      {
        q: 'What about AI search like ChatGPT and Perplexity?',
        a: 'The same structured data and machine-readable content that helps Google also helps AI assistants understand and cite your business, which is increasingly where discovery starts.',
      },
      {
        q: 'How fast is it?',
        a: "Sites run on Cloudflare's edge network, so pages are served close to your visitors rather than from a single origin. Images are optimised and modern formats are served automatically.",
      },
      {
        q: 'What does SEO autopilot and auto-blogging do?',
        a: 'They research relevant keywords and trends for your industry and turn them into publishable blog content on a schedule you control. Publishing is opt-in — nothing goes live on your site unless you allow it.',
      },
    ],
  },
  {
    title: 'Ownership, data and support',
    items: [
      {
        q: 'Do I own the code and my data?',
        a: 'Yes. Generated sites are real Next.js applications committed to a GitHub repository you own, so you can fork, edit and redeploy. Your customer and store data stay isolated to your project and are exportable.',
      },
      {
        q: 'What happens to my site if I leave?',
        a: 'You keep the repository and can export your data. Because the site is a standard Next.js app rather than a proprietary page format, you are not locked in.',
      },
      {
        q: 'How is my data protected?',
        a: 'Each project is isolated, analytics are cookieless by default, webhooks are signed, and privacy and consent tooling is built in. See our privacy policy for the full detail.',
      },
      {
        q: 'How do I get help?',
        a: 'Reach us through the contact page, by email, or on WhatsApp. We typically reply within one business day.',
      },
    ],
  },
];

/** Flattened list — used for the FAQPage structured data. */
export const ALL_FAQS: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);
