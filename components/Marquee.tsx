"use client";

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
      <div className="flex marquee-track gap-12">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-12 flex-shrink-0">
            <span className="text-[11px] tracking-[3px] uppercase text-muted font-mono whitespace-nowrap">
              {item}
            </span>
            <span className="text-neon text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
