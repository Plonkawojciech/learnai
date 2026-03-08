"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stagger, fadeUp, viewport } from "@/lib/animations";

const levels = [
  {
    num: "01",
    label: "Normalny człowiek",
    tagline: "Nigdy nie używałeś AI lub klikasz okazjonalnie.",
    items: [
      "Co to jest AI i jak działa",
      "ChatGPT vs Claude — kiedy co",
      "AI do maili, dokumentów, prezentacji",
      "Pisz prompty które działają",
    ],
  },
  {
    num: "02",
    label: "Profesjonalista",
    tagline: "Używasz AI ale wyciągasz 20% możliwości.",
    items: [
      "Zaawansowany prompt engineering",
      "AI workflow i automatyzacje",
      "Spec Engineering — idealne briefy",
      "Analiza danych i raporty z AI",
    ],
  },
  {
    num: "03",
    label: "Builder / Dev",
    tagline: "Programujesz i chcesz budować produkty z AI.",
    items: [
      "Anthropic/OpenAI API od zera",
      "RAG — własna baza wiedzy",
      "AI Agents — autonomiczne systemy",
      "Fine-tuning i ewaluacja modeli",
    ],
  },
];

export function Levels() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(37,99,235,0.03), transparent)" }} />

      <div className="max-w-5xl mx-auto">
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={viewport}
          className="mb-20">
          <motion.p variants={fadeUp}
            className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-5">
            Dla kogo
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-display text-5xl sm:text-6xl font-bold tracking-[-0.02em] leading-tight text-[var(--fg)]">
            Jeden cel.{" "}
            <span className="text-[var(--fg-muted)]">Trzy drogi.</span>
          </motion.h2>
        </motion.div>

        {/* Three columns — no cards, clean editorial */}
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] border-t border-[var(--border)]">
          {levels.map((level, i) => (
            <motion.div
              key={level.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className={`pt-10 pb-8 ${i === 0 ? "" : "md:pl-10"} ${i === 2 ? "" : "md:pr-10"}`}
            >
              <p className="text-[11px] font-mono text-[var(--fg-subtle)] mb-6 tabular-nums">{level.num}</p>
              <h3 className="text-2xl font-bold text-[var(--fg)] mb-3 tracking-tight">{level.label}</h3>
              <p className="text-sm text-[var(--fg-muted)] mb-8 leading-relaxed">{level.tagline}</p>

              <ul className="space-y-2.5 mb-8">
                {level.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--fg-muted)]">
                    <span className="w-1 h-1 rounded-full bg-[var(--fg-subtle)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/onboarding"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] hover:gap-3 transition-all duration-200">
                Zacznij tę ścieżkę
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
