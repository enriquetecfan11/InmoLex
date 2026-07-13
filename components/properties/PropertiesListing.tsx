"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  PropertyPagination,
  PROPERTIES_PAGE_SIZE,
} from "@/components/properties/PropertyPagination";
import { PropertyCard } from "@/components/properties/PropertyCard";
import {
  PropertyFilters,
  filterProperties,
  type PropertyFiltersState,
  type PropertySort,
} from "@/components/properties/PropertyFilters";
import { PROPERTIES, type Property } from "@/lib/properties";

interface PropertiesListingProps {
  properties?: Property[];
  showHeader?: boolean;
}

const initialFilters: PropertyFiltersState = {
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
};

function parseBooleanParam(value: string | null): boolean {
  if (!value) return false;
  return value === "1" || value === "true" || value === "si" || value === "sí";
}

function cleanParams(params: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(params);
  for (const [key, value] of next.entries()) {
    if (!value) next.delete(key);
  }
  return next;
}

export function PropertiesListing({
  properties = PROPERTIES,
  showHeader = true,
}: PropertiesListingProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo<PropertyFiltersState>(() => {
    const query = searchParams.get("q") ?? "";
    const operation = (searchParams.get("operacion") ?? "") as PropertyFiltersState["operation"];
    const district = searchParams.get("zona") ?? "";
    const priceRange = searchParams.get("precio") ?? "";
    const bedrooms = searchParams.get("hab") ?? "";
    const type = (searchParams.get("tipo") ?? "") as PropertyFiltersState["type"];
    const sort = (searchParams.get("orden") ?? "") as PropertySort;

    return {
      query,
      operation,
      district,
      priceRange,
      bedrooms,
      type,
      sort,
      terrace: parseBooleanParam(searchParams.get("terraza")),
      garage: parseBooleanParam(searchParams.get("garaje")),
      elevator: parseBooleanParam(searchParams.get("ascensor")),
      pmrAccessible: parseBooleanParam(searchParams.get("pmr")),
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (nextFilters: PropertyFiltersState) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      const setOrDelete = (key: string, value: string) => {
        if (value) nextParams.set(key, value);
        else nextParams.delete(key);
      };

      setOrDelete("operacion", nextFilters.operation);
      setOrDelete("q", nextFilters.query.trim());
      setOrDelete("zona", nextFilters.district);
      setOrDelete("precio", nextFilters.priceRange);
      setOrDelete("hab", nextFilters.bedrooms);
      setOrDelete("tipo", nextFilters.type);
      setOrDelete("orden", nextFilters.sort);

      if (nextFilters.terrace) nextParams.set("terraza", "1");
      else nextParams.delete("terraza");
      if (nextFilters.garage) nextParams.set("garaje", "1");
      else nextParams.delete("garaje");
      if (nextFilters.elevator) nextParams.set("ascensor", "1");
      else nextParams.delete("ascensor");
      if (nextFilters.pmrAccessible) nextParams.set("pmr", "1");
      else nextParams.delete("pmr");

      nextParams.delete("pagina");

      const cleaned = cleanParams(nextParams);
      const qs = cleaned.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const filtered = useMemo(() => filterProperties(properties, filters), [filters, properties]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (filters.sort) {
      case "recientes":
        list.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        break;
      case "precio-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "precio-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "superficie-desc":
        list.sort((a, b) => b.sqm - a.sqm);
        break;
    }
    return list;
  }, [filtered, filters.sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PROPERTIES_PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, Number.parseInt(searchParams.get("pagina") ?? "1", 10) || 1),
    totalPages,
  );
  const paginated = sorted.slice(
    (currentPage - 1) * PROPERTIES_PAGE_SIZE,
    currentPage * PROPERTIES_PAGE_SIZE,
  );

  return (
    <section className="brand-section py-12 sm:py-16 lg:py-20">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />
      <div className="brand-section__glow" aria-hidden />

      <Container className="relative">
        {showHeader && (
          <RevealOnScroll>
            <header className="mx-auto max-w-2xl text-center">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
                Nuestros inmuebles en cartera
              </p>
              <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem]">
                Propiedades disponibles
              </h1>
              <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
                Una selección cuidada de viviendas de alto standing en las
                mejores zonas de Madrid. Cada propiedad, revisada con criterio
                profesional.
              </p>
            </header>
          </RevealOnScroll>
        )}

        <RevealOnScroll className={showHeader ? "mt-10 sm:mt-12" : ""}>
          <PropertyFilters
            filters={filters}
            onChange={setFilters}
            resultCount={sorted.length}
          />
        </RevealOnScroll>

        {sorted.length > 0 ? (
          <>
            <ul className="mt-10 grid list-none grid-cols-1 gap-x-8 gap-y-12 sm:mt-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
              {paginated.map((property, index) => (
                <li key={property.id}>
                  <RevealOnScroll delay={Math.min(index * 80, 400)}>
                    <PropertyCard property={property} showReference />
                  </RevealOnScroll>
                </li>
              ))}
            </ul>
            <PropertyPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sorted.length}
              pageSize={PROPERTIES_PAGE_SIZE}
            />
          </>
        ) : (
          <RevealOnScroll className="mt-12">
            <div className="mx-auto max-w-md rounded-xl border border-accent/15 bg-accent/[0.04] px-8 py-14 text-center backdrop-blur-sm">
              <p className="font-display text-2xl text-accent">Sin resultados</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                No hay propiedades que coincidan con los filtros seleccionados.
                Prueba a ajustar los criterios de búsqueda.
              </p>
              <button
                type="button"
                onClick={() => setFilters(initialFilters)}
                className="mt-6 text-sm font-medium text-accent transition-colors hover:text-accent-light"
              >
                Restablecer filtros
              </button>
            </div>
          </RevealOnScroll>
        )}
      </Container>
    </section>
  );
}
