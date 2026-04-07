# Punto Alfa — Landing Page

Stack: **Next.js 14** · **Framer Motion** · **Tailwind CSS** · **TypeScript**

## Configuración antes de subir

### 1. Número de WhatsApp
Edita `lib/motion.ts` y reemplaza `521XXXXXXXXXX` con tu número real:
```
https://wa.me/521XXXXXXXXXX?text=...
```
Por ejemplo, si tu número es 8112345678:
```
https://wa.me/528112345678?text=Hola%20Punto%20Alfa%2C%20me%20interesa%20cotizar%20un%20servicio
```

### 2. Logo
El logo está en `public/images/logo.jpg`. Si quieres usar la versión sin fondo (PNG transparente), reemplaza el archivo y actualiza la extensión en:
- `components/Navbar.tsx`
- `components/Footer.tsx`

---

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Deploy en Vercel

### Opción A — CLI
```bash
npm install -g vercel
vercel
```

### Opción B — GitHub
1. Sube el proyecto a un repositorio GitHub
2. Ve a [vercel.com](https://vercel.com) → New Project
3. Importa el repositorio
4. Vercel detecta Next.js automáticamente
5. Haz clic en **Deploy**

No se requieren variables de entorno.

---

## Estructura del proyecto

```
punto-alfa/
├── app/
│   ├── globals.css       # Paleta, efectos grain, marquee, glow
│   ├── layout.tsx        # Fonts, metadata SEO
│   └── page.tsx          # Página principal
├── components/
│   ├── Navbar.tsx        # Nav con scroll behavior + mobile
│   ├── Hero.tsx          # Hero con parallax y stats
│   ├── Marquee.tsx       # Ticker animado
│   ├── Services.tsx      # Los 3 brazos con tabs
│   ├── ForWhom.tsx       # Perfiles de cliente
│   ├── Process.tsx       # Proceso 01→04
│   ├── Pricing.tsx       # Paquetes con tabs
│   ├── CTABand.tsx       # CTA final + redes
│   ├── Footer.tsx        # Footer completo
│   └── FloatingWA.tsx    # Botón WhatsApp flotante
├── lib/
│   └── motion.ts         # Variants Framer Motion + URLs
└── public/
    └── images/
        └── logo.jpg
```

---

## Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Número WhatsApp | `lib/motion.ts` → `WHATSAPP_URL` |
| Redes sociales | `lib/motion.ts` → `INSTAGRAM_URL`, `FACEBOOK_URL` |
| Precios | `components/Pricing.tsx` |
| Servicios por brazo | `components/Services.tsx` |
| Paleta de colores | `app/globals.css` + `tailwind.config.ts` |
| SEO / metadata | `app/layout.tsx` |
