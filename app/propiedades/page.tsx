import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertiesListing } from "@/components/properties/PropertiesListing";

export const metadata: Metadata = {
  title: "Propiedades",
  description:
    "Descubre nuestra selección exclusiva de viviendas de lujo en Madrid. Compra y alquiler con asesoramiento personalizado.",
};

export default function PropiedadesPage() {
  return (
    <Suspense
      fallback={
        <div className="brand-section py-16 sm:py-20 lg:py-28" aria-busy="true" />
      }
    >
      <PropertiesListing />
    </Suspense>
  );
}
