import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con InmoLex en Madrid. Asesoramiento gratuito, sin compromiso y respuesta en menos de 24 horas.",
};

export default function ContactoPage() {
  return <ContactSection />;
}
