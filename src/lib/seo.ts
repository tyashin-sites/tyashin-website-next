import type { Metadata } from "next";

const SITE_NAME = "Tyashin";

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
