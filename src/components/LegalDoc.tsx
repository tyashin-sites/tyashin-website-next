import type { ReactNode } from 'react';

/**
 * Shared prose wrapper for legal / long-form pages (Privacy, Terms).
 * Keeps the dark-theme typography consistent without pulling in
 * @tailwindcss/typography.
 */
export default function LegalDoc({ children }: { children: ReactNode }) {
  return (
    <div
      className="mt-10 space-y-5 text-[15px] leading-relaxed text-white/65 [&_a]:text-cyan-glow [&_a]:underline [&_a]:underline-offset-2 [&_h2]:font-display [&_h2]:mt-10 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_li]:ml-1 [&_strong]:text-white/85 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
    >
      {children}
    </div>
  );
}
