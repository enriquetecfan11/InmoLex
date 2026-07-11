import { getDataControllerLines, LEGAL_ENTITY, LEGAL_UPDATED_AT } from "@/lib/legal/entity";

export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export const PRIVACY_CONTENT = {
  title: "Política de privacidad",
  updatedAt: LEGAL_UPDATED_AT,
  intro: `En ${LEGAL_ENTITY.tradeName} (${LEGAL_ENTITY.legalName}) tratamos sus datos personales con la máxima diligencia y conforme a la normativa vigente en materia de protección de datos (RGPD y LOPDGDD).`,
  sections: [
    {
      title: "Responsable del tratamiento",
      paragraphs: getDataControllerLines(),
    },
    {
      title: "Finalidad del tratamiento",
      paragraphs: [
        "Los datos personales que nos facilite a través de formularios, correo electrónico, teléfono o WhatsApp serán tratados para:",
      ],
      list: [
        "Gestionar sus solicitudes de información, compra, venta, alquiler o valoración.",
        "Prestar servicios de intermediación inmobiliaria y financiación.",
        "Enviar comunicaciones relacionadas con su consulta.",
        "Cumplir con obligaciones legales aplicables.",
      ],
    },
    {
      title: "Formularios de contacto",
      paragraphs: [
        "Al pulsar los botones de la web, puede acceder a formularios alojados en Google Forms (Google LLC). Los datos que introduzca se envían directamente al responsable del tratamiento para gestionar su solicitud.",
        "Le recomendamos no incluir información sensible que no sea necesaria para su consulta. Puede ejercer sus derechos contactando con nosotros en la dirección indicada al inicio de esta política.",
      ],
    },
    {
      title: "Tratamiento de datos financieros",
      paragraphs: [
        "En formularios de hipoteca, préstamo personal o situaciones de deuda hipotecaria, podemos recabar datos de carácter financiero (ingresos, deudas, situación laboral).",
        "Estos datos se tratarán exclusivamente para estudiar su solicitud y ofrecerle una solución adecuada. No se cederán a terceros sin su consentimiento expreso, salvo obligación legal.",
      ],
    },
    {
      title: "Tratamiento de datos sensibles (deuda hipotecaria)",
      paragraphs: [
        "La información relativa a procedimientos judiciales, embargos o subastas se considera de carácter sensible. La trataremos con estricta confidencialidad y únicamente para analizar su situación y proponer alternativas.",
      ],
    },
    {
      title: "Legitimación",
      paragraphs: [
        "La base legal para el tratamiento es el consentimiento del interesado, la ejecución de medidas precontractuales a petición del interesado y el interés legítimo en responder a sus consultas.",
      ],
    },
    {
      title: "Conservación de datos",
      paragraphs: [
        "Conservaremos sus datos mientras sea necesario para atender su solicitud y, posteriormente, durante los plazos legalmente establecidos.",
      ],
    },
    {
      title: "Destinatarios",
      paragraphs: [
        "No cedemos sus datos a terceros, salvo obligación legal o cuando sea necesario para la prestación del servicio solicitado (por ejemplo, entidades financieras en caso de solicitud de hipoteca, con su autorización previa).",
        "Los formularios de Google Forms pueden implicar el tratamiento de datos por Google como proveedor tecnológico, conforme a su propia política de privacidad.",
      ],
    },
    {
      title: "Derechos",
      paragraphs: [
        `Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando un correo a ${LEGAL_ENTITY.email}.`,
        "También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).",
      ],
    },
  ] satisfies LegalSection[],
};
