"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stagger, fadeUp, viewport } from "@/lib/animations";

const STATS = [
  { value: "3", label: "ścieżki nauki" },
  { value: "40+", label: "lekcji i ćwiczeń" },
  { value: "0 zł", label: "żeby zacząć" },
];

export function CTA() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="visible" viewport={viewport}>

          <div className="relative rounded-3xl overflow-hidden border border-[var(--border-md)]"
            style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0f4ff 100%)" }}>

            {/* Subtle orbs */}
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(8,145,178,0.05) 0%, transparent 70%)" }} />

            <div className="relative z-10 p-10 sm:p-16 text-center">
              <motion.p variants={fadeUp}
                className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-6">
                Zacznij teraz
              </motion.p>

              <motion.h2 variants={fadeUp}
                className="font-display text-5xl sm:text-6xl font-bold tracking-[-0.02em] text-[var(--fg)] leading-tight mb-5">
                Czas przestać oglądać
                <br />
                <span className="text-gradient italic">jak AI się dzieje.</span>
              </motion.h2>

              <motion.p variants={fadeUp} className="text-lg text-[var(--fg-muted)] max-w-lg mx-auto mb-12">
                Dołącz do tych którzy już budują z AI — produkty, procesy, biznesy.
              </motion.p>

              <motion.div variants={fadeUp}
                className="flex items-center justify-center gap-10 sm:gap-20 mb-12">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-4xl font-bold text-[var(--fg)] tracking-tight">{stat.value}</p>
                    <p className="text-xs text-[var(--fg-subtle)] mt-1 tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/onboarding"
                  className="btn-primary group inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold rounded-xl">
                  Zacznij
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/simulator"
                  className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold rounded-xl
                    bg-white border border-[var(--border-md)] text-[var(--fg-muted)]
                    hover:text-[var(--fg)] hover:border-[var(--border-md)] hover:shadow-sm
                    transition-all duration-300">
                  Prompt Simulator
                </Link>
              </motion.div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
