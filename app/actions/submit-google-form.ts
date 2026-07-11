"use server";

import {
  submitToGoogleForm,
  type LeadFormPayload,
} from "@/lib/google-forms-submit";
import type { GoogleFormKey } from "@/lib/google-forms";
import { isGoogleFormAvailable } from "@/lib/google-forms";

export interface SubmitLeadFormState {
  ok: boolean;
  error?: string;
}

export async function submitLeadForm(
  _prevState: SubmitLeadFormState,
  formData: FormData
): Promise<SubmitLeadFormState> {
  const formKey = formData.get("formKey") as GoogleFormKey;

  if (!formKey || !isGoogleFormAvailable(formKey)) {
    return { ok: false, error: "Formulario no disponible." };
  }

  const payload: LeadFormPayload = {
    choice: String(formData.get("choice") ?? ""),
    nombre: String(formData.get("nombre") ?? ""),
    telefono: String(formData.get("telefono") ?? ""),
    email: String(formData.get("email") ?? ""),
    privacyAccepted: formData.get("privacy") === "on",
    zona: String(formData.get("zona") ?? "") || undefined,
    details: String(formData.get("details") ?? "") || undefined,
    property: String(formData.get("property") ?? "") || undefined,
  };

  return submitToGoogleForm(formKey, payload);
}
