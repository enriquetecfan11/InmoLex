import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import listingData from "./data/can-baro-property.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvFile(filePath) {
  let contents;

  try {
    contents = readFileSync(filePath, "utf8");
  } catch {
    return;
  }

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    if (!key || process.env[key] !== undefined) continue;

    let value = trimmed.slice(equalsIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

loadEnvFile(resolve(__dirname, "../.env.local"));
loadEnvFile(resolve(__dirname, "../.env"));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local o .env",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const BUCKET = "property-images";
const FOLDER = `properties/${listingData.id}`;

function idealistaUrl(path) {
  return `https://img4.idealista.com/blur/WEB_DETAIL-XL-P/0/id.pro.es.image.master/${path}.jpg`;
}

async function downloadImage(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`No se pudo descargar ${url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "image/jpeg";
  return { buffer, contentType };
}

async function uploadImage(path, index, label) {
  const sourceUrl = idealistaUrl(path);
  const extension = "jpg";
  const filePath = `${FOLDER}/${String(index + 1).padStart(2, "0")}-${label}.${extension}`;

  console.log(`  ↓ ${sourceUrl}`);
  const { buffer, contentType } = await downloadImage(sourceUrl);

  const { error } = await supabase.storage.from(BUCKET).upload(filePath, buffer, {
    cacheControl: "3600",
    upsert: true,
    contentType,
  });

  if (error) {
    throw new Error(`Error subiendo ${filePath}: ${error.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

async function importProperty() {
  console.log(`Importando ${listingData.id}...`);

  const imageUrls = [];
  for (const [index, path] of listingData.imagePaths.entries()) {
    const url = await uploadImage(path, index, `foto-${index + 1}`);
    imageUrls.push(url);
    console.log(`  ✓ foto ${index + 1}/${listingData.imagePaths.length}`);
  }

  const planUrl = await uploadImage(listingData.planPath, 99, "plano");
  console.log("  ✓ plano");

  const { property, translations, virtualTourUrl, id } = listingData;

  const row = {
    id,
    title: property.title,
    price: property.price,
    description: property.description,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    sqm: property.sqm,
    orientation: property.orientation,
    terrace: property.terrace,
    balcony: property.balcony,
    garage: property.garage,
    storage: property.storage,
    elevator: property.elevator,
    elevator_count: property.elevator_count,
    pmr_accessible: property.pmr_accessible,
    district: property.district,
    approximate_address: property.approximate_address,
    location: property.location,
    features: property.features,
    status: property.status,
    type: property.type,
    operation: property.operation,
    images: imageUrls,
    plan2d: planUrl,
    plan3d: virtualTourUrl,
    videos: [virtualTourUrl],
    badge: property.badge,
    energy_certificate: property.energy_certificate,
    coordinates: property.coordinates,
    translations,
  };

  const { error } = await supabase.from("properties").upsert(row, { onConflict: "id" });

  if (error) {
    throw new Error(`Error insertando propiedad: ${error.message}`);
  }

  console.log(`\n✅ Propiedad ${id} importada correctamente`);
  console.log(`   Fotos: ${imageUrls.length}`);
  console.log(`   Idiomas: ${Object.keys(translations).join(", ")}`);
  console.log(`   URL web: /propiedades/${id}`);
}

importProperty().catch((error) => {
  console.error("\n❌ Importación fallida:", error.message);
  process.exit(1);
});
