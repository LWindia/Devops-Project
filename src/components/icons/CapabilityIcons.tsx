import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CloudInfrastructureIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M14 32a8 8 0 0 1-1-15.9A10 10 0 0 1 32 13a7 7 0 0 1 2 13.8" />
    <path d="M14 32h20" />
  </svg>
);

const ContainerizationIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M24 6 40 14v20L24 42 8 34V14Z" />
    <path d="M8 14 24 22l16-8" />
    <path d="M24 22v20" />
  </svg>
);

const OrchestrationIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="24" cy="10" r="4" />
    <circle cx="10" cy="34" r="4" />
    <circle cx="38" cy="34" r="4" />
    <path d="M24 14v8M20 28l-7 4M28 28l7 4" />
  </svg>
);

const CicdIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M14 14a10 10 0 0 1 17 7" />
    <path d="M34 34a10 10 0 0 1-17-7" />
    <path d="M27 17l4 4 4-4M21 31l-4-4-4 4" />
  </svg>
);

const IacIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M17 12 7 24l10 12" />
    <path d="M31 12l10 12-10 12" />
    <path d="M27 10 21 38" />
  </svg>
);

const ObservabilityIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M6 28h7l4-12 6 20 4-14 3 6h12" />
  </svg>
);

const SecurityIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M24 6 38 11v11c0 10-6 16-14 20-8-4-14-10-14-20V11Z" />
    <path d="M18 24l4 4 8-8" />
  </svg>
);

const AiOpsIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M24 6v6M24 36v6M6 24h6M36 24h6" />
    <circle cx="24" cy="24" r="10" />
    <circle cx="24" cy="24" r="2.4" fill="currentColor" stroke="none" />
  </svg>
);

export const capabilityIconMap: Record<string, (props: IconProps) => JSX.Element> = {
  "cloud-infrastructure": CloudInfrastructureIcon,
  containerization: ContainerizationIcon,
  orchestration: OrchestrationIcon,
  cicd: CicdIcon,
  iac: IacIcon,
  observability: ObservabilityIcon,
  security: SecurityIcon,
  "ai-ops": AiOpsIcon,
};
