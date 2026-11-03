import { useRef } from "react";
import { tools } from "../../content/tools";
import { toolIconMap } from "../icons/ToolIcons";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./TechEcosystemStrip.module.css";

export function TechEcosystemStrip() {
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const renderChips = (ariaHidden: boolean) =>
    tools.map((tool) => {
      const Icon = toolIconMap[tool.id];
      return (
        <span key={tool.id} className={styles.chip} aria-hidden={ariaHidden || undefined}>
          <Icon className={styles.icon} aria-hidden="true" />
          {tool.name}
        </span>
      );
    });

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h3 className={styles.title}>Real tools. Real workflows.</h3>
        <p className={styles.caption}>The same ecosystem used by modern engineering teams, end to end.</p>
      </div>

      <div className={`${styles.marquee} ${reducedMotion ? styles.marqueeStatic : ""}`}>
        <div ref={trackRef} className={styles.track}>
          {renderChips(false)}
          {!reducedMotion && renderChips(true)}
        </div>
      </div>
    </div>
  );
}
