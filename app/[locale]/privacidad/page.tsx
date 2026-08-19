import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { toIntlLocale } from "@/i18n/intl-locale";
import type { AppLocale } from "@/i18n/routing";
import { LEGAL_ENTITY, LEGAL_UPDATED_ISO } from "@/lib/legal/entity";
import { buildLegalSections } from "@/lib/legal/i18n-sections";

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("privacy.title"),
    description: t("privacy.description"),
  };
}

export default async function PrivacidadPage({ params }: PageProps) {
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
      title={t("privacy.title")}
      updatedAt={updatedAt}
      intro={t("privacy.intro", {
        tradeName: LEGAL_ENTITY.tradeName,
        legalName: LEGAL_ENTITY.legalName,
      })}
      bindingNote={locale !== "es" ? t("bindingNote") : undefined}
      sections={buildLegalSections(t as never, "privacy")}
    />
  );
}
