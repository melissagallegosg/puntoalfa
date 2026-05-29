"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { fadeUp, staggerContainer, WHATSAPP_URL, waUrl } from "@/lib/motion";

const arms = [
  {
    id: "lab",
    tag: "Alfa NOM",
    name: "Ciencia y normativa",
    icon: "⬡",
    color: "neon",
    accent: "#C6F135",
    description:
      "Tabla nutrimental teórica, sellos NOM-051 y cumplimiento regulatorio completo mediante cálculo teórico. Entrega en 2–3 días hábiles.",
    services: [
      "Tabla nutrimental + sellos $800 (precio promocional)",
      "Sellos frontales de advertencia (octágonos)",
    ],
    price: "$800 MXN",
    priceSub: "Precio promocional · Precio normal $1,600 MXN",
    time: "2–3 días",
    waMsg: "Hola Punto Alfa 👋 Me interesa el área de *Alfa NOM* (tabla nutrimental + sellos NOM-051). ¿Me pueden orientar sobre qué servicio necesito?",
  },
  {
    id: "creativo",
    tag: "Alfa Creativo",
    name: "Diseño e identidad",
    icon: "◈",
    color: "lavender",
    accent: "#AFA9EC",
    description:
      "Identidad visual y diseño de etiqueta regulatoria. Tu producto con la imagen correcta para vender desde el primer día.",
    services: [
      "Paquete 1 — Etiqueta + imagen de producto lista para venta (identidad + etiqueta estructurada + mockups)",
      "Archivos listos para imprenta",
    ],
    price: "Desde $5,000 MXN",
    time: "1 semana",
    waMsg: "Hola Punto Alfa 👋 Me interesa el área de *Alfa Creativo* (identidad de marca + diseño de etiqueta). ¿Me pueden orientar sobre qué servicio necesito?",
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
      "Landing page de producto $5,000",
      "Estrategia de redes + contenido inicial (15 posts estáticos, copy incluido · entrega 5 días)",
      "Estrategia de redes completa (12 posts + 2 reels + 10 imágenes de producto, copy incluido)",
      "Bot WhatsApp 24/7 con flujos personalizados ($3,000 MXN/mes)",
    ],
    price: "Desde $2,500 MXN",
    time: "5–7 días",
    waMsg: "Hola Punto Alfa 👋 Me interesa el área de *Alfa Digital* (landing page, redes o bot WhatsApp). ¿Me pueden orientar sobre qué servicio necesito?",
  },
];

const labDetails = {
  problema: {
    titulo: "Sin tabla nutrimental, tu producto no puede venderse legalmente",
    cuerpo:
      "Todo alimento preenvasado en México está obligado a llevar una declaración nutrimental conforme a la NOM-051. Sin ella, tu producto está expuesto a multas y retiro forzoso del mercado.",
    nota:
      "Muchos emprendedores no saben que el análisis de laboratorio no es obligatorio para iniciar. La norma acepta el cálculo teórico, que es más rápido y económico.",
    puntos: [
      {
        titulo: "Cumplimiento NOM-051 obligatorio",
        desc: "Para cualquier alimento envasado que se venda en territorio nacional, sin importar si es producción nacional o importada.",
      },
      {
        titulo: "Sellos frontales de advertencia",
        desc: "La reforma de 2020 exige la determinación de octágonos según los valores por 100 g ó 100 ml del producto.",
      },
      {
        titulo: "El cálculo teórico es 100% legal",
        desc: "El inciso 4.2.8.3.8 de la NOM-051 permite el uso de bases de datos reconocidas internacionalmente.",
      },
      {
        titulo: "Archivos listos para imprimir",
        desc: "Recibes PDF + PNG de la tabla y los sellos, con las proporciones y tipografías correctas según norma.",
      },
    ],
  },
  proceso: [
    {
      num: "1",
      titulo: "Envías tu formulación",
      desc: "Lista completa de ingredientes con cantidades en gramos. Por WhatsApp o correo.",
    },
    {
      num: "2",
      titulo: "Realizamos el cálculo",
      desc: "Usando bases de datos nutrimentales reconocidas internacionalmente, con metodología precisa.",
    },
    {
      num: "3",
      titulo: "Determinamos tus sellos",
      desc: "Evaluamos cada componente según los criterios de la NOM-051 (por 100 g ó 100 ml).",
    },
    {
      num: "4",
      titulo: "Entrega final",
      desc: "PDF + PNG de tu tabla nutrimental y sellos, listos para insertar en tu diseño de etiqueta.",
    },
  ],
  baseLegal: {
    cita:
      '"Los valores de composición bromatológica que figuren en la declaración de nutrimentos del alimento o bebida no alcohólica preenvasado, deben ser valores medios ponderados derivados por análisis, bases de datos o tablas reconocidas internacionalmente."',
    referencia: "— NOM-051-SCFI/SSAI-2010, inciso 4.2.8.3.8",
    puntos: [
      {
        titulo: "Aceptada por el 99% del mercado",
        desc: "La práctica totalidad de productos envasados en México usa cálculo teórico, no análisis de laboratorio.",
      },
      {
        titulo: "Sin necesidad de muestras físicas",
        desc: "Solo necesitamos tu receta y formulación. No hay envíos, no hay costos adicionales de laboratorio.",
      },
      {
        titulo: "Válida para puntos de venta y distribuidores",
        desc: "Supermercados, tiendas especializadas y canales de distribución aceptan tablas por cálculo teórico.",
      },
      {
        titulo: "Base para escalar a laboratorio",
        desc: "Cuando tu producto crezca, la tabla teórica sirve de referencia para el análisis bromatológico formal.",
      },
    ],
  },
  requisitos: {
    lista: [
      {
        num: "01",
        titulo: "Lista completa de ingredientes",
        desc: "Con cantidades exactas en gramos (incluidos líquidos).",
      },
      {
        num: "02",
        titulo: "Peso del producto final",
        desc: "Cuántos gramos o mililitros tiene el producto terminado.",
      },
      {
        num: "03",
        titulo: "Tamaño de porción",
        desc: "El peso de la porción que se declara en el empaque.",
      },
      {
        num: "04",
        titulo: "Proceso de elaboración",
        desc: "Si hay cocción u otro proceso térmico, indicar el peso antes y después.",
      },
      {
        num: "05",
        titulo: "Ingredientes procesados",
        desc: "Si usas productos envasados como ingrediente, compartir su etiqueta nutrimental.",
      },
    ],
    cuandoLab: [
      "Producción a gran escala con certificación documental",
      "Exportación a mercados que lo exigen específicamente",
      "Productos con formulación muy compleja o ingredientes poco documentados",
      "Cuando el cliente o distribuidor lo solicita expresamente",
    ],
  },
};

type LabTab = "problema" | "proceso" | "legal" | "requisitos";

function LabExpandable() {
  const [labTab, setLabTab] = useState<LabTab>("problema");

  const labTabs: { id: LabTab; label: string }[] = [
    { id: "problema", label: "El problema" },
    { id: "proceso", label: "Proceso" },
    { id: "legal", label: "Base legal" },
    { id: "requisitos", label: "Requisitos" },
  ];

  return (
    <div className="mt-4 border border-neon/20 rounded-lg overflow-hidden bg-bg">
      <div className="flex border-b border-border overflow-x-auto">
        {labTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setLabTab(t.id)}
            className={`flex-shrink-0 px-5 py-3 text-[10px] tracking-[1.5px] uppercase transition-all duration-200 border-r border-border last:border-r-0 ${
              labTab === t.id
                ? "text-neon bg-neon/5 font-bold"
                : "text-muted hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={labTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="p-6"
        >
          {labTab === "problema" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[14px] font-bold mb-2 leading-snug">
                  {labDetails.problema.titulo}
                </h4>
                <p className="text-muted text-[12px] leading-relaxed mb-4">
                  {labDetails.problema.cuerpo}
                </p>
                <div className="border-l-2 border-neon/40 pl-4 py-1">
                  <p className="text-[11px] text-[#aaa] leading-relaxed">
                    {labDetails.problema.nota}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {labDetails.problema.puntos.map((p, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-neon text-[8px]">✓</span>
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold mb-0.5">{p.titulo}</div>
                      <div className="text-muted text-[11px] leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {labTab === "proceso" && (
            <div>
              <p className="text-muted text-[12px] mb-5">
                No necesitas ser experto en normativa. Solo comparte los datos de tu producto y nos encargamos del resto.
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                {labDetails.proceso.map((s, i) => (
                  <div key={i} className="bg-bg2 border border-border rounded-lg p-4">
                    <div className="w-7 h-7 rounded-full bg-neon text-bg text-[11px] font-bold flex items-center justify-center mb-3">
                      {s.num}
                    </div>
                    <div className="text-[12px] font-semibold mb-1">{s.titulo}</div>
                    <div className="text-muted text-[11px] leading-relaxed">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {labTab === "legal" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[13px] font-bold mb-3">¿La tabla teórica es válida y legal?</h4>
                <p className="text-muted text-[12px] leading-relaxed mb-4">
                  Sí. La propia Norma Oficial Mexicana lo permite explícitamente. No necesitas análisis de laboratorio para comenzar a comercializar tu producto.
                </p>
                <div className="bg-bg2 border border-border rounded-lg p-4 mb-3">
                  <p className="text-[11px] text-[#aaa] leading-relaxed italic mb-2">
                    {labDetails.baseLegal.cita}
                  </p>
                  <p className="text-[10px] text-neon/70 font-mono">{labDetails.baseLegal.referencia}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {labDetails.baseLegal.puntos.map((p, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-neon text-[8px]">✓</span>
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold mb-0.5">{p.titulo}</div>
                      <div className="text-muted text-[11px] leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {labTab === "requisitos" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[13px] font-bold mb-4">¿Qué necesito para empezar?</h4>
                <div className="flex flex-col divide-y divide-border border border-border rounded-lg overflow-hidden">
                  {labDetails.requisitos.lista.map((r, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-bg2 hover:bg-bg3 transition-colors">
                      <span className="text-neon font-mono text-[10px] mt-0.5 flex-shrink-0">{r.num}</span>
                      <div>
                        <div className="text-[12px] font-semibold">{r.titulo}</div>
                        <div className="text-muted text-[11px] leading-relaxed">{r.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-bg2 border border-border rounded-lg p-4">
                <h5 className="text-[12px] font-bold mb-3">¿Cuándo sí necesitas laboratorio?</h5>
                <p className="text-muted text-[11px] leading-relaxed mb-3">
                  El análisis bromatológico se recomienda en casos específicos. La tabla teórica es el primer paso ideal para emprendedores:
                </p>
                <ul className="flex flex-col gap-2">
                  {labDetails.requisitos.cuandoLab.map((item, i) => (
                    <li key={i} className="flex gap-2 text-[11px] text-[#aaa]">
                      <span className="text-neon font-mono flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-neon/80 mt-4 leading-relaxed">
                  Para la etapa de lanzamiento, el cálculo teórico es suficiente, legal y mucho más ágil.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="px-6 py-4 border-t border-border flex items-center gap-2">
        <span className="text-neon font-mono text-[11px]">→</span>
        <a
          href="#preguntas-frecuentes"
          className="text-[11px] text-neon/70 hover:text-neon underline underline-offset-2 transition-colors duration-200"
        >
          ¿Por qué el cálculo teórico es legal? Ver base normativa →
        </a>
      </div>
    </div>
  );
}

// Collapsible for Creativo service list
function CreativoExpandable({ services }: { services: string[] }) {
  const [open, setOpen] = useState(false);
  const preview = services[0];
  const rest = services.slice(1);

  return (
    <div>
      <ul className="flex flex-col gap-4">
        <motion.li
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-start gap-3 text-[13px] text-[#ccc]"
        >
          <span className="text-lavender font-mono mt-0.5 flex-shrink-0" style={{ color: "#AFA9EC" }}>→</span>
          {preview}
        </motion.li>

        <AnimatePresence>
          {open && rest.map((svc, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="flex items-start gap-3 text-[13px] text-[#ccc] overflow-hidden"
            >
              <span className="font-mono mt-0.5 flex-shrink-0" style={{ color: "#AFA9EC" }}>→</span>
              {svc}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <button
        onClick={() => setOpen(!open)}
        className="mt-5 flex items-center gap-2 text-[11px] tracking-[1px] uppercase font-semibold transition-colors duration-200 group"
        style={{ color: open ? "#AFA9EC" : "#666" }}
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.25 }}
          className="font-mono"
          style={{ color: "#AFA9EC" }}
        >
          →
        </motion.span>
        {open ? "Ver menos" : `Ver ${rest.length} servicios más`}
      </button>
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState<string | null>(null);
  const [labOpen, setLabOpen] = useState(false);
  const activeArm = arms.find((a) => a.id === active);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (arms.some((a) => a.id === hash)) {
        setActive(hash);
        setLabOpen(false);
        setTimeout(() => {
          document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <section id="servicios" className="py-28 max-w-7xl mx-auto px-6">
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

      {/* 3 cards — click abre/cierra el panel de esa área */}
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        {arms.map((arm) => {
          const isOpen = active === arm.id;
          return (
            <button
              key={arm.id}
              onClick={() => {
                setActive(isOpen ? null : arm.id);
                setLabOpen(false);
              }}
              className="text-left p-4 rounded-xl border transition-all duration-300 group"
              style={{
                background: isOpen ? `${arm.accent}08` : "rgba(255,255,255,0.02)",
                borderColor: isOpen ? `${arm.accent}30` : "rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="text-[9px] tracking-[2px] uppercase font-mono" style={{ color: arm.accent }}>
                  {arm.tag}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-[13px] font-bold font-mono" style={{ color: arm.accent }}>
                    {arm.price}
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-mono text-[11px]"
                    style={{ color: arm.accent }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
              <div className="text-[13px] font-semibold mb-1 text-white/90 group-hover:text-white transition-colors">
                {arm.name}
              </div>
              <div className="text-[11px] text-muted leading-relaxed">
                {arm.id === "lab" && "Tabla NOM-051 + sellos · Entrega en 2–3 días"}
                {arm.id === "creativo" && "Etiqueta + identidad visual lista para venta"}
                {arm.id === "digital" && "Landing page + redes + automatizaciones"}
              </div>
            </button>
          );
        })}
      </div>

      {/* Panel desplegable — se muestra solo cuando hay un área activa */}
      <AnimatePresence mode="wait">
        {activeArm && (
          <motion.div
            key={active}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div
              role="tabpanel"
              id={`panel-${active}`}
              className="grid md:grid-cols-2 border border-border rounded-lg overflow-hidden mt-1"
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
                    <div className="text-xl font-bold font-mono" style={{ color: activeArm.accent }}>
                      {activeArm.price}
                    </div>
                    {"priceSub" in activeArm && activeArm.priceSub && (
                      <div className="text-[10px] text-muted mt-1">{(activeArm as typeof activeArm & { priceSub: string }).priceSub}</div>
                    )}
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <div className="text-[10px] tracking-[2px] uppercase text-muted mb-1">Entrega</div>
                    <div className="text-xl font-bold font-mono text-white">{activeArm.time}</div>
                  </div>
                </div>

                <a
                  href={waUrl(activeArm.waMsg)}
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
                {active === "creativo" ? (
                  <div>
                    <CreativoExpandable services={activeArm.services} />
                    <div className="mt-6 px-4 py-3 rounded-lg border border-lavender/20 bg-lavender/[0.04] flex items-start gap-3">
                      <span className="text-[14px] flex-shrink-0">💜</span>
                      <p className="text-[11px] text-muted leading-relaxed">
                        <span className="text-white font-semibold">¿Ya adquiriste tu tabla nutrimental con nosotros?</span>{" "}
                        Pregunta por tu <span style={{ color: "#AFA9EC" }} className="font-semibold">precio preferente</span>. Clientes de Alfa NOM tienen acceso a upgrades naturales con descuento.
                      </p>
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expandable for Lab */}
      <AnimatePresence>
        {active === "lab" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="mt-3"
          >
            <button
              onClick={() => setLabOpen(!labOpen)}
              className={`flex items-center gap-3 w-full text-left px-5 py-3.5 rounded-lg border transition-all duration-300 group ${
                labOpen
                  ? "border-neon/30 bg-neon/5 text-neon"
                  : "border-border bg-bg2 text-muted hover:border-neon/25 hover:text-white hover:bg-neon/[0.03]"
              }`}
            >
              <span
                className={`inline-block transition-transform duration-300 font-mono flex-shrink-0 ${labOpen ? "text-neon" : "text-muted group-hover:text-neon"}`}
                style={{ transform: labOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                →
              </span>
              <span className="text-[11px] tracking-[1.5px] uppercase font-semibold">
                {labOpen ? "Cerrar info técnica" : "Ver toda la info técnica — proceso, base legal y requisitos"}
              </span>
              {!labOpen && (
                <span className="ml-auto text-[9px] tracking-[1px] uppercase font-mono text-neon/60 border border-neon/20 rounded px-2 py-0.5 flex-shrink-0">
                  NOM-051
                </span>
              )}
            </button>

            <AnimatePresence>
              {labOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <LabExpandable />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden">
        <div id="lab" /><div id="creativo" /><div id="digital" />
      </div>
    </section>
  );
}
