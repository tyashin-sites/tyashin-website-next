import { NextRequest, NextResponse } from 'next/server';

const WHATSAPP_IN = '919667747082';
const WHATSAPP_CA = '14378000190';

export async function GET(req: NextRequest) {
  const country = req.headers.get('cf-ipcountry');
  const isIndia = country === 'IN';
  return NextResponse.json(
    isIndia
      ? { country, region: 'India', number: WHATSAPP_IN, display: '+91 96677 47082' }
      : { country: country ?? null, region: 'Canada', number: WHATSAPP_CA, display: '+1 437 800 0190' },
    {
      headers: {
        'Cache-Control': 'private, max-age=300',
      },
    }
  );
}
