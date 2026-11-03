import { useEffect, useRef } from "react";
import { ensureGsap } from "../../lib/gsap";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { HeroVisual } from "./HeroVisual";
import { registerLinkProps } from "../../content/links";
import styles from "./Hero.module.css";

const stats = [
  { value: "5", label: "End-to-end projects" },
  { value: "20+", label: "DevOps tools" },
  { value: "100%", label: "Hands-on learning" },
  { value: "Production", label: "Ready skills" },
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Entrance animation
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(`.${styles.visualWrap}`, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.6 }, 0)
        .fromTo(`.${styles.eyebrow}`, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(`.${styles.headlineLine}`, { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.1 }, 0.3)
        .fromTo(`.${styles.description}`, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.8)
        .fromTo(`.${styles.actions}`, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.95)
        .fromTo(`.${styles.stat}`, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, 1.1)
        .fromTo(`.${styles.sideLabel}`, { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.8 }, 1.2)
        .fromTo(`.${styles.scrollCue}`, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.5);
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Scroll exit scrub
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const { gsap } = ensureGsap();
    const mm = gsap.matchMedia(root);
    mm.add({ full: "(min-width: 768px)", simple: "(max-width: 767.98px)" }, (context) => {
      const { full } = context.conditions as { full: boolean; simple: boolean };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      tl.to(`.${styles.copy}`, { opacity: 0.85, duration: 0.85 }, 0)
        .to(`.${styles.copy}`, { opacity: 0.3, duration: 0.15 }, 0.85)
        .to("[data-scene-layer='glow']", { opacity: 0, duration: 0.4 }, 0.6);

      if (full) {
        tl.to(`.${styles.copy}`, { yPercent: -12, duration: 1 }, 0)
          .to(`.${styles.visualParallax}`, { yPercent: 8, scale: 1.05, duration: 1 }, 0);
      } else {
        tl.set({}, {}, 1);
      }
    });

    return () => mm.revert();
  }, [reducedMotion]);

  const handleScrollCue = () => {
    document.querySelector("#philosophy")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={rootRef} className={styles.hero} aria-labelledby="hero-title">
      {/* Background atmosphere: glow + faint engineering grid */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      {/* Full-bleed illustration, positioned behind the right half on desktop */}
      <div className={styles.visualCol} aria-hidden="true">
        <div className={styles.visualWrap}>
          <div className={styles.visualParallax}>
            <HeroVisual pointerRootRef={rootRef} />
          </div>
        </div>
        <p className={styles.sideLabel}>
          <span>From code</span>
          <span>to production</span>
        </p>
      </div>

      {/* Readability scrim between art and copy */}
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.heroInner}`}>
        <div className={`${styles.copy} ${styles.textCol}`}>
          <span className={`eyebrow ${styles.eyebrow}`}>Hands-on · Project based · Production ready</span>

          <h1 id="hero-title" className={styles.headline}>
            <span className={styles.headlineMask}>
              <span className={styles.headlineLine}>Build production</span>
            </span>
            <span className={styles.headlineMask}>
              <span className={`${styles.headlineLine} ${styles.accentLine}`}>systems from</span>
            </span>
            <span className={styles.headlineMask}>
              <span className={`${styles.headlineLine} ${styles.accentLine}`}>scratch</span>
            </span>
          </h1>

          <p className={styles.description}>
            Design, deploy and operate real-world infrastructure — CI/CD pipelines, cloud
            environments, container orchestration and monitoring — one engineering project at a time.
          </p>

          <div className={styles.actions}>
            <a {...registerLinkProps} className="btn btn-primary">
              Register Now
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#projects" className={`btn btn-secondary ${styles.secondaryBtn}`}>
              Explore Projects
            </a>
          </div>

          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <button type="button" className={styles.scrollCue} onClick={handleScrollCue} aria-label="Scroll to next section">
        <span className={styles.scrollLine} />
        <span>Scroll</span>
      </button>
    </section>
  );
}
