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

export interface GoogleFormSubmitResult {
  ok: boolean;
  errorKey?: string;
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
): Promise<GoogleFormSubmitResult> {
  if (!payload.choice.trim()) {
    return { ok: false, errorKey: "choice" };
  }
  if (!payload.nombre.trim()) {
    return { ok: false, errorKey: "name" };
  }
  if (!payload.telefono.trim()) {
    return { ok: false, errorKey: "phone" };
  }
  if (!payload.email.trim() || !payload.email.includes("@")) {
    return { ok: false, errorKey: "email" };
  }
  if (!payload.privacyAccepted) {
    return { ok: false, errorKey: "privacy" };
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

    return { ok: false, errorKey: "submit" };
  } catch {
    return { ok: false, errorKey: "connection" };
  }
}
