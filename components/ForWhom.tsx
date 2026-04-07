"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, staggerFast, fadeScale, wordReveal, EASE_OUT_EXPO } from "@/lib/motion";

const profiles = [
  {
    icon: "🚀",
    title: "Food Startups",
    subtitle: "0–12 meses",
    description:
      "Emprendedores que ya tienen una receta y quieren lanzar su primer producto empacado de forma correcta y rápida. Necesitan todo: norma, etiqueta y presencia.",
    tags: ["Primer producto", "Etiqueta legal", "Lanzamiento rápido"],
  },
  {
    icon: "🏺",
    title: "Marcas Artesanales",
    subtitle: "Formalización",
    description:
      "Negocios que venden de manera informal o sin cumplir la NOM-051 y quieren dar el salto al mercado formal con etiqueta correcta y marca profesional.",
    tags: ["NOM-051", "Formalización", "Etiqueta correcta"],
  },
  {
    icon: "⚗️",
    title: "Alimentos y Bebidas Funcionales",
    subtitle: "Regulación crítica",
    description:
      "Suplementos, proteínas y productos con claims de salud donde la normativa es especialmente crítica. Errores en los sellos o la tabla pueden costar caro.",
    tags: ["Suplementos", "Claims de salud", "Sellos NOM"],
  },
];

const painPoints = [
  { label: "Sin normativa",  desc: "Tu producto no puede venderse legalmente sin cumplir NOM-051" },
  { label: "Sin identidad",  desc: "Una etiqueta genérica no conecta con tu consumidor ideal" },
  { label: "Sin presencia",  desc: "Sin digital no existes para quien te busca en línea" },
  { label: "Sin tiempo",     desc: "Coordinar 4 proveedores distintos te cuesta semanas y energía" },
];

/* ── Blur-reveal section heading ── */
function SectionHeading({ label, title, sub }: { label: string; title: React.ReactNode; sub?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-4"
      >
        {label}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 }}
        className="text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight mb-4"
      >
        {title}
      </motion.div>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className="text-muted text-[15px] max-w-md leading-relaxed"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

export default function ForWhom() {
  return (
    <section className="py-28 relative overflow-hidden border-y border-white/[0.05]">
      <div className="absolute inset-0 bg-[rgba(17,17,17,0.6)] backdrop-blur-sm" />

      <motion.div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(175,169,236,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          label="// ¿Para quién es esto?"
          title={<>Desde la idea<br />hasta el mercado,<br />contigo.</>}
          sub="Ya sea que tengas una receta lista o apenas estés desarrollando tu producto — te acompañamos desde la formulación, la norma, el diseño y el lanzamiento."
        />

        {/* Profile cards — stagger with blur */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-4 mb-16"
        >
          {profiles.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeScale}
              className="glass glass-hover rounded-xl p-8 group cursor-default"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            >
              <motion.div
                className="text-3xl mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {p.icon}
              </motion.div>
              <div className="text-[9px] tracking-[2px] uppercase text-neon font-mono mb-1">{p.subtitle}</div>
              <h3 className="text-[18px] font-bold mb-3 group-hover:text-neon transition-colors duration-400">{p.title}</h3>
              <p className="text-muted text-[13px] leading-relaxed mb-5">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    className="text-[10px] tracking-[1px] uppercase px-2.5 py-1 rounded-sm bg-neon/[0.07] text-neon border border-neon/15 backdrop-blur-sm"
                    whileHover={{ backgroundColor: "rgba(198,241,53,0.14)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pain points */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} className="text-[10px] tracking-[3px] uppercase text-muted font-mono mb-8">
            // El problema que resolvemos
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {painPoints.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass glass-hover rounded-xl p-6 group cursor-default"
                whileHover={{ y: -3, borderColor: "rgba(198,241,53,0.2)" }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              >
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
