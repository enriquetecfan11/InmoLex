import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { toIntlLocale } from "@/i18n/intl-locale";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { LEGAL_UPDATED_ISO } from "@/lib/legal/entity";
import { buildLegalSections } from "@/lib/legal/i18n-sections";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("legalNotice.title"),
    description: t("legalNotice.description"),
  };
}

export default async function AvisoLegalPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
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
      title={t("notice.title")}
      updatedAt={updatedAt}
      intro={t("notice.intro")}
      bindingNote={locale !== "es" ? t("bindingNote") : undefined}
      sections={buildLegalSections(t as never, "notice")}
    />
  );
}
