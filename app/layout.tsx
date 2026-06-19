import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";

const GA_ID = "G-C0KH28F961";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

// TODO: actualizar con el dominio real antes de publicar
const BASE_URL = "https://www.puntoalfamx.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    // CAMBIO: Agrega "NOM-051" y "México" en el title default
    default: "Punto Alfa — Tabla NOM-051 y Etiqueta en 72h · México",
    template: "%s | Punto Alfa",
  },
  description:
    // CAMBIO: Agrega "México" para Local SEO y refuerza la USP de velocidad
    "Agencia técnica para lanzamiento de productos alimenticios en México. Tabla nutrimental NOM-051 en 72 horas desde $800 MXN. Sin laboratorio, 100% remoto. México toda la república.",
  keywords: [
    "NOM-051",
    "tabla nutrimental México",
    "etiqueta NOM-051",
    "tabla nutrimental sin laboratorio",
    "sellos de advertencia NOM-051",
    "diseño de etiqueta alimentaria",
    "lanzamiento producto alimenticio México",
    "consultoría NOM-051 startups",
    "branding empaque alimentos",
    "agencia alimentaria México",
    "COFEPRIS",
    "calculadora NOM-051",
    "etiquetado alimentos México",
  ],
  authors: [{ name: "Punto Alfa", url: BASE_URL }],
  creator: "Punto Alfa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Punto Alfa",
    // CAMBIO: Title OG más directo con keyword + USP
    title: "Punto Alfa — Tu etiqueta NOM-051 lista en 72 horas",
    description:
      "Tabla nutrimental, diseño de etiqueta y estrategia digital para emprendedores alimentarios en México. Desde $800 MXN. Sin enviar muestras.",
    locale: "es_MX",
    images: [
      {
        // ACCIÓN REQUERIDA: Crear este archivo en /public/og-image.png (1200x630px)
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Punto Alfa — Tabla nutrimental NOM-051 en 72 horas para emprendedores alimentarios en México",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Punto Alfa — Tu etiqueta NOM-051 lista en 72 horas",
    description:
      "Tabla nutrimental, diseño de etiqueta y estrategia digital. Desde $800 MXN. Sin laboratorio, 100% remoto.",
    images: ["/og-image.png"],
    creator: "@puntoalfamx",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} font-sans bg-bg text-white antialiased grain`}
      >
        {/* Aurora Background */}
        <div className="aurora-bg" />

        {/* Gradient Orbs */}
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />

        {/* Particles Container */}
        <div className="particles-container" id="particles" />
        <ParticleBackground />

        {children}
      </body>

      {/* ── Google Analytics 4 ── */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </html>
  );
}
