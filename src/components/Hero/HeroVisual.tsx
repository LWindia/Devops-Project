import { useEffect, useRef, type RefObject } from "react";
import { ensureGsap } from "../../lib/gsap";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./HeroVisual.module.css";

type HeroVisualProps = {
  /** Element that owns the single `pointermove` listener (the hero section). */
  pointerRootRef: RefObject<HTMLElement>;
};

export function HeroVisual({ pointerRootRef }: HeroVisualProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  // gridRef kept so Hero.tsx's scroll exit timeline selector compiles;
  // it targets .visualParallax (a wrapper in Hero.tsx), not this ref directly.
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = pointerRootRef.current;
    if (!root || reducedMotion) return;

    const { gsap } = ensureGsap();
    const mm = gsap.matchMedia();
    mm.add(
      {
        full: "(min-width: 1024px) and (pointer: fine)",
        tablet: "(min-width: 768px) and (max-width: 1023.98px) and (pointer: fine)",
      },
      (context) => {
        const { full } = context.conditions as { full: boolean; tablet: boolean };
        const opts = (d: number) => ({ duration: d, ease: "power3.out" });

        const setImage = gsap.quickTo(imageRef.current, "x", opts(0.7));
        const setImageY = gsap.quickTo(imageRef.current, "y", opts(0.7));
        const setGlow = gsap.quickTo(glowRef.current, "x", opts(1.1));

        // Full tier: subtle parallax on the image + glow.
        // Tablet tier: image only, reduced displacement.
        const dispX = full ? -6 : -3;
        const dispY = full ? -4 : -2;

        const handleMove = (event: PointerEvent) => {
          const rect = root.getBoundingClientRect();
          const relX = (event.clientX - rect.left) / rect.width - 0.5;
          const relY = (event.clientY - rect.top) / rect.height - 0.5;
          setImage(relX * dispX);
          setImageY(relY * dispY);
          if (full) setGlow(relX * 24);
        };

        root.addEventListener("pointermove", handleMove);
        return () => root.removeEventListener("pointermove", handleMove);
      }
    );

    return () => mm.revert();
  }, [reducedMotion, pointerRootRef]);

  return (
    <div className={styles.visual} aria-hidden="true">
      {/* Layer 0 — atmospheric glow (scroll exit timeline writes opacity) */}
      <div ref={glowRef} className={styles.glow} data-scene-layer="glow" />

      {/* Hero image — replaces the SVG tower scene */}
      <img
        ref={imageRef}
        src="/hero.webp"
        width={1536}
        height={1024}
        fetchPriority="high"
        alt=""
        className={styles.heroImage}
        draggable={false}
      />
    </div>
  );
}
