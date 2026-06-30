import { pageMetadata } from "@/lib/seo";
import Pricing from "@/sections/Pricing";
import Plugins from "@/sections/Plugins";
import FAQ from "@/sections/FAQ";
import CTA from "@/sections/CTA";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "One subscription replaces a dozen tools. Free to start, shown in your local currency, billed via Razorpay (India) or Stripe (global). Plugins billed separately with a free tier on each.",
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
