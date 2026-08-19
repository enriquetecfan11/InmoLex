import type { EliteIconName } from "@/lib/elite";

interface EliteIconProps {
  name: EliteIconName;
  className?: string;
}

const svgProps = {
  fill: "none" as const,
  "aria-hidden": true as const,
};

export function EliteIcon({ name, className = "" }: EliteIconProps) {
  const props = {
    ...svgProps,
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    className,
  };

  switch (name) {
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="12" cy="12" rx="3.4" ry="8.25" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 12h16M6.2 8h11.6M6.2 16h11.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "tailored":
      return (
        <svg {...props}>
          <path d="M5 20V9.5L12 4l7 5.5V20" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M9 20v-6h6v6M9 11.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "visual":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4.5 12a7.5 7.5 0 0 1 4-6.6M19.5 12a7.5 7.5 0 0 1-4 6.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M7 4.8h3.2M14 19.2h3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "finance":
      return (
        <svg {...props}>
          <path d="M5 19V11M10 19V8M15 19v-6M20 19V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M4 19h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "network":
      return (
        <svg {...props}>
          <circle cx="12" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="5.5" cy="17" r="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="18.5" cy="17" r="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10.4 8.1 6.9 15.2M13.6 8.1l3.5 7.1M7.5 17h9" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}

export function EliteWatermark({ name, className = "" }: EliteIconProps) {
  const props = {
    ...svgProps,
    width: 176,
    height: 176,
    viewBox: "0 0 176 176",
    className: `h-full w-full ${className}`,
  };

  switch (name) {
    case "globe":
      return (
        <svg {...props}>
          <circle cx="88" cy="88" r="62" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="88" cy="88" rx="26" ry="62" stroke="currentColor" strokeWidth="1.2" />
          <path d="M26 88h124M38 58h100M38 118h100" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "tailored":
      return (
        <svg {...props}>
          <path d="M40 148V62L88 28l48 34v86" stroke="currentColor" strokeWidth="1.2" />
          <path d="M62 148V98h52v50M56 78h64M70 118h36" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "visual":
      return (
        <svg {...props}>
          <circle cx="88" cy="88" r="22" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="88" cy="88" r="8" stroke="currentColor" strokeWidth="1.2" />
          <path d="M32 88a56 56 0 0 1 30-49M144 88a56 56 0 0 1-30 49" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "finance":
      return (
        <svg {...props}>
          <path d="M40 136V88M68 136V64M96 136V78M124 136V44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M32 136h108" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "network":
      return (
        <svg {...props}>
          <circle cx="88" cy="48" r="12" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="44" cy="124" r="12" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="132" cy="124" r="12" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="88" cy="96" r="7" stroke="currentColor" strokeWidth="1.2" />
          <path d="M80 58 52 114M96 58l28 56M56 124h64M88 89V60" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
  }
}
