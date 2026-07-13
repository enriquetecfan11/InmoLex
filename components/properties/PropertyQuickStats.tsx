import { ORIENTATION_LABELS, type Property } from "@/lib/properties";

interface PropertyQuickStatsProps {
  property: Property;
}

interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function StatIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.06] text-accent">
      {children}
    </span>
  );
}

export function PropertyQuickStats({ property }: PropertyQuickStatsProps) {
  const stats: StatItem[] = [
    {
      label: "Superficie",
      value: `${property.sqm} m²`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M3 6.5 9 3l6 3.5V14.5H3V6.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Habitaciones",
      value: String(property.bedrooms),
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M2 13.5V9.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M2 13.5h14M2 13.5v2h14v-2M5 7.5V5.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Baños",
      value: String(property.bathrooms),
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M3 10h12M5.5 10V6.5a1.5 1.5 0 0 1 3 0M9 10V6.5a1.5 1.5 0 0 1 3 0M3 10v2.5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Terraza",
      value: property.terrace ? "Sí" : "No",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M3 14.5h12M4.5 14.5V8l4.5-3 4.5 3v6.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Parking",
      value: property.garage ? "Sí" : "No",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <rect
            x="3"
            y="4"
            width="12"
            height="10"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path d="M7 8.5h2.5a1.5 1.5 0 1 1 0 3H7V8.5Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      label: "Trastero",
      value: property.storage ? "Sí" : "No",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M4 6.5h10v8H4v-8ZM6.5 6.5V4.5h5v2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Ascensor",
      value: property.elevator
        ? property.elevatorCount
          ? `Sí (${property.elevatorCount})`
          : "Sí"
        : "No",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <rect x="5" y="2.5" width="8" height="13" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9 6v6M7 9.5 9 11.5 11 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Orientación",
      value: ORIENTATION_LABELS[property.orientation],
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9 3.5V9l3.5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="property-quick-stats relative z-10 -mt-6 border-y border-accent/15 bg-brand-dark/70 sm:-mt-8">
      <div className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-8 sm:py-8">
        <ul className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:pb-0 lg:grid-cols-8 lg:gap-4">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="property-stat-chip flex min-w-[8.5rem] flex-col items-center gap-2 rounded-xl border border-accent/10 bg-accent/[0.03] px-3 py-4 text-center transition-colors hover:border-accent/25 hover:bg-accent/[0.06] sm:min-w-0 sm:px-4"
            >
              <StatIcon>{stat.icon}</StatIcon>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {stat.label}
                </p>
                <p className="mt-1 font-display text-lg text-white">{stat.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
