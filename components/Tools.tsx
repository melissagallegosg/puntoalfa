"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { fadeUp, staggerContainer, fadeScale, EASE_OUT_EXPO } from "@/lib/motion";
import { waUrl } from "@/lib/motion";

// ─── Analytics helper ─────────────────────────────────────────────────────────
function track(eventName: string) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName);
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

type TipoProducto = "solido" | "liquido";

interface SelloThreshold {
  key: string;
  icon: string;
  label: string;
  desc: string;
  measured: string;
  limit: string;
  triggered: boolean;
}

interface SelloData {
  count: number;
  activeNames: string[];
  thresholds: SelloThreshold[];
}

type QuestionId = 1 | 2 | 3 | 4 | 5;
type Answer = "si" | "no";

const TOTAL_QUESTIONS = 5;

const QUESTIONS: Record<QuestionId, string> = {
  1: "¿Ya tienes receta o formulación definida?",
  2: "¿Ya tienes tabla nutrimental con sellos NOM-051?",
  3: "¿Ya tienes etiqueta diseñada?",
  4: "¿Ya tienes logo o identidad visual?",
  5: "¿Ya tienes presencia digital — web o redes sociales?",
};

const SERVICES = {
  nom: {
    name: "Alfa NOM",
    desc: "Tabla nutrimental + cálculo de sellos NOM-051 certificado.",
    price: "$800",
    promo: true,
  },
  creativo: {
    name: "Alfa Creativo",
    desc: "Diseño de etiqueta cumpliendo NOM-051 y normativa vigente.",
    price: "$5,000",
  },
  marca: {
    name: "Marca Completa",
    desc: "Identidad visual + logo + etiqueta NOM-051. Todo incluido.",
    price: "$11,000",
  },
} as const;

type ServiceKey = keyof typeof SERVICES;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calcularThresholds(
  kcal: number,
  grasas_sat: number,
  grasas_trans: number,
  azucares_add: number,
  sodio: number,
  tipo: TipoProducto,
  sin_calorias: boolean
): SelloThreshold[] {
  const kcal_azucares = azucares_add * 4;
  const kcal_sat = grasas_sat * 9;
  const kcal_trans = grasas_trans * 9;
  const pct_azucares = kcal > 0 ? (kcal_azucares / kcal) * 100 : 0;
  const pct_sat = kcal > 0 ? (kcal_sat / kcal) * 100 : 0;
  const pct_trans = kcal > 0 ? (kcal_trans / kcal) * 100 : 0;
  const sodio_por_kcal = kcal > 0 ? sodio / kcal : 0;

  if (tipo === "solido") {
    return [
      {
        key: "calorias",
        icon: "🔥",
        label: "EXCESO CALORÍAS",
        desc: "≥ 275 kcal por 100g",
        measured: kcal.toFixed(1) + " kcal",
        limit: "275 kcal",
        triggered: kcal >= 275,
      },
      {
        key: "azucares",
        icon: "🍬",
        label: "EXCESO AZÚCARES",
        desc: "≥ 10% energía de azúcares añadidos (art. 3.5)",
        measured: pct_azucares.toFixed(1) + "%",
        limit: "10%",
        triggered: pct_azucares >= 10,
      },
      {
        key: "grasasat",
        icon: "🧈",
        label: "EXCESO GRASAS SAT.",
        desc: "≥ 10% energía de grasas saturadas",
        measured: pct_sat.toFixed(1) + "%",
        limit: "10%",
        triggered: pct_sat >= 10,
      },
      {
        key: "grasatrans",
        icon: "⚠",
        label: "EXCESO GRASAS TRANS",
        desc: "≥ 1% energía de grasas trans",
        measured: pct_trans.toFixed(2) + "%",
        limit: "1%",
        triggered: pct_trans >= 1,
      },
      {
        key: "sodio",
        icon: "🧂",
        label: "EXCESO SODIO",
        desc: "≥ 300 mg por 100g o ≥ 1 mg/kcal",
        measured: sodio.toFixed(0) + " mg",
        limit: "300 mg",
        triggered: sodio >= 300 || sodio_por_kcal >= 1,
      },
    ];
  } else {
    const umbral_sodio = sin_calorias ? 45 : 300;
    return [
      {
        key: "calorias",
        icon: "🔥",
        label: "EXCESO CALORÍAS",
        desc: "≥ 70 kcal totales o ≥ 8 kcal de azúcares libres",
        measured: kcal.toFixed(1) + " kcal",
        limit: "70 kcal",
        triggered: kcal >= 70 || kcal_azucares >= 8,
      },
      {
        key: "azucares",
        icon: "🍬",
        label: "EXCESO AZÚCARES",
        desc: "≥ 10% energía de azúcares añadidos (art. 3.5)",
        measured: pct_azucares.toFixed(1) + "%",
        limit: "10%",
        triggered: pct_azucares >= 10,
      },
      {
        key: "grasasat",
        icon: "🧈",
        label: "EXCESO GRASAS SAT.",
        desc: "≥ 10% energía de grasas saturadas",
        measured: pct_sat.toFixed(1) + "%",
        limit: "10%",
        triggered: pct_sat >= 10,
      },
      {
        key: "grasatrans",
        icon: "⚠",
        label: "EXCESO GRASAS TRANS",
        desc: "≥ 1% energía de grasas trans",
        measured: pct_trans.toFixed(2) + "%",
        limit: "1%",
        triggered: pct_trans >= 1,
      },
      {
        key: "sodio",
        icon: "🧂",
        label: "EXCESO SODIO",
        desc: sin_calorias ? "Bebida sin calorías: ≥ 45 mg sodio" : "≥ 300 mg por 100ml",
        measured: sodio.toFixed(0) + " mg",
        limit: `${umbral_sodio} mg`,
        triggered: sodio >= umbral_sodio,
      },
    ];
  }
}

function getRecommendedServices(answers: Partial<Record<QuestionId, Answer>>): ServiceKey[] {
  const noTabla = answers[2] === "no";
  const noEtiqueta = answers[3] === "no";
  const noLogo = answers[4] === "no";

  let recommended: ServiceKey[] = [];
  if (noLogo && noEtiqueta) {
    recommended.push("marca");
  } else {
    if (noEtiqueta) recommended.push("creativo");
    if (noTabla && !noEtiqueta) recommended.push("nom");
    if (noTabla && noEtiqueta && !noLogo) {
      if (!recommended.includes("nom")) recommended.push("nom");
    }
  }
  return Array.from(new Set(recommended));
}

function getStageLabel(answers: Partial<Record<QuestionId, Answer>>): string {
  const noTabla = answers[2] === "no";
  const noEtiqueta = answers[3] === "no";
  const noLogo = answers[4] === "no";
  if (!answers[1] || answers[1] === "no") return "Etapa inicial · Formulación";
  if (noLogo && noEtiqueta) return "Etapa 1 · Marca e identidad";
  if (noEtiqueta) return "Etapa 2 · Etiqueta";
  if (noTabla) return "Etapa 3 · Normativa NOM-051";
  return "Listo para lanzar";
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SelloRow({ threshold }: { threshold: SelloThreshold }) {
  return (
    <div
      className={`flex items-stretch rounded border transition-all duration-200 overflow-hidden ${
        threshold.triggered
          ? "border-neon/40"
          : "border-border opacity-50"
      }`}
    >
      <div
        className={`w-11 flex items-center justify-center text-lg flex-shrink-0 ${
          threshold.triggered ? "bg-neon" : "bg-border"
        }`}
      >
        {threshold.triggered ? threshold.icon : "✓"}
      </div>
      <div className="flex-1 px-3 py-2.5 flex flex-col gap-1">
        <div
          className={`font-mono text-[10px] tracking-[0.06em] uppercase ${
            threshold.triggered ? "text-neon" : "text-[#444]"
          }`}
        >
          {threshold.triggered ? "▸ " : ""}{threshold.label}
        </div>
        <div className="font-mono text-[11px] text-[#555]">{threshold.desc}</div>
        <div className="flex gap-1.5 flex-wrap mt-0.5">
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm bg-[#1e1e1e] text-[#ccc]">
            Valor: {threshold.measured}
          </span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm bg-[#131313] text-[#555] border border-border">
            Límite: {threshold.limit}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Tool 1: Calculadora NOM-051 ─────────────────────────────────────────────

function CalculadoraSellos() {
  const [tipo, setTipo] = useState<TipoProducto>("solido");
  const [kcal, setKcal] = useState("");
  const [grasasSat, setGrasasSat] = useState("");
  const [grasasTrans, setGrasasTrans] = useState("");
  const [azucaresAdd, setAzucaresAdd] = useState("");
  const [sodio, setSodio] = useState("");
  const [edulcorantes, setEdulcorantes] = useState(false);
  const [cafeina, setCafeina] = useState(false);
  const [sinCalorias, setSinCalorias] = useState(false);
  const [resultado, setResultado] = useState<SelloData | null>(null);

  // Contact form
  const [nombre, setNombre] = useState("");
  const [producto, setProducto] = useState("");
  const [wa, setWa] = useState("");
  const [desc, setDesc] = useState("");

  const calcular = useCallback(() => {
    track("herramienta_calcular_sellos");
    const thresholds = calcularThresholds(
      parseFloat(kcal) || 0,
      parseFloat(grasasSat) || 0,
      parseFloat(grasasTrans) || 0,
      parseFloat(azucaresAdd) || 0,
      parseFloat(sodio) || 0,
      tipo,
      sinCalorias
    );
    const count = thresholds.filter((t) => t.triggered).length;
    setResultado({
      count,
      activeNames: thresholds.filter((t) => t.triggered).map((t) => t.label),
      thresholds,
    });
  }, [kcal, grasasSat, grasasTrans, azucaresAdd, sodio, tipo, sinCalorias]);

  const solicitarEvaluacion = () => {
    track("herramienta_calc_wa_click");
    const count = resultado?.count ?? 0;
    const lista = resultado?.activeNames?.length
      ? resultado.activeNames.join(", ")
      : "ninguno";
    const descPart = desc ? `\n\nDetalles del producto: ${desc}` : "";
    const msg = `Hola Punto Alfa 👋 Usé la calculadora de sellos. Mi producto es ${producto || "[producto]"}, me salieron ${count} sellos: ${lista}. Quiero una evaluación oficial. Mi número es ${wa || "[WhatsApp]"}.${descPart}`;
    window.open(`https://wa.me/5218125970372?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inputClass =
    "w-full bg-bg2 border border-border text-white font-mono text-[14px] px-3 py-2.5 rounded focus:outline-none focus:border-neon/40 transition-colors duration-150 placeholder:text-[#333] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
  const labelClass = "font-mono text-[10px] tracking-[0.06em] uppercase text-muted mb-1 block";

  return (
    <div>
      {/* Tipo de producto */}
      <div className="mb-6">
        <div className={labelClass}>Tipo de producto</div>
        <div className="flex gap-2">
          {(["solido", "liquido"] as TipoProducto[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTipo(t);
                if (t === "solido") setSinCalorias(false);
              }}
              className={`px-4 py-2 text-[13px] font-medium rounded border transition-all duration-150 ${
                tipo === t
                  ? "bg-neon text-bg border-neon"
                  : "bg-bg2 border-border text-muted hover:border-neon/30 hover:text-white"
              }`}
            >
              {t === "solido" ? "Sólido · 100g" : "Líquido · 100ml"}
            </button>
          ))}
        </div>
      </div>

      {/* Campos nutrimentales */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { id: "kcal", label: "Contenido energético (kcal)", placeholder: "ej. 320", value: kcal, set: setKcal },
          { id: "grasas_sat", label: "Grasas saturadas (g)", placeholder: "ej. 5", value: grasasSat, set: setGrasasSat },
          { id: "grasas_trans", label: "Grasas trans (g)", placeholder: "ej. 0.5", value: grasasTrans, set: setGrasasTrans },
          { id: "azucares_add", label: "Azúcares añadidos (g)", placeholder: "ej. 12", value: azucaresAdd, set: setAzucaresAdd },
          { id: "sodio", label: "Sodio (mg)", placeholder: "ej. 400", value: sodio, set: setSodio },
        ].map((field) => (
          <div key={field.id} className={field.id === "azucares_add" ? "col-span-2 sm:col-span-1" : ""}>
            <label className={labelClass}>{field.label}</label>
            <input
              type="number"
              className={inputClass}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              min="0"
            />
            {field.id === "azucares_add" && (
              <p className="font-mono text-[10px] text-[#555] leading-relaxed mt-1">
                Azúcares libres agregados en proceso industrial (art. 3.5 NOM-051). No incluir azúcares naturales del ingrediente.
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Ingredientes especiales */}
      <div className="mb-6">
        <div className={labelClass}>Ingredientes especiales</div>
        <div className="flex flex-col gap-2">
          {[
            { id: "edulcorantes", label: "Contiene edulcorantes (en lista de ingredientes)", value: edulcorantes, set: setEdulcorantes },
            { id: "cafeina", label: "Contiene cafeína adicionada", value: cafeina, set: setCafeina },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 px-3 py-2.5 border border-border rounded bg-bg2 cursor-pointer text-[13px] text-[#ccc] hover:border-[#444] transition-colors duration-150"
            >
              <input
                type="checkbox"
                checked={item.value}
                onChange={(e) => item.set(e.target.checked)}
                className="accent-neon w-4 h-4 cursor-pointer flex-shrink-0"
              />
              {item.label}
            </label>
          ))}
          {tipo === "liquido" && (
            <label className="flex items-center gap-3 px-3 py-2.5 border border-border rounded bg-bg2 cursor-pointer text-[13px] text-[#ccc] hover:border-[#444] transition-colors duration-150">
              <input
                type="checkbox"
                checked={sinCalorias}
                onChange={(e) => setSinCalorias(e.target.checked)}
                className="accent-neon w-4 h-4 cursor-pointer flex-shrink-0"
              />
              Bebida sin calorías (aplica umbral sodio de 45 mg)
            </label>
          )}
        </div>
      </div>

      {/* CTA */}
      <motion.button
        onClick={calcular}
        className="bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-5 py-2.5 rounded inline-flex items-center gap-2"
        whileHover={{ boxShadow: "0 0 28px rgba(198,241,53,0.35)", scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.25 }}
      >
        Calcular sellos →
      </motion.button>

      {/* Resultados */}
      <AnimatePresence>
        {resultado && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mt-8"
          >
            <div className="border-t border-border mb-6" />

            {/* Valores intermedios */}
            <div className="grid grid-cols-3 gap-2 mb-5 p-3 bg-bg2 border border-border rounded">
              {(() => {
                const k = parseFloat(kcal) || 0;
                const az = parseFloat(azucaresAdd) || 0;
                const sat = parseFloat(grasasSat) || 0;
                const tr = parseFloat(grasasTrans) || 0;
                const ka = az * 4, ks = sat * 9, kt = tr * 9;
                const pa = k > 0 ? (ka / k) * 100 : 0;
                const ps = k > 0 ? (ks / k) * 100 : 0;
                const pt = k > 0 ? (kt / k) * 100 : 0;
                return [
                  { l: "kcal azúcares añadidos", v: ka.toFixed(1) + " kcal" },
                  { l: "% energía azúcares", v: pa.toFixed(1) + " %" },
                  { l: "kcal grasas sat.", v: ks.toFixed(1) + " kcal" },
                  { l: "% energía grasas sat.", v: ps.toFixed(1) + " %" },
                  { l: "kcal grasas trans", v: kt.toFixed(1) + " kcal" },
                  { l: "% energía grasas trans", v: pt.toFixed(2) + " %" },
                ].map((c) => (
                  <div key={c.l} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[10px] text-[#555]">{c.l}</span>
                    <span className="font-mono text-[13px] text-neon">{c.v}</span>
                  </div>
                ));
              })()}
            </div>

            {/* Conteo */}
            <div className="text-[20px] font-bold mb-4">
              Tu producto requiere{" "}
              <span className="text-neon">{resultado.count}</span>{" "}
              sello{resultado.count !== 1 ? "s" : ""} de advertencia.
            </div>

            {/* Sellos */}
            <div className="flex flex-col gap-2 mb-4">
              {resultado.thresholds.map((t) => (
                <SelloRow key={t.key} threshold={t} />
              ))}
            </div>

            {/* Leyendas */}
            {(edulcorantes || cafeina) && (
              <div className="mb-4">
                <div className={labelClass + " mb-2"}>Leyendas precautorias</div>
                {[
                  { active: edulcorantes, text: "CONTIENE EDULCORANTES — NO RECOMENDABLE EN NIÑOS" },
                  { active: cafeina, text: "CONTIENE CAFEÍNA — EVITAR EN NIÑOS" },
                ].map((l) => (
                  <div
                    key={l.text}
                    className={`flex items-center gap-3 px-3 py-2.5 border rounded mb-1 ${
                      l.active ? "border-red-500/40" : "border-border"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        l.active ? "bg-red-500" : "bg-[#333]"
                      }`}
                    />
                    <span
                      className={`font-mono text-[10px] tracking-[0.04em] ${
                        l.active ? "text-red-500" : "text-[#444]"
                      }`}
                    >
                      {l.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <p className="font-mono text-[11px] text-[#555] leading-relaxed mb-5">
              Resultado orientativo basado en NOM-051-SCFI/SSA1-2010. Para evaluación oficial contacta a Punto Alfa.
            </p>

            {/* Pricing */}
            <div className="border border-border rounded overflow-hidden mb-5">
              <div className="px-4 py-2.5 border-b border-border bg-bg2">
                <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-muted">
                  Servicio: Tabla nutrimental + sellos NOM-051
                </span>
              </div>
              {[
                { label: "1er producto", sub: "Tabla nutrimental + cálculo oficial de sellos", price: "$800" },
                { label: "Productos adicionales", sub: "A partir del 2do producto", price: "$600" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between items-center px-4 py-3 border-b border-border last:border-b-0 bg-bg2"
                >
                  <div>
                    <div className="text-[14px] font-medium mb-0.5">{row.label}</div>
                    <div className="font-mono text-[11px] text-[#666]">{row.sub}</div>
                  </div>
                  <div className="font-mono text-[18px] text-neon whitespace-nowrap flex-shrink-0">
                    {row.price} <span className="text-[11px] text-[#666]">+ IVA</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini form */}
            <div className="border border-border rounded p-5 bg-bg2">
              <div className="text-[15px] font-medium mb-4">¿Quieres una evaluación oficial?</div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className={labelClass}>Nombre</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Nombre del producto</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="ej. Granola Crunchy"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>WhatsApp</label>
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder="+52 81 ..."
                    value={wa}
                    onChange={(e) => setWa(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>
                    Descripción del producto{" "}
                    <span className="text-[#555] normal-case font-sans">(opcional)</span>
                  </label>
                  <textarea
                    className={`${inputClass} resize-y min-h-[80px] leading-relaxed`}
                    placeholder="Cuéntanos más sobre tu producto: ingredientes principales, proceso, presentaciones, mercado objetivo..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </div>
              <motion.button
                onClick={solicitarEvaluacion}
                className="bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-5 py-2.5 rounded inline-flex items-center gap-2"
                whileHover={{ boxShadow: "0 0 28px rgba(198,241,53,0.35)", scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                Solicitar evaluación oficial →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tool 2: Evaluador de producto ──────────────────────────────────────────

function EvaluadorProducto() {
  const [phase, setPhase] = useState<"entry" | "questions" | "result">("entry");
  const [currentQ, setCurrentQ] = useState<QuestionId>(1);
  const [answers, setAnswers] = useState<Partial<Record<QuestionId, Answer>>>({});

  // Contact form
  const [nombre, setNombre] = useState("");
  const [producto, setProducto] = useState("");
  const [tipo, setTipo] = useState("");
  const [presentaciones, setPresentaciones] = useState("");
  const [wa, setWa] = useState("");

  const responder = (q: QuestionId, val: Answer) => {
    const newAnswers = { ...answers, [q]: val };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (q < TOTAL_QUESTIONS) {
        setCurrentQ((q + 1) as QuestionId);
      } else {
        track("herramienta_eval_completada");
        setPhase("result");
      }
    }, 280);
  };

  const reiniciar = () => {
    setAnswers({});
    setCurrentQ(1);
    setPhase("questions");
  };

  const hablarConPuntoAlfa = () => {
    track("herramienta_eval_wa_click");
    const stage = getStageLabel(answers);
    const rec = getRecommendedServices(answers);
    const servicios = rec.length > 0 ? rec.map((k) => SERVICES[k].name).join(", ") : "ninguno (producto listo)";
    const msg = `Hola Punto Alfa 👋 Evalué mi producto. Estoy en etapa ${stage}. Necesito: ${servicios}. Mi producto se llama ${producto || "[producto]"}, es tipo ${tipo || "[tipo]"}, tengo ${presentaciones || "[N]"} presentaciones. Mi número es ${wa || "[WhatsApp]"}.`;
    window.open(`https://wa.me/5218125970372?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inputClass =
    "w-full bg-bg2 border border-border text-white font-mono text-[14px] px-3 py-2.5 rounded focus:outline-none focus:border-neon/40 transition-colors duration-150 placeholder:text-[#333]";
  const labelClass = "font-mono text-[10px] tracking-[0.06em] uppercase text-muted mb-1 block";

  const recommended = getRecommendedServices(answers);
  const stageLabel = getStageLabel(answers);
  const allComplete = recommended.length === 0 && Object.keys(answers).length === TOTAL_QUESTIONS;
  const pct = phase === "result" ? 100 : ((currentQ - 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div>
      {/* Entry */}
      {phase === "entry" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border border-border rounded-lg p-8 bg-bg2"
        >
          <h3 className="text-[clamp(20px,3.5vw,26px)] font-bold leading-tight mb-2">
            ¿No sabes qué necesita tu producto para salir al mercado?
          </h3>
          <p className="text-muted text-[15px] mb-6">Descúbrelo en 2 minutos.</p>
          <motion.button
            onClick={() => { track("herramienta_eval_inicio"); setPhase("questions"); }}
            className="bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-5 py-2.5 rounded inline-flex items-center gap-2"
            whileHover={{ boxShadow: "0 0 28px rgba(198,241,53,0.35)", scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            Iniciar evaluación →
          </motion.button>
        </motion.div>
      )}

      {/* Questions + Result */}
      {phase !== "entry" && (
        <div>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-[3px] bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-neon rounded-full"
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />
            </div>
            <div className="font-mono text-[11px] text-[#555] mt-1.5">
              {phase === "result" ? "Evaluación completa" : `Paso ${currentQ} de ${TOTAL_QUESTIONS}`}
            </div>
          </div>

          {/* Questions */}
          <AnimatePresence mode="wait">
            {phase === "questions" && (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="font-mono text-[11px] text-neon tracking-[0.08em] mb-3">
                  {String(currentQ).padStart(2, "0")} / {String(TOTAL_QUESTIONS).padStart(2, "0")}
                </div>
                <p className="text-[clamp(18px,3.5vw,24px)] font-bold leading-snug mb-8">
                  {QUESTIONS[currentQ]}
                </p>
                <div className="flex gap-3">
                  {(["si", "no"] as Answer[]).map((val) => (
                    <button
                      key={val}
                      onClick={() => responder(currentQ, val)}
                      className={`flex-1 py-3 text-[15px] font-medium rounded border transition-all duration-150 ${
                        answers[currentQ] === val
                          ? "bg-neon text-bg border-neon"
                          : "bg-bg2 border-border text-white hover:border-neon/40 hover:text-neon"
                      }`}
                    >
                      {val === "si" ? "Sí" : "No"}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          {phase === "result" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            >
              <div className="font-mono text-[12px] text-neon tracking-[0.08em] uppercase mb-1.5">
                {stageLabel}
              </div>
              <h3 className="text-[clamp(20px,3.5vw,26px)] font-bold leading-snug mb-6">
                {allComplete
                  ? "¡Listo para el mercado!"
                  : `Tu producto está en ${stageLabel.toLowerCase()}. Lo que necesitas:`}
              </h3>

              {/* Service cards */}
              {!allComplete && (
                <div className="flex flex-col gap-2.5 mb-6">
                  {recommended.map((key) => {
                    const s = SERVICES[key];
                    return (
                      <div
                        key={key}
                        className="border border-neon/30 rounded-lg px-4 py-3 bg-neon/[0.04] flex justify-between items-center gap-4"
                      >
                        <div>
                          <div className="text-[15px] font-medium mb-0.5 flex items-center gap-2">
                            {s.name}
                            {"promo" in s && s.promo && (
                              <span className="font-mono text-[10px] bg-neon/[0.12] text-neon px-1.5 py-0.5 rounded-sm tracking-[0.04em]">
                                PROMO
                              </span>
                            )}
                          </div>
                          <div className="text-[13px] text-[#777]">{s.desc}</div>
                        </div>
                        <div className="font-mono text-[15px] text-neon whitespace-nowrap flex-shrink-0">
                          {s.price}{" "}
                          <span className="text-[11px] text-[#666]">MXN + IVA</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {allComplete && (
                <div className="border border-border rounded-lg p-4 bg-bg2 text-[15px] leading-relaxed mb-6">
                  <span className="text-neon font-medium">Tu producto está listo.</span> Si necesitas actualizar etiquetado NOM-051 podemos ayudarte. Escríbenos cuando quieras.
                </div>
              )}

              {/* Contact form */}
              <div className="border border-border rounded-lg p-5 bg-bg2 mb-5">
                <div className="text-[15px] font-medium mb-4">Habla con Punto Alfa</div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Nombre", placeholder: "Tu nombre", value: nombre, set: setNombre, type: "text" },
                    { label: "Nombre del producto", placeholder: "ej. Salsa Macha", value: producto, set: setProducto, type: "text" },
                    { label: "Tipo de producto", placeholder: "ej. Salsa, snack, bebida...", value: tipo, set: setTipo, type: "text" },
                    { label: "Número de presentaciones", placeholder: "ej. 2", value: presentaciones, set: setPresentaciones, type: "number" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className={labelClass}>{f.label}</label>
                      <input
                        type={f.type}
                        className={inputClass}
                        placeholder={f.placeholder}
                        value={f.value}
                        onChange={(e) => f.set(e.target.value)}
                        min={f.type === "number" ? "1" : undefined}
                      />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className={labelClass}>WhatsApp</label>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="+52 81 ..."
                      value={wa}
                      onChange={(e) => setWa(e.target.value)}
                    />
                  </div>
                </div>
                <motion.button
                  onClick={hablarConPuntoAlfa}
                  className="bg-neon text-bg text-[11px] font-bold tracking-[1px] uppercase px-5 py-2.5 rounded inline-flex items-center gap-2"
                  whileHover={{ boxShadow: "0 0 28px rgba(198,241,53,0.35)", scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  Hablar con Punto Alfa →
                </motion.button>
              </div>

              <button
                onClick={reiniciar}
                className="font-mono text-[11px] text-[#555] tracking-[0.06em] underline underline-offset-4 hover:text-white transition-colors duration-150"
              >
                ← Volver a empezar
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function Tools() {
  const [activeTab, setActiveTab] = useState<"calculadora" | "evaluador">("calculadora");

  return (
    <section id="herramientas" className="py-28 max-w-7xl mx-auto px-6">
      {/* Ambient orb */}
      <div className="relative">
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: 420,
            height: 420,
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(198,241,53,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <motion.div variants={fadeUp} className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-4">
            // Herramientas gratuitas
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight mb-4"
          >
            Calcula. Evalúa. Decide.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted text-[15px] leading-relaxed max-w-md">
            Dos herramientas para entender exactamente en qué etapa está tu producto — antes de hablar con nosotros.
          </motion.p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-1 mb-8 bg-bg2 border border-border rounded-lg p-1 w-fit"
        >
          {(["calculadora", "evaluador"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2 text-[11px] font-bold tracking-[1px] uppercase rounded transition-all duration-250 ${
                activeTab === tab
                  ? "text-bg"
                  : "text-muted hover:text-white"
              }`}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="tools-tab-bg"
                  className="absolute inset-0 bg-neon rounded"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">
                {tab === "calculadora" ? "01 · Calculadora NOM-051" : "02 · Evaluador de producto"}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <motion.div
          variants={fadeScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="glass rounded-xl p-8 md:p-10"
        >
          {/* Tool header */}
          <div className="mb-6 pb-5 border-b border-border">
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-neon mb-1">
              {activeTab === "calculadora" ? "Herramienta 01" : "Herramienta 02"}
            </div>
            <h3 className="text-[clamp(20px,3vw,28px)] font-bold leading-tight">
              {activeTab === "calculadora"
                ? "¿Cuántos sellos lleva tu producto?"
                : "¿Qué necesita tu producto para venderse?"}
            </h3>
            <p className="text-muted text-[13px] font-mono mt-1">
              {activeTab === "calculadora"
                ? "Captura los valores nutrimentales por 100g o 100ml"
                : "Responde 5 preguntas y descubrimos en qué etapa estás"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "calculadora" ? -12 : 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === "calculadora" ? 12 : -12 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            >
              {activeTab === "calculadora" ? <CalculadoraSellos /> : <EvaluadorProducto />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
