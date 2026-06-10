import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
  detail: z.string().optional(),
});

const linkSchema = z.object({
  label: z.string(),
  href: z.string().url(),
});

export const workSchema = z.object({
  title: z.string(),
  slug: z.string(),
  order: z.number().int().min(1),
  timeframe: z.string(),
  org: z.string(),
  role: z.string(),
  summary: z.string(),
  metrics: z.array(metricSchema),
  provisional: z.boolean(),
  stack: z.array(z.string()),
  links: z.array(linkSchema).default([]),
});

export const writingSchema = z.object({
  title: z.string(),
  slug: z.string(),
  // YAML parses unquoted dates as Date objects; normalize to YYYY-MM-DD.
  date: z.preprocess(
    (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  ),
  status: z.enum(["draft", "published"]),
  abstract: z.string(),
});

export type WorkMeta = z.infer<typeof workSchema>;
export type WritingMeta = z.infer<typeof writingSchema>;

export type WorkEntry = { meta: WorkMeta; body: string };
export type WritingEntry = { meta: WritingMeta; body: string };

function readDir(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), "utf8");
      return matter(raw);
    });
}

export function getWork(): WorkEntry[] {
  return readDir("work")
    .map((file) => ({ meta: workSchema.parse(file.data), body: file.content }))
    .sort((a, b) => a.meta.order - b.meta.order);
}

export function getWorkBySlug(slug: string): WorkEntry | undefined {
  return getWork().find((w) => w.meta.slug === slug);
}

export function getWriting(): WritingEntry[] {
  return readDir("writing")
    .map((file) => ({ meta: writingSchema.parse(file.data), body: file.content }))
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getWritingBySlug(slug: string): WritingEntry | undefined {
  return getWriting().find((w) => w.meta.slug === slug);
}
