import { useEffect, useRef, useState } from "react";
import { pipelineStages } from "../../content/pipeline";
import { ensureGsap } from "../../lib/gsap";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTypewriter } from "../../hooks/useTypewriter";
import styles from "./PipelineFlow.module.css";

const lastIndex = pipelineStages.length - 1;
const PIN_PX_PER_STAGE = 190;

export function PipelineFlow() {
  const pinRef = useRef<HTMLDivElement>(null);
  // The whole section body (header + flow + console) is what gets pinned, so the
  // viewport is never left half-empty while the stages step through.
  const stageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useScrollReveal(pinRef, { selector: `.${"reveal"}`, y: 24, start: "top 80%" });

  const activeLine = pipelineStages[activeIndex]?.logLine ?? "";
  const typedActive = useTypewriter([activeLine], {
    active: true,
    reducedMotion,
    charsPerTick: 2,
    tickMs: 14,
  })[0];

  useEffect(() => {
    const container = pinRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    if (reducedMotion) {
      setActiveIndex(lastIndex);
      if (lineRef.current) lineRef.current.style.transform = "scaleX(1)";
      return;
    }

    const { gsap, ScrollTrigger } = ensureGsap();
    const canPin =
      window.matchMedia("(min-width: 980px)").matches &&
      window.matchMedia("(min-height: 560px)").matches;
    setPinned(canPin);

    const ctx = gsap.context(() => {
      if (canPin) {
        // Centre the pinned block in the space below the fixed nav; if it's
        // taller than that space, pin it just under the nav instead.
        const NAV = 80;
        const pinStart = () => {
          const free = window.innerHeight - NAV;
          const h = stage.offsetHeight;
          return h < free ? `top ${Math.round(NAV + (free - h) / 2)}px` : `top ${NAV}px`;
        };
        ScrollTrigger.create({
          trigger: stage,
          start: pinStart,
          end: `+=${lastIndex * PIN_PX_PER_STAGE}`,
          pin: true,
          invalidateOnRefresh: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * lastIndex);
            setActiveIndex((prev) => (prev === idx ? prev : idx));
            if (lineRef.current) gsap.set(lineRef.current, { scaleX: self.progress });
          },
        });
      } else {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            transformOrigin: "left center",
            scrollTrigger: { trigger: container, start: "top 78%", once: true },
          }
        );
        ScrollTrigger.create({
          trigger: container,
          start: "top 80%",
          once: true,
          onEnter: () => setActiveIndex(lastIndex),
        });
      }
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="pipeline" className="section">
      <div ref={stageRef} className="container">
        <div className={styles.header}>
          <div>
            <span className="eyebrow">Infrastructure in Motion</span>
            <h2 className={styles.title}>From code to production.</h2>
          </div>
          <p className={`lead ${styles.headerLead}`}>
            A representative engineering workflow this series builds toward. This is a conceptual
            demonstration of the pipeline shape — not a live, connected deployment system.
            {pinned && " Keep scrolling to step through each stage."}
          </p>
        </div>

        <div ref={pinRef} className={styles.layout}>
          <div className={`${styles.flow} panel-hud reveal`}>
            <div className={styles.lineTrack}>
              <div ref={lineRef} className={styles.lineFill} />
            </div>
            <div className={styles.nodes}>
              {pipelineStages.map((stage, i) => {
                const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "pending";
                return (
                  <div
                    key={stage.index}
                    className={`${styles.node} ${styles[`node_${state}`]}`}
                    aria-current={state === "active" ? "step" : undefined}
                  >
                    <span className={styles.nodeIndex}>{stage.index}</span>
                    <span className={styles.nodeDot} />
                    <h3 className={styles.nodeTitle}>{stage.title}</h3>
                    <p className={styles.nodeDetail}>{stage.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`${styles.console} panel-hud reveal`} aria-live="polite">
            <div className={styles.consoleHead}>
              <span className={styles.dotRed} />
              <span className={styles.dotAmber} />
              <span className={styles.dotGreen} />
              <span className={styles.consoleTitle}>pipeline.log</span>
            </div>
            <div className={styles.consoleBody}>
              {pipelineStages.map((stage, i) => {
                if (i > activeIndex) return null;
                const isActiveLine = i === activeIndex;
                const text = isActiveLine ? typedActive : stage.logLine;
                const lineComplete = !isActiveLine || text === stage.logLine;
                return (
                  <p key={stage.index} className={styles.logLine}>
                    <span className={lineComplete ? styles.logCheck : styles.logPending}>
                      {lineComplete ? "✓" : "›"}
                    </span>
                    {text}
                    {!lineComplete && <span className={styles.caret} />}
                  </p>
                );
              })}
              {activeIndex === lastIndex && typedActive === activeLine && (
                <p className={styles.logDone}>Pipeline demonstration complete.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
