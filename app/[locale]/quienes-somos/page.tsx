import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutSection } from "@/components/about/AboutSection";
import type { AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("about.title"),
    description: t("about.description"),
  };
}

export default function QuienesSomosPage() {
  return <AboutSection />;
}
