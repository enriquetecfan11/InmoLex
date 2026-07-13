# Plan: Admin properties + Supabase Auth

## Stack
- Next.js 16 + Tailwind 4
- Supabase DB + Supabase Auth
- Server Actions
- Sin cambios en Google Forms

## Fases

### Fase 1 — Infraestructura
- Añadir `@supabase/supabase-js` y helpers server/client.
- `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- Cliente Supabase server-side con cookies para auth en Server Actions.

### Fase 2 — Supabase schema
- Crear tabla `properties` con columnas equivalentes a `lib/properties.ts`.
- `id` `text` PK, `created_at` `timestamptz`.
- Arrays/opcionales: `features text[]`, `images text[]`, `energyCertificate jsonb`, `coordinates jsonb`.
- RLS: SELECT público; INSERT/UPDATE/DELETE solo para `authenticated`.

### Fase 3 — Auth admin
- Server Actions: `login(email, password)`, `logout()`, `getSession()`.
- Layout `app/admin/layout.tsx` protege `/admin/*`.
- Ruta `/admin/login` con formulario email/password.
- Crear primer admin manualmente en Supabase.

### Fase 4 — Server Actions CRUD
- `app/actions/property-actions.ts`: `getProperties`, `getProperty`, `createProperty`, `updateProperty`, `deleteProperty`.
- Validaciones: campos requeridos, numéricos >0, IDs únicos.
- `revalidatePath("/propiedades")` tras mutaciones.

### Fase 5 — Rutas admin
- `/admin/dashboard`: tabla responsive con acciones editar/eliminar y botón crear.
- `/admin/propiedades/nueva`: formulario crear.
- `/admin/propiedades/[id]/editar`: formulario editar.
- `/admin/propiedades/[id]/eliminar`: confirmación y borrado.

### Fase 6 — Migración inicial
- Script one-off lee `data/properties.json` e inserta en Supabase.
- Validar registros y tipos.

### Fase 7 — Verificación
- `npm run lint`.
- Probar login/logout y CRUD.
- Confirmar `/admin/*` protegido.

## Reglas
- No exponer `service_role_key` en cliente.
- Mantener tipos de `lib/properties.ts`.
- Si el formulario supera límites de Server Actions, mover a API Route.

## Subida de imágenes
1. En Supabase Dashboard → **Storage** → **Create a new bucket**
   - Name: `property-images`
   - Public bucket: sí
2. En **Storage Policies**, crea una policy para permitir `INSERT` a usuarios autenticados (o público si prefieres subida anónima por ahora).
3. El formulario admin sube archivos a `/api/admin/upload` y guarda las URLs públicas resultantes en el campo `images`.
4. Para producción, valida tipos MIME y límites de tamaño en el API Route.

## Wizard del formulario
- Paso 1: Datos básicos (título, precio, tipo, operación, estado, superficie)
- Paso 2: Ubicación (distrito, ubicación, dirección aproximada, descripción)
- Paso 3: Características (habitaciones, baños, orientación, badge, extras)
- Paso 4: Planos (plano 2D, plano 3D, coordenadas)
- Paso 5: Fotos y multimedia (subida de imágenes, videos)
- Paso 6: Extra (características libres, certificado energético)
- Todos los pasos son opcionales; solo se validan los requeridos al avanzar.
- Indicador de pasos con navegación directa.
- Botones Siguiente/Anterior y submit final solo en el último paso.
