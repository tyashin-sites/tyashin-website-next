'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { BrandLogos } from '@/lib/brand-kit';

const BrandLogoContext = createContext<BrandLogos>({});

/** Carries the brand-kit logos (fetched once in the server layout) to client components. */
export function BrandLogoProvider({ logos, children }: { logos: BrandLogos; children: ReactNode }) {
  return <BrandLogoContext.Provider value={logos}>{children}</BrandLogoContext.Provider>;
}

export const useBrandLogos = () => useContext(BrandLogoContext);
