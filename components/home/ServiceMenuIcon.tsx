import type { ServiceMenuIcon } from "@/lib/service-menu";

interface ServiceMenuIconProps {
  icon: ServiceMenuIcon;
  className?: string;
}

export function ServiceMenuIconGlyph({ icon, className = "" }: ServiceMenuIconProps) {
  const props = {
    width: 28,
    height: 28,
    viewBox: "0 0 28 28",
    fill: "none",
    "aria-hidden": true as const,
    className,
  };

  switch (icon) {
    case "buy-sell":
      return (
        <svg {...props}>
          <path d="M5 12 14 5l9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H6a1 1 0 0 1-1-1V12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M11 16h6M14 13v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "rent":
      return (
        <svg {...props}>
          <rect x="5" y="8" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 8V6a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M11 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "valuation":
      return (
        <svg {...props}>
          <path d="M6 22V10l8-5 8 5v12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M11 22v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M10 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "finance":
      return (
        <svg {...props}>
          <rect x="4" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 11h20" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "debt":
      return (
        <svg {...props}>
          <path d="M14 4v16M8 8h8a4 4 0 0 1 0 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "investor":
      return (
        <svg {...props}>
          <path d="M5 22V14l9-6 9 6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M10 22v-5h8v5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "nautica":
      return (
        <svg {...props}>
          <path d="M5 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 18c1.2-3 3.8-6 7-8 3.2 2 5.8 5 7 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M14 10V6l4 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
