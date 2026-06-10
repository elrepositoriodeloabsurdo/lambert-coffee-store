# Guía de Configuración para Vercel

## Pasos para Deployar en Vercel

### 1. Conectar Repositorio
- Ve a [Vercel Dashboard](https://vercel.com/dashboard)
- Click en "New Project"
- Selecciona este repositorio `lambert-coffee-store`
- Vercel detectará automáticamente que es un proyecto Vite

### 2. Configurar Variables de Entorno
En el paso "Environment Variables", añade:

```
VITE_HERO_VIDEO_URL = (tu URL pública de video)
VITE_TUU_CHECKOUT_URL = (tu link de Tuu, si tienes)
VITE_TRANSBANK_CHECKOUT_URL = (tu endpoint Transbank, si tienes)
```

### 3. Deploy
- Click "Deploy"
- Vercel automáticamente ejecutará:
  - `npm install`
  - `npm run build`
  - Sirvirá los archivos de `dist/`

## Configuración Realizada

✅ **vercel.json** - Configurado con:
- Node.js 18.x
- SPA rewrites (para react-router o navegación client-side)
- Output directory: `dist`

✅ **.nvmrc** - Especifica Node v18.19.0

✅ **vite.config.ts** - Optimizado para:
- Terser minification
- Sin sourcemaps en producción
- Build directory: `dist`

✅ **.env.example** - Limpio y documentado

## Solución de Problemas

### La app no carga rutas
✅ Solucionado con rewrites en vercel.json

### Variables de entorno no funcionan
- Verifica que `VITE_` está en el prefijo
- Redeploy después de cambiar variables

### Build falla
- Verifica `npm run build` localmente: `npm run build`
- Verifica tipos: `npm run lint`

## Testing Local

```bash
npm run build
npm run preview
# Visita http://localhost:4173
```

---
**Creado el**: 2026-06-10
**Status**: Listo para Vercel ✅
