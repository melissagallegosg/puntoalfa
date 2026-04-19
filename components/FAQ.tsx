"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { fadeUp, staggerContainer, EASE_OUT_EXPO } from "@/lib/motion";

const faqs = [
  {
    q: "¿Es legal la tabla nutrimental por cálculo teórico?",
    a: "Sí. El inciso 4.2.8.3.8 de la NOM-051 permite el uso de bases de datos nutrimentales reconocidas internacionalmente. Es el método que usa la gran mayoría de productos envasados en México y es completamente válido ante la autoridad.",
  },
  {
    q: "¿La aceptan en supermercados y distribuidores?",
    a: "Sí. Walmart, Chedraui, OXXO y la mayoría de cadenas de distribución aceptan tablas por cálculo teórico. No es requisito el análisis de laboratorio para comercialización en territorio nacional.",
  },
  {
    q: "¿Qué pasa si mi receta cambia después?",
    a: "Si los cambios son menores (variaciones de porcentaje pequeñas en ingredientes secundarios), la tabla suele mantenerse válida. Si cambias ingredientes principales, hacemos una actualización a precio reducido. Consulta cada caso con nosotros.",
  },
  {
    q: "¿Necesito enviar muestras físicas?",
    a: "No. Solo necesitamos tu lista completa de ingredientes con cantidades en gramos. Todo el proceso se hace de forma remota por WhatsApp o correo. Sin envíos, sin costos adicionales de logística.",
  },
  {
    q: "¿Cuánto tiempo tarda todo el proceso de etiqueta completa?",
    a: "Si contratas solo tabla nutrimental + sellos: 2–3 días hábiles. Si además necesitas diseño de etiqueta: 1 semana adicional. Si contratas el paquete Marca Completa (NOM-051 + identidad + etiqueta + digital): 3–4 semanas para el proceso completo.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="border-b border-white/[0.06] last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span className="text-[10px] text-neon font-mono mt-1 flex-shrink-0">0{index + 1}</span>
          <span className="text-[15px] font-semibold group-hover:text-neon transition-colors duration-300 leading-snug">
            {faq.q}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
          className="text-neon text-[20px] flex-shrink-0 mt-0.5 leading-none"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <p className="text-muted text-[14px] leading-relaxed pb-5 pl-7">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="preguntas-frecuentes" className="py-28 relative overflow-hidden border-t border-white/[0.05]">
      {/* Ambient bg */}
      <div className="absolute inset-0 bg-[rgba(10,10,10,0.6)]" />
      <motion.div
        className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(198,241,53,0.04) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <motion.div variants={fadeUp} className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-4">
            // Preguntas frecuentes
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-[clamp(32px,5vw,52px)] font-bold leading-tight tracking-tight mb-4">
            Resolvemos tus dudas<br />antes de empezar.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted text-[15px] leading-relaxed max-w-md">
            Las preguntas más comunes sobre normativa, tiempos y proceso. Si no encuentras la tuya, escríbenos por WhatsApp.
          </motion.p>
        </motion.div>

        {/* Acordeón */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="glass glass-dynamic rounded-2xl px-6 divide-y-0"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </motion.div>

        {/* CTA final de la sección */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 text-center"
        >
          <p className="text-[13px] text-muted mb-4">
            ¿Tienes una pregunta que no está aquí?
          </p>
          <a
            href="https://wa.me/528125970372?text=Hola%20Punto%20Alfa%20%F0%9F%91%8B%20Tengo%20una%20pregunta%20sobre%20su%20servicio."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/[0.08] text-muted text-[11px] font-bold tracking-[1px] uppercase px-6 py-2.5 rounded hover:border-neon/40 hover:text-neon hover:bg-neon/[0.04] transition-all duration-300"
          >
            Preguntar por WhatsApp →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
