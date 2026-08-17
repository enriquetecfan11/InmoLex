export type ServiceMenuIcon =
  | "buy-sell"
  | "rent"
  | "valuation"
  | "finance"
  | "debt"
  | "investor"
  | "nautica";

export interface ServiceMenuItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: ServiceMenuIcon;
  highlight?: string;
}

export const SERVICE_MENU_ITEMS: ServiceMenuItem[] = [
  {
    id: "comprar-vender",
    title: "Comprar o vender",
    description: "Encuentra tu hogar o vende con asesoramiento experto.",
    href: "/servicios/comprar-vender",
    icon: "buy-sell",
  },
  {
    id: "alquiler",
    title: "Alquiler",
    description: "Busca un alquiler o pon tu propiedad en el mercado.",
    href: "/servicios/alquiler",
    icon: "rent",
  },
  {
    id: "valoracion",
    title: "Valoración gratuita",
    description: "Tasación sin compromiso con criterio de mercado.",
    href: "/servicios/valoracion",
    icon: "valuation",
  },
  {
    id: "financiacion",
    title: "Hipoteca o préstamo",
    description: "Financiación adaptada a tu situación personal.",
    href: "/servicios/financiacion",
    icon: "finance",
  },
  {
    id: "deuda",
    title: "Problemas con el pago",
    description: "Soluciones para situaciones de deuda hipotecaria.",
    href: "/servicios/deuda",
    icon: "debt",
    highlight: "Nosotros compramos tu deuda",
  },
  {
    id: "inversores",
    title: "Inversores y subastas",
    description: "Oportunidades off-market y operaciones en subasta.",
    href: "/servicios/inversores",
    icon: "investor",
  },
  {
    id: "nautica",
    title: "Náutica",
    description: "Yates, veleros y motoras en venta o alquiler.",
    href: "/servicios/nautica",
    icon: "nautica",
  },
];
