import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { VesselsListing } from "@/components/nautica/VesselsListing";
import { getVessels } from "@/app/actions/vessel-actions";
import { resolveLocale, type LocaleParams } from "@/i18n/params";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
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
