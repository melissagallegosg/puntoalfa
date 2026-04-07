"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, staggerContainer, WHATSAPP_URL } from "@/lib/motion";

const arms = [
  {
    id: "lab",
    tag: "Alfa Lab",
    name: "Ciencia y normativa",
    icon: "⬡",
    color: "neon",
    accent: "#C6F135",
    description:
      "Tabla nutrimental teórica, sellos NOM-051 y cumplimiento regulatorio completo. Sin laboratorio inicial. Entrega en 2–3 días hábiles.",
    services: [
      "Tabla nutrimental teórica NOM-051",
      "Sellos frontales de advertencia (octágonos)",
      "Consultoría de reducción de sellos",
      "Validación pre-impresión",
      "Evaluación de producto nuevo",
      "Adaptación FDA para exportación EUA",
    ],
    price: "Desde $2,000 MXN",
    time: "2–3 días",
  },
  {
    id: "creativo",
    tag: "Alfa Creativo",
    name: "Diseño e identidad",
    icon: "◈",
    color: "lavender",
    accent: "#AFA9EC",
    description:
      "Branding, diseño de etiqueta regulatoria y empaque. Identidad visual que conecta tu producto con el consumidor correcto.",
    services: [
      "Branding básico (logo + paleta + tipografía)",
      "Diseño de etiqueta regulatoria",
      "Branding de empaque + mockups",
      "Identidad visual completa",
      "Archivos para imprenta listos",
    ],
    price: "Desde $3,000 MXN",
    time: "1 semana",
  },
  {
    id: "digital",
    tag: "Alfa Digital",
    name: "Presencia y automatización",
    icon: "⟁",
    color: "sky-blue",
    accent: "#85B7EB",
    description:
      "Landing page, redes sociales y automatizaciones. Tu marca activa 24/7 desde el día del lanzamiento.",
    services: [
      "Landing page + integración WhatsApp",
      "Estrategia de redes + contenido mensual",
      "Bot WhatsApp 24/7",
      "Setup marketplace (FB, IG, MercadoLibre)",
      "Automatizaciones y CRM básico",
    ],
    price: "Desde $2,500 MXN",
    time: "5–7 días",
  },
];

export default function Services() {
  const [active, setActive] = useState("lab");
  const activeArm = arms.find((a) => a.id === active)!;

  return (
    <section id="servicios" className="py-28 max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-16"
      >
        <motion.div variants={fadeUp} className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-4">
          // Sistema de servicios
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight mb-4">
          Las tres áreas
          <br />
          de Punto Alfa
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted text-[15px] leading-relaxed max-w-md">
          Cada área resuelve una fase del lanzamiento. Puedes contratar una o activarlas todas.
        </motion.p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-0 border border-border rounded-lg overflow-hidden mb-1 w-full md:w-auto md:inline-flex">
        {arms.map((arm) => (
          <button
            key={arm.id}
            onClick={() => setActive(arm.id)}
            className={`flex-1 md:flex-none px-6 py-3 text-[11px] tracking-[1px] uppercase font-semibold transition-all duration-200 border-r border-border last:border-r-0 ${
              active === arm.id
                ? "bg-neon text-bg"
                : "bg-bg2 text-muted hover:text-white"
            }`}
          >
            {arm.tag}
          </button>
        ))}
      </div>

      {/* Active card */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-2 border border-border rounded-lg overflow-hidden"
      >
        {/* Left info */}
        <div
          id={activeArm.id}
          className="bg-bg2 p-8 md:p-10 border-b md:border-b-0 md:border-r border-border"
        >
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-lg border border-border flex items-center justify-center text-2xl bg-bg"
              style={{ borderColor: `${activeArm.accent}20` }}
            >
              {activeArm.icon}
            </div>
            <div>
              <div
                className="text-[9px] tracking-[2px] uppercase font-mono mb-1"
                style={{ color: activeArm.accent }}
              >
                {activeArm.tag}
              </div>
              <div className="text-[18px] font-bold">{activeArm.name}</div>
            </div>
          </div>

          <p className="text-muted text-[14px] leading-relaxed mb-8">
            {activeArm.description}
          </p>

          <div className="flex items-center gap-6 mb-8">
            <div>
              <div className="text-[10px] tracking-[2px] uppercase text-muted mb-1">Precio</div>
              <div
                className="text-xl font-bold font-mono"
                style={{ color: activeArm.accent }}
              >
                {activeArm.price}
              </div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-[10px] tracking-[2px] uppercase text-muted mb-1">Entrega</div>
              <div className="text-xl font-bold font-mono text-white">{activeArm.time}</div>
            </div>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-neon text-bg text-[12px] font-bold tracking-[1px] uppercase px-6 py-3 rounded hover:bg-neon-dim transition-colors"
          >
            Cotizar este servicio →
          </a>
        </div>

        {/* Right: service list */}
        <div className="bg-bg3 p-8 md:p-10">
          <div className="text-[10px] tracking-[3px] uppercase text-muted font-mono mb-6">
            // Incluye
          </div>
          <ul className="flex flex-col gap-4">
            {activeArm.services.map((svc, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 text-[13px] text-[#ccc]"
              >
                <span className="text-neon font-mono mt-0.5 flex-shrink-0">→</span>
                {svc}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Sub-section anchors */}
      <div className="hidden">
        <div id="lab" /><div id="creativo" /><div id="digital" />
      </div>
    </section>
  );
}
