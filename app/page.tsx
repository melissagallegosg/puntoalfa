import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import ForWhom from "@/components/ForWhom";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";
import FloatingWA from "@/components/FloatingWA";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Punto Alfa",
  description:
    "Agencia técnica especializada en lanzamiento de productos alimenticios en México. NOM-051, diseño de etiqueta y estrategia digital.",
  url: "https://www.puntoalfamx.com",
  logo: "https://www.puntoalfamx.com/images/logo.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Monterrey",
    addressRegion: "Nuevo León",
    addressCountry: "MX",
  },
  areaServed: {
    "@type": "Country",
    name: "México",
  },
  sameAs: [
    "https://www.instagram.com/puntoalfamx",
    "https://www.facebook.com/puntoalfamx",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Punto Alfa",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Tabla nutrimental NOM-051",
        description:
          "Cálculo teórico de tabla nutrimental y sellos de advertencia conforme a NOM-051-SCFI/SSAI-2010",
        price: "2300",
        priceCurrency: "MXN",
      },
      {
        "@type": "Offer",
        name: "Inicio Producto",
        description:
          "Tabla + sellos NOM-051 + validación pre-impresión + branding de empaque",
        price: "5000",
        priceCurrency: "MXN",
      },
      {
        "@type": "Offer",
        name: "Lanzamiento",
        description:
          "NOM-051 completo + diseño de empaque + landing page + estrategia de redes",
        price: "9000",
        priceCurrency: "MXN",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <ForWhom />
        <Process />
        <Pricing />
        <CTABand />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
