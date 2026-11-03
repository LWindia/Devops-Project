import { useRef, useState } from "react";
import { projects } from "../../content/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import styles from "./ProjectIndex.module.css";

export function ProjectIndex() {
  const ref = useRef<HTMLDivElement>(null);
  const [openSlug, setOpenSlug] = useState<string>(projects[0].slug);
  useScrollReveal(ref, { selector: `.${"reveal"}`, y: 30, start: "top 88%", batch: true });

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">The Project Series</span>
          <h2 className={styles.title}>A connected engineering journey, not a tutorial list.</h2>
          <p className="lead">
            Five projects that build on each other — from containerizing a single application to
            operating the full lifecycle of a production-style system.
          </p>
        </div>

        <div ref={ref} className={styles.list}>
          {projects.map((project, index) => {
            const isOpen = openSlug === project.slug;
            return (
              <article key={project.slug} className={`${styles.row} reveal`}>
                <div className={styles.rail}>
                  <span className={styles.number}>{project.number}</span>
                  {index < projects.length - 1 && <span className={styles.connector} aria-hidden="true" />}
                </div>

                <div className={styles.body}>
                  <button
                    type="button"
                    className={styles.rowHead}
                    aria-expanded={isOpen}
                    aria-controls={`project-panel-${project.slug}`}
                    onClick={() => setOpenSlug(isOpen ? "" : project.slug)}
                  >
                    <div className={styles.titleBlock}>
                      <span className={styles.domain}>{project.domain}</span>
                      <h3 className={styles.rowTitle}>{project.title}</h3>
                    </div>
                    <span className={styles.headRule} aria-hidden="true" />
                    <span className={`${styles.toggle} ${isOpen ? styles.toggleOpen : ""}`} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  <div className={`${styles.detailRow} ${index % 2 === 1 ? styles.detailReversed : ""}`}>
                    <p className={styles.description}>{project.description}</p>

                    <ul className={`${styles.tech} ${index % 2 === 1 ? styles.techLead : ""}`} role="list">
                      {project.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div
                    id={`project-panel-${project.slug}`}
                    className={styles.panel}
                    data-open={isOpen}
                  >
                    <div className={styles.panelInner}>
                      <div className={styles.panelCol}>
                        <h4>Challenge</h4>
                        <p>{project.challenge}</p>
                      </div>
                      <div className={styles.panelCol}>
                        <h4>Architecture</h4>
                        <ul role="list">
                          {project.architecture.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.panelCol}>
                        <h4>Operations</h4>
                        <ul role="list">
                          {project.operations.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
