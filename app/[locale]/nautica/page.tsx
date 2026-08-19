import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { VesselsListing } from "@/components/nautica/VesselsListing";
import { getVessels } from "@/app/actions/vessel-actions";
import type { AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("vessels.title"),
    description: t("vessels.description"),
  };
}

export default async function NauticaPage() {
  const vessels = await getVessels();

  return (
    <Suspense
      fallback={
        <div className="brand-section py-12 sm:py-16 lg:py-20" aria-busy="true" />
      }
    >
      <VesselsListing vessels={vessels} />
    </Suspense>
  );
}
