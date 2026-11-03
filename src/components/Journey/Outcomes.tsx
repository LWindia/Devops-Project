import { useRef } from "react";
import { outcomes } from "../../content/roadmap";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import styles from "./Outcomes.module.css";

export function Outcomes() {
  const ref = useRef<HTMLUListElement>(null);
  useScrollReveal(ref, { selector: `.${"reveal"}`, y: 14, stagger: 0.04, start: "top 85%" });

  return (
    <section id="outcomes" className="section">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.intro}>
            <span className="eyebrow">What You Will Build</span>
            <h2 className={styles.title}>Production-ready systems.</h2>
            <p className="lead">
              By the end of this series, you will have a portfolio of real, production-ready DevOps
              systems — not slides, not screenshots.
            </p>
          </div>

          <ul ref={ref} className={styles.flow} role="list">
            {outcomes.map((outcome) => (
              <li key={outcome.id} className={`${styles.item} reveal`}>
                <svg className={styles.check} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {outcome.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
