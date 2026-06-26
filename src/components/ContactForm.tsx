'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOPICS = ['Pricing', 'Demo', 'Partnership', 'Other'] as const;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ initialTopic }: { initialTopic?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      company: String(fd.get('company') ?? ''),
      topic: String(fd.get('topic') ?? 'Other'),
      message: String(fd.get('message') ?? ''),
      website: String(fd.get('website') ?? ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: { message?: string } };
      if (res.ok && data.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMessage(data.error?.message ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again or use WhatsApp.');
    }
  }

  if (status === 'success') {
    return (
      <div className="border-ink-line bg-ink-card/60 flex flex-col items-center rounded-3xl border p-10 text-center">
        <div className="bg-accent-gradient mb-5 flex h-12 w-12 items-center justify-center rounded-full">
          <Check className="text-ink h-6 w-6" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-white">Got it — thank you.</h3>
        <p className="mt-3 max-w-md text-white/55">
          We typically reply within one business day. If it&apos;s urgent, the WhatsApp button on
          this page reaches the team directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border-ink-line bg-ink-card/60 rounded-3xl border p-7 sm:p-9"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required maxLength={100} />
        <Field label="Email" name="email" type="email" required maxLength={200} />
        <Field label="Company" name="company" maxLength={120} optional />
        <Field label="Phone" name="phone" maxLength={20} optional />
      </div>

      <div className="mt-5">
        <Label name="topic">What can we help with?</Label>
        <select
          id="topic"
          name="topic"
          defaultValue={initialTopic && (TOPICS as readonly string[]).includes(initialTopic) ? initialTopic : 'Pricing'}
          className="border-ink-line focus:border-cyan-glow/60 mt-2 w-full appearance-none rounded-xl border bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors"
        >
          {TOPICS.map((t) => (
            <option key={t} value={t} className="bg-ink">
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <Label name="message">Message</Label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          className="border-ink-line focus:border-cyan-glow/60 mt-2 w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors"
          placeholder="Tell us a bit about your business and what you're looking for."
        />
      </div>

      {status === 'error' && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={cn(
          'group relative mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-colors duration-300',
          'hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60'
        )}
      >
        <span className="bg-accent-gradient absolute -inset-px -z-10 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70" />
        {status === 'submitting' ? 'Sending…' : 'Send message'}
        {status !== 'submitting' && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="mt-4 text-center text-xs text-white/45">
        We&apos;ll only use this to reply. No spam, ever.
      </p>
    </form>
  );
}

function Label({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <label htmlFor={name} className="text-xs font-medium uppercase tracking-[0.18em] text-white/55">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  optional,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <Label name={name}>
        {label}
        {optional && <span className="ml-1 normal-case tracking-normal text-white/30">(optional)</span>}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className="border-ink-line focus:border-cyan-glow/60 mt-2 w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors"
      />
    </div>
  );
}
