import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PropertiesListing } from "@/components/properties/PropertiesListing";
import { getProperties } from "@/app/actions/property-actions";
import type { AppLocale } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("properties.title"),
    description: t("properties.description"),
  };
}

export default async function PropiedadesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const properties = await getProperties();

  return (
    <Suspense
      fallback={
        <div className="brand-section py-12 sm:py-16 lg:py-20" aria-busy="true" />
      }
    >
      <PropertiesListing properties={properties} />
    </Suspense>
  );
}
