"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerFast, fadeScale, EASE_OUT_EXPO } from "@/lib/motion";

const profiles = [
  {
    id: "startup",
    title: "Food Startups",
    subtitle: "0–12 meses",
    description: "Emprendedores con receta lista que necesitan cumplir NOM-051 y lanzar su primer producto empacado de forma correcta.",
    tags: ["Primer producto", "Etiqueta legal", "Lanzamiento rápido"],
    accent: "#C6F135",
    accentBg: "rgba(198,241,53,0.06)",
    accentBorder: "rgba(198,241,53,0.15)",
    href: "#paquetes",
  },
  {
    id: "artesanal",
    title: "Marcas Artesanales",
    subtitle: "Formalización",
    description: "Negocios que venden informalmente y quieren dar el salto al mercado formal con etiqueta correcta y marca profesional.",
    tags: ["NOM-051", "Formalización", "Etiqueta correcta"],
    accent: "#AFA9EC",
    accentBg: "rgba(175,169,236,0.06)",
    accentBorder: "rgba(175,169,236,0.15)",
    href: "#paquetes",
  },
  {
    id: "funcional",
    title: "Alimentos Funcionales",
    subtitle: "Regulación crítica",
    description: "Suplementos, proteínas y productos con claims de salud donde la normativa es especialmente crítica.",
    tags: ["Suplementos", "Claims de salud", "Sellos NOM"],
    accent: "#85B7EB",
    accentBg: "rgba(133,183,235,0.06)",
    accentBorder: "rgba(133,183,235,0.15)",
    href: "#servicios",
  },
];

const painPoints = [
  { label: "Sin normativa",  desc: "Tu producto no puede venderse legalmente sin cumplir NOM-051",    solution: "→ Tabla NOM-051 en 72h desde $2,300" },
  { label: "Sin identidad",  desc: "Una etiqueta genérica no conecta con tu consumidor ideal",         solution: "→ Etiqueta lista para venta desde $5,000" },
  { label: "Sin presencia",  desc: "Sin digital no existes para quien te busca en línea",              solution: "→ Landing page + redes desde $2,500" },
  { label: "Sin tiempo",     desc: "Coordinar 4 proveedores distintos te cuesta semanas y energía",    solution: "→ Un solo equipo, todo incluido" },
];

export default function ForWhom() {
  return (
    <section id="para-quien" aria-label="¿Para quién es Punto Alfa?"
      className="py-28 relative overflow-hidden border-t border-white/[0.05]">
      {/* Soft bg */}
      <div className="absolute inset-0 bg-[rgba(17,17,17,0.5)]" />
      <motion.div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(175,169,236,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ opacity: [0.4, 1, 0.4], x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
          <motion.div variants={fadeUp}
            className="inline-flex items-center border border-white/10 rounded-full px-4 py-1.5 mb-6 text-[11px] tracking-[2px] uppercase text-muted font-mono bg-white/[0.03]">
            ¿Para quién es esto?
          </motion.div>
          <motion.h2 variants={fadeUp}
            className="text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight mb-4">
            Desde la idea<br />hasta el mercado,<br />contigo.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted text-[16px] max-w-md mx-auto leading-relaxed">
            Te acompañamos desde la formulación, la norma, el diseño y el lanzamiento.
          </motion.p>
        </motion.div>

        {/* Compact tech cards */}
        <motion.div variants={staggerFast} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-60px" }} className="grid md:grid-cols-3 gap-4 mb-16">
          {profiles.map((p, i) => (
            <motion.a key={i} variants={fadeScale} href={p.href}
              className="group cursor-pointer block rounded-xl p-6 border transition-all duration-400"
              style={{ background: p.accentBg, borderColor: p.accentBorder }}
              whileHover={{ y: -3, borderColor: p.accent + "40" }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}>
              {/* Header row */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-[9px] tracking-[2px] uppercase font-mono mb-1.5" style={{ color: p.accent }}>
                    {p.subtitle}
                  </div>
                  <h3 className="text-[15px] font-bold leading-snug group-hover:text-white transition-colors duration-300"
                    style={{ color: p.accent }}>
                    {p.title}
                  </h3>
                </div>
                {/* Small tech icon */}
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${p.accent}25` }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: p.accent }}>
                    <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                    <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                    <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M10.5 8v5M8 10.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-muted text-[12px] leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-[10px] tracking-[1px] uppercase px-2 py-0.5 rounded-sm font-mono"
                    style={{ color: p.accent, background: p.accentBg, border: `1px solid ${p.accent}20` }}>
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-[11px] font-mono transition-colors duration-300" style={{ color: p.accent + "90" }}>
                Ver opciones →
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Pain points */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}>
          <motion.div variants={fadeUp} className="text-center mb-8">
            <span className="inline-flex items-center border border-white/10 rounded-full px-4 py-1.5 text-[11px] tracking-[2px] uppercase text-muted font-mono bg-white/[0.03]">
              El problema que resolvemos
            </span>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {painPoints.map((p, i) => (
              <motion.div key={i} variants={fadeUp}
                className="glass-card glass-card-hover p-6 group cursor-default"
                whileHover={{ y: -3 }} transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}>
                <div className="text-[12px] tracking-[2px] uppercase text-neon font-mono mb-2">0{i + 1} /</div>
                <div className="text-[14px] font-semibold mb-2 group-hover:text-neon transition-colors duration-300">{p.label}</div>
                <p className="text-muted text-[12px] leading-relaxed mb-2">{p.desc}</p>
                <p className="text-neon text-[11px] font-mono mt-1">{p.solution}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mid-page CTA */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#paquetes"
            className="inline-flex items-center gap-2 bg-neon text-bg text-[12px] font-bold tracking-[1px] uppercase px-8 py-3.5 rounded hover:shadow-[0_0_30px_rgba(198,241,53,0.35)] transition-shadow w-full sm:w-auto justify-center">
            Ver precios →
          </a>
          <a href="https://wa.me/528125970372?text=Hola%20Punto%20Alfa%20%F0%9F%91%8B%20No%20s%C3%A9%20bien%20qu%C3%A9%20servicio%20necesito.%20%C2%BFMe%20pueden%20orientar%3F"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border text-muted text-[12px] font-semibold tracking-[1px] uppercase px-8 py-3.5 rounded hover:border-neon/30 hover:text-white transition-colors w-full sm:w-auto justify-center">
            ¿No sabes qué necesitas? →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
