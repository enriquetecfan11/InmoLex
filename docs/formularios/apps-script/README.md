# Google Apps Script — crear los 3 formularios

Scripts listos para copiar y pegar en [Google Apps Script](https://script.google.com). Cada uno crea un Google Form con la estructura definida en los `.md` de esta carpeta.

## Archivos

| Script | Función a ejecutar | Especificación | Variable `.env.local` |
|--------|-------------------|----------------|------------------------|
| [01-intermediacion.gs](01-intermediacion.gs) | `createIntermediacionForm` | [01-intermediacion.md](../01-intermediacion.md) | `NEXT_PUBLIC_FORM_INTERMEDIACION` |
| [02-financiacion.gs](02-financiacion.gs) | `createFinanciacionForm` | [02-financiacion.md](../02-financiacion.md) | `NEXT_PUBLIC_FORM_FINANCIACION` |
| [03-contacto-inversores.gs](03-contacto-inversores.gs) | `createContactoForm` | [03-contacto-inversores.md](../03-contacto-inversores.md) | `NEXT_PUBLIC_FORM_CONTACTO` |

## Pasos (repetir una vez por formulario)

1. Abre https://script.google.com con la cuenta de Google de la clienta.
2. **Nuevo proyecto**.
3. Borra el código por defecto y pega **todo** el contenido del `.gs` correspondiente.
4. Guarda el proyecto (nombre sugerido: `InmoLex — Intermediación`, etc.).
5. En el desplegable de funciones, elige la función indicada en la tabla (p. ej. `createIntermediacionForm`).
6. Pulsa **Ejecutar**. La primera vez Google pedirá autorizar el acceso a Forms.
7. **Ver → Registros**: copia la URL que termina en `/viewform` (es la que va en `.env.local`).
8. Abre el formulario desde el enlace de edición en los registros.
9. Pestaña **Respuestas** → activar **Recibir notificaciones por correo electrónico** → `rolinmolex2026@gmail.com`.
10. (Opcional) Vincular respuestas a una hoja de cálculo para histórico.

## Después de crear los 3

Pega las URLs en `.env.local`:

```env
NEXT_PUBLIC_FORM_INTERMEDIACION=https://docs.google.com/forms/d/e/.../viewform
NEXT_PUBLIC_FORM_FINANCIACION=https://docs.google.com/forms/d/e/.../viewform
NEXT_PUBLIC_FORM_CONTACTO=https://docs.google.com/forms/d/e/.../viewform
```

Envía una respuesta de prueba en cada formulario y confirma que llega el email.

## Notas

- **Un script = un proyecto.** No mezcles los tres en el mismo proyecto Apps Script (cada uno es independiente a propósito).
- Si vuelves a ejecutar la misma función, se crea **otro** formulario nuevo. No hace falta re-ejecutar salvo que quieras duplicar.
- Los scripts solo crean la estructura; el diseño visual (tema, imagen) se ajusta manualmente en el editor de Google Forms si lo deseas.
