import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import {
  formatLength,
  formatPrice,
  formatVesselReference,
  getVesselCoverImage,
  type Vessel,
} from "@/lib/vessels";

interface VesselCardProps {
  vessel: Vessel;
  showReference?: boolean;
}

function LengthIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path
        d="M2 8h12M4 6l-2 2 2 2M12 6l2 2-2 2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CabinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path
        d="M1.5 12V8.5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2V12M1.5 12h13M4 6.5V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <rect x="2.5" y="3" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.5 6.5h11M6 3v2M10 3v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="shrink-0 text-accent"
    >
      <path
        d="M7 1.5a3.5 3.5 0 0 0-3.5 3.5c0 2.625 3.5 7 3.5 7s3.5-4.375 3.5-7A3.5 3.5 0 0 0 7 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="5" r="1.25" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

const badgeStyles: Record<NonNullable<Vessel["badge"]>, string> = {
  nuevo: "bg-brand/80 text-white border-white/10",
  reservado: "bg-accent/90 text-brand border-accent-light/30",
  vendido: "bg-brand-dark/80 text-white/55 border-accent/10",
  destacado: "bg-brand text-accent border-accent/30",
  exclusivo: "bg-accent text-brand border-accent-light/40",
};

export function VesselCard({ vessel, showReference = false }: VesselCardProps) {
  const t = useTranslations("vessels");
  const tCommon = useTranslations("common");
  const tLabels = useTranslations("labels");
  const locale = useLocale();
  const isUnavailable = vessel.badge === "vendido" || vessel.badge === "reservado";
  const price = formatPrice(vessel.price, vessel.operation, {
    locale,
    perMonth: tCommon("perMonth"),
  });

  return (
    <article className="property-card group flex h-full flex-col">
      <div className="relative">
        <Link
          href={`/nautica/${vessel.id}`}
          className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-dark"
          tabIndex={-1}
          aria-hidden
        >
          <Image
            src={getVesselCoverImage(vessel)}
            alt={vessel.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="property-card-image object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/60 via-transparent to-brand/10" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/15 transition-colors duration-500 group-hover:ring-accent/30" />

          {vessel.badge && (
            <span
              className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm ${badgeStyles[vessel.badge]}`}
            >
              {tLabels(`badge.${vessel.badge}`)}
            </span>
          )}
        </Link>
        <div
          className="pointer-events-none absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-2xl border border-accent/10 bg-accent/[0.02]"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col pt-6">
        {showReference && (
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">
            {tCommon("ref", { id: formatVesselReference(vessel.id) })}
          </p>
        )}
        <p className={`font-display text-2xl tracking-tight text-accent sm:text-[1.65rem] ${showReference ? "mt-2" : ""}`}>
          {price}
        </p>

        <h3 className="mt-2 font-display text-xl leading-snug text-white">
          <Link href={`/nautica/${vessel.id}`} className="transition-colors hover:text-accent-light">
            {vessel.title}
          </Link>
        </h3>

        <p className="mt-2 flex items-start gap-1.5 text-sm text-white/55">
          <LocationIcon />
          <span>{vessel.location}</span>
        </p>

        <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-accent/15 pt-5 text-sm text-white/55">
          <li className="flex items-center gap-1.5">
            <LengthIcon />
            <span>{formatLength(vessel.lengthMeters, locale)}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <CabinIcon />
            <span>
              {vessel.cabins === 1
                ? t("cabin", { count: vessel.cabins })
                : t("cabins", { count: vessel.cabins })}
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <YearIcon />
            <span>{vessel.year || "—"}</span>
          </li>
        </ul>

        <div className="mt-6">
          {isUnavailable ? (
            <Button
              href={`/contacto?embarcacion=${vessel.id}`}
              variant="outline"
              size="md"
              className="w-full text-sm"
            >
              {t("requestInfo")}
            </Button>
          ) : (
            <Button
              href={`/nautica/${vessel.id}`}
              variant="primary"
              size="md"
              className="property-card-cta w-full text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40"
            >
              {t("viewVessel")}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
