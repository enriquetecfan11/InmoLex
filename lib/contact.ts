import { LEGAL_ENTITY } from "@/lib/legal/entity";

export const CONTACT_INFO = {
  phone: "+34 910 000 000",
  phoneHref: "tel:+34910000000",
  email: LEGAL_ENTITY.email,
  emailHref: `mailto:${LEGAL_ENTITY.email}`,
  whatsapp: "+34 910 000 000",
  whatsappNumber:
    process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_NUMBER ?? "34910000000",
  address: LEGAL_ENTITY.address,
  addressHref:
    "https://www.google.com/maps/search/?api=1&query=Calle+Serrano+45,+28001+Madrid",
  hours: {
    weekdays: "Lun – Vie: 9:30 – 19:00",
    saturday: "Sáb: 10:00 – 14:00",
  },
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=-3.6902%2C40.4248%2C-3.6802%2C40.4298&layer=mapnik&marker=40.4273%2C-3.6852",
} as const;

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: "instagram" as const,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: "linkedin" as const,
  },
] as const;

export function getWhatsAppHref(message?: string): string {
  const number = CONTACT_INFO.whatsappNumber.replace(/\D/g, "");
  const text = message ?? "Hola, me gustaría recibir más información sobre InmoLex.";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export const CONTACT_INFO_WHATSAPP_HREF = getWhatsAppHref();

export const TRUST_SIGNALS = [
  { value: "< 24h", label: "Tiempo medio de respuesta" },
  { value: "Gratuito", label: "Asesoramiento sin coste" },
  { value: "Sin compromiso", label: "Consulta sin obligación" },
  { value: "+200", label: "Clientes satisfechos" },
] as const;
