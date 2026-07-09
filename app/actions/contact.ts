"use server";

import { headers } from "next/headers";
import { parseContactFormData } from "@/lib/contact-form";
import { sendTeamNotification, sendUserConfirmation } from "@/lib/email";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export type ContactSubmitResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContact(
  formData: FormData,
): Promise<ContactSubmitResult> {
  const parsed = parseContactFormData(formData);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return {
      success: false,
      error: firstError ?? "Revisa los datos del formulario.",
    };
  }

  const headerStore = await headers();
  const clientIp = getClientIp(
    headerStore.get("x-forwarded-for"),
    headerStore.get("x-real-ip"),
  );

  if (isRateLimited(clientIp)) {
    return {
      success: false,
      error: "Has enviado demasiados mensajes. Inténtalo más tarde.",
    };
  }

  try {
    await sendTeamNotification(parsed.data);
    await sendUserConfirmation(parsed.data);
    return { success: true };
  } catch {
    return {
      success: false,
      error: "No hemos podido enviar tu mensaje. Inténtalo de nuevo más tarde.",
    };
  }
}
