"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { isNavLinkActive, NAV_LINKS } from "@/lib/navigation";

interface NavLinksProps {
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  onNavigate?: () => void;
}

export function NavLinks({
  className = "",
  linkClassName = "px-3 py-2 text-sm font-medium text-white/65 transition-colors hover:text-accent",
  activeClassName = "text-accent",
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav className={className} aria-label={t("ariaLabel")}>
      {NAV_LINKS.map((link) => {
        const isActive = isNavLinkActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`${linkClassName} ${
              isActive
                ? `${activeClassName} relative after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:bg-accent/60`
                : ""
            }`}
          >
            {t(link.key)}
          </Link>
        );
      })}
    </nav>
  );
}
