'use client';

/** Tyashin wordmark: a gradient glyph mark + word. */
export default function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="tya-g" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0" stopColor="#7C5CFF" />
            <stop offset="0.5" stopColor="#5B8DEF" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <path
          d="M16 2 L28 9 V23 L16 30 L4 23 V9 Z"
          stroke="url(#tya-g)"
          strokeWidth="1.6"
          opacity="0.5"
        />
        <path
          d="M10 11 H22 M16 11 V22"
          stroke="url(#tya-g)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-[1.05rem] font-semibold tracking-tight text-white">
        Tyashin
      </span>
    </span>
  );
}