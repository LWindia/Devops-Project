import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import styles from "./FinalCta.module.css";
import { registerLinkProps } from "../../content/links";

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, { selector: `.${"reveal"}`, y: 28, start: "top 80%" });

  return (
    <section id="start" className={`section ${styles.cta}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.content}`} ref={ref}>
        <span className={`eyebrow reveal ${styles.eyebrow}`}>Ready When You Are</span>
        <h2 className={`${styles.headline} reveal`}>
          Your DevOps journey
          <br />
          starts here.
        </h2>
        <p className={`lead reveal ${styles.sub}`}>
          Join the DevOps Project Series and start building infrastructure, pipelines, and systems
          that work the way production systems actually work.
        </p>
        <div className={`${styles.actions} reveal`}>
          <a {...registerLinkProps} className="btn btn-primary">
            Register Now
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#projects" className="btn btn-secondary">
            Explore Projects
          </a>
        </div>
      </div>
    </section>
  );
}
