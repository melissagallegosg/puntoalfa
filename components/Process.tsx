"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const steps = [
  {
    num: "01",
    title: "Formulación y norma",
    desc: "Calculamos tu tabla nutrimental teórica y determinamos los sellos NOM-051 con base en tu receta exacta. En 2–3 días.",
    tag: "Alfa Lab",
    tagColor: "#C6F135",
    tagBg: "rgba(198,241,53,0.08)",
  },
  {
    num: "02",
    title: "Diseño e identidad",
    desc: "Con los datos listos, diseñamos la etiqueta integrando tabla, sellos y toda la información comercial requerida.",
    tag: "Alfa Creativo",
    tagColor: "#AFA9EC",
    tagBg: "rgba(175,169,236,0.08)",
  },
  {
    num: "03",
    title: "Validación final",
    desc: "Revisamos medidas, proporciones y cumplimiento completo antes de enviar a imprenta. Cero errores, cero sorpresas.",
    tag: "Alfa Lab",
    tagColor: "#C6F135",
    tagBg: "rgba(198,241,53,0.08)",
  },
  {
    num: "04",
    title: "Lanzamiento digital",
    desc: "Landing page, redes y automatizaciones activas. Tu marca lista para vender desde el primer día en el mercado.",
    tag: "Alfa Digital",
    tagColor: "#85B7EB",
    tagBg: "rgba(133,183,235,0.08)",
  },
];

export default function Process() {
  return (
    <section className="py-28 bg-bg2 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-4">
            // El proceso
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight">
            Del concepto
            <br />
            al lanzamiento
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-bg p-8 hover:bg-bg2 transition-colors group relative overflow-hidden"
            >
              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 w-px h-8 -translate-y-1/2 bg-border" />
              )}

              <div className="text-[11px] font-mono text-neon tracking-[2px] mb-5">
                {step.num} /
              </div>

              <h3 className="text-[15px] font-semibold mb-3 group-hover:text-neon transition-colors">
                {step.title}
              </h3>

              <p className="text-muted text-[12px] leading-relaxed mb-5">{step.desc}</p>

              <span
                className="inline-block text-[9px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-sm font-mono"
                style={{ color: step.tagColor, background: step.tagBg }}
              >
                {step.tag}
              </span>

              {/* Hover accent */}
              <div
                className="absolute bottom-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${step.tagColor}40, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Differentiator callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 p-8 border border-neon/20 rounded-xl bg-neon/5 flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0 text-neon text-lg">
            ⬡
          </div>
          <div className="flex-1">
            <div className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-1">
              // El diferenciador
            </div>
            <p className="text-[14px] text-[#ccc] leading-relaxed">
              El emprendedor alimenticio normalmente necesita{" "}
              <span className="text-white font-semibold">4 proveedores distintos</span> al mismo
              tiempo: normativa, diseño, web y redes.{" "}
              <span className="text-neon font-semibold">Punto Alfa resuelve todo eso con un solo equipo.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
