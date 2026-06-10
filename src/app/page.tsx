import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { WritingList } from "@/components/writing-list";
import { About } from "@/components/about";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.linkedin],
  jobTitle: "Machine Learning Engineer Intern",
  worksFor: { "@type": "Organization", name: "Kroger Digital & Technology" },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Georgia Institute of Technology",
  },
  knowsAbout: [
    "machine learning",
    "graph theory",
    "SLAM",
    "LLM interpretability",
    "combinatorics",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SiteNav />
      <main id="main" className="scroll-mt-20">
        <Hero />
        <SelectedWork />
        <WritingList />
        <About />
      </main>
      <SiteFooter />
    </>
  );
}
