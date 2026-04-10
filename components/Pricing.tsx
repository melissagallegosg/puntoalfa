"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, staggerContainer, fadeScale } from "@/lib/motion";
import { WHATSAPP_URL } from "@/lib/motion";

type Tab = "todos" | "lab" | "creativo" | "digital";

type PkgItem = {
  label: string;
  sub?: string;
  subitems?: string[];
};

const packages: Record<Tab, Array<{
  badge: string;
  name: string;
  price: string;
  sub: string;
  description?: string;
  items: (string | PkgItem)[];
  star?: boolean;
  cta: string;
}>> = {
  todos: [
    {
      badge: "// Alfa Lab",
      name: "Solo Lab",
      price: "$2,300",
      sub: "MXN · 2–3 días hábiles",
      items: [
        "Tabla nutrimental teórica + sellos NOM-051",
        "PDF + PNG para etiqueta",
      ],
      cta: "Solicitar",
    },
    {
      badge: "// Más solicitado",
      name: "Inicio Producto",
      price: "$5,000",
      sub: "MXN · 1 semana",
      items: [
        "Tabla + sellos NOM-051",
        "Validación pre-impresión NOM-051",
        "Etiqueta + imagen de producto (etiqueta + mockups)",
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
        "Landing page + botón WhatsApp",
        "Estrategia de redes + contenido inicial (12 posts, copy incluido)",
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
        "Branding e identidad completa",
        "Estrategia de redes + contenido completo",
        "Automatizaciones básicas",
      ],
      cta: "Cotizar",
    },
  ],
  lab: [
    {
      badge: "// Alfa Lab",
      name: "Tabla nutrimental + sellos NOM-051",
      price: "$2,300",
      sub: "MXN · 2–3 días",
      items: [
        "Tabla nutrimental teórica NOM-051",
        "Sellos frontales de advertencia",
        "PDF + PNG para etiqueta",
        "Validación pre-impresión NOM-051",
        "Revisión de medidas y proporciones",
        "Cumplimiento NOM-051 completo",
        "Cero errores antes de imprenta",
      ],
      star: true,
      cta: "Solicitar",
    },
    {
      badge: "// Alfa Lab",
      name: "Consultoría de formulación o reducción de sellos",
      price: "A cotizar",
      sub: "Variable según producto",
      items: [
        "Formulación de producto desde cero",
        "Análisis para reducir octágonos",
        "Evaluación de producto nuevo",
      ],
      cta: "Cotizar",
    },
  ],
  creativo: [
    {
      badge: "// Alfa Creativo",
      name: "Identidad básica de marca",
      price: "$3,000",
      sub: "MXN · 2–3 días",
      items: [
        "Logo funcional (listo para usar)",
        "Paleta de colores",
        "Tipografía recomendada",
      ],
      cta: "Solicitar",
    },
    {
      badge: "// Más completo",
      name: "Etiqueta + imagen de producto lista para venta",
      price: "$5,000",
      sub: "MXN · 1 semana",
      description: "Diseño completo de tu producto para que puedas vender desde el inicio sin errores comunes.",
      items: [
        {
          label: "Identidad básica incluida",
          sub: "Logo funcional, colores y tipografía",
        },
        {
          label: "Diseño de etiqueta estructurado correctamente",
          sub: "Conforme a criterios de normativa:",
          subitems: [
            "Información obligatoria organizada",
            "Lista de ingredientes en orden correcto",
            "Denominación adecuada del producto",
            "Contenido neto en unidades correctas",
            "Tabla nutrimental correctamente formateada",
            "Determinación e integración de sellos con medidas correctas",
          ],
        },
        {
          label: "Mockups realistas",
          sub: "Para presentación o venta",
        },
        {
          label: "Archivos listos para imprenta",
          sub: "Adaptados a tu envase y formato de impresión",
        },
      ],
      star: true,
      cta: "Solicitar",
    },
  ],
  digital: [
    {
      badge: "// Alfa Digital",
      name: "Landing page de producto",
      price: "$4,000",
      sub: "MXN · 5–7 días",
      items: [
        "Landing page de producto",
        "Botón WhatsApp integrado",
        "Integración con redes sociales",
      ],
      cta: "Solicitar",
    },
    {
      badge: "// Alfa Digital",
      name: "Redes + contenido inicial",
      price: "$2,500",
      sub: "MXN · 5 días",
      items: [
        "12 posts estáticos mensuales",
        "Diseño adaptado a tu identidad visual",
        "Copy incluido",
      ],
      cta: "Solicitar",
    },
    {
      badge: "// Más completo",
      name: "Redes + contenido completo",
      price: "$6,000",
      sub: "MXN / mes",
      items: [
        "12 posts estáticos mensuales",
        "Edición de 2 reels (tú grabas, nosotros editamos)",
        "10 imágenes de producto/servicio",
        "Diseño adaptado a tu identidad visual",
        "Copy incluido",
        "Bot WhatsApp 24/7 incluido",
      ],
      star: true,
      cta: "Solicitar",
    },
    {
      badge: "// Alfa Digital",
      name: "Bot WhatsApp 24/7",
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
  { id: "todos",    label: "Todos" },
  { id: "lab",      label: "Lab" },
  { id: "creativo", label: "Creativo" },
  { id: "digital",  label: "Digital" },
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
      <div className="inline-flex glass rounded-lg overflow-hidden mb-8 p-0.5 gap-0.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-6 py-2.5 text-[11px] tracking-[1px] uppercase transition-all duration-350 rounded-md ${
              tab === t.id
                ? "bg-neon text-bg font-bold shadow-[0_0_16px_rgba(198,241,53,0.25)]"
                : "text-muted hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`grid gap-4 ${
          pkgs.length <= 2
            ? "md:grid-cols-2"
            : pkgs.length === 3
            ? "md:grid-cols-3"
            : "md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {pkgs.map((pkg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
            className={`flex flex-col p-7 rounded-xl glass glass-hover relative overflow-hidden group ${
              pkg.star ? "border border-neon/25 shadow-[0_0_30px_rgba(198,241,53,0.07)]" : ""
            }`}
          >
            {/* Star top accent */}
            {pkg.star && (
              <div className="absolute top-0 left-0 right-0 h-px border-beam" />
            )}

            <div className="text-[9px] tracking-[2px] uppercase text-neon font-mono mb-3">
              {pkg.badge}
            </div>
            <div className="text-[17px] font-bold mb-1 group-hover:text-neon transition-colors duration-400">{pkg.name}</div>
            <div className="text-[28px] font-bold text-neon font-mono my-3">{pkg.price}</div>
            <div className="text-[10px] text-muted tracking-[0.5px] mb-3">{pkg.sub}</div>

            {pkg.description && (
              <p className="text-[11px] text-muted/80 leading-relaxed mb-4 border-l-2 border-neon/30 pl-3">
                {pkg.description}
              </p>
            )}

            <ul className="flex flex-col gap-3 flex-1 mb-6">
              {pkg.items.map((item, j) => {
                if (typeof item === "string") {
                  return (
                    <li key={j} className="flex items-start gap-2 text-[12px] text-[#999]">
                      <span className="text-neon font-mono flex-shrink-0 mt-0.5 text-[11px]">→</span>
                      {item}
                    </li>
                  );
                }
                return (
                  <li key={j} className="flex flex-col gap-1">
                    <div className="flex items-start gap-2">
                      <span className="text-neon font-mono flex-shrink-0 mt-0.5 text-[11px]">→</span>
                      <div>
                        <span className="text-[12px] text-[#ccc] font-semibold">{item.label}</span>
                        {item.sub && (
                          <p className="text-[11px] text-muted mt-0.5">{item.sub}</p>
                        )}
                        {item.subitems && (
                          <ul className="mt-1.5 flex flex-col gap-1 pl-1">
                            {item.subitems.map((s, k) => (
                              <li key={k} className="flex items-start gap-1.5 text-[11px] text-muted">
                                <span className="text-neon/50 font-mono flex-shrink-0 text-[10px] mt-0.5">·</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full text-center py-2.5 rounded text-[11px] tracking-[1px] uppercase font-semibold transition-all duration-400 ${
                pkg.star
                  ? "bg-neon text-bg hover:shadow-[0_0_24px_rgba(198,241,53,0.35)] hover:scale-[1.02]"
                  : "bg-transparent text-muted border border-white/[0.08] hover:border-neon/40 hover:text-neon hover:bg-neon/[0.04]"
              }`}
            >
              {pkg.cta}
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
