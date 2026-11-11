# Tyashin Website — Tyashin-managed Next.js site

The marketing site for the Tyashin platform, **running on Tyashin itself** (project
`6a1f6599fbdac6aa63405d89`, slug `shikha-website-mpx9i9ph`). Next.js 15 (App Router) on
Cloudflare Workers via OpenNext.

## Highlights

- Animation-rich, dark, edge-rendered marketing site (framer-motion + Lenis + a canvas
  constellation hero + custom magnetic cursor).
- **Pricing comes from the platform** — one plan per business, sized by traffic, every feature
  included, AI work paid in credits. Fetched server-side from the platform's pricing getter
  (`GET /api/v1/billing/all-pricing`, payload `version: 2`) in the visitor's currency
  (Cloudflare country → currency, USD when unknown). `src/data/pricing-fallback.json` holds the
  same numbers for all nine currencies and is used whenever the API fails or answers with
  anything other than version 2. `npm run check:promises` (prebuild) compares the two;
  `npm run pricing:snapshot` regenerates the fallback from the live API.
- Pages: `/` (single-scroll overview), `/platform`, `/solutions`, `/pricing`.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Deploy

Pushing to `main` triggers the canonical Tyashin GitHub Actions workflow (installed via
`POST /api/v1/projects/:id/github/adopt`), which builds with OpenNext and deploys the Worker
into the `tyashin-sites` dispatch namespace as `site-shikha-website-mpx9i9ph`.

Local one-off deploy:

```bash
npm run build && npx @opennextjs/cloudflare deploy
```
