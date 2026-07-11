# InmoLex — Landing funcional

Web inmobiliaria premium (Madrid). Next.js, React y Tailwind. Sin backend propio: formularios vía Google Forms y catálogo estático en JSON.

## Arrancar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Páginas

- `/` — Inicio con menú de servicios
- `/propiedades` — Catálogo de inmuebles en cartera
- `/propiedades/[id]` — Ficha de inmueble
- `/servicios` — Listado de servicios
- `/servicios/[slug]` — Landing de servicio con CTA a Google Form
- `/quienes-somos` — Sobre nosotros
- `/contacto` — Información de contacto + CTA a formulario
- `/privacidad`, `/aviso-legal`, `/cookies` — Páginas legales

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena las URLs de Google Forms cuando las tengas.

Solo necesitas **3 formularios** en Google Forms:

```env
NEXT_PUBLIC_CONTACT_WHATSAPP_NUMBER=34600123456

# Google Forms (dejar vacío = botón "próximamente")
NEXT_PUBLIC_FORM_INTERMEDIACION=   # Compra, venta, alquiler, valoración
NEXT_PUBLIC_FORM_FINANCIACION=     # Hipoteca, préstamo, deuda
NEXT_PUBLIC_FORM_CONTACTO=         # Consulta general, inversores, visitas
```

## Checklist V1

Lista completa de tareas pendientes para publicar: [`docs/V1-CHECKLIST.md`](docs/V1-CHECKLIST.md)

## Documentación de formularios

Las especificaciones para crear los 3 Google Forms están en `docs/formularios/`:

- `01-intermediacion.md` — compra, venta, alquiler y valoración
- `02-financiacion.md` — hipoteca, préstamo y deuda
- `03-contacto-inversores.md` — contacto general, inversores y visitas

Cada formulario empieza con una pregunta «¿Qué necesitas?» y el usuario elige la opción correcta.

## Logo

Sustituir el placeholder de cabecera por el logo real en `public/brand/logo.svg` y actualizar `components/ui/BrandLogo.tsx`.

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # producción
npm run start    # servir build
npm run lint     # eslint
```
