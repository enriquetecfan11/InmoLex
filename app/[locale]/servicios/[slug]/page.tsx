import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceLanding } from "@/components/services/ServiceLanding";
import { getServicePage, SERVICE_PAGES } from "@/lib/service-pages";
import type { AppLocale } from "@/i18n/routing";
import type messages from "@/messages/es.json";

type ServicePageSlug = keyof (typeof messages)["services"]["pages"];

interface PageProps {
  params: Promise<{ locale: AppLocale; slug: string }>;
}

export function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const page = getServicePage(slug);

  if (!page) return { title: t("services.notFound") };

  const tPage = await getTranslations({
    locale,
    namespace: `services.pages.${slug as ServicePageSlug}`,
  });

  return {
    title: tPage("title"),
    description: tPage("description"),
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getServicePage(slug);
  if (!page) notFound();

  return <ServiceLanding page={page} />;
}
