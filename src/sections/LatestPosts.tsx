import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { SITE_URL } from '@/lib/seo';

/**
 * "Latest from the blog" — the homepage's only in-body links to the platform
 * blog. Posts live at /blog/<slug> (platform-served, not a Next route), so
 * these are plain <a> tags. Without this block every post was reachable only
 * from the nav/footer /blog link, which is exactly the shape Google leaves
 * un-indexed on a young domain.
 *
 * Data: the platform's same-origin blog API (`/_tyashin/blog/posts`). Fetched
 * at request time with ISR so a fresh post appears within 10 minutes without
 * a rebuild; any failure renders nothing rather than an empty section.
 */

interface PostCard {
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: string;
  publishedAt?: string;
  readTime?: number;
}

async function loadLatestPosts(): Promise<PostCard[]> {
  try {
    const res = await fetch(`${SITE_URL}/_tyashin/blog/posts?limit=3`, {
      next: { revalidate: 600 },
      headers: { accept: 'application/json' },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { active?: boolean; posts?: PostCard[] };
    if (!data.active || !Array.isArray(data.posts)) return [];
    return data.posts.filter((p) => p.slug && p.title).slice(0, 3);
  } catch {
    return [];
  }
}

function formatDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function LatestPosts() {
  const posts = await loadLatestPosts();
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-cyan-glow text-xs font-semibold uppercase tracking-[0.28em]">
                Journal
              </div>
              <h2 className="font-display mt-3 text-3xl font-semibold text-white md:text-4xl">
                Latest from the blog
              </h2>
            </div>
            <a
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white"
            >
              All articles <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <a
                href={`/blog/${p.slug}`}
                className="border-ink-line group flex h-full flex-col overflow-hidden rounded-2xl border bg-white/[0.03] transition-colors hover:border-white/20 hover:bg-white/[0.05]"
              >
                {p.featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.featuredImage}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={360}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <div className="bg-accent-gradient aspect-video w-full opacity-60" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold leading-snug text-white group-hover:text-white">
                    {p.title}
                  </h3>
                  {p.excerpt ? (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">
                      {p.excerpt}
                    </p>
                  ) : null}
                  <div className="mt-auto pt-4 text-xs text-white/40">
                    {[formatDate(p.publishedAt), p.readTime ? `${p.readTime} min read` : '']
                      .filter(Boolean)
                      .join(' · ')}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
