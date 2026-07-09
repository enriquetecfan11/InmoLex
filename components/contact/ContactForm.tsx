"use client";

import { useCallback, useEffect, useId, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { submitContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import {
  QUERY_TYPE_LABELS,
  QUERY_TYPES,
  type QueryType,
} from "@/lib/contact-form";
import { PROPERTIES } from "@/lib/properties";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  queryType: QueryType | "";
  propertyId: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const INITIAL: FormFields = {
  name: "",
  email: "",
  phone: "",
  queryType: "",
  propertyId: "",
  message: "",
  website: "",
};

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Introduce tu nombre.";
  } else if (fields.name.trim().length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres.";
  }

  if (!fields.email.trim()) {
    errors.email = "Introduce tu correo electrónico.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Introduce un correo electrónico válido.";
  }

  if (fields.phone.trim() && !/^[\d\s+()-]{6,}$/.test(fields.phone)) {
    errors.phone = "Introduce un teléfono válido.";
  }

  if (!fields.queryType) {
    errors.queryType = "Selecciona un tipo de consulta.";
  }

  if (!fields.message.trim()) {
    errors.message = "Cuéntanos en qué podemos ayudarte.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "El mensaje debe tener al menos 10 caracteres.";
  }

  return errors;
}

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/45"
    >
      {children}
      {required && (
        <span className="ml-0.5 text-accent" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}

function CheckIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
      className="contact-success-icon"
    >
      <circle
        cx="14"
        cy="14"
        r="13"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent/30"
      />
      <path
        d="M8.5 14.5 12 18l7.5-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-accent"
      />
    </svg>
  );
}

export function ContactForm() {
  const formId = useId();
  const searchParams = useSearchParams();
  const [fields, setFields] = useState<FormFields>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>(
    {},
  );
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState("");

  const preselectedProperty = searchParams.get("propiedad");

  useEffect(() => {
    if (preselectedProperty && PROPERTIES.some((p) => p.id === preselectedProperty)) {
      setFields((prev) => ({ ...prev, propertyId: preselectedProperty }));
    }
  }, [preselectedProperty]);

  const selectedProperty = PROPERTIES.find((p) => p.id === fields.propertyId);

  const updateField = useCallback(
    (key: keyof FormFields, value: string) => {
      setFields((prev) => ({ ...prev, [key]: value }));
      if (touched[key]) {
        setErrors((prev) => {
          const next = validate({ ...fields, [key]: value });
          const updated = { ...prev };
          if (next[key]) updated[key] = next[key];
          else delete updated[key];
          return updated;
        });
      }
    },
    [fields, touched],
  );

  const handleBlur = (key: keyof FormFields) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const nextErrors = validate(fields);
    setErrors((prev) => ({
      ...prev,
      ...(nextErrors[key] ? { [key]: nextErrors[key] } : {}),
    }));
    if (!nextErrors[key]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      queryType: true,
      message: true,
    });

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitState("submitting");
    setServerError("");

    const formData = new FormData();
    formData.set("name", fields.name.trim());
    formData.set("email", fields.email.trim());
    formData.set("phone", fields.phone.trim());
    formData.set("queryType", fields.queryType);
    formData.set("propertyId", fields.propertyId);
    formData.set("message", fields.message.trim());
    formData.set("website", fields.website);

    try {
      const result = await submitContact(formData);
      if (result.success) {
        setSubmitState("success");
      } else {
        setServerError(result.error);
        setSubmitState("error");
      }
    } catch {
      setServerError("No hemos podido enviar tu mensaje. Inténtalo de nuevo.");
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <div
        className="contact-form-success flex flex-col items-center justify-center rounded-2xl border border-accent/20 bg-accent/[0.04] px-8 py-16 text-center backdrop-blur-sm"
        role="status"
        aria-live="polite"
      >
        <CheckIcon />
        <h3 className="mt-5 font-display text-2xl text-white">
          Mensaje enviado
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
          Gracias por contactarnos. Te responderemos en menos de 24 horas
          laborables.
        </p>
        <Button
          type="button"
          variant="outline"
          size="md"
          className="mt-8"
          onClick={() => {
            setFields(INITIAL);
            setErrors({});
            setTouched({});
            setServerError("");
            setSubmitState("idle");
          }}
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  const inputBase =
    "contact-field w-full rounded-lg border bg-brand-dark/50 px-4 py-3 text-sm text-white transition-all duration-300 placeholder:text-white/30 focus:outline-none";
  const inputNormal = `${inputBase} border-accent/15 hover:border-accent/30 focus:border-accent/40 focus:ring-2 focus:ring-accent/15`;
  const inputError = `${inputBase} border-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/20`;

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      noValidate
      className="contact-form relative rounded-2xl border border-accent/15 bg-accent/[0.04] p-6 backdrop-blur-sm sm:p-8"
      aria-label="Formulario de contacto"
    >
      <input
        type="text"
        name="website"
        value={fields.website}
        onChange={(e) => updateField("website", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {selectedProperty && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-accent/20 bg-accent/[0.06] px-4 py-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="mt-0.5 shrink-0 text-accent"
            aria-hidden
          >
            <path
              d="M3 7.5 9 3l6 4.5V15a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1V7.5Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Consulta sobre propiedad
            </p>
            <p className="mt-0.5 text-sm font-medium text-white">
              {selectedProperty.title}
            </p>
            <p className="text-xs text-white/45">{selectedProperty.location}</p>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <FieldLabel htmlFor={`${formId}-name`} required>
            Nombre
          </FieldLabel>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className={errors.name ? inputError : inputNormal}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            disabled={submitState === "submitting"}
          />
          {errors.name && (
            <p
              id={`${formId}-name-error`}
              className="contact-field-error mt-1.5 text-xs text-accent-light"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <FieldLabel htmlFor={`${formId}-email`} required>
            Correo electrónico
          </FieldLabel>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={fields.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={errors.email ? inputError : inputNormal}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            disabled={submitState === "submitting"}
          />
          {errors.email && (
            <p
              id={`${formId}-email-error`}
              className="contact-field-error mt-1.5 text-xs text-accent-light"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <FieldLabel htmlFor={`${formId}-phone`}>Teléfono</FieldLabel>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={fields.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={errors.phone ? inputError : inputNormal}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            disabled={submitState === "submitting"}
          />
          {errors.phone && (
            <p
              id={`${formId}-phone-error`}
              className="contact-field-error mt-1.5 text-xs text-accent-light"
              role="alert"
            >
              {errors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <FieldLabel htmlFor={`${formId}-query-type`} required>
            Tipo de consulta
          </FieldLabel>
          <select
            id={`${formId}-query-type`}
            name="queryType"
            value={fields.queryType}
            onChange={(e) =>
              updateField("queryType", e.target.value as QueryType | "")
            }
            onBlur={() => handleBlur("queryType")}
            className={`${errors.queryType ? inputError : inputNormal} contact-select appearance-none pr-10`}
            aria-invalid={!!errors.queryType}
            aria-describedby={
              errors.queryType ? `${formId}-query-type-error` : undefined
            }
            disabled={submitState === "submitting"}
          >
            <option value="">Selecciona una opción</option>
            {QUERY_TYPES.map((type) => (
              <option key={type} value={type}>
                {QUERY_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
          {errors.queryType && (
            <p
              id={`${formId}-query-type-error`}
              className="contact-field-error mt-1.5 text-xs text-accent-light"
              role="alert"
            >
              {errors.queryType}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <FieldLabel htmlFor={`${formId}-property`}>
            Propiedad de interés
          </FieldLabel>
          <select
            id={`${formId}-property`}
            name="propertyId"
            value={fields.propertyId}
            onChange={(e) => updateField("propertyId", e.target.value)}
            className={`${inputNormal} contact-select appearance-none pr-10`}
            disabled={submitState === "submitting"}
          >
            <option value="">Sin propiedad asociada</option>
            {PROPERTIES.map((property) => (
              <option key={property.id} value={property.id}>
                {property.title}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor={`${formId}-message`} required>
            Mensaje
          </FieldLabel>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            value={fields.message}
            onChange={(e) => updateField("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            className={`${errors.message ? inputError : inputNormal} resize-y min-h-[120px]`}
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? `${formId}-message-error` : undefined
            }
            disabled={submitState === "submitting"}
            placeholder="Cuéntanos qué necesitas: visita, valoración, información sobre una propiedad..."
          />
          {errors.message && (
            <p
              id={`${formId}-message-error`}
              className="contact-field-error mt-1.5 text-xs text-accent-light"
              role="alert"
            >
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {submitState === "error" && (
        <p
          className="contact-field-error mt-5 rounded-lg border border-accent/30 bg-accent/[0.06] px-4 py-3 text-sm text-accent-light"
          role="alert"
        >
          {serverError ||
            "No hemos podido enviar tu mensaje. Inténtalo de nuevo o llámanos directamente."}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitState === "submitting"}
          className={`contact-submit-btn w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 sm:w-auto ${
            submitState === "submitting" ? "contact-submit-btn--loading" : ""
          }`}
        >
          {submitState === "submitting" ? (
            <span className="flex items-center gap-2.5">
              <span className="contact-spinner" aria-hidden />
              Enviando...
            </span>
          ) : (
            "Enviar mensaje"
          )}
        </Button>
        <WhatsAppLink className="text-sm font-medium text-accent hover:text-accent-light">
          O escríbenos por WhatsApp
        </WhatsAppLink>
      </div>
      <p className="mt-4 text-xs text-white/45">
          Al enviar aceptas nuestra{" "}
          <a
            href="/privacidad"
            className="underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent"
          >
            política de privacidad
          </a>
          . Tus datos no se comparten con terceros.
      </p>
    </form>
  );
}
