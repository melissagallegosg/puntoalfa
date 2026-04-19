"use client";

import { motion, useScroll, useMotionValueEvent, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useRef } from "react";
import { WHATSAPP_URL, EASE_OUT_EXPO } from "@/lib/motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Servicios",  href: "#servicios" },
  { label: "Para quién", href: "#para-quien" },
  { label: "Proceso",    href: "#proceso" },
  { label: "Precios",    href: "#paquetes" },
];

function MagneticLink({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.22);
    y.set((e.clientY - r.top - r.height / 2) * 0.22);
  }, [x, y]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return (
    <motion.a ref={ref} href={href} style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className="relative text-[12px] tracking-[0.5px] text-muted hover:text-white transition-colors duration-300 group py-1"
    >
      {label}
      <motion.span className="absolute -bottom-0.5 left-0 right-0 h-px bg-neon"
        initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }}
        style={{ originX: 0 }} transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
      />
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-7 h-7 relative flex-shrink-0">
                <Image src="/images/logo.jpg" alt="Punto Alfa" fill sizes="28px"
                  className="object-contain" style={{ mixBlendMode: "screen" }} priority />
              </div>
              <span className="text-[12px] font-bold tracking-[3px] uppercase">Punto Alfa</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => <MagneticLink key={l.href} href={l.href} label={l.label} />)}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+528125970372"
                className="text-[11px] text-muted/60 hover:text-white transition-colors tracking-[0.5px] font-mono">
                (81) 2597-0372
              </a>
              <div className="w-px h-4 bg-white/[0.08]" />
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-4 py-2 rounded hover:shadow-[0_0_30px_rgba(198,241,53,0.4)] transition-shadow duration-300">
                Cotizar →
              </a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-muted hover:text-white transition-colors p-1" aria-label="Menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {menuOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-bg/96 backdrop-blur-xl flex flex-col pt-20 px-6">
          <div className="flex flex-col gap-6">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-[20px] font-bold text-white hover:text-neon transition-colors">{l.label}</a>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center bg-neon text-bg text-[13px] font-bold tracking-[1px] uppercase px-6 py-4 rounded">
              Cotizar gratis →
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
