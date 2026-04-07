"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, WHATSAPP_URL, INSTAGRAM_URL, FACEBOOK_URL } from "@/lib/motion";

export default function CTABand() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Animated corner accents */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-neon/30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-neon/30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-neon/30" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-neon/30" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <motion.div variants={fadeUp} className="flex justify-center mb-6">
          <span className="text-[10px] tracking-[3px] uppercase text-neon font-mono border border-neon/20 px-4 py-1.5 rounded-sm">
            // ¿Listo para lanzar?
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-[clamp(36px,6vw,72px)] font-bold leading-[1] tracking-tight mb-6"
        >
          Tu producto merece
          <br />
          salir{" "}
          <span className="text-neon neon-text-glow">bien</span> al mercado.
        </motion.h2>

        <motion.p variants={fadeUp} className="text-muted text-[16px] leading-relaxed mb-10 max-w-md mx-auto">
          Cuéntanos en qué etapa estás y armamos el camino contigo. Sin burocracia, sin rodeos.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-neon text-bg text-[13px] font-bold tracking-[1px] uppercase px-10 py-4 rounded overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(198,241,53,0.25)] w-full sm:w-auto text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.852L0 24l6.303-1.517A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.502-5.178-1.38l-.371-.22-3.844.924.966-3.732-.242-.386A9.959 9.959 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Escribir por WhatsApp
            </span>
            <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>

          <a
            href="#servicios"
            className="text-[13px] tracking-[1px] uppercase px-10 py-4 rounded border border-border hover:border-neon/40 hover:text-neon transition-all duration-300 text-muted w-full sm:w-auto text-center"
          >
            Ver todos los servicios
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={fadeUp} className="mt-12 flex items-center justify-center gap-6">
          <span className="text-[10px] tracking-[2px] uppercase text-muted/50 font-mono">Síguenos</span>
          <div className="w-8 h-px bg-border" />
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[1.5px] uppercase text-muted hover:text-neon transition-colors font-mono"
          >
            Instagram
          </a>
          <span className="text-border">·</span>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[1.5px] uppercase text-muted hover:text-neon transition-colors font-mono"
          >
            Facebook
          </a>
          <div className="w-8 h-px bg-border" />
          <span className="text-[11px] font-mono text-neon/60">@puntoalfamx</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
