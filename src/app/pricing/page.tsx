import { pageMetadata } from "@/lib/seo";
import Pricing from "@/sections/Pricing";
import Plugins from "@/sections/Plugins";
import FAQ from "@/sections/FAQ";
import CTA from "@/sections/CTA";

export const metadata = pageMetadata({
  title: "Pricing — free to start, one subscription",
  description:
    "Free to start, no card. One subscription replaces a dozen tools, billed in your currency via Razorpay (India) or Stripe. Every plugin has a free tier.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="pt-16">
      <Pricing />
      <Plugins />
      <FAQ />
      <CTA />
    </div>
  );
}
