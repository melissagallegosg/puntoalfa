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
      transition={{ duration: 0.3 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div className="absolute inset-0 bg-white/15"
        initial={{ x: "-110%", skewX: "-12deg" }} whileHover={{ x: "110%" }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }} />
    </motion.a>
  );
}

/* ── Reflect-style bottom sphere glow ── */
function SphereGlow() {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: 600, height: 300 }}>
      <svg viewBox="0 0 600 300" width="100%" style={{ position: "absolute", bottom: 0 }}>
        {/* Sphere outline arcs */}
        {[280, 220, 165, 115, 70].map((r, i) => (
          <motion.path key={r}
            d={`M ${300 - r} 300 A ${r} ${r * 0.4} 0 0 1 ${300 + r} 300`}
            fill="none" stroke={`rgba(198,241,53,${0.04 + i * 0.03})`} strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: EASE_OUT_EXPO, delay: i * 0.12 }}
          />
        ))}
        {/* Vertical lines on sphere */}
        {[-3, -2, -1, 0, 1, 2, 3].map((k, i) => {
          const cx = 300 + k * 46;
          return (
            <motion.path key={k}
              d={`M ${cx} 300 A 46 80 0 0 1 ${cx} 300`}
              fill="none" stroke="rgba(198,241,53,0.04)" strokeWidth="0.8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.06 }}
            />
          );
        })}
        <defs>
          <radialGradient id="sphereGrad" cx="50%" cy="80%">
            <stop offset="0%" stopColor="#C6F135" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#C6F135" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#C6F135" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.ellipse cx="300" cy="300" rx="280" ry="120" fill="url(#sphereGrad)"
          animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default function CTABand() {
  return (
    <section className="pt-32 pb-0 relative overflow-hidden" style={{ minHeight: 420 }}>
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 50% at 50% 60%, rgba(198,241,53,0.06) 0%, transparent 70%)" }}
        animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pb-32">
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
          <motion.p variants={fadeUp} className="text-muted text-[16px] leading-relaxed mb-12 max-w-xl mx-auto">
            Cuéntanos tu proyecto y te decimos exactamente qué necesitas. Sin rodeos, sin burocracia.
          </motion.p>
          <motion.div variants={fadeUp} className="flex justify-center">
            <MagneticCTA href={WHATSAPP_URL}>Iniciar por WhatsApp →</MagneticCTA>
          </motion.div>
        </motion.div>
      </div>

      {/* Sphere at bottom — like Reflect's pricing section */}
      <SphereGlow />
    </section>
  );
}
