'use client';

import { type ReactNode } from 'react';

/** Infinite horizontal marquee. Duplicates children for a seamless loop. */
export default function Marquee({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative flex overflow-hidden ${className ?? ''}`}>
      <div className="animate-marquee flex shrink-0 items-center gap-16 pr-16 group-hover:[animation-play-state:paused]">
        {children}
      </div>
      <div
        className="animate-marquee flex shrink-0 items-center gap-16 pr-16 group-hover:[animation-play-state:paused]"
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}