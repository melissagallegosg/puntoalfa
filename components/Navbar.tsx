"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WHATSAPP_URL } from "@/lib/motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Lab", href: "#lab" },
  { label: "Creativo", href: "#creativo" },
  { label: "Digital", href: "#digital" },
  { label: "Paquetes", href: "#paquetes" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.95]);
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: `rgba(10,10,10,${bgOpacity.get()})`,
        borderBottomColor: `rgba(30,30,30,${borderOpacity.get()})`,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 relative flex-shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Punto Alfa"
              fill
              className="object-contain"
              style={{ mixBlendMode: "screen" }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold tracking-[3px] text-white leading-none">
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
              className="text-[11px] tracking-[1.5px] uppercase text-muted hover:text-neon transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-5 py-2.5 rounded hover:bg-neon-dim transition-colors duration-200"
          >
            Cotizar →
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-bg2 border-t border-border px-6 py-6 flex flex-col gap-5"
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
            className="bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-5 py-3 rounded text-center mt-2"
          >
            Cotizar por WhatsApp →
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
