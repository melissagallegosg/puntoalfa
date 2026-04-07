"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { WHATSAPP_URL, EASE_OUT_EXPO } from "@/lib/motion";
import { useRef, useEffect, useState, useCallback } from "react";

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
        if (p < 1) requestAnimationFrame(step);
        else setDisplay(value);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, isNum]);

  return <div ref={ref}>{display}</div>;
}

/* ── Word-by-word reveal ── */
function WordReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <motion.span
      className={className}
      style={{ display: "inline" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      initial="hidden"
      animate="visible"
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.26em" }}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Magnetic button ── */
function MagneticBtn({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.28);
  }, [x, y]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a
      ref={ref} href={href} target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer" style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave} whileTap={{ scale: 0.97 }}
      className={`group relative overflow-hidden text-[13px] font-bold tracking-[1px] uppercase px-8 py-4 rounded cursor-pointer ${
        primary
          ? "bg-neon text-bg hover:shadow-[0_0_50px_rgba(198,241,53,0.45)]"
          : "border border-white/[0.08] text-muted hover:border-neon/40 hover:text-neon hover:bg-neon/[0.04] backdrop-blur-sm"
      } transition-shadow duration-300`}
    >
      <span className="relative z-10">{children}</span>
      {primary && (
        <motion.div
          className="absolute inset-0 bg-white/15"
          initial={{ x: "-110%", skewX: "-12deg" }}
          whileHover={{ x: "110%" }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        />
      )}
    </motion.a>
  );
}

/* ── Neon portal / black hole SVG canvas ── */
function NeonPortal() {
  return (
    <div className="relative w-full flex justify-center" style={{ height: 340, marginBottom: -60 }}>
      {/* Outer glow blur */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 520, height: 260,
          bottom: 0, left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(198,241,53,0.22) 0%, rgba(198,241,53,0.06) 40%, transparent 70%)",
          filter: "blur(32px)",
        }}
        animate={{ opacity: [0.7, 1, 0.7], scaleX: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg viewBox="0 0 600 340" width="100%" style={{ maxWidth: 700, position: "absolute", bottom: 0 }} xmlns="http://www.w3.org/2000/svg">
        {/* Grid lines — horizon effect */}
        {[...Array(10)].map((_, i) => {
          const y = 180 + i * 18;
          const perspective = 1 - i * 0.06;
          return (
            <motion.line
              key={`h${i}`} x1={300 - 300 * perspective} y1={y} x2={300 + 300 * perspective} y2={y}
              stroke="rgba(198,241,53,0.06)" strokeWidth="0.8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.07, duration: 0.5 }}
            />
          );
        })}
        {[...Array(12)].map((_, i) => {
          const t = i / 11;
          const x = 300 - 300 * (1 - Math.abs(t - 0.5) * 2 * 0) + (t - 0.5) * 600;
          return (
            <motion.line
              key={`v${i}`}
              x1={300 + (t - 0.5) * 600} y1={180}
              x2={300 + (t - 0.5) * 60} y2={340}
              stroke="rgba(198,241,53,0.05)" strokeWidth="0.8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
            />
          );
        })}

        {/* Concentric arcs — the portal rings */}
        {[240, 190, 145, 105, 72, 45, 24].map((r, i) => (
          <motion.path
            key={r}
            d={`M ${300 - r} 220 A ${r} ${r * 0.38} 0 0 1 ${300 + r} 220`}
            fill="none"
            stroke={`rgba(198,241,53,${0.08 + i * 0.04})`}
            strokeWidth={i === 6 ? 2.5 : 1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.3 + i * 0.1 },
              opacity: { duration: 0.4, delay: 0.3 + i * 0.1 },
            }}
          />
        ))}

        {/* Inner glow core */}
        <motion.ellipse
          cx="300" cy="220" rx="46" ry="14"
          fill="rgba(198,241,53,0.55)"
          filter="url(#glow)"
          animate={{ rx: [46, 52, 46], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="300" cy="220" rx="22" ry="6"
          fill="rgba(230,255,140,0.9)"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Light beam upward */}
        <motion.path
          d="M 278 220 L 265 60 M 322 220 L 335 60"
          stroke="rgba(198,241,53,0.06)" strokeWidth="28"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path
          d="M 288 220 L 282 60 M 312 220 L 318 60"
          stroke="rgba(198,241,53,0.12)" strokeWidth="10"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Floating particles */}
        {[
          { cx: 160, cy: 170, r: 2 }, { cx: 440, cy: 155, r: 1.5 },
          { cx: 100, cy: 210, r: 1 }, { cx: 500, cy: 195, r: 2 },
          { cx: 200, cy: 130, r: 1.5 }, { cx: 400, cy: 140, r: 1 },
          { cx: 80, cy: 240, r: 1 }, { cx: 520, cy: 230, r: 1.5 },
        ].map((p, i) => (
          <motion.circle
            key={i} cx={p.cx} cy={p.cy} r={p.r}
            fill="rgba(198,241,53,0.6)"
            animate={{ opacity: [0.2, 0.8, 0.2], cy: [p.cy, p.cy - 8, p.cy] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}

        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
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
  { num: "$2,300",  label: "Desde MXN por servicio" },
  { num: "3",       label: "Áreas especializadas" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Subtle lavender orb top-right */}
      <motion.div className="absolute pointer-events-none"
        style={{ width: 500, height: 500, top: "0%", right: "-10%",
          background: "radial-gradient(circle, rgba(175,169,236,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-8 text-center flex flex-col items-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
          className="flex items-center gap-2 mb-8 w-fit"
        >
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-neon flex-shrink-0" />
          <span className="text-[10px] tracking-[3px] uppercase text-neon font-mono border border-neon/25 px-4 py-1.5 rounded-sm backdrop-blur-sm bg-neon/[0.04]">
            Industria Alimentaria · México
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-[clamp(48px,8.5vw,96px)] font-bold leading-[0.92] tracking-[-3px] mb-6">
          <WordReveal text="De la receta" delay={0.22} />
          <br />
          <WordReveal text="al" delay={0.36} />
          {" "}
          <motion.span
            className="text-neon neon-text-glow italic inline-block"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.5 }}
          >
            mercado.
          </motion.span>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.62 }}
          className="text-[17px] text-muted leading-relaxed max-w-[480px] mb-10"
        >
          Ciencia, diseño y estrategia para emprendedores alimentarios.
          Un solo equipo para cumplir norma, diseñar tu marca y lanzar tu producto.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.75 }}
          className="flex items-center gap-4 flex-wrap justify-center mb-16"
        >
          <MagneticBtn href={WHATSAPP_URL} primary>Iniciar proyecto →</MagneticBtn>
          <MagneticBtn href="#servicios">Ver servicios</MagneticBtn>
        </motion.div>

        {/* Portal */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.4 }}
        >
          <NeonPortal />
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 1.0 }}
        className="relative z-10 max-w-5xl mx-auto px-6 w-full pb-16"
      >
        <div
          className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden border border-white/[0.07] backdrop-blur-xl"
          style={{ background: "rgba(17,17,17,0.6)" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ background: "rgba(198,241,53,0.04)" }}
              transition={{ duration: 0.3 }}
              className={`px-6 py-6 text-center ${i < stats.length - 1 ? "border-r border-white/[0.06]" : ""}`}
            >
              <div className="text-xl font-bold text-neon font-mono mb-1">{s.num}</div>
              <div className="text-[10px] tracking-[1.5px] uppercase text-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.span className="text-[9px] tracking-[3px] uppercase text-muted/40 font-mono"
          animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}>
          scroll
        </motion.span>
        <motion.div className="w-px h-8 bg-gradient-to-b from-muted/20 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], originY: 0 }} transition={{ duration: 1.8, repeat: Infinity }} />
      </motion.div>
    </section>
  );
}
