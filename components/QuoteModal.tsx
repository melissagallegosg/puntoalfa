"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { waUrl, EASE_OUT_EXPO } from "@/lib/motion";

/* ── Types ── */
interface FormData {
  productCount: "one" | "several" | "";
  productVariant: "different" | "same-flavors" | "";
  productName: string;
  productType: string;
  productTypeOther: string;
  origin: "mexico" | "imported" | "";
  presentations: string;
  hasFormulation: "yes" | "no" | "";
  services: string[];
  description: string;
}

const PRODUCT_TYPES = ["Salsa", "Snack", "Bebida", "Suplemento", "Panificación", "Otro"];
const SERVICES = [
  "Tabla nutrimental",
  "Sellos NOM-051",
  "Etiquetado completo",
  "Corrección de etiqueta",
  "Revisión NOM",
  "Otro",
];

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/* ── Progress bar ── */
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = ((step - 1) / (total - 1)) * 100;
  return (
    <div className="w-full h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-neon rounded-full"
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      />
    </div>
  );
}

/* ── Radio card ── */
function RadioCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left px-5 py-4 rounded-lg border text-[14px] font-medium transition-all duration-200 cursor-pointer ${
        selected
          ? "border-neon bg-neon/[0.08] text-white"
          : "border-white/[0.08] bg-white/[0.02] text-[#aaa] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
            selected ? "border-neon bg-neon" : "border-white/30"
          }`}
        >
          {selected && (
            <div className="w-1.5 h-1.5 rounded-full bg-bg" />
          )}
        </div>
        {children}
      </div>
    </motion.button>
  );
}

/* ── Checkbox card ── */
function CheckCard({
  checked,
  onClick,
  children,
}: {
  checked: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left px-5 py-3.5 rounded-lg border text-[13px] font-medium transition-all duration-200 cursor-pointer ${
        checked
          ? "border-neon bg-neon/[0.08] text-white"
          : "border-white/[0.08] bg-white/[0.02] text-[#aaa] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
            checked ? "border-neon bg-neon" : "border-white/30"
          }`}
        >
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        {children}
      </div>
    </motion.button>
  );
}

/* ── Step label ── */
function StepLabel({ label }: { label: string }) {
  return (
    <p className="text-[10px] tracking-[3px] uppercase text-neon font-mono mb-2">{label}</p>
  );
}

/* ── Heading ── */
function StepHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[20px] font-bold text-white mb-6 leading-snug">{children}</h3>
  );
}

/* ── Build WhatsApp message ── */
function buildMessage(data: FormData): string {
  const lines: string[] = [];
  lines.push("Hola Punto Alfa 👋");
  lines.push("Quiero cotizar un servicio.\n");

  if (data.productCount === "one") {
    lines.push("• Productos: 1 producto");
  } else if (data.productCount === "several") {
    const variant =
      data.productVariant === "different"
        ? "Productos diferentes"
        : "Varios sabores del mismo producto";
    lines.push(`• Productos: ${variant}`);
  }

  if (data.productName) lines.push(`• Producto: ${data.productName}`);

  const type =
    data.productType === "Otro" && data.productTypeOther
      ? data.productTypeOther
      : data.productType;
  if (type) lines.push(`• Tipo: ${type}`);

  if (data.origin === "mexico") lines.push("• Fabricado en México");
  else if (data.origin === "imported") lines.push("• Importado");

  if (data.presentations) lines.push(`• Presentaciones: ${data.presentations}`);

  if (data.hasFormulation === "yes") lines.push("• Cuenta con formulación: Sí");
  else if (data.hasFormulation === "no") lines.push("• Cuenta con formulación: No");

  if (data.services.length > 0) {
    lines.push("• Servicios requeridos:");
    data.services.forEach((s) => lines.push(`  - ${s}`));
  }

  if (data.description) {
    lines.push(`\nDescripción:\n${data.description}`);
  }

  return lines.join("\n");
}

/* ── Determine total steps based on answers ── */
function getTotalSteps(data: FormData) {
  // If only 1 product, skip step 2 (variant). Steps: 1,3,4,5,6,7,8,9
  return data.productCount === "one" ? 8 : 9;
}

function getStepIndex(step: number, data: FormData): number {
  // Visual step number for progress bar
  if (data.productCount === "one" && step >= 3) return step - 1;
  return step;
}

/* ── Main Modal ── */
export default function QuoteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormData>({
    productCount: "",
    productVariant: "",
    productName: "",
    productType: "",
    productTypeOther: "",
    origin: "",
    presentations: "",
    hasFormulation: "",
    services: [],
    description: "",
  });

  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setStep(1);
      setDirection(1);
      setForm({
        productCount: "",
        productVariant: "",
        productName: "",
        productType: "",
        productTypeOther: "",
        origin: "",
        presentations: "",
        hasFormulation: "",
        services: [],
        description: "",
      });
    }
  }, [open]);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const totalSteps = getTotalSteps(form);
  const visualStep = getStepIndex(step, form);

  const goNext = useCallback(() => {
    setDirection(1);
    // Skip step 2 if only one product
    if (step === 1 && form.productCount === "one") {
      setStep(3);
    } else {
      setStep((s) => s + 1);
    }
  }, [step, form.productCount]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    if (step === 3 && form.productCount === "one") {
      setStep(1);
    } else {
      setStep((s) => s - 1);
    }
  }, [step, form.productCount]);

  const toggleService = (service: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return form.productCount !== "";
      case 2: return form.productVariant !== "";
      case 3: return form.productName.trim() !== "";
      case 4: return form.productType !== "" && (form.productType !== "Otro" || form.productTypeOther.trim() !== "");
      case 5: return form.origin !== "";
      case 6: return form.presentations.trim() !== "";
      case 7: return form.hasFormulation !== "";
      case 8: return form.services.length > 0;
      case 9: return true;
      default: return false;
    }
  };

  const handleSubmit = () => {
    const msg = buildMessage(form);
    window.open(waUrl(msg), "_blank", "noopener,noreferrer");
    onClose();
  };

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (d: number) => ({
      x: d > 0 ? -40 : 40,
      opacity: 0,
      filter: "blur(6px)",
    }),
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <StepLabel>// 01 — Alcance</StepLabel>
            <StepHeading>¿Cuántos productos deseas cotizar?</StepHeading>
            <div className="flex flex-col gap-3">
              <RadioCard
                selected={form.productCount === "one"}
                onClick={() => setForm((f) => ({ ...f, productCount: "one", productVariant: "" }))}
              >
                Un producto
              </RadioCard>
              <RadioCard
                selected={form.productCount === "several"}
                onClick={() => setForm((f) => ({ ...f, productCount: "several" }))}
              >
                Varios productos
              </RadioCard>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <StepLabel>// 02 — Variantes</StepLabel>
            <StepHeading>¿Son productos diferentes o varios sabores del mismo producto?</StepHeading>
            <div className="flex flex-col gap-3">
              <RadioCard
                selected={form.productVariant === "different"}
                onClick={() => setForm((f) => ({ ...f, productVariant: "different" }))}
              >
                Productos diferentes
              </RadioCard>
              <RadioCard
                selected={form.productVariant === "same-flavors"}
                onClick={() => setForm((f) => ({ ...f, productVariant: "same-flavors" }))}
              >
                Varios sabores del mismo producto
              </RadioCard>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <StepLabel>// {form.productCount === "one" ? "02" : "03"} — Nombre</StepLabel>
            <StepHeading>Nombre del producto</StepHeading>
            <input
              autoFocus
              type="text"
              placeholder="Ej. Salsa Macha Artesanal"
              value={form.productName}
              onChange={(e) => setForm((f) => ({ ...f, productName: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && canProceed() && goNext()}
              className="w-full bg-white/[0.03] border border-white/[0.10] rounded-lg px-4 py-3.5 text-white text-[15px] placeholder-white/20 focus:outline-none focus:border-neon/50 focus:bg-neon/[0.04] transition-all duration-200"
            />
          </>
        );

      case 4:
        return (
          <>
            <StepLabel>// {form.productCount === "one" ? "03" : "04"} — Tipo</StepLabel>
            <StepHeading>Tipo de producto</StepHeading>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {PRODUCT_TYPES.map((t) => (
                <RadioCard
                  key={t}
                  selected={form.productType === t}
                  onClick={() => setForm((f) => ({ ...f, productType: t, productTypeOther: t !== "Otro" ? "" : f.productTypeOther }))}
                >
                  {t}
                </RadioCard>
              ))}
            </div>
            {form.productType === "Otro" && (
              <motion.input
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                autoFocus
                type="text"
                placeholder="Especifica el tipo de producto"
                value={form.productTypeOther}
                onChange={(e) => setForm((f) => ({ ...f, productTypeOther: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/[0.10] rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-neon/50 focus:bg-neon/[0.04] transition-all duration-200 mt-1"
              />
            )}
          </>
        );

      case 5:
        return (
          <>
            <StepLabel>// {form.productCount === "one" ? "04" : "05"} — Origen</StepLabel>
            <StepHeading>¿El producto es…?</StepHeading>
            <div className="flex flex-col gap-3">
              <RadioCard
                selected={form.origin === "mexico"}
                onClick={() => setForm((f) => ({ ...f, origin: "mexico" }))}
              >
                Fabricado en México
              </RadioCard>
              <RadioCard
                selected={form.origin === "imported"}
                onClick={() => setForm((f) => ({ ...f, origin: "imported" }))}
              >
                Importado
              </RadioCard>
            </div>
          </>
        );

      case 6:
        return (
          <>
            <StepLabel>// {form.productCount === "one" ? "05" : "06"} — Presentaciones</StepLabel>
            <StepHeading>Presentaciones / contenido neto</StepHeading>
            <p className="text-muted text-[13px] mb-4 -mt-3">Ej: 20 g, 80 g, 1 L, 500 ml</p>
            <input
              autoFocus
              type="text"
              placeholder="Ej. 250 g y 500 g"
              value={form.presentations}
              onChange={(e) => setForm((f) => ({ ...f, presentations: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && canProceed() && goNext()}
              className="w-full bg-white/[0.03] border border-white/[0.10] rounded-lg px-4 py-3.5 text-white text-[15px] placeholder-white/20 focus:outline-none focus:border-neon/50 focus:bg-neon/[0.04] transition-all duration-200"
            />
          </>
        );

      case 7:
        return (
          <>
            <StepLabel>// {form.productCount === "one" ? "06" : "07"} — Formulación</StepLabel>
            <StepHeading>¿Cuentas con la formulación o ingredientes del producto?</StepHeading>
            <div className="flex flex-col gap-3">
              <RadioCard
                selected={form.hasFormulation === "yes"}
                onClick={() => setForm((f) => ({ ...f, hasFormulation: "yes" }))}
              >
                Sí, tengo la formulación
              </RadioCard>
              <RadioCard
                selected={form.hasFormulation === "no"}
                onClick={() => setForm((f) => ({ ...f, hasFormulation: "no" }))}
              >
                No por el momento
              </RadioCard>
            </div>
          </>
        );

      case 8:
        return (
          <>
            <StepLabel>// {form.productCount === "one" ? "07" : "08"} — Servicios</StepLabel>
            <StepHeading>¿Qué necesitas cotizar?</StepHeading>
            <p className="text-muted text-[13px] mb-4 -mt-3">Puedes seleccionar varios</p>
            <div className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <CheckCard
                  key={s}
                  checked={form.services.includes(s)}
                  onClick={() => toggleService(s)}
                >
                  {s}
                </CheckCard>
              ))}
            </div>
          </>
        );

      case 9:
        return (
          <>
            <StepLabel>// {form.productCount === "one" ? "08" : "09"} — Descripción</StepLabel>
            <StepHeading>Describe brevemente tu producto o lo que necesitas</StepHeading>
            <p className="text-muted text-[13px] mb-4 -mt-3">Opcional, pero nos ayuda a preparar una cotización más precisa.</p>
            <textarea
              autoFocus
              rows={5}
              placeholder="Ej. Producto artesanal para comercialización nacional, receta familiar, queremos lanzarlo en tiendas locales..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full bg-white/[0.03] border border-white/[0.10] rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-neon/50 focus:bg-neon/[0.04] transition-all duration-200 resize-none leading-relaxed"
            />
          </>
        );

      default:
        return null;
    }
  };

  const isLast = step === 9;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, scale: 0.97, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 py-6 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md pointer-events-auto"
              style={{
                background: "rgba(14,14,14,0.96)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                backdropFilter: "blur(40px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 80px rgba(198,241,53,0.04)",
              }}
            >
              {/* Top bar */}
              <div className="px-6 pt-5 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[2px] uppercase text-neon font-mono">
                    Cotizar servicio
                  </span>
                  <button
                    onClick={onClose}
                    className="w-7 h-7 rounded-full border border-white/[0.10] flex items-center justify-center text-muted hover:border-white/20 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <ProgressBar step={visualStep} total={totalSteps} />
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-muted/50 font-mono">
                    Paso {visualStep} de {totalSteps}
                  </span>
                  <span className="text-[10px] text-muted/40 font-mono">
                    {Math.round(((visualStep - 1) / (totalSteps - 1)) * 100)}%
                  </span>
                </div>
              </div>

              {/* Step content */}
              <div className="px-6 py-6 min-h-[280px] overflow-hidden relative">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="px-6 pb-5 flex items-center gap-3">
                {step > 1 && (
                  <button
                    onClick={goPrev}
                    className="flex items-center gap-2 text-muted text-[12px] font-medium tracking-[0.5px] hover:text-white transition-colors duration-200 cursor-pointer px-3 py-2.5 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08]"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Atrás
                  </button>
                )}

                <div className="flex-1" />

                {isLast ? (
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ boxShadow: "0 0 40px rgba(198,241,53,0.35)" }}
                    className="relative overflow-hidden bg-neon text-bg text-[12px] font-bold tracking-[1px] uppercase px-6 py-3 rounded-lg cursor-pointer flex items-center gap-2 transition-shadow duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.852L0 24l6.303-1.517A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.502-5.178-1.38l-.371-.22-3.844.924.966-3.732-.242-.386A9.959 9.959 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                    Enviar por WhatsApp
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={goNext}
                    disabled={!canProceed()}
                    whileTap={canProceed() ? { scale: 0.97 } : {}}
                    className={`text-[12px] font-bold tracking-[1px] uppercase px-6 py-3 rounded-lg cursor-pointer flex items-center gap-2 transition-all duration-200 ${
                      canProceed()
                        ? "bg-neon text-bg hover:shadow-[0_0_28px_rgba(198,241,53,0.35)]"
                        : "bg-white/[0.06] text-white/20 cursor-not-allowed"
                    }`}
                  >
                    Continuar
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                )}
              </div>

              {/* Ambient neon glow */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-16 rounded-full pointer-events-none"
                style={{
                  background: "rgba(198,241,53,0.12)",
                  filter: "blur(32px)",
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
