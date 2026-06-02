import type { Metadata } from "next";
import Pricing from "@/sections/Pricing";
import Plugins from "@/sections/Plugins";
import FAQ from "@/sections/FAQ";
import CTA from "@/sections/CTA";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One subscription replaces a dozen tools. Free to start, shown in your local currency, billed via Razorpay (India) or Stripe (global). Plugins billed separately with a free tier on each.",
};

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
