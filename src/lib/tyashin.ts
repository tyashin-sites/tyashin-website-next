/**
 * Tyashin API base-URL resolution — one place, so no route can guess wrong.
 *
 * WHY: the platform API lives under `/api/v1`, but `TYASHIN_API_URL` is
 * supplied from two places that disagree about whether it includes that
 * prefix — `wrangler.jsonc` sets the bare origin, while the project's stored
 * `envSecrets` (pushed as a runtime Worker secret at deploy time, which wins)
 * may include it. A route that hardcodes one assumption silently POSTs to a
 * 404 and the form appears to "work" while the lead is lost.
 *
 * `tyashinApiUrl()` accepts either form and always produces exactly one
 * `/api/v1` segment.
 */

const DEFAULT_ORIGIN = 'https://website-api.tyashin.com';

/**
 * Build a full Tyashin API URL for `path` (given WITHOUT the /api/v1 prefix,
 * e.g. '/newsletter/public/subscribe').
 */
export function tyashinApiUrl(path: string): string {
  const raw = (process.env.TYASHIN_API_URL || DEFAULT_ORIGIN).trim().replace(/\/+$/, '');
  // Tolerate a base that already ends in /api/v1 (or /api/v1/).
  const origin = raw.replace(/\/api\/v1$/i, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${origin}/api/v1${suffix}`;
}

/** The server-side API key. Never expose this to the client. */
export function tyashinApiKey(): string | undefined {
  return process.env.TYASHIN_API_KEY;
}
