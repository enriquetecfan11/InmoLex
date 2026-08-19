import type { AppLocale } from "@/i18n/routing";
import type { Property } from "@/lib/properties";

export interface PropertyLocaleContent {
  title: string;
  description: string;
  features?: string[];
}

export type PropertyTranslations = Partial<Record<AppLocale, PropertyLocaleContent>>;

export function localizeProperty(property: Property, locale: string): Property {
  const content = property.translations?.[locale as AppLocale];
  if (!content) return property;

  return {
    ...property,
    title: content.title || property.title,
    description: content.description || property.description,
    features: content.features ?? property.features,
  };
}

export function localizeProperties(
  properties: Property[],
  locale: string,
): Property[] {
  return properties.map((property) => localizeProperty(property, locale));
}
