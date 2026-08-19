import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyContactPanel } from "@/components/properties/PropertyContactPanel";
import { PropertyDetailHero } from "@/components/properties/PropertyDetailHero";
import { PropertyEnergyCertificate } from "@/components/properties/PropertyEnergyCertificate";
import { PropertyFeaturesSection } from "@/components/properties/PropertyFeaturesSection";
import { PropertyLocationMap } from "@/components/properties/PropertyLocationMap";
import { PropertyFloorPlans } from "@/components/properties/PropertyFloorPlans";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyQuickStats } from "@/components/properties/PropertyQuickStats";
import { PropertyVideos } from "@/components/properties/PropertyVideos";
import { PropertyShareButton } from "@/components/properties/PropertyShareButton";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { formatPrice, getSimilarProperties } from "@/lib/properties";
import { getProperty, getProperties } from "@/app/actions/property-actions";
import type { AppLocale } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: AppLocale; id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const property = await getProperty(id);
  const t = await getTranslations({ locale, namespace: "metadata" });
  if (!property) return { title: t("properties.notFound") };

  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tProperties = await getTranslations({ locale, namespace: "properties" });

  return {
    title: property.title,
    description: `${property.location} · ${formatPrice(property.price, property.operation, {
      locale,
      perMonth: tCommon("perMonth"),
    })} · ${tProperties("bedroomsShort", { count: property.bedrooms })}`,
  };
}

export function generateStaticParams() {
  return [];
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="property-section-heading">
      <h2 className="font-display text-2xl text-accent sm:text-3xl">{children}</h2>
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-accent to-transparent" aria-hidden />
    </div>
  );
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const property = await getProperty(id);

  if (!property) notFound();

  const t = await getTranslations("properties");
  const allProperties = await getProperties();
  const similarProperties = getSimilarProperties(property, allProperties);

  return (
    <article className="brand-section property-detail pb-20 lg:pb-16">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />

      <PropertyDetailHero property={property} />
      <PropertyQuickStats property={property} />

      <Container className="relative mt-5 sm:mt-6">
        <div className="flex justify-end">
          <PropertyShareButton property={property} />
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
                    {property.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <SectionHeading>{t("gallery")}</SectionHeading>
              <div className="mt-8">
                <PropertyGallery images={property.images} title={property.title} />
              </div>
            </RevealOnScroll>

            <PropertyFeaturesSection property={property} />
            <PropertyEnergyCertificate property={property} />
            <PropertyLocationMap property={property} />
            <PropertyFloorPlans property={property} />
            <PropertyVideos property={property} />
          </div>

          <PropertyContactPanel property={property} />
        </div>

        {similarProperties.length > 0 && (
          <div className="mt-16 border-t border-accent/15 pt-12 sm:mt-20 sm:pt-16">
            <RevealOnScroll>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading>{t("similar")}</SectionHeading>
                <p className="text-sm text-white/45 sm:pb-1">
                  {t("similarLead")}
                </p>
              </div>
            </RevealOnScroll>
            <ul className="mt-10 grid list-none grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
              {similarProperties.map((p, idx) => (
                <li key={p.id}>
                  <RevealOnScroll delay={Math.min(idx * 80, 400)}>
                    <PropertyCard property={p} showReference />
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
