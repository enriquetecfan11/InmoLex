import {
  ORIENTATION_LABELS,
  type Property,
} from "@/lib/properties";

export interface FeatureGroup {
  id: string;
  label: string;
  items: string[];
}

const EXTERIOR_PATTERN =
  /terraza|jardín|piscina|balcón|vistas|parcela|exterior|jardin/i;
const BUILDING_PATTERN =
  /portero|ascensor|portal|comunitaria|edificio|finca/i;
const EXTRAS_PATTERN =
  /seguridad|bodega|domótica|chimenea|alarma|garaje/i;

export function getPropertyFeatureGroups(property: Property): FeatureGroup[] {
  const interior: string[] = [];
  const exterior: string[] = [];
  const edificio: string[] = [];
  const extras: string[] = [];

  for (const feature of property.features) {
    const lower = feature.toLowerCase();
    if (EXTERIOR_PATTERN.test(lower)) exterior.push(feature);
    else if (BUILDING_PATTERN.test(lower)) edificio.push(feature);
    else if (EXTRAS_PATTERN.test(lower)) extras.push(feature);
    else interior.push(feature);
  }

  if (property.terrace && !exterior.some((f) => /terraza/i.test(f))) {
    exterior.push("Terraza");
  }
  if (property.balcony && !exterior.some((f) => /balcón/i.test(f))) {
    exterior.push("Balcón");
  }
  if (property.garage && !extras.some((f) => /garaje/i.test(f))) {
    extras.push("Plaza de garaje");
  }
  if (property.storage) extras.push("Trastero");
  if (property.elevator) {
    edificio.push(
      property.elevatorCount
        ? `Ascensor (${property.elevatorCount})`
        : "Ascensor",
    );
  }

  const groups: FeatureGroup[] = [
    { id: "interior", label: "Interior", items: interior },
    { id: "exterior", label: "Exterior", items: exterior },
    { id: "edificio", label: "Edificio", items: edificio },
    { id: "extras", label: "Extras", items: extras },
    {
      id: "accesibilidad",
      label: "Accesibilidad",
      items: [
        property.pmrAccessible
          ? "Acceso adaptado PMR"
          : "Sin adaptación PMR registrada",
        `Orientación ${ORIENTATION_LABELS[property.orientation].toLowerCase()}`,
      ],
    },
  ];

  return groups.filter((group) => group.items.length > 0);
}
