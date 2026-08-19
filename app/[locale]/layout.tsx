import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { routing, type AppLocale } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: AppLocale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const languages = Object.fromEntries(
    routing.locales.map((code) => [
      code,
      code === routing.defaultLocale ? "/" : `/${code}`,
    ]),
  );

  return {
    title: {
      default: t("siteTitle"),
      template: t("siteTitleTemplate"),
    },
    description: t("siteDescription"),
    alternates: {
      languages: {
        ...languages,
        "x-default": "/",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
      <CookieConsent />
    </NextIntlClientProvider>
  );
}
