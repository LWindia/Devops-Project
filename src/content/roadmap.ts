export interface RoadmapStep {
  index: string;
  title: string;
  /** one-line description of what the step covers */
  summary?: string;
  /** tools / topics shown as chips */
  tools?: string[];
}

export const roadmapSteps: RoadmapStep[] = [
  {
    index: "01",
    title: "Linux & Shell Scripting",
    summary: "Navigate servers, manage processes and automate everyday chores with Bash.",
    tools: ["Linux", "Bash"],
  },
  {
    index: "02",
    title: "Version Control with Git",
    summary: "Branches, pull requests and the collaboration workflows teams actually use.",
    tools: ["Git", "GitHub"],
  },
  {
    index: "03",
    title: "CI/CD Automation",
    summary: "Pipelines that build, test and ship every commit without manual steps.",
    tools: ["Jenkins", "GitLab CI"],
  },
  {
    index: "04",
    title: "Containers with Docker",
    summary: "Package applications into portable, reproducible images.",
    tools: ["Docker", "Compose"],
  },
  {
    index: "05",
    title: "Kubernetes Orchestration",
    summary: "Deploy, scale and self-heal workloads across a cluster.",
    tools: ["Kubernetes", "Helm"],
  },
  {
    index: "06",
    title: "Infrastructure as Code",
    summary: "Provision cloud resources from versioned, reviewable code.",
    tools: ["Terraform"],
  },
  {
    index: "07",
    title: "Cloud Deployment",
    summary: "Run real workloads on AWS — networking, compute and storage.",
    tools: ["AWS"],
  },
  {
    index: "08",
    title: "Monitoring & Logging",
    summary: "Metrics, dashboards and alerts that surface problems before users do.",
    tools: ["Prometheus", "Grafana"],
  },
  {
    index: "09",
    title: "Security & Best Practices",
    summary: "Secrets, least privilege and scanning built into the delivery pipeline.",
    tools: ["IAM", "DevSecOps"],
  },
  {
    index: "10",
    title: "Real-World Projects",
    summary: "Bring every layer together in end-to-end, production-style builds.",
    tools: ["Capstone"],
  },
];

export interface RoadmapPhase {
  id: string;
  name: string;
  tagline: string;
  /** indexes into roadmapSteps */
  steps: string[];
}

export const roadmapPhases: RoadmapPhase[] = [
  { id: "foundations", name: "Foundations", tagline: "The ground every system stands on", steps: ["01", "02"] },
  { id: "build", name: "Build & Ship", tagline: "Automate the path from commit to artifact", steps: ["03", "04"] },
  { id: "orchestrate", name: "Orchestrate & Provision", tagline: "Run it at scale, defined in code", steps: ["05", "06", "07"] },
  { id: "operate", name: "Operate & Deliver", tagline: "Keep it healthy, secure and real", steps: ["08", "09", "10"] },
];

export interface Outcome {
  id: string;
  title: string;
}

export const outcomes: Outcome[] = [
  { id: "cicd", title: "Automated CI/CD Pipelines" },
  { id: "k8s", title: "Deployed Applications on Kubernetes" },
  { id: "iac", title: "Infrastructure as Code Modules" },
  { id: "monitoring", title: "Monitoring & Alerting Setup" },
  { id: "dr", title: "Disaster Recovery Strategies" },
  { id: "security", title: "Security & Best Practices" },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Do I need prior DevOps experience?",
    answer:
      "No. The series starts from fundamentals — Linux and version control — before moving into containers, orchestration, and cloud infrastructure.",
  },
  {
    question: "Which tools and cloud platform are used?",
    answer:
      "Linux, Git, Docker, Kubernetes, Terraform, Jenkins, GitLab, Prometheus, and Grafana, provisioned on AWS.",
  },
  {
    question: "Are these real-world projects or tutorials?",
    answer:
      "Each project is scoped as an engineering case study: a problem, an architecture, an implementation, and the operational considerations that come with running it.",
  },
  {
    question: "Can I work on my own infrastructure?",
    answer:
      "Yes. Every project is designed so the infrastructure-as-code and pipeline definitions can be adapted to your own cloud account.",
  },
  {
    question: "Is there a structured learning path?",
    answer:
      "Yes — the roadmap moves from scripting and version control through containerization, orchestration, and into production-grade operations.",
  },
];
