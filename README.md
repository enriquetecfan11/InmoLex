# 

Web inmobiliaria premium (Madrid). Next.js, React y Tailwind.

## Arrancar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Páginas

- `/` — Inicio
- `/propiedades` — Listado y fichas de inmuebles
- `/servicios` — Servicios
- `/quienes-somos` — Sobre nosotros
- `/contacto` — Formulario de contacto

## Variables de entorno (contacto)

Copia `.env.example` a `.env.local` y rellena:

```env
GMAIL_USER=tu@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
CONTACT_NOTIFICATION_EMAIL=tu@gmail.com
NEXT_PUBLIC_CONTACT_WHATSAPP_NUMBER=34600123456
```

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # producción
npm run start    # servir build
```
