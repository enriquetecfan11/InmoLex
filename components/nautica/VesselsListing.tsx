"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  PropertyPagination,
  PROPERTIES_PAGE_SIZE,
} from "@/components/properties/PropertyPagination";
import { VesselCard } from "@/components/nautica/VesselCard";
import {
  VesselFilters,
  filterVessels,
  initialVesselFilters,
  type VesselFiltersState,
  type VesselSort,
} from "@/components/nautica/VesselFilters";
import type { Vessel } from "@/lib/vessels";

interface VesselsListingProps {
  vessels: Vessel[];
}

function cleanParams(params: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(params);
  for (const [key, value] of next.entries()) {
    if (!value) next.delete(key);
  }
  return next;
}

export function VesselsListing({ vessels }: VesselsListingProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo<VesselFiltersState>(() => {
    return {
      query: searchParams.get("q") ?? "",
      operation: (searchParams.get("operacion") ?? "") as VesselFiltersState["operation"],
      location: searchParams.get("zona") ?? "",
      priceRange: searchParams.get("precio") ?? "",
      lengthRange: searchParams.get("eslora") ?? "",
      type: (searchParams.get("tipo") ?? "") as VesselFiltersState["type"],
      sort: (searchParams.get("orden") ?? "") as VesselSort,
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (nextFilters: VesselFiltersState) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      const setOrDelete = (key: string, value: string) => {
        if (value) nextParams.set(key, value);
        else nextParams.delete(key);
      };

      setOrDelete("operacion", nextFilters.operation);
      setOrDelete("q", nextFilters.query.trim());
      setOrDelete("zona", nextFilters.location);
      setOrDelete("precio", nextFilters.priceRange);
      setOrDelete("eslora", nextFilters.lengthRange);
      setOrDelete("tipo", nextFilters.type);
      setOrDelete("orden", nextFilters.sort);
      nextParams.delete("pagina");

      const cleaned = cleanParams(nextParams);
      const qs = cleaned.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const locationOptions = useMemo(() => {
    const fromData = vessels.map((vessel) => vessel.location).filter(Boolean);
    return [...new Set(fromData)].sort((a, b) => a.localeCompare(b, "es"));
  }, [vessels]);

  const filtered = useMemo(() => filterVessels(vessels, filters), [filters, vessels]);

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
      case "eslora-desc":
        list.sort((a, b) => b.lengthMeters - a.lengthMeters);
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
        <RevealOnScroll>
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
              Catálogo náutico
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem]">
              Embarcaciones disponibles
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
              Yates, veleros y motoras seleccionadas con el mismo criterio que
              nuestras propiedades: pocas, bien presentadas y listas para visita.
            </p>
          </header>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 sm:mt-12">
          <VesselFilters
            filters={filters}
            onChange={setFilters}
            resultCount={sorted.length}
            locations={locationOptions}
          />
        </RevealOnScroll>

        {sorted.length > 0 ? (
          <>
            <ul className="mt-10 grid list-none grid-cols-1 gap-x-8 gap-y-12 sm:mt-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
              {paginated.map((vessel, index) => (
                <li key={vessel.id}>
                  <RevealOnScroll delay={Math.min(index * 80, 400)}>
                    <VesselCard vessel={vessel} showReference />
                  </RevealOnScroll>
                </li>
              ))}
            </ul>
            <PropertyPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sorted.length}
              pageSize={PROPERTIES_PAGE_SIZE}
              itemLabel="embarcaciones"
              ariaLabel="Paginación de embarcaciones"
            />
          </>
        ) : (
          <RevealOnScroll className="mt-12">
            <div className="mx-auto max-w-md rounded-xl border border-accent/15 bg-accent/[0.04] px-8 py-14 text-center backdrop-blur-sm">
              <p className="font-display text-2xl text-accent">Sin resultados</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                No hay embarcaciones que coincidan con los filtros seleccionados.
                Prueba a ajustar los criterios de búsqueda.
              </p>
              <button
                type="button"
                onClick={() => setFilters(initialVesselFilters)}
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
