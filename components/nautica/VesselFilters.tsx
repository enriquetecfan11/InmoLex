"use client";

import { useTranslations } from "next-intl";
import { OPERATION_LABELS, type Operation } from "@/lib/properties";
import {
  VESSEL_LOCATIONS,
  VESSEL_TYPE_LABELS,
  matchesVesselSearch,
  type Vessel,
  type VesselType,
} from "@/lib/vessels";

export type VesselSort = "" | "recientes" | "precio-asc" | "precio-desc" | "eslora-desc";

export interface VesselFiltersState {
  query: string;
  operation: Operation | "";
  location: string;
  priceRange: string;
  lengthRange: string;
  type: VesselType | "";
  sort: VesselSort;
}

interface VesselFiltersProps {
  filters: VesselFiltersState;
  onChange: (filters: VesselFiltersState) => void;
  resultCount: number;
  locations?: readonly string[];
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

export const initialVesselFilters: VesselFiltersState = {
  query: "",
  operation: "",
  location: "",
  priceRange: "",
  lengthRange: "",
  type: "",
  sort: "",
};

export function VesselFilters({
  filters,
  onChange,
  resultCount,
  locations = VESSEL_LOCATIONS,
}: VesselFiltersProps) {
  const t = useTranslations("vessels");
  const tFilters = useTranslations("vessels.filters");
  const tLabels = useTranslations("labels");

  const update = (partial: Partial<VesselFiltersState>) => {
    onChange({ ...filters, ...partial });
  };

  const hasActiveFilters =
    filters.query ||
    filters.operation ||
    filters.location ||
    filters.priceRange ||
    filters.lengthRange ||
    filters.type ||
    filters.sort;

  return (
    <div className="property-filters">
      <div className="property-filters-bar rounded-xl border border-accent/15 bg-accent/[0.04] p-4 backdrop-blur-sm sm:p-5 lg:p-6">
        <div className="mb-4">
          <label
            htmlFor="vessel-filter-query"
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
              id="vessel-filter-query"
              type="search"
              value={filters.query}
              onChange={(e) => update({ query: e.target.value })}
              placeholder={tFilters("searchPlaceholder")}
              className="w-full rounded-lg border border-accent/15 bg-brand-dark/50 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/35 transition-colors hover:border-accent/30 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/15"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">
          <FilterField label={tFilters("operation")} id="vessel-filter-operation">
            <select
              id="vessel-filter-operation"
              value={filters.operation}
              onChange={(e) => update({ operation: e.target.value as Operation | "" })}
              className={selectClassName}
            >
              <option value="">{tFilters("allOperations")}</option>
              {(Object.keys(OPERATION_LABELS) as Operation[]).map((op) => (
                <option key={op} value={op}>
                  {tLabels(`operation.${op}`)}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label={tFilters("portZone")} id="vessel-filter-location">
            <select
              id="vessel-filter-location"
              value={filters.location}
              onChange={(e) => update({ location: e.target.value })}
              className={selectClassName}
            >
              <option value="">{tFilters("allPorts")}</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label={tFilters("price")} id="vessel-filter-price">
            <select
              id="vessel-filter-price"
              value={filters.priceRange}
              onChange={(e) => update({ priceRange: e.target.value })}
              className={selectClassName}
            >
              <option value="">{tFilters("anyPrice")}</option>
              <option value="0-100000">{tFilters("price0")}</option>
              <option value="100000-500000">{tFilters("price1")}</option>
              <option value="500000-1000000">{tFilters("price2")}</option>
              <option value="1000000+">{tFilters("price3")}</option>
              <option value="rent-0-5000">{tFilters("rent0")}</option>
              <option value="rent-5000+">{tFilters("rent1")}</option>
            </select>
          </FilterField>

          <FilterField label={tFilters("length")} id="vessel-filter-length">
            <select
              id="vessel-filter-length"
              value={filters.lengthRange}
              onChange={(e) => update({ lengthRange: e.target.value })}
              className={selectClassName}
            >
              <option value="">{tFilters("anyLength")}</option>
              <option value="0-10">{tFilters("length0")}</option>
              <option value="10-15">{tFilters("length1")}</option>
              <option value="15-20">{tFilters("length2")}</option>
              <option value="20+">{tFilters("length3")}</option>
            </select>
          </FilterField>

          <FilterField label={tFilters("type")} id="vessel-filter-type">
            <select
              id="vessel-filter-type"
              value={filters.type}
              onChange={(e) => update({ type: e.target.value as VesselType | "" })}
              className={selectClassName}
            >
              <option value="">{tFilters("allTypes")}</option>
              {(Object.keys(VESSEL_TYPE_LABELS) as VesselType[]).map((type) => (
                <option key={type} value={type}>
                  {tLabels(`vesselType.${type}`)}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label={tFilters("sort")} id="vessel-filter-sort">
            <select
              id="vessel-filter-sort"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as VesselSort })}
              className={selectClassName}
            >
              <option value="">{tFilters("relevance")}</option>
              <option value="recientes">{tFilters("newest")}</option>
              <option value="precio-asc">{tFilters("priceAsc")}</option>
              <option value="precio-desc">{tFilters("priceDesc")}</option>
              <option value="eslora-desc">{tFilters("lengthDesc")}</option>
            </select>
          </FilterField>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-accent/15 pt-4">
          <p className="text-sm text-white/55">
            <span className="font-semibold text-accent">{resultCount}</span>{" "}
            {resultCount === 1 ? t("resultOne") : t("resultOther")}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => onChange(initialVesselFilters)}
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

export function filterVessels(vessels: Vessel[], filters: VesselFiltersState): Vessel[] {
  return vessels.filter((vessel) => {
    if (!matchesVesselSearch(vessel, filters.query)) return false;
    if (filters.operation && vessel.operation !== filters.operation) return false;
    if (filters.location && vessel.location !== filters.location) return false;
    if (filters.type && vessel.type !== filters.type) return false;

    if (filters.lengthRange) {
      const length = vessel.lengthMeters;
      switch (filters.lengthRange) {
        case "0-10":
          if (length > 10) return false;
          break;
        case "10-15":
          if (length < 10 || length > 15) return false;
          break;
        case "15-20":
          if (length < 15 || length > 20) return false;
          break;
        case "20+":
          if (length < 20) return false;
          break;
      }
    }

    if (filters.priceRange) {
      const { price, operation } = vessel;
      switch (filters.priceRange) {
        case "0-100000":
          if (operation !== "venta" || price > 100_000) return false;
          break;
        case "100000-500000":
          if (operation !== "venta" || price < 100_000 || price > 500_000) return false;
          break;
        case "500000-1000000":
          if (operation !== "venta" || price < 500_000 || price > 1_000_000) return false;
          break;
        case "1000000+":
          if (operation !== "venta" || price < 1_000_000) return false;
          break;
        case "rent-0-5000":
          if (operation !== "alquiler" || price > 5_000) return false;
          break;
        case "rent-5000+":
          if (operation !== "alquiler" || price < 5_000) return false;
          break;
      }
    }

    return true;
  });
}
