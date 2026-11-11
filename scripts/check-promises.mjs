#!/usr/bin/env node
/**
 * Promise parity check (prebuild). CEO rule 2026-11-09: tyashin.com must not
 * promise anything the Tyashin platform does not do.
 *
 * The platform publishes GET /api/v1/billing/all-pricing. In the one-plan
 * model (payload `version: 2`) it carries, per currency: the plans (price,
 * visits, credits, sites, seats, typical month), the top-up, the included
 * list and the credit cost of each AI action.
 *
 * This script fails the build when
 *   1. the API serves version 2 and src/data/pricing-fallback.json (the
 *      offline fallback, which also feeds the FAQ copy) differs from it in
 *      any of the nine currencies → run `npm run pricing:snapshot` and commit,
 *   2. any file under src/ matches a platform `copyRule` → fix the copy.
 *
 * It warns and passes when
 *   - the API cannot be reached (an outage never blocks a site deploy), or
 *   - the API still serves the old per-plugin shape (no `version: 2`): the
 *     fallback then IS what the site shows, and there is nothing to compare.
 * Copy rules are checked whenever the platform publishes them, in either shape.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const API = (process.env.NEXT_PUBLIC_TYASHIN_API_URL ?? 'https://website-api.tyashin.com')
  .replace(/\/+$/, '')
  .replace(/\/api\/v1$/i, '');
const ROOT = new URL('..', import.meta.url).pathname;
const FALLBACK_PATH = 'src/data/pricing-fallback.json';

async function live(currency) {
  const res = await fetch(`${API}/api/v1/billing/all-pricing?currency=${currency}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json?.data ?? json;
}

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* files(p);
    else if (/\.(tsx?|mdx?|json)$/.test(name) && !p.endsWith('pricing-fallback.json')) yield p;
  }
}

const fallback = JSON.parse(readFileSync(join(ROOT, FALLBACK_PATH), 'utf8'));
const problems = [];

let usd;
try {
  usd = await live('USD');
} catch (err) {
  console.warn(`⚠ promise check skipped: pricing API unreachable (${err.message})`);
  process.exit(0);
}

/* 1. Plans, top-up, included list and credit costs, in every currency. */
const structure = (plans) =>
  JSON.stringify(
    plans.map((p) => ({
      plan: p.plan,
      visitsPerMonth: p.visitsPerMonth,
      creditsPerMonth: p.creditsPerMonth,
      sites: p.sites,
      seats: p.seats,
      typicalMonth: (p.typicalMonth ?? []).map((t) => [t.op, t.count]),
    }))
  );
const costs = (examples) => JSON.stringify(examples.map((c) => [c.op, c.credits]));

let parity = 'skipped';
if (usd?.version !== 2) {
  console.warn(
    '⚠ plan parity skipped: the pricing API still serves the old shape (no version 2). ' +
      `The site shows ${FALLBACK_PATH}.`
  );
} else {
  parity = 'checked';
  const fix = 'Run `npm run pricing:snapshot` and commit.';
  if (structure(usd.plans) !== structure(fallback.plans)) {
    problems.push(`${FALLBACK_PATH}: plans (visits, credits, sites, seats, typical month) differ from the platform. ${fix}`);
  }
  if (costs(usd.creditExamples) !== costs(fallback.creditExamples)) {
    problems.push(`${FALLBACK_PATH}: credit costs differ from the platform. ${fix}`);
  }
  if (JSON.stringify(usd.included) !== JSON.stringify(fallback.included)) {
    problems.push(`${FALLBACK_PATH}: the included list differs from the platform. ${fix}`);
  }
  if (
    usd.topup.credits !== fallback.topup.credits ||
    usd.topup.validityMonths !== fallback.topup.validityMonths
  ) {
    problems.push(`${FALLBACK_PATH}: the top-up (credits, validity) differs from the platform. ${fix}`);
  }
  for (const currency of Object.keys(fallback.prices)) {
    let data;
    try {
      data = currency === 'USD' ? usd : await live(currency);
    } catch (err) {
      console.warn(`⚠ ${currency} prices not checked: ${err.message}`);
      continue;
    }
    if (data?.version !== 2 || data.currency !== currency) {
      problems.push(`${currency}: the platform did not return version 2 pricing in ${currency}.`);
      continue;
    }
    const want = fallback.prices[currency];
    const got = { topup: data.topup.price };
    for (const p of data.plans) if (p.plan !== 'free') got[p.plan] = p.price;
    for (const key of new Set([...Object.keys(want), ...Object.keys(got)])) {
      if (want[key] !== got[key]) {
        problems.push(`${FALLBACK_PATH}: ${currency} ${key} is ${want[key]}, the platform says ${got[key]}. ${fix}`);
      }
    }
  }
}

/* 2. Copy the platform cannot back. */
const rules = Array.isArray(usd?.copyRules) ? usd.copyRules : null;
if (!rules) {
  console.warn('⚠ copy rules skipped: this platform version publishes no copyRules');
} else {
  for (const file of files(join(ROOT, 'src'))) {
    const text = readFileSync(file, 'utf8');
    for (const rule of rules) {
      const m = new RegExp(rule.pattern, rule.flags).exec(text);
      if (m) problems.push(`${relative(ROOT, file)}: "${m[0]}" — ${rule.message}`);
    }
  }
}

if (problems.length) {
  console.error('✗ tyashin.com promises something the platform does not do:');
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(
  `✓ promise check: plan parity ${parity}; ${rules ? `${rules.length} copy rules clean` : 'no copy rules published'}`
);
