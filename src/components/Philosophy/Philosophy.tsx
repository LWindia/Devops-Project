import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { ensureGsap } from "../../lib/gsap";
import { tools } from "../../content/tools";
import { toolIconMap } from "../icons/ToolIcons";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { stages } from "./stages";
import styles from "./Philosophy.module.css";

/** How long each stage stays active before auto-advancing (ms). */
const STAGE_MS = 5200;

const pad = (n: number) => String(n).padStart(2, "0");

/** Cursor-following spotlight on bento tiles (fine pointers only, via CSS). */
const trackSpotlight = (e: PointerEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const slotRef = useRef<HTMLSpanElement>(null);
  const verbRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);

  const autoplay = !reducedMotion;
  const paused = hovering || !inView;
  const stage = stages[active];
  const next = () => setActive((i) => (i + 1) % stages.length);

  useScrollReveal(sectionRef, { y: 28, stagger: 0.07, start: "top 78%" });

  // Size the verb slot to the active word so the sentence never has a gap.
  useLayoutEffect(() => {
    const slot = slotRef.current;
    const verb = verbRefs.current[active];
    if (!slot || !verb) return;
    const size = () => {
      slot.style.width = `${verb.offsetWidth}px`;
    };
    size();
    document.fonts?.ready.then(size);
    window.addEventListener("resize", size);
    return () => window.removeEventListener("resize", size);
  }, [active]);

  // Only cycle while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Strike-through draws across "run commands" on first view.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || reducedMotion) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.strike}`,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut", delay: 0.5, scrollTrigger: { trigger: root, start: "top 70%", once: true } }
      );
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + stages.length) % stages.length;
    setActive(n);
    tabRefs.current[n]?.focus();
  };

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="philosophy-title"
      style={{ "--stage-ms": `${STAGE_MS}ms` } as CSSProperties}
    >
      <div className={styles.aura} aria-hidden="true" />

      <div className="container">
        {/* ── Header: one editorial statement + intro ── */}
        <header className={styles.header}>
          <div className={styles.headMain}>
            <span className="eyebrow reveal">Engineering Philosophy</span>
            <h2 id="philosophy-title" className={`${styles.statement} reveal`}>
              <span className={styles.muted}>
                Most tutorials teach you to{" "}
                <span className={styles.nowrap}>
                  <span className={styles.struck}>
                    run commands
                    <span className={styles.strike} aria-hidden="true" />
                  </span>
                  .
                </span>
              </span>{" "}
              This series teaches you to{" "}
              <span ref={slotRef} className={styles.verbSlot} aria-live="polite">
                {stages.map((s, i) => (
                  <span
                    key={s.id}
                    ref={(el) => {
                      verbRefs.current[i] = el;
                    }}
                    className={styles.verb}
                    data-state={i === active ? "on" : i < active ? "past" : "next"}
                    aria-hidden={i !== active}
                  >
                    {s.verb.toLowerCase()}
                  </span>
                ))}
              </span>{" "}
              the systems behind production software.
            </h2>
          </div>
          <p className={`${styles.intro} reveal`}>
            Every project moves beyond copy-pasted commands into the full lifecycle of an engineering system — from the
            first architecture decision to the alert that wakes someone up at 3am.
          </p>
        </header>

        {/* ── Bento ── */}
        <div className={styles.bento} onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
          {/* Tile 1: lifecycle console */}
          <article className={`${styles.tile} ${styles.console} reveal`} onPointerMove={trackSpotlight}>
            <div className={styles.tabs} role="tablist" aria-label="Engineering lifecycle stages">
              {stages.map((s, i) => (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`phil-tab-${s.id}`}
                  aria-selected={i === active}
                  aria-controls="phil-panel"
                  tabIndex={i === active ? 0 : -1}
                  className={styles.tab}
                  data-on={i === active}
                  data-done={i < active}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <span className={styles.tabNum}>{pad(i + 1)}</span>
                  <span className={styles.tabLabel}>{s.verb}</span>
                  <span className={styles.tabBar} aria-hidden="true">
                    {i === active && autoplay ? (
                      <span
                        key={`${s.id}-${active}`}
                        className={styles.tabFill}
                        data-paused={paused}
                        onAnimationEnd={next}
                      />
                    ) : (
                      <span className={styles.tabFillStatic} data-full={i < active || (i === active && !autoplay)} />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <div id="phil-panel" role="tabpanel" aria-labelledby={`phil-tab-${stage.id}`} className={styles.panel}>
              <div key={stage.id} className={styles.panelText}>
                <span className={styles.panelKicker}>
                  Stage {pad(active + 1)} / {pad(stages.length)}
                </span>
                <h3 className={styles.panelVerb}>{stage.verb}</h3>
                <p className={styles.panelSummary}>{stage.summary}</p>
                <ul className={styles.panelTools} role="list">
                  {stage.tools.map((id) => {
                    const t = tools.find((x) => x.id === id);
                    return t ? <li key={id}>{t.name}</li> : null;
                  })}
                </ul>
              </div>

              <div key={`${stage.id}-card`} className={styles.term}>
                <div className={styles.termHead}>
                  <span className={styles.termDots} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.termFile}>{stage.artifact}</span>
                </div>
                <div className={styles.termBody}>
                  {stage.lines.map((line, i) => (
                    <code key={i} className={styles.termLine} data-tone={line.tone ?? "plain"} style={{ "--l": i } as CSSProperties}>
                      {line.text}
                    </code>
                  ))}
                  <span className={styles.caret} aria-hidden="true" />
                </div>
              </div>
            </div>
          </article>

          {/* Tile 2: the loop */}
          <article className={`${styles.tile} ${styles.loopTile} reveal`} onPointerMove={trackSpotlight}>
            <div className={styles.tileHead}>
              <h3 className={styles.tileTitle}>A loop, not a line</h3>
              <p className={styles.tileCaption}>Every incident feeds the next design.</p>
            </div>
            <div className={styles.loop} style={{ "--a": active } as CSSProperties}>
              <svg viewBox="0 0 200 200" className={styles.ring} aria-hidden="true">
                <circle className={styles.ringTrack} cx="100" cy="100" r="70" />
                <circle
                  className={styles.ringArc}
                  cx="100"
                  cy="100"
                  r="70"
                  pathLength={100}
                  strokeDasharray="100 100"
                  strokeDashoffset={100 - active * 25}
                  transform="rotate(-90 100 100)"
                />
              </svg>
              {stages.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={styles.loopNode}
                  data-pos={i}
                  data-on={i === active}
                  data-done={i < active}
                  onClick={() => setActive(i)}
                  aria-label={`Show stage ${i + 1}: ${s.verb}`}
                >
                  {s.verb}
                </button>
              ))}
              <span className={styles.loopCore} aria-hidden="true">
                ↻
              </span>
            </div>
          </article>

          {/* Tile 3: tools */}
          <article className={`${styles.tile} ${styles.toolsTile} reveal`} onPointerMove={trackSpotlight}>
            <div className={styles.tileHead}>
              <h3 className={styles.tileTitle}>Real tools. Real workflows.</h3>
              <p className={styles.tileCaption}>The same ecosystem modern teams run, end to end.</p>
            </div>
            <ul className={styles.toolGrid} role="list">
              {tools.map((t) => {
                const Icon = toolIconMap[t.id];
                const lit = stage.tools.includes(t.id);
                return (
                  <li key={t.id} className={styles.tool} data-lit={lit}>
                    <Icon className={styles.toolIcon} aria-hidden="true" />
                    <span>{t.name}</span>
                  </li>
                );
              })}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
