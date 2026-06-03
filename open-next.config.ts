import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

// Persist Next's ISR / fetch cache across Worker invocations in KV
// (binding name MUST be NEXT_INC_CACHE_KV — OpenNext hardcodes it).
// Without this, every SSR page recomputes per request → multi-second cold TTFB.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
