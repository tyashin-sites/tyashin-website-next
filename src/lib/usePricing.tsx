'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchAllPricing, FALLBACK, type AllPricing } from './pricing';

interface PricingState {
  data: AllPricing;
  live: boolean;
  loading: boolean;
}

const PricingContext = createContext<PricingState | null>(null);

/**
 * Fetches pricing ONCE, localised to the visitor's currency. Currency is
 * resolved entirely server-side from the Cloudflare geo header (visitor's
 * country → currency, USD fallback) by the platform's getAllPricing business
 * logic — there is intentionally no client-side currency override.
 */
export function PricingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AllPricing>(FALLBACK);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchAllPricing().then((res) => {
      if (cancelled) return;
      setData(res.data);
      setLive(res.live);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PricingContext.Provider value={{ data, live, loading }}>{children}</PricingContext.Provider>
  );
}

export function usePricing(): PricingState {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error('usePricing must be used within PricingProvider');
  return ctx;
}
