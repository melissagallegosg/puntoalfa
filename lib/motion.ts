import { Variants } from "framer-motion";

/* ── Easing curves (Reflect-style: long, confident) ── */
const EASE_OUT_EXPO  = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT    = [0.4, 0, 0.2, 1]  as const;

/* ── Core variants ── */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0, filter: "blur(6px)" },
  visible: {
    opacity: 1, filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_IN_OUT },
  },
};

export const fadeScale: Variants = {
  hidden:  { opacity: 0, scale: 0.94, filter: "blur(4px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -36, filter: "blur(4px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 36, filter: "blur(4px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.88, filter: "blur(6px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export const lineGrow: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

/* ── URLs ── */
export const WHATSAPP_URL =
  "https://wa.me/521XXXXXXXXXX?text=Hola%20Punto%20Alfa%2C%20me%20interesa%20cotizar%20un%20servicio";
export const INSTAGRAM_URL = "https://www.instagram.com/puntoalfamx";
export const FACEBOOK_URL  = "https://www.facebook.com/puntoalfamx";
