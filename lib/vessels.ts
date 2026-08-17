import type {
  Operation,
  PropertyBadge,
  PropertyCoordinates,
  PropertyStatus,
} from "@/lib/properties";
import { formatPrice } from "@/lib/properties";

export type { Operation, PropertyBadge, PropertyCoordinates, PropertyStatus };

export type VesselType = "yate" | "velero" | "lancha" | "catamaran" | "motora";

export interface Vessel {
  id: string;
  createdAt: string;
  title: string;
  price: number;
  description: string;
  type: VesselType;
  operation: Operation;
  status: PropertyStatus;
  lengthMeters: number;
  year: number;
  cabins: number;
  bathrooms: number;
  capacity: number;
  engine?: string;
  manufacturer?: string;
  location: string;
  features: string[];
  images: string[];
  videos?: string[];
  badge?: PropertyBadge;
  coordinates?: PropertyCoordinates;
}

export const VESSEL_TYPE_LABELS: Record<VesselType, string> = {
  yate: "Yate",
  velero: "Velero",
  lancha: "Lancha",
  catamaran: "Catamarán",
  motora: "Motora",
};

export const VESSEL_LOCATIONS = [
  "Puerto de Palma",
  "Puerto Portals",
  "Puerto de Andratx",
  "Puerto de Sóller",
  "Puerto de Alcúdia",
  "Marina de Valencia",
  "Puerto de Barcelona",
  "Puerto de Ibiza",
] as const;

export function getVesselCoverImage(vessel: Vessel): string {
  return vessel.images[0] ?? "/property-placeholder.svg";
}

export function formatVesselReference(id: string): string {
  return id.startsWith("NAU-") ? id : `NAU-${id.padStart(4, "0")}`;
}

export function formatLength(meters: number): string {
  return `${meters.toLocaleString("es-ES", { maximumFractionDigits: 1 })} m`;
}

export { formatPrice };

export function matchesVesselSearch(vessel: Vessel, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const reference = formatVesselReference(vessel.id).toLowerCase();

  return (
    vessel.id.toLowerCase().includes(normalized) ||
    reference.includes(normalized) ||
    vessel.title.toLowerCase().includes(normalized) ||
    vessel.location.toLowerCase().includes(normalized) ||
    vessel.description.toLowerCase().includes(normalized) ||
    (vessel.manufacturer?.toLowerCase().includes(normalized) ?? false) ||
    (vessel.engine?.toLowerCase().includes(normalized) ?? false) ||
    vessel.features.some((feature) => feature.toLowerCase().includes(normalized))
  );
}

export function getSimilarVessels(
  vessel: Vessel,
  vessels: Vessel[],
  limit = 6,
): Vessel[] {
  const sameTypeAndLocation = vessels.filter(
    (candidate) =>
      candidate.id !== vessel.id &&
      candidate.operation === vessel.operation &&
      candidate.location === vessel.location &&
      candidate.type === vessel.type,
  );

  if (sameTypeAndLocation.length > 0) {
    return sameTypeAndLocation.slice(0, limit);
  }

  return vessels
    .filter(
      (candidate) =>
        candidate.id !== vessel.id && candidate.operation === vessel.operation,
    )
    .slice(0, limit);
}

export function getVesselMapEmbedUrl(vessel: Vessel): string {
  if (!vessel.coordinates) {
    const query = encodeURIComponent(vessel.location);
    return `https://www.openstreetmap.org/search?query=${query}`;
  }

  const { lat, lng } = vessel.coordinates;
  const delta = 0.012;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta]
    .map((n) => n.toFixed(6))
    .join("%2C");

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

export function getVesselMapHref(vessel: Vessel): string {
  if (vessel.coordinates) {
    const { lat, lng } = vessel.coordinates;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vessel.location)}`;
}
