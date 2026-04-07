"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, fadeScale, staggerContainer, EASE_OUT_EXPO } from "@/lib/motion";

const steps = [
  {
    num: "01",
    title: "Formulación y norma",
    desc: "Calculamos tu tabla nutrimental teórica y determinamos los sellos NOM-051 con base en tu receta exacta. En 2–3 días.",
    tag: "Alfa Lab",
    tagColor: "#C6F135",
    tagBg: "rgba(198,241,53,0.07)",
  },
  {
    num: "02",
    title: "Diseño e identidad",
    desc: "Con los datos listos, diseñamos la etiqueta integrando tabla, sellos y toda la información comercial requerida.",
    tag: "Alfa Creativo",
    tagColor: "#AFA9EC",
    tagBg: "rgba(175,169,236,0.07)",
  },
  {
    num: "03",
    title: "Validación final",
    desc: "Revisamos medidas, proporciones y cumplimiento completo antes de enviar a imprenta. Cero errores, cero sorpresas.",
    tag: "Alfa Lab",
    tagColor: "#C6F135",
    tagBg: "rgba(198,241,53,0.07)",
  },
  {
    num: "04",
    title: "Lanzamiento digital",
    desc: "Landing page, redes y automatizaciones activas. Tu marca lista para vender desde el primer día en el mercado.",
    tag: "Alfa Digital",
    tagColor: "#85B7EB",
    tagBg: "rgba(133,183,235,0.07)",
  },
];

/* ── Animated connector line between steps ── */
function ConnectorLine({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="hidden lg:flex items-center flex-1 px-2 mt-[2.2rem]">
      <div className="relative w-full h-px bg-white/[0.06] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 h-full"
          style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
          initial={{ x: "-100%" }}
          animate={inView ? { x: "100%" } : {}}
          transition={{ duration: 1.5, ease: EASE_OUT_EXPO, delay: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 h-full origin-left"
          style={{ background: `${color}25` }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        />
      </div>
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden border-y border-white/[0.05]">
      <div className="absolute inset-0 bg-[rgba(17,17,17,0.55)] backdrop-blur-sm" />

      {/* Parallax orb */}
      <motion.div
        className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(198,241,53,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          y: orbY,
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
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

        {/* Steps — with connector animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12 }}
              className="glass glass-hover rounded-xl p-8 group relative overflow-hidden cursor-default"
              whileHover={{ y: -5 }}
            >
              {/* Animated top accent line on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${step.tagColor}70, transparent)` }}
                initial={{ opacity: 0, scaleX: 0 }}
                whileHover={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              />

              {/* Number with color flash on hover */}
              <motion.div
                className="text-[11px] font-mono text-neon tracking-[2px] mb-5"
                whileHover={{ letterSpacing: "4px" }}
                transition={{ duration: 0.4 }}
              >
                {step.num} /
              </motion.div>

              <h3 className="text-[15px] font-semibold mb-3 group-hover:text-neon transition-colors duration-400">
                {step.title}
              </h3>

              <p className="text-muted text-[12px] leading-relaxed mb-5">{step.desc}</p>

              <span
                className="inline-block text-[9px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-sm font-mono"
                style={{ color: step.tagColor, background: step.tagBg }}
              >
                {step.tag}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Differentiator callout */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.3 }}
          className="mt-5 p-8 glass rounded-xl border border-neon/[0.12] flex flex-col md:flex-row items-start md:items-center gap-6 group"
          whileHover={{ borderColor: "rgba(198,241,53,0.28)", boxShadow: "0 0 50px rgba(198,241,53,0.08)" }}
          style={{ transition: "border-color 0.5s, box-shadow 0.5s" }}
        >
          <motion.div
            className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0 text-neon text-lg"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          >
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
