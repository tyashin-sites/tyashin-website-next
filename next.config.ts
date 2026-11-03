import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

const nextConfig = {
  // Expose the API base to the client bundle (pricing fetch runs in the browser).
  env: {
    NEXT_PUBLIC_TYASHIN_API_URL:
      process.env.TYASHIN_API_URL || "https://website-api.tyashin.com",
  },
  images: {
    remotePatterns: [
      // Allowlist, never '**': with a wildcard /_next/image fetched and re-served
      // ANY https image from this domain (open proxy; VAPT 2026-10-27). First-party
      // hosts only: shared hosts (r2.dev, public CDNs) would keep the proxy open.
      { protocol: "https" as const, hostname: "website-api.tyashin.com" },
      { protocol: "https" as const, hostname: "*.tyashin.com" },
      { protocol: "https" as const, hostname: "*.thridify.com" },
    ],
  },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
