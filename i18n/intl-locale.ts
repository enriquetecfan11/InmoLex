import type { AppLocale } from "@/i18n/routing";

const INTL_LOCALES: Record<AppLocale, string> = {
  es: "es-ES",
  en: "en-GB",
  sv: "sv-SE",
  uk: "uk-UA",
  it: "it-IT",
  zh: "zh-CN",
  nl: "nl-NL",
  nb: "nb-NO",
  ca: "ca-ES",
};

export function toIntlLocale(locale: string): string {
  return INTL_LOCALES[locale as AppLocale] ?? locale;
}
