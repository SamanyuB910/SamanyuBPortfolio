"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";

export function ContactForm() {
  const [state, action, isPending] = useActionState<ContactState, FormData>(
    sendContact,
    null,
  );

  return (
    <form action={action} className="max-w-md space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm text-muted">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1 w-full border border-gridline bg-surface px-3 py-2 text-sm text-ink"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm text-muted">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full border border-gridline bg-surface px-3 py-2 text-sm text-ink"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm text-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full border border-gridline bg-surface px-3 py-2 text-sm text-ink"
        />
      </div>
      {/* honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="border border-ink px-4 py-2 text-sm text-ink hover:border-signal hover:text-signal disabled:opacity-50"
      >
        {isPending ? "Sending…" : "Send"}
      </button>
      {state && (
        <p
          role="status"
          className={`font-mono text-xs ${state.ok ? "text-signal" : "text-muted"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
