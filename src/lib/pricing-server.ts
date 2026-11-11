/**
 * Server-side pricing fetch, so the first paint is already in the visitor's
 * currency (no USD flash while the browser fetches).
 *
 * The visitor's country comes from Cloudflare (the `cf-ipcountry` header, or
 * the request's `cf.country`). It is mapped to a billing currency and the API
 * is asked for that currency, so the API stays the one place that decides the
 * price in each currency. If the country is not
 * known (local dev, a non-Cloudflare host) `geoResolved` is false and the
 * browser asks the API once, which then geo-detects the visitor directly, as
 * the site did before.
 */
import { headers } from 'next/headers';
import { fetchAllPricing, type PricingResult } from './pricing';

export interface InitialPricing extends PricingResult {
  geoResolved: boolean;
}

const validCountry = (v: unknown): string | null => {
  if (typeof v !== 'string') return null;
  const cc = v.trim().toUpperCase();
  // XX = unknown, T1 = Tor: Cloudflare's two non-country values.
  return /^[A-Z]{2}$/.test(cc) && cc !== 'XX' ? cc : null;
};

async function requestCountry(): Promise<string | null> {
  try {
    const h = await headers();
    const fromHeader = validCountry(h.get('cf-ipcountry'));
    if (fromHeader) return fromHeader;
  } catch {
    /* not in a request scope */
  }
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    return validCountry(getCloudflareContext().cf?.country);
  } catch {
    return null;
  }
}

export async function getInitialPricing(): Promise<InitialPricing> {
  const country = await requestCountry();
  const result = await fetchAllPricing({
    country,
    // Short: a slow API must not hold the page. The fallback has every currency.
    timeoutMs: 2500,
    init: { next: { revalidate: 300 } } as RequestInit,
  });
  return { ...result, geoResolved: country !== null };
}
