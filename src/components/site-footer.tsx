import { site } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-auto scroll-mt-20 border-t border-gridline">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="font-mono text-xs tracking-widest text-muted">
          04 — contact
        </h2>
        <Reveal className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <p className="max-w-sm text-lg leading-relaxed text-muted">
              The fastest way to reach me is email. I read everything.
            </p>
            <ul className="space-y-3 font-mono text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink underline hover:text-signal"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline hover:text-signal"
                >
                  github.com/SamanyuB910
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline hover:text-signal"
                >
                  linkedin.com/in/samanyu-badam
                </a>
              </li>
              <li>
                <a
                  href={site.resume}
                  className="text-ink underline hover:text-signal"
                >
                  resume.pdf
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </Reveal>
        <p className="mt-16 border-t border-gridline pt-6 font-mono text-xs text-muted">
          © {new Date().getFullYear()} {site.name} · Atlanta, GA · built with
          Next.js, set in Clash Grotesk, Hanken Grotesk &amp; Fragment Mono
        </p>
      </div>
    </footer>
  );
}
