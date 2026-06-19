import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import ForWhom from "@/components/ForWhom";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Tools from "@/components/Tools";
import FAQ from "@/components/FAQ";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";
import FloatingWA from "@/components/FloatingWA";

// Schema 1: LocalBusiness (reemplaza ProfessionalService — más específico para Local SEO)
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://www.puntoalfamx.com/#organization",
  name: "Punto Alfa",
  description:
    "Agencia técnica especializada en lanzamiento de productos alimenticios en México. NOM-051, diseño de etiqueta nutrimental y estrategia digital en un solo equipo.",
  url: "https://www.puntoalfamx.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.puntoalfamx.com/images/logo.jpg",
    width: 200,
    height: 200,
  },
  image: "https://www.puntoalfamx.com/og-image.png",
  telephone: "+52-81-2597-0372",
  priceRange: "$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "México",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.6866,
    longitude: -100.3161,
  },
  areaServed: { "@type": "Country", name: "México" },
  openingHours: "Mo-Fr 09:00-18:00",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+52-81-2597-0372",
    contactType: "customer service",
    availableLanguage: "Spanish",
    contactOption: "TollFree",
  },
  sameAs: [
    "https://www.instagram.com/puntoalfamx",
    "https://www.facebook.com/puntoalfamx",
    "https://www.tiktok.com/@puntoalfamx",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Punto Alfa",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Tabla nutrimental NOM-051 por cálculo teórico",
        description:
          "Cálculo teórico de tabla nutrimental y determinación de sellos frontales de advertencia (octágonos) conforme a NOM-051-SCFI/SSAI-2010. Entrega en 2–3 días hábiles. Sin enviar muestras físicas.",
        price: "800",
        priceCurrency: "MXN",
        availability: "https://schema.org/InStock",
        url: "https://www.puntoalfamx.com/#lab",
        seller: { "@id": "https://www.puntoalfamx.com/#organization" },
      },
      {
        "@type": "Offer",
        name: "Paquete 1 — Etiqueta + Imagen de Producto",
        description:
          "Tabla nutrimental NOM-051 + diseño de etiqueta regulatoria + identidad visual básica + mockups para venta. Archivos listos para imprenta.",
        price: "5000",
        priceCurrency: "MXN",
        availability: "https://schema.org/InStock",
        url: "https://www.puntoalfamx.com/#creativo",
        seller: { "@id": "https://www.puntoalfamx.com/#organization" },
      },
      {
        "@type": "Offer",
        name: "Paquete Marca Completa",
        description:
          "NOM-051 completo + diseño de empaque + landing page + estrategia de redes sociales. Todo para lanzar un producto alimenticio desde cero.",
        price: "11000",
        priceCurrency: "MXN",
        availability: "https://schema.org/InStock",
        url: "https://www.puntoalfamx.com/#paquetes",
        seller: { "@id": "https://www.puntoalfamx.com/#organization" },
      },
    ],
  },
};

// Schema 2: WebSite con SearchAction
const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.puntoalfamx.com/#website",
  name: "Punto Alfa",
  url: "https://www.puntoalfamx.com",
  description: "Agencia técnica para lanzamiento de productos alimenticios en México",
  publisher: { "@id": "https://www.puntoalfamx.com/#organization" },
  inLanguage: "es-MX",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.puntoalfamx.com/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// Schema 3: FAQPage (extrae las preguntas del componente FAQ.tsx)
const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Es legal la tabla nutrimental por cálculo teórico en México?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. El inciso 4.2.8.3.8 de la NOM-051 permite el uso de bases de datos nutrimentales reconocidas internacionalmente. Es el método que usa la gran mayoría de productos envasados en México y es completamente válido ante la autoridad (COFEPRIS y SENASICA).",
      },
    },
    {
      "@type": "Question",
      name: "¿La tabla nutrimental por cálculo teórico la aceptan en supermercados?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Walmart, Chedraui, OXXO y la mayoría de cadenas de distribución en México aceptan tablas nutrimentales por cálculo teórico. No es requisito el análisis de laboratorio para comercialización en territorio nacional.",
      },
    },
    {
      "@type": "Question",
      name: "¿Necesito enviar muestras físicas para calcular la tabla nutrimental?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Solo necesitamos tu lista completa de ingredientes con cantidades en gramos. Todo el proceso se hace de forma remota por WhatsApp o correo electrónico. Sin envíos físicos, sin costos adicionales de logística.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tiempo tarda la tabla nutrimental NOM-051?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La tabla nutrimental teórica con sellos NOM-051 tiene entrega en 2 a 3 días hábiles. Si además necesitas diseño de etiqueta, se agrega 1 semana adicional. El paquete Marca Completa (NOM-051 + identidad + etiqueta + digital) tarda 3 a 4 semanas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué pasa si mi receta cambia después de calcular la tabla nutrimental?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Si los cambios son menores, la tabla generalmente se mantiene válida. Si cambias ingredientes principales, Punto Alfa ofrece actualización a precio reducido. Cada caso se evalúa individualmente.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta la tabla nutrimental NOM-051 en México?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En Punto Alfa, la tabla nutrimental por cálculo teórico con sellos NOM-051 tiene un precio promocional de $800 MXN (precio normal $1,600 MXN). El paquete completo de etiqueta lista para venta cuesta $5,000 MXN, y el paquete Marca Completa $11,000 MXN.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <ForWhom />
        <Process />
        <Pricing />
        <Tools />
        <FAQ />
        <CTABand />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
