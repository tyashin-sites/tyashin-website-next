import { pageMetadata } from "@/lib/seo";
import Solutions from "@/sections/Solutions";
import Stats from "@/sections/Stats";
import Differentiators from "@/sections/Differentiators";
import CTA from "@/sections/CTA";

export const metadata = pageMetadata({
  title: "Solutions",
  description:
    "One platform, many businesses — Indian D2C, global D2C, creators, agencies, and regulated industries. Razorpay, GST and WhatsApp first-class; Stripe and GDPR for the world.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <div className="pt-16">
      <Solutions />
      <Stats />
      <Differentiators />
      <CTA />
    </div>
  );
}
