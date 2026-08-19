import { defineRouting } from "next-intl/routing";

export const locales = [
  "es",
  "en",
  "sv",
  "uk",
  "it",
  "zh",
  "nl",
  "nb",
  "ca",
] as const;

export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "es",
  localePrefix: "as-needed",
});
