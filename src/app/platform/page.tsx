import { pageMetadata } from "@/lib/seo";
import Platform from "@/sections/Platform";
import Differentiators from "@/sections/Differentiators";
import ChatShowcase from "@/sections/ChatShowcase";
import CTA from "@/sections/CTA";

export const metadata = pageMetadata({
  title: "Platform — AI storefront, chatbot, SEO & payments",
  description:
    "One platform replaces a dozen tools: AI website generator, edge hosting, e-commerce, CRM, AI chatbot, SEO autopilot, blog, analytics and payments.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <div className="pt-16">
      <Platform />
      <ChatShowcase />
      <Differentiators />
      <CTA />
    </div>
  );
}
