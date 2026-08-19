import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export type LocaleParams<T extends object = object> = {
  params: Promise<{ locale: string } & T>;
};

export async function resolveLocaleParams<T extends { locale: string }>(
  params: Promise<T>,
): Promise<Omit<T, "locale"> & { locale: AppLocale }> {
  const resolved = await params;
  if (!hasLocale(routing.locales, resolved.locale)) {
    notFound();
  }
  return { ...resolved, locale: resolved.locale };
}

export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<AppLocale> {
  const { locale } = await resolveLocaleParams(params);
  return locale;
}
