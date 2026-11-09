#!/usr/bin/env node
/** Writes src/data/pricing-snapshot.json from the live pricing API (USD). */
import { writeFileSync } from 'node:fs';
const API = process.env.NEXT_PUBLIC_TYASHIN_API_URL ?? 'https://website-api.tyashin.com';
const res = await fetch(`${API}/api/v1/billing/all-pricing?currency=USD&country=US`);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const { data } = await res.json();
// The snapshot is the offline fallback: geo fields are not meaningful there.
const snapshot = { ...data, country: null };
writeFileSync(
  new URL('../src/data/pricing-snapshot.json', import.meta.url),
  JSON.stringify(snapshot, null, 2) + '\n'
);
console.log(`wrote pricing snapshot: ${data.platform.plans.length} plans, ${data.plugins.length} plugins`);
