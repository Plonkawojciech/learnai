import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SimulatorClient } from "@/components/simulator/simulator-client";

export const metadata = {
  title: "Prompt Simulator — LearnAI",
  description: "Wpisz swój prompt, AI poprawi go i pokaże konkretną różnicę w wynikach.",
};

export default function SimulatorPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <SimulatorClient />
      </main>
      <Footer />
    </>
  );
}
