/**
 * SINGLE SOURCE OF TRUTH for this site's indexable URL tree.
 *
 * Why this file exists: the Tyashin platform serves `/sitemap.xml` as a
 * sitemap-INDEX and has NO knowledge of this site's Next.js `app/` route tree,
 * so on its own it can only ever list a handful of URLs. This module enumerates
 * EVERY indexable page the site actually serves. `/sitemap-pages.xml` renders
 * this list as XML; the platform's sitemap-index then references that file.
 *
 * This marketing site is entirely STATIC (no dynamic `[slug]` routes), so there
 * is no `generateStaticParams` to derive from here — the list below is the
 * hand-kept mirror of `src/app/**\/page.tsx`. A `page.tsx` that renders an
 * indexable page and is missing here is the exact bug this file fixes; add it.
 *
 * EXCLUDED on purpose (do not add):
 *  - utility / non-page routes (`robots.txt`, `sitemap-*.xml`, `/api/*`).
 *  - blog POST URLs — this site has no blog; blog posts (if any) are
 *    platform-owned content and live in the platform's `/sitemap-content.xml`.
 *
 * Do NOT create `app/sitemap.ts` (path `/sitemap.xml`) — the platform owns that
 * path and index-references this one.
 */

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SiteRoute {
  /** Root-relative path, always starting with `/`, no trailing slash (except `/`). */
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}

/**
 * Every STATIC indexable page in `src/app/**\/page.tsx`.
 * Keep in lockstep with the app tree.
 */
const STATIC_ROUTES: SiteRoute[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/platform", priority: 0.9, changeFrequency: "weekly" },
  { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
  { path: "/use-cases", priority: 0.85, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.85, changeFrequency: "monthly" },
  { path: "/compare", priority: 0.8, changeFrequency: "monthly" },
  { path: "/linkedin", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

/**
 * The complete, ordered list of indexable site paths — THE list the page
 * sitemap emits.
 */
export function getSiteRoutes(): SiteRoute[] {
  return [...STATIC_ROUTES];
}
