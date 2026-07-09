import type { Metadata } from "next";
import { AboutSection } from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Conoce InmoLex: presentación, historia, servicios y organización de eventos. Cercanía, criterio y una ejecución impecable.",
};

export default function QuienesSomosPage() {
  return <AboutSection />;
}

