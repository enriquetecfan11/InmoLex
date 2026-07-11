"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { submitLeadForm, type SubmitLeadFormState } from "@/app/actions/submit-google-form";
import {
  FormErrorMessage,
  FormInput,
  FormLabel,
  FormShell,
  FormSuccessMessage,
  FormTextarea,
} from "@/components/forms/FormField";
import { GOOGLE_FORM_FIELDS } from "@/lib/google-form-fields";
import type { GoogleFormKey } from "@/lib/google-forms";
import { isGoogleFormAvailable } from "@/lib/google-forms";

export interface InmoLexLeadFormProps {
  formKey: GoogleFormKey;
  choice: string;
  choiceLabel?: string;
  showZona?: boolean;
  showDetails?: boolean;
  detailsLabel?: string;
  detailsPlaceholder?: string;
  showProperty?: boolean;
  propertyDefault?: string;
  submitLabel?: string;
  className?: string;
}

const initialState: SubmitLeadFormState = { ok: false };

export function InmoLexLeadForm({
  formKey,
  choice,
  choiceLabel,
  showZona = false,
  showDetails = false,
  detailsLabel = "Cuéntanos qué necesitas",
  detailsPlaceholder,
  showProperty = false,
  propertyDefault = "",
  submitLabel = "Enviar solicitud",
  className = "",
}: InmoLexLeadFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitLeadForm,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const privacyLabel = GOOGLE_FORM_FIELDS[formKey].privacyValue;
  const configured = isGoogleFormAvailable(formKey);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  if (!configured) {
    return (
      <FormShell className={className}>
        <p className="text-center text-sm text-white/60">
          Formulario próximamente. Mientras tanto,{" "}
          <Link href="/contacto" className="text-accent underline underline-offset-2">
            contáctanos aquí
          </Link>
          .
        </p>
      </FormShell>
    );
  }

  if (state.ok) {
    return (
      <FormShell className={className}>
        <FormSuccessMessage>¡Solicitud enviada!</FormSuccessMessage>
      </FormShell>
    );
  }

  return (
    <FormShell className={className}>
      {choiceLabel && (
        <p className="mb-6 inline-flex rounded-full border border-accent/25 bg-accent/[0.08] px-4 py-1.5 text-sm font-medium text-accent">
          {choiceLabel}
        </p>
      )}

      <form ref={formRef} action={formAction} className="space-y-5">
        <input type="hidden" name="formKey" value={formKey} />
        <input type="hidden" name="choice" value={choice} />

        {showZona && (
          <div>
            <FormLabel htmlFor="zona" optional>
              ¿En qué zona?
            </FormLabel>
            <FormInput
              id="zona"
              name="zona"
              type="text"
              placeholder="Salamanca, Chamberí, La Moraleja…"
              autoComplete="address-level2"
            />
          </div>
        )}

        {showDetails && (
          <div>
            <FormLabel htmlFor="details" optional>
              {detailsLabel}
            </FormLabel>
            <FormTextarea
              id="details"
              name="details"
              placeholder={detailsPlaceholder}
              rows={4}
            />
          </div>
        )}

        {showProperty && (
          <div>
            <FormLabel htmlFor="property" optional>
              ¿Qué propiedad te interesa?
            </FormLabel>
            <FormInput
              id="property"
              name="property"
              type="text"
              defaultValue={propertyDefault}
            />
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <FormLabel htmlFor="nombre">Nombre</FormLabel>
            <FormInput
              id="nombre"
              name="nombre"
              type="text"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <FormLabel htmlFor="telefono">Teléfono</FormLabel>
            <FormInput
              id="telefono"
              name="telefono"
              type="tel"
              required
              autoComplete="tel"
            />
          </div>
        </div>

        <div>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-accent/10 bg-brand-dark/30 px-4 py-3">
          <input
            type="checkbox"
            name="privacy"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-accent/30 accent-accent"
          />
          <span className="text-sm leading-relaxed text-white/65">
            {privacyLabel}.{" "}
            <Link
              href="/privacidad"
              className="text-accent underline underline-offset-2 hover:text-accent-light"
            >
              Ver política
            </Link>
          </span>
        </label>

        {state.error && <FormErrorMessage message={state.error} />}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-semibold text-brand shadow-md shadow-black/20 transition-all duration-300 hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Enviando…" : submitLabel}
        </button>
      </form>
    </FormShell>
  );
}
