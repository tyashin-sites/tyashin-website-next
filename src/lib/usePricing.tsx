'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchAllPricing, FALLBACK, type AllPricing } from './pricing';

interface PricingState {
  data: AllPricing;
  live: boolean;
  loading: boolean;
  /** Force a currency (null = let the server geo-detect). */
  setCurrency: (code: string | null) => void;
  currencyOverride: string | null;
}

const PricingContext = createContext<PricingState | null>(null);

export function PricingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AllPricing>(FALLBACK);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currencyOverride, setCurrencyOverride] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAllPricing(currencyOverride ?? undefined).then((res) => {
      if (cancelled) return;
      setData(res.data);
      setLive(res.live);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [currencyOverride]);

  return (
    <PricingContext.Provider
      value={{
        data,
        live,
        loading,
        currencyOverride,
        setCurrency: setCurrencyOverride,
      }}
    >
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing(): PricingState {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error('usePricing must be used within PricingProvider');
  return ctx;
}

/** Currencies the visitor can manually switch between (platform supports all). */
export const SELECTABLE_CURRENCIES = [
  'USD',
  'INR',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'SGD',
  'AED',
  'JPY',
] as const;