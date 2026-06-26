'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_TEXT = encodeURIComponent("Hi Tyashin — I'd like to learn more.");

type Route = { region: string; number: string; display: string };

const DEFAULT_ROUTE: Route = {
  region: 'Canada',
  number: '14378000190',
  display: '+1 437 800 0190',
};

export default function WhatsAppPanel() {
  const [route, setRoute] = useState<Route>(DEFAULT_ROUTE);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/whatsapp-route')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Route | null) => {
        if (!cancelled && data?.number) setRoute(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const href = `https://wa.me/${route.number}?text=${WHATSAPP_TEXT}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border-ink-line bg-ink-card/60 group flex items-start gap-4 rounded-3xl border p-6 transition-colors hover:border-white/25"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
        <MessageCircle className="h-5 w-5" />
      </div>
      <div>
        <div className="font-display text-base font-semibold text-white">Chat on WhatsApp</div>
        <div className="mt-1 text-sm text-white/55">
          {route.display} · {route.region} team
        </div>
        <div className="mt-2 text-xs text-white/40">
          Usually replies in minutes during business hours.
        </div>
      </div>
    </a>
  );
}
