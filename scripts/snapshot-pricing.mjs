#!/usr/bin/env node
/**
 * Writes src/data/pricing-fallback.json from the live pricing API, for all
 * nine currencies. Refuses to write unless the API serves `version: 2`, so it
 * can never overwrite the fallback with the old per-plugin shape.
 */
import { writeFileSync } from 'node:fs';

const API = (process.env.NEXT_PUBLIC_TYASHIN_API_URL ?? 'https://website-api.tyashin.com')
  .replace(/\/+$/, '')
  .replace(/\/api\/v1$/i, '');
const CURRENCIES = ['USD', 'INR', 'EUR', 'GBP', 'CAD', 'JPY', 'AUD', 'SGD', 'AED'];

async function live(currency) {
  const res = await fetch(`${API}/api/v1/billing/all-pricing?currency=${currency}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`${currency}: HTTP ${res.status}`);
  const json = await res.json();
  const data = json?.data ?? json;
  if (data?.version !== 2 || data.currency !== currency) {
    throw new Error(`${currency}: the API did not return version 2 pricing in ${currency}; fallback left untouched`);
  }
  return data;
}

const usd = await live('USD');
const prices = {};
for (const currency of CURRENCIES) {
  const data = currency === 'USD' ? usd : await live(currency);
  prices[currency] = { topup: data.topup.price };
  for (const p of data.plans) if (p.plan !== 'free') prices[currency][p.plan] = p.price;
}

const fallback = {
  version: 2,
  plans: usd.plans.map(({ price, priceMinor, ...rest }) => rest),
  prices,
  topup: {
    credits: usd.topup.credits,
    maxUnits: usd.topup.maxUnits,
    validityMonths: usd.topup.validityMonths,
  },
  included: usd.included,
  creditExamples: usd.creditExamples,
  enterprise: usd.enterprise,
};
writeFileSync(
  new URL('../src/data/pricing-fallback.json', import.meta.url),
  JSON.stringify(fallback, null, 2) + '\n'
);
console.log(`wrote pricing fallback: ${fallback.plans.length} plans, ${CURRENCIES.length} currencies`);
