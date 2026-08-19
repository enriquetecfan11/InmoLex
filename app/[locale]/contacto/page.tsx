import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactSection } from "@/components/contact/ContactSection";
import type { AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("contact.title"),
    description: t("contact.description"),
  };
}

export default function ContactoPage() {
  return <ContactSection />;
}
