import { useRef, useState } from "react";
import { capabilities } from "../../content/capabilities";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(capabilities[0].id);
  useScrollReveal(ref, { selector: `.${"reveal"}`, y: 24, start: "top 80%" });

  const active = capabilities.find((c) => c.id === activeId) ?? capabilities[0];

  return (
    <section id="capabilities" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Engineering Capabilities</span>
          <h2 className={styles.title}>What this series builds in you.</h2>
        </div>

        <div ref={ref} className={styles.layout}>
          <ul className={`${styles.list} reveal`} role="list">
            {capabilities.map((capability) => (
              <li key={capability.id}>
                <button
                  type="button"
                  className={`${styles.item} ${activeId === capability.id ? styles.itemActive : ""}`}
                  onMouseEnter={() => setActiveId(capability.id)}
                  onFocus={() => setActiveId(capability.id)}
                  onClick={() => setActiveId(capability.id)}
                >
                  <span className={styles.itemMarker} aria-hidden="true" />
                  <span className={styles.itemTitle}>{capability.title}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className={`${styles.panel} reveal`} aria-live="polite">
            <div className={styles.panelMedia}>
              <img
                key={active.id}
                src={active.image}
                alt={active.title}
                className={styles.panelImage}
                loading="lazy"
                draggable={false}
              />
            </div>
            <h3 className={styles.panelTitle}>{active.title}</h3>
            <p className={styles.panelDescription}>{active.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
