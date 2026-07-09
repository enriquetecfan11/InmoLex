export type ServiceCategory =
  | "intermediacion"
  | "inversion"
  | "audiovisual";

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
  audiovisual: "Servicios audiovisuales",
};

export const SERVICES: Service[] = [
  {
    id: "inmuebles",
    title: "Inmuebles",
    description:
      "Accede a nuestra cartera exclusiva de viviendas en las mejores zonas de Madrid. Compra, venta y alquiler con asesoramiento personalizado.",
    category: "intermediacion",
    href: "/propiedades",
    cta: "Ver propiedades",
  },
  {
    id: "venta",
    title: "Venta de viviendas",
    description:
      "Valoramos tu inmueble con criterio de mercado, preparamos un reportaje profesional y gestionamos todo el proceso hasta la firma.",
    category: "intermediacion",
    href: "/contacto",
    cta: "Solicitar valoración",
  },
  {
    id: "alquiler",
    title: "Alquiler de viviendas",
    description:
      "Selección de inquilinos, contratos, visitas y seguimiento. Para propietarios e inquilinos que buscan transparencia y agilidad.",
    category: "intermediacion",
    href: "/contacto",
    cta: "Consultar alquiler",
  },
  {
    id: "inversion",
    title: "Inversión inmobiliaria",
    description:
      "Identificamos oportuniones con rentabilidad real: análisis de zona, proyección de retorno y acompañamiento en la operación.",
    category: "inversion",
    href: "/contacto",
    cta: "Hablar con un asesor",
  },
  {
    id: "inversor",
    title: "¿Eres inversor?",
    description:
      "Accede a operaciones off-market, dossiers con datos financieros y un equipo que entiende tu perfil de riesgo y horizonte de inversión.",
    category: "inversion",
    href: "/contacto",
    cta: "Acceso inversores",
    featured: true,
  },
  {
    id: "hipotecas",
    title: "Hipotecas y financiación",
    description:
      "Comparamos las mejores condiciones del mercado y te guiamos en la tramitación. Sin coste adicional por nuestra intermediación.",
    category: "inversion",
    href: "/contacto",
    cta: "Simular hipoteca",
  },
  {
    id: "reportajes",
    title: "Reportajes fotográficos",
    description:
      "Fotografía profesional de interiores y exteriores que transmite la esencia de cada inmueble. Imprescindible para vender más rápido.",
    category: "audiovisual",
    href: "/contacto",
    cta: "Solicitar reportaje",
  },
  {
    id: "dron",
    title: "Fotografía con dron",
    description:
      "Vistas aéreas de chalets, áticos y parcelas que destacan ubicación, entorno y dimensiones reales del inmueble.",
    category: "audiovisual",
    href: "/contacto",
    cta: "Reservar sesión",
  },
  {
    id: "eventos",
    title: "Organización de eventos",
    description:
      "Presentaciones exclusivas, jornadas de puertas abiertas y eventos de networking para promotores, inversores y compradores.",
    category: "audiovisual",
    href: "/contacto",
    cta: "Planificar evento",
  },
];

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return SERVICES.filter((service) => service.category === category);
}
