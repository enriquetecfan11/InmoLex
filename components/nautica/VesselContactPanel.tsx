"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { InmoLexLeadForm } from "@/components/forms/InmoLexLeadForm";
import { CONTACTO_CHOICES } from "@/lib/google-form-prefill";
import { formatPrice, type Vessel } from "@/lib/vessels";

interface VesselContactPanelProps {
  vessel: Vessel;
}

type ContactMode = "visita" | "info";

export function VesselContactPanel({ vessel }: VesselContactPanelProps) {
  const t = useTranslations("vessels.contact");
  const tContact = useTranslations("contact");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [mode, setMode] = useState<ContactMode>("visita");

  const price = formatPrice(vessel.price, vessel.operation, {
    locale,
    perMonth: tCommon("perMonth"),
  });

  const choice =
    mode === "visita" ? CONTACTO_CHOICES.visita : CONTACTO_CHOICES.consulta;

  return (
    <>
      <aside className="property-contact-panel hidden lg:block">
        <div className="sticky top-28 rounded-2xl border border-accent/20 bg-brand-dark/60 p-6 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45">
            {t("price")}
          </p>
          <p className="mt-2 font-display text-3xl text-accent">{price}</p>
          <p className="mt-1 text-sm text-white/50">{vessel.location}</p>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode("visita")}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                mode === "visita"
                  ? "bg-accent text-brand"
                  : "border border-accent/20 text-white/70 hover:border-accent/35"
              }`}
            >
              {t("bookVisit")}
            </button>
            <button
              type="button"
              onClick={() => setMode("info")}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                mode === "info"
                  ? "bg-accent text-brand"
                  : "border border-accent/20 text-white/70 hover:border-accent/35"
              }`}
            >
              {t("moreInfo")}
            </button>
          </div>

          <div className="mt-4">
            <InmoLexLeadForm
              key={mode}
              formKey="contacto"
              choice={choice}
              showProperty
              propertyDefault={vessel.title}
              showDetails={mode === "info"}
              detailsLabel={tContact("detailsLabel")}
              submitLabel={mode === "visita" ? t("bookVisitSubmit") : t("requestInfoSubmit")}
              className="border-0 bg-transparent p-0 backdrop-blur-none"
            />
          </div>
        </div>
      </aside>

      <div
        className="property-mobile-bar fixed inset-x-0 bottom-0 z-50 border-t border-accent/20 bg-brand/95 px-4 py-3 backdrop-blur-md lg:hidden"
        aria-label={t("actionsAria")}
      >
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg text-accent">{price}</p>
            <p className="truncate text-xs text-white/45">{vessel.location}</p>
          </div>
          <Link
            href={`/nautica/${vessel.id}#contacto`}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-brand shadow-md shadow-black/20"
          >
            {t("contact")}
          </Link>
        </div>
      </div>
      <div
        id="contacto"
        className="property-mobile-contact mt-14 scroll-mt-24 border-t border-accent/15 pt-10 lg:hidden"
      >
        <h2 className="font-display text-2xl text-accent">{t("contact")}</h2>
        <p className="mt-2 text-sm text-white/55">{t("formLead")}</p>
        <div className="mt-6">
          <InmoLexLeadForm
            key={mode}
            formKey="contacto"
            choice={choice}
            showProperty
            propertyDefault={vessel.title}
            showDetails={mode === "info"}
            detailsLabel={tContact("detailsLabel")}
            submitLabel={mode === "visita" ? t("bookVisitSubmit") : t("requestInfoSubmit")}
          />
        </div>
      </div>
    </>
  );
}
