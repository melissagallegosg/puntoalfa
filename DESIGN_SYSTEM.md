# Punto Alfa — Design System

Referencia para mantener consistencia visual al crear nuevos componentes o secciones.

---

## Principios

1. **Oscuridad pura + neon único** — fondo casi negro, un solo acento vibrante: `#C6F135`
2. **Blur como material** — todas las entradas animan `blur(6-8px) → blur(0px)` para sensación de foco
3. **Stagger siempre** — listas y grids usan `staggerChildren` para dar ritmo natural
4. **Glass everywhere** — cards base con `backdrop-filter: blur(20px)` y borders blancos sutiles
5. **Neon glow escalado** — `glow-sm` (hover) · `glow-md` (cards) · `glow-lg` (hero)
6. **Magnetic UI** — botones y nav con mouse-follow spring physics
7. **Scroll-aware** — componentes responden al scroll (navbar blur, parallax, FloatingWA)
8. **Sin imágenes decorativas** — el arte es SVG animado con Framer Motion (portal, arcos, esferas)

---

## Tokens de Color

| Token Tailwind | Hex | CSS var | Uso |
|---|---|---|---|
| `neon` | `#C6F135` | `--neon` | Acento primario, CTAs, glow |
| `neon-dim` | `#8fb320` | `--neon-dim` | Hover oscuro, scrollbar |
| `bg` | `#0A0A0A` | `--bg` | Fondo principal |
| `bg2` | `#111111` | `--bg2` | Fondo de tarjetas |
| `bg3` | `#161616` | `--bg3` | Fondo terciario |
| `border` | `#1e1e1e` | `--border` | Separadores |
| `muted` | `#888888` | `--muted` | Texto secundario |
| `lavender` | `#AFA9EC` | `--lavender` | Acento Creativo |
| `sky-blue` | `#85B7EB` | `--sky` | Acento Digital |

**Opacidades neon frecuentes:**
- `rgba(198,241,53, 0.04)` — bg glass hover sutil
- `rgba(198,241,53, 0.07)` — dot pattern
- `rgba(198,241,53, 0.12)` — glow sm
- `rgba(198,241,53, 0.18)` — border hover
- `rgba(198,241,53, 0.25)` — border neon visible
- `rgba(198,241,53, 0.40-0.55)` — glow alto, text glow

**Glow variables:**
```css
--glow-sm: 0 0 20px rgba(198,241,53,0.08)
--glow-md: 0 0 40px rgba(198,241,53,0.12), 0 0 80px rgba(198,241,53,0.04)
--glow-lg: 0 0 80px rgba(198,241,53,0.18), 0 0 160px rgba(198,241,53,0.06)
```

---

## Tipografía

**Familias:**
- `font-sans` → Space Grotesk (body, headings)
- `font-mono` → Space Mono (números, badges, código, tags)

**Escala de tamaños:**

| Uso | Tamaño | Notas |
|---|---|---|
| H1 principal | `clamp(48px, 8.5vw, 96px)` | `leading-[0.92] tracking-[-3px]` |
| H2 sección | `clamp(32px, 5vw, 56px)` | `leading-tight tracking-tight` |
| H2 CTA | `clamp(36px, 6vw, 64px)` | |
| Body principal | `15px - 17px` | `leading-relaxed` |
| Body secundario | `13px - 14px` | `text-muted` |
| Helper/small | `10px - 12px` | `text-muted` |
| Botones / nav | `11px` | `tracking-[1px] uppercase font-bold` |
| Badges | `9px - 10px` | `tracking-[2px-3px] uppercase font-mono` |
| Nano | `8px - 9px` | navbar subline, referencias |

**Letter spacing:**
- `tracking-[-3px]` — headings principales
- `tracking-tight` — headings secundarios
- `tracking-[1px]` — botones
- `tracking-[1.5px]` — nav links
- `tracking-[2px-3px]` — badges mono
- `tracking-[3px]` — eyebrow labels (`// Sección`)

---

## Espaciado

**Secciones:**
```tsx
<section className="py-28 max-w-7xl mx-auto px-6">
```

**Padding de cards:**
- Pequeño: `p-4` — items de lista
- Mediano: `p-6` — cards compactas
- Grande: `p-7` — pricing cards
- Extra: `p-8` a `p-10` — panels principales

**Gap en grids:**
- Tight: `gap-2` a `gap-3` — listas inline
- Normal: `gap-4` — cards grid
- Amplio: `gap-6` a `gap-10` — secciones

**Max-width por contexto:**
- Contenedor principal: `max-w-7xl` (80rem)
- Hero: `max-w-5xl`
- CTA: `max-w-4xl`
- Párrafos: `max-w-[480px]` — `max-w-md`

---

## Bordes

| Uso | Clase |
|---|---|
| Badges pequeños | `rounded-sm` |
| Inputs, botones | `rounded` |
| Cards medianas | `rounded-lg` |
| Cards principales | `rounded-xl` |
| Pills / avatars | `rounded-full` |

**Border colors:**
- Default: `border-border` → `#1e1e1e`
- Subtle glass: `border-white/[0.06]` — `border-white/[0.08]`
- Neon inactive: `border-neon/[0.12]` — `border-neon/20`
- Neon active: `border-neon/25` — `border-neon/40`

---

## Clases CSS Custom

### Glassmorphism
```tsx
className="glass"           // card base con backdrop-blur
className="glass glass-hover"  // + transición hover neon
```

### Patrones de fondo
```tsx
className="grid-pattern"   // cuadrícula sutil 72x72px
className="dot-pattern"    // puntos neon 28x28px
className="orb"            // blob decorativo con blur(100px)
className="grain"          // ruido de grano en ::after (en body)
```

### Glow
```tsx
className="neon-glow"      // box-shadow glow-md
className="neon-glow-lg"   // box-shadow glow-lg
className="neon-text-glow" // text-shadow neon
```

### Animaciones CSS
```tsx
className="pulse-dot"      // punto pulsante animado
className="marquee-track"  // texto corriente infinita
className="btn-shimmer"    // gradiente shimmer en botón
className="card-neon-top"  // border-top neon en hover
className="cursor-blink"   // cursor _ parpadeante
className="reveal-blur"    // entrance animation CSS puro
```

---

## Motion — Variantes

Importar siempre desde `@/lib/motion`:

```typescript
import { fadeUp, fadeScale, staggerContainer, staggerFast, EASE_OUT_EXPO } from "@/lib/motion"
```

### Variantes de entrada

| Variante | Cuándo usar |
|---|---|
| `fadeUp` | Textos, párrafos, subtítulos |
| `fadeScale` | Cards, imágenes, elementos 2D |
| `slideInLeft` / `slideInRight` | Elementos que entran desde los lados |
| `scaleIn` | Íconos, badges, elementos pequeños |
| `clipReveal` | Líneas, barras horizontales |
| `lineGrow` | Dividers, underlines |

### Stagger containers

| Variante | `staggerChildren` | Cuándo |
|---|---|---|
| `staggerFast` | 0.07s | Listas cortas, items inline |
| `staggerContainer` | 0.12s | Grids de cards, secciones |
| `staggerSlow` | 0.18s | Elementos pesados, hero |
| `staggerWords` | 0.065s | Word-by-word reveal |

### Patrón estándar de sección

```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
  <motion.div variants={fadeUp}>Eyebrow</motion.div>
  <motion.h2 variants={fadeUp}>Heading</motion.h2>
  <motion.p variants={fadeUp}>Descripción</motion.p>
</motion.div>
```

### Patrón de card con hover

```tsx
<motion.div
  variants={fadeScale}
  className="glass glass-hover rounded-xl p-8 group"
  whileHover={{ y: -4 }}
  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
>
```

### Easings

```typescript
EASE_OUT_EXPO  = [0.16, 1, 0.3, 1]   // principal — slow, confident
EASE_IN_OUT    = [0.4, 0, 0.2, 1]    // transiciones bidireccionales
EASE_OUT_QUART = [0.25, 1, 0.5, 1]   // alternativa más suave
```

### Duraciones estándar

| Duración | Uso |
|---|---|
| `0.25s` | Hover states, micro-transiciones |
| `0.4s` | Tab switch, card hover |
| `0.6s` | Word reveal, pequeñas entradas |
| `0.8s - 0.95s` | Blur/fade reveals principales |
| `1.0s - 1.1s` | Line grow |
| `2s - 3s` | Pulsos, breathing loops |
| `4s - 6s` | Ambient glows, orbs |
| `36s - 38s` | Marquee |

---

## Componentes Reutilizables

### Botón Primario (CTA)

```tsx
<motion.a
  href={WHATSAPP_URL}
  className="bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-5 py-2.5 rounded"
  whileHover={{ boxShadow: "0 0 28px rgba(198,241,53,0.4)", scale: 1.04 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.25 }}
>
  CTA →
</motion.a>
```

### Botón Secundario (Ghost)

```tsx
<a className="border border-white/[0.08] text-muted text-[11px] font-bold tracking-[1px] uppercase px-5 py-2.5 rounded hover:border-neon/40 hover:text-neon hover:bg-neon/[0.04] backdrop-blur-sm transition-all duration-300">
  Acción
</a>
```

### Badge / Eyebrow Label

```tsx
// Con borde neon (hero)
<span className="text-[10px] tracking-[3px] uppercase text-neon font-mono border border-neon/25 px-4 py-1.5 rounded-sm backdrop-blur-sm bg-neon/[0.04]">
  Texto
</span>

// Con borde sutil (secciones)
<span className="border border-white/10 rounded-full px-4 py-1.5 text-[11px] tracking-[2px] uppercase text-muted font-mono bg-white/[0.03]">
  Texto
</span>

// Eyebrow de sección (sin borde)
<div className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-4">
  // Label de sección
</div>
```

### Glass Card

```tsx
<motion.div
  variants={fadeScale}
  className="glass glass-hover rounded-xl p-8 group"
  whileHover={{ y: -4 }}
  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
>
  <div className="text-[9px] tracking-[2px] uppercase text-neon font-mono mb-1">Subtag</div>
  <h3 className="text-[18px] font-bold mb-3 group-hover:text-neon transition-colors duration-400">Título</h3>
  <p className="text-muted text-[13px] leading-relaxed">Descripción</p>
</motion.div>
```

### Tag Chip

```tsx
<span className="text-[10px] tracking-[1px] uppercase px-2.5 py-1 rounded-sm bg-neon/[0.07] text-neon border border-neon/15">
  Tag
</span>
```

### Lista con flechas neon

```tsx
<ul>
  {items.map((item, i) => (
    <li key={i} className="flex items-start gap-3 text-[13px] text-[#ccc]">
      <span className="text-neon font-mono mt-0.5 flex-shrink-0">→</span>
      {item}
    </li>
  ))}
</ul>
```

### Check list con círculo

```tsx
<div className="flex gap-3">
  <div className="w-5 h-5 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center flex-shrink-0 mt-0.5">
    <span className="text-neon text-[8px]">✓</span>
  </div>
  <div>
    <div className="text-[12px] font-semibold mb-0.5">Título</div>
    <div className="text-muted text-[11px] leading-relaxed">Descripción</div>
  </div>
</div>
```

### Número numerado (proceso)

```tsx
<div className="w-7 h-7 rounded-full bg-neon text-bg text-[11px] font-bold flex items-center justify-center mb-3">
  1
</div>
```

### Divider con número

```tsx
<span className="text-neon font-mono text-[10px] mt-0.5 flex-shrink-0">01 /</span>
```

---

## Layout de Sección (Patrón estándar)

```tsx
<section id="anchor" className="py-28 max-w-7xl mx-auto px-6">
  {/* Header */}
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    className="mb-16"
  >
    <motion.div variants={fadeUp} className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-4">
      // Eyebrow de sección
    </motion.div>
    <motion.h2 variants={fadeUp} className="text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight mb-4">
      Heading de sección
    </motion.h2>
    <motion.p variants={fadeUp} className="text-muted text-[15px] leading-relaxed max-w-md">
      Descripción breve de la sección.
    </motion.p>
  </motion.div>

  {/* Contenido */}
  <motion.div
    variants={staggerFast}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    className="grid md:grid-cols-3 gap-4"
  >
    {/* Cards */}
  </motion.div>
</section>
```

---

## Patrones de Fondo Ambiental

```tsx
{/* Cuadrícula */}
<div className="absolute inset-0 grid-pattern opacity-20" />

{/* Orb de color */}
<motion.div
  className="absolute pointer-events-none"
  style={{
    width: 500, height: 500,
    top: "0%", right: "-10%",
    background: "radial-gradient(circle, rgba(175,169,236,0.07) 0%, transparent 70%)",
    filter: "blur(60px)",
  }}
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
/>

{/* Dot pattern */}
<div className="absolute inset-0 dot-pattern opacity-40" />
```

---

## Checklist para nuevos componentes

Antes de crear un componente nuevo, verificar:

- [ ] Usa tokens de color de Tailwind (`neon`, `bg`, `muted`, etc.) — no hexes hardcodeados
- [ ] Tipografía: Space Grotesk para body, Space Mono para números/badges
- [ ] Bordes: `rounded-xl` para cards, `border-border` o `border-white/[0.06]`
- [ ] Animación de entrada: `whileInView` + variante de `lib/motion.ts`
- [ ] Cards: `.glass .glass-hover` como base
- [ ] CTA primario: `bg-neon text-bg`, secundario: ghost con `border-white/[0.08]`
- [ ] Hover en cards: `whileHover={{ y: -4 }}` con `EASE_OUT_EXPO`
- [ ] Botones con `whileTap={{ scale: 0.97 }}`
- [ ] Eyebrow label con `// ` prefix en font-mono neon
- [ ] Sección con `id` para anchor links de nav
