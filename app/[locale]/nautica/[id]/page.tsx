import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { VesselCard } from "@/components/nautica/VesselCard";
import { VesselContactPanel } from "@/components/nautica/VesselContactPanel";
import { VesselDetailHero } from "@/components/nautica/VesselDetailHero";
import { VesselFeaturesSection } from "@/components/nautica/VesselFeaturesSection";
import { VesselLocationMap } from "@/components/nautica/VesselLocationMap";
import { VesselQuickStats } from "@/components/nautica/VesselQuickStats";
import { VesselShareButton } from "@/components/nautica/VesselShareButton";
import { VesselVideos } from "@/components/nautica/VesselVideos";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { formatLength, formatPrice, getSimilarVessels } from "@/lib/vessels";
import { getVessel, getVessels } from "@/app/actions/vessel-actions";
import { resolveLocaleParams, type LocaleParams } from "@/i18n/params";

type PageProps = LocaleParams<{ id: string }>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, id } = await resolveLocaleParams(params);
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const vessel = await getVessel(id);

  if (!vessel) return { title: t("vessels.notFound") };

  return {
    title: vessel.title,
    description: `${vessel.location} · ${formatPrice(vessel.price, vessel.operation, {
      locale,
      perMonth: tCommon("perMonth"),
    })} · ${formatLength(vessel.lengthMeters, locale)}`,
  };
}

export const dynamic = "force-dynamic";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="property-section-heading">
      <h2 className="font-display text-2xl text-accent sm:text-3xl">{children}</h2>
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-accent to-transparent" aria-hidden />
    </div>
  );
}

export default async function VesselDetailPage({ params }: PageProps) {
  const { locale, id } = await resolveLocaleParams(params);
  setRequestLocale(locale);
  const t = await getTranslations("vessels");

  const vessel = await getVessel(id);

  if (!vessel) notFound();

  const allVessels = await getVessels();
  const similarVessels = getSimilarVessels(vessel, allVessels);

  return (
    <article className="brand-section property-detail pb-20 lg:pb-16">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />

      <VesselDetailHero vessel={vessel} />
      <VesselQuickStats vessel={vessel} />

      <Container className="relative mt-5 sm:mt-6">
        <div className="flex justify-end">
          <VesselShareButton vessel={vessel} />
        </div>
      </Container>

      <Container className="relative mt-6 sm:mt-8 lg:mt-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-14 xl:grid-cols-[1fr_360px]">
          <div className="min-w-0 space-y-12 sm:space-y-14 lg:space-y-16">
            <RevealOnScroll>
              <SectionHeading>{t("description")}</SectionHeading>
              <div className="property-description-panel mt-8 rounded-2xl border border-accent/15 bg-accent/[0.04] p-6 sm:p-8 lg:p-10">
                <div className="mt-5 max-w-3xl space-y-5">
                  <p className="text-lg leading-[1.85] text-white/78 sm:text-xl sm:leading-[1.85]">
                    {vessel.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <SectionHeading>{t("gallery")}</SectionHeading>
              <div className="mt-8">
                <PropertyGallery images={vessel.images} title={vessel.title} />
              </div>
            </RevealOnScroll>

            <VesselFeaturesSection vessel={vessel} />
            <VesselLocationMap vessel={vessel} />
            <VesselVideos vessel={vessel} />
          </div>

          <VesselContactPanel vessel={vessel} />
        </div>

        {similarVessels.length > 0 && (
          <div className="mt-16 border-t border-accent/15 pt-12 sm:mt-20 sm:pt-16">
            <RevealOnScroll>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading>{t("similar")}</SectionHeading>
                <p className="text-sm text-white/45 sm:pb-1">{t("similarLead")}</p>
              </div>
            </RevealOnScroll>
            <ul className="mt-10 grid list-none grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
              {similarVessels.map((item, idx) => (
                <li key={item.id}>
                  <RevealOnScroll delay={Math.min(idx * 80, 400)}>
                    <VesselCard vessel={item} showReference />
                  </RevealOnScroll>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </article>
  );
}
