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

export const metadata: Metadata = {
  title: "Punto Alfa — Ciencia · Diseño · Estrategia",
  description:
    "Agencia técnica especializada en lanzamiento de productos alimenticios. NOM-051, diseño de etiqueta y estrategia digital en un solo lugar.",
  keywords: ["NOM-051", "etiqueta nutrimental", "lanzamiento de producto", "industria alimentaria", "México"],
  openGraph: {
    title: "Punto Alfa — De la receta al mercado",
    description: "Ciencia, diseño y estrategia para emprendedores alimentarios.",
    type: "website",
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
