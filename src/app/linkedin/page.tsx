import { pageMetadata } from "@/lib/seo";
import {
  Brain,
  Clock,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Palette,
  ArrowRight,
  Linkedin,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import Button from "@/components/Button";

const LI = "https://linkedin.tyashin.com";

export const metadata = pageMetadata({
  title: "Tyashin for LinkedIn",
  description:
    "Tyashin for LinkedIn learns your voice, writes posts that sound like you, times them for peak visibility, and publishes automatically — so you stay seen while you focus on the work.",
  path: "/linkedin",
});

const FEATURES = [
  {
    icon: Brain,
    title: "Content intelligence",
    body: "Analyses your existing posts to learn your voice, then writes new content that sounds unmistakably like you — not a bot.",
  },
  {
    icon: Clock,
    title: "Optimal timing engine",
    body: "Learns when your audience is actually active and schedules for peak visibility — not generic “post on Tuesday” advice.",
  },
  {
    icon: BarChart3,
    title: "Visibility dashboard",
    body: "Impressions, follower growth, profile views and post reach in one place. Know exactly what's working.",
  },
  {
    icon: Sparkles,
    title: "Shine moments",
    body: "Spots your best-performing ideas and turns them into carousels, newsletters and comment strategies.",
  },
  {
    icon: ShieldCheck,
    title: "Approval gate",
    body: "Review and edit before publishing, or go full auto-post. You control the dial between oversight and automation.",
  },
  {
    icon: Palette,
    title: "Brand-trained AI",
    body: "Upload your knowledge bank, brand kit and tone guide. Every post sounds like you, every time.",
  },
];

const AUDIENCES = [
  "Founders building in public",
  "Consultants & freelancers",
  "Executives wanting a voice",
  "B2B sales people",
  "Coaches & educators",
];

export default function LinkedInPage() {
  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 text-center">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#0A66C2]/20 blur-[150px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink to-transparent" />
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="border-gradient inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur">
              <Linkedin className="h-3.5 w-3.5 text-[#3b9bff]" />
              Tyashin for LinkedIn · linkedin.tyashin.com
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-7 text-balance text-5xl font-semibold leading-[1.05] sm:text-6xl">
              Your voice. <span className="text-gradient">Amplified.</span> Authentic.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-white/55">
              Our sister product analyses your voice, writes LinkedIn content that
              sounds like you, times it for peak visibility, and publishes
              automatically — so you stay visible while you focus on what matters.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href={LI}>
                Try Tyashin for LinkedIn <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={`${LI}/pricing`} variant="ghost">
                See LinkedIn pricing
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <SpotlightCard className="h-full">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A66C2] text-white">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {f.body}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-white">
              Built for people who have something to say
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {AUDIENCES.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-ink-line bg-white/5 px-4 py-2 text-sm text-white/70"
                >
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0A66C2]/15 blur-[160px]" />
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Be seen, heard, and{" "}
              <span className="text-gradient">remembered.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-white/55">
              Tyashin runs your storefront. Tyashin for LinkedIn runs your personal
              brand. Same company, same care — pick the one you need, or use both.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href={LI}>
                Get started on LinkedIn <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/" variant="ghost">
                Back to the platform
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
