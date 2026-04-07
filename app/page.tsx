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

export default function Home() {
  return (
    <>
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
