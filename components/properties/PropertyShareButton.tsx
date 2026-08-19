"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  formatPrice,
  formatPropertyReference,
  type Property,
} from "@/lib/properties";

interface PropertyShareButtonProps {
  property: Property;
  className?: string;
}

export function PropertyShareButton({
  property,
  className = "",
}: PropertyShareButtonProps) {
  const locale = useLocale();
  const t = useTranslations("properties.share");
  const tCommon = useTranslations("common");
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const reference = formatPropertyReference(property.id);
  const price = formatPrice(property.price, property.operation, {
    locale,
    perMonth: tCommon("perMonth"),
  });
  const shareText = `${property.title} · ${price} · ${tCommon("ref", { id: reference })}`;

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
  const emailHref = `mailto:?subject=${encodeURIComponent(t("emailSubject", { title: property.title }))}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;

  const copyLink = useCallback(async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [shareUrl]);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-lg border border-accent/25 bg-brand/60 px-4 py-2.5 text-sm font-medium text-accent backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-brand/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M10.5 9.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM3.25 4.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0ZM14.25 4.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0ZM5.1 5.9 7.1 7.35M10.9 7.35l2-1.45M8.65 9.55v2.2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {t("share")}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label={t("close")}
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            className="absolute right-0 z-50 mt-2 min-w-[220px] overflow-hidden rounded-xl border border-accent/20 bg-brand-dark/95 p-2 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.7)] backdrop-blur-md"
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              role="menuitem"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-accent/10 hover:text-accent"
              onClick={() => setOpen(false)}
            >
              {tCommon("whatsapp")}
            </a>
            <a
              href={emailHref}
              role="menuitem"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-accent/10 hover:text-accent"
              onClick={() => setOpen(false)}
            >
              {tCommon("email")}
            </a>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                void copyLink();
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-accent/10 hover:text-accent"
            >
              {copied ? t("copied") : t("copy")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
