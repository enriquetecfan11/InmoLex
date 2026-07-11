import type { ReactNode } from "react";
import {
  getGoogleFormUrl,
  type GoogleFormKey,
  type GoogleFormPrefill,
} from "@/lib/google-forms";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface GoogleFormButtonProps {
  formKey: GoogleFormKey;
  children: ReactNode;
  prefill?: GoogleFormPrefill;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fallbackHref?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent font-semibold text-brand shadow-md shadow-black/20 hover:bg-accent-light focus-visible:ring-accent/40",
  secondary:
    "border border-brand/15 bg-white font-medium text-brand hover:border-accent/50 hover:bg-accent/5 focus-visible:ring-accent/30",
  outline:
    "border-2 border-accent bg-transparent font-medium text-white hover:bg-accent hover:text-brand focus-visible:ring-accent/40",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const baseStyles =
  "inline-flex items-center justify-center rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2";

export function GoogleFormButton({
  formKey,
  children,
  prefill,
  variant = "primary",
  size = "md",
  className = "",
  fallbackHref = "/contacto",
}: GoogleFormButtonProps) {
  const url = getGoogleFormUrl(formKey, prefill);
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={fallbackHref} className={styles}>
      {children}
    </a>
  );
}
