import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  formatPrice,
  formatPropertyReference,
  getPropertyCoverImage,
  type Property,
} from "@/lib/properties";

interface HomeFeaturedPropertiesProps {
  properties: Property[];
}

function FeaturedPropertyCard({ property }: { property: Property }) {
  const t = useTranslations("home.featured");
  const tBadge = useTranslations("labels.badge");
  const tOperation = useTranslations("labels.operation");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-accent/15 bg-brand-dark shadow-[0_24px_65px_-42px_rgba(0,0,0,0.75)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link
          href={`/propiedades/${property.id}`}
          className="block h-full w-full"
          aria-label={property.title}
        >
          <Image
            src={getPropertyCoverImage(property)}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/12 to-transparent" />
        </Link>

        {property.badge && (
          <span className="absolute left-4 top-4 rounded-full border border-accent/30 bg-accent/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur-sm">
            {tBadge(property.badge)}
          </span>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="min-w-0 text-white">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/75">
              {tCommon("ref", { id: formatPropertyReference(property.id) })}
            </p>
            <p className="mt-1 font-display text-2xl tracking-tight text-accent">
              {formatPrice(property.price, property.operation, {
                locale,
                perMonth: tCommon("perMonth"),
              })}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
            {tOperation(property.operation)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl leading-tight text-white">
          <Link
            href={`/propiedades/${property.id}`}
            className="transition-colors hover:text-accent"
          >
            {property.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-white/55">{property.location}</p>

        <p className="mt-4 text-sm leading-relaxed text-white/60">
          {property.description}
        </p>

        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-sm">
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">
              {t("bedrooms")}
            </dt>
            <dd className="mt-1 font-medium text-white">{property.bedrooms}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">
              {t("bathrooms")}
            </dt>
            <dd className="mt-1 font-medium text-white">{property.bathrooms}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">
              {t("area")}
            </dt>
            <dd className="mt-1 font-medium text-white">{property.sqm} m²</dd>
          </div>
        </dl>

        <div className="mt-6">
          <Button
            href={`/propiedades/${property.id}`}
            variant="outline"
            size="md"
            className="w-full hover:-translate-y-0.5"
          >
            {t("viewProperty")}
          </Button>
        </div>
      </div>
    </article>
  );
}

export function HomeFeaturedProperties({ properties }: HomeFeaturedPropertiesProps) {
  const t = useTranslations("home.featured");
  const FEATURED = properties.filter((p) => p.badge === "destacado").slice(0, 3);
  const OPERATION_COUNT = new Set(FEATURED.map((property) => property.operation)).size;

  if (FEATURED.length === 0) return null;

  return (
    <section className="brand-section py-12 sm:py-16 lg:py-20">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />
      <div
        className="pointer-events-none absolute right-[-8rem] top-12 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <RevealOnScroll>
            <div className="max-w-xl">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-accent">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
                {t("lead")}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-accent/15 bg-white/6 p-4 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                  <p className="font-display text-3xl tracking-tight text-white">
                    {FEATURED.length.toString().padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                    {t("highlightedNow")}
                  </p>
                </div>
                <div className="rounded-2xl border border-accent/15 bg-white/6 p-4 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                  <p className="font-display text-3xl tracking-tight text-white">
                    {properties.length.toString().padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                    {t("portfolio")}
                  </p>
                </div>
                <div className="rounded-2xl border border-accent/15 bg-white/6 p-4 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                  <p className="font-display text-3xl tracking-tight text-white">
                    {OPERATION_COUNT.toString().padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                    {t("activeOps")}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-accent/15 bg-white/6 p-6 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <p className="text-sm font-medium text-white">
                  {t("lookingDifferent")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {t("lookingDifferentLead")}
                </p>
                <Button
                  href="/propiedades"
                  variant="outline"
                  size="lg"
                  className="mt-5 hover:-translate-y-0.5"
                >
                  {t("viewCatalog")}
                </Button>
              </div>
            </div>
          </RevealOnScroll>

          <div>
            <RevealOnScroll>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                    {t("highlightedNowShort")}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-white">
                    {t("quickView")}
                  </h3>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-white/60">
                  {t("criterion")}
                </p>
              </div>
            </RevealOnScroll>

            <ul className="mt-5 grid list-none grid-cols-1 gap-6 sm:grid-cols-2">
              {FEATURED.map((property, index) => (
                <li key={property.id}>
                  <RevealOnScroll delay={Math.min(index * 90, 270)}>
                    <FeaturedPropertyCard property={property} />
                  </RevealOnScroll>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
