"use client";

import { useState } from "react";
import { InmoLexLeadForm } from "@/components/forms/InmoLexLeadForm";
import type { ServicePage } from "@/lib/service-pages";

interface ServiceLeadSectionProps {
  page: ServicePage;
}

export function ServiceLeadSection({ page }: ServiceLeadSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedOption = page.formOptions
    ? page.formOptions[selectedIndex]
    : page.formKey && page.prefillChoice
      ? {
          formKey: page.formKey,
          prefillChoice: page.prefillChoice,
          ctaLabel: page.ctaLabel ?? "Enviar solicitud",
        }
      : null;

  if (!selectedOption) return null;

  const isIntermediacion = selectedOption.formKey === "intermediacion";
  const isFinanciacion = selectedOption.formKey === "financiacion";
  const hasMultipleOptions = Boolean(page.formOptions && page.formOptions.length > 1);

  return (
    <div className="mx-auto max-w-xl">
      {hasMultipleOptions && page.formOptions && (
        <div className="mb-6 grid gap-3">
          {page.formOptions.map((option, index) => {
            const active = selectedIndex === index;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`w-full rounded-lg px-6 py-4 text-left text-base font-semibold transition-all duration-300 ${
                  active
                    ? "bg-accent text-brand shadow-md shadow-black/30"
                    : "border border-accent/20 bg-accent/[0.04] text-white hover:border-accent/35 hover:bg-accent/[0.08]"
                }`}
              >
                {option.ctaLabel}
              </button>
            );
          })}
        </div>
      )}

      <InmoLexLeadForm
        key={selectedOption.prefillChoice}
        formKey={selectedOption.formKey}
        choice={selectedOption.prefillChoice}
        choiceLabel={hasMultipleOptions ? selectedOption.prefillChoice : undefined}
        showZona={isIntermediacion}
        showDetails={isIntermediacion || isFinanciacion}
        detailsLabel={
          isFinanciacion
            ? "Cuéntanos tu situación"
            : "Cuéntanos qué buscas o qué tienes"
        }
        detailsPlaceholder={
          isFinanciacion
            ? "Ej.: debo 180.000 €, cuotas atrasadas…"
            : "Ej.: piso 3 hab. máx. 400.000 €…"
        }
        submitLabel={selectedOption.ctaLabel}
      />
    </div>
  );
}
