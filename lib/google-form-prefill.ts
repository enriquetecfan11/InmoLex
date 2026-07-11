import type { GoogleFormKey } from "@/lib/google-forms";

/** IDs de la 1ª pregunta (opción múltiple) de cada formulario en Google Forms. */
export const GOOGLE_FORM_CHOICE_ENTRY: Record<GoogleFormKey, string> = {
  intermediacion: "1078224992",
  financiacion: "1848332418",
  contacto: "618449557",
};

/** Campo «¿Qué propiedad te interesa?» del formulario de contacto. */
export const CONTACTO_PROPERTY_ENTRY = "1379642937";

/** Valores exactos de la 1ª pregunta — deben coincidir con Google Forms. */
export const INTERMEDIACION_CHOICES = {
  comprar: "Comprar una propiedad",
  vender: "Vender una propiedad",
  buscarAlquiler: "Buscar un alquiler",
  ponerAlquiler: "Poner en alquiler",
  valoracion: "Valoración gratuita",
} as const;

export const FINANCIACION_CHOICES = {
  hipoteca: "Hipoteca",
  prestamo: "Préstamo personal",
  deuda: "Problemas con el pago de la vivienda",
} as const;

export const CONTACTO_CHOICES = {
  consulta: "Tengo una consulta",
  inversor: "Soy inversor / busco subastas",
  visita: "Quiero visitar una propiedad",
} as const;

export interface GoogleFormPrefill {
  /** Valor de la 1ª pregunta (opción múltiple). */
  choice?: string;
  /** Campos adicionales por entry ID (p. ej. nombre de propiedad). */
  fields?: Record<string, string>;
}

export function buildGoogleFormUrl(
  baseUrl: string,
  formKey: GoogleFormKey,
  prefill?: GoogleFormPrefill
): string {
  if (!prefill?.choice && !prefill?.fields) {
    return baseUrl;
  }

  const url = new URL(baseUrl);
  url.searchParams.set("usp", "pp_url");

  if (prefill.choice) {
    url.searchParams.set(
      `entry.${GOOGLE_FORM_CHOICE_ENTRY[formKey]}`,
      prefill.choice
    );
  }

  if (prefill.fields) {
    for (const [entryId, value] of Object.entries(prefill.fields)) {
      if (value.trim()) {
        url.searchParams.set(`entry.${entryId}`, value);
      }
    }
  }

  return url.toString();
}
