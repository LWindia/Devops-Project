import { useEffect, useRef, type CSSProperties } from "react";
import { ensureGsap } from "../../lib/gsap";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./PhilosophyStatement.module.css";

const phases = ["Design", "Deploy", "Operate", "Improve"];

export function PhilosophyStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  useScrollReveal(ref, { selector: `.${"reveal"}`, y: 36, stagger: 0.1, start: "top 78%" });

  // Verb scroller (adapted from codepen.io/jh3y/pen/MYgaaem): the lead-in is
  // CSS-sticky at viewport centre while the verbs scroll past it, and the one
  // crossing the centre is lit. Each verb owns a `--lit` custom property
  // (0 = dim, 1 = lit) that drives its colour in CSS; this effect is its only
  // writer. Every verb defaults to --lit: 1 in CSS, so reduced motion, <768px
  // and no-JS all show the full phrase lit and static.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || reducedMotion) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const mm = gsap.matchMedia(scroller);
    mm.add("(min-width: 768px)", () => {
      const items = gsap.utils.toArray<HTMLElement>(`.${styles.phase}`, scroller);
      if (items.length < 2) return;

      // The pen's crossfade, computed from one progress value instead of two
      // overlapping to() tweens per verb (those fight on scrub reversal and
      // leave verbs ahead stuck lit): verb k is fully lit when it's centred
      // and fades linearly to 0 as its neighbour reaches centre.
      const last = items.length - 1;
      const apply = (p: number) => {
        items.forEach((el, k) => {
          const lit = Math.max(0, 1 - Math.abs(p * last - k));
          el.style.setProperty("--lit", lit.toFixed(3));
        });
      };
      const progress = { p: 0 };
      apply(0);
      const dimmer = gsap.to(progress, { p: 1, ease: "none", onUpdate: () => apply(progress.p) });

      // Range: first verb's centre → last verb's centre crossing the viewport
      // centre. Measured with offsetTop (layout position, ignores transforms)
      // relative to the untransformed scroller box, because the verbs' list
      // is still translated by the reveal tween when this is first computed —
      // getBoundingClientRect-based "center center" would bake that 36px in.
      // Summed along the offsetParent chain: the reveal's transform makes the
      // <ul> the verbs' offsetParent, so a single offsetTop isn't comparable
      // with the scroller's.
      const layoutTop = (el: HTMLElement) => {
        let top = 0;
        for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
        return top;
      };
      const centreIn = (el: HTMLElement) => layoutTop(el) - layoutTop(scroller) + el.offsetHeight / 2;
      ScrollTrigger.create({
        trigger: scroller,
        start: () => `top+=${centreIn(items[0])} center`,
        end: () => `top+=${centreIn(items[items.length - 1])} center`,
        animation: dimmer,
        scrub: 0.2,
        invalidateOnRefresh: true,
      });

      // Inline --lit is written directly (not via gsap.set), so clear it on
      // revert: back to the CSS default of fully lit.
      return () => items.forEach((el) => el.style.removeProperty("--lit"));
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <div ref={ref} className={styles.wrap}>
      <span className={`eyebrow reveal ${styles.eyebrow}`}>Engineering Philosophy</span>

      <div className={styles.statement}>
        <p className={`reveal ${styles.line}`}>
          Most tutorials teach you to <span className={styles.struck}>run commands</span>.
        </p>

        <div ref={scrollerRef} className={styles.scroller}>
          <p className={`reveal ${styles.leadIn}`}>
            <span className={styles.leadLine}>This series</span>{" "}
            <span className={styles.leadLine}>teaches you to</span>
          </p>
          <ul className={`reveal ${styles.phases}`} role="list">
            {phases.map((phase, i) => (
              <li key={phase} className={styles.phase} style={{ "--i": i } as CSSProperties}>
                {phase}
              </li>
            ))}
          </ul>
        </div>

        <p className={`reveal ${styles.line}`}>the systems behind production software.</p>
      </div>

      <p className={`lead reveal ${styles.sub}`}>
        Every project in this series moves beyond copy-pasted commands into the full lifecycle of an
        engineering system — from the first architecture decision to the alert that wakes someone up
        at 3am.
      </p>
    </div>
  );
}
