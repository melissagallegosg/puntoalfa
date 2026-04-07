"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { fadeUp, staggerContainer, WHATSAPP_URL, EASE_OUT_EXPO } from "@/lib/motion";
import { useRef, useCallback } from "react";

/* ── Magnetic CTA button (Reflect-style) ── */
function MagneticCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 16 });
  const sy = useSpring(y, { stiffness: 160, damping: 16 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }, [x, y]);
  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      className="group relative overflow-hidden bg-neon text-bg text-[13px] font-bold tracking-[1px] uppercase px-12 py-5 rounded cursor-pointer"
      whileHover={{ boxShadow: "0 0 60px rgba(198,241,53,0.45)" }}
      transition={{ duration: 0.3 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-white/15"
        initial={{ x: "-110%", skewX: "-12deg" }}
        whileHover={{ x: "110%" }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      />
    </motion.a>
  );
}

export default function CTABand() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Pulsing ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(198,241,53,0.07) 0%, transparent 70%)" }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.04, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* SVG decorative ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.svg
          width="600" height="600"
          viewBox="0 0 600 600"
          className="opacity-[0.04]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="300" cy="300" r="280" fill="none" stroke="#C6F135" strokeWidth="1" strokeDasharray="8 16" />
          <circle cx="300" cy="300" r="200" fill="none" stroke="#C6F135" strokeWidth="0.5" strokeDasharray="4 24" />
        </motion.svg>
      </div>

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

          <motion.h2
            variants={fadeUp}
            className="text-[clamp(36px,6vw,64px)] font-bold leading-tight tracking-tight mb-6"
          >
            Tu producto merece
            <br />
            estar en el{" "}
            <motion.span
              className="text-neon neon-text-glow italic inline-block"
              animate={{ textShadow: ["0 0 20px rgba(198,241,53,0.4)", "0 0 50px rgba(198,241,53,0.7)", "0 0 20px rgba(198,241,53,0.4)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              mercado.
            </motion.span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-muted text-[16px] leading-relaxed mb-12 max-w-xl mx-auto">
            Cuéntanos tu proyecto y te decimos exactamente qué necesitas. Sin rodeos, sin burocracia.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 flex-wrap">
            <MagneticCTA href={WHATSAPP_URL}>
              Iniciar por WhatsApp →
            </MagneticCTA>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
