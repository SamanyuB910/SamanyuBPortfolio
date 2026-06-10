"use server";

import { z } from "zod";
import { site } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("A valid email is required"),
  message: z.string().min(10, "Say a little more").max(5000),
  // honeypot — humans never fill this
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactState = { ok: boolean; message: string } | null;

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { ok: false, message: first?.message ?? "Invalid input." };
  }

  // Honeypot tripped — pretend success, send nothing.
  if (parsed.data.company && parsed.data.company.length > 0) {
    return { ok: true, message: "Thanks — I'll get back to you soon." };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      ok: false,
      message: `The contact form isn't wired up yet — email me directly at ${site.email}.`,
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: site.email,
      replyTo: parsed.data.email,
      subject: `Portfolio contact from ${parsed.data.name}`,
      text: `${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
    });
    return { ok: true, message: "Thanks — I'll get back to you soon." };
  } catch {
    return {
      ok: false,
      message: `Something went wrong sending that — email me at ${site.email}.`,
    };
  }
}
