import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const NOINDEX = process.env.ROBOTS_NOINDEX === "true";

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
  robots: NOINDEX
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : undefined,
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
    <html lang="en" className="dark">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
