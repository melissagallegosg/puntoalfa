"use client";

import { motion } from "framer-motion";

const items = [
  "NOM-051",
  "Tabla Nutrimental",
  "Sellos de Advertencia",
  "Diseño de Etiqueta",
  "Landing Page",
  "WhatsApp Bot",
  "Branding de Empaque",
  "Marketplace Setup",
  "Validación Pre-impresión",
  "Estrategia Digital",
  "Food Startups",
  "Marcas Artesanales",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border py-4 bg-bg2">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #111111, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #111111, transparent)" }} />

      <motion.div
        className="flex gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        whileHover={{ animationPlayState: "paused" }}
        style={{ willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-12 flex-shrink-0">
            <span className="text-[11px] tracking-[3px] uppercase text-muted font-mono whitespace-nowrap hover:text-white transition-colors duration-300 cursor-default">
              {item}
            </span>
            <span className="text-neon text-xs">◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
