"use server";

import {
  createSupabasePublicClient,
  createSupabaseServerClient,
  getAdminClaims,
} from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { localizeProperty } from "@/lib/property-i18n";
import type { PropertyTranslations } from "@/lib/property-i18n";
import type { Property, PropertyStatus, PropertyType, Orientation } from "@/lib/properties";

type DbProperty = {
  id: string;
  created_at: string;
  title: string;
  price: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  orientation: string;
  terrace: boolean;
  balcony: boolean;
  garage: boolean;
  storage: boolean;
  elevator: boolean;
  elevator_count: number | null;
  pmr_accessible: boolean;
  district: string;
  approximate_address: string;
  location: string;
  features: string[];
  status: string;
  type: string;
  operation: string;
  images: string[];
  plan2d: string | null;
  plan3d: string | null;
  videos: string[];
  badge: string | null;
  energy_certificate: { rating: string; consumption: number; emissionsRating: string; emissions: number } | null;
  coordinates: { lat: number; lng: number } | null;
  translations: PropertyTranslations | null;
};

function toDb(property: Partial<Property> & { id?: string }): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  if (property.id) data.id = property.id;
  if (property.title) data.title = property.title;
  if (property.price !== undefined) data.price = property.price;
  if (property.description) data.description = property.description;
  if (property.bedrooms !== undefined) data.bedrooms = property.bedrooms;
  if (property.bathrooms !== undefined) data.bathrooms = property.bathrooms;
  if (property.sqm !== undefined) data.sqm = property.sqm;
  if (property.orientation) data.orientation = property.orientation;
  if (property.terrace !== undefined) data.terrace = property.terrace;
  if (property.balcony !== undefined) data.balcony = property.balcony;
  if (property.garage !== undefined) data.garage = property.garage;
  if (property.storage !== undefined) data.storage = property.storage;
  if (property.elevator !== undefined) data.elevator = property.elevator;
  if (property.elevatorCount !== undefined) data.elevator_count = property.elevatorCount;
  if (property.pmrAccessible !== undefined) data.pmr_accessible = property.pmrAccessible;
  if (property.district) data.district = property.district;
  if (property.approximateAddress) data.approximate_address = property.approximateAddress;
  if (property.location) data.location = property.location;
  if (property.features) data.features = property.features;
  if (property.status) data.status = property.status;
  if (property.type) data.type = property.type;
  if (property.operation) data.operation = property.operation;
  if (property.images) data.images = property.images;
  if (property.plan2d !== undefined) data.plan2d = property.plan2d;
  if (property.plan3d !== undefined) data.plan3d = property.plan3d;
  if (property.videos) data.videos = property.videos;
  if (property.badge) data.badge = property.badge;
  if (property.energyCertificate) data.energy_certificate = property.energyCertificate;
  if (property.coordinates) data.coordinates = property.coordinates;
  if (property.translations) data.translations = property.translations;
  return data;
}

function toProperty(db: DbProperty): Property {
  return {
    id: db.id,
    createdAt: db.created_at,
    title: db.title,
    price: db.price,
    description: db.description,
    bedrooms: db.bedrooms,
    bathrooms: db.bathrooms,
    sqm: db.sqm,
    orientation: db.orientation as Orientation,
    terrace: db.terrace,
    balcony: db.balcony,
    garage: db.garage,
    storage: db.storage,
    elevator: db.elevator,
    elevatorCount: db.elevator_count ?? undefined,
    pmrAccessible: db.pmr_accessible,
    district: db.district,
    approximateAddress: db.approximate_address,
    location: db.location,
    features: db.features,
    status: db.status as PropertyStatus,
    type: db.type as PropertyType,
    operation: db.operation as "venta" | "alquiler",
    images: db.images,
    plan2d: db.plan2d ?? undefined,
    plan3d: db.plan3d ?? undefined,
    videos: db.videos,
    badge: db.badge as Property["badge"] ?? undefined,
    energyCertificate: db.energy_certificate as Property["energyCertificate"] ?? undefined,
    coordinates: db.coordinates ?? undefined,
    translations: db.translations ?? undefined,
  };
}

export async function getProperties(locale?: string): Promise<Property[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("getProperties error", error);
    return [];
  }

  const properties = data.map(toProperty);
  return locale ? properties.map((property) => localizeProperty(property, locale)) : properties;
}

export async function getProperty(id: string, locale?: string): Promise<Property | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  const property = toProperty(data);
  return locale ? localizeProperty(property, locale) : property;
}

type CreatePropertyInput = {
  title: string;
  price: number;
  description: string;
  location: string;
  district: string;
  type: PropertyType;
  operation: "venta" | "alquiler";
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  sqm?: number;
  orientation?: Orientation;
  terrace?: boolean;
  balcony?: boolean;
  garage?: boolean;
  storage?: boolean;
  elevator?: boolean;
  pmrAccessible?: boolean;
  approximateAddress?: string;
  features?: string[];
  images?: string[];
  plan2d?: string;
  plan3d?: string;
  videos?: string[];
  badge?: Property["badge"];
  energyCertificate?: Property["energyCertificate"];
  coordinates?: Property["coordinates"];
};

export async function createProperty(input: CreatePropertyInput): Promise<{ ok: boolean; error?: string }> {
  const claims = await getAdminClaims();
  if (!claims) {
    return { ok: false, error: "No autorizado" };
  }

  const supabase = await createSupabaseServerClient();

  const required = ["title", "price", "description", "location", "district", "type", "operation", "status"];
  for (const field of required) {
    if (!input[field as keyof CreatePropertyInput]) {
      return { ok: false, error: `Campo requerido: ${field}` };
    }
  }

  if (input.price <= 0) {
    return { ok: false, error: "El precio debe ser mayor que 0" };
  }

  const id = `INM-${Date.now().toString(36).toUpperCase()}`;

  const { error } = await supabase.from("properties").insert({
    id,
    ...toDb(input),
  });

  if (error) {
    console.error("createProperty error", error);
    return { ok: false, error: "No se pudo crear la propiedad" };
  }

  revalidatePath("/propiedades");
  return { ok: true };
}

type UpdatePropertyInput = Partial<CreatePropertyInput> & { id: string };

export async function updateProperty(input: UpdatePropertyInput): Promise<{ ok: boolean; error?: string }> {
  const claims = await getAdminClaims();
  if (!claims) {
    return { ok: false, error: "No autorizado" };
  }

  const supabase = await createSupabaseServerClient();

  if (!input.id) {
    return { ok: false, error: "ID requerido" };
  }

  if (input.price !== undefined && input.price <= 0) {
    return { ok: false, error: "El precio debe ser mayor que 0" };
  }

  const { error } = await supabase
    .from("properties")
    .update(toDb(input))
    .eq("id", input.id);

  if (error) {
    console.error("updateProperty error", error);
    return { ok: false, error: "No se pudo actualizar la propiedad" };
  }

  revalidatePath("/propiedades");
  return { ok: true };
}

export async function deleteProperty(id: string): Promise<{ ok: boolean; error?: string }> {
  const claims = await getAdminClaims();
  if (!claims) {
    return { ok: false, error: "No autorizado" };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("deleteProperty error", error);
    return { ok: false, error: "No se pudo eliminar la propiedad" };
  }

  revalidatePath("/propiedades");
  return { ok: true };
}

function parseFormData(formData: FormData): CreatePropertyInput {
  const featuresRaw = String(formData.get("features") ?? "");
  const imagesRaw = String(formData.get("images") ?? "");
  const videosRaw = String(formData.get("videos") ?? "");
  const energyRaw = String(formData.get("energyCertificate") ?? "");
  const coordinatesRaw = String(formData.get("coordinates") ?? "");

  let energyCertificate: CreatePropertyInput["energyCertificate"] = undefined;
  if (energyRaw.trim()) {
    try {
      energyCertificate = JSON.parse(energyRaw);
    } catch {
      energyCertificate = undefined;
    }
  }

  let coordinates: CreatePropertyInput["coordinates"] = undefined;
  if (coordinatesRaw.trim()) {
    try {
      coordinates = JSON.parse(coordinatesRaw);
    } catch {
      coordinates = undefined;
    }
  }

  return {
    title: String(formData.get("title") ?? ""),
    price: Number(formData.get("price")),
    description: String(formData.get("description") ?? ""),
    location: String(formData.get("location") ?? ""),
    district: String(formData.get("district") ?? ""),
    type: String(formData.get("type")) as PropertyType,
    operation: String(formData.get("operation")) as "venta" | "alquiler",
    status: String(formData.get("status")) as PropertyStatus,
    bedrooms: formData.get("bedrooms") ? Number(formData.get("bedrooms")) : undefined,
    bathrooms: formData.get("bathrooms") ? Number(formData.get("bathrooms")) : undefined,
    sqm: formData.get("sqm") ? Number(formData.get("sqm")) : undefined,
    orientation: (formData.get("orientation") as Orientation | null) ?? undefined,
    terrace: formData.get("terrace") === "on",
    balcony: formData.get("balcony") === "on",
    garage: formData.get("garage") === "on",
    storage: formData.get("storage") === "on",
    elevator: formData.get("elevator") === "on",
    pmrAccessible: formData.get("pmrAccessible") === "on",
    approximateAddress: String(formData.get("approximateAddress") ?? "") || undefined,
    features: featuresRaw ? featuresRaw.split("\n").map((f) => f.trim()).filter(Boolean) : undefined,
    images: imagesRaw ? imagesRaw.split("\n").map((u) => u.trim()).filter(Boolean) : undefined,
    plan2d: String(formData.get("plan2d") ?? "") || undefined,
    plan3d: String(formData.get("plan3d") ?? "") || undefined,
    videos: videosRaw ? videosRaw.split("\n").map((u) => u.trim()).filter(Boolean) : undefined,
    badge: (formData.get("badge") as Property["badge"] | null) ?? undefined,
    energyCertificate,
    coordinates,
  };
}

export async function createPropertyForm(
  _prevState: { ok?: boolean; error?: string },
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const input = parseFormData(formData);
  return createProperty(input);
}

export async function updatePropertyForm(
  _prevState: { ok?: boolean; error?: string },
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const input = parseFormData(formData);
  return updateProperty({ ...input, id: String(formData.get("id") ?? "") });
}
