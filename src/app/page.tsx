import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { WritingList } from "@/components/writing-list";
import { About } from "@/components/about";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
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
