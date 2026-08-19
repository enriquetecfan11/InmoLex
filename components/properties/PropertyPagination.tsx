"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";

interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  itemLabel?: string;
  ariaLabel?: string;
}

function buildPageHref(pathname: string, params: URLSearchParams, page: number): string {
  const next = new URLSearchParams(params.toString());
  if (page <= 1) next.delete("pagina");
  else next.set("pagina", String(page));
  const qs = next.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function PropertyPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  itemLabel,
  ariaLabel,
}: PropertyPaginationProps) {
  const t = useTranslations("properties");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const resolvedItemLabel = itemLabel ?? t("resultOther");
  const resolvedAriaLabel = ariaLabel ?? t("paginationAria");

  const pages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const items = new Set<number>([1, totalPages, currentPage]);
    if (currentPage > 1) items.add(currentPage - 1);
    if (currentPage < totalPages) items.add(currentPage + 1);

    return [...items].sort((a, b) => a - b);
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const goToPage = (page: number) => {
    router.replace(buildPageHref(pathname, searchParams, page), { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className="property-pagination mt-12 border-t border-accent/15 pt-8 sm:mt-16"
      aria-label={resolvedAriaLabel}
    >
      <p className="text-center text-sm text-white/45">
        {t("showing", {
          start,
          end,
          total: totalItems,
          itemLabel: resolvedItemLabel,
        })}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="rounded-lg border border-accent/20 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-accent/35 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          {tCommon("previous")}
        </button>

        {pages.map((page, index) => {
          const prev = pages[index - 1];
          const showEllipsis = prev !== undefined && page - prev > 1;

          return (
            <span key={page} className="flex items-center gap-2">
              {showEllipsis && <span className="px-1 text-white/30">…</span>}
              <button
                type="button"
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`min-w-10 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "border-accent/40 bg-accent text-brand"
                    : "border-accent/15 text-white/70 hover:border-accent/30 hover:text-accent"
                }`}
              >
                {page}
              </button>
            </span>
          );
        })}

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded-lg border border-accent/20 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-accent/35 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          {tCommon("next")}
        </button>
      </div>
    </nav>
  );
}

export const PROPERTIES_PAGE_SIZE = 6;
