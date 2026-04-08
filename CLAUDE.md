# Punto Alfa — CLAUDE.md

Landing page para agencia técnica de lanzamiento de productos alimenticios en México (NOM-051, diseño de etiqueta, estrategia digital).

## Stack

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v3 + CSS custom en `globals.css`
- **Animaciones**: Framer Motion v11
- **Íconos**: Lucide React
- **Fuentes**: Space Grotesk + Space Mono via `next/font/google` (self-hosted)

## Comandos

```bash
npm run dev    # desarrollo en localhost:3000
npm run build  # build de producción
npm run lint   # ESLint
```

## Estructura

```
app/
  layout.tsx      # metadatos SEO globales, fuentes, html root
  page.tsx        # página principal (Server Component) + JSON-LD
  globals.css     # variables CSS, clases utilitarias custom, keyframes
  robots.ts       # genera /robots.txt via Next.js MetadataRoute
  sitemap.ts      # genera /sitemap.xml via Next.js MetadataRoute
components/
  Navbar.tsx      # nav fija, blur on scroll, magnetic links, mobile menu
  Hero.tsx        # headline, NeonPortal SVG, stats bar, parallax scroll
  Marquee.tsx     # ticker de texto animado
  Services.tsx    # tabs Lab/Creativo/Digital con panel expandible NOM-051
  ForWhom.tsx     # perfiles de cliente + pain points
  Process.tsx     # pasos del proceso
  Pricing.tsx     # tabs con tarjetas de precios
  CTABand.tsx     # banda de llamada a acción
  Footer.tsx      # columnas: servicios, paquetes, contacto
  FloatingWA.tsx  # botón flotante de WhatsApp
lib/
  motion.ts       # variantes de Framer Motion + constantes (WHATSAPP_URL, EASE_OUT_EXPO)
public/
  images/logo.jpg # logo de la marca
```

## Design System

Ver **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** para la referencia completa — tokens de color, tipografía, motion, clases CSS, componentes reutilizables y checklist para nuevos componentes.

**Resumen rápido de tokens clave:**
- Color primario: `neon` → `#C6F135`
- Fondos: `bg` `#0A0A0A` · `bg2` `#111111` · `bg3` `#161616`
- Texto secundario: `muted` `#888888`
- Acentos: `lavender` `#AFA9EC` (Creativo) · `sky-blue` `#85B7EB` (Digital)
- Clases: `.glass` `.glass-hover` `.grid-pattern` `.neon-text-glow` `.grain`

## Convenciones

- Todos los componentes con interactividad usan `"use client"` al inicio
- `page.tsx` es Server Component (sin `"use client"`) — permite JSON-LD renderizado en servidor
- Animaciones de entrada: `fadeUp`, `staggerContainer`, `fadeScale` desde `lib/motion.ts`
- El easing principal es `EASE_OUT_EXPO = [0.16, 1, 0.3, 1]`
- Links a WhatsApp siempre desde `WHATSAPP_URL` en `lib/motion.ts`

## Pendientes antes de producción

- [ ] Reemplazar `WHATSAPP_URL` placeholder (`521XXXXXXXXXX`) con número real en `lib/motion.ts:102`
- [ ] Crear `/public/og-image.png` (1200×630px) para Open Graph / Twitter Card
- [ ] Crear `/app/favicon.ico` y `/app/icon.png` (512×512) para íconos de app
- [ ] Actualizar `BASE_URL` en `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` con dominio real
- [ ] Actualizar teléfono en el JSON-LD de `app/page.tsx`

## SEO implementado

- Metadata completa: OG, Twitter Card, canonical, metadataBase, robots, keywords
- JSON-LD `ProfessionalService` con precios y área de servicio
- `robots.ts` y `sitemap.ts` via Next.js MetadataRoute
- Fuentes self-hosted via `next/font/google` (elimina petición render-blocking a Google Fonts)
- Imagen del logo con `priority` y `sizes` correctos en Navbar
- `role="tablist"` + `aria-selected` en tabs de servicios
- `<h3>` semánticos en Footer (antes eran `<div>`)
- `id` y `aria-label` en sección ForWhom
