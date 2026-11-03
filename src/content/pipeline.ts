export interface PipelineStage {
  index: string;
  title: string;
  detail: string;
  logLine: string;
}

export const pipelineStages: PipelineStage[] = [
  { index: "01", title: "Code", detail: "Push to repository", logLine: "$ git push origin main" },
  { index: "02", title: "Version Control", detail: "Branch, review, merge", logLine: "Opening merge request..." },
  { index: "03", title: "CI Pipeline", detail: "Build & run automated tests", logLine: "Running test suite... 42 passed" },
  { index: "04", title: "Container Image", detail: "Package into a Docker image", logLine: "Building image web-frontend:7a1c3d" },
  { index: "05", title: "Registry", detail: "Push versioned image", logLine: "Pushing to container registry..." },
  { index: "06", title: "Kubernetes Deploy", detail: "Roll out to the cluster", logLine: "Deploying to kubernetes cluster..." },
  { index: "07", title: "Observability", detail: "Monitor & alert", logLine: "Metrics flowing · 0 alerts firing" },
];
