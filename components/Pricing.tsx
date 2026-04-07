"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, staggerContainer, WHATSAPP_URL } from "@/lib/motion";

type Tab = "todos" | "lab" | "creativo" | "digital";

const packages: Record<Tab, Array<{
  badge: string;
  name: string;
  price: string;
  sub: string;
  items: string[];
  star?: boolean;
  cta: string;
}>> = {
  todos: [
    {
      badge: "// Alfa Lab",
      name: "Solo Lab",
      price: "$2,300",
      sub: "MXN · 2–3 días hábiles",
      items: ["Tabla nutrimental teórica", "Sellos NOM-051", "PDF + PNG para etiqueta"],
      cta: "Solicitar",
    },
    {
      badge: "// Más solicitado",
      name: "Inicio Producto",
      price: "$5,000",
      sub: "MXN · 1 semana",
      items: [
        "Tabla + sellos NOM-051",
        "Validación pre-impresión",
        "Branding de empaque",
        "Mockups incluidos",
      ],
      star: true,
      cta: "Solicitar",
    },
    {
      badge: "// Lanzamiento",
      name: "Lanzamiento",
      price: "$9,000",
      sub: "MXN · 2–3 semanas",
      items: [
        "Todo Inicio Producto",
        "Landing page + WhatsApp",
        "Setup marketplace",
        "Consultoría de sellos",
      ],
      cta: "Solicitar",
    },
    {
      badge: "// Marca Completa",
      name: "Marca Completa",
      price: "$12,000",
      sub: "MXN · 3–4 semanas",
      items: [
        "Todo Lanzamiento",
        "Branding e identidad",
        "Estrategia de redes",
        "Bot WhatsApp 24/7",
        "Automatizaciones",
      ],
      cta: "Cotizar",
    },
  ],
  lab: [
    {
      badge: "// Alfa Lab",
      name: "Tabla + Sellos",
      price: "$2,300",
      sub: "MXN · 2–3 días",
      items: [
        "Tabla nutrimental teórica NOM-051",
        "Sellos frontales de advertencia",
        "PDF + PNG para etiqueta",
      ],
      star: true,
      cta: "Solicitar",
    },
    {
      badge: "// Alfa Lab",
      name: "Validación pre-impresión",
      price: "$700",
      sub: "MXN · 1 día",
      items: [
        "Revisión de medidas y proporciones",
        "Cumplimiento NOM-051 completo",
        "Cero errores antes de imprenta",
      ],
      cta: "Solicitar",
    },
    {
      badge: "// Alfa Lab",
      name: "Asesoría de formulación y/o consultoría de sellos",
      price: "A cotizar",
      sub: "según producto",
      items: [
        "Análisis para reducir octágonos",
        "Ajuste de formulación o receta",
        "Evaluación de producto nuevo",
      ],
      cta: "Cotizar",
    },
  ],
  creativo: [
    {
      badge: "// Alfa Creativo",
      name: "Branding básico",
      price: "$3,000",
      sub: "MXN · 2–3 días",
      items: ["Logo profesional", "Paleta de colores", "Tipografía de marca"],
      cta: "Solicitar",
    },
    {
      badge: "// Más completo",
      name: "Branding de empaque",
      price: "$5,000",
      sub: "MXN · 1 semana",
      items: [
        "Todo Branding básico",
        "Diseño de etiqueta",
        "Mockups de producto",
        "Archivos para imprenta",
      ],
      star: true,
      cta: "Solicitar",
    },
  ],
  digital: [
    {
      badge: "// Alfa Digital",
      name: "Landing page",
      price: "$4,000",
      sub: "MXN · 5–7 días",
      items: [
        "Landing page de producto",
        "Botón WhatsApp integrado",
        "Integración con redes",
      ],
      cta: "Solicitar",
    },
    {
      badge: "// Alfa Digital",
      name: "Redes + contenido",
      price: "$2,500",
      sub: "MXN · 5 días",
      items: ["12 posts estáticos mensuales", "Diseño con identidad visual", "Copy incluido"],
      cta: "Solicitar",
    },
    {
      badge: "// Más completo",
      name: "Redes completo",
      price: "$6,000",
      sub: "MXN / mes",
      items: [
        "12 posts estáticos",
        "2 reels editados",
        "10 imágenes de producto",
        "Bot WhatsApp 24/7 incluido",
        "Copy incluido",
      ],
      star: true,
      cta: "Solicitar",
    },
    {
      badge: "// Alfa Digital",
      name: "Bot WhatsApp",
      price: "$2,000",
      sub: "MXN · 5–7 días",
      items: [
        "Atención automática 24/7",
        "Flujos personalizados",
        "CRM básico incluido",
      ],
      cta: "Solicitar",
    },
  ],
};

const tabs: { id: Tab; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "lab", label: "Lab" },
  { id: "creativo", label: "Creativo" },
  { id: "digital", label: "Digital" },
];

export default function Pricing() {
  const [tab, setTab] = useState<Tab>("todos");
  const pkgs = packages[tab];

  return (
    <section id="paquetes" className="py-28 max-w-7xl mx-auto px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-14"
      >
        <motion.div variants={fadeUp} className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-4">
          // Precios y paquetes
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight mb-4">
          Elige tu punto
          <br />
          de entrada
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted text-[15px] max-w-md leading-relaxed">
          Servicios individuales o paquetes integrados. Todo pensado para que no necesites más de un proveedor.
        </motion.p>
      </motion.div>

      {/* Tabs */}
      <div className="inline-flex border border-border rounded-lg overflow-hidden mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-6 py-2.5 text-[11px] tracking-[1px] uppercase transition-all duration-200 border-r border-border last:border-r-0 ${
              tab === t.id
                ? "bg-neon text-bg font-bold"
                : "bg-bg2 text-muted hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`grid gap-px bg-border border border-border rounded-xl overflow-hidden ${
          pkgs.length <= 2
            ? "md:grid-cols-2"
            : pkgs.length === 3
            ? "md:grid-cols-3"
            : "md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {pkgs.map((pkg, i) => (
          <div
            key={i}
            className={`flex flex-col p-7 ${
              pkg.star
                ? "bg-bg3 border-t-2 border-t-neon"
                : "bg-bg2 hover:bg-bg3 transition-colors"
            }`}
          >
            <div className="text-[9px] tracking-[2px] uppercase text-neon font-mono mb-3">
              {pkg.badge}
            </div>
            <div className="text-[17px] font-bold mb-1">{pkg.name}</div>
            <div className="text-[28px] font-bold text-neon font-mono my-3">{pkg.price}</div>
            <div className="text-[10px] text-muted tracking-[0.5px] mb-5">{pkg.sub}</div>

            <ul className="flex flex-col gap-2 flex-1 mb-6">
              {pkg.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-[12px] text-[#999]">
                  <span className="text-neon font-mono flex-shrink-0 mt-0.5 text-[11px]">→</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full text-center py-2.5 rounded text-[11px] tracking-[1px] uppercase font-semibold transition-all duration-200 ${
                pkg.star
                  ? "bg-neon text-bg hover:bg-neon-dim"
                  : "bg-transparent text-muted border border-border hover:border-neon/50 hover:text-neon"
              }`}
            >
              {pkg.cta}
            </a>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
