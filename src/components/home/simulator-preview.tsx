"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, TrendingUp, Check } from "lucide-react";
import { stagger, fadeUp, slideLeft, slideRight, viewport } from "@/lib/animations";

const improvements = [
  { tag: "Rola / Persona", desc: "AI wie kim jest i jaką ma perspektywę" },
  { tag: "Kontekst", desc: "Numer zamówienia, przyczyna, czas opóźnienia" },
  { tag: "Format wyjścia", desc: "Struktura maila, długość, CTA" },
  { tag: "Ograniczenia", desc: "Ton, co zawrzeć, co pominąć" },
];

export function SimulatorPreview() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(139,92,246,0.03)] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={viewport}
          className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-4">
            Prompt Simulator
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-display text-5xl sm:text-6xl font-bold tracking-[-0.02em] leading-tight mb-5 text-[var(--fg)]">
            Widzisz różnicę?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[var(--fg-muted)] max-w-xl mx-auto">
            Wpisujesz prompt jak to robisz teraz. AI go ocenia, poprawia i pokazuje jak wygląda wynik z jednym i drugim.
          </motion.p>
        </motion.div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Before */}
          <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={viewport}
            className="rounded-2xl border border-red-500/15 bg-red-500/[0.04] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-red-500/10 flex items-center justify-between">
              <span className="text-sm font-semibold text-red-400">Twój prompt</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full bg-red-500/20 overflow-hidden">
                  <div className="h-full w-[18%] rounded-full bg-red-500" />
                </div>
                <span className="text-xs font-bold text-red-400">18%</span>
              </div>
            </div>
            <div className="p-5">
              <p className="font-mono text-sm text-[var(--fg-muted)] italic">
                "napisz mi email do klienta że zamówienie jest opóźnione"
              </p>
            </div>
          </motion.div>

          {/* After */}
          <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewport}
            className="rounded-2xl border border-green-500/15 bg-green-500/[0.04] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-green-500/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-green-400" />
                <span className="text-sm font-semibold text-green-400">Po optymalizacji</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full bg-green-500/20 overflow-hidden">
                  <div className="h-full w-[92%] rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />92%
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="font-mono text-xs text-[var(--fg-muted)] leading-relaxed whitespace-pre-line">{`Wciel się w rolę customer success managera w firmie e-commerce.

Napisz profesjonalny, empatyczny email do klienta informujący o 3-dniowym opóźnieniu zamówienia #12345.

Email powinien:
- zaczynać się od przeprosin
- wyjaśnić przyczynę opóźnienia
- podać nową datę dostawy
- zaproponować 10% zniżkę

Ton: profesjonalny ale ludzki. Maks 150 słów.`}</p>
            </div>
          </motion.div>
        </div>

        {/* Improvements breakdown */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 mb-10">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--fg-subtle)] mb-5">Co zostało poprawione</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {improvements.map((imp) => (
              <div key={imp.tag} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/25 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--fg)] mb-0.5">{imp.tag}</p>
                  <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">{imp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-center">
          <Link href="/simulator"
            className="btn-primary group inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold rounded-xl shadow-[0_0_0_1px_rgba(139,92,246,0.3)]">
            <Zap className="w-4 h-4" />
            Spróbuj na swoim prompcie
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
