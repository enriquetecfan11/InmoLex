import { useLocale, useTranslations } from "next-intl";
import { formatLength, type Vessel } from "@/lib/vessels";

interface VesselQuickStatsProps {
  vessel: Vessel;
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

export function VesselQuickStats({ vessel }: VesselQuickStatsProps) {
  const t = useTranslations("vessels.stats");
  const locale = useLocale();

  const stats: StatItem[] = [
    {
      label: t("length"),
      value: formatLength(vessel.lengthMeters, locale),
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M2 9h14M4.5 6.5 2 9l2.5 2.5M13.5 6.5 16 9l-2.5 2.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: t("year"),
      value: vessel.year ? String(vessel.year) : "—",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <rect x="3" y="3.5" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3 7.5h12M7 3.5v2.5M11 3.5v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: t("cabins"),
      value: String(vessel.cabins),
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M2 13.5V9.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M2 13.5h14M5 7.5V5.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: t("bathrooms"),
      value: String(vessel.bathrooms),
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
      label: t("capacity"),
      value: String(vessel.capacity),
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <circle cx="9" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4.5 14.5c.6-2.4 2.4-3.5 4.5-3.5s3.9 1.1 4.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: t("engine"),
      value: vessel.engine || "—",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <rect x="3" y="6" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M12 8.5h2.5v4H12M6.5 6V4M9.5 6V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="property-quick-stats relative z-10 -mt-6 border-y border-accent/15 bg-brand-dark/70 sm:-mt-8">
      <div className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-8 sm:py-8">
        <ul className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:pb-0 lg:grid-cols-6 lg:gap-4">
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
