"use client";

import { type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLenis } from "@/lib/useLenis";
import { PricingProvider } from "@/lib/usePricing";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/sections/Footer";

/** Client shell shared by every route: smooth scroll, cursor, grain, nav, footer. */
export default function SiteShell({ children }: { children: ReactNode }) {
  useLenis();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <PricingProvider>
      <Cursor />
      <div className="grain" />
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-accent-gradient"
      />
      <Nav />
      {/* overflow-x-clip is the single guard against decorative orbs / marquees
          leaking horizontal scroll (which also stretched the fixed nav past the
          viewport on mobile). `clip` — not `hidden` — does NOT create a scroll
          container, so it leaves the sticky scroll-pin sections intact. */}
      <main className="relative overflow-x-clip">{children}</main>
      <Footer />
    </PricingProvider>
  );
}
