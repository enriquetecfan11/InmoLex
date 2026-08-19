import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactFormCta } from "@/components/contact/ContactFormCta";
import { CONTACT_INFO } from "@/lib/contact";

function ContactMap() {
  const t = useTranslations("contact");

  return (
    <RevealOnScroll>
      <div className="contact-map relative overflow-hidden rounded-2xl border border-accent/15">
        <iframe
          title={t("mapTitle")}
          src={CONTACT_INFO.mapEmbed}
          className="block h-[280px] w-full border-0 sm:h-[320px] lg:h-[360px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/15" />
        <div className="absolute bottom-4 left-4 rounded-lg border border-accent/20 bg-brand/90 px-4 py-2.5 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {t("office")}
          </p>
          <p className="mt-0.5 text-sm text-white/80">{CONTACT_INFO.address}</p>
        </div>
      </div>
    </RevealOnScroll>
  );
}

export function ContactSection() {
  const t = useTranslations("contact");

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
      <div className="pointer-events-none absolute -right-32 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent/[0.08] blur-3xl" />

      <Container className="relative">
        <RevealOnScroll>
          <header className="mx-auto max-w-2xl pt-14 text-center sm:pt-16 lg:pt-20">
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

        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24 xl:gap-20">
          <RevealOnScroll>
            <ContactInfo />
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <ContactFormCta />
          </RevealOnScroll>
        </div>

        <div className="border-t border-accent/15 pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24">
          <ContactMap />
        </div>
      </Container>
    </section>
  );
}
