import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const LinuxIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="9" r="4" />
    <path d="M8.5 12.5 6 20c1.8 1.3 4 2 6 2s4.2-.7 6-2l-2.5-7.5" />
    <circle cx="10" cy="8.2" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="14" cy="8.2" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const GitIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="6" cy="6" r="2" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="6" r="2" />
    <path d="M6 8v8" />
    <path d="M18 8v4a4 4 0 0 1-4 4h-6" />
  </svg>
);

export const DockerIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="11" width="4" height="4" />
    <rect x="8" y="11" width="4" height="4" />
    <rect x="13" y="11" width="4" height="4" />
    <rect x="8" y="6" width="4" height="4" />
    <path d="M2 15c0 3.5 3 6 8.5 6 6 0 10-3 11-8-1 .3-2 .2-3-.3-1 1-2.3 1.3-3.5.8" />
  </svg>
);

export const KubernetesIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7Z" />
    <path d="M12 2.5V12" />
    <path d="M20.5 7 12 12" />
    <path d="M3.5 7 12 12" />
    <path d="M12 21.5V12" />
  </svg>
);

export const TerraformIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 4.5 10 7.8v6.4L4 10.9Z" />
    <path d="M11 7.8 17 4.5v6.4l-6 3.3Z" />
    <path d="M18 11.6l6 3.3v6.4l-6-3.3Z" transform="translate(-7 0)" />
    <path d="M4 11.6l6 3.3v6.4l-6-3.3Z" />
  </svg>
);

export const AwsIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 16.5c4 2 14 2 18 0" />
    <path d="M17 15.5c1.2.5 2.3.4 3 0" />
    <path d="M6 9.5h3.2L7 14.5H4.2Z" />
    <path d="M10.6 9.5h2.6l1.6 5h-2.4l-.3-1h-2l-.3 1h-2.3Z" />
    <path d="M15.4 9.5h3.4v1.2h-2.2v.8h2v1.1h-2v.9h2.3v1h-3.5Z" />
  </svg>
);

export const JenkinsIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="7" r="3.2" />
    <path d="M7 21c0-3.5 2-6 5-6s5 2.5 5 6" />
    <path d="M9.5 6.5c1 .6 4 .6 5 0" />
  </svg>
);

export const PrometheusIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 2.5c4.5 0 7.5 3.4 7.5 7.6 0 3.2-1.9 5-3.3 6.4-1 1-1.4 1.7-1.4 2.8h-5.6c0-1.1-.4-1.8-1.4-2.8-1.4-1.4-3.3-3.2-3.3-6.4 0-4.2 3-7.6 7.5-7.6Z" />
    <path d="M9.2 19.3h5.6" />
    <path d="M10 21.5h4" />
    <path d="M12 6.5v6l3 2" />
  </svg>
);

export const GrafanaIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M17 3c-6 0-10.5 4.8-10.5 10.5A7.5 7.5 0 1 0 15 20.8c3-1.4 4.9-4.5 4.9-8.2 0-1.8-.5-3.2-1.4-4.3.6-1.6.5-3.2.5-3.2S18 3 17 3Z" />
    <circle cx="11.8" cy="13.8" r="3.4" />
  </svg>
);

export const toolIconMap: Record<string, (props: IconProps) => JSX.Element> = {
  linux: LinuxIcon,
  git: GitIcon,
  docker: DockerIcon,
  kubernetes: KubernetesIcon,
  terraform: TerraformIcon,
  aws: AwsIcon,
  jenkins: JenkinsIcon,
  prometheus: PrometheusIcon,
  grafana: GrafanaIcon,
};
