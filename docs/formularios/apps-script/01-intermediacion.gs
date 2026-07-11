/**
 * InmoLex — Formulario 1: Intermediación
 * Especificación: docs/formularios/01-intermediacion.md
 * Variable web: NEXT_PUBLIC_FORM_INTERMEDIACION
 *
 * CÓMO USAR
 * 1. Abre https://script.google.com con la cuenta de Google que gestionará los formularios.
 * 2. Nuevo proyecto → borra el código por defecto → pega este archivo completo.
 * 3. Menú Ejecutar → createIntermediacionForm (la primera vez pedirá autorizar permisos).
 * 4. Ve a Ver → Registros: copia la URL pública (viewform) para .env.local.
 * 5. En el formulario → Respuestas → activa notificaciones por email.
 */

function createIntermediacionForm() {
  var form = FormApp.create("InmoLex — Comprar, vender, alquilar o valorar");

  // Pregunta 1 — Botones (obligatoria)
  form.addMultipleChoiceItem()
    .setTitle("¿Qué quieres hacer?")
    .setChoiceValues([
      "Comprar una propiedad",
      "Vender una propiedad",
      "Buscar un alquiler",
      "Poner en alquiler",
      "Valoración gratuita",
    ])
    .setRequired(true);

  // Pregunta 2 — Zona (opcional)
  form.addTextItem()
    .setTitle("¿En qué zona?")
    .setHelpText("Ejemplo: Salamanca, Chamberí, La Moraleja…")
    .setRequired(false);

  // Pregunta 3 — Detalles (opcional)
  form.addParagraphTextItem()
    .setTitle("Cuéntanos qué buscas o qué tienes")
    .setHelpText(
      "Ejemplo: «Piso 3 hab. máx. 400.000 €» o «Chalet en venta en La Moraleja»"
    )
    .setRequired(false);

  // Pregunta 4 — Nombre (obligatoria)
  form.addTextItem()
    .setTitle("Nombre")
    .setRequired(true);

  // Pregunta 5 — Teléfono (obligatoria)
  form.addTextItem()
    .setTitle("Teléfono")
    .setRequired(true);

  // Pregunta 6 — Email (obligatoria)
  form.addTextItem()
    .setTitle("Email")
    .setRequired(true);

  // Pregunta 7 — Privacidad (obligatoria)
  form.addCheckboxItem()
    .setTitle("Privacidad")
    .setChoiceValues(["Acepto la política de privacidad"])
    .setRequired(true);

  Logger.log("Formulario creado: " + form.getTitle());
  Logger.log("URL edición: " + form.getEditUrl());
  Logger.log("URL pública (pegar en NEXT_PUBLIC_FORM_INTERMEDIACION): " + form.getPublishedUrl());
}
