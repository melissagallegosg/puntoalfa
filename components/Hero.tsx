"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useRef, useEffect, useState, useCallback } from "react";
import QuoteModal from "@/components/QuoteModal";

/* ── Animated counter ── */
function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const isNum = /^\d+$/.test(value);
  useEffect(() => {
    if (!isNum) { setDisplay(value); return; }
    const num = parseInt(value);
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setDisplay(Math.floor(eased * num).toString());
        if (p < 1) requestAnimationFrame(step); else setDisplay(value);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, isNum]);
  return <div ref={ref}>{display}</div>;
}

/* ── Magnetic button ── */
function MagneticBtn({ href, onClick, children, primary = false }: { href?: string; onClick?: () => void; children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.28);
  }, [x, y]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  const className = `group relative overflow-hidden text-[12px] font-bold tracking-[1px] uppercase px-7 py-3.5 rounded cursor-pointer flex items-center gap-2 ${
    primary
      ? "bg-neon text-bg hover:shadow-[0_0_50px_rgba(198,241,53,0.45)]"
      : "border border-white/[0.08] text-muted hover:border-neon/40 hover:text-neon hover:bg-neon/[0.04] backdrop-blur-sm"
  } transition-shadow duration-300`;

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {primary && (
        <motion.div className="absolute inset-0 bg-white/15"
          initial={{ x: "-110%", skewX: "-12deg" }} whileHover={{ x: "110%" }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }} />
      )}
    </>
  );

  if (onClick) {
    return (
      <motion.button ref={ref as React.Ref<HTMLButtonElement>} type="button" onClick={onClick}
        style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}
        whileTap={{ scale: 0.97 }} className={className}>
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.a ref={ref as React.Ref<HTMLAnchorElement>} href={href}
      target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
      style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }} className={className}>
      {inner}
    </motion.a>
  );
}

/* ── Social Proof — stats verificables ── */

function SocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.75 }}
      className="w-full max-w-lg mx-auto mb-10"
    >
      <div className="glass rounded-xl px-6 py-5 border border-white/[0.07] flex flex-col sm:flex-row items-center gap-5">
        <div className="flex flex-col items-center sm:items-start gap-0.5 flex-1">
          <span className="text-[26px] font-bold text-neon font-mono leading-none">72h</span>
          <span className="text-[11px] text-muted tracking-[0.5px]">entrega promedio</span>
        </div>
        <div className="w-px h-10 bg-white/[0.08] hidden sm:block" />
        <div className="flex flex-col items-center sm:items-start gap-0.5 flex-1">
          <span className="text-[26px] font-bold text-neon font-mono leading-none">0</span>
          <span className="text-[11px] text-muted tracking-[0.5px]">rechazos en imprenta</span>
        </div>
        <div className="w-px h-10 bg-white/[0.08] hidden sm:block" />
        <div className="flex flex-col items-center sm:items-start gap-0.5 flex-1">
          <span className="text-[26px] font-bold text-neon font-mono leading-none">100%</span>
          <span className="text-[11px] text-muted tracking-[0.5px]">remoto por WhatsApp</span>
        </div>
      </div>
      <p className="text-[10px] text-muted/40 font-mono text-center mt-2 tracking-[0.5px]">
        * Basado en proyectos completados hasta la fecha.
      </p>
    </motion.div>
  );
}

/* ── Neon portal ── */
function NeonPortal() {
  return (
    <div className="relative w-full flex justify-center" style={{ height: 200, marginBottom: -40 }}>
      <motion.div className="absolute rounded-full"
        style={{ width: 520, height: 200, bottom: 0, left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(198,241,53,0.18) 0%, rgba(198,241,53,0.04) 40%, transparent 70%)",
          filter: "blur(32px)" }}
        animate={{ opacity: [0.7, 1, 0.7], scaleX: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg viewBox="0 0 600 200" width="100%" style={{ maxWidth: 700, position: "absolute", bottom: 0 }}>
        {[220, 170, 130, 95, 65, 40].map((r, i) => (
          <motion.path key={r}
            d={`M ${300 - r} 200 A ${r} ${r * 0.38} 0 0 1 ${300 + r} 200`}
            fill="none" stroke={`rgba(198,241,53,${0.06 + i * 0.04})`}
            strokeWidth={i === 5 ? 2 : 1}
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.3 + i * 0.1 }, opacity: { duration: 0.4, delay: 0.3 + i * 0.1 } }}
          />
        ))}
        <motion.ellipse cx="300" cy="200" rx="40" ry="12" fill="rgba(198,241,53,0.5)" filter="url(#glow2)"
          animate={{ rx: [40, 46, 40], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <motion.ellipse cx="300" cy="200" rx="18" ry="5" fill="rgba(230,255,140,0.9)"
          animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        <defs>
          <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

const stats = [
  { num: "NOM-051", label: "Cumplimiento normativo" },
  { num: "2–3d",    label: "Entrega tabla nutrimental" },
  { num: "$800",    label: "Desde MXN por servicio" },
  { num: "3",       label: "Áreas especializadas" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "rgba(198,241,53,0.07)", filter: "blur(100px)" }} />
      {/* Grid pattern removed — causes bouncing. Aurora background is sufficient */}

      <motion.div style={{ y, opacity }}
        className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-8 text-center flex flex-col items-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-badge mb-8"
        >
          <span className="pulse-dot w-2 h-2 rounded-full bg-neon flex-shrink-0" />
          <span className="text-[12px] text-muted">Industria Alimentaria · México</span>
        </motion.div>

        {/* Headline — directo: pain point + solución en 6 palabras */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className="text-[clamp(44px,8vw,88px)] font-bold leading-[0.92] tracking-[-3px] mb-6"
        >
          Tu etiqueta{" "}
          <motion.span className="text-neon neon-text-glow italic inline-block"
            animate={{ textShadow: ["0 0 20px rgba(198,241,53,0.4)", "0 0 50px rgba(198,241,53,0.7)", "0 0 20px rgba(198,241,53,0.4)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            NOM-051
          </motion.span>
          <br />
          lista en 72 horas.
        </motion.h1>

        {/* Subtítulo — beneficio concreto, sin metáforas */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.38 }}
          className="text-[17px] text-muted leading-relaxed max-w-[520px] mb-10"
        >
          Tu producto listo para vender, sin problemas de etiquetado.
        </motion.p>

        {/* CTA — único primario */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.5 }}
          className="flex flex-col items-center gap-3 mb-12"
        >
          <MagneticBtn onClick={() => setModalOpen(true)} primary>Cotizar gratis →</MagneticBtn>
          <a href="#servicios" className="text-[11px] text-muted/50 hover:text-muted transition-colors duration-300 tracking-[0.5px]">
            o explorar servicios ↓
          </a>
        </motion.div>

        {/* Social Proof en lugar del TerminalBlock */}
        <SocialProof />

        {/* Trusted by — línea simple, sin lista de categorías genéricas */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="w-full"
        >
          <p className="text-[12px] text-muted/50 tracking-[1.5px] font-mono">
            Para fundadores de marcas de alimentos y bebidas en México
          </p>
        </motion.div>
      </motion.div>

      {/* Portal + stats */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 1.0 }}
        className="relative z-10 max-w-5xl mx-auto px-6 w-full pb-0"
      >
        <NeonPortal />
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden border border-white/[0.08] glass-strong">
          {stats.map((s, i) => (
            <motion.div key={i} whileHover={{ background: "rgba(198,241,53,0.04)" }}
              transition={{ duration: 0.3 }}
              className={`px-6 py-6 text-center ${i < stats.length - 1 ? "border-r border-white/[0.06]" : ""}`}>
              <div className="text-xl font-bold text-neon font-mono mb-1"><AnimatedNumber value={s.num} /></div>
              <div className="text-[11px] tracking-[1.5px] uppercase text-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}>
        <motion.span className="text-[9px] tracking-[3px] uppercase text-muted/40 font-mono"
          animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}>
          scroll
        </motion.span>
        <motion.div className="w-px h-8 bg-gradient-to-b from-muted/20 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], originY: 0 }} transition={{ duration: 1.8, repeat: Infinity }} />
      </motion.div>

      <QuoteModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
