/**
 * InmoLex — Formulario 3: Contacto e inversores
 * Especificación: docs/formularios/03-contacto-inversores.md
 * Variable web: NEXT_PUBLIC_FORM_CONTACTO
 *
 * CÓMO USAR
 * 1. Abre https://script.google.com con la cuenta de Google que gestionará los formularios.
 * 2. Nuevo proyecto → borra el código por defecto → pega este archivo completo.
 * 3. Menú Ejecutar → createContactoForm (la primera vez pedirá autorizar permisos).
 * 4. Ve a Ver → Registros: copia la URL pública (viewform) para .env.local.
 * 5. En el formulario → Respuestas → activa notificaciones por email.
 */

function createContactoForm() {
  var form = FormApp.create("InmoLex — Contacto");

  // Pregunta 1 — Botones (obligatoria)
  form.addMultipleChoiceItem()
    .setTitle("¿En qué podemos ayudarte?")
    .setChoiceValues([
      "Tengo una consulta",
      "Soy inversor / busco subastas",
      "Quiero visitar una propiedad",
    ])
    .setRequired(true);

  // Pregunta 2 — Mensaje (opcional)
  form.addParagraphTextItem()
    .setTitle("¿Qué necesitas?")
    .setRequired(false);

  // Pregunta 3 — Propiedad (opcional; pensada para visitas)
  form.addTextItem()
    .setTitle("¿Qué propiedad te interesa?")
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
  Logger.log("URL pública (pegar en NEXT_PUBLIC_FORM_CONTACTO): " + form.getPublishedUrl());
}
