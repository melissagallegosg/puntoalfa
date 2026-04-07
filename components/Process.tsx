"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, fadeScale, staggerContainer, EASE_OUT_EXPO } from "@/lib/motion";

const steps = [
  {
    num: "01",
    title: "Formulación y norma",
    desc: "Calculamos tu tabla nutrimental teórica y determinamos los sellos NOM-051 con base en tu receta exacta. En 2–3 días.",
    tag: "Alfa Lab", tagColor: "#C6F135", tagBg: "rgba(198,241,53,0.07)",
  },
  {
    num: "02",
    title: "Diseño e identidad",
    desc: "Con los datos listos, diseñamos la etiqueta integrando tabla, sellos y toda la información comercial requerida.",
    tag: "Alfa Creativo", tagColor: "#AFA9EC", tagBg: "rgba(175,169,236,0.07)",
  },
  {
    num: "03",
    title: "Validación final",
    desc: "Revisamos medidas, proporciones y cumplimiento completo antes de enviar a imprenta. Cero errores, cero sorpresas.",
    tag: "Alfa Lab", tagColor: "#C6F135", tagBg: "rgba(198,241,53,0.07)",
  },
  {
    num: "04",
    title: "Lanzamiento digital",
    desc: "Landing page, redes y automatizaciones activas. Tu marca lista para vender desde el primer día en el mercado.",
    tag: "Alfa Digital", tagColor: "#85B7EB", tagBg: "rgba(133,183,235,0.07)",
  },
];

/* ── Reflect-style cone / spike glow shape ── */
function ConeGlow({ color = "#C6F135" }: { color?: string }) {
  return (
    <div className="relative flex justify-center" style={{ height: 220, marginBottom: -30 }}>
      <svg viewBox="0 0 400 220" width="100%" style={{ maxWidth: 500, position: "absolute", bottom: 0 }}>
        {/* Cone */}
        <motion.path
          d="M 200 10 L 280 220 L 120 220 Z"
          fill={`url(#coneGrad)`}
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          style={{ originY: 1 }}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
        />
        {/* Center glow line */}
        <motion.line x1="200" y1="10" x2="200" y2="220"
          stroke={color} strokeWidth="1.5" strokeOpacity="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.2 }}
        />
        {/* Horizontal base line */}
        <motion.line x1="60" y1="220" x2="340" y2="220"
          stroke={color} strokeWidth="1" strokeOpacity="0.2"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          style={{ originX: 0.5 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.4 }}
        />
        {/* Glow at base */}
        <motion.ellipse cx="200" cy="220" rx="80" ry="10"
          fill={color} opacity="0"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="coneGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="100%" stopColor={color} stopOpacity="0.12" />
          </linearGradient>
        </defs>
      </svg>
      {/* Blur glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full"
        style={{ background: `radial-gradient(ellipse, ${color}40 0%, transparent 70%)`, filter: "blur(16px)" }} />
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden border-y border-white/[0.05]">
      <div className="absolute inset-0 bg-[rgba(17,17,17,0.55)] backdrop-blur-sm" />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(198,241,53,0.05) 0%, transparent 70%)", filter: "blur(80px)", y: orbY }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Reflect-style: visual first, text second, centered */}
        <div className="text-center mb-4">
          <ConeGlow color="#C6F135" />
        </div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          {/* Badge pill — Reflect style */}
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6 text-[11px] tracking-[2px] uppercase text-muted font-mono bg-white/[0.03] backdrop-blur-sm"
          >
            El proceso
          </motion.div>
          <motion.h2 variants={fadeUp}
            className="text-[clamp(32px,5vw,60px)] font-bold leading-tight tracking-tight"
          >
            Del concepto<br />al lanzamiento
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i} variants={fadeScale} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.1 }}
              className="glass glass-hover rounded-xl p-8 group relative overflow-hidden cursor-default"
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${step.tagColor}70, transparent)` }}
                initial={{ opacity: 0, scaleX: 0 }}
                whileHover={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              />
              <div className="text-[11px] font-mono text-neon tracking-[2px] mb-5">{step.num} /</div>
              <h3 className="text-[15px] font-semibold mb-3 group-hover:text-neon transition-colors duration-400">{step.title}</h3>
              <p className="text-muted text-[12px] leading-relaxed mb-5">{step.desc}</p>
              <span className="inline-block text-[9px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-sm font-mono"
                style={{ color: step.tagColor, background: step.tagBg }}>
                {step.tag}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Differentiator */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.3 }}
          className="mt-5 p-8 glass rounded-xl border border-neon/[0.12] flex flex-col md:flex-row items-start md:items-center gap-6"
          whileHover={{ borderColor: "rgba(198,241,53,0.28)", boxShadow: "0 0 50px rgba(198,241,53,0.08)" }}
          style={{ transition: "border-color 0.5s, box-shadow 0.5s" }}
        >
          <motion.div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0 text-neon text-lg"
            whileHover={{ rotate: 15, scale: 1.1 }} transition={{ duration: 0.35 }}>
            ⬡
          </motion.div>
          <div className="flex-1">
            <div className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-1">// El diferenciador</div>
            <p className="text-[14px] text-[#ccc] leading-relaxed">
              El emprendedor alimenticio normalmente necesita{" "}
              <span className="text-white font-semibold">4 proveedores distintos</span> al mismo tiempo: normativa, diseño, web y redes.{" "}
              <span className="text-neon font-semibold">Punto Alfa resuelve todo eso con un solo equipo.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
