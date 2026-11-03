export interface Tool {
  id: string;
  name: string;
}

export const tools: Tool[] = [
  { id: "linux", name: "Linux" },
  { id: "git", name: "Git" },
  { id: "docker", name: "Docker" },
  { id: "kubernetes", name: "Kubernetes" },
  { id: "terraform", name: "Terraform" },
  { id: "aws", name: "AWS" },
  { id: "jenkins", name: "Jenkins" },
  { id: "prometheus", name: "Prometheus" },
  { id: "grafana", name: "Grafana" },
];
