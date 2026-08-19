import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesSection } from "@/components/services/ServicesSection";
import { resolveLocale, type LocaleParams } from "@/i18n/params";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("services.title"),
    description: t("services.description"),
  };
}

export default function ServiciosPage() {
  return <ServicesSection />;
}
