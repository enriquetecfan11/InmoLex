import Link from "next/link";
import { getWhatsAppHref } from "@/lib/contact";

interface WhatsAppLinkProps {
  className?: string;
  children?: React.ReactNode;
  message?: string;
  showIcon?: boolean;
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 1.5a7.5 7.5 0 0 0-6.52 11.28L1.5 16.5l4-1.9A7.5 7.5 0 1 0 9 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6.8 7.2c.2-.5.4-.5.7-.5h.6c.2 0 .4.1.5.4l.8 1.9c.1.2 0 .5-.2.7l-.5.5c-.2.2-.2.4 0 .7.5.8 1.3 1.6 2.1 2.1.3.2.5.2.7 0l.5-.5c.2-.2.5-.3.7-.2l1.9.8c.3.1.4.3.4.5v.6c0 .3 0 .5-.5.7-.8.4-2 .2-3.4-.9-1.5-1.1-2.7-2.8-3-3.6-.3-.8-.1-1.4.3-1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WhatsAppLink({
  className = "",
  children,
  message,
  showIcon = true,
}: WhatsAppLinkProps) {
  return (
    <Link
      href={getWhatsAppHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 transition-colors ${className}`}
    >
      {showIcon && <WhatsAppIcon />}
      {children ?? "WhatsApp"}
    </Link>
  );
}
