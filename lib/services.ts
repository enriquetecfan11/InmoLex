export type ServiceCategory =
  | "intermediacion"
  | "inversion"
  | "adicional";

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  href: string;
  cta: string;
  featured?: boolean;
}

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  intermediacion: "Intermediación inmobiliaria",
  inversion: "Inversión y financiación",
  adicional: "Servicios adicionales",
};

export const CORE_SERVICES: Service[] = [
  {
    id: "comprar-vender",
    title: "Comprar o vender",
    description:
      "Compra, venta y asesoramiento personalizado en cada paso del proceso inmobiliario.",
    category: "intermediacion",
    href: "/servicios/comprar-vender",
    cta: "Solicitar información",
  },
  {
    id: "alquiler",
    title: "Alquiler",
    description:
      "Busca un alquiler o pon tu propiedad en el mercado con gestión integral y transparencia.",
    category: "intermediacion",
    href: "/servicios/alquiler",
    cta: "Consultar alquiler",
  },
  {
    id: "valoracion",
    title: "Valoración gratuita",
    description:
      "Tasación sin compromiso con criterio de mercado y respuesta en menos de 24 horas.",
    category: "intermediacion",
    href: "/servicios/valoracion",
    cta: "Solicitar valoración",
  },
  {
    id: "financiacion",
    title: "Hipoteca o préstamo",
    description:
      "Comparamos las mejores condiciones y te guiamos en la tramitación sin coste adicional.",
    category: "inversion",
    href: "/servicios/financiacion",
    cta: "Simular financiación",
  },
  {
    id: "deuda",
    title: "Problemas con el pago",
    description:
      "Soluciones para situaciones de deuda hipotecaria. Nosotros compramos tu deuda.",
    category: "inversion",
    href: "/servicios/deuda",
    cta: "Consultar solución",
  },
  {
    id: "inversores",
    title: "Inversores y subastas",
    description:
      "Oportunidades off-market, subastas y dossiers con datos financieros para inversores.",
    category: "inversion",
    href: "/servicios/inversores",
    cta: "Acceso inversores",
    featured: true,
  },
  {
    id: "nautica",
    title: "Náutica",
    description:
      "Compra, venta y alquiler de yates, veleros y motoras con el mismo criterio que nuestras propiedades.",
    category: "intermediacion",
    href: "/servicios/nautica",
    cta: "Ver náutica",
  },
];

export const ADDITIONAL_SERVICES: Service[] = [
  {
    id: "reportajes",
    title: "Reportajes fotográficos",
    description:
      "Fotografía profesional de interiores y exteriores que transmite la esencia de cada inmueble.",
    category: "adicional",
    href: "/contacto",
    cta: "Solicitar reportaje",
  },
  {
    id: "dron",
    title: "Fotografía con dron",
    description:
      "Vistas aéreas de chalets, áticos y parcelas que destacan ubicación y dimensiones reales.",
    category: "adicional",
    href: "/contacto",
    cta: "Reservar sesión",
  },
  {
    id: "eventos",
    title: "Organización de eventos",
    description:
      "Presentaciones exclusivas, jornadas de puertas abiertas y eventos de networking inmobiliario.",
    category: "adicional",
    href: "/contacto",
    cta: "Planificar evento",
  },
];

export const SERVICES: Service[] = [...CORE_SERVICES, ...ADDITIONAL_SERVICES];

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return SERVICES.filter((service) => service.category === category);
}
