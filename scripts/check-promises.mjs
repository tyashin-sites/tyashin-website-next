#!/usr/bin/env node
/**
 * Promise parity check (prebuild). CEO rule 2026-11-09: tyashin.com must not
 * promise anything the Tyashin platform does not do.
 *
 * The platform publishes, in GET /api/v1/billing/all-pricing:
 *   - platform.plans  every plan's price and feature lines (derived from its
 *                     live config in lib/billing/plan-facts.ts)
 *   - copyRules       regexes for copy the platform cannot back (a trial that
 *                     billing does not have, "AI generations/mo", a free build
 *                     that is switched off, ...)
 * This script fails the build when
 *   1. src/data/pricing-snapshot.json (the offline fallback) differs from the
 *      live plans  → run `npm run pricing:snapshot` and commit, or
 *   2. any file under src/ matches a copyRule → fix the copy.
 * The rules live on the platform only; nothing here hard-codes a promise.
 * If the API cannot be reached the check warns and passes, so an API outage
 * never blocks a site deploy (the platform's daily promise-parity job still
 * checks the live pages).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const API = process.env.NEXT_PUBLIC_TYASHIN_API_URL ?? 'https://website-api.tyashin.com';
const ROOT = new URL('..', import.meta.url).pathname;

async function live() {
  const res = await fetch(`${API}/api/v1/billing/all-pricing?currency=USD&country=US`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()).data;
}

const planKey = (plans) =>
  JSON.stringify(plans.map((p) => ({ tier: p.tier, price: p.price, features: p.features })));

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* files(p);
    else if (/\.(tsx?|mdx?|json)$/.test(name) && !p.includes('pricing-snapshot.json')) yield p;
  }
}

let data;
try {
  data = await live();
} catch (err) {
  console.warn(`⚠ promise check skipped: pricing API unreachable (${err.message})`);
  process.exit(0);
}
if (!Array.isArray(data.copyRules)) {
  console.warn('⚠ promise check skipped: this platform version publishes no copyRules');
  process.exit(0);
}

const problems = [];
const snapshot = JSON.parse(readFileSync(join(ROOT, 'src/data/pricing-snapshot.json'), 'utf8'));
if (planKey(snapshot.platform.plans) !== planKey(data.platform.plans)) {
  problems.push(
    'src/data/pricing-snapshot.json differs from the live plans. Run `npm run pricing:snapshot` and commit.'
  );
}
for (const file of files(join(ROOT, 'src'))) {
  const text = readFileSync(file, 'utf8');
  for (const rule of data.copyRules) {
    const m = new RegExp(rule.pattern, rule.flags).exec(text);
    if (m) problems.push(`${relative(ROOT, file)}: "${m[0]}" — ${rule.message}`);
  }
}

if (problems.length) {
  console.error('✗ tyashin.com promises something the platform does not do:');
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`✓ promise check: plans match the platform; ${data.copyRules.length} copy rules clean`);
