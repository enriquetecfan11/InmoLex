# Integrar los formularios en la web

## Cómo funciona ahora

Los formularios se muestran **dentro de la web**, con el diseño negro y dorado de InmoLex. El usuario no sale a Google Forms: rellena en la misma página y ve un mensaje de confirmación.

Por detrás, el servidor envía los datos a Google Forms para que sigan llegando los emails a `rolinmolex2026@gmail.com`.

```
Usuario en la web (formulario premium)
    → envío en la misma página
    → servidor → Google Forms (invisible)
    → email a rolinmolex2026@gmail.com
```

## Ventajas frente a abrir Google Forms

- No cambia de página ni pierde el contexto
- Puede volver atrás con normalidad
- Mismo look & feel que el resto del sitio
- Sigue usando Google Forms como backend (sin servidor propio de emails)

## Checklist — verlo en local

### 1. Variables de entorno

Asegúrate de que `.env.local` (o `.env`) tiene las 3 URLs:

```env
NEXT_PUBLIC_FORM_INTERMEDIACION=https://docs.google.com/forms/d/e/1FAIpQLSfCWyrHqwo4kEpniassynuI4x2ukqlcZvi1RKfzGDmaJzsOog/viewform
NEXT_PUBLIC_FORM_FINANCIACION=https://docs.google.com/forms/d/e/1FAIpQLScYeUxQSe7bLt4lxXC5v02RXW1g7tf7enk9QBLdvS5X0XGtUA/viewform
NEXT_PUBLIC_FORM_CONTACTO=https://docs.google.com/forms/d/e/1FAIpQLSew5D1fYea2pjEO2_EVYQo_8marh_UdqneoYpd8fOrRnhHfzg/viewform
```

Verificar:

```bash
node scripts/check-v1-config.mjs
```

### 2. Reiniciar el servidor

Next.js solo lee `.env.local` al arrancar:

```bash
# Ctrl+C para parar, luego:
npm run dev
```

### 3. Probar en el navegador

| Ruta | Qué probar |
|------|------------|
| `/` | Menú de servicios → cada landing |
| `/servicios/comprar-vender` | Botón «Quiero comprar» → formulario con opción marcada |
| `/servicios/financiacion` | Botón «Pedir hipoteca» |
| `/servicios/inversores` | Botón «Soy inversor» |
| `/contacto` | «Enviar consulta» |
| `/propiedades/[slug]` | «Agendar visita» (propiedad pre-rellenada) |

Cada botón debe abrir el formulario integrado en la misma página (no una pestaña de Google).

### 4. Google Forms — notificaciones

En cada formulario (pestaña **Respuestas**):

1. Activar **Recibir notificaciones por correo electrónico**
2. Enviar una prueba desde la web
3. Confirmar que llega el email a `rolinmolex2026@gmail.com`

### 5. (Opcional) Personalizar Google Forms

Ya no es imprescindible para la UX (el usuario no ve Google Forms), pero las respuestas siguen guardándose ahí. Puedes personalizar el tema en el editor si quieres que las notificaciones por email se vean más de marca.

## Checklist — producción

1. En Vercel (o tu hosting) → **Environment Variables**
2. Añadir las mismas 3 variables `NEXT_PUBLIC_FORM_*`
3. Redeploy
4. Probar los mismos botones en la URL de producción

## Prefill — qué opción se envía

| Acción en la web | Formulario | Opción enviada |
|-----------------|------------|------------------------|
| Quiero comprar | Intermediación | Comprar una propiedad |
| Quiero vender | Intermediación | Vender una propiedad |
| Busco alquiler | Intermediación | Buscar un alquiler |
| Alquilar mi piso | Intermediación | Poner en alquiler |
| Pedir valoración | Intermediación | Valoración gratuita |
| Pedir hipoteca | Financiación | Hipoteca |
| Pedir préstamo | Financiación | Préstamo personal |
| Ayuda con deuda | Financiación | Problemas con el pago de la vivienda |
| Enviar consulta | Contacto | Tengo una consulta |
| Soy inversor | Contacto | Soy inversor / busco subastas |
| Agendar visita | Contacto | Quiero visitar una propiedad + nombre propiedad |

La lógica está en `lib/google-form-fields.ts`, `lib/google-forms-submit.ts` y `components/forms/InmoLexLeadForm.tsx`.

## Si recreas un formulario en Google

Los IDs internos (`entry.1078224992`, etc.) cambian si borras y vuelves a crear el formulario. En ese caso:

1. Abre el formulario público en el navegador
2. Inspecciona el HTML o usa «Obtener enlace pre-rellenado» en Google Forms
3. Actualiza los IDs en `lib/google-form-fields.ts`

## Archivos relevantes

| Archivo | Rol |
|---------|-----|
| `.env.local` | URLs de los 3 formularios |
| `lib/google-forms.ts` | Lee URLs y construye enlaces |
| `lib/google-form-fields.ts` | IDs de campos para envío a Google |
| `lib/google-forms-submit.ts` | Envío server-side a Google Forms |
| `components/forms/InmoLexLeadForm.tsx` | Formulario integrado en la web |
| `lib/service-pages.ts` | Qué opción corresponde a cada servicio |
