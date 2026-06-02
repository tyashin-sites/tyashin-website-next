'use client';

import { type ReactNode } from 'react';
import Magnetic from './Magnetic';
import { cn } from '@/lib/utils';

export default function Button({
  children,
  href = '#',
  variant = 'primary',
  className,
}: {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'ghost';
  className?: string;
}) {
  return (
    <Magnetic strength={0.35}>
      <a
        href={href}
        className={cn(
          'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300',
          variant === 'primary'
            ? 'text-ink bg-white hover:bg-white/90'
            : 'border border-white/15 text-white hover:border-white/40 hover:bg-white/5',
          className
        )}
      >
        {variant === 'primary' && (
          <span className="bg-accent-gradient absolute -inset-px -z-10 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70" />
        )}
        {children}
      </a>
    </Magnetic>
  );
}