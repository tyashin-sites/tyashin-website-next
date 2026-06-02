# Tyashin Website — Tyashin-managed Next.js site

The marketing site for the Tyashin platform, **running on Tyashin itself** (project
`6a1f6599fbdac6aa63405d89`, slug `shikha-website-mpx9i9ph`). Next.js 15 (App Router) on
Cloudflare Workers via OpenNext.

## Highlights

- Animation-rich, dark, edge-rendered marketing site (framer-motion + Lenis + a canvas
  constellation hero + custom magnetic cursor).
- **Pricing is live, not hardcoded** — fetched from the platform's single pricing getter at
  `GET /api/v1/billing/all-pricing`, localised to the visitor's currency (geo → USD fallback),
  with a bundled snapshot so the page never breaks.
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
