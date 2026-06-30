"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import Button from "./Button";
import Wordmark from "./Wordmark";

const LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog", external: true },
  { label: "For LinkedIn", href: "/linkedin" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-5 transition-all duration-300 ${
          scrolled ? "glass py-2.5 shadow-2xl shadow-black/40" : "py-3.5"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Wordmark className="h-6" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Magnetic key={l.href} strength={0.25}>
              {/* /blog is platform-served (not a Next route) — use a plain <a>
                  for a full navigation; <Link> would client-route and 404. */}
              {"external" in l && l.external ? (
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm text-white/65 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm text-white/65 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              )}
            </Magnetic>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://admin.tyashin.com"
            className="hidden rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white sm:block"
          >
            Sign in
          </a>
          <Button href="https://admin.tyashin.com" className="px-5 py-2.5">
            Start free
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
