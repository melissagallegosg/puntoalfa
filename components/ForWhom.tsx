"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, staggerFast, fadeScale, EASE_OUT_EXPO } from "@/lib/motion";

const profiles = [
  { icon: "🚀", title: "Food Startups", subtitle: "0–12 meses",
    description: "Emprendedores que ya tienen una receta y quieren lanzar su primer producto empacado de forma correcta y rápida.",
    tags: ["Primer producto", "Etiqueta legal", "Lanzamiento rápido"] },
  { icon: "🏺", title: "Marcas Artesanales", subtitle: "Formalización",
    description: "Negocios que venden de manera informal y quieren dar el salto al mercado formal con etiqueta correcta y marca profesional.",
    tags: ["NOM-051", "Formalización", "Etiqueta correcta"] },
  { icon: "⚗️", title: "Alimentos Funcionales", subtitle: "Regulación crítica",
    description: "Suplementos, proteínas y productos con claims de salud donde la normativa es especialmente crítica.",
    tags: ["Suplementos", "Claims de salud", "Sellos NOM"] },
];

const painPoints = [
  { label: "Sin normativa", desc: "Tu producto no puede venderse legalmente sin cumplir NOM-051" },
  { label: "Sin identidad", desc: "Una etiqueta genérica no conecta con tu consumidor ideal" },
  { label: "Sin presencia", desc: "Sin digital no existes para quien te busca en línea" },
  { label: "Sin tiempo",    desc: "Coordinar 4 proveedores distintos te cuesta semanas y energía" },
];

/* ── Reflect-style arc glow (like the "brain superpowers" section) ── */
function ArcGlow() {
  return (
    <div className="relative flex justify-center" style={{ height: 180, marginBottom: -20 }}>
      <svg viewBox="0 0 600 180" width="100%" style={{ maxWidth: 700, position: "absolute", bottom: 0 }}>
        {[260, 200, 148, 104, 68].map((r, i) => (
          <motion.path
            key={r}
            d={`M ${300 - r} 180 A ${r} ${r * 0.55} 0 0 1 ${300 + r} 180`}
            fill="none"
            stroke={`rgba(175,169,236,${0.06 + i * 0.05})`}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ pathLength: { duration: 1.2, ease: EASE_OUT_EXPO, delay: i * 0.1 }, opacity: { duration: 0.4, delay: i * 0.1 } }}
          />
        ))}
        {/* Center dot */}
        <motion.circle cx="300" cy="180" r="5" fill="#AFA9EC" opacity="0.7"
          animate={{ r: [5, 7, 5], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16"
        style={{ background: "radial-gradient(ellipse, rgba(175,169,236,0.15) 0%, transparent 70%)", filter: "blur(20px)" }} />
    </div>
  );
}

export default function ForWhom() {
  return (
    <section className="py-28 relative overflow-hidden border-y border-white/[0.05]">
      <div className="absolute inset-0 bg-[rgba(17,17,17,0.6)] backdrop-blur-sm" />
      <motion.div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(175,169,236,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Reflect pattern: visual on top, centered text, then grid */}
        <div className="text-center mb-4">
          <ArcGlow />
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
          <motion.div variants={fadeUp}
            className="inline-flex items-center border border-white/10 rounded-full px-4 py-1.5 mb-6 text-[11px] tracking-[2px] uppercase text-muted font-mono bg-white/[0.03]">
            ¿Para quién es esto?
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight mb-4">
            Desde la idea<br />hasta el mercado,<br />contigo.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted text-[15px] max-w-md mx-auto leading-relaxed">
            Te acompañamos desde la formulación, la norma, el diseño y el lanzamiento.
          </motion.p>
        </motion.div>

        {/* Profile cards */}
        <motion.div variants={staggerFast} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-60px" }} className="grid md:grid-cols-3 gap-4 mb-16">
          {profiles.map((p, i) => (
            <motion.div key={i} variants={fadeScale}
              className="glass glass-hover rounded-xl p-8 group cursor-default"
              whileHover={{ y: -4 }} transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}>
              <motion.div className="text-3xl mb-4" whileHover={{ scale: 1.2, rotate: 5 }} transition={{ duration: 0.3 }}>
                {p.icon}
              </motion.div>
              <div className="text-[9px] tracking-[2px] uppercase text-neon font-mono mb-1">{p.subtitle}</div>
              <h3 className="text-[18px] font-bold mb-3 group-hover:text-neon transition-colors duration-400">{p.title}</h3>
              <p className="text-muted text-[13px] leading-relaxed mb-5">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-[10px] tracking-[1px] uppercase px-2.5 py-1 rounded-sm bg-neon/[0.07] text-neon border border-neon/15">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pain points — Reflect feature grid style */}
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
                className="glass glass-hover rounded-xl p-6 group cursor-default"
                whileHover={{ y: -3 }} transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}>
                <div className="text-[10px] tracking-[2px] uppercase text-neon font-mono mb-2">0{i + 1} /</div>
                <div className="text-[14px] font-semibold mb-2 group-hover:text-neon transition-colors duration-400">{p.label}</div>
                <p className="text-muted text-[12px] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
