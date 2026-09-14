import { pageMetadata } from "@/lib/seo";
import Solutions from "@/sections/Solutions";
import Stats from "@/sections/Stats";
import Differentiators from "@/sections/Differentiators";
import CTA from "@/sections/CTA";

export const metadata = pageMetadata({
  title: "Solutions for D2C brands, creators & agencies",
  description:
    "Indian D2C, global D2C, creators, agencies and regulated industries. Razorpay, GST and WhatsApp built in; Stripe and GDPR for the rest of the world.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <div className="pt-16">
      <Solutions />
      {/* Cross-link to the job-based page so the two stay complementary
          (this page = by business type, /use-cases = by goal) rather than
          competing for the same search intent. */}
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm text-white/45">
          Prefer to browse by what you&apos;re trying to achieve?{' '}
          <a href="/use-cases" className="text-cyan-glow underline underline-offset-2">
            See use cases
          </a>
          .
        </p>
      </div>
      <Stats />
      <Differentiators />
      <CTA />
    </div>
  );
}
