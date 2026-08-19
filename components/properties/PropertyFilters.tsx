"use client";

import { useTranslations } from "next-intl";
import {
  DISTRICTS,
  OPERATION_LABELS,
  PROPERTY_TYPE_LABELS,
  matchesPropertySearch,
  type Operation,
  type Property,
  type PropertyType,
} from "@/lib/properties";

export type PropertySort = "" | "recientes" | "precio-asc" | "precio-desc" | "superficie-desc";

export interface PropertyFiltersState {
  query: string;
  operation: Operation | "";
  district: string;
  priceRange: string;
  bedrooms: string;
  type: PropertyType | "";
  sort: PropertySort;
  terrace: boolean;
  garage: boolean;
  elevator: boolean;
  pmrAccessible: boolean;
}

interface PropertyFiltersProps {
  filters: PropertyFiltersState;
  onChange: (filters: PropertyFiltersState) => void;
  resultCount: number;
}

const selectClassName =
  "property-filter-select w-full appearance-none rounded-lg border border-accent/15 bg-brand-dark/50 px-4 py-2.5 pr-10 text-sm text-white transition-colors hover:border-accent/30 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/15";

function FilterField({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 flex-1">
      <label
        htmlFor={id}
        className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/45"
      >
        {label}
      </label>
      <div className="relative">
        {children}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-accent/60"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
        >
          <path
            d="M3.5 5.25 7 8.75l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function PropertyFilters({
  filters,
  onChange,
  resultCount,
}: PropertyFiltersProps) {
  const t = useTranslations("properties");
  const tFilters = useTranslations("properties.filters");
  const tOperation = useTranslations("labels.operation");
  const tType = useTranslations("labels.propertyType");

  const update = (partial: Partial<PropertyFiltersState>) => {
    onChange({ ...filters, ...partial });
  };

  const hasActiveFilters =
    filters.query ||
    filters.operation ||
    filters.district ||
    filters.priceRange ||
    filters.bedrooms ||
    filters.type ||
    filters.sort ||
    filters.terrace ||
    filters.garage ||
    filters.elevator ||
    filters.pmrAccessible;

  return (
    <div className="property-filters">
      <div className="property-filters-bar rounded-xl border border-accent/15 bg-accent/[0.04] p-4 backdrop-blur-sm sm:p-5 lg:p-6">
        <div className="mb-4">
          <label
            htmlFor="filter-query"
            className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/45"
          >
            {tFilters("search")}
          </label>
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent/60"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.2" />
              <path d="M10.25 10.25 13 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <input
              id="filter-query"
              type="search"
              value={filters.query}
              onChange={(e) => update({ query: e.target.value })}
              placeholder={tFilters("searchPlaceholder")}
              className="w-full rounded-lg border border-accent/15 bg-brand-dark/50 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/35 transition-colors hover:border-accent/30 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/15"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">
          <FilterField label={tFilters("operation")} id="filter-operation">
            <select
              id="filter-operation"
              value={filters.operation}
              onChange={(e) =>
                update({ operation: e.target.value as Operation | "" })
              }
              className={selectClassName}
            >
              <option value="">{tFilters("allOperations")}</option>
              {(Object.keys(OPERATION_LABELS) as Operation[]).map((op) => (
                <option key={op} value={op}>
                  {tOperation(op)}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label={tFilters("location")} id="filter-district">
            <select
              id="filter-district"
              value={filters.district}
              onChange={(e) => update({ district: e.target.value })}
              className={selectClassName}
            >
              <option value="">{tFilters("allZones")}</option>
              {DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label={tFilters("price")} id="filter-price">
            <select
              id="filter-price"
              value={filters.priceRange}
              onChange={(e) => update({ priceRange: e.target.value })}
              className={selectClassName}
            >
              <option value="">{tFilters("anyPrice")}</option>
              <option value="0-500000">{tFilters("price0")}</option>
              <option value="500000-1000000">{tFilters("price1")}</option>
              <option value="1000000-2000000">{tFilters("price2")}</option>
              <option value="2000000+">{tFilters("price3")}</option>
              <option value="rent-0-2500">{tFilters("rent0")}</option>
              <option value="rent-2500+">{tFilters("rent1")}</option>
            </select>
          </FilterField>

          <FilterField label={tFilters("bedrooms")} id="filter-bedrooms">
            <select
              id="filter-bedrooms"
              value={filters.bedrooms}
              onChange={(e) => update({ bedrooms: e.target.value })}
              className={selectClassName}
            >
              <option value="">{tFilters("any")}</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </FilterField>

          <FilterField label={tFilters("type")} id="filter-type">
            <select
              id="filter-type"
              value={filters.type}
              onChange={(e) =>
                update({ type: e.target.value as PropertyType | "" })
              }
              className={selectClassName}
            >
              <option value="">{tFilters("allTypes")}</option>
              {(Object.keys(PROPERTY_TYPE_LABELS) as PropertyType[]).map(
                (type) => (
                  <option key={type} value={type}>
                    {tType(type)}
                  </option>
                ),
              )}
            </select>
          </FilterField>

          <FilterField label={tFilters("sort")} id="filter-sort">
            <select
              id="filter-sort"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as PropertySort })}
              className={selectClassName}
            >
              <option value="">{tFilters("relevance")}</option>
              <option value="recientes">{tFilters("newest")}</option>
              <option value="precio-asc">{tFilters("priceAsc")}</option>
              <option value="precio-desc">{tFilters("priceDesc")}</option>
              <option value="superficie-desc">{tFilters("areaDesc")}</option>
            </select>
          </FilterField>
        </div>

        <div className="mt-4 grid gap-3 border-t border-accent/15 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex items-center gap-2 rounded-lg border border-accent/10 bg-brand-dark/30 px-3 py-2 text-sm text-white/70 transition-colors hover:border-accent/25">
            <input
              type="checkbox"
              checked={filters.terrace}
              onChange={(e) => update({ terrace: e.target.checked })}
              className="h-4 w-4 rounded border-accent/30 bg-brand-dark text-accent focus:ring-2 focus:ring-accent/20"
            />
            {tFilters("terrace")}
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-accent/10 bg-brand-dark/30 px-3 py-2 text-sm text-white/70 transition-colors hover:border-accent/25">
            <input
              type="checkbox"
              checked={filters.garage}
              onChange={(e) => update({ garage: e.target.checked })}
              className="h-4 w-4 rounded border-accent/30 bg-brand-dark text-accent focus:ring-2 focus:ring-accent/20"
            />
            {tFilters("garage")}
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-accent/10 bg-brand-dark/30 px-3 py-2 text-sm text-white/70 transition-colors hover:border-accent/25">
            <input
              type="checkbox"
              checked={filters.elevator}
              onChange={(e) => update({ elevator: e.target.checked })}
              className="h-4 w-4 rounded border-accent/30 bg-brand-dark text-accent focus:ring-2 focus:ring-accent/20"
            />
            {tFilters("elevator")}
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-accent/10 bg-brand-dark/30 px-3 py-2 text-sm text-white/70 transition-colors hover:border-accent/25">
            <input
              type="checkbox"
              checked={filters.pmrAccessible}
              onChange={(e) => update({ pmrAccessible: e.target.checked })}
              className="h-4 w-4 rounded border-accent/30 bg-brand-dark text-accent focus:ring-2 focus:ring-accent/20"
            />
            {tFilters("pmr")}
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-accent/15 pt-4">
          <p className="text-sm text-white/55">
            <span className="font-semibold text-accent">{resultCount}</span>{" "}
            {resultCount === 1 ? t("resultOne") : t("resultOther")}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() =>
                onChange({
                  query: "",
                  operation: "",
                  district: "",
                  priceRange: "",
                  bedrooms: "",
                  type: "",
                  sort: "",
                  terrace: false,
                  garage: false,
                  elevator: false,
                  pmrAccessible: false,
                })
              }
              className="text-sm font-medium text-accent transition-colors hover:text-accent-light"
            >
              {tFilters("clear")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function filterProperties(properties: Property[], filters: PropertyFiltersState): Property[] {
  return properties.filter((property) => {
    if (!matchesPropertySearch(property, filters.query)) {
      return false;
    }

    if (filters.operation && property.operation !== filters.operation) {
      return false;
    }

    if (filters.district && property.district !== filters.district) {
      return false;
    }

    if (filters.bedrooms) {
      const min = Number(filters.bedrooms);
      if (property.bedrooms < min) return false;
    }

    if (filters.type && property.type !== filters.type) {
      return false;
    }

    if (filters.terrace && !property.terrace) return false;
    if (filters.garage && !property.garage) return false;
    if (filters.elevator && !property.elevator) return false;
    if (filters.pmrAccessible && !property.pmrAccessible) return false;

    if (filters.priceRange) {
      const { price, operation } = property;

      switch (filters.priceRange) {
        case "0-500000":
          if (operation !== "venta" || price > 500_000) return false;
          break;
        case "500000-1000000":
          if (operation !== "venta" || price < 500_000 || price > 1_000_000)
            return false;
          break;
        case "1000000-2000000":
          if (operation !== "venta" || price < 1_000_000 || price > 2_000_000)
            return false;
          break;
        case "2000000+":
          if (operation !== "venta" || price < 2_000_000) return false;
          break;
        case "rent-0-2500":
          if (operation !== "alquiler" || price > 2_500) return false;
          break;
        case "rent-2500+":
          if (operation !== "alquiler" || price < 2_500) return false;
          break;
      }
    }

    return true;
  });
}
