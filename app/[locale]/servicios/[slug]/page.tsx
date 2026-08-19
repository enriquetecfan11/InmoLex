import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceLanding } from "@/components/services/ServiceLanding";
import { getServicePage, SERVICE_PAGES } from "@/lib/service-pages";
import { resolveLocaleParams, type LocaleParams } from "@/i18n/params";
import type { ServicePageSlug } from "@/lib/i18n-message-keys";

type PageProps = LocaleParams<{ slug: string }>;

export function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await resolveLocaleParams(params);
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
  const { locale, slug } = await resolveLocaleParams(params);
  setRequestLocale(locale);

  const page = getServicePage(slug);
  if (!page) notFound();

  return <ServiceLanding page={page} />;
}
