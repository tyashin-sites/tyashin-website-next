import Hero from "@/sections/Hero";
import LogoMarquee from "@/sections/LogoMarquee";
import Stats from "@/sections/Stats";
import Platform from "@/sections/Platform";
import HowItWorks from "@/sections/HowItWorks";
import ChatShowcase from "@/sections/ChatShowcase";
import Solutions from "@/sections/Solutions";
import Differentiators from "@/sections/Differentiators";
import Plugins from "@/sections/Plugins";
import Pricing from "@/sections/Pricing";
import FAQ from "@/sections/FAQ";
import CTA from "@/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Stats />
      <Platform />
      <HowItWorks />
      <ChatShowcase />
      <Solutions />
      <Differentiators />
      <Plugins />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
