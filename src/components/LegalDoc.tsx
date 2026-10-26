import type { ReactNode } from 'react';

/**
 * Shared prose wrapper for legal / long-form pages (Privacy, Terms, DPA,
 * Grievance). Keeps the dark-theme typography consistent without pulling in
 * @tailwindcss/typography.
 *
 * `lang` marks the content language when it differs from the page root
 * (<html lang="en">), e.g. the Hindi grievance page passes lang="hi".
 */
export default function LegalDoc({ children, lang }: { children: ReactNode; lang?: string }) {
  return (
    <div
      lang={lang}
      className="mt-10 space-y-5 text-[15px] leading-relaxed text-white/65 [&_a]:text-cyan-glow [&_a]:underline [&_a]:underline-offset-2 [&_h2]:font-display [&_h2]:mt-10 [&_h2]:mb-2 [&_h2]:scroll-mt-28 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-white/90 [&_li]:ml-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:text-white/85 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
    >
      {children}
    </div>
  );
}
