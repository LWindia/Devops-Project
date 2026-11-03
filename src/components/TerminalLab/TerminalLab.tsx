import { useEffect, useRef, useState } from "react";
import { terminalTabs, labStats } from "../../content/terminal";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTypewriter } from "../../hooks/useTypewriter";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./TerminalLab.module.css";

export function TerminalLab() {
  const ref = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(terminalTabs[0].id);
  const [inView, setInView] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  useScrollReveal(ref, { selector: `.${"reveal"}`, y: 24, start: "top 80%" });

  const tab = terminalTabs.find((t) => t.id === activeTab) ?? terminalTabs[0];
  const typedLines = useTypewriter(tab.lines, {
    active: inView,
    reducedMotion,
    charsPerTick: 3,
    tickMs: 10,
    lineGap: 1,
  });

  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="lab" className="section">
      <div className="container">
        <div ref={ref} className={styles.layout}>
          <div className={`${styles.intro} reveal`}>
            <span className="eyebrow">The Engineering Lab</span>
            <h2 className={styles.title}>Try. Break. Fix. Learn.</h2>
            <p className="lead">
              A hands-on terminal environment to practice deployments, inspect running services, and
              troubleshoot like a DevOps engineer — not just read about it.
            </p>

            <ul className={styles.statList}>
              {labStats.map((stat) => (
                <li key={stat.label} className={styles.statItem}>
                  <span className={`${styles.statDot} ${styles[`tone-${stat.tone}`]}`} />
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statValue}>{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div ref={terminalRef} className={`${styles.terminal} panel-hud reveal`}>
            <div className={styles.terminalHead}>
              <div className={styles.chrome}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <div className={styles.tabs} role="tablist" aria-label="Terminal context">
                {terminalTabs.map((t) => (
                  <button
                    key={t.id}
                    id={`lab-tab-${t.id}`}
                    role="tab"
                    type="button"
                    aria-selected={activeTab === t.id}
                    aria-controls="lab-tabpanel"
                    className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <pre id="lab-tabpanel" className={styles.terminalBody} role="tabpanel" aria-labelledby={`lab-tab-${activeTab}`}>
              {tab.lines.map((line, i) => (
                <code key={i} className={line.startsWith("$") ? styles.prompt : undefined}>
                  {typedLines[i] ?? ""}
                  {"\n"}
                </code>
              ))}
              <span className={styles.cursor} aria-hidden="true" />
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
