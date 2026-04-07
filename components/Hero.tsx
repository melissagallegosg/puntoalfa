"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer, WHATSAPP_URL } from "@/lib/motion";
import { useRef } from "react";

const stats = [
  { num: "NOM-051", label: "Cumplimiento normativo" },
  { num: "2–3d", label: "Entrega tabla nutrimental" },
  { num: "$2,000", label: "Desde MXN por servicio" },
  { num: "3", label: "Áreas especializadas" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Neon radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon/5 blur-[120px] pointer-events-none" />

      {/* Animated border lines */}
      <motion.div
        className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-neon/20 to-transparent"
        style={{ marginLeft: "10%" }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-neon/20 to-transparent"
        style={{ marginRight: "10%" }}
        animate={{ opacity: [0.8, 0.3, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8 w-fit">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-neon flex-shrink-0" />
            <span className="text-[10px] tracking-[3px] uppercase text-neon font-mono border border-neon/30 px-4 py-1.5 rounded-sm">
              Industria Alimentaria · México
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(48px,8vw,96px)] font-bold leading-[0.95] tracking-[-2px] mb-8"
          >
            De la receta
            <br />
            al{" "}
            <span className="text-neon neon-text-glow italic">
              mercado.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="text-[17px] text-muted leading-relaxed max-w-[500px] mb-10"
          >
            Ciencia, diseño y estrategia para emprendedores alimentarios.
            Un solo equipo para cumplir norma, diseñar tu marca y lanzar tu producto.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-neon text-bg text-[13px] font-bold tracking-[1px] uppercase px-8 py-4 rounded overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,241,53,0.3)]"
            >
              <span className="relative z-10">Iniciar proyecto →</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="#servicios"
              className="text-[13px] tracking-[1px] uppercase px-8 py-4 rounded border border-border hover:border-neon/50 hover:text-neon transition-all duration-300 text-muted"
            >
              Ver servicios
            </a>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-2 md:grid-cols-4 border border-border rounded-lg overflow-hidden"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`px-6 py-6 bg-bg2 text-center ${i < stats.length - 1 ? "border-r border-border" : ""} hover:bg-bg3 transition-colors`}
            >
              <div className="text-2xl font-bold text-neon font-mono mb-1">{s.num}</div>
              <div className="text-[10px] tracking-[1.5px] uppercase text-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[9px] tracking-[3px] uppercase text-muted/50 font-mono">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted/30 to-transparent" />
      </motion.div>
    </section>
  );
}
