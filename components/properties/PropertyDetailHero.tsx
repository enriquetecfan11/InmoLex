import Image from "next/image";
import Link from "next/link";
import {
  BADGE_LABELS,
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
  formatPrice,
  formatPropertyReference,
  getPropertyCoverImage,
  type Property,
} from "@/lib/properties";

interface PropertyDetailHeroProps {
  property: Property;
}

const badgeStyles: Record<
  NonNullable<Property["badge"]>,
  string
> = {
  nuevo: "border-white/20 bg-brand/70 text-white",
  reservado: "border-accent-light/40 bg-accent/90 text-brand",
  vendido: "border-accent/10 bg-brand-dark/80 text-white/55",
  destacado: "border-accent/30 bg-brand/80 text-accent",
  exclusivo: "border-accent-light/40 bg-accent text-brand",
};

function getHeroTags(property: Property): string[] {
  const tags: string[] = [];

  if (property.badge) tags.push(BADGE_LABELS[property.badge]);
  if (property.price >= 1_000_000) tags.push("Lujo");
  if (property.status === "disponible") tags.push("Disponible");
  else tags.push(PROPERTY_STATUS_LABELS[property.status]);

  return [...new Set(tags)];
}

export function PropertyDetailHero({ property }: PropertyDetailHeroProps) {
  const tags = getHeroTags(property);

  return (
    <section className="property-hero relative">
      <div className="property-hero__image relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-[21/9]">
        <Image
          src={getPropertyCoverImage(property)}
          alt={property.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand via-brand/40 to-brand/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand/60 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/15" />
      </div>

      <div className="property-hero__content absolute inset-x-0 bottom-0">
        <div className="mx-auto w-full max-w-7xl px-5 pb-8 pt-24 sm:px-8 sm:pb-10 lg:pb-14">
          <Link
            href="/propiedades"
            className="property-hero__back mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M10 3.5 5.5 8 10 12.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Volver a propiedades
          </Link>

          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45">
            Ref. {formatPropertyReference(property.id)}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => {
              const isBadge = property.badge && tag === BADGE_LABELS[property.badge];
              return (
                <span
                  key={tag}
                  className={`rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm ${
                    isBadge && property.badge
                      ? badgeStyles[property.badge]
                      : "border-accent/25 bg-brand/50 text-accent"
                  }`}
                >
                  {tag}
                </span>
              );
            })}
            <span className="rounded-full border border-white/10 bg-brand/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
              {PROPERTY_TYPE_LABELS[property.type]}
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl font-display text-[2rem] leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
            {property.title}
          </h1>

          <p className="mt-3 flex items-center gap-2 text-base text-white/65 sm:text-lg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
              className="shrink-0 text-accent"
            >
              <path
                d="M8 1.5a4 4 0 0 0-4 4c0 3 4 8.5 4 8.5s4-5.5 4-8.5a4 4 0 0 0-4-4Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="5.5" r="1.25" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            {property.location}
          </p>

          <p className="property-hero__price mt-5 font-display text-3xl text-accent sm:text-4xl lg:text-5xl">
            {formatPrice(property.price, property.operation)}
          </p>

          <p className="mt-2 text-sm text-white/45">
            {property.operation === "venta" ? "Precio de venta" : "Precio de alquiler mensual"}
          </p>
        </div>
      </div>
    </section>
  );
}
