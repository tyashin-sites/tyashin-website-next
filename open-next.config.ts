import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

// Persist Next's ISR / fetch cache across Worker invocations in KV
// (binding name MUST be NEXT_INC_CACHE_KV — OpenNext hardcodes it).
// Without this, every SSR page recomputes per request → multi-second cold TTFB.
// queue: without it OpenNext uses a dummy queue and stale ISR pages are never
// regenerated (x-nextjs-cache: STALE until the next deploy). Needs the
// NEXT_CACHE_DO_QUEUE Durable Object + WORKER_SELF_REFERENCE binding in
// wrangler.jsonc — tyashin-platform CLAUDE.md §12c-bis.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: doQueue,
});
