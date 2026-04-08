import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Punto Alfa — Ciencia · Diseño · Estrategia",
    template: "%s | Punto Alfa",
  },
  description:
    "Agencia técnica especializada en lanzamiento de productos alimenticios en México. NOM-051, etiqueta nutrimental, diseño de empaque y estrategia digital en un solo lugar.",
  keywords: [
    "NOM-051",
    "etiqueta nutrimental",
    "tabla nutrimental México",
    "lanzamiento de producto alimenticio",
    "industria alimentaria México",
    "sellos de advertencia",
    "diseño de etiqueta",
    "emprendedor alimentario",
    "COFEPRIS",
    "branding de empaque",
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
    title: "Punto Alfa — De la receta al mercado",
    description:
      "Ciencia, diseño y estrategia para emprendedores alimentarios. NOM-051, etiqueta nutrimental y estrategia digital en un solo equipo. Monterrey, México.",
    locale: "es_MX",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Punto Alfa — Agencia técnica para lanzamiento de productos alimenticios en México",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Punto Alfa — De la receta al mercado",
    description:
      "Ciencia, diseño y estrategia para emprendedores alimentarios. NOM-051, etiqueta nutrimental y digital en un solo equipo.",
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
        {children}
      </body>
    </html>
  );
}
