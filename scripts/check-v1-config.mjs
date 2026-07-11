#!/usr/bin/env node

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvFile(filename) {
  const path = resolve(root, filename);
  if (!existsSync(path)) return {};

  return readFileSync(path, "utf8")
    .split("\n")
    .reduce((acc, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return acc;
      const separator = trimmed.indexOf("=");
      if (separator === -1) return acc;
      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim();
      acc[key] = value;
      return acc;
    }, {});
}

const env = {
  ...loadEnvFile(".env"),
  ...loadEnvFile(".env.local"),
  ...process.env,
};

const requiredForms = [
  {
    key: "NEXT_PUBLIC_FORM_INTERMEDIACION",
    label: "Intermediación (compra, venta, alquiler, valoración)",
  },
  {
    key: "NEXT_PUBLIC_FORM_FINANCIACION",
    label: "Financiación (hipoteca, préstamo, deuda)",
  },
  {
    key: "NEXT_PUBLIC_FORM_CONTACTO",
    label: "Contacto general e inversores",
  },
];

const whatsappKey = "NEXT_PUBLIC_CONTACT_WHATSAPP_NUMBER";

function isValidGoogleFormUrl(value) {
  if (!value) return false;
  return /^https:\/\/docs\.google\.com\/forms\//.test(value);
}

function isValidWhatsAppNumber(value) {
  if (!value) return false;
  return /^\d{9,15}$/.test(value.replace(/\D/g, ""));
}

const issues = [];
const warnings = [];

for (const form of requiredForms) {
  const value = env[form.key]?.trim() ?? "";
  if (!value) {
    issues.push(`${form.key} no está configurada (${form.label})`);
    continue;
  }
  if (!isValidGoogleFormUrl(value)) {
    issues.push(`${form.key} no parece una URL válida de Google Forms`);
  }
}

const whatsapp = env[whatsappKey]?.trim() ?? "";
if (!whatsapp) {
  issues.push(`${whatsappKey} no está configurado`);
} else if (!isValidWhatsAppNumber(whatsapp)) {
  warnings.push(`${whatsappKey} debería tener solo dígitos con prefijo país (9-15 dígitos)`);
}

console.log("Verificación de configuración V1\n");

for (const form of requiredForms) {
  const value = env[form.key]?.trim() ?? "";
  const ok = isValidGoogleFormUrl(value);
  console.log(`${ok ? "✓" : "✗"} ${form.key}`);
  if (ok) console.log(`  ${value}`);
}

console.log(`${isValidWhatsAppNumber(whatsapp) ? "✓" : "✗"} ${whatsappKey}`);
if (whatsapp) console.log(`  ${whatsapp}`);

try {
  const entityPath = resolve(root, "lib/legal/entity.ts");
  const entitySource = readFileSync(entityPath, "utf8");
  if (/taxId:\s*""/.test(entitySource)) {
    warnings.push("LEGAL_ENTITY.taxId vacío en lib/legal/entity.ts (confirmar CIF antes de publicar)");
  }
} catch {
  // optional check
}

if (warnings.length > 0) {
  console.log("\nAdvertencias:");
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (issues.length > 0) {
  console.log("\nPendiente antes de publicar:");
  issues.forEach((issue) => console.log(`- ${issue}`));
  console.log("\nCopia .env.example a .env.local y rellena las URLs reales.");
  process.exit(1);
}

console.log("\nConfiguración V1 lista para verificación funcional.");
