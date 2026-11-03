export interface ProjectDetail {
  label: string;
  value: string;
}

export interface Project {
  number: string;
  slug: string;
  title: string;
  domain: string;
  description: string;
  tech: string[];
  challenge: string;
  architecture: string[];
  implementation: string[];
  operations: string[];
}

export const projects: Project[] = [
  {
    number: "01",
    slug: "ecommerce-kubernetes",
    title: "E-Commerce Platform on Kubernetes",
    domain: "Container Orchestration",
    description:
      "A full-stack application containerized and deployed on Kubernetes, with CI/CD automation, horizontal scaling, and layered observability.",
    tech: ["Docker", "Kubernetes", "AWS", "GitHub Actions"],
    challenge:
      "Take a traditionally deployed web application and re-architect it for container orchestration — without downtime, and without losing the ability to roll back quickly when something breaks.",
    architecture: [
      "React/Next.js frontend served behind a load balancer",
      "Stateless API service replicated across pods",
      "PostgreSQL with persistent volume claims",
      "Horizontal Pod Autoscaler reacting to CPU and memory pressure",
    ],
    implementation: [
      "Multi-stage Dockerfiles to keep runtime images small",
      "Kubernetes manifests managed with Kustomize overlays per environment",
      "Rolling updates with readiness and liveness probes",
      "Secrets managed outside of version control",
    ],
    operations: [
      "Pod-level resource requests and limits tuned from real usage",
      "Centralized logs and dashboards for request latency",
      "Documented rollback procedure for failed deployments",
    ],
  },
  {
    number: "02",
    slug: "cicd-jenkins-gitlab",
    title: "CI/CD Pipeline with Jenkins & GitLab",
    domain: "Continuous Delivery",
    description:
      "An automated build, test, and deployment pipeline that turns a git push into a verified, versioned release — with no manual steps in between.",
    tech: ["Jenkins", "GitLab", "Docker"],
    challenge:
      "Replace manual, error-prone deployments with a pipeline that is fast enough to run on every commit, and trustworthy enough that a green build actually means the build is safe to ship.",
    architecture: [
      "GitLab as the source of truth, triggering Jenkins via webhooks",
      "Declarative Jenkins pipeline split into build, test, and deploy stages",
      "Immutable Docker images tagged by commit SHA",
      "Separate pipelines for pull requests and main branch merges",
    ],
    implementation: [
      "Shared pipeline library to avoid duplicating stage logic",
      "Automated unit and integration test gates before packaging",
      "Image signing and vulnerability scanning before push",
    ],
    operations: [
      "Pipeline run history and failure notifications",
      "Blue/green rollout for the deploy stage",
      "Clear audit trail from commit to running artifact",
    ],
  },
  {
    number: "03",
    slug: "infrastructure-as-code-terraform",
    title: "Infrastructure as Code with Terraform",
    domain: "Cloud Infrastructure",
    description:
      "Reproducible cloud infrastructure defined entirely in code — version-controlled, peer-reviewed, and provisioned the same way every time.",
    tech: ["Terraform", "AWS", "VPC"],
    challenge:
      "Move away from manually clicking through a cloud console, where configuration drifts silently, toward infrastructure that can be reviewed, tested, and rebuilt from scratch on demand.",
    architecture: [
      "VPC with public and private subnets across availability zones",
      "Modular Terraform structure separating network, compute, and data layers",
      "Remote state with locking to support concurrent collaboration",
    ],
    implementation: [
      "Reusable modules for common resource patterns",
      "Environment-specific variable files for dev, staging, and production",
      "Plan review required before any apply reaches shared infrastructure",
    ],
    operations: [
      "Drift detection to catch manual out-of-band changes",
      "Tagged resources for cost visibility",
      "Destroy-and-recreate tested in a disposable sandbox account",
    ],
  },
  {
    number: "04",
    slug: "monitoring-prometheus-grafana",
    title: "Monitoring Stack with Prometheus & Grafana",
    domain: "Observability",
    description:
      "A metrics and alerting stack that turns raw system signals into dashboards and alerts engineers can actually act on.",
    tech: ["Prometheus", "Grafana", "Loki"],
    challenge:
      "Give engineers visibility into system health without drowning them in noisy alerts — surface the signals that matter before small issues become incidents.",
    architecture: [
      "Prometheus scraping service and node-level metrics",
      "Grafana dashboards layered by service, cluster, and business metric",
      "Loki for structured log aggregation alongside metrics",
    ],
    implementation: [
      "Alerting rules tuned against historical baselines",
      "Dashboard-as-code so views are versioned with the services they monitor",
      "Service-level objectives tracked alongside raw metrics",
    ],
    operations: [
      "On-call runbooks linked directly from alert annotations",
      "Retention and downsampling policy for long-term metric storage",
      "Regular review of alert noise versus real incidents",
    ],
  },
  {
    number: "05",
    slug: "disaster-recovery-ha",
    title: "Disaster Recovery & High Availability",
    domain: "Resilience Engineering",
    description:
      "A resilience strategy covering backup automation, multi-AZ redundancy, and tested failover procedures for production workloads.",
    tech: ["Kubernetes", "AWS", "Backup Automation"],
    challenge:
      "Design for the failures that are inevitable at scale — a lost availability zone, a corrupted database, a bad deploy — so recovery is a rehearsed procedure, not a scramble.",
    architecture: [
      "Workloads distributed across multiple availability zones",
      "Automated, versioned backups with defined retention windows",
      "Health-check-driven failover for stateless services",
    ],
    implementation: [
      "Scheduled backup jobs with integrity verification",
      "Documented recovery point and recovery time objectives",
      "Infrastructure definitions kept portable across regions",
    ],
    operations: [
      "Periodic failover drills in a non-production environment",
      "Runbooks for partial and full region failure scenarios",
      "Post-drill review feeding back into the recovery plan",
    ],
  },
];
