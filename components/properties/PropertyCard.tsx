import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  BADGE_LABELS,
  formatPrice,
  formatPropertyReference,
  getPropertyCoverImage,
  type Property,
} from "@/lib/properties";

interface PropertyCardProps {
  property: Property;
  showReference?: boolean;
}

function BedIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M1.5 12V8.5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2V12M1.5 12h13M1.5 12v1.5h13V12M4 6.5V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M2 8.5h12M4.5 8.5V5.5a1.5 1.5 0 0 1 3 0M8 8.5V5.5a1.5 1.5 0 0 1 3 0M2 8.5v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M2.5 5.5 8 2l5.5 3.5V12.5H2.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
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

const badgeStyles: Record<
  NonNullable<Property["badge"]>,
  string
> = {
  nuevo: "bg-brand/80 text-white border-white/10",
  reservado: "bg-accent/90 text-brand border-accent-light/30",
  vendido: "bg-brand-dark/80 text-white/55 border-accent/10",
  destacado: "bg-brand text-accent border-accent/30",
  exclusivo: "bg-accent text-brand border-accent-light/40",
};

export function PropertyCard({ property, showReference = false }: PropertyCardProps) {
  const isUnavailable =
    property.badge === "vendido" || property.badge === "reservado";

  return (
    <article className="property-card group flex h-full flex-col">
      <div className="relative">
        <Link
          href={`/propiedades/${property.id}`}
          className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-dark"
          tabIndex={-1}
          aria-hidden
        >
          <Image
            src={getPropertyCoverImage(property)}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="property-card-image object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/60 via-transparent to-brand/10" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/15 transition-colors duration-500 group-hover:ring-accent/30" />

          {property.badge && (
            <span
              className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm ${badgeStyles[property.badge]}`}
            >
              {BADGE_LABELS[property.badge]}
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
            Ref. {formatPropertyReference(property.id)}
          </p>
        )}
        <p className={`font-display text-2xl tracking-tight text-accent sm:text-[1.65rem] ${showReference ? "mt-2" : ""}`}>
          {formatPrice(property.price, property.operation)}
        </p>

        <h3 className="mt-2 font-display text-xl leading-snug text-white">
          <Link
            href={`/propiedades/${property.id}`}
            className="transition-colors hover:text-accent-light"
          >
            {property.title}
          </Link>
        </h3>

        <p className="mt-2 flex items-start gap-1.5 text-sm text-white/55">
          <LocationIcon />
          <span>{property.location}</span>
        </p>

        <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-accent/15 pt-5 text-sm text-white/55">
          <li className="flex items-center gap-1.5">
            <BedIcon />
            <span>{property.bedrooms} hab.</span>
          </li>
          <li className="flex items-center gap-1.5">
            <BathIcon />
            <span>
              {property.bathrooms}{" "}
              {property.bathrooms === 1 ? "baño" : "baños"}
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <AreaIcon />
            <span>{property.sqm} m²</span>
          </li>
        </ul>

        <div className="mt-6">
          {isUnavailable ? (
            <Button
              href={`/contacto?propiedad=${property.id}`}
              variant="outline"
              size="md"
              className="w-full text-sm"
            >
              Solicitar información
            </Button>
          ) : (
            <Button
              href={`/propiedades/${property.id}`}
              variant="primary"
              size="md"
              className="property-card-cta w-full text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40"
            >
              Ver propiedad
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
