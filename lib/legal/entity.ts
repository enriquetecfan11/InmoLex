/**
 * Datos identificativos del titular (LSSI / RGPD).
 * Actualizar aquí antes de publicar; los textos legales los reutilizan automáticamente.
 */
export const LEGAL_ENTITY = {
  tradeName: "InmoLex",
  legalName: "Inmobiliaria Cero",
  taxId: "",
  email: "hola@inmobiliariacero.es",
  address: "Calle Serrano 45, 28001 Madrid",
  jurisdiction: "Madrid",
} as const;

export const LEGAL_UPDATED_AT = "11 de julio de 2026";

export function getLegalEntityLines(): string[] {
  const lines = [
    `Titular: ${LEGAL_ENTITY.legalName} (${LEGAL_ENTITY.tradeName}).`,
    ...(LEGAL_ENTITY.taxId ? [`CIF: ${LEGAL_ENTITY.taxId}.`] : []),
    `Correo electrónico: ${LEGAL_ENTITY.email}`,
    `Dirección: ${LEGAL_ENTITY.address}`,
  ];

  return lines;
}

export function getDataControllerLines(): string[] {
  return [
    `Responsable: ${LEGAL_ENTITY.legalName} (${LEGAL_ENTITY.tradeName}).`,
    ...(LEGAL_ENTITY.taxId ? [`CIF: ${LEGAL_ENTITY.taxId}.`] : []),
    `Correo de contacto: ${LEGAL_ENTITY.email}`,
    `Dirección: ${LEGAL_ENTITY.address}`,
  ];
}
