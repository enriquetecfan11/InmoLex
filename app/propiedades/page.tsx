import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertiesListing } from "@/components/properties/PropertiesListing";
import { getProperties } from "@/app/actions/property-actions";

export const metadata: Metadata = {
  title: "Propiedades",
  description:
    "Descubre nuestra selección exclusiva de viviendas de alto standing en Madrid. Compra y alquiler con asesoramiento personalizado.",
};

export default async function PropiedadesPage() {
  const properties = await getProperties();

  return (
    <Suspense
      fallback={
        <div className="brand-section py-12 sm:py-16 lg:py-20" aria-busy="true" />
      }
    >
      <PropertiesListing properties={properties} />
    </Suspense>
  );
}
