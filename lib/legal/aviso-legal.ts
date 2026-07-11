import type { LegalSection } from "@/lib/legal/privacy";
import { getLegalEntityLines, LEGAL_ENTITY, LEGAL_UPDATED_AT } from "@/lib/legal/entity";

export const LEGAL_NOTICE_CONTENT = {
  title: "Aviso legal",
  updatedAt: LEGAL_UPDATED_AT,
  intro:
    "En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios de los datos identificativos del titular de este sitio web.",
  sections: [
    {
      title: "Datos identificativos",
      paragraphs: getLegalEntityLines(),
    },
    {
      title: "Objeto",
      paragraphs: [
        `El presente sitio web tiene por objeto ofrecer información sobre los servicios inmobiliarios de ${LEGAL_ENTITY.tradeName} y facilitar el contacto con potenciales clientes mediante formularios, teléfono, correo electrónico y WhatsApp.`,
      ],
    },
    {
      title: "Condiciones de uso",
      paragraphs: [
        "El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de las presentes condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos.",
        "Los formularios de contacto enlazan a Google Forms gestionados por el titular. Al enviarlos, el usuario acepta las condiciones indicadas en cada formulario y en la política de privacidad.",
      ],
    },
    {
      title: "Propiedad intelectual",
      paragraphs: [
        `Todos los contenidos del sitio web (textos, imágenes, logotipos, diseño) son propiedad de ${LEGAL_ENTITY.tradeName} o de sus licenciantes y están protegidos por la legislación de propiedad intelectual.`,
      ],
    },
    {
      title: "Responsabilidad",
      paragraphs: [
        `${LEGAL_ENTITY.tradeName} no se hace responsable de los daños derivados del uso indebido del sitio web ni de la información publicada por terceros a través de enlaces externos.`,
        "Las fotografías, planos y descripciones de inmuebles tienen carácter orientativo y pueden variar. La información contractual definitiva se facilitará en el momento de la operación.",
      ],
    },
    {
      title: "Legislación aplicable",
      paragraphs: [
        `Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someterán a los juzgados y tribunales de ${LEGAL_ENTITY.jurisdiction}.`,
      ],
    },
  ] satisfies LegalSection[],
};
