"use client";

import Image from "next/image";
import { WHATSAPP_URL, INSTAGRAM_URL, FACEBOOK_URL } from "@/lib/motion";

const services = [
  { label: "Tabla nutrimental NOM-051", href: "#lab" },
  { label: "Sellos de advertencia",    href: "#lab" },
  { label: "Validación pre-impresión", href: "#lab" },
  { label: "Diseño de etiqueta",       href: "#creativo" },
  { label: "Branding de empaque",      href: "#creativo" },
  { label: "Landing page",             href: "#digital" },
  { label: "Bot WhatsApp 24/7",        href: "#digital" },
];

const paquetes = [
  { label: "Tabla y sellos NOM — $2,300 MXN",       href: "#paquetes" },
  { label: "Inicio Producto — $5,000 MXN", href: "#paquetes" },
  { label: "Marca Completa — $11,000 MXN", href: "#paquetes" },
];

const company = [
  { label: "Servicios",  href: "#servicios" },
  { label: "Para quién", href: "#para-quien" },
  { label: "Proceso",    href: "#proceso" },
  { label: "Precios",    href: "#paquetes" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg2">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Vercel template grid: logo+desc col-span-2 + 3 link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand — col-span-2 */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 relative flex-shrink-0">
                <Image src="/images/logo.jpg" alt="Punto Alfa" fill sizes="28px"
                  className="object-contain" style={{ mixBlendMode: "screen" }} />
              </div>
              <span className="text-[12px] font-bold tracking-[3px] uppercase">Punto Alfa</span>
            </a>
            <p className="text-[12px] text-muted leading-relaxed mb-5 max-w-[220px]">
              Ciencia · Diseño · Estrategia para emprendedores de la industria alimentaria.
            </p>
            <div className="text-[10px] tracking-[1.5px] uppercase text-muted/60 font-mono mb-5">
              México
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 text-neon text-[11px] font-mono tracking-[1px] uppercase px-4 py-2 rounded hover:bg-neon/20 transition-colors mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.852L0 24l6.303-1.517A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.502-5.178-1.38l-.371-.22-3.844.924.966-3.732-.242-.386A9.959 9.959 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-5">Servicios</h3>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-[12px] text-muted hover:text-white transition-colors">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Paquetes */}
          <div>
            <h3 className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-5">Paquetes</h3>
            <ul className="flex flex-col gap-3">
              {paquetes.map((p) => (
                <li key={p.label}>
                  <a href={p.href} className="text-[12px] text-muted hover:text-white transition-colors">{p.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-5">Empresa</h3>
            <ul className="flex flex-col gap-3">
              {company.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="text-[12px] text-muted hover:text-white transition-colors">{c.label}</a>
                </li>
              ))}
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                  className="text-[12px] text-muted hover:text-white transition-colors">Instagram</a>
              </li>
              <li>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                  className="text-[12px] text-muted hover:text-white transition-colors">Facebook</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — Vercel template style */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted/60">© {new Date().getFullYear()} Punto Alfa. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[11px] text-muted/60 hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="text-[11px] text-muted/60 hover:text-white transition-colors">Términos</a>
            <span className="text-[11px] text-muted/40 font-mono">México</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
