"use client";

import { Button } from "@/components/ui/Button";
import { formatPrice, type Property } from "@/lib/properties";

interface PropertyContactPanelProps {
  property: Property;
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

export function PropertyContactPanel({ property }: PropertyContactPanelProps) {
  const contactHref = `/contacto?propiedad=${property.id}`;
  const whatsappText = encodeURIComponent(
    `Hola, me interesa la propiedad "${property.title}" (${property.location}). Me gustaría recibir más información.`,
  );
  const whatsappHref = `https://wa.me/34910000000?text=${whatsappText}`;

  return (
    <>
      <aside className="property-contact-panel hidden lg:block">
        <div className="sticky top-28 rounded-2xl border border-accent/20 bg-brand-dark/60 p-6 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45">
            Precio
          </p>
          <p className="mt-2 font-display text-3xl text-accent">
            {formatPrice(property.price, property.operation)}
          </p>
          <p className="mt-1 text-sm text-white/50">{property.location}</p>

          <div className="mt-6 space-y-3">
            <Button href={contactHref} size="lg" className="w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40">
              Agendar visita
            </Button>
            <Button href={contactHref} variant="outline" size="lg" className="w-full">
              Solicitar información
            </Button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="property-cta-whatsapp inline-flex w-full items-center justify-center gap-2 rounded-lg border border-accent/30 bg-accent/[0.06] px-8 py-3.5 text-base font-medium text-accent transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>

          <p className="mt-6 border-t border-accent/15 pt-5 text-xs leading-relaxed text-white/40">
            Asesoramiento personalizado sin compromiso. Respuesta en menos de 24 horas.
          </p>
        </div>
      </aside>

      <div
        className="property-mobile-bar fixed inset-x-0 bottom-0 z-50 border-t border-accent/20 bg-brand/95 px-4 py-3 backdrop-blur-md lg:hidden"
        aria-label="Acciones de contacto"
      >
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg text-accent">
              {formatPrice(property.price, property.operation)}
            </p>
            <p className="truncate text-xs text-white/45">{property.location}</p>
          </div>
          <Button
            href={contactHref}
            size="md"
            className="shrink-0 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40"
          >
            Agendar visita
          </Button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Contactar por WhatsApp"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/30 text-accent transition-colors hover:bg-accent/10"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </>
  );
}
