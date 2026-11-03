import { useEffect, useRef } from "react";
import { ensureGsap } from "../../lib/gsap";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./ArchitectureDiagram.module.css";

const nodes = [
  { id: "users", label: "Users", x: 40, y: 150 },
  { id: "lb", label: "Load Balancer", x: 190, y: 150 },
  { id: "frontend", label: "Frontend", x: 360, y: 60 },
  { id: "api", label: "API Service", x: 360, y: 150 },
  { id: "db", label: "PostgreSQL", x: 360, y: 240 },
  { id: "monitoring", label: "Monitoring", x: 540, y: 150 },
];

const edges: Array<[string, string]> = [
  ["users", "lb"],
  ["lb", "frontend"],
  ["lb", "api"],
  ["api", "db"],
  ["api", "monitoring"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

interface ArchitectureDiagramProps {
  /** Node ids to emphasize. Omit to keep every node at full emphasis. */
  highlightIds?: string[];
}

export function ArchitectureDiagram({ highlightIds }: ArchitectureDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reducedMotion) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>(`.${styles.edge}`, svg);
      const dots = gsap.utils.toArray<SVGCircleElement>(`.${styles.node}`, svg);

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 75%", once: true },
      });

      tl.to(paths, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", stagger: 0.18 }).fromTo(
        dots,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.12 },
        "-=1.1"
      );
    }, svg);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <svg ref={svgRef} className={styles.diagram} viewBox="0 0 600 300" role="img" aria-label="Architecture diagram: users connect through a load balancer to the frontend and API service, the API talks to PostgreSQL, and both the API and frontend are observed by the monitoring stack.">
      {edges.map(([from, to]) => {
        const a = byId[from];
        const b = byId[to];
        const midX = (a.x + b.x) / 2;
        return (
          <path
            key={`${from}-${to}`}
            className={styles.edge}
            d={`M${a.x},${a.y} C ${midX},${a.y} ${midX},${b.y} ${b.x},${b.y}`}
            fill="none"
          />
        );
      })}

      {nodes.map((node) => {
        const dimmed = highlightIds ? !highlightIds.includes(node.id) : false;
        return (
          <g
            key={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            className={dimmed ? styles.nodeGroupDimmed : styles.nodeGroupActive}
          >
            <circle className={styles.nodeHalo} r="16" />
            <circle className={styles.node} r="7" />
            <text className={styles.label} textAnchor="middle" dy="32">
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
