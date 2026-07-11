import type { LegalSection } from "@/lib/legal/privacy";
import { LEGAL_ENTITY, LEGAL_UPDATED_AT } from "@/lib/legal/entity";

export const COOKIES_CONTENT = {
  title: "Política de cookies",
  updatedAt: LEGAL_UPDATED_AT,
  intro:
    "Este sitio web utiliza almacenamiento local en su navegador para recordar preferencias básicas. A continuación le informamos sobre su uso.",
  sections: [
    {
      title: "¿Qué son las cookies?",
      paragraphs: [
        "Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten recordar preferencias y mejorar la funcionalidad del sitio.",
      ],
    },
    {
      title: "Qué utilizamos en esta web",
      paragraphs: ["En la versión actual del sitio utilizamos únicamente:"],
      list: [
        "Almacenamiento local (localStorage) para recordar si ha aceptado o rechazado el aviso de cookies.",
        "Cookies técnicas estrictamente necesarias para el funcionamiento básico del sitio, si las requiere el proveedor de hosting.",
      ],
    },
    {
      title: "Cookies de análisis",
      paragraphs: [
        "Actualmente no instalamos cookies de análisis ni herramientas de medición de audiencia. Si en el futuro se incorporan, se le informará y se solicitará su consentimiento cuando corresponda.",
      ],
    },
    {
      title: "Gestión de cookies",
      paragraphs: [
        "Al acceder al sitio web, se le mostrará un banner donde puede aceptar o rechazar las cookies no esenciales.",
        "También puede configurar su navegador para bloquear o eliminar cookies y datos almacenados localmente. Consulte la ayuda de su navegador para más información.",
      ],
    },
    {
      title: "Más información",
      paragraphs: [
        `Para cualquier consulta sobre el uso de cookies, puede contactarnos en ${LEGAL_ENTITY.email}.`,
        "Consulte también nuestra política de privacidad para más información sobre el tratamiento de sus datos.",
      ],
    },
  ] satisfies LegalSection[],
};

export const COOKIE_CONSENT_KEY = "inmolex-cookie-consent";
