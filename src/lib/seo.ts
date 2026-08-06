import type { Metadata } from "next";

const SITE_NAME = "Tyashin";

/**
 * Canonical production origin — the SINGLE source of truth for the site's
 * absolute host. Used by:
 *  - the root layout's `metadataBase` (→ every `<link rel=canonical>` / og:url),
 *  - `/sitemap-pages.xml`, which MUST list the exact canonical URL of each page.
 *
 * tyashin.com answers on both apex and www (both 200, neither redirected); the
 * canonicals commit to the APEX, so the sitemap must too. Keep these in lockstep
 * by reading THIS constant on both sides — deriving the sitemap origin
 * independently (e.g. from the request Host) risks a sitemap-vs-canonical host
 * mismatch that makes search engines drop the URLs.
 */
export const SITE_URL = "https://tyashin.com";

/**
 * Per-page metadata helper.
 *
 * `metadataBase` (https://tyashin.com) is set once in the root layout, so the
 * relative `path` passed here resolves to an absolute canonical and og:url.
 * Without this, inner pages inherited the homepage's Open Graph and had no
 * self-referential canonical — so social shares and search engines treated
 * every route as the homepage.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
