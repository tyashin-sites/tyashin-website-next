import { NextRequest, NextResponse } from 'next/server';
import { tyashinApiKey, tyashinApiUrl } from '@/lib/tyashin';

/**
 * Newsletter subscribe proxy.
 *
 * Runs server-side so TYASHIN_API_KEY never reaches the browser. Mirrors the
 * contact route's shape (honeypot, validation, upstream passthrough).
 */

type Body = {
  email?: string;
  website?: string; // honeypot
  source?: string;
};

export async function POST(req: NextRequest) {
  const apiKey = tyashinApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: { code: 'CONFIG', message: 'Newsletter is not configured.' } },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'BAD_JSON', message: 'Invalid request.' } },
      { status: 400 }
    );
  }

  // Honeypot — bots fill hidden fields; accept silently so they don't retry.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ success: true, data: { discarded: true } });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  // Deliberately permissive: the backend does the authoritative validation.
  // This only rejects what is obviously not an address.
  if (!email || email.length > 254 || !/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INVALID_EMAIL', message: 'Please enter a valid email address.' },
      },
      { status: 400 }
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(tyashinApiUrl('/newsletter/public/subscribe'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify({
        email,
        source: (body.source || 'marketing-site-footer').slice(0, 80),
        tags: ['marketing-site'],
        metadata: {
          referer: req.headers.get('referer') || undefined,
          country: req.headers.get('cf-ipcountry') || undefined,
        },
      }),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'UPSTREAM', message: "Couldn't reach our servers. Please try again." },
      },
      { status: 502 }
    );
  }

  const data = await upstream.json().catch(() => ({}));
  return NextResponse.json(data, { status: upstream.status });
}
