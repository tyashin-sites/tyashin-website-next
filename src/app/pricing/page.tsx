import { pageMetadata } from "@/lib/seo";
import { FAQ_GROUPS } from "@/lib/faq";
import Pricing from "@/sections/Pricing";
import FAQ from "@/sections/FAQ";
import CTA from "@/sections/CTA";

export const metadata = pageMetadata({
  title: "Pricing: one plan, every feature included",
  description:
    "One subscription per business, sized by your traffic. Every feature is on every plan and AI work is paid in credits. Free to start, no card, and your first site build is free.",
  path: "/pricing",
});

const PRICING_FAQS = FAQ_GROUPS.find((g) => g.title === "Pricing and billing")?.items;

export default function PricingPage() {
  return (
    <div className="pt-16">
      <Pricing />
      <FAQ items={PRICING_FAQS} />
      <CTA />
    </div>
  );
}
