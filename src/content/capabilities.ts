export interface Capability {
  id: string;
  title: string;
  description: string;
  /** Public-folder image shown in the capability panel. */
  image: string;
}

export const capabilities: Capability[] = [
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    description: "Designing networks, compute, and storage across managed cloud providers.",
    image: "/Neon Cloud Infrastructure Blueprint.png",
  },
  {
    id: "containerization",
    title: "Containerization",
    description: "Packaging applications into portable, reproducible container images.",
    image: "/Neon Docker Containerization Hub.png",
  },
  {
    id: "orchestration",
    title: "Orchestration",
    description: "Running and scaling containerized workloads with Kubernetes.",
    image: "/Neon Kubernetes Orchestration Hub.png",
  },
  {
    id: "cicd",
    title: "CI/CD",
    description: "Automating build, test, and release so shipping is routine, not risky.",
    image: "/Neon CI_CD Pipeline with Jenkins and Kubernetes.png",
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    description: "Defining infrastructure declaratively, reviewed and versioned like application code.",
    image: "/Terraform Infrastructure as Code Hub.png",
  },
  {
    id: "observability",
    title: "Observability",
    description: "Instrumenting systems with metrics, logs, and traces that explain behavior.",
    image: "/Neon Observability Dashboard Flow.png",
  },
  {
    id: "security",
    title: "Security",
    description: "Hardening pipelines, secrets, and infrastructure against common failure modes.",
    image: "/Neon DevSecOps Security Shield Infographic.png",
  },
  {
    id: "ai-ops",
    title: "AI-Assisted Operations",
    description: "Using AI tooling to assist triage, anomaly detection, and operational workflows.",
    image: "/AI-Assisted Operations Neon Infographic.png",
  },
];
