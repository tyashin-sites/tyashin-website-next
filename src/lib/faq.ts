import type { FaqItem } from '@/sections/FAQ';
import { fallbackPricing, formatMoney, formatNumber as fmt, type PlanV2 } from './pricing';

export type FaqGroup = { title: string; items: FaqItem[] };

/**
 * The pricing answers quote numbers. They are read from the checked-in pricing
 * (src/data/pricing-fallback.json), the same file the prebuild parity check
 * compares with the platform, so this copy cannot drift from the price cards.
 * Money is quoted in USD here because this text also feeds the FAQPage JSON-LD.
 */
const USD = fallbackPricing('USD');
const TOPUP = USD.topup;
const FREE = USD.plans[0];
const APPROX_OPS = new Set(['site_edit']);
/** Lower-case the first letter for mid-sentence use, leaving acronyms (AI, SEO, SSL, CRM) alone. */
const lower = (s: string) => (/^[A-Z]{2}/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));
const listPlans = (value: (p: PlanV2) => string) =>
  USD.plans.map((p) => `${p.name} ${value(p)}`).join(', ');
const CREDIT_COSTS = USD.creditExamples
  .map((c) => `${lower(c.label)} (${APPROX_OPS.has(c.op) ? 'about ' : ''}${fmt(c.credits)})`)
  .join(', ');
const INCLUDED = USD.included.map(lower).join(', ');

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
        a: `One subscription per business, sized by your traffic. Every feature is on every plan, so there is nothing to buy feature by feature. AI work is paid in credits, and each plan includes credits every month. You only need two numbers to choose: visits a month (${listPlans((p) => fmt(p.visitsPerMonth))}) and credits a month (${listPlans((p) => fmt(p.creditsPerMonth))}). Enterprise is quoted. Prices are on the pricing page in your currency.`,
      },
      {
        q: 'What is a credit?',
        a: `A credit is the unit that pays for work done by AI. Each plan comes with a monthly allowance, and each AI action takes a set number of credits from it: ${CREDIT_COSTS}. Credits are one pool, so you can spend them on any mix of these.`,
      },
      {
        q: 'What uses credits, and what never does?',
        a: `Only AI work uses credits: chatbot replies, AI blog posts, AI images, SEO research runs and site edits made by the AI. These never use credits, on any plan: ${INCLUDED}.`,
      },
      {
        q: 'Do unused credits carry over?',
        a: `The monthly allowance does not. It expires at the end of each billing month and a fresh allowance starts. Top-up credits are different: they stay valid for ${TOPUP.validityMonths} months from the day you buy them.`,
      },
      {
        q: 'What is a top-up?',
        a: `A top-up is ${fmt(TOPUP.credits)} extra credits for ${formatMoney(TOPUP.price, USD.currency)} (US dollars; the pricing page shows it in your currency). You can buy as many as you need, and they are valid for ${TOPUP.validityMonths} months. Your monthly allowance is always spent first, so top-up credits are only touched when the allowance runs out.`,
      },
      {
        q: 'What happens when I run out of credits?',
        a: 'AI features pause until your next monthly allowance arrives or you buy a top-up. Your site stays up, and everything that does not use credits keeps working: the store, forms, CRM, newsletter and analytics. The chatbot stops answering with AI and offers visitors your contact form instead, so you do not lose the enquiry.',
      },
      {
        q: 'What happens if I go over my traffic limit?',
        a: 'Nothing breaks. Traffic is a soft limit, and we never take a site down for traffic. If you keep going over month after month, we will ask you to move to the plan that fits.',
      },
      {
        q: 'Is the first build free?',
        a: "Yes. A new site's first build is free and does not use credits, so you see your site before you pay anything.",
      },
      {
        q: 'Is there a free plan?',
        a: `Yes. The Free plan costs nothing and needs no card. It includes ${fmt(FREE.visitsPerMonth)} visits and ${fmt(FREE.creditsPerMonth)} credits a month, ${FREE.sites} site and ${FREE.seats} seat, with the same features as the paid plans.`,
      },
      {
        q: 'Can I change plan?',
        a: 'Yes, at any time, from your billing settings. If your traffic or your AI use grows, move up. If it drops, move down.',
      },
      {
        q: 'Which currency will I be billed in?',
        a: 'We set prices in nine currencies: INR, USD, EUR, GBP, CAD, JPY, AUD, SGD and AED. Your billing currency is fixed when you sign up. Taxes such as GST or VAT are added at checkout. Payments go through Razorpay in India and Stripe elsewhere.',
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
        q: 'How do payments and currencies work across markets?',
        a: "Currency is auto-detected and each order routes to the gateway that serves that market. Stripe covers cards, wallets and multi-currency checkout; Razorpay covers markets that run on local rails — UPI, regional tax handling and cash on delivery. You don't have to wire either of them up yourself.",
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
