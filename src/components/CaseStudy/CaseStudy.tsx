import { useRef, useState } from "react";
import { projects } from "../../content/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { usePointerTilt } from "../../hooks/usePointerTilt";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import styles from "./CaseStudy.module.css";

const featured = projects[0];

type TabId = "overview" | "architecture" | "implementation" | "operations";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "implementation", label: "Implementation" },
  { id: "operations", label: "Operations" },
];

const tabHighlights: Record<TabId, string[]> = {
  overview: ["users", "lb", "monitoring"],
  architecture: ["users", "lb", "frontend", "api", "db", "monitoring"],
  implementation: ["frontend", "api", "db"],
  operations: ["api", "monitoring"],
};

export function CaseStudy() {
  const ref = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  useScrollReveal(ref, { selector: `.${"reveal"}`, y: 24, start: "top 80%" });
  usePointerTilt(diagramRef, { maxTilt: 4, liftScale: 1.012 });

  const byPhase = (p: string) => featured.steps.filter((s) => s.phase === p).map((s) => s.text);
  const panelContent: Record<TabId, string[]> = {
    overview: [featured.failure],
    architecture: featured.stack,
    implementation: byPhase("build"),
    operations: [...byPhase("break"), ...byPhase("recover")],
  };

  return (
    <section id="case-study" className="section">
      <div className="container">
        <div ref={ref} className={styles.wrap}>
          <div className={`${styles.content} reveal`}>
            <span className="eyebrow">Project 01 · Case Study</span>
            <h2 className={styles.title}>{featured.title}</h2>
            <p className="lead">{featured.summary}</p>

            <div className={styles.tabs} role="tablist" aria-label="Case study detail">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  id={`case-tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={activeTab === tab.id}
                  aria-controls="case-tabpanel"
                  className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div id="case-tabpanel" role="tabpanel" aria-labelledby={`case-tab-${activeTab}`} className={styles.panel}>
              <ul role="list">
                {panelContent[activeTab].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={diagramRef} className={`${styles.diagramWrap} panel-hud reveal`}>
            <span className={styles.diagramLabel}>System overview</span>
            <ArchitectureDiagram highlightIds={tabHighlights[activeTab]} />
          </div>
        </div>
      </div>
    </section>
  );
}
