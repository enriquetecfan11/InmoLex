import {
  ORIENTATION_LABELS,
  type Property,
} from "@/lib/properties";

export interface FeatureGroup {
  id: string;
  label: string;
  items: string[];
}

export interface GeneratedFeatureLabels {
  terrace: string;
  balcony: string;
  garage: string;
  storage: string;
  elevator: string;
  elevatorCount: string;
  pmrYes: string;
  pmrNo: string;
  orientation: string;
}

const EXTERIOR_PATTERN =
  /terraza|jardín|piscina|balcón|vistas|parcela|exterior|jardin/i;
const BUILDING_PATTERN =
  /portero|ascensor|portal|comunitaria|edificio|finca/i;
const EXTRAS_PATTERN =
  /seguridad|bodega|domótica|chimenea|alarma|garaje/i;

function defaultGeneratedLabels(property: Property): GeneratedFeatureLabels {
  return {
    terrace: "Terraza",
    balcony: "Balcón",
    garage: "Plaza de garaje",
    storage: "Trastero",
    elevator: "Ascensor",
    elevatorCount: property.elevatorCount
      ? `Ascensor (${property.elevatorCount})`
      : "Ascensor",
    pmrYes: "Acceso adaptado PMR",
    pmrNo: "Sin adaptación PMR registrada",
    orientation: `Orientación ${ORIENTATION_LABELS[property.orientation].toLowerCase()}`,
  };
}

export function getPropertyFeatureGroups(
  property: Property,
  labels?: GeneratedFeatureLabels,
): FeatureGroup[] {
  const generated = labels ?? defaultGeneratedLabels(property);
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
    exterior.push(generated.terrace);
  }
  if (property.balcony && !exterior.some((f) => /balcón/i.test(f))) {
    exterior.push(generated.balcony);
  }
  if (property.garage && !extras.some((f) => /garaje/i.test(f))) {
    extras.push(generated.garage);
  }
  if (property.storage) extras.push(generated.storage);
  if (property.elevator) {
    edificio.push(
      property.elevatorCount ? generated.elevatorCount : generated.elevator,
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
        property.pmrAccessible ? generated.pmrYes : generated.pmrNo,
        generated.orientation,
      ],
    },
  ];

  return groups.filter((group) => group.items.length > 0);
}
