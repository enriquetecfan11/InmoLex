"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("languages");
  const tHeader = useTranslations("header");

  return (
    <label className={`relative inline-flex items-center ${className}`}>
      <span className="sr-only">{tHeader("language")}</span>
      <select
        value={locale}
        aria-label={tHeader("language")}
        onChange={(event) => {
          router.replace(pathname, { locale: event.target.value });
        }}
        className="appearance-none rounded-full border border-accent/25 bg-brand/60 py-1.5 pl-3 pr-8 text-xs font-medium uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-accent/40 hover:text-accent focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
      >
        {routing.locales.map((code) => (
          <option key={code} value={code} className="bg-brand text-white">
            {t(code)}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2.5 h-3 w-3 text-accent/80"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden
      >
        <path
          d="M3 4.5 6 7.5 9 4.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
}
