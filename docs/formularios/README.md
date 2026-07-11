# Formularios InmoLex — versión simple

**Filosofía:** web de botones → formulario corto → le llega un email a `rolinmolex2026@gmail.com`.

Solo **3 Google Forms**. En cada uno, el usuario pulsa botones (opción múltiple), escribe lo mínimo y envía.

## Crear los formularios con Apps Script

Los scripts listos para copiar y pegar están en **[apps-script/](apps-script/)**. Cada archivo crea un formulario con la estructura del `.md` correspondiente. Ver [apps-script/README.md](apps-script/README.md) para los pasos.

## Integrar en la web

Guía paso a paso para ver los formularios funcionando en local y producción: **[INTEGRACION.md](INTEGRACION.md)**.

## Configurar notificaciones por email

En cada Google Form:

1. Abrir el formulario → pestaña **Respuestas**
2. Activar **Recibir notificaciones por correo electrónico** para `rolinmolex2026@gmail.com`
3. (Opcional) Vincular a una hoja de cálculo para tener histórico

## Los 3 formularios

| # | Especificación | Script Apps Script | Botones de la 1ª pregunta |
|---|----------------|-------------------|---------------------------|
| 1 | [01-intermediacion.md](01-intermediacion.md) | [01-intermediacion.gs](apps-script/01-intermediacion.gs) | Comprar · Vender · Buscar alquiler · Poner alquiler · Valoración |
| 2 | [02-financiacion.md](02-financiacion.md) | [02-financiacion.gs](apps-script/02-financiacion.gs) | Hipoteca · Préstamo · Problemas con el pago |
| 3 | [03-contacto-inversores.md](03-contacto-inversores.md) | [03-contacto-inversores.gs](apps-script/03-contacto-inversores.gs) | Consulta general · Inversores · Visitar propiedad |

## Reglas de diseño en Google Forms

- **Máximo 6-7 preguntas** por formulario (incluido contacto y privacidad)
- Primera pregunta siempre botones grandes (opción múltiple)
- Todo lo demás opcional salvo: nombre, teléfono, email, privacidad
- Un solo campo de texto libre: «Cuéntanos qué necesitas»
- El resto lo saca ella por teléfono/WhatsApp

## Variables en `.env.local`

```env
NEXT_PUBLIC_FORM_INTERMEDIACION=https://docs.google.com/forms/d/e/.../viewform
NEXT_PUBLIC_FORM_FINANCIACION=https://docs.google.com/forms/d/e/.../viewform
NEXT_PUBLIC_FORM_CONTACTO=https://docs.google.com/forms/d/e/.../viewform
```
