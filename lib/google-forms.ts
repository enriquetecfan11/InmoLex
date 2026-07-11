import {
  buildGoogleFormUrl,
  type GoogleFormPrefill,
} from "@/lib/google-form-prefill";

export type GoogleFormKey = "intermediacion" | "financiacion" | "contacto";

export type { GoogleFormPrefill };

export const GOOGLE_FORM_LABELS: Record<GoogleFormKey, string> = {
  intermediacion: "Compra, venta, alquiler y valoración",
  financiacion: "Hipoteca, préstamo y deuda",
  contacto: "Contacto general e inversores",
};

export const GOOGLE_FORM_ENV_KEYS: Record<GoogleFormKey, string> = {
  intermediacion: "NEXT_PUBLIC_FORM_INTERMEDIACION",
  financiacion: "NEXT_PUBLIC_FORM_FINANCIACION",
  contacto: "NEXT_PUBLIC_FORM_CONTACTO",
};

export const GOOGLE_FORMS: Record<GoogleFormKey, string> = {
  intermediacion: process.env.NEXT_PUBLIC_FORM_INTERMEDIACION ?? "",
  financiacion: process.env.NEXT_PUBLIC_FORM_FINANCIACION ?? "",
  contacto: process.env.NEXT_PUBLIC_FORM_CONTACTO ?? "",
};

export function getGoogleFormUrl(
  key: GoogleFormKey,
  prefill?: GoogleFormPrefill
): string | null {
  const url = GOOGLE_FORMS[key]?.trim();
  if (!url) return null;
  return buildGoogleFormUrl(url, key, prefill);
}

export function isGoogleFormAvailable(key: GoogleFormKey): boolean {
  return getGoogleFormUrl(key) !== null;
}

export interface GoogleFormConfigStatus {
  key: GoogleFormKey;
  envKey: string;
  label: string;
  configured: boolean;
  url: string | null;
}

export function getGoogleFormsConfigStatus(): GoogleFormConfigStatus[] {
  return (Object.keys(GOOGLE_FORM_ENV_KEYS) as GoogleFormKey[]).map((key) => ({
    key,
    envKey: GOOGLE_FORM_ENV_KEYS[key],
    label: GOOGLE_FORM_LABELS[key],
    configured: isGoogleFormAvailable(key),
    url: getGoogleFormUrl(key),
  }));
}

export function areAllGoogleFormsConfigured(): boolean {
  return getGoogleFormsConfigStatus().every((form) => form.configured);
}
