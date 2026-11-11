import { getInitialPricing } from '@/lib/pricing-server';
import PricingView from './PricingView';

/**
 * Pricing section. Fetches on the server so the HTML already carries the
 * visitor's currency; the interactive parts live in PricingView.
 */
export default async function Pricing() {
  const initial = await getInitialPricing();
  return <PricingView initial={initial} />;
}
