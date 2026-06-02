import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

const nextConfig = {
  // Expose the API base to the client bundle (pricing fetch runs in the browser).
  env: {
    NEXT_PUBLIC_TYASHIN_API_URL:
      process.env.TYASHIN_API_URL || "https://website-api.tyashin.com",
  },
  images: {
    remotePatterns: [{ protocol: "https" as const, hostname: "**" }],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
