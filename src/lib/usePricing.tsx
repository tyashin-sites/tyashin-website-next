'use client';

import { useEffect, useState } from 'react';
import { fetchAllPricing, type PricingResult } from './pricing';
import type { InitialPricing } from './pricing-server';

/**
 * Pricing for the page. It starts from what the server already rendered
 * (fetched server-side in the visitor's currency), so there is no loading
 * state and no currency flash.
 *
 * Only when the server could not tell the visitor's country does the browser
 * ask the pricing API once: called from the browser, the API geo-detects the
 * visitor itself. A fallback answer never replaces what is on screen.
 */
export function usePricing(initial: InitialPricing): PricingResult {
  const [state, setState] = useState<PricingResult>({ data: initial.data, live: initial.live });

  useEffect(() => {
    if (initial.geoResolved) return;
    let cancelled = false;
    fetchAllPricing().then((res) => {
      if (!cancelled && res.live) setState(res);
    });
    return () => {
      cancelled = true;
    };
  }, [initial.geoResolved]);

  return state;
}
