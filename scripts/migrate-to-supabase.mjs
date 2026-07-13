import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import propertiesData from "../data/properties.json" with { type: "json" };

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

function toDbProperty(property) {
  const {
    createdAt,
    approximateAddress,
    elevatorCount,
    pmrAccessible,
    energyCertificate,
    detailSections,
    ...rest
  } = property;

  return {
    ...rest,
    created_at: createdAt,
    approximate_address: approximateAddress,
    elevator_count: elevatorCount ?? null,
    pmr_accessible: pmrAccessible,
    energy_certificate: energyCertificate ?? null,
  };
}

async function migrate() {
  const rows = propertiesData.map(toDbProperty);

  const { error } = await supabase
    .from("properties")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }

  console.log(`Migrated ${rows.length} properties`);
}

migrate();
