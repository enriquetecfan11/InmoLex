"use client";

import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  ENERGY_RATINGS,
  type EnergyRating,
  type Property,
} from "@/lib/properties";

interface PropertyEnergyCertificateProps {
  property: Property;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="property-section-heading">
      <h2 className="font-display text-2xl text-accent sm:text-3xl">{children}</h2>
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-accent to-transparent" aria-hidden />
    </div>
  );
}

function ratingOpacity(rating: EnergyRating, active: EnergyRating): string {
  const order = ENERGY_RATINGS.indexOf(rating);
  const activeOrder = ENERGY_RATINGS.indexOf(active);
  if (rating === active) return "bg-accent text-brand border-accent-light/50";
  if (order < activeOrder) {
    return "bg-accent/20 text-accent border-accent/25";
  }
  return "bg-white/[0.04] text-white/35 border-white/10";
}

export function PropertyEnergyCertificate({ property }: PropertyEnergyCertificateProps) {
  const t = useTranslations("properties.energy");
  const tEnergy = useTranslations("labels.energy");
  const cert = property.energyCertificate;
  if (!cert) return null;

  return (
    <RevealOnScroll>
      <SectionHeading>{t("title")}</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
        {t("lead")}
      </p>

      <div className="property-energy-cert mt-8 rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/[0.05] to-transparent p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45">
              {t("rating")}
            </p>
            <div
              className="mt-4 flex flex-wrap gap-1.5"
              role="img"
              aria-label={`${t("rating")} ${cert.rating}. ${tEnergy(cert.rating)}`}
            >
              {ENERGY_RATINGS.map((rating) => (
                <span
                  key={rating}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-bold transition-colors sm:h-11 sm:w-11 ${ratingOpacity(rating, cert.rating)}`}
                  aria-hidden={rating !== cert.rating}
                >
                  {rating}
                </span>
              ))}
            </div>
            <p className="mt-4 font-display text-xl text-white">
              {tEnergy(cert.rating)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            <div className="rounded-xl border border-accent/12 bg-brand-dark/50 px-5 py-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                {t("consumption")}
              </p>
              <p className="mt-2 font-display text-3xl text-accent">{cert.consumption}</p>
              <p className="mt-1 text-sm text-white/50">kWh/m² año</p>
            </div>
            <div className="rounded-xl border border-accent/12 bg-brand-dark/50 px-5 py-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                {t("emissions")}
              </p>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl text-accent">{cert.emissions}</span>
                <span className="rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
                  {cert.emissionsRating}
                </span>
              </p>
              <p className="mt-1 text-sm text-white/50">kg CO₂/m² año</p>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
