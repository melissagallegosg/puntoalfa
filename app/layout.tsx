import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";

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
      "Ciencia, diseño y estrategia para emprendedores alimentarios. NOM-051, etiqueta nutrimental y estrategia digital en un solo equipo.",
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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TLMGJ3WQ');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} font-sans bg-bg text-white antialiased grain`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TLMGJ3WQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
    </html>
  );
}
