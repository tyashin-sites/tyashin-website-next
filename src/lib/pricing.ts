/**
 * Live pricing client. Pulls EVERYTHING (platform plans + plugin pricing) from
 * Tyashin's single pricing getter so this site never hardcodes numbers — prices
 * arrive localised to the visitor's currency (geo-detected server-side, or via
 * an explicit ?currency override), falling back to USD.
 *
 * If the API is unreachable (offline, not yet deployed, blocked), we render a
 * bundled USD snapshot so the page is never empty.
 */

import snapshot from '@/data/pricing-snapshot.json';

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
  /** External subscribe/learn-more URL for vendor plugins billed off-platform. */
  link?: string;
}

export interface AllPricing {
  displayCurrency: string;
  pluginCurrency: string;
  symbol: string;
  gateway: string;
  country: string | null;
  platform: { plans: Tier[] };
  plugins: PluginPricing[];
  /** Structured plan promises from the platform (lib/billing/plan-facts.ts). */
  promises?: {
    trialDays: number;
    cardRequiredToStart: boolean;
    freeBuildCredits: number;
    freeBuildRequires: string;
  };
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

/**
 * Bundled USD snapshot, used only when the live API can't be reached. It is
 * GENERATED from the live API (`npm run pricing:snapshot`) and the prebuild
 * promise check fails the build when it drifts from the platform, so the
 * offline page can never promise something the platform does not do.
 */
export const FALLBACK: AllPricing = snapshot as AllPricing;
