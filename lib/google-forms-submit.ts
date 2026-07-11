import {
  getGoogleFormResponseUrl,
  GOOGLE_FORM_FIELDS,
  type GoogleFormFieldMap,
} from "@/lib/google-form-fields";
import type { GoogleFormKey } from "@/lib/google-forms";

export interface LeadFormPayload {
  choice: string;
  nombre: string;
  telefono: string;
  email: string;
  privacyAccepted: boolean;
  zona?: string;
  details?: string;
  property?: string;
}

function appendEntry(
  params: URLSearchParams,
  entryId: string | undefined,
  value: string | undefined
) {
  if (entryId && value?.trim()) {
    params.set(`entry.${entryId}`, value.trim());
  }
}

function buildSubmissionBody(
  fields: GoogleFormFieldMap,
  payload: LeadFormPayload
): URLSearchParams {
  const params = new URLSearchParams();

  appendEntry(params, fields.choice, payload.choice);
  appendEntry(params, fields.zona, payload.zona);
  appendEntry(params, fields.details, payload.details);
  appendEntry(params, fields.property, payload.property);
  appendEntry(params, fields.nombre, payload.nombre);
  appendEntry(params, fields.telefono, payload.telefono);
  appendEntry(params, fields.email, payload.email);

  if (payload.privacyAccepted) {
    params.set(`entry.${fields.privacy}`, fields.privacyValue);
  }

  return params;
}

export async function submitToGoogleForm(
  formKey: GoogleFormKey,
  payload: LeadFormPayload
): Promise<{ ok: boolean; error?: string }> {
  if (!payload.choice.trim()) {
    return { ok: false, error: "Selecciona una opción." };
  }
  if (!payload.nombre.trim()) {
    return { ok: false, error: "El nombre es obligatorio." };
  }
  if (!payload.telefono.trim()) {
    return { ok: false, error: "El teléfono es obligatorio." };
  }
  if (!payload.email.trim() || !payload.email.includes("@")) {
    return { ok: false, error: "Introduce un email válido." };
  }
  if (!payload.privacyAccepted) {
    return { ok: false, error: "Debes aceptar la política de privacidad." };
  }

  const fields = GOOGLE_FORM_FIELDS[formKey];
  const body = buildSubmissionBody(fields, payload);

  try {
    const response = await fetch(getGoogleFormResponseUrl(formKey), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      redirect: "manual",
    });

    // Google Forms responde 200 o redirige tras aceptar el envío.
    if (response.status === 200 || response.status === 302 || response.status === 0) {
      return { ok: true };
    }

    return { ok: false, error: "No se pudo enviar. Inténtalo de nuevo." };
  } catch {
    return { ok: false, error: "Error de conexión. Inténtalo de nuevo." };
  }
}
