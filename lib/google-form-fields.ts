import type { GoogleFormKey } from "@/lib/google-forms";

/** ID del formulario en la URL de respuesta de Google Forms. */
export const GOOGLE_FORM_RESPONSE_IDS: Record<GoogleFormKey, string> = {
  intermediacion: "1FAIpQLSfCWyrHqwo4kEpniassynuI4x2ukqlcZvi1RKfzGDmaJzsOog",
  financiacion: "1FAIpQLScYeUxQSe7bLt4lxXC5v02RXW1g7tf7enk9QBLdvS5X0XGtUA",
  contacto: "1FAIpQLSew5D1fYea2pjEO2_EVYQo_8marh_UdqneoYpd8fOrRnhHfzg",
};

export interface GoogleFormFieldMap {
  choice: string;
  details?: string;
  zona?: string;
  property?: string;
  nombre: string;
  telefono: string;
  email: string;
  privacy: string;
  privacyValue: string;
}

export const GOOGLE_FORM_FIELDS: Record<GoogleFormKey, GoogleFormFieldMap> = {
  intermediacion: {
    choice: "1078224992",
    zona: "434490153",
    details: "558024230",
    nombre: "1056682299",
    telefono: "637763077",
    email: "349967402",
    privacy: "10581469",
    privacyValue: "Acepto la política de privacidad",
  },
  financiacion: {
    choice: "1848332418",
    details: "684270720",
    nombre: "2144804842",
    telefono: "1870811051",
    email: "1425882905",
    privacy: "732957064",
    privacyValue:
      "Acepto la política de privacidad y el tratamiento confidencial de mis datos",
  },
  contacto: {
    choice: "618449557",
    details: "527586559",
    property: "1379642937",
    nombre: "1398956602",
    telefono: "1396724775",
    email: "294305416",
    privacy: "341657304",
    privacyValue: "Acepto la política de privacidad",
  },
};

export function getGoogleFormResponseUrl(key: GoogleFormKey): string {
  return `https://docs.google.com/forms/d/e/${GOOGLE_FORM_RESPONSE_IDS[key]}/formResponse`;
}
