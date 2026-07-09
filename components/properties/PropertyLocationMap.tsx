import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  getPropertyMapEmbedUrl,
  getPropertyMapHref,
  type Property,
} from "@/lib/properties";

interface PropertyLocationMapProps {
  property: Property;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="property-section-heading">
      <h2 className="font-display text-2xl text-accent sm:text-3xl">{children}</h2>
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-accent to-transparent" aria-hidden />
    </div>
  );
}

export function PropertyLocationMap({ property }: PropertyLocationMapProps) {
  const mapHref = getPropertyMapHref(property);

  return (
    <RevealOnScroll>
      <SectionHeading>Ubicación</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
        Zona aproximada de la propiedad en {property.district}. La dirección exacta se facilita
        tras concertar una visita.
      </p>

      <div className="property-location-map contact-map relative mt-8 overflow-hidden rounded-2xl border border-accent/15">
        <iframe
          title={`Mapa de ubicación - ${property.title}`}
          src={getPropertyMapEmbedUrl(property)}
          className="block h-[280px] w-full border-0 sm:h-[340px] lg:h-[380px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/15" />

        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="rounded-lg border border-accent/20 bg-brand/90 px-4 py-3 backdrop-blur-sm">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">
              {property.district}
            </p>
            <p className="mt-0.5 text-sm text-white/80">{property.approximateAddress}</p>
          </div>
          <a
            href={mapHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-accent/30 bg-brand/90 px-4 py-2.5 text-sm font-medium text-accent backdrop-blur-sm transition-colors hover:border-accent/50 hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 1.5a4 4 0 0 0-4 4c0 3 4 8.5 4 8.5s4-5.5 4-8.5a4 4 0 0 0-4-4Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="5.5" r="1.25" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Abrir en Google Maps
          </a>
        </div>
      </div>
    </RevealOnScroll>
  );
}
