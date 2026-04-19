"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { fadeUp, staggerContainer, WHATSAPP_URL, EASE_OUT_EXPO } from "@/lib/motion";
import { useRef, useCallback } from "react";

function MagneticCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 16 });
  const sy = useSpring(y, { stiffness: 160, damping: 16 });
  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  }, [x, y]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
      style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      className="group relative overflow-hidden bg-neon text-bg text-[13px] font-bold tracking-[1px] uppercase px-12 py-5 rounded cursor-pointer"
      whileHover={{ boxShadow: "0 0 60px rgba(198,241,53,0.45)" }}
      transition={{ duration: 0.3 }}>
      <span className="relative z-10">{children}</span>
      <motion.div className="absolute inset-0 bg-white/15"
        initial={{ x: "-110%", skewX: "-12deg" }} whileHover={{ x: "110%" }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }} />
    </motion.a>
  );
}

export default function CTABand() {
  return (
    <section className="py-28 relative overflow-hidden border-t border-white/[0.05]">
      {/* Background gradient — Vercel template style */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon/[0.04] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "rgba(198,241,53,0.06)", filter: "blur(100px)" }} />
      <div className="absolute inset-0 dot-pattern opacity-15" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}>
          <motion.div variants={fadeUp}
            className="inline-flex items-center border border-white/10 rounded-full px-4 py-1.5 mb-6 text-[11px] tracking-[2px] uppercase text-muted font-mono bg-white/[0.03]">
            ¿Listo para empezar?
          </motion.div>
          <motion.h2 variants={fadeUp}
            className="text-[clamp(36px,6vw,64px)] font-bold leading-tight tracking-tight mb-6">
            Tu producto merece<br />estar en el{" "}
            <motion.span className="text-neon neon-text-glow italic inline-block"
              animate={{ textShadow: ["0 0 20px rgba(198,241,53,0.4)", "0 0 50px rgba(198,241,53,0.7)", "0 0 20px rgba(198,241,53,0.4)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              mercado.
            </motion.span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted text-[17px] leading-relaxed mb-12 max-w-xl mx-auto">
            Cuéntanos tu proyecto y te decimos exactamente qué necesitas.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticCTA href={WHATSAPP_URL}>Cotizar por WhatsApp →</MagneticCTA>
            <a href="#paquetes"
              className="inline-flex items-center gap-2 border border-white/[0.08] text-muted text-[13px] font-bold tracking-[1px] uppercase px-10 py-4 rounded hover:border-neon/40 hover:text-neon hover:bg-neon/[0.04] transition-all duration-300">
              Ver precios
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
