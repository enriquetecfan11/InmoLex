import type { Metadata } from "next";
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
import {
  formatPrice,
  formatPropertyReference,
  getSimilarProperties,
  PROPERTIES,
} from "@/lib/properties";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = PROPERTIES.find((p) => p.id === id);
  if (!property) return { title: "Propiedad no encontrada" };
  return {
    title: property.title,
    description: `${property.location} · ${formatPrice(property.price, property.operation)} · ${property.bedrooms} hab.`,
  };
}

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ id: p.id }));
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
  const { id } = await params;
  const property = PROPERTIES.find((p) => p.id === id);

  if (!property) notFound();

  const similarProperties = getSimilarProperties(property);

  return (
    <article className="brand-section property-detail pb-24 lg:pb-20">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />

      <PropertyDetailHero property={property} />
      <PropertyQuickStats property={property} />

      <Container className="relative mt-6 sm:mt-8">
        <div className="flex justify-end">
          <PropertyShareButton property={property} />
        </div>
      </Container>

      <Container className="relative mt-8 sm:mt-10 lg:mt-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-14 xl:grid-cols-[1fr_360px]">
          <div className="min-w-0 space-y-14 sm:space-y-16 lg:space-y-20">
            <RevealOnScroll>
              <SectionHeading>Galería</SectionHeading>
              <div className="mt-8">
                <PropertyGallery images={property.images} title={property.title} />
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <SectionHeading>Descripción</SectionHeading>
              <div className="property-description mt-8 max-w-3xl">
                <p className="text-lg leading-[1.85] text-white/70 sm:text-xl sm:leading-[1.8]">
                  {property.description}
                </p>
                <p className="mt-6 text-sm text-white/40">
                  Dirección aproximada: {property.approximateAddress}
                </p>
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
          <div className="mt-20 border-t border-accent/15 pt-16 sm:mt-24 sm:pt-20">
            <RevealOnScroll>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading>Propiedades similares</SectionHeading>
                <p className="text-sm text-white/45 sm:pb-1">
                  Selección exclusiva en la misma zona
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
