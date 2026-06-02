import type { Metadata } from "next";
import Platform from "@/sections/Platform";
import Differentiators from "@/sections/Differentiators";
import ChatShowcase from "@/sections/ChatShowcase";
import CTA from "@/sections/CTA";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "One platform replaces a dozen tools — AI website generator, edge SSR hosting, e-commerce, CRM, AI chatbot, SEO autopilot, blog, analytics, payments and more. One dashboard, one database, all on the edge.",
};

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
