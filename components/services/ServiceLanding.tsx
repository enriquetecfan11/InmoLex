import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServiceLeadSection } from "@/components/services/ServiceLeadSection";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { ServicePage } from "@/lib/service-pages";
import type { ServicePageSlug } from "@/lib/i18n-message-keys";

interface ServiceLandingProps {
  page: ServicePage;
}

export function ServiceLanding({ page }: ServiceLandingProps) {
  const t = useTranslations("services");
  const tPages = useTranslations("services.pages");
  const tCommon = useTranslations("common");
  const slug = page.slug as ServicePageSlug;
  const title = tPages(`${slug}.title`);

  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-brand-dark" />
      <div className="brand-section__atmosphere absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[600px] w-[600px] rounded-full bg-accent/[0.08] blur-3xl" />

      <Container className="relative py-12 sm:py-16 lg:py-20">
        <RevealOnScroll>
          <header className="mx-auto max-w-2xl text-center">
            {page.highlight && (
              <p className="inline-block rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-1.5 text-sm font-semibold text-accent">
                {tPages(`${slug}.highlight`)}
              </p>
            )}
            <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/75 sm:text-xl">
              {tPages(`${slug}.description`)}
            </p>
          </header>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 sm:mt-12">
          <ServiceLeadSection page={page} />

          <div className="mx-auto mt-6 max-w-xl">
            <p className="text-center text-sm text-white/55">
              {t("minuteNote")}
            </p>

            <div className="mt-6 flex flex-col items-center gap-4 text-center">
              {page.extraLink && (
                <Link
                  href={page.extraLink.href}
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-brand transition-colors hover:bg-accent-light"
                >
                  {tPages(`${slug}.extraLink`)}
                </Link>
              )}
              <WhatsAppLink
                message={t("whatsappMessage", { title })}
                className="inline-flex items-center justify-center rounded-lg border border-accent/30 bg-accent/[0.06] px-6 py-3.5 text-base font-semibold text-accent transition-colors hover:border-accent/50 hover:bg-accent/10"
              >
                {t("preferWhatsapp")}
              </WhatsAppLink>
            </div>

            {page.privacyNote && (
              <p className="mt-6 rounded-lg border border-accent/15 bg-accent/[0.04] px-5 py-4 text-sm leading-relaxed text-white/55">
                {tPages(`${slug}.privacyNote`)}{" "}
                <Link href="/privacidad" className="text-accent underline underline-offset-2 hover:text-accent-light">
                  {t("privacyLink")}
                </Link>
              </p>
            )}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 text-center">
          <Link href="/" className="text-sm font-medium text-accent transition-colors hover:text-accent-light">
            {tCommon("backHome")}
          </Link>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
