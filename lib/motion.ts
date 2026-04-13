import { Variants } from "framer-motion";

/* ── Easing curves — Reflect-style: slow, confident, expo ── */
export const EASE_OUT_EXPO  = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT    = [0.4, 0, 0.2, 1]  as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1, filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_IN_OUT },
  },
};

export const fadeScale: Variants = {
  hidden:  { opacity: 0, scale: 0.93, filter: "blur(6px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

/* ── Word-by-word reveal (Reflect headline technique) ── */
export const wordReveal: Variants = {
  hidden:  { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
};

export const staggerWords: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.1 } },
};

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -44, filter: "blur(6px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 44, filter: "blur(6px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.86, filter: "blur(8px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export const lineGrow: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

export const clipReveal: Variants = {
  hidden:  { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.95, ease: EASE_OUT_EXPO },
  },
};

const WA_NUMBER = "528125970372";

export const WHATSAPP_URL =
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola Punto Alfa, me interesa cotizar un servicio.")}`;

export const INSTAGRAM_URL = "https://www.instagram.com/puntoalfamx";
export const FACEBOOK_URL  = "https://www.facebook.com/puntoalfamx";

export function waUrl(mensaje: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}
