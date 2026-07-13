import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServiceLeadSection } from "@/components/services/ServiceLeadSection";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { ServicePage } from "@/lib/service-pages";

interface ServiceLandingProps {
  page: ServicePage;
}

export function ServiceLanding({ page }: ServiceLandingProps) {
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
                {page.highlight}
              </p>
            )}
            <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {page.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/75 sm:text-xl">
              {page.description}
            </p>
          </header>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 sm:mt-12">
          <ServiceLeadSection page={page} />

          <div className="mx-auto mt-6 max-w-xl">
            <p className="text-center text-sm text-white/55">
              Solo tardarás 1 minuto · Te llamamos nosotros
            </p>

            <div className="mt-6 text-center">
              <WhatsAppLink
                message={`Hola, vengo desde la página de ${page.title} en InmoLex y prefiero contactar por WhatsApp.`}
                className="inline-flex items-center justify-center rounded-lg border border-accent/30 bg-accent/[0.06] px-6 py-3.5 text-base font-semibold text-accent transition-colors hover:border-accent/50 hover:bg-accent/10"
              >
                Prefiero WhatsApp
              </WhatsAppLink>
            </div>

            {page.privacyNote && (
              <p className="mt-6 rounded-lg border border-accent/15 bg-accent/[0.04] px-5 py-4 text-sm leading-relaxed text-white/55">
                {page.privacyNote}{" "}
                <Link href="/privacidad" className="text-accent underline underline-offset-2 hover:text-accent-light">
                  Privacidad
                </Link>
              </p>
            )}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 text-center">
          <Link href="/" className="text-sm font-medium text-accent transition-colors hover:text-accent-light">
            ← Volver al inicio
          </Link>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
