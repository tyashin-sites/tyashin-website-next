import { pageMetadata } from "@/lib/seo";
import Platform from "@/sections/Platform";
import Differentiators from "@/sections/Differentiators";
import ChatShowcase from "@/sections/ChatShowcase";
import CTA from "@/sections/CTA";

export const metadata = pageMetadata({
  title: "Platform",
  description:
    "One platform replaces a dozen tools — AI website generator, edge SSR hosting, e-commerce, CRM, AI chatbot, SEO autopilot, blog, analytics, payments and more. One dashboard, one database, all on the edge.",
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
