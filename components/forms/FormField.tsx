import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { useTranslations } from "next-intl";

const fieldClassName =
  "w-full rounded-lg border border-accent/20 bg-brand-dark/50 px-4 py-3 text-sm text-white placeholder:text-white/35 transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelClassName = "mb-2 block text-sm font-medium text-white/75";

export function FormLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) {
  const t = useTranslations("forms");

  return (
    <label htmlFor={htmlFor} className={labelClassName}>
      {children}
      {optional && (
        <span className="ml-1 font-normal text-white/40">{t("optional")}</span>
      )}
    </label>
  );
}

export function FormInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${fieldClassName} ${className}`} {...props} />;
}

export function FormTextarea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`${fieldClassName} min-h-[110px] resize-y ${className}`}
      {...props}
    />
  );
}

export function FormShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-accent/15 bg-accent/[0.04] p-6 backdrop-blur-sm sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function FormSuccessMessage({ children }: { children: ReactNode }) {
  const t = useTranslations("forms");

  return (
    <div className="rounded-xl border border-accent/30 bg-accent/[0.1] px-5 py-6 text-center">
      <p className="font-display text-2xl text-accent">{children}</p>
      <p className="mt-2 text-sm text-white/65">
        {t("successLead")}
      </p>
    </div>
  );
}

export function FormErrorMessage({ message }: { message: string }) {
  return (
    <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
      {message}
    </p>
  );
}
