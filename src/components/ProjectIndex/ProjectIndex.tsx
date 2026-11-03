import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { projects, projectStandards, type StepPhase } from "../../content/projects";
import { registerLinkProps } from "../../content/links";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import styles from "./ProjectIndex.module.css";

const PHASE_LABEL: Record<StepPhase, string> = {
  build: "Build",
  break: "Break",
  recover: "Recover",
};

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectIndex() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hoverStep, setHoverStep] = useState<number | null>(null);

  useScrollReveal(sectionRef, { y: 28, stagger: 0.06, start: "top 78%" });

  const project = projects[active];
  const total = projects.length;

  const select = (i: number, focus = false) => {
    const n = (i + total) % total;
    setActive(n);
    setHoverStep(null);
    if (focus) tabRefs.current[n]?.focus();
  };

  const go = (i: number) => {
    select(i);
    // On small screens, bring the panel into view after picking a project.
    if (window.matchMedia("(max-width: 1023.98px)").matches) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const fwd = e.key === "ArrowDown" || e.key === "ArrowRight";
    const back = e.key === "ArrowUp" || e.key === "ArrowLeft";
    if (!fwd && !back) return;
    e.preventDefault();
    select(i + (fwd ? 1 : -1), true);
  };

  const counts = project.steps.reduce(
    (acc, s) => ({ ...acc, [s.phase]: acc[s.phase] + 1 }),
    { build: 0, break: 0, recover: 0 } as Record<StepPhase, number>
  );

  return (
    <section id="projects" ref={sectionRef} className={styles.section} aria-labelledby="projects-title">
      <div className={styles.aura} aria-hidden="true" />

      <div className="container">
        {/* ── Header ── */}
        <header className={styles.head}>
          <div className={styles.headMain}>
            <span className="eyebrow reveal">The Project Series</span>
            <h2 id="projects-title" className={`${styles.title} reveal`}>
              Five advanced, <span className={styles.accent}>end‑to‑end</span> DevOps projects.
            </h2>
          </div>
          <div className={`${styles.headSide} reveal`}>
            <p className={styles.lead}>
              Every project is built, deliberately broken, and recovered — the way production systems are
              really run.
            </p>
            <ul className={styles.legend} role="list" aria-label="Step types">
              {(Object.keys(PHASE_LABEL) as StepPhase[]).map((p) => (
                <li key={p} data-phase={p}>
                  <i aria-hidden="true" />
                  {PHASE_LABEL[p]}
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* ── Explorer ── */}
        <div className={styles.explorer}>
          <div className={`${styles.tabs} reveal`} role="tablist" aria-label="Projects" aria-orientation="vertical">
            {projects.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.slug}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`project-tab-${p.slug}`}
                  aria-selected={on}
                  aria-controls="project-panel"
                  tabIndex={on ? 0 : -1}
                  className={styles.tab}
                  data-on={on}
                  onClick={() => go(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <span className={styles.tabNum}>{p.number}</span>
                  <span className={styles.tabText}>
                    <span className={styles.tabDomain}>{p.domain}</span>
                    <span className={styles.tabTitle}>{p.short}</span>
                  </span>
                  <span className={styles.tabBar} aria-hidden="true">
                    {p.steps.map((s, k) => (
                      <i key={k} data-phase={s.phase} />
                    ))}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            ref={panelRef}
            id="project-panel"
            role="tabpanel"
            aria-labelledby={`project-tab-${project.slug}`}
            className={`${styles.panel} reveal`}
          >
            <span className={styles.bigNum} aria-hidden="true">
              {project.number}
            </span>

            <div key={project.slug} className={styles.panelInner}>
              <div className={styles.panelTop}>
                <span className={styles.kicker}>
                  Project {project.number} / {pad(total)}
                </span>
                <span className={styles.domainChip}>{project.domain}</span>
              </div>

              <h3 className={styles.panelTitle}>{project.title}</h3>
              <p className={styles.summary}>{project.summary}</p>

              <div className={styles.failure}>
                <span className={styles.failureIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" fill="currentColor" />
                  </svg>
                </span>
                <div>
                  <span className={styles.failureLabel}>The failure you'll engineer</span>
                  <p>{project.failure}</p>
                </div>
              </div>

              <div className={styles.block}>
                <h4 className={styles.blockTitle}>Technology stack</h4>
                <ul className={styles.stack} role="list">
                  {project.stack.map((t, i) => (
                    <li key={t} style={{ "--i": i } as CSSProperties}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.block}>
                <div className={styles.stepsHead}>
                  <h4 className={styles.blockTitle}>End-to-end implementation</h4>
                  <span className={styles.stepCounts}>
                    {counts.build} build · {counts.break} break · {counts.recover} recover
                  </span>
                </div>

                {/* Phase strip: one segment per step */}
                <div className={styles.strip} aria-hidden="true">
                  {project.steps.map((s, i) => (
                    <i key={i} data-phase={s.phase} data-hot={hoverStep === i} />
                  ))}
                </div>

                <ol className={styles.steps} role="list">
                  {project.steps.map((s, i) => (
                    <li
                      key={i}
                      className={styles.step}
                      data-phase={s.phase}
                      style={{ "--i": i } as CSSProperties}
                      onPointerEnter={() => setHoverStep(i)}
                      onPointerLeave={() => setHoverStep(null)}
                    >
                      <span className={styles.stepNum}>{pad(i + 1)}</span>
                      <span className={styles.stepText}>{s.text}</span>
                      <span className={styles.stepTag}>{PHASE_LABEL[s.phase]}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.panelFoot}>
                <div className={styles.pager}>
                  <button type="button" onClick={() => go(active - 1)} aria-label="Previous project">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <span>
                    {project.number} / {pad(total)}
                  </span>
                  <button type="button" onClick={() => go(active + 1)} aria-label="Next project">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <a {...registerLinkProps} className="btn btn-primary">
                  Build this project
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Shared standards ── */}
        <div className={`${styles.standards} reveal`}>
          <div className={styles.standardsHead}>
            <h3 className={styles.standardsTitle}>Every project includes</h3>
            <p className={styles.standardsLead}>The same engineering bar, across all five.</p>
          </div>
          <ul className={styles.standardsGrid} role="list">
            {projectStandards.map((s) => (
              <li key={s}>
                <span className={styles.check} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {s.replace(/\.$/, "")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
