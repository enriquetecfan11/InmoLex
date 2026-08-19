"use client";

import { useActionState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { submitLeadForm, type SubmitLeadFormState } from "@/app/actions/submit-google-form";
import type { FormErrorKey } from "@/lib/i18n-message-keys";
import {
  FormErrorMessage,
  FormInput,
  FormLabel,
  FormShell,
  FormSuccessMessage,
  FormTextarea,
} from "@/components/forms/FormField";
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
  detailsLabel,
  detailsPlaceholder,
  showProperty = false,
  propertyDefault = "",
  submitLabel,
  className = "",
}: InmoLexLeadFormProps) {
  const t = useTranslations("forms");
  const [state, formAction, isPending] = useActionState(
    submitLeadForm,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const privacyLabel =
    formKey === "financiacion" ? t("privacyFinance") : t("privacy");
  const configured = isGoogleFormAvailable(formKey);
  const resolvedDetailsLabel = detailsLabel ?? t("detailsDefault");
  const resolvedSubmitLabel = submitLabel ?? t("submit");

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  if (!configured) {
    return (
      <FormShell className={className}>
        <p className="text-center text-sm text-white/60">
          {t.rich("unavailable", {
            link: (chunks) => (
              <Link href="/contacto" className="text-accent underline underline-offset-2">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </FormShell>
    );
  }

  if (state.ok) {
    return (
      <FormShell className={className}>
        <FormSuccessMessage>{t("success")}</FormSuccessMessage>
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
              {t("zone")}
            </FormLabel>
            <FormInput
              id="zona"
              name="zona"
              type="text"
              placeholder={t("zonePlaceholder")}
              autoComplete="address-level2"
            />
          </div>
        )}

        {showDetails && (
          <div>
            <FormLabel htmlFor="details" optional>
              {resolvedDetailsLabel}
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
              {t("property")}
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
            <FormLabel htmlFor="nombre">{t("name")}</FormLabel>
            <FormInput
              id="nombre"
              name="nombre"
              type="text"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <FormLabel htmlFor="telefono">{t("phone")}</FormLabel>
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
          <FormLabel htmlFor="email">{t("email")}</FormLabel>
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
              {t("privacyLink")}
            </Link>
          </span>
        </label>

        {state.errorKey && (
          <FormErrorMessage message={t(`errors.${state.errorKey as FormErrorKey}`)} />
        )}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-semibold text-brand shadow-md shadow-black/20 transition-all duration-300 hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? t("submitting") : resolvedSubmitLabel}
        </button>
      </form>
    </FormShell>
  );
}
