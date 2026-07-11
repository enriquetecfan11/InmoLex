import type { GoogleFormKey } from "@/lib/google-forms";
import {
  CONTACTO_CHOICES,
  FINANCIACION_CHOICES,
  INTERMEDIACION_CHOICES,
} from "@/lib/google-form-prefill";

export interface ServiceFormOption {
  label: string;
  description: string;
  formKey: GoogleFormKey;
  ctaLabel: string;
  prefillChoice: string;
}

export interface ServicePage {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  formOptions?: ServiceFormOption[];
  formKey?: GoogleFormKey;
  ctaLabel?: string;
  prefillChoice?: string;
  privacyNote?: string;
  highlight?: string;
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "comprar-vender",
    eyebrow: "Compra y venta",
    title: "Comprar o vender",
    description: "Pulsa el botón que corresponda. Te llamamos nosotros.",
    formOptions: [
      {
        label: "Quiero comprar",
        description: "Te ayudamos a encontrar tu propiedad.",
        formKey: "intermediacion",
        ctaLabel: "Quiero comprar",
        prefillChoice: INTERMEDIACION_CHOICES.comprar,
      },
      {
        label: "Quiero vender",
        description: "Valoramos tu inmueble sin compromiso.",
        formKey: "intermediacion",
        ctaLabel: "Quiero vender",
        prefillChoice: INTERMEDIACION_CHOICES.vender,
      },
    ],
  },
  {
    slug: "alquiler",
    eyebrow: "Alquiler",
    title: "Alquiler",
    description: "¿Buscas piso o quieres alquilar el tuyo? Elige una opción.",
    formOptions: [
      {
        label: "Busco alquiler",
        description: "Dinos qué buscas y te contactamos.",
        formKey: "intermediacion",
        ctaLabel: "Busco alquiler",
        prefillChoice: INTERMEDIACION_CHOICES.buscarAlquiler,
      },
      {
        label: "Quiero alquilar mi piso",
        description: "Gestionamos el alquiler por ti.",
        formKey: "intermediacion",
        ctaLabel: "Alquilar mi piso",
        prefillChoice: INTERMEDIACION_CHOICES.ponerAlquiler,
      },
    ],
  },
  {
    slug: "valoracion",
    eyebrow: "Valoración",
    title: "Valoración gratuita",
    description: "Sin compromiso. Un clic y te llamamos.",
    formKey: "intermediacion",
    ctaLabel: "Pedir valoración gratis",
    prefillChoice: INTERMEDIACION_CHOICES.valoracion,
  },
  {
    slug: "financiacion",
    eyebrow: "Financiación",
    title: "Hipoteca o préstamo",
    description: "Elige qué necesitas. Nosotros te guiamos.",
    formOptions: [
      {
        label: "Hipoteca",
        description: "Para comprar tu vivienda.",
        formKey: "financiacion",
        ctaLabel: "Pedir hipoteca",
        prefillChoice: FINANCIACION_CHOICES.hipoteca,
      },
      {
        label: "Préstamo personal",
        description: "Para otros proyectos.",
        formKey: "financiacion",
        ctaLabel: "Pedir préstamo",
        prefillChoice: FINANCIACION_CHOICES.prestamo,
      },
    ],
    privacyNote:
      "Tus datos financieros se usan solo para estudiar tu solicitud.",
  },
  {
    slug: "deuda",
    eyebrow: "Ayuda con deuda",
    title: "Problemas con el pago",
    description: "Te ayudamos. Cuéntanos tu caso con total confidencialidad.",
    formKey: "financiacion",
    ctaLabel: "Necesito ayuda con mi deuda",
    prefillChoice: FINANCIACION_CHOICES.deuda,
    highlight: "Nosotros compramos tu deuda",
    privacyNote:
      "Información confidencial. Solo la usamos para estudiar tu situación.",
  },
  {
    slug: "inversores",
    eyebrow: "Inversión",
    title: "Inversores y subastas",
    description: "Accede a oportunidades exclusivas.",
    formKey: "contacto",
    ctaLabel: "Soy inversor",
    prefillChoice: CONTACTO_CHOICES.inversor,
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug);
}
