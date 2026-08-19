import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { routing } from "@/i18n/routing";
import { resolveLocale, type LocaleParams } from "@/i18n/params";

type Props = LocaleParams & {
  children: React.ReactNode;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
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
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
