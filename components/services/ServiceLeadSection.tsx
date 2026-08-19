"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { InmoLexLeadForm } from "@/components/forms/InmoLexLeadForm";
import type { ServicePage } from "@/lib/service-pages";
import type { ServicePageSlug } from "@/lib/i18n-message-keys";

interface ServiceLeadSectionProps {
  page: ServicePage;
}

const OPTION_KEYS: Record<string, readonly string[]> = {
  "comprar-vender": ["buy", "sell"],
  alquiler: ["search", "list"],
  financiacion: ["mortgage", "loan"],
};

export function ServiceLeadSection({ page }: ServiceLeadSectionProps) {
  const tLead = useTranslations("services.leadForm");
  const tPages = useTranslations("services.pages");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slug = page.slug as ServicePageSlug;
  const optionKeys = OPTION_KEYS[page.slug];
  const selectedOptionKey = optionKeys?.[selectedIndex];

  const selectedOption = page.formOptions
    ? page.formOptions[selectedIndex]
    : page.formKey && page.prefillChoice
      ? {
          formKey: page.formKey,
          prefillChoice: page.prefillChoice,
        }
      : null;

  if (!selectedOption) return null;

  const isIntermediacion = selectedOption.formKey === "intermediacion";
  const isFinanciacion = selectedOption.formKey === "financiacion";
  const hasMultipleOptions = Boolean(page.formOptions && page.formOptions.length > 1);

  const submitLabel = selectedOptionKey
    ? tPages(`${slug}.options.${selectedOptionKey}.cta`)
    : page.ctaLabel
      ? tPages(`${slug}.cta`)
      : tLead("submitDefault");

  const choiceLabel =
    hasMultipleOptions && selectedOptionKey
      ? tPages(`${slug}.options.${selectedOptionKey}.label`)
      : undefined;

  return (
    <div className="mx-auto max-w-xl">
      {hasMultipleOptions && page.formOptions && (
        <div className="mb-6 grid gap-3">
          {page.formOptions.map((option, index) => {
            const active = selectedIndex === index;
            const optionKey = optionKeys?.[index];
            const cta = optionKey
              ? tPages(`${slug}.options.${optionKey}.cta`)
              : option.ctaLabel;
            return (
              <button
                key={option.prefillChoice}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`w-full rounded-lg px-6 py-4 text-left text-base font-semibold transition-all duration-300 ${
                  active
                    ? "bg-accent text-brand shadow-md shadow-black/30"
                    : "border border-accent/20 bg-accent/[0.04] text-white hover:border-accent/35 hover:bg-accent/[0.08]"
                }`}
              >
                {cta}
              </button>
            );
          })}
        </div>
      )}

      <InmoLexLeadForm
        key={selectedOption.prefillChoice}
        formKey={selectedOption.formKey}
        choice={selectedOption.prefillChoice}
        choiceLabel={choiceLabel}
        showZona={isIntermediacion}
        showDetails={isIntermediacion || isFinanciacion}
        detailsLabel={
          isFinanciacion
            ? tLead("detailsFinance")
            : tLead("detailsIntermediation")
        }
        detailsPlaceholder={
          isFinanciacion
            ? tLead("placeholderFinance")
            : tLead("placeholderIntermediation")
        }
        submitLabel={submitLabel}
      />
    </div>
  );
}
