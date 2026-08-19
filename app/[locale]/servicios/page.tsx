import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesSection } from "@/components/services/ServicesSection";
import type { AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("services.title"),
    description: t("services.description"),
  };
}

export default function ServiciosPage() {
  return <ServicesSection />;
}
