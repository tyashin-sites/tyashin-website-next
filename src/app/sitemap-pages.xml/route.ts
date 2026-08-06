import { getSiteRoutes } from "@/lib/site-routes";
import { SITE_URL } from "@/lib/seo";

/**
 * /sitemap-pages.xml — the SITE'S OWN page sitemap.
 *
 * The Tyashin platform intercepts `/sitemap.xml` and serves it as a
 * sitemap-INDEX that references THIS file. This route is NOT in the platform
 * registry, so it dispatches straight to the site Worker. It lists every
 * indexable page the site serves, sourced from `getSiteRoutes()`.
 *
 * ORIGIN = `SITE_URL` — the SAME constant `layout.tsx` (metadataBase →
 * `<link rel=canonical>` / og:url) uses. The sitemap MUST list the exact
 * canonical URL of each page, so it shares ONE origin source with the
 * canonicals; deriving it independently (e.g. from the request Host) risks a
 * sitemap-vs-canonical host mismatch that makes search engines drop the URLs.
 * tyashin.com answers on both apex and www — the canonicals commit to the
 * apex, and so does this. Build-time constant → the route is static.
 */
export const dynamic = "force-static";

// Normalise to a bare origin (no trailing slash) so `${ORIGIN}${path}` is clean.
const ORIGIN = SITE_URL.replace(/\/+$/, "");

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const lastmod = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (build date)

  const urls = getSiteRoutes()
    .map((route) => {
      const loc = escapeXml(`${ORIGIN}${route.path}`);
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changeFrequency}</changefreq>`,
        `    <priority>${route.priority.toFixed(1)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
