"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";

const field =
  "mt-1.5 w-full border border-muted/40 bg-surface px-3 py-2.5 text-sm text-ink " +
  "placeholder:text-muted/60 hover:border-muted focus:border-ink";

export function ContactForm() {
  const [state, action, isPending] = useActionState<ContactState, FormData>(
    sendContact,
    null,
  );

  return (
    <form action={action} className="max-w-md space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-xs text-muted"
          >
            name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={field}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-xs text-muted"
          >
            email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block font-mono text-xs text-muted"
        >
          message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={field}
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
        className="border border-ink px-5 py-2.5 font-mono text-sm text-ink transition-colors hover:border-signal hover:text-signal disabled:opacity-50"
      >
        {isPending ? "sending…" : "send"}
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
