"use client";

import { motion, useScroll, useMotionValueEvent, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import { WHATSAPP_URL, EASE_OUT_EXPO } from "@/lib/motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Lab",      href: "#lab" },
  { label: "Creativo", href: "#creativo" },
  { label: "Digital",  href: "#digital" },
  { label: "Paquetes", href: "#paquetes" },
];

/* ── Magnetic nav link ── */
function MagneticLink({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.22);
  }, [x, y]);
  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative text-[11px] tracking-[1.5px] uppercase text-muted hover:text-white transition-colors duration-300 group px-2 py-1"
    >
      {label}
      <motion.span
        className="absolute -bottom-0.5 left-2 right-2 h-px bg-neon"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
      />
    </motion.a>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.05 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-[rgba(10,10,10,0.75)] border-b border-white/[0.06] shadow-[0_1px_0_rgba(198,241,53,0.05)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="w-9 h-9 relative flex-shrink-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          >
            <Image
              src="/images/logo.jpg"
              alt="Punto Alfa"
              fill
              className="object-contain"
              style={{ mixBlendMode: "screen" }}
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold tracking-[3px] text-white leading-none group-hover:text-neon transition-colors duration-300">
              PUNTO ALFA
            </span>
            <span className="text-[8px] tracking-[2.5px] text-muted uppercase leading-none mt-0.5">
              Convirtiendo recetas en marcas
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((l) => (
            <MagneticLink key={l.label} href={l.href} label={l.label} />
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-5 py-2.5 rounded cursor-pointer"
            whileHover={{ boxShadow: "0 0 28px rgba(198,241,53,0.4)", scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            <span className="relative z-10">Cotizar →</span>
            <motion.div
              className="absolute inset-0 bg-white/12"
              initial={{ x: "-110%", skewX: "-12deg" }}
              whileHover={{ x: "110%" }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            />
          </motion.a>
        </div>

        {/* Mobile burger */}
        <motion.button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="md:hidden backdrop-blur-2xl bg-[rgba(10,10,10,0.92)] border-t border-white/[0.06] px-6 py-6 flex flex-col gap-5"
        >
          {navLinks.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: EASE_OUT_EXPO }}
              className="text-[12px] tracking-[1.5px] uppercase text-muted hover:text-neon transition-colors"
            >
              {l.label}
            </motion.a>
          ))}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.4, ease: EASE_OUT_EXPO }}
            className="bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-5 py-3 rounded text-center mt-2"
          >
            Cotizar por WhatsApp →
          </motion.a>
        </motion.div>
      )}
    </motion.nav>
  );
}
