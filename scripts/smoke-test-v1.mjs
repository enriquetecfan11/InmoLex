#!/usr/bin/env node

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";

const routes = [
  "/",
  "/propiedades",
  "/contacto",
  "/privacidad",
  "/aviso-legal",
  "/cookies",
  "/servicios/comprar-vender",
  "/servicios/alquiler",
  "/servicios/valoracion",
  "/servicios/financiacion",
  "/servicios/deuda",
  "/servicios/inversores",
];

const serviceMenuHrefs = [
  "/servicios/comprar-vender",
  "/servicios/alquiler",
  "/servicios/valoracion",
  "/servicios/financiacion",
  "/servicios/deuda",
  "/servicios/inversores",
];

const footerLegalHrefs = ["/aviso-legal", "/privacidad", "/cookies"];

const formEnvKeys = [
  "NEXT_PUBLIC_FORM_INTERMEDIACION",
  "NEXT_PUBLIC_FORM_FINANCIACION",
  "NEXT_PUBLIC_FORM_CONTACTO",
];

function loadEnvLocal() {
  const path = resolve(__dirname, "..", ".env.local");
  if (!existsSync(path)) return {};

  return readFileSync(path, "utf8")
    .split("\n")
    .reduce((acc, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return acc;
      const idx = trimmed.indexOf("=");
      if (idx === -1) return acc;
      acc[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
      return acc;
    }, {});
}

async function fetchText(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  const text = await response.text();
  return { status: response.status, text };
}

function assertContains(html, needle, label) {
  if (!html.includes(needle)) {
    throw new Error(`${label}: no se encontró "${needle}"`);
  }
}

async function main() {
  const env = { ...loadEnvLocal(), ...process.env };
  const failures = [];

  console.log(`Smoke test V1 en ${BASE_URL}\n`);

  for (const route of routes) {
    try {
      const { status, text } = await fetchText(route);
      if (status !== 200) throw new Error(`status ${status}`);
      console.log(`✓ ${route} (${status})`);

      if (route === "/") {
        for (const href of serviceMenuHrefs) {
          assertContains(text, `href="${href}"`, `Home menú servicios ${href}`);
        }
        assertContains(text, 'href="/propiedades"', "Home CTA cartera");
        assertContains(text, "Enviar consulta", "Home CTA contacto");
        assertContains(text, "Escribir por WhatsApp", "Home CTA WhatsApp");
      }

      if (route === "/contacto") {
        assertContains(text, "Enviar consulta", "Contacto formulario");
        assertContains(text, "tel:", "Contacto teléfono");
        assertContains(text, "wa.me/", "Contacto WhatsApp");
        assertContains(text, "<iframe", "Contacto mapa");
      }

      if (route === "/servicios/comprar-vender") {
        assertContains(text, "Quiero comprar", `${route} CTA comprar`);
        assertContains(text, "Quiero vender", `${route} CTA vender`);
      }

      if (route === "/servicios/alquiler") {
        assertContains(text, "Busco alquiler", `${route} CTA buscar`);
        assertContains(text, "Alquilar mi piso", `${route} CTA alquilar`);
      }

      if (route === "/servicios/valoracion") {
        assertContains(text, "Pedir valoración gratis", `${route} CTA valoración`);
      }

      if (route === "/servicios/financiacion") {
        assertContains(text, "Pedir hipoteca", `${route} CTA hipoteca`);
        assertContains(text, "Pedir préstamo", `${route} CTA préstamo`);
      }

      if (route === "/servicios/deuda") {
        assertContains(text, "Necesito ayuda con mi deuda", `${route} CTA deuda`);
      }

      if (route === "/servicios/inversores") {
        assertContains(text, "Soy inversor", `${route} CTA inversor`);
      }

      if (route.startsWith("/servicios/")) {
        assertContains(text, "Prefiero WhatsApp", `${route} WhatsApp`);
        assertContains(text, "wa.me/", `${route} enlace WhatsApp`);
      }

      if (route === "/privacidad" || route === "/aviso-legal" || route === "/cookies") {
        assertContains(text, "<h1", `${route} título`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push(`${route}: ${message}`);
      console.log(`✗ ${route}: ${message}`);
    }
  }

  try {
    const { text } = await fetchText("/");
    for (const href of footerLegalHrefs) {
      assertContains(text, `href="${href}"`, `Footer legal ${href}`);
    }
    console.log("✓ Footer enlaces legales");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`footer: ${message}`);
    console.log(`✗ footer: ${message}`);
  }

  const properties = await fetchText("/propiedades");
  const propertyIdMatch = properties.text.match(/href="\/propiedades\/([^"]+)"/);
  if (!propertyIdMatch) {
    failures.push("propiedades: no se encontró enlace a ficha");
    console.log("✗ propiedades: no se encontró enlace a ficha");
  } else {
    const propertyId = propertyIdMatch[1];
    const detail = await fetchText(`/propiedades/${propertyId}`);
    if (detail.status !== 200) {
      failures.push(`propiedades/${propertyId}: status ${detail.status}`);
      console.log(`✗ propiedades/${propertyId}: status ${detail.status}`);
    } else {
      assertContains(detail.text, "Agendar visita", "Ficha agendar visita");
      assertContains(detail.text, "wa.me/", "Ficha WhatsApp");
      const titleMatch = detail.text.match(/<h1[^>]*>([^<]+)<\/h1>/);
      if (titleMatch) {
        const encodedTitle = encodeURIComponent(titleMatch[1].trim());
        assertContains(
          detail.text,
          encodedTitle,
          "Ficha WhatsApp con nombre de propiedad",
        );
      }
      console.log(`✓ /propiedades/${propertyId}`);
    }
  }

  const formPages = {
    NEXT_PUBLIC_FORM_INTERMEDIACION: ["/servicios/comprar-vender", "/servicios/alquiler", "/servicios/valoracion"],
    NEXT_PUBLIC_FORM_FINANCIACION: ["/servicios/financiacion", "/servicios/deuda"],
    NEXT_PUBLIC_FORM_CONTACTO: ["/", "/contacto", "/servicios/inversores"],
  };

  for (const key of formEnvKeys) {
    const url = env[key];
    if (!url) {
      failures.push(`${key} no configurada`);
      console.log(`✗ ${key} no configurada`);
      continue;
    }
    const pages = await Promise.all(
      formPages[key].map((route) => fetchText(route)),
    );
    const found = pages.some(({ text }) => text.includes(url));
    if (!found) {
      failures.push(`${key} no aparece renderizada en ${formPages[key].join(", ")}`);
      console.log(`✗ ${key} no aparece renderizada`);
    } else {
      console.log(`✓ ${key} enlazada en CTAs`);
    }
  }

  if (failures.length > 0) {
    console.log(`\n${failures.length} fallo(s):`);
    failures.forEach((failure) => console.log(`- ${failure}`));
    process.exit(1);
  }

  console.log("\nSmoke test V1 completado sin errores.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
