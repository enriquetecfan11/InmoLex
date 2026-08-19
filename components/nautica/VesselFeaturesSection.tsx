import { useLocale, useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { formatLength, type Vessel } from "@/lib/vessels";

interface VesselFeaturesSectionProps {
  vessel: Vessel;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="property-section-heading">
      <h2 className="font-display text-2xl text-accent sm:text-3xl">{children}</h2>
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-accent to-transparent" aria-hidden />
    </div>
  );
}

export function VesselFeaturesSection({ vessel }: VesselFeaturesSectionProps) {
  const t = useTranslations("vessels");
  const tLabels = useTranslations("labels");
  const locale = useLocale();

  const groups = [
    {
      id: "basic",
      label: t("techSheet"),
      items: [
        tLabels(`vesselType.${vessel.type}`),
        vessel.lengthMeters
          ? t("lengthValue", { value: formatLength(vessel.lengthMeters, locale) })
          : null,
        vessel.year ? t("yearValue", { year: vessel.year }) : null,
        vessel.manufacturer ? t("shipyard", { name: vessel.manufacturer }) : null,
        vessel.engine ? t("engineValue", { name: vessel.engine }) : null,
        vessel.cabins === 1
          ? t("cabin", { count: vessel.cabins })
          : t("cabins", { count: vessel.cabins }),
        vessel.bathrooms === 1
          ? t("bathroom", { count: vessel.bathrooms })
          : t("bathrooms", { count: vessel.bathrooms }),
        vessel.capacity ? t("capacity", { count: vessel.capacity }) : null,
      ].filter((item): item is string => Boolean(item)),
    },
    ...(vessel.features.length
      ? [
          {
            id: "extras",
            label: t("equipment"),
            items: vessel.features,
          },
        ]
      : []),
  ];

  if (groups.every((group) => group.items.length === 0)) return null;

  return (
    <RevealOnScroll>
      <SectionHeading>{t("features")}</SectionHeading>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.id}
            className="property-feature-group rounded-2xl border border-accent/12 bg-gradient-to-br from-accent/[0.04] to-transparent p-5 transition-colors hover:border-accent/22"
          >
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">
              {group.label}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </RevealOnScroll>
  );
}
