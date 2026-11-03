/** Phase of an implementation step: build the system, deliberately break it, or recover/verify. */
export type StepPhase = "build" | "break" | "recover";

export interface ProjectStep {
  text: string;
  phase: StepPhase;
}

export interface Project {
  number: string;
  slug: string;
  /** Full project title */
  title: string;
  /** Short label used in the project selector */
  short: string;
  /** Engineering discipline the project belongs to */
  domain: string;
  /** One-line mission statement */
  summary: string;
  /** The failure students deliberately cause, in one line */
  failure: string;
  /** Technology stack, as listed in the syllabus */
  stack: string[];
  /** End-to-end implementation steps, in order */
  steps: ProjectStep[];
}

export const projects: Project[] = [
  {
    number: "01",
    slug: "zero-downtime-release",
    title: "Zero-Downtime Production Deployment and Release Management",
    short: "Zero-Downtime Releases",
    domain: "Release Engineering",
    summary:
      "Building a deployment system that releases application updates safely, detects failed deployments, and restores the previous stable version.",
    failure: "Ship a faulty release and watch health checks stop or roll it back.",
    stack: [
      "Git and GitLab",
      "GitLab CI/CD and GitLab Runner",
      "Docker and container registry",
      "Terraform and AWS",
      "Kubernetes and Helm",
      "Trivy and SonarQube Community Edition",
      "Prometheus and Grafana",
    ],
    steps: [
      { phase: "build", text: "Configuring a Git repository with development and production release controls." },
      { phase: "build", text: "Building a CI pipeline for code validation, testing, and security scanning." },
      { phase: "build", text: "Building and publishing immutable Docker images." },
      { phase: "build", text: "Provisioning the required cloud infrastructure using Terraform." },
      { phase: "build", text: "Deploying the application to Kubernetes using Helm." },
      { phase: "build", text: "Configuring readiness probes, rolling updates, and deployment health checks." },
      { phase: "break", text: "Introducing a faulty application release and observing the rollout." },
      { phase: "recover", text: "Stopping or rolling back the release when health checks fail." },
      { phase: "recover", text: "Implementing controlled production approvals and release audit records." },
      { phase: "recover", text: "Demonstrating backward-compatible database migrations and safe application rollbacks." },
    ],
  },
  {
    number: "02",
    slug: "multi-environment-governance",
    title: "Multi-Environment Cloud Infrastructure Provisioning and Governance",
    short: "Cloud Infrastructure & Governance",
    domain: "Infrastructure as Code",
    summary:
      "Provisioning and managing development, staging, and production infrastructure consistently while controlling security, permissions, and configuration drift.",
    failure: "Introduce manual configuration drift, then detect it and restore the approved state.",
    stack: [
      "AWS VPC, EC2, IAM, S3 and CloudWatch",
      "Terraform",
      "GitLab CI/CD",
      "Checkov or Trivy configuration scanning",
      "Open Policy Agent or Conftest",
      "AWS CloudTrail",
    ],
    steps: [
      { phase: "build", text: "Designing a VPC with public and private subnets." },
      { phase: "build", text: "Creating reusable Terraform modules for networking, compute, IAM, and storage." },
      { phase: "build", text: "Configuring remote Terraform state with access controls and appropriate locking." },
      { phase: "build", text: "Provisioning separate development, staging, and production environments." },
      { phase: "build", text: "Adding automated Terraform formatting, validation, and security checks." },
      { phase: "build", text: "Blocking noncompliant changes such as unrestricted SSH access or public storage." },
      { phase: "build", text: "Requiring approval before applying production infrastructure changes." },
      { phase: "build", text: "Enabling cloud audit logging and resource tagging." },
      { phase: "break", text: "Introducing manual configuration drift in a test environment." },
      { phase: "recover", text: "Detecting the drift and restoring the approved configuration through a reviewed Terraform change." },
    ],
  },
  {
    number: "03",
    slug: "kubernetes-capacity",
    title: "Kubernetes Production Operations and Capacity Engineering",
    short: "Kubernetes Operations & Capacity",
    domain: "Platform Operations",
    summary:
      "Building a Kubernetes environment that can handle changing workloads, identify resource bottlenecks, and maintain application availability during failures.",
    failure: "Push the cluster into resource exhaustion and unhealthy pods, then tune it back to health.",
    stack: [
      "Kubernetes on EKS or a local k3d/kubeadm cluster",
      "Docker",
      "Helm",
      "Terraform",
      "Prometheus, Grafana and Alertmanager",
      "Loki for centralized logs",
      "k6 for load testing",
    ],
    steps: [
      { phase: "build", text: "Provisioning a Kubernetes cluster and deploying an application." },
      { phase: "build", text: "Configuring Deployments, Services, Ingress, and namespace-level RBAC." },
      { phase: "build", text: "Defining CPU and memory requests and limits." },
      { phase: "build", text: "Configuring readiness, liveness and startup probes." },
      { phase: "build", text: "Implementing Horizontal Pod Autoscaling." },
      { phase: "build", text: "Configuring Pod Disruption Budgets and topology spread constraints." },
      { phase: "build", text: "Building dashboards for latency, throughput, errors, restarts and resource utilization." },
      { phase: "break", text: "Generating controlled traffic using k6." },
      { phase: "break", text: "Introducing resource exhaustion, unhealthy pods, and insufficient cluster capacity." },
      { phase: "recover", text: "Diagnosing the bottleneck and tuning scaling, resource allocation, or workload scheduling." },
    ],
  },
  {
    number: "04",
    slug: "observability-slo-incident",
    title: "Production Observability, SLO Monitoring and Incident Response",
    short: "Observability, SLOs & Incidents",
    domain: "Site Reliability Engineering",
    summary:
      "Building a monitoring and incident-response platform that detects service degradation, provides diagnostic evidence, and verifies recovery.",
    failure: "Introduce a slow database query, trace it end to end, and fix it against the SLO.",
    stack: [
      "Prometheus",
      "Grafana",
      "Alertmanager",
      "Loki or ELK Stack",
      "OpenTelemetry",
      "Tempo or Jaeger",
      "Kubernetes and Docker",
      "GitLab CI/CD",
    ],
    steps: [
      { phase: "build", text: "Configuring metrics collection, structured logs, and distributed tracing." },
      { phase: "build", text: "Building dashboards for availability, latency, throughput, errors, and resource utilization." },
      { phase: "build", text: "Defining service-level indicators and service-level objectives." },
      { phase: "build", text: "Configuring alerts with severity levels and actionable descriptions." },
      { phase: "build", text: "Integrating deployment information into incident timelines." },
      { phase: "build", text: "Creating runbooks for common production failures." },
      { phase: "break", text: "Introducing a slow database query and observing its impact on application latency." },
      { phase: "recover", text: "Tracing the failing request and correlating logs, metrics, and recent changes." },
      { phase: "recover", text: "Applying the corrective fix and verifying recovery against the original SLO." },
      { phase: "recover", text: "Generating an incident report with impact, root cause, resolution, and preventive actions." },
    ],
  },
  {
    number: "05",
    slug: "disaster-recovery",
    title: "Automated Disaster Recovery and Verified Data Restoration",
    short: "Disaster Recovery & Restoration",
    domain: "Resilience Engineering",
    summary:
      "Rebuilding infrastructure, restoring application data, and proving that the recovered environment meets defined recovery objectives.",
    failure: "Run a full recovery drill and record the actual restoration time and data loss.",
    stack: [
      "AWS S3 and appropriate backup services",
      "Terraform",
      "Docker and Kubernetes or EC2",
      "PostgreSQL or MySQL",
      "GitLab CI/CD",
      "AWS IAM, CloudWatch and CloudTrail",
      "Shell or Python automation",
    ],
    steps: [
      { phase: "build", text: "Provisioning the application infrastructure and database." },
      { phase: "build", text: "Defining Recovery Point Objective (RPO) and Recovery Time Objective (RTO)." },
      { phase: "build", text: "Configuring scheduled backups and encrypted backup storage." },
      { phase: "build", text: "Applying backup retention and access controls." },
      { phase: "build", text: "Automating backup metadata collection and integrity checks." },
      { phase: "build", text: "Building Terraform configurations to recreate the recovery environment." },
      { phase: "recover", text: "Creating a restoration workflow for a selected backup." },
      { phase: "recover", text: "Deploying the application into the isolated recovery environment." },
      { phase: "recover", text: "Verifying database integrity, business records, and application health." },
      { phase: "break", text: "Conducting a recovery drill and recording actual restoration time and data loss." },
    ],
  },
];

/** Engineering standards shared by all five projects. */
export const projectStandards: string[] = [
  "A complete Git repository with setup.",
  "Infrastructure and deployment configuration stored as code.",
  "CI/CD pipelines with validation and controlled permissions.",
  "Secrets management without credentials committed to Git.",
  "Monitoring dashboards and meaningful alerts.",
  "At least three documented failure scenarios.",
  "Troubleshooting steps from detection through recovery.",
  "Evidence of successful testing, not just screenshots of successful deployment.",
  "Cost controls and a teardown procedure for cloud resources.",
];
