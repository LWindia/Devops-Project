import { useEffect, useRef } from "react";
import { ensureGsap } from "../../lib/gsap";
import styles from "./ScrollProgress.module.css";

/**
 * Fixed reading-progress bar. Not gated behind prefers-reduced-motion: it's
 * a direct, un-eased readout of scroll position (an accessible UI signal),
 * not decorative motion.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  );
}
