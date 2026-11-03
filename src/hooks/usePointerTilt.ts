import { useEffect, type RefObject } from "react";
import { ensureGsap } from "../lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface PointerTiltOptions {
  maxTilt?: number;
  liftScale?: number;
}

/**
 * Restrained pointer-reactive 3D tilt for a panel-like element. Fine-pointer
 * devices only; disabled under reduced motion and on touch. Never blocks
 * clicks, scroll, or text selection — it only transforms the element.
 */
export function usePointerTilt<T extends HTMLElement>(
  ref: RefObject<T>,
  options: PointerTiltOptions = {}
) {
  const { maxTilt = 5, liftScale = 1.015 } = options;
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const { gsap } = ensureGsap();
    gsap.set(el, { transformPerspective: 800 });
    const setRotateX = gsap.quickTo(el, "rotateX", { duration: 0.45, ease: "power3.out" });
    const setRotateY = gsap.quickTo(el, "rotateY", { duration: 0.45, ease: "power3.out" });
    const setScale = gsap.quickTo(el, "scale", { duration: 0.45, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      setRotateX(relY * -maxTilt);
      setRotateY(relX * maxTilt);
      setScale(liftScale);
    };

    const handleLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setScale(1);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [ref, reducedMotion, maxTilt, liftScale]);
}
