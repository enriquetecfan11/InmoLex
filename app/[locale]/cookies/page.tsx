import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { toIntlLocale } from "@/i18n/intl-locale";
import type { AppLocale } from "@/i18n/routing";
import { LEGAL_UPDATED_ISO } from "@/lib/legal/entity";
import { buildLegalSections } from "@/lib/legal/i18n-sections";

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("cookies.title"),
    description: t("cookies.description"),
  };
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("legal");
  const updatedAt = t("updated", {
    date: new Intl.DateTimeFormat(toIntlLocale(locale), {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(LEGAL_UPDATED_ISO)),
  });

  return (
    <LegalPageLayout
      title={t("cookies.title")}
      updatedAt={updatedAt}
      intro={t("cookies.intro")}
      bindingNote={locale !== "es" ? t("bindingNote") : undefined}
      sections={buildLegalSections(t as never, "cookies")}
    />
  );
}
