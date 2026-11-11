/**
 * Pricing client for the one-plan model (payload version 2).
 *
 * One subscription per business, sized by traffic. Every feature is on every
 * plan. AI work is paid in credits. The numbers come from Tyashin's pricing
 * getter (`GET /api/v1/billing/all-pricing`), already in the visitor's
 * currency.
 *
 * The checked-in fallback (src/data/pricing-fallback.json) is used whenever
 * the fetch fails, times out, or returns anything that is not a valid
 * `version: 2` payload, so the page is never empty and never shows the old
 * per-plugin shape. It holds all nine currencies.
 *
 * This module is safe to import on the server and in the browser.
 */

import fallback from '@/data/pricing-fallback.json';

export const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'CAD', 'JPY', 'AUD', 'SGD', 'AED'] as const;
export type Currency = (typeof CURRENCIES)[number];
export type PlanId = 'free' | 'starter' | 'pro' | 'business';

export interface PlanV2 {
  plan: PlanId;
  name: string;
  /** Major units of `currency`. */
  price: number;
  priceMinor: number;
  visitsPerMonth: number;
  creditsPerMonth: number;
  sites: number;
  seats: number;
  typicalMonth: Array<{ op: string; label: string; count: number }>;
  featureLines: string[];
}

export interface AllPricingV2 {
  version: 2;
  currency: Currency;
  plans: PlanV2[];
  /** `maxUnits` is not shown on the site; the fallback carries 0. */
  topup: {
    credits: number;
    price: number;
    priceMinor: number;
    maxUnits: number;
    validityMonths: number;
  };
  included: string[];
  creditExamples: Array<{ op: string; label: string; credits: number }>;
  enterprise: { contactUrl: string };
}

export interface PricingResult {
  data: AllPricingV2;
  /** true when `data` came from the API, false when it is the fallback. */
  live: boolean;
}

export function isCurrency(v: unknown): v is Currency {
  return typeof v === 'string' && (CURRENCIES as readonly string[]).includes(v);
}

/* ── Currency for a country (used for the fallback and the API override).
   Keep in step with the platform's own country → currency mapping. ── */

const EUROZONE = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT',
  'NL', 'PT', 'SK', 'SI', 'ES', 'AD', 'MC', 'SM', 'VA', 'ME', 'XK',
]);
const COUNTRY_CURRENCY: Record<string, Currency> = {
  IN: 'INR',
  US: 'USD',
  GB: 'GBP',
  CA: 'CAD',
  JP: 'JPY',
  AU: 'AUD',
  SG: 'SGD',
  AE: 'AED',
};

/** ISO country code → one of the nine billing currencies. USD when unknown. */
export function currencyForCountry(country: string | null | undefined): Currency {
  const cc = (country ?? '').toUpperCase();
  if (EUROZONE.has(cc)) return 'EUR';
  return COUNTRY_CURRENCY[cc] ?? 'USD';
}

/* ── Money ── */

const SYMBOL: Record<Currency, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  JPY: '¥',
  AUD: 'A$',
  SGD: 'S$',
  AED: 'AED ',
};

/** 12345 → "12,345". Hand-rolled so server and browser always agree. */
export function formatNumber(n: number): string {
  const [int, frac] = String(n).split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return frac ? `${grouped}.${frac}` : grouped;
}

/** Whole amounts print without decimals; 9.5 prints as 9.50. JPY never has decimals. */
export function formatMoney(amount: number, currency: Currency): string {
  const whole = currency === 'JPY' || Number.isInteger(amount);
  const [int, frac] = (whole ? String(Math.round(amount)) : amount.toFixed(2)).split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${SYMBOL[currency]}${frac ? `${grouped}.${frac}` : grouped}`;
}

/* ── Fallback ── */

type FallbackPrices = Record<Currency, { starter: number; pro: number; business: number; topup: number }>;

const toMinor = (amount: number, currency: Currency): number =>
  currency === 'JPY' ? Math.round(amount) : Math.round(amount * 100);

/** The checked-in pricing, in `currency`. Same shape the API returns. */
export function fallbackPricing(currency: Currency = 'USD'): AllPricingV2 {
  const prices = (fallback.prices as FallbackPrices)[currency];
  const priceOf = (plan: PlanId): number => (plan === 'free' ? 0 : prices[plan]);
  return {
    version: 2,
    currency,
    plans: fallback.plans.map((p) => {
      const plan = p.plan as PlanId;
      return { ...p, plan, price: priceOf(plan), priceMinor: toMinor(priceOf(plan), currency) };
    }),
    topup: { ...fallback.topup, price: prices.topup, priceMinor: toMinor(prices.topup, currency) },
    included: fallback.included,
    creditExamples: fallback.creditExamples,
    enterprise: fallback.enterprise,
  };
}

/* ── Validation ── */

const num = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0;
const str = (v: unknown): v is string => typeof v === 'string' && v.length > 0;
const obj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

/**
 * True only for a complete version-2 payload. The old (per-plugin) shape, a
 * partial payload, or an unknown currency all fail, and the caller falls back.
 */
export function isAllPricingV2(v: unknown): v is AllPricingV2 {
  if (!obj(v) || v.version !== 2 || !isCurrency(v.currency)) return false;
  if (!Array.isArray(v.plans) || v.plans.length === 0) return false;
  for (const p of v.plans as unknown[]) {
    if (!obj(p) || !str(p.plan) || !str(p.name)) return false;
    if (![p.price, p.visitsPerMonth, p.creditsPerMonth, p.sites, p.seats].every(num)) return false;
    if (!Array.isArray(p.typicalMonth) || !Array.isArray(p.featureLines)) return false;
    if (!p.typicalMonth.every((t) => obj(t) && str(t.label) && num(t.count))) return false;
    if (!p.featureLines.every((l) => typeof l === 'string')) return false;
  }
  const t = v.topup;
  if (!obj(t) || !num(t.credits) || t.credits === 0 || !num(t.price) || !num(t.validityMonths)) {
    return false;
  }
  if (!Array.isArray(v.included) || !v.included.every(str)) return false;
  if (
    !Array.isArray(v.creditExamples) ||
    !v.creditExamples.every((c) => obj(c) && str(c.op) && str(c.label) && num(c.credits))
  ) {
    return false;
  }
  return obj(v.enterprise) && typeof v.enterprise.contactUrl === 'string';
}

/* ── Fetch ── */

const API_ORIGIN: string = (process.env.NEXT_PUBLIC_TYASHIN_API_URL ?? 'https://website-api.tyashin.com')
  .trim()
  .replace(/\/+$/, '')
  .replace(/\/api\/v1$/i, '');

export const ALL_PRICING_URL = `${API_ORIGIN}/api/v1/billing/all-pricing`;

export interface FetchPricingOptions {
  /** Visitor's ISO country code, when the caller knows it (server side). */
  country?: string | null;
  timeoutMs?: number;
  /** Extra fetch options, e.g. Next's `{ next: { revalidate } }` on the server. */
  init?: RequestInit;
}

/**
 * Fetch pricing. With a `country`, asks the API for that country's currency
 * through its `?currency=` override: the request comes from our server, so the
 * API cannot geo-detect the visitor itself, and it ignores a `country`
 * parameter (checked 2026-11-11). Only the currency goes in the URL, which
 * keeps the server-side fetch cache to nine entries. Without a `country`, the
 * API geo-detects the caller, as it always has.
 * Never throws: any failure returns the fallback in the best-known currency.
 */
export async function fetchAllPricing(opts: FetchPricingOptions = {}): Promise<PricingResult> {
  const country = opts.country ? opts.country.toUpperCase() : null;
  const currency = currencyForCountry(country);
  try {
    const url = new URL(ALL_PRICING_URL);
    if (country) url.searchParams.set('currency', currency);
    const res = await fetch(url.toString(), {
      ...opts.init,
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(opts.timeoutMs ?? 8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json: unknown = await res.json();
    const data = obj(json) && obj(json.data) ? json.data : json;
    if (!isAllPricingV2(data)) throw new Error('not a version 2 pricing payload');
    return { data, live: true };
  } catch {
    return { data: fallbackPricing(currency), live: false };
  }
}

/* ── Estimator maths (shared by the UI and the FAQ copy) ── */

export interface Estimate {
  credits: number;
  /** The smallest plan whose monthly credits cover the need (the largest plan if none does). */
  plan: PlanV2;
  /** Top-ups needed on top of `plan`; 0 when the plan covers it. */
  topups: number;
}

export function estimatePlan(data: AllPricingV2, credits: number): Estimate {
  const plans = [...data.plans].sort((a, b) => a.creditsPerMonth - b.creditsPerMonth);
  const covering = plans.find((p) => p.creditsPerMonth >= credits);
  if (covering) return { credits, plan: covering, topups: 0 };
  const top = plans[plans.length - 1];
  return {
    credits,
    plan: top,
    topups: Math.ceil((credits - top.creditsPerMonth) / data.topup.credits),
  };
}
