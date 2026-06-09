"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { fadeUp, staggerContainer, fadeScale } from "@/lib/motion";
import { waUrl } from "@/lib/motion";

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
  deliveryTime: string;
  description?: string;
  upgradeNote?: string;
  items: (string | PkgItem)[];
  star?: boolean;
  cta: string;
  waMsg: string;
}>> = {
  todos: [
    {
      badge: "// Alfa NOM",
      name: "Tabla nutrimental + sellos NOM-051",
      price: "$800",
      sub: "MXN · Precio promocional · Precio normal $1,600 MXN",
      deliveryTime: "2–3 días hábiles",
      description: "Evita errores regulatorios desde el inicio.",
      items: [
        "Tabla nutrimental teórica NOM-051",
        "Sellos frontales de advertencia",
        "PDF + PNG para etiqueta",
        "Cumplimiento NOM-051 completo",
      ],
      cta: "Solicitar",
      waMsg: "Hola Punto Alfa 👋 Me interesa el servicio *Tabla nutrimental + sellos NOM-051* ($800 MXN promocional). ¿Me pueden dar más información?",
    },
    {
      badge: "// Alfa Creativo",
      name: "Paquete 1 — Etiqueta + imagen de producto lista para venta",
      price: "$5,000",
      sub: "MXN",
      deliveryTime: "1 semana",
      upgradeNote: "¿Ya adquiriste tu tabla nutrimental con nosotros? Pregunta por tu precio preferente.",
      items: [
        {
          label: "Tabla nutrimental + sellos NOM-051",
          sub: "Cumplimiento normativo completo antes de imprenta",
        },
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
      cta: "Solicitar",
      waMsg: "Hola Punto Alfa 👋 Me interesa el paquete *Etiqueta + imagen de producto lista para venta* (NOM-051 + identidad + etiqueta + mockups · $5,000 MXN). ¿Me pueden dar más información?",
    },
    {
      badge: "// Alfa Completo",
      name: "Paquete 2 — Marca Completa",
      price: "$11,000",
      sub: "MXN · Un solo equipo",
      deliveryTime: "3–4 semanas",
      description: "Convierte tu producto en una marca lista para vender.",
      upgradeNote: "¿Ya adquiriste tu tabla nutrimental con nosotros? Pregunta por tu precio preferente — la tabla es tu punto de entrada natural a todo lo demás.",
      items: [
        {
          label: "Tabla nutrimental + sellos NOM-051",
          sub: "Cumplimiento normativo completo antes de imprenta",
        },
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
        {
          label: "Landing page + botón WhatsApp",
          sub: "Tu producto visible en internet desde el día 1, con contacto directo al cliente",
        },
        {
          label: "Estrategia de redes + contenido inicial: 15 posts con copy incluido",
          sub: "Publicaciones listas para subir, con texto redactado para conectar con tu cliente ideal",
        },
      ],
      star: true,
      cta: "Solicitar",
      waMsg: "Hola Punto Alfa 👋 Me interesa el paquete *Marca Completa* (NOM-051 + identidad + etiqueta + landing page + 15 posts · $11,000 MXN). ¿Me pueden dar más información?",
    },
  ],
  lab: [
    {
      badge: "// Alfa NOM",
      name: "Tabla nutrimental + sellos NOM-051",
      price: "$800",
      sub: "MXN · Precio promocional · Precio normal $1,600 MXN",
      deliveryTime: "2–3 días hábiles",
      items: [
        "Tabla nutrimental teórica NOM-051",
        "Sellos frontales de advertencia",
        "PDF + PNG para etiqueta",
        "Cumplimiento NOM-051 completo",
      ],
      star: true,
      cta: "Solicitar",
      waMsg: "Hola Punto Alfa 👋 Me interesa el servicio de *Tabla nutrimental + sellos NOM-051* ($800 MXN promocional). ¿Me pueden dar más información?",
    },
    {
      badge: "// Alfa NOM",
      name: "Consultoría de formulación o reducción de sellos",
      price: "A cotizar",
      sub: "Variable según producto",
      deliveryTime: "A convenir",
      items: [
        "Formulación de producto desde cero",
        "Análisis para reducir octágonos",
        "Evaluación de producto nuevo",
      ],
      cta: "Cotizar",
      waMsg: "Hola Punto Alfa 👋 Me interesa cotizar una *Consultoría de formulación o reducción de sellos*. ¿Me pueden dar más información y un precio estimado?",
    },
  ],
  creativo: [
    {
      badge: "// Más completo",
      name: "Paquete 1 — Etiqueta + imagen de producto lista para venta",
      price: "$5,000",
      sub: "MXN",
      deliveryTime: "1 semana",
      description: "Diseño completo de tu producto para que puedas vender desde el inicio sin errores comunes.",
      upgradeNote: "¿Ya adquiriste tu tabla nutrimental con nosotros? Pregunta por tu precio preferente.",
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
      waMsg: "Hola Punto Alfa 👋 Me interesa el servicio de *Etiqueta + imagen de producto lista para venta* (identidad + etiqueta regulatoria + mockups · $5,000 MXN). ¿Me pueden dar más información?",
    },
  ],
  digital: [
    {
      badge: "// Alfa Digital",
      name: "Landing page de producto",
      price: "$5,000",
      sub: "MXN",
      deliveryTime: "5–7 días",
      items: [
        "Landing page de producto",
        "Botón WhatsApp integrado",
        "Integración con redes sociales",
      ],
      cta: "Solicitar",
      waMsg: "Hola Punto Alfa 👋 Me interesa el servicio de *Landing page de producto* (con botón WhatsApp + integración a redes · $5,000 MXN). ¿Me pueden dar más información?",
    },
    {
      badge: "// Alfa Digital",
      name: "Redes + contenido inicial",
      price: "$2,500",
      sub: "MXN",
      deliveryTime: "5 días",
      items: [
        "15 posts estáticos mensuales",
        "Diseño adaptado a tu identidad visual",
        "Copy incluido",
      ],
      cta: "Solicitar",
      waMsg: "Hola Punto Alfa 👋 Me interesa el servicio de *Redes + contenido inicial* (15 posts mensuales + diseño + copy · $2,500 MXN). ¿Me pueden dar más información?",
    },
    {
      badge: "// Más completo",
      name: "Redes + contenido completo",
      price: "$6,000",
      sub: "MXN / mes",
      deliveryTime: "5–7 días",
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
      waMsg: "Hola Punto Alfa 👋 Me interesa el servicio de *Redes + contenido completo* (12 posts + reels + imágenes + bot WhatsApp · $6,000 MXN/mes). ¿Me pueden dar más información?",
    },
    {
      badge: "// Alfa Digital",
      name: "Bot WhatsApp 24/7",
      price: "$3,000",
      sub: "MXN / mes",
      deliveryTime: "5–7 días",
      items: [
        "Responde precios, horarios y ubicación",
        "500 mensajes / mes incluidos",
        "Flujos personalizados para tu negocio",
      ],
      cta: "Solicitar",
      waMsg: "Hola Punto Alfa 👋 Me interesa el servicio de *Bot WhatsApp 24/7* (500 mensajes/mes + flujos personalizados + CRM · $3,000 MXN). ¿Me pueden dar más información?",
    },
  ],
};

const tabs: { id: Tab; label: string }[] = [
  { id: "todos",    label: "Todos" },
  { id: "lab",      label: "Lab" },
  { id: "creativo", label: "Creativo" },
  { id: "digital",  label: "Digital" },
];

// ── Collapsible item for complex PkgItems with subitems ──
function CollapsibleItem({ item }: { item: PkgItem }) {
  const [open, setOpen] = useState(false);
  const hasDetail = !!(item.sub || item.subitems);

  return (
    <li className="flex flex-col gap-0">
      <button
        onClick={() => hasDetail && setOpen(!open)}
        className={`flex items-start gap-2 text-left w-full group/item ${hasDetail ? "cursor-pointer" : "cursor-default"}`}
      >
        <span className="text-neon font-mono flex-shrink-0 mt-0.5 text-[11px]">→</span>
        <div className="flex-1 flex items-start justify-between gap-1">
          <span className="text-[12px] text-white font-semibold leading-snug">{item.label}</span>
          {hasDetail && (
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-neon/50 text-[14px] font-mono flex-shrink-0 mt-0.5 leading-none group-hover/item:text-neon transition-colors"
            >
              +
            </motion.span>
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && hasDetail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-5 pt-1.5 pb-1">
              {item.sub && <p className="text-[11px] text-muted mb-1.5">{item.sub}</p>}
              {item.subitems && (
                <ul className="flex flex-col gap-1">
                  {item.subitems.map((s, k) => (
                    <li key={k} className="flex items-start gap-1.5 text-[11px] text-muted">
                      <span className="text-neon/40 font-mono flex-shrink-0 text-[10px] mt-0.5">·</span>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

// ── PricingCard ──
function PricingCard({ pkg, index, isCollapsible }: {
  pkg: typeof packages["todos"][0];
  index: number;
  isCollapsible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      className={`flex flex-col p-7 rounded-xl glass-card glass-card-hover glass-dynamic relative overflow-hidden group ${
        pkg.star
          ? "border-2 border-neon/40 shadow-[0_0_40px_rgba(198,241,53,0.1)] -translate-y-1 scale-[1.02]"
          : "border border-white/[0.06]"
      }`}
    >
      {pkg.star && (
        <div className="absolute top-0 left-0 right-0 h-px border-beam" />
      )}

      <div className="text-[9px] tracking-[2px] uppercase text-neon font-mono mb-3">{pkg.badge}</div>
      <div className="text-[17px] font-bold mb-1 group-hover:text-neon transition-colors duration-400">{pkg.name}</div>
      <div className="flex items-baseline gap-1.5 my-3">
        <span className="text-[28px] font-bold text-neon font-mono">{pkg.price}</span>
        {pkg.price !== "A cotizar" && (
          <span className="text-[11px] text-muted font-mono">+ IVA</span>
        )}
      </div>
      <div className="text-[12px] text-muted tracking-[0.5px] mb-1">{pkg.sub}</div>
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-[10px] tracking-[1.5px] uppercase text-muted font-mono">Tiempo de entrega:</span>
        <span className="text-[11px] font-bold text-white font-mono">{pkg.deliveryTime}</span>
      </div>

      {pkg.badge === "// Alfa NOM" && pkg.price === "$800" && (
        <div className="mb-3 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon/10 border border-neon/30">
            <span className="text-neon text-[9px] font-bold tracking-[1.5px] uppercase font-mono">🏷 Precio promocional</span>
          </div>
          <p className="text-[11px] text-muted/70 italic">Precio normal: <span className="line-through text-muted/50">$1,600 MXN</span> — aprovecha antes de que vuelva al precio regular.</p>
        </div>
      )}
      {pkg.badge === "// Alfa Completo" && (
        <div className="mb-3 space-y-0.5">
          <p className="text-[11px] text-muted/60 line-through">4 proveedores separados: $22,000+ MXN</p>
          <p className="text-[12px] text-neon font-bold">Aquí: todo en $11,000 con un solo equipo</p>
        </div>
      )}
      {pkg.description && (
        <p className="text-[11px] text-muted/80 leading-relaxed mb-4 border-l-2 border-neon/30 pl-3">
          {pkg.description}
        </p>
      )}
      {pkg.upgradeNote && (
        <div className="mb-4 px-3 py-2.5 rounded-lg border border-neon/20 bg-neon/[0.03] flex items-start gap-2">
          <span className="text-[13px] flex-shrink-0">⭐</span>
          <p className="text-[11px] text-muted leading-relaxed">
            <span className="text-neon font-semibold">Precio preferente:</span>{" "}
            {pkg.upgradeNote}
          </p>
        </div>
      )}

      <ul className="flex flex-col gap-3 flex-1 mb-6">
        {pkg.items.map((item, j) => {
          if (typeof item === "string") {
            return (
              <li key={j} className="flex items-start gap-2 text-[12px] text-white font-semibold">
                <span className="text-neon font-mono flex-shrink-0 mt-0.5 text-[11px]">→</span>
                {item}
              </li>
            );
          }
          // In "todos" tab: collapsible. In other tabs: expanded as before.
          if (isCollapsible) {
            return <CollapsibleItem key={j} item={item} />;
          }
          return (
            <li key={j} className="flex flex-col gap-1">
              <div className="flex items-start gap-2">
                <span className="text-neon font-mono flex-shrink-0 mt-0.5 text-[11px]">→</span>
                <div>
                  <span className="text-[12px] text-white font-bold">{item.label}</span>
                  {item.sub && <p className="text-[11px] text-muted mt-0.5">{item.sub}</p>}
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
        href={waUrl(pkg.waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          // GA4: click en WhatsApp desde pricing
          if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
            (window as any).gtag("event", "whatsapp_enviado");
          }
        }}
        className={`w-full text-center py-2.5 rounded text-[11px] tracking-[1px] uppercase font-semibold transition-all duration-400 ${
          pkg.star
            ? "bg-neon text-bg hover:shadow-[0_0_24px_rgba(198,241,53,0.35)] hover:scale-[1.02]"
            : "bg-transparent text-muted border border-white/[0.08] hover:border-neon/40 hover:text-neon hover:bg-neon/[0.04]"
        }`}
      >
        {pkg.cta}
      </a>
    </motion.div>
  );
}

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
          Paquetes individuales o integrados. Todo pensado para que no necesites más de un proveedor.
        </motion.p>
      </motion.div>

      {/* Tabs */}
      <div className="inline-flex glass-strong rounded-xl overflow-hidden mb-8 p-0.5 gap-0.5">
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

      <p className="text-[11px] text-muted/60 font-mono mb-6">* Todos los precios son + IVA</p>

      {/* Cards */}
      {tab === "todos" ? (
        <motion.div
          key="todos"
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Paquetes */}
          <div className="mb-3">
            <div className="text-[10px] tracking-[3px] uppercase text-muted font-mono mb-3">// Paquetes</div>
            <div className="grid md:grid-cols-3 gap-4">
              {packages.todos.slice(0, 2).map((pkg, i) => (
                <PricingCard key={i} pkg={pkg} index={i} isCollapsible={true} />
              ))}
            </div>
          </div>
          {/* Paquetes integrados */}
          <div className="mt-8">
            <div className="text-[10px] tracking-[3px] uppercase text-muted font-mono mb-3">// Paquetes integrados</div>
            <div className="grid md:grid-cols-2 gap-4">
              {packages.todos.slice(2).map((pkg, i) => (
                <PricingCard key={i} pkg={pkg} index={i + 2} isCollapsible={true} />
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
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
            <PricingCard key={i} pkg={pkg} index={i} isCollapsible={false} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
