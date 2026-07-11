/**
 * InmoLex — Formulario 2: Financiación y deuda
 * Especificación: docs/formularios/02-financiacion.md
 * Variable web: NEXT_PUBLIC_FORM_FINANCIACION
 *
 * CÓMO USAR
 * 1. Abre https://script.google.com con la cuenta de Google que gestionará los formularios.
 * 2. Nuevo proyecto → borra el código por defecto → pega este archivo completo.
 * 3. Menú Ejecutar → createFinanciacionForm (la primera vez pedirá autorizar permisos).
 * 4. Ve a Ver → Registros: copia la URL pública (viewform) para .env.local.
 * 5. En el formulario → Respuestas → activa notificaciones por email.
 */

function createFinanciacionForm() {
  var form = FormApp.create("InmoLex — Hipoteca, préstamo o deuda");

  form.setDescription(
    "Tus datos se tratan con confidencialidad. Solo los usamos para estudiar tu caso y contactarte."
  );

  // Pregunta 1 — Botones (obligatoria)
  form.addMultipleChoiceItem()
    .setTitle("¿Qué necesitas?")
    .setChoiceValues([
      "Hipoteca",
      "Préstamo personal",
      "Problemas con el pago de la vivienda",
    ])
    .setRequired(true);

  // Pregunta 2 — Detalles (opcional)
  form.addParagraphTextItem()
    .setTitle("Cuéntanos tu situación")
    .setHelpText(
      "Ejemplo: «Debo 180.000 €, cuotas atrasadas» o «Quiero hipoteca para piso de 300.000 €»"
    )
    .setRequired(false);

  // Pregunta 3 — Nombre (obligatoria)
  form.addTextItem()
    .setTitle("Nombre")
    .setRequired(true);

  // Pregunta 4 — Teléfono (obligatoria)
  form.addTextItem()
    .setTitle("Teléfono")
    .setRequired(true);

  // Pregunta 5 — Email (obligatoria)
  form.addTextItem()
    .setTitle("Email")
    .setRequired(true);

  // Pregunta 6 — Privacidad (obligatoria)
  form.addCheckboxItem()
    .setTitle("Privacidad")
    .setChoiceValues([
      "Acepto la política de privacidad y el tratamiento confidencial de mis datos",
    ])
    .setRequired(true);

  Logger.log("Formulario creado: " + form.getTitle());
  Logger.log("URL edición: " + form.getEditUrl());
  Logger.log("URL pública (pegar en NEXT_PUBLIC_FORM_FINANCIACION): " + form.getPublishedUrl());
}
