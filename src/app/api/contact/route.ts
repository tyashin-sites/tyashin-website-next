import { NextRequest, NextResponse } from 'next/server';

const TYASHIN_API_URL = process.env.TYASHIN_API_URL ?? 'https://website-api.tyashin.com';

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  topic?: string;
  message?: string;
  website?: string; // honeypot
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.TYASHIN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: { code: 'CONFIG', message: 'Contact form is not configured.' } },
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

  // Honeypot — bots fill hidden fields; silently accept so they don't retry.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ success: true, data: { id: 'discarded' } });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();
  if (!name || name.length > 100 || !email || !message || message.length > 5000) {
    return NextResponse.json(
      { success: false, error: { code: 'INVALID', message: 'Please fill in name, email, and a message.' } },
      { status: 400 }
    );
  }

  const topic = (body.topic ?? 'Other').slice(0, 80);
  const company = (body.company ?? '').trim().slice(0, 120);

  const payload = {
    name,
    email,
    phone: body.phone?.trim().slice(0, 20) || undefined,
    subject: `[${topic}] Marketing site contact`,
    message,
    source: 'marketing-site-contact',
    metadata: {
      topic,
      company: company || undefined,
      page: '/contact',
      referer: req.headers.get('referer') || undefined,
      country: req.headers.get('cf-ipcountry') || undefined,
    },
  };

  let upstream: Response;
  try {
    upstream = await fetch(`${TYASHIN_API_URL}/contact/public/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify(payload),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'UPSTREAM', message: "Couldn't reach our servers. Please try WhatsApp." } },
      { status: 502 }
    );
  }

  const data = await upstream.json().catch(() => ({}));
  return NextResponse.json(data, { status: upstream.status });
}
