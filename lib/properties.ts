import propertiesData from "@/data/properties.json";
import { toIntlLocale } from "@/i18n/intl-locale";

export type Operation = "venta" | "alquiler";

export type PropertyType =
  | "piso"
  | "atico"
  | "chalet"
  | "duplex"
  | "casa_pueblo"
  | "habitacion";

export type PropertyBadge =
  | "nuevo"
  | "reservado"
  | "vendido"
  | "destacado"
  | "exclusivo";

export type PropertyStatus = "disponible" | "reservado" | "vendido" | "alquilado";

export type Orientation =
  | "norte"
  | "sur"
  | "este"
  | "oeste"
  | "noreste"
  | "noroeste"
  | "sureste"
  | "suroeste";

export type EnergyRating = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export interface PropertyCoordinates {
  lat: number;
  lng: number;
}

export interface EnergyCertificate {
  rating: EnergyRating;
  consumption: number;
  emissionsRating: EnergyRating;
  emissions: number;
}

export interface PropertyDetailSection {
  id: string;
  label: string;
  items: string[];
}

export interface Property {
  id: string;
  createdAt: string;
  title: string;
  price: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  orientation: Orientation;
  terrace: boolean;
  balcony: boolean;
  garage: boolean;
  storage: boolean;
  elevator: boolean;
  elevatorCount?: number;
  pmrAccessible: boolean;
  district: string;
  approximateAddress: string;
  location: string;
  features: string[];
  status: PropertyStatus;
  type: PropertyType;
  operation: Operation;
  images: string[];
  plan2d?: string;
  plan3d?: string;
  videos?: string[];
  badge?: PropertyBadge;
  energyCertificate?: EnergyCertificate;
  coordinates?: PropertyCoordinates;
  detailSections?: PropertyDetailSection[];
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  piso: "Piso",
  atico: "Ático",
  chalet: "Chalet",
  duplex: "Dúplex",
  casa_pueblo: "Casa de pueblo",
  habitacion: "Habitación",
};

export const BADGE_LABELS: Record<PropertyBadge, string> = {
  nuevo: "Nuevo",
  reservado: "Reservado",
  vendido: "Vendido",
  destacado: "Destacado",
  exclusivo: "Exclusivo",
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  disponible: "Disponible",
  reservado: "Reservado",
  vendido: "Vendido",
  alquilado: "Alquilado",
};

export const ORIENTATION_LABELS: Record<Orientation, string> = {
  norte: "Norte",
  sur: "Sur",
  este: "Este",
  oeste: "Oeste",
  noreste: "Noreste",
  noroeste: "Noroeste",
  sureste: "Sureste",
  suroeste: "Suroeste",
};

export const OPERATION_LABELS: Record<Operation, string> = {
  venta: "Venta",
  alquiler: "Alquiler",
};

export const ENERGY_RATINGS: EnergyRating[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
];

export const ENERGY_RATING_LABELS: Record<EnergyRating, string> = {
  A: "Muy eficiente",
  B: "Eficiente",
  C: "Consumo medio",
  D: "Consumo elevado",
  E: "Consumo muy elevado",
  F: "Consumo excesivo",
  G: "Consumo excesivo",
};

export const DISTRICTS = [
  "Salamanca",
  "Chamberí",
  "Retiro",
  "Chamartín",
  "Moncloa",
  "Centro",
  "Maials",
  "Son Armadams",
] as const;

export const PROPERTIES = propertiesData as Property[];

export function getPropertyCoverImage(property: Property): string {
  return property.images[0] ?? "/property-placeholder.svg";
}

export function formatPrice(
  price: number,
  operation: Operation,
  options?: { locale?: string; perMonth?: string },
): string {
  const formatted = new Intl.NumberFormat(toIntlLocale(options?.locale ?? "es"), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);

  const suffix = options?.perMonth ?? "/mes";
  return operation === "alquiler" ? `${formatted}${suffix}` : formatted;
}

export function formatPropertyReference(id: string): string {
  return `INM-${id.padStart(4, "0")}`;
}

export function matchesPropertySearch(property: Property, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const reference = formatPropertyReference(property.id).toLowerCase();

  return (
    property.id.toLowerCase().includes(normalized) ||
    reference.includes(normalized) ||
    property.title.toLowerCase().includes(normalized) ||
    property.location.toLowerCase().includes(normalized) ||
    property.district.toLowerCase().includes(normalized) ||
    property.approximateAddress.toLowerCase().includes(normalized) ||
    property.description.toLowerCase().includes(normalized) ||
    property.detailSections?.some((section) =>
      section.label.toLowerCase().includes(normalized) ||
      section.items.some((item) => item.toLowerCase().includes(normalized)),
    ) ||
    property.features.some((feature) => feature.toLowerCase().includes(normalized))
  );
}

export function getSimilarProperties(
  property: Property,
  properties: Property[] = PROPERTIES,
  limit = 6,
): Property[] {
  const sameDistrictAndType = properties.filter(
    (candidate) =>
      candidate.id !== property.id &&
      candidate.operation === property.operation &&
      candidate.district === property.district &&
      candidate.type === property.type,
  );

  if (sameDistrictAndType.length > 0) {
    return sameDistrictAndType.slice(0, limit);
  }

  return properties
    .filter(
      (candidate) =>
        candidate.id !== property.id &&
        candidate.operation === property.operation,
    )
    .slice(0, limit);
}

export function getPropertyMapEmbedUrl(property: Property): string {
  if (!property.coordinates) {
    const query = encodeURIComponent(
      property.approximateAddress || property.location || property.district,
    );
    return `https://www.openstreetmap.org/search?query=${query}`;
  }

  const { lat, lng } = property.coordinates;
  const delta = 0.012;
  const bbox = [
    lng - delta,
    lat - delta,
    lng + delta,
    lat + delta,
  ]
    .map((n) => n.toFixed(6))
    .join("%2C");

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

export function getPropertyMapHref(property: Property): string {
  if (property.coordinates) {
    const { lat, lng } = property.coordinates;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    property.approximateAddress || property.location || property.district,
  )}`;
}
