'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import {
  GRIEVANCE_CATEGORIES,
  GRIEVANCE_COPY,
  GRIEVANCE_EMAIL,
  findGrievanceCategory,
  type GrievanceLang,
} from '@/lib/grievance';

const field =
  'border-ink-line focus:border-cyan-glow/60 mt-2 w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors';
const label = 'text-xs font-medium uppercase tracking-[0.18em] text-white/55';

/** Complaint form for the Grievance Officer page (IT Rules 3(2)). Posts to /api/grievance. */
export default function GrievanceForm({ lang = 'en' }: { lang?: GrievanceLang }) {
  const t = GRIEVANCE_COPY[lang];
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ reference: string | null; clock: string }>({ reference: null, clock: '' });
  // Time-trap for the Contact Form plugin: submissions < 2 s after render are treated as spam.
  const [renderedAt, setRenderedAt] = useState(0);
  useEffect(() => setRenderedAt(Date.now()), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const categoryId = String(fd.get('category') ?? '');
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/grievance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(fd.entries()), lang, renderedAt }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string | null; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || '');
      setResult({ reference: data.reference ?? null, clock: findGrievanceCategory(categoryId)?.clock[lang] ?? '' });
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : '');
    }
  }

  if (status === 'done') {
    return (
      <div className="border-ink-line bg-ink-card/60 not-prose mt-6 rounded-3xl border p-8" role="status" aria-live="polite" lang={lang}>
        <div className="bg-accent-gradient mb-4 flex h-10 w-10 items-center justify-center rounded-full">
          <Check className="text-ink h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-white">{t.doneTitle}</h3>
        {result.reference && (
          <p className="mt-3 text-white/70">
            {t.reference}: <strong className="text-white">{result.reference}</strong>
          </p>
        )}
        {result.clock && <p className="mt-2 text-white/70">{t.doneClock(result.clock)}</p>}
        <p className="mt-2 text-sm text-white/55">
          {t.doneEmail} <a href={`mailto:${GRIEVANCE_EMAIL}`} className="underline">{GRIEVANCE_EMAIL}</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} lang={lang} className="border-ink-line bg-ink-card/60 not-prose relative mt-6 rounded-3xl border p-6 sm:p-8">
      <p className="mb-6 text-sm text-white/70">{t.intro}</p>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="g-name" className={label}>{t.name}</label>
          <input id="g-name" name="name" required maxLength={100} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="g-email" className={label}>{t.email}</label>
          <input id="g-email" name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="g-category" className={label}>{t.category}</label>
        <select id="g-category" name="category" required defaultValue="" className={field}>
          <option value="" disabled className="bg-ink">…</option>
          {GRIEVANCE_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id} className="bg-ink">{c.label[lang]}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="g-url" className={label}>
          {t.contentUrl} <span className="ml-1 normal-case tracking-normal text-white/30">({t.optional})</span>
        </label>
        <input id="g-url" name="contentUrl" type="url" maxLength={500} placeholder="https://" className={field} />
        <p className="mt-2 text-xs text-white/45">{t.contentUrlHint}</p>
      </div>

      <div className="mt-5">
        <label htmlFor="g-message" className={label}>{t.message}</label>
        <textarea id="g-message" name="message" required maxLength={5000} rows={5} className={field} />
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error || t.error} {!error && <a href={`mailto:${GRIEVANCE_EMAIL}`} className="underline">{GRIEVANCE_EMAIL}</a>}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60">
        {status === 'sending' ? t.sending : t.submit}
      </button>
    </form>
  );
}
