import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CORE_SERVICES } from "@/lib/services";

const PRIMARY_SERVICES = CORE_SERVICES.filter((service) => service.id !== "nautica");
const NAUTICA_SERVICE = CORE_SERVICES.find((service) => service.id === "nautica");

function CatalogCta() {
  const t = useTranslations("home");

  return (
    <Link
      href="/servicios"
      className="service-catalog-cta group flex h-full flex-col justify-center rounded-2xl border border-accent/40 bg-accent/[0.12] p-5 sm:p-6 lg:p-7"
    >
      <p className="font-display text-2xl leading-tight tracking-tight text-white sm:text-[1.65rem]">
        {t("catalogTitle")}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        {t("catalogLead")}
      </p>
      <span className="service-preview-card__cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
        {t("catalogCta")}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="service-preview-card__arrow"
        >
          <path
            d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

export function HomeServicesPreview() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-brand-dark" />
      <div className="brand-section__atmosphere absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[600px] w-[600px] rounded-full bg-accent/[0.08] blur-3xl" />

      <Container className="relative py-12 sm:py-16 lg:py-20">
        <RevealOnScroll variant="editorial">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {t("servicesEyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
              {t("servicesTitle")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/70 sm:mt-4 sm:text-lg">
              {t("servicesLead")}
            </p>
          </header>
        </RevealOnScroll>

        <ul className="mt-10 grid list-none grid-cols-1 gap-3 sm:mt-12 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {PRIMARY_SERVICES.map((service, index) => (
            <li key={service.id} className="min-w-0">
              <RevealOnScroll
                variant="editorial"
                delay={Math.min(index * 80, 400)}
                className="h-full"
              >
                <ServiceCard service={service} />
              </RevealOnScroll>
            </li>
          ))}

          {NAUTICA_SERVICE ? (
            <li className="min-w-0 md:col-span-2">
              <RevealOnScroll variant="editorial" delay={120} className="h-full">
                <ServiceCard service={NAUTICA_SERVICE} layout="wide" />
              </RevealOnScroll>
            </li>
          ) : null}

          <li className="min-w-0 md:col-span-2 lg:col-span-1">
            <RevealOnScroll variant="editorial" delay={180} className="h-full">
              <CatalogCta />
            </RevealOnScroll>
          </li>
        </ul>
      </Container>
    </section>
  );
}
