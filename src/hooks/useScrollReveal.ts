import { useEffect, type RefObject } from "react";
import { ensureGsap } from "../lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface RevealOptions {
  selector?: string;
  stagger?: number;
  y?: number;
  start?: string;
  once?: boolean;
  /**
   * When true, each matching element gets its own ScrollTrigger (via
   * ScrollTrigger.batch) instead of one trigger animating the whole group
   * together. Use for long lists where items should reveal progressively
   * as the user scrolls past each one, not all at once when the list top
   * enters view.
   */
  batch?: boolean;
}

/**
 * Reveals elements matching `selector` (default .reveal) within the
 * container on scroll, staggered. No-ops visually when reduced motion is
 * preferred — content is already visible via the .reduced-motion CSS rule.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  containerRef: RefObject<T>,
  options: RevealOptions = {}
) {
  const reducedMotion = usePrefersReducedMotion();
  const {
    selector = ".reveal",
    stagger = 0.08,
    y = 28,
    start = "top 82%",
    once = true,
    batch = false,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(selector, container);
      if (!targets.length) return;

      if (batch) {
        ScrollTrigger.batch(targets, {
          start,
          once,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { opacity: 0, y },
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger }
            ),
        });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: container,
            start,
            once,
          },
        }
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [containerRef, reducedMotion, selector, stagger, y, start, once, batch]);
}
