import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PropertiesListing } from "@/components/properties/PropertiesListing";
import { getProperties } from "@/app/actions/property-actions";
import { resolveLocale, type LocaleParams } from "@/i18n/params";

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("properties.title"),
    description: t("properties.description"),
  };
}

export default async function PropiedadesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const properties = await getProperties(locale);

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
