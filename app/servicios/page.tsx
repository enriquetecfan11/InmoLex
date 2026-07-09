import type { Metadata } from "next";
import { ServicesSection } from "@/components/services/ServicesSection";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios inmobiliarios integrales en Madrid: venta, alquiler, inversión, hipotecas, reportajes fotográficos y más.",
};

export default function ServiciosPage() {
  return <ServicesSection />;
}
