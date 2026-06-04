import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

// Self-hosted, preloaded, swap — no render-blocking external font request,
// no layout shift. Exposed as CSS vars consumed by tailwind's font families.
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tyashin.com"),
  title: {
    default: "Tyashin — The AI growth & commerce OS for modern storefronts",
    template: "%s · Tyashin",
  },
  description:
    "Bring your site or port it from Lovable. Tyashin runs the AI chatbot that sells, the SEO autopilot that gets you found, payments for India and the world, and a plugin marketplace — all on the edge.",
  openGraph: {
    title: "Tyashin — AI growth & commerce OS",
    description:
      "Make your storefront a self-growing business. AI chatbot, SEO autopilot, global payments, plugin marketplace — on the edge.",
    type: "website",
    url: "https://tyashin.com",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#06070A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Inline `backgroundColor: #06070A` (colors.ink.DEFAULT) on BOTH <html>
    // and <body> so the dark canvas paints on the very first frame — before
    // the render-blocking Tailwind bundle loads. Without this the viewport
    // flashes white for ~2-3 blank filmstrip frames, which was inflating
    // mobile Speed Index to 7.5s even though FCP/LCP were fine.
    <html
      lang="en"
      className={`dark ${sans.variable} ${display.variable}`}
      style={{ backgroundColor: '#06070A' }}
    >
      <body style={{ backgroundColor: '#06070A' }}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
