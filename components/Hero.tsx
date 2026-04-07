"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer, WHATSAPP_URL } from "@/lib/motion";
import { useRef } from "react";

const stats = [
  { num: "NOM-051",  label: "Cumplimiento normativo" },
  { num: "2–3d",     label: "Entrega tabla nutrimental" },
  { num: "$2,000",   label: "Desde MXN por servicio" },
  { num: "3",        label: "Áreas especializadas" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Ambient background orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main neon orb */}
        <motion.div
          className="orb float-glow"
          style={{
            width: 700, height: 700,
            top: "5%", left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(198,241,53,1) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.10, 0.17, 0.10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Secondary lavender orb */}
        <motion.div
          className="orb"
          style={{
            width: 400, height: 400,
            bottom: "15%", left: "10%",
            background: "radial-gradient(circle, rgba(175,169,236,1) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.11, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* ── Grid ── */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* ── Animated vertical accent lines ── */}
      <motion.div
        className="absolute left-[10%] top-0 w-px h-full"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(198,241,53,0.15), transparent)" }}
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-0 w-px h-full"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(198,241,53,0.10), transparent)" }}
        animate={{ opacity: [0.9, 0.3, 0.9] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-16"
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
            <span className="text-[10px] tracking-[3px] uppercase text-neon font-mono border border-neon/25 px-4 py-1.5 rounded-sm backdrop-blur-sm bg-neon/[0.04]">
              Industria Alimentaria · México
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(52px,8.5vw,100px)] font-bold leading-[0.93] tracking-[-3px] mb-8"
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
            className="text-[17px] text-muted leading-relaxed max-w-[520px] mb-10"
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
              className="group relative bg-neon text-bg text-[13px] font-bold tracking-[1px] uppercase px-8 py-4 rounded overflow-hidden transition-all duration-400 hover:shadow-[0_0_40px_rgba(198,241,53,0.35)] hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10">Iniciar proyecto →</span>
              <div className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
            </a>
            <a
              href="#servicios"
              className="text-[13px] tracking-[1px] uppercase px-8 py-4 rounded border border-white/[0.08] hover:border-neon/40 hover:text-neon hover:bg-neon/[0.04] backdrop-blur-sm transition-all duration-400 text-muted"
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
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden border border-white/[0.07] backdrop-blur-xl"
          style={{ background: "rgba(17,17,17,0.5)" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`px-6 py-7 text-center transition-all duration-500 hover:bg-neon/[0.04] group ${
                i < stats.length - 1 ? "border-r border-white/[0.06]" : ""
              }`}
            >
              <div className="text-2xl font-bold text-neon font-mono mb-1 group-hover:neon-text-glow transition-all duration-300">
                {s.num}
              </div>
              <div className="text-[10px] tracking-[1.5px] uppercase text-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[9px] tracking-[3px] uppercase text-muted/40 font-mono">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted/20 to-transparent" />
      </motion.div>
    </section>
  );
}
