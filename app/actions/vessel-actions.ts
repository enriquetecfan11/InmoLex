"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type {
  Operation,
  PropertyBadge,
  PropertyCoordinates,
  PropertyStatus,
  Vessel,
  VesselType,
} from "@/lib/vessels";

type DbVessel = {
  id: string;
  created_at: string;
  title: string;
  price: number;
  description: string;
  type: string;
  operation: string;
  status: string;
  length_meters: number;
  year: number;
  cabins: number;
  bathrooms: number;
  capacity: number;
  engine: string | null;
  manufacturer: string | null;
  location: string;
  features: string[];
  images: string[];
  videos: string[];
  badge: string | null;
  coordinates: { lat: number; lng: number } | null;
};

function toDb(vessel: Partial<Vessel> & { id?: string }): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  if (vessel.id) data.id = vessel.id;
  if (vessel.title) data.title = vessel.title;
  if (vessel.price !== undefined) data.price = vessel.price;
  if (vessel.description) data.description = vessel.description;
  if (vessel.type) data.type = vessel.type;
  if (vessel.operation) data.operation = vessel.operation;
  if (vessel.status) data.status = vessel.status;
  if (vessel.lengthMeters !== undefined) data.length_meters = vessel.lengthMeters;
  if (vessel.year !== undefined) data.year = vessel.year;
  if (vessel.cabins !== undefined) data.cabins = vessel.cabins;
  if (vessel.bathrooms !== undefined) data.bathrooms = vessel.bathrooms;
  if (vessel.capacity !== undefined) data.capacity = vessel.capacity;
  if (vessel.engine !== undefined) data.engine = vessel.engine || null;
  if (vessel.manufacturer !== undefined) data.manufacturer = vessel.manufacturer || null;
  if (vessel.location) data.location = vessel.location;
  if (vessel.features) data.features = vessel.features;
  if (vessel.images) data.images = vessel.images;
  if (vessel.videos) data.videos = vessel.videos;
  if (vessel.badge !== undefined) data.badge = vessel.badge || null;
  if (vessel.coordinates !== undefined) data.coordinates = vessel.coordinates ?? null;
  return data;
}

function toVessel(db: DbVessel): Vessel {
  return {
    id: db.id,
    createdAt: db.created_at,
    title: db.title,
    price: db.price,
    description: db.description,
    type: db.type as VesselType,
    operation: db.operation as Operation,
    status: db.status as PropertyStatus,
    lengthMeters: Number(db.length_meters),
    year: db.year,
    cabins: db.cabins,
    bathrooms: db.bathrooms,
    capacity: db.capacity,
    engine: db.engine ?? undefined,
    manufacturer: db.manufacturer ?? undefined,
    location: db.location,
    features: db.features ?? [],
    images: db.images ?? [],
    videos: db.videos ?? [],
    badge: (db.badge as PropertyBadge | null) ?? undefined,
    coordinates: (db.coordinates as PropertyCoordinates | null) ?? undefined,
  };
}

export async function getVessels(): Promise<Vessel[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("vessels")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("getVessels error", error);
    return [];
  }

  return data.map(toVessel);
}

export async function getVessel(id: string): Promise<Vessel | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("vessels")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return toVessel(data);
}

type CreateVesselInput = {
  title: string;
  price: number;
  description: string;
  location: string;
  type: VesselType;
  operation: Operation;
  status: PropertyStatus;
  lengthMeters?: number;
  year?: number;
  cabins?: number;
  bathrooms?: number;
  capacity?: number;
  engine?: string;
  manufacturer?: string;
  features?: string[];
  images?: string[];
  videos?: string[];
  badge?: PropertyBadge;
  coordinates?: PropertyCoordinates;
};

export async function createVessel(
  input: CreateVesselInput,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = createSupabaseServerClient();

  const required = ["title", "price", "description", "location", "type", "operation", "status"];
  for (const field of required) {
    if (!input[field as keyof CreateVesselInput]) {
      return { ok: false, error: `Campo requerido: ${field}` };
    }
  }

  if (input.price <= 0) {
    return { ok: false, error: "El precio debe ser mayor que 0" };
  }

  const id = `NAU-${Date.now().toString(36).toUpperCase()}`;

  const { error } = await supabase.from("vessels").insert({
    id,
    ...toDb(input),
  });

  if (error) {
    console.error("createVessel error", error);
    return { ok: false, error: "No se pudo crear la embarcación" };
  }

  revalidatePath("/nautica");
  revalidatePath("/");
  return { ok: true };
}

type UpdateVesselInput = Partial<CreateVesselInput> & { id: string };

export async function updateVessel(
  input: UpdateVesselInput,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = createSupabaseServerClient();

  if (!input.id) {
    return { ok: false, error: "ID requerido" };
  }

  if (input.price !== undefined && input.price <= 0) {
    return { ok: false, error: "El precio debe ser mayor que 0" };
  }

  const { error } = await supabase
    .from("vessels")
    .update(toDb(input))
    .eq("id", input.id);

  if (error) {
    console.error("updateVessel error", error);
    return { ok: false, error: "No se pudo actualizar la embarcación" };
  }

  revalidatePath("/nautica");
  revalidatePath(`/nautica/${input.id}`);
  revalidatePath("/");
  return { ok: true };
}

export async function deleteVessel(id: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from("vessels").delete().eq("id", id);

  if (error) {
    console.error("deleteVessel error", error);
    return { ok: false, error: "No se pudo eliminar la embarcación" };
  }

  revalidatePath("/nautica");
  revalidatePath("/");
  return { ok: true };
}

function parseFormData(formData: FormData): CreateVesselInput {
  const featuresRaw = String(formData.get("features") ?? "");
  const imagesRaw = String(formData.get("images") ?? "");
  const videosRaw = String(formData.get("videos") ?? "");
  const coordinatesRaw = String(formData.get("coordinates") ?? "");

  let coordinates: CreateVesselInput["coordinates"] = undefined;
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
    type: String(formData.get("type")) as VesselType,
    operation: String(formData.get("operation")) as Operation,
    status: String(formData.get("status")) as PropertyStatus,
    lengthMeters: formData.get("lengthMeters")
      ? Number(formData.get("lengthMeters"))
      : undefined,
    year: formData.get("year") ? Number(formData.get("year")) : undefined,
    cabins: formData.get("cabins") ? Number(formData.get("cabins")) : undefined,
    bathrooms: formData.get("bathrooms") ? Number(formData.get("bathrooms")) : undefined,
    capacity: formData.get("capacity") ? Number(formData.get("capacity")) : undefined,
    engine: String(formData.get("engine") ?? "") || undefined,
    manufacturer: String(formData.get("manufacturer") ?? "") || undefined,
    features: featuresRaw
      ? featuresRaw.split("\n").map((f) => f.trim()).filter(Boolean)
      : undefined,
    images: imagesRaw
      ? imagesRaw.split("\n").map((u) => u.trim()).filter(Boolean)
      : undefined,
    videos: videosRaw
      ? videosRaw.split(/[\n,]/).map((u) => u.trim()).filter(Boolean)
      : undefined,
    badge: (formData.get("badge") as PropertyBadge | null) || undefined,
    coordinates,
  };
}

export async function createVesselForm(
  _prevState: { ok?: boolean; error?: string },
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const input = parseFormData(formData);
  return createVessel(input);
}

export async function updateVesselForm(
  _prevState: { ok?: boolean; error?: string },
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const input = parseFormData(formData);
  return updateVessel({ ...input, id: String(formData.get("id") ?? "") });
}
