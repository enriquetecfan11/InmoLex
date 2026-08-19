import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { InmoLexLeadForm } from "@/components/forms/InmoLexLeadForm";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CONTACTO_CHOICES } from "@/lib/google-form-prefill";

export function HomeContactCta() {
  const t = useTranslations("home");
  const tContact = useTranslations("contact");

  return (
    <section className="brand-section">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />
      <div className="brand-section__glow" aria-hidden />

      <Container className="relative py-12 sm:py-16">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 backdrop-blur-sm sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/[0.1] blur-3xl" />
            <div className="relative mx-auto max-w-xl">
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                {t("contactTitle")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                {t("contactLead")}
              </p>

            <div className="mt-6">
                <InmoLexLeadForm
                  formKey="contacto"
                  choice={CONTACTO_CHOICES.consulta}
                  showDetails
                  detailsLabel={t("contactDetailsLabel")}
                  submitLabel={t("contactSubmit")}
                  className="border-accent/20 bg-brand-dark/30"
                />
              </div>

              <p className="mt-5 text-center">
                <WhatsAppLink
                  className="inline-flex items-center justify-center rounded-lg border border-accent/30 bg-accent/[0.06] px-6 py-3 text-base font-semibold text-accent transition-colors hover:border-accent/50 hover:bg-accent/10"
                  message={tContact("defaultWhatsapp")}
                >
                  {t("preferWhatsapp")}
                </WhatsAppLink>
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
