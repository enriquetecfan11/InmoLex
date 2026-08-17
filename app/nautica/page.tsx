import type { Metadata } from "next";
import { Suspense } from "react";
import { VesselsListing } from "@/components/nautica/VesselsListing";
import { getVessels } from "@/app/actions/vessel-actions";

export const metadata: Metadata = {
  title: "Náutica",
  description:
    "Catálogo de embarcaciones: yates, veleros, lanchas y motoras en venta y alquiler, con asesoramiento personalizado.",
};

export default async function NauticaPage() {
  const vessels = await getVessels();

  return (
    <Suspense
      fallback={
        <div className="brand-section py-12 sm:py-16 lg:py-20" aria-busy="true" />
      }
    >
      <VesselsListing vessels={vessels} />
    </Suspense>
  );
}
