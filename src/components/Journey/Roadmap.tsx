import { useEffect, useRef, useState, type CSSProperties } from "react";
import { roadmapPhases, roadmapSteps } from "../../content/roadmap";
import { registerLinkProps } from "../../content/links";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { ensureGsap } from "../../lib/gsap";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./Roadmap.module.css";

const stepById = new Map(roadmapSteps.map((s) => [s.index, s]));
const LAST = roadmapSteps[roadmapSteps.length - 1]?.index;

export function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  // How many phases the route has "reached" as the section scrolls through.
  const [reached, setReached] = useState(roadmapPhases.length);

  useScrollReveal(sectionRef, { y: 26, stagger: 0.05, start: "top 78%" });

  useEffect(() => {
    const map = mapRef.current;
    if (!map || reducedMotion) {
      setReached(roadmapPhases.length);
      map?.style.setProperty("--p", "1");
      return;
    }

    const { ScrollTrigger } = ensureGsap();
    const count = roadmapPhases.length;
    let last = -1;
    const st = ScrollTrigger.create({
      trigger: map,
      start: "top 72%",
      end: "bottom 88%",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        map.style.setProperty("--p", p.toFixed(4));
        // Phase i is reached once the fill passes its node (nodes at column starts).
        const r = p <= 0.01 ? 0 : Math.min(count, Math.floor(p * count) + 1);
        if (r !== last) {
          last = r;
          setReached(r);
        }
      },
    });
    map.style.setProperty("--p", String(st.progress));
    setReached(st.progress <= 0.01 ? 0 : Math.min(count, Math.floor(st.progress * count) + 1));

    return () => st.kill();
  }, [reducedMotion]);

  return (
    <section id="roadmap" ref={sectionRef} className={styles.section} aria-labelledby="roadmap-title">
      <div className={styles.aura} aria-hidden="true" />

      <div className="container">
        <header className={styles.head}>
          <div className={styles.headMain}>
            <span className="eyebrow reveal">Learning Roadmap</span>
            <h2 id="roadmap-title" className={`${styles.title} reveal`}>
              From your first shell command to <span className={styles.accent}>production systems.</span>
            </h2>
          </div>
          <div className={`${styles.headSide} reveal`}>
            <dl className={styles.facts}>
              <div>
                <dt>{roadmapSteps.length}</dt>
                <dd>Milestones</dd>
              </div>
              <div>
                <dt>{roadmapPhases.length}</dt>
                <dd>Phases</dd>
              </div>
              <div>
                <dt>1</dt>
                <dd>Capstone</dd>
              </div>
            </dl>
            <a {...registerLinkProps} className="btn btn-primary">
              Start the journey
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </header>

        <div ref={mapRef} className={styles.map} style={{ "--phases": roadmapPhases.length } as CSSProperties}>
          {/* Route line across the phase columns (desktop) / down the left (mobile) */}
          <div className={styles.route} aria-hidden="true">
            <span className={styles.routeFill} />
          </div>

          <ol className={styles.phases} role="list">
            {roadmapPhases.map((phase, pi) => {
              const isReached = pi < reached;
              const isCurrent = pi === reached - 1;
              return (
                <li
                  key={phase.id}
                  className={styles.phase}
                  data-reached={isReached}
                  data-current={isCurrent}
                  style={{ "--pi": pi } as CSSProperties}
                >
                  <div className={`${styles.phaseHead} reveal`}>
                    <span className={styles.node} aria-hidden="true">
                      <span />
                    </span>
                    <span className={styles.phaseNum}>Phase {String(pi + 1).padStart(2, "0")}</span>
                    <h3 className={styles.phaseName}>{phase.name}</h3>
                    <p className={styles.phaseTag}>{phase.tagline}</p>
                  </div>

                  <ol className={styles.steps} role="list">
                    {phase.steps.map((id) => {
                      const step = stepById.get(id);
                      if (!step) return null;
                      const capstone = id === LAST;
                      return (
                        <li key={id} className={`${styles.step} reveal`} data-capstone={capstone}>
                          <div className={styles.stepTop}>
                            <span className={styles.stepNum}>{step.index}</span>
                            {capstone && <span className={styles.badge}>Capstone</span>}
                          </div>
                          <h4 className={styles.stepTitle}>{step.title}</h4>
                          {step.summary && <p className={styles.stepSummary}>{step.summary}</p>}
                          {step.tools && (
                            <ul className={styles.chips} role="list">
                              {step.tools.map((t) => (
                                <li key={t}>{t}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
