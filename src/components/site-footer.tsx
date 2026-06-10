import { site } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-auto border-t border-gridline">
      <div className="mx-auto w-full max-w-5xl px-5 py-16">
        <h2 className="font-mono text-sm text-muted">04 — Contact</h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          <div className="space-y-4">
            <p className="max-w-sm text-base leading-relaxed text-muted">
              The fastest way to reach me is email. I read everything.
            </p>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="text-ink underline">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline"
                >
                  github.com/SamanyuB910
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline"
                >
                  linkedin.com/in/samanyu-badam
                </a>
              </li>
              <li>
                <a href={site.resume} className="text-ink underline">
                  resume.pdf
                </a>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
        <p className="mt-14 font-mono text-xs text-muted">
          © {new Date().getFullYear()} {site.name} · Atlanta, GA
        </p>
      </div>
    </footer>
  );
}
