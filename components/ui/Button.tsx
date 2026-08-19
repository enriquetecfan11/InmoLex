import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent font-semibold text-brand shadow-md shadow-black/20 hover:bg-accent-light focus-visible:ring-accent/40",
  secondary:
    "border border-brand/15 bg-white font-medium text-brand hover:border-accent/50 hover:bg-accent/5 focus-visible:ring-accent/30",
  outline:
    "border-2 border-accent bg-transparent font-medium text-white hover:bg-accent hover:text-brand focus-visible:ring-accent/40",
  ghost:
    "font-medium text-ink-muted hover:text-brand focus-visible:ring-accent/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

function isPublicHref(href: string): boolean {
  return (
    href.startsWith("/") &&
    !href.startsWith("/admin") &&
    !href.startsWith("/api")
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const styles = `inline-flex items-center justify-center rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-60 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    if (isPublicHref(href)) {
      return (
        <Link href={href} className={styles} onClick={onClick}>
          {children}
        </Link>
      );
    }

    return (
      <NextLink href={href} className={styles} onClick={onClick}>
        {children}
      </NextLink>
    );
  }

  return (
    <button
      type={type}
      className={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
