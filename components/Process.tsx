"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, EASE_OUT_EXPO } from "@/lib/motion";

const steps = [
  {
    num: "01",
    title: "Formulación y norma",
    desc: "Calculamos tu tabla nutrimental teórica y determinamos los sellos NOM-051 con base en tu receta exacta.",
    tag: "Alfa Lab",
    tagColor: "#C6F135",
    tagBg: "rgba(198,241,53,0.07)",
    time: "2–3 días",
    icon: "⬡",
  },
  {
    num: "02",
    title: "Diseño e identidad",
    desc: "Con los datos listos, diseñamos la etiqueta integrando tabla, sellos y toda la información comercial requerida.",
    tag: "Alfa Creativo",
    tagColor: "#AFA9EC",
    tagBg: "rgba(175,169,236,0.07)",
    time: "1 semana",
    icon: "◈",
  },
  {
    num: "03",
    title: "Validación final",
    desc: "Revisamos medidas, proporciones y cumplimiento completo antes de enviar a imprenta. Cero errores.",
    tag: "Alfa Lab",
    tagColor: "#C6F135",
    tagBg: "rgba(198,241,53,0.07)",
    time: "1 día",
    icon: "✓",
  },
  {
    num: "04",
    title: "Lanzamiento digital",
    desc: "Landing page, redes y automatizaciones activas. Tu marca lista para vender desde el primer día.",
    tag: "Alfa Digital",
    tagColor: "#85B7EB",
    tagBg: "rgba(133,183,235,0.07)",
    time: "5–7 días",
    icon: "⟁",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} id="proceso" className="py-28 relative overflow-hidden border-t border-white/[0.05]">
      <div className="absolute inset-0 bg-[rgba(17,17,17,0.55)] backdrop-blur-sm" />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(198,241,53,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          y: orbY,
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6 text-[11px] tracking-[2px] uppercase text-muted font-mono bg-white/[0.03] backdrop-blur-sm"
          >
            El proceso
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(32px,5vw,60px)] font-bold leading-tight tracking-tight mb-4"
          >
            Del concepto<br />al lanzamiento
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted text-[16px] max-w-md mx-auto leading-relaxed">
            Un flujo de trabajo claro, sin burocracia y con un solo equipo.
          </motion.p>
        </motion.div>

        {/* Connector line behind cards (desktop) */}
        <div className="relative">
          <div className="hidden md:block absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

          {/* 4 horizontal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative glass glass-dynamic rounded-2xl p-6 flex flex-col gap-4 cursor-default overflow-hidden"
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                {/* Hover top line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${step.tagColor}80, transparent)` }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileHover={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Step number + icon */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{
                      background: `${step.tagColor}12`,
                      border: `1px solid ${step.tagColor}30`,
                      color: step.tagColor,
                    }}
                  >
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-mono text-muted/50 tracking-[1px]">{step.num}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3
                    className="text-[15px] font-semibold mb-2 transition-colors duration-300 group-hover:text-white"
                    style={{ color: "#e8e8e8" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-muted text-[12px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <span
                    className="text-[9px] tracking-[1.5px] uppercase px-2 py-1 rounded font-mono"
                    style={{ color: step.tagColor, background: step.tagBg }}
                  >
                    {step.tag}
                  </span>
                  <span className="text-[11px] font-mono text-muted/60">{step.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Differentiator */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.3 }}
          className="mt-8 p-8 glass rounded-xl border border-neon/[0.12] flex flex-col md:flex-row items-start md:items-center gap-6"
          whileHover={{ borderColor: "rgba(198,241,53,0.28)", boxShadow: "0 0 50px rgba(198,241,53,0.08)" }}
          style={{ transition: "border-color 0.5s, box-shadow 0.5s" }}
        >
          <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0 text-neon text-lg">⬡</div>
          <div className="flex-1">
            <div className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-1">// El diferenciador</div>
            <p className="text-[14px] text-[#ccc] leading-relaxed">
              El emprendedor alimenticio normalmente necesita{" "}
              <span className="text-white font-semibold">4 proveedores distintos</span> al mismo tiempo: normativa, diseño, web y redes.{" "}
              <span className="text-neon font-semibold">Punto Alfa resuelve todo eso con un solo equipo.</span>
            </p>
          </div>
        </motion.div>

        {/* Resumen de ruta completa */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.45 }}
          className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 rounded-lg border border-white/[0.06] bg-white/[0.02]"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="text-neon font-mono text-[10px]">◆</span>
              <span className="text-[12px] font-semibold text-white">Marca Completa</span>
            </div>
            <span className="text-[12px] text-muted">3–4 semanas</span>
            <span className="text-[14px] font-bold text-neon font-mono">$12,000 MXN</span>
            <span className="text-[11px] text-muted/60">· Un solo equipo</span>
          </div>
          <a
            href="#paquetes"
            className="flex-shrink-0 text-[11px] font-bold tracking-[1px] uppercase text-neon border border-neon/30 px-4 py-2 rounded hover:bg-neon/[0.06] transition-colors duration-300"
          >
            Ver paquete →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
