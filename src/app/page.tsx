import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Levels } from "@/components/home/levels";
import { SimulatorPreview } from "@/components/home/simulator-preview";
import { Features } from "@/components/home/features";
import { CTA } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Levels />
        <SimulatorPreview />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
