import { useTranslations } from "next-intl";
import { InmoLexLeadForm } from "@/components/forms/InmoLexLeadForm";
import { TRUST_SIGNALS } from "@/lib/contact";
import { CONTACTO_CHOICES } from "@/lib/google-form-prefill";

export function ContactFormCta() {
  const t = useTranslations("contact");

  return (
    <div className="contact-form-cta relative">
      <h2 className="font-display text-2xl text-white">{t("formTitle")}</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        {t("formLead")}
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {TRUST_SIGNALS.map((signal) => {
          const value =
            "valueKey" in signal ? t(`trustValues.${signal.valueKey}`) : signal.value;
          const label = t(`trust.${signal.labelKey}`);

          return (
            <li
              key={signal.labelKey}
              className="rounded-lg border border-accent/10 bg-brand-dark/40 px-4 py-3"
            >
              <p className="text-sm font-semibold text-accent">{value}</p>
              <p className="mt-0.5 text-xs text-white/50">{label}</p>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <InmoLexLeadForm
          formKey="contacto"
          choice={CONTACTO_CHOICES.consulta}
          showDetails
          detailsLabel={t("detailsLabel")}
          submitLabel={t("submit")}
          className="border-0 bg-transparent p-0 backdrop-blur-none"
        />
      </div>
    </div>
  );
}
