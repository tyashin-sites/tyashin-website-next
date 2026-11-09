import { pageMetadata } from "@/lib/seo";
import Pricing from "@/sections/Pricing";
import Plugins from "@/sections/Plugins";
import FAQ from "@/sections/FAQ";
import CTA from "@/sections/CTA";

export const metadata = pageMetadata({
  title: "Pricing — free to start, one subscription",
  description:
    "Free to start, no card, and your first website build is free. Paid plans add AI credits every month, billed in your currency via Razorpay (India) or Stripe.",
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
