"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { fadeUp, staggerContainer, wordReveal, staggerWords, WHATSAPP_URL, EASE_OUT_EXPO } from "@/lib/motion";
import { useRef, useEffect, useState, useCallback } from "react";

/* ── Animated counter ── */
function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const isNum = /^\d+/.test(value);

  useEffect(() => {
    if (!isNum) { setDisplay(value); return; }
    const num = parseInt(value);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const duration = 1400;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplay(Math.floor(eased * num).toString());
        if (progress < 1) requestAnimationFrame(step);
        else setDisplay(value);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, isNum]);

  return <div ref={ref}>{display}{suffix}</div>;
}

/* ── Word-split headline ── */
function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      initial="hidden"
      animate="visible"
      style={{ display: "inline" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordReveal}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Magnetic button ── */
function MagneticButton({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.28);
    y.set((e.clientY - cy) * 0.28);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

const stats = [
  { num: "NOM",  suffix: "-051", label: "Cumplimiento normativo" },
  { num: "2",    suffix: "–3d",  label: "Entrega tabla nutrimental" },
  { num: "2000", suffix: "+",    label: "Desde MXN por servicio" },
  { num: "3",    suffix: "",     label: "Áreas especializadas" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  /* Animated SVG line draw */
  const pathLength = useSpring(useTransform(scrollYProgress, [0, 0.3], [1, 0.3]), {
    stiffness: 60, damping: 20,
  });

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Ambient orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="orb float-glow"
          style={{
            width: 720, height: 720,
            top: "2%", left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(198,241,53,1) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.09, 0.16, 0.09] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="orb"
          style={{
            width: 420, height: 420,
            bottom: "12%", left: "8%",
            background: "radial-gradient(circle, rgba(175,169,236,1) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.05, 0.10, 0.05] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="orb"
          style={{
            width: 280, height: 280,
            top: "30%", right: "8%",
            background: "radial-gradient(circle, rgba(133,183,235,1) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* ── Grid ── */}
      <div className="absolute inset-0 grid-pattern opacity-25" />

      {/* ── Animated vertical accent lines ── */}
      <motion.div
        className="absolute left-[10%] top-0 w-px h-full"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(198,241,53,0.18), transparent)" }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-0 w-px h-full"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(198,241,53,0.12), transparent)" }}
        animate={{ opacity: [0.8, 0.2, 0.8] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── SVG decorative line that draws on load ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M -20 300 Q 200 100 500 200 T 1000 150 T 1500 250"
            fill="none"
            stroke="rgba(198,241,53,0.12)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 2.5, ease: EASE_OUT_EXPO, delay: 0.5 }, opacity: { duration: 0.8 } }}
          />
          <motion.path
            d="M 1600 500 Q 1200 300 900 450 T 400 380 T -50 420"
            fill="none"
            stroke="rgba(175,169,236,0.08)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 2.8, ease: EASE_OUT_EXPO, delay: 0.9 }, opacity: { duration: 0.8, delay: 0.9 } }}
          />
        </svg>
      </div>

      {/* ── Content with parallax ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-16"
      >
        {/* Badge — fade in first */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
          className="flex items-center gap-2 mb-10 w-fit"
        >
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-neon flex-shrink-0" />
          <span className="text-[10px] tracking-[3px] uppercase text-neon font-mono border border-neon/25 px-4 py-1.5 rounded-sm backdrop-blur-sm bg-neon/[0.04]">
            Industria Alimentaria · México
          </span>
        </motion.div>

        {/* Headline — word by word */}
        <h1 className="text-[clamp(54px,9vw,108px)] font-bold leading-[0.91] tracking-[-3px] mb-9 max-w-4xl">
          <WordReveal text="De la receta" delay={0.25} />
          <br />
          <span style={{ display: "inline-block" }}>
            <WordReveal text="al" delay={0.38} />
            {" "}
            <motion.span
              className="text-neon neon-text-glow italic"
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.52 }}
              style={{ display: "inline-block" }}
            >
              mercado.
            </motion.span>
          </span>
        </h1>

        {/* Subheadline — fade up */}
        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.65 }}
          className="text-[17px] text-muted leading-relaxed max-w-[520px] mb-12"
        >
          Ciencia, diseño y estrategia para emprendedores alimentarios.
          Un solo equipo para cumplir norma, diseñar tu marca y lanzar tu producto.
        </motion.p>

        {/* CTAs — magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.78 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <MagneticButton
            href={WHATSAPP_URL}
            className="group relative bg-neon text-bg text-[13px] font-bold tracking-[1px] uppercase px-8 py-4 rounded overflow-hidden transition-shadow duration-400 hover:shadow-[0_0_50px_rgba(198,241,53,0.4)] cursor-pointer"
          >
            <span className="relative z-10">Iniciar proyecto →</span>
            <motion.div
              className="absolute inset-0 bg-white/15"
              initial={{ x: "-100%", skewX: "-12deg" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            />
          </MagneticButton>

          <MagneticButton
            href="#servicios"
            className="text-[13px] tracking-[1px] uppercase px-8 py-4 rounded border border-white/[0.08] hover:border-neon/40 hover:text-neon hover:bg-neon/[0.04] backdrop-blur-sm transition-all duration-400 text-muted cursor-pointer"
          >
            Ver servicios
          </MagneticButton>
        </motion.div>

        {/* Stats bar — animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.95 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden border border-white/[0.07] backdrop-blur-xl"
          style={{ background: "rgba(17,17,17,0.55)" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ background: "rgba(198,241,53,0.04)" }}
              transition={{ duration: 0.3 }}
              className={`px-6 py-7 text-center group ${i < stats.length - 1 ? "border-r border-white/[0.06]" : ""}`}
            >
              <div className="text-2xl font-bold text-neon font-mono mb-1">
                <AnimatedNumber value={s.num} suffix={s.suffix} />
              </div>
              <div className="text-[10px] tracking-[1.5px] uppercase text-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.span
          className="text-[9px] tracking-[3px] uppercase text-muted/40 font-mono"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          scroll
        </motion.span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-muted/20 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
