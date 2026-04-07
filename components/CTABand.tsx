"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, WHATSAPP_URL } from "@/lib/motion";

export default function CTABand() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(198,241,53,0.06) 0%, transparent 70%)" }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-6">
            // ¿Listo para empezar?
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight mb-6">
            Tu producto merece
            <br />
            estar en el{" "}
            <span className="text-neon neon-text-glow italic">mercado.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted text-[16px] leading-relaxed mb-10 max-w-xl mx-auto">
            Cuéntanos tu proyecto y te decimos exactamente qué necesitas. Sin rodeos, sin burocracia.
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-neon text-bg text-[13px] font-bold tracking-[1px] uppercase px-10 py-4 rounded transition-all duration-400 hover:shadow-[0_0_50px_rgba(198,241,53,0.4)] hover:scale-[1.04] active:scale-[0.98]"
            >
              <span className="relative z-10">Iniciar por WhatsApp →</span>
              <div className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
