"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WHATSAPP_URL } from "@/lib/motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Lab",      href: "#lab" },
  { label: "Creativo", href: "#creativo" },
  { label: "Digital",  href: "#digital" },
  { label: "Paquetes", href: "#paquetes" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-[rgba(10,10,10,0.72)] border-b border-white/[0.06] shadow-[0_1px_0_rgba(198,241,53,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 relative flex-shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Punto Alfa"
              fill
              className="object-contain transition-all duration-500"
              style={{ mixBlendMode: "screen" }}
            />
          </div>
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
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative text-[11px] tracking-[1.5px] uppercase text-muted hover:text-white transition-colors duration-300 group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon group-hover:w-full transition-all duration-400" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-5 py-2.5 rounded transition-all duration-400 hover:shadow-[0_0_24px_rgba(198,241,53,0.35)] hover:scale-[1.03] active:scale-[0.98] group"
          >
            <span className="relative z-10">Cotizar →</span>
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden backdrop-blur-2xl bg-[rgba(10,10,10,0.90)] border-t border-white/[0.06] px-6 py-6 flex flex-col gap-5"
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[12px] tracking-[1.5px] uppercase text-muted hover:text-neon transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-5 py-3 rounded text-center mt-2 hover:shadow-[0_0_24px_rgba(198,241,53,0.3)] transition-all duration-300"
          >
            Cotizar por WhatsApp →
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
