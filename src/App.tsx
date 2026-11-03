import { useEffect } from "react";
import { Nav } from "./components/Nav/Nav";
import { ScrollProgress } from "./components/ScrollProgress/ScrollProgress";
import { Hero } from "./components/Hero/Hero";
import { Philosophy } from "./components/Philosophy/Philosophy";
import { ProjectIndex } from "./components/ProjectIndex/ProjectIndex";
// CaseStudy (old "Project 01" deep-dive) is hidden — the Projects section now covers all five in detail.
// import { CaseStudy } from "./components/CaseStudy/CaseStudy";
// "Infrastructure in Motion" (PipelineFlow) is hidden for now. To restore it, re-add this
// import and <PipelineFlow /> after <CaseStudy />, and the "Pipeline" link in content/navigation.ts.
// import { PipelineFlow } from "./components/PipelineFlow/PipelineFlow";
import { TerminalLab } from "./components/TerminalLab/TerminalLab";
import { Capabilities } from "./components/Capabilities/Capabilities";
import { Roadmap } from "./components/Journey/Roadmap";
import { Outcomes } from "./components/Journey/Outcomes";
import { Faq } from "./components/Journey/Faq";
import { FinalCta } from "./components/FinalCta/FinalCta";
import { Footer } from "./components/Footer/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton/WhatsAppButton";
import { LeadForm } from "./components/LeadForm/LeadForm";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { ensureGsap } from "./lib/gsap";

function App() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    document.body.classList.toggle("reduced-motion", reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    const { ScrollTrigger } = ensureGsap();
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <a href="#main" className="sr-skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Philosophy />
        <ProjectIndex />
        <TerminalLab />
        <Capabilities />
        <Roadmap />
        <Outcomes />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
      <LeadForm />
    </>
  );
}

export default App;
