import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServiceCard } from "@/components/services/ServiceCard";
import {
  ADDITIONAL_SERVICES,
  CORE_SERVICES,
  getServicesByCategory,
  type ServiceCategory,
} from "@/lib/services";
import type { ServiceItemId } from "@/lib/i18n-message-keys";

const CATEGORIES: ServiceCategory[] = [
  "intermediacion",
  "inversion",
  "adicional",
];

const featuredService = CORE_SERVICES.find((service) => service.featured);

export function ServicesSection() {
  const t = useTranslations("services");
  const tItems = useTranslations("services.items");
  const featuredId = featuredService?.id as ServiceItemId | undefined;

  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-brand-dark" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 15% 85%, rgba(201, 169, 98, 0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 85% 15%, rgba(201, 169, 98, 0.18) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[600px] w-[600px] rounded-full bg-accent/[0.08] blur-3xl" />

      <Container className="relative">
        <RevealOnScroll>
          <header className="mx-auto max-w-2xl pt-10 text-center sm:pt-12 lg:pt-16">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {t("title")}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
              {t("lead")}
            </p>
          </header>
        </RevealOnScroll>

        {featuredService && featuredId && (
          <RevealOnScroll className="mt-12 sm:mt-16">
            <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/[0.08] blur-3xl" />
              <div className="relative max-w-xl">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  {t("investorsEyebrow")}
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
                  {tItems(`${featuredId}.title`)}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {tItems(`${featuredId}.description`)}
                </p>
              </div>
              <div className="relative mt-8 shrink-0 lg:mt-0">
                <Button
                  href={featuredService.href}
                  size="lg"
                  className="w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 sm:w-auto"
                >
                  {tItems(`${featuredId}.cta`)}
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        )}

        <div className="space-y-12 py-10 sm:space-y-16 sm:py-12 lg:py-16">
          {CATEGORIES.map((category) => {
            const items =
              category === "adicional"
                ? ADDITIONAL_SERVICES
                : getServicesByCategory(category).filter(
                    (service) => !service.featured,
                  );

            if (items.length === 0) return null;

            return (
              <section key={category} aria-labelledby={`category-${category}`}>
                <RevealOnScroll>
                  <h2
                    id={`category-${category}`}
                    className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent"
                  >
                    {t(`categories.${category}`)}
                  </h2>
                </RevealOnScroll>

                <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {items.map((service, index) => (
                    <li key={service.id}>
                      <RevealOnScroll delay={Math.min(index * 80, 320)}>
                        <ServiceCard service={service} />
                      </RevealOnScroll>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <RevealOnScroll>
          <div className="border-t border-accent/15 pb-16 pt-10 text-center sm:pb-20 sm:pt-12 lg:pb-24">
            <p className="font-display text-2xl tracking-tight text-white sm:text-3xl">
              {t("notFoundCtaTitle")}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              {t("notFoundCtaLead")}
            </p>
            <Button
              href="/contacto"
              variant="outline"
              size="lg"
              className="mt-8 hover:-translate-y-0.5"
            >
              {t("contactNow")}
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
