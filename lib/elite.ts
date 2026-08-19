export type EliteIconName =
  | "globe"
  | "tailored"
  | "visual"
  | "finance"
  | "network";

export const ELITE_INTRO = {
  kicker: "Elite Real Estate · Global",
  title: "Alta gama, sin comisiones exageradas.",
  lead:
    "GrupoRol ofrece un servicio inmobiliario exclusivo y de primer nivel para quienes buscan máxima excelencia y, a la vez, eficiencia financiera. Rompemos con el modelo tradicional del lujo: atención y herramientas premium, con honorarios más competitivos que los habituales del sector.",
} as const;

export const ELITE_DIFFERENTIAL = {
  title: "Excelencia sin sobrecostes",
  body: "GrupoRol combina atención personalizada, tecnología avanzada, alcance internacional y servicios inmobiliarios premium, sin trasladar al cliente las estructuras de coste habituales del sector de lujo.",
  highlight: "Alta gama, con honorarios más competitivos.",
} as const;

export const ELITE_CLOSE = {
  title: "El lujo no tiene por qué costar más.",
  subtitle: "Experimente el verdadero servicio Elite.",
  cta: "Solicitar una consulta",
  href: "/contacto",
} as const;

export interface EliteBentoBlock {
  id: "coverage" | "tailored" | "tech" | "finance" | "network";
  icon: EliteIconName;
  title: string;
  body: string;
  accent?: string;
  items?: readonly string[];
}

export const ELITE_BENTO: readonly EliteBentoBlock[] = [
  {
    id: "coverage",
    icon: "globe",
    title: "Cobertura Global",
    body: "No tenemos fronteras. Nos desplazamos a cualquier parte del mundo para gestionar propiedades, realizar inspecciones o cerrar negociaciones personalmente.",
    accent: "Su ubicación es nuestra ubicación.",
  },
  {
    id: "tailored",
    icon: "tailored",
    title: "Servicio a Medida",
    body: "Cada cliente y cada operación son distintos. Personalizamos por completo el caso y diseñamos una estrategia adaptada a sus necesidades financieras, fiscales y logísticas: un auténtico traje a medida inmobiliario.",
  },
  {
    id: "tech",
    icon: "visual",
    title: "Tecnología Visual de Vanguardia",
    body: "Maximizamos el valor y el alcance de cada propiedad con herramientas digitales premium, pensadas para compradores nacionales e internacionales.",
    items: [
      "Reportaje fotográfico profesional",
      "Tours virtuales 360°",
      "Visitas inmersivas de alta definición",
      "Planos 2D",
      "Modelados y planos 3D",
      "Presentación nacional e internacional",
    ],
  },
  {
    id: "finance",
    icon: "finance",
    title: "Soluciones Financieras y Compra de Deuda",
    body: "Acompañamos operaciones inmobiliarias financieramente complejas: compra de deuda, gestión y liquidación de cargas, reestructuración y liberación de activos.",
    accent: "Resolvemos operaciones que otros consideran demasiado complejas.",
  },
  {
    id: "network",
    icon: "network",
    title: "Red Internacional y Gestión Integral",
    body: "Trabajamos junto a inmobiliarias y colaboradores internacionales para multiplicar la visibilidad de cada propiedad, con discreción y atención personalizada.",
    items: [
      "Venta",
      "Alquiler",
      "Negociación",
      "Exposición internacional",
      "Coordinación de la operación",
    ],
  },
];
