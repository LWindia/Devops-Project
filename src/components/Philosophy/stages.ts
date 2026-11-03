export type ArtifactLine = {
  text: string;
  /** visual tone of the line inside the artifact card */
  tone?: "cmd" | "ok" | "warn" | "muted" | "key" | "plain";
};

export interface Stage {
  id: string;
  verb: string;
  summary: string;
  /** filename / context shown in the artifact card header */
  artifact: string;
  lines: ArtifactLine[];
  /** tool ids from content/tools.ts used in this stage */
  tools: string[];
}

/**
 * The four stages of the engineering lifecycle the series walks through.
 * Artifact contents are illustrative examples of the kind of work produced
 * at each stage — not metrics or claims about real systems.
 */
export const stages: Stage[] = [
  {
    id: "design",
    verb: "Design",
    summary: "Sketch the architecture, weigh the trade-offs, and write the decision down before anything gets built.",
    artifact: "docs/adr/001-platform.md",
    lines: [
      { text: "## Context", tone: "key" },
      { text: "3 services · spiky traffic · small team", tone: "muted" },
      { text: "## Decision", tone: "key" },
      { text: "Containers on managed Kubernetes", tone: "plain" },
      { text: "+ autoscaling   − more moving parts", tone: "warn" },
    ],
    tools: ["git", "terraform", "aws"],
  },
  {
    id: "deploy",
    verb: "Deploy",
    summary: "Turn a git push into a tested, versioned release that rolls out without anyone touching a server.",
    artifact: "pipeline · main",
    lines: [
      { text: "$ git push origin main", tone: "cmd" },
      { text: "▸ build → test → push image", tone: "muted" },
      { text: "$ kubectl rollout status deploy/web", tone: "cmd" },
      { text: "✓ deployment \"web\" successfully rolled out", tone: "ok" },
    ],
    tools: ["docker", "jenkins", "kubernetes"],
  },
  {
    id: "operate",
    verb: "Operate",
    summary: "Watch it run in the wild — metrics, dashboards, and the alert that wakes someone up at 3am.",
    artifact: "alerts/web.rules.yml",
    lines: [
      { text: "● FIRING  HighErrorRate", tone: "warn" },
      { text: "expr: rate(http_5xx[5m]) > 0.05", tone: "plain" },
      { text: "for: 10m   severity: page", tone: "muted" },
      { text: "→ on-call paged · 03:00", tone: "key" },
    ],
    tools: ["linux", "prometheus", "grafana"],
  },
  {
    id: "improve",
    verb: "Improve",
    summary: "Find the root cause, fix it in code, and feed the lesson back into the next version of the system.",
    artifact: "postmortem.md",
    lines: [
      { text: "root cause: missing readiness probe", tone: "plain" },
      { text: "action: add probe + canary rollout", tone: "muted" },
      { text: "$ git commit -m \"fix: readiness probe\"", tone: "cmd" },
      { text: "✓ loop closed → back to design", tone: "ok" },
    ],
    tools: ["git", "jenkins", "grafana"],
  },
];
