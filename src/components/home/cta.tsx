"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import { stagger, fadeUp, viewport } from "@/lib/animations";

const STATS = [
  { value: "3", label: "ścieżki nauki" },
  { value: "40+", label: "lekcji i ćwiczeń" },
  { value: "0zł", label: "żeby zacząć" },
];

export function CTA() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="visible" viewport={viewport}>

          {/* Main card */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl p-px"
              style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.4), rgba(37,99,235,0.2), rgba(8,145,178,0.3))" }}>
              <div className="absolute inset-0 rounded-3xl bg-[var(--bg-card)]" />
            </div>

            {/* Subtle inner orbs */}
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.07) 0%, transparent 70%)" }} />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />

            <div className="relative z-10 p-10 sm:p-16 text-center">
              <motion.div variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] text-sm text-[var(--fg-muted)] mb-8">
                <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                Zacznij za darmo — bez karty kredytowej
              </motion.div>

              <motion.h2 variants={fadeUp}
                className="text-5xl sm:text-6xl font-black tracking-[-0.03em] text-[var(--fg)] leading-tight mb-5">
                Czas przestać oglądać
                <br />
                <span className="text-gradient">jak AI się dzieje.</span>
              </motion.h2>

              <motion.p variants={fadeUp} className="text-lg text-[var(--fg-muted)] max-w-lg mx-auto mb-10">
                Dołącz do tych którzy już budują z AI — produkty, procesy, biznesy.
              </motion.p>

              {/* Stats */}
              <motion.div variants={fadeUp}
                className="flex items-center justify-center gap-8 sm:gap-16 mb-12">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-black text-[var(--fg)] tracking-tight">{stat.value}</p>
                    <p className="text-xs text-[var(--fg-subtle)] mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/onboarding"
                  className="btn-primary group inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold rounded-xl">
                  <Zap className="w-4 h-4" />
                  Zacznij teraz za darmo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/simulator"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold rounded-xl
                    bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--fg-muted)]
                    hover:text-[var(--fg)] hover:border-[var(--border-md)] hover:shadow-md
                    shadow-sm transition-all duration-300">
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
