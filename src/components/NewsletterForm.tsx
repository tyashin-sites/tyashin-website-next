'use client';

import { useState } from 'react';

/**
 * Newsletter signup — posts to /api/newsletter, which proxies to the Tyashin
 * platform server-side so the API key never reaches the browser.
 *
 * Dogfooding note: tyashin.com markets "Newsletter & forms" as a platform
 * capability, so our own site should visibly use it.
 */

type Status = 'idle' | 'saving' | 'done' | 'error';

export default function NewsletterForm({ source = 'marketing-site-footer' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'saving') return;
    setStatus('saving');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website, source }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: { message?: string };
      };

      if (res.ok && data.success) {
        setStatus('done');
        setMessage("You're on the list. Check your inbox to confirm.");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  if (status === 'done') {
    return (
      <p className="mt-4 flex items-center gap-2 text-sm text-emerald-300" role="status">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
          aria-invalid={status === 'error' || undefined}
          className="border-ink-line focus:border-cyan-glow/60 w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors"
        />
        {/* Honeypot — hidden from humans, catches naive bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === 'saving'}
          className="border-ink-line shrink-0 rounded-xl border bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20 disabled:opacity-50"
        >
          {status === 'saving' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p id="newsletter-error" className="mt-2 text-xs text-red-300" role="alert">
          {message}
        </p>
      )}
      <p className="mt-2 text-xs text-white/40">
        Product updates and a monthly roundup. No spam, unsubscribe anytime.
      </p>
    </form>
  );
}
