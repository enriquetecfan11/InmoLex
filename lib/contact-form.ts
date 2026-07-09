import { z } from "zod";

export const QUERY_TYPES = ["compra", "venta", "alquiler", "valoracion"] as const;

export type QueryType = (typeof QUERY_TYPES)[number];

export const QUERY_TYPE_LABELS: Record<QueryType, string> = {
  compra: "Compra",
  venta: "Venta",
  alquiler: "Alquiler",
  valoracion: "Valoración",
};

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z
    .string()
    .trim()
    .email("Introduce un correo electrónico válido."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^[\d\s+()-]{6,}$/.test(value), {
      message: "Introduce un teléfono válido.",
    }),
  queryType: z.enum(QUERY_TYPES, {
    message: "Selecciona un tipo de consulta.",
  }),
  propertyId: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres."),
  website: z.string().max(0, "Spam detectado."),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;

export type ContactFormInput = {
  name: string;
  email: string;
  phone: string;
  queryType: QueryType | "";
  propertyId: string;
  message: string;
  website: string;
};

export function parseContactFormData(formData: FormData) {
  return contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    queryType: formData.get("queryType"),
    propertyId: formData.get("propertyId") || undefined,
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });
}
