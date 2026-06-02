/**
 * Live pricing client. Pulls EVERYTHING (platform plans + plugin pricing) from
 * Tyashin's single pricing getter so this site never hardcodes numbers — prices
 * arrive localised to the visitor's currency (geo-detected server-side, or via
 * an explicit ?currency override), falling back to USD.
 *
 * If the API is unreachable (offline, not yet deployed, blocked), we render a
 * bundled USD snapshot so the page is never empty.
 */

const API_BASE: string =
  process.env.NEXT_PUBLIC_TYASHIN_API_URL ?? 'https://website-api.tyashin.com';

export interface Tier {
  tier: string;
  displayName: string;
  price: number;
  priceFormatted: string;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  recommended?: boolean;
}

export interface PluginPricing {
  id: string;
  name: string;
  description: string;
  category: string;
  pluginType: string;
  icon?: string;
  pricingModel: string; // 'free' | 'included' | 'paid'
  billingManagedBy: string;
  hasPaidTiers: boolean;
  currency: string;
  symbol: string;
  recurringValue: { headline: string; points: string[] } | null;
  tiers: Tier[];
}

export interface AllPricing {
  displayCurrency: string;
  pluginCurrency: string;
  symbol: string;
  gateway: string;
  country: string | null;
  platform: { plans: Tier[] };
  plugins: PluginPricing[];
}

export async function fetchAllPricing(
  currencyOverride?: string
): Promise<{ data: AllPricing; live: boolean }> {
  try {
    const url = new URL(`${API_BASE}/api/v1/billing/all-pricing`);
    if (currencyOverride) url.searchParams.set('currency', currencyOverride);
    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { success: boolean; data: AllPricing };
    if (!json?.data?.platform?.plans?.length) throw new Error('empty payload');
    return { data: json.data, live: true };
  } catch {
    return { data: FALLBACK, live: false };
  }
}

/** Bundled USD snapshot — only used when the live API can't be reached. */
export const FALLBACK: AllPricing = {
  displayCurrency: 'USD',
  pluginCurrency: 'USD',
  symbol: '$',
  gateway: 'stripe',
  country: null,
  platform: {
    plans: [
      {
        tier: 'free',
        displayName: 'Free',
        price: 0,
        priceFormatted: 'Free',
        currency: 'USD',
        interval: 'month',
        features: [
          'Get online and get found.',
          '1 team member',
          '10K API requests/mo',
          '100 MB storage',
          '1 AI generation/mo',
        ],
      },
      {
        tier: 'starter',
        displayName: 'Starter',
        price: 19,
        priceFormatted: '$19',
        currency: 'USD',
        interval: 'month',
        features: [
          'For a growing solo store.',
          '1 team member',
          '10K API requests/mo',
          '1 GB storage',
          '5 AI generations/mo',
          'Custom domain',
        ],
      },
      {
        tier: 'pro',
        displayName: 'Pro',
        price: 49,
        priceFormatted: '$49',
        currency: 'USD',
        interval: 'month',
        recommended: true,
        features: [
          'Switch growth to autopilot.',
          '3 team members',
          '100K API requests/mo',
          '5 GB storage',
          '10 AI generations/mo',
          'CRM & E-commerce plugins',
        ],
      },
      {
        tier: 'business',
        displayName: 'Business',
        price: 99,
        priceFormatted: '$99',
        currency: 'USD',
        interval: 'month',
        features: [
          'Scale with the whole stack.',
          '5 team members',
          '500K API requests/mo',
          '25 GB storage',
          '25 AI generations/mo',
          'All plugins',
          'Priority support',
        ],
      },
    ],
  },
  plugins: [
    {
      id: 'chatbot',
      name: 'AI Chatbot',
      description:
        'AI customer support with RAG knowledge base, product catalog awareness, live data queries, and conversation analytics.',
      category: 'support',
      pluginType: 'aapastech-service',
      pricingModel: 'paid',
      billingManagedBy: 'tyashin',
      hasPaidTiers: true,
      currency: 'USD',
      symbol: '$',
      recurringValue: null,
      tiers: [
        {
          tier: 'free',
          displayName: 'Free',
          price: 0,
          priceFormatted: 'Free',
          currency: 'USD',
          interval: 'month',
          features: ['100 conversations/mo', 'FAQ auto-responses'],
        },
        {
          tier: 'starter',
          displayName: 'Starter',
          price: 9,
          priceFormatted: '$9',
          currency: 'USD',
          interval: 'month',
          features: ['1,000 conversations/mo', 'Full RAG knowledge base'],
        },
        {
          tier: 'pro',
          displayName: 'Pro',
          price: 29,
          priceFormatted: '$29',
          currency: 'USD',
          interval: 'month',
          recommended: true,
          features: ['10,000 conversations/mo', 'Live order & stock queries', 'Custom personality'],
        },
        {
          tier: 'business',
          displayName: 'Business',
          price: 99,
          priceFormatted: '$99',
          currency: 'USD',
          interval: 'month',
          features: ['50,000 conversations/mo', 'Human handoff', 'Multi-language'],
        },
      ],
    },
    {
      id: 'seo-copilot',
      name: 'SEO Co-Pilot',
      description:
        'Get discoverable on Google and ChatGPT — auto schema, meta fixes, daily audits, and ranking monitoring.',
      category: 'marketing',
      pluginType: 'aapastech-service',
      pricingModel: 'paid',
      billingManagedBy: 'tyashin',
      hasPaidTiers: true,
      currency: 'USD',
      symbol: '$',
      recurringValue: null,
      tiers: [
        {
          tier: 'free',
          displayName: 'Free',
          price: 0,
          priceFormatted: 'Free',
          currency: 'USD',
          interval: 'month',
          features: ['Technical SEO foundations', 'Schema.org injection'],
        },
        {
          tier: 'pro',
          displayName: 'Pro',
          price: 29,
          priceFormatted: '$29',
          currency: 'USD',
          interval: 'month',
          recommended: true,
          features: ['AI FAQ schema', 'Ranking tracking', 'SEO Autopilot'],
        },
      ],
    },
    {
      id: 'blog',
      name: 'Blog / CMS',
      description:
        'Full blog with categories, tags, SEO — plus AI autonomous writing that publishes indexable posts every week.',
      category: 'content',
      pluginType: 'builtin',
      pricingModel: 'included',
      billingManagedBy: 'tyashin',
      hasPaidTiers: true,
      currency: 'USD',
      symbol: '$',
      recurringValue: null,
      tiers: [
        {
          tier: 'free',
          displayName: 'Free',
          price: 0,
          priceFormatted: 'Free',
          currency: 'USD',
          interval: 'month',
          features: ['Full blog CMS', '2 AI draft posts/mo'],
        },
        {
          tier: 'pro',
          displayName: 'Pro',
          price: 49,
          priceFormatted: '$49',
          currency: 'USD',
          interval: 'month',
          recommended: true,
          features: ['20 AI posts/mo', 'Product-aware topics', 'IndexNow'],
        },
      ],
    },
    {
      id: 'analytics',
      name: 'YourOwnMetrics',
      description:
        'Privacy-first, cookieless analytics. Page views, sessions, and custom events — no third-party cookies.',
      category: 'analytics',
      pluginType: 'aapastech-service',
      pricingModel: 'included',
      billingManagedBy: 'tyashin',
      hasPaidTiers: true,
      currency: 'USD',
      symbol: '$',
      recurringValue: null,
      tiers: [
        {
          tier: 'included',
          displayName: 'Included',
          price: 0,
          priceFormatted: 'Free',
          currency: 'USD',
          interval: 'month',
          features: ['50,000 page views/mo', '30-day retention'],
        },
        {
          tier: 'pro',
          displayName: 'Pro',
          price: 19,
          priceFormatted: '$19',
          currency: 'USD',
          interval: 'month',
          recommended: true,
          features: ['500,000 page views/mo', 'Custom events + funnels'],
        },
      ],
    },
  ],
};
