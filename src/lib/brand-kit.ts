/**
 * The Tyashin brand kit for this site, read at runtime (server only).
 *
 * Brand kit FIRST, the site's own design as fallback (platform rule
 * 2026-11-08, tyashin-platform CLAUDE.md §15h): a logo uploaded in the
 * Tyashin admin reaches the header and footer within 5 minutes, with no
 * rebuild. Never throws — a slow or failing API shows the built-in wordmark.
 */
import { cache } from 'react';
import { tyashinApiUrl } from './tyashin';

/** This site's Tyashin project ("Tyashin Website"). */
const TYASHIN_PROJECT_ID = process.env.TYASHIN_PROJECT_ID || '6a1f6599fbdac6aa63405d89';

export interface BrandLogos {
  light?: string;
  dark?: string;
}

const httpsUrl = (v: unknown): string | undefined =>
  typeof v === 'string' && /^https:\/\/[^\s"'<>]+$/i.test(v.trim()) ? v.trim() : undefined;

export const getBrandLogos = cache(async (): Promise<BrandLogos> => {
  try {
    const res = await fetch(
      tyashinApiUrl(`/public/brand-kit.json?projectId=${encodeURIComponent(TYASHIN_PROJECT_ID)}`),
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(10_000) }
    );
    if (!res.ok) return {};
    const data = (await res.json()) as { logo?: Record<string, unknown> };
    return { light: httpsUrl(data.logo?.light), dark: httpsUrl(data.logo?.dark) };
  } catch {
    return {};
  }
});
