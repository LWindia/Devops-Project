export interface TerminalTab {
  id: string;
  label: string;
  lines: string[];
}

export const terminalTabs: TerminalTab[] = [
  {
    id: "kubernetes",
    label: "Kubernetes",
    lines: [
      "$ kubectl get pods",
      "NAME           READY   STATUS    RESTARTS   AGE",
      "web-frontend   1/1     Running   0          2m",
      "api-backend    1/1     Running   0          2m",
      "mongo-db       1/1     Running   0          3m",
      "",
      "$ kubectl get svc",
      "NAME           TYPE           CLUSTER-IP    EXTERNAL-IP   PORT(S)",
      "web-frontend   LoadBalancer   10.96.0.12    3.2.123.45    80:3",
    ],
  },
  {
    id: "docker",
    label: "Docker",
    lines: [
      "$ docker ps",
      "CONTAINER ID   IMAGE                 STATUS         PORTS",
      "7a1c3d9f2b4e   web-frontend:7a1c3d   Up 2 minutes   0.0.0.0:80",
      "c92e1a0d55f1   api-backend:7a1c3d    Up 2 minutes   0.0.0.0:4000",
      "",
      "$ docker images --filter reference='*backend*'",
      "REPOSITORY    TAG      SIZE",
      "api-backend   7a1c3d   184MB",
    ],
  },
  {
    id: "terraform",
    label: "Terraform",
    lines: [
      "$ terraform plan",
      "Terraform will perform the following actions:",
      "",
      "  # module.network.aws_subnet.private[0] will be created",
      "  # module.cluster.aws_eks_node_group.main will be created",
      "",
      "Plan: 12 to add, 0 to change, 0 to destroy.",
    ],
  },
];

export interface LabStat {
  label: string;
  value: string;
  tone: "green" | "blue" | "amber";
}

export const labStats: LabStat[] = [
  { label: "Pods Running", value: "3/3", tone: "green" },
  { label: "CPU Usage", value: "28%", tone: "blue" },
  { label: "Memory Usage", value: "512Mi / 2Gi", tone: "amber" },
];
