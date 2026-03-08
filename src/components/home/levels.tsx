"use client";

import { motion } from "framer-motion";
import { User, Briefcase, Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { stagger, fadeUp, viewport } from "@/lib/animations";

const levels = [
  {
    icon: User,
    num: "01",
    label: "Normalny człowiek",
    accent: "#059669",
    light: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.2)",
    tagline: "Nigdy nie używałeś AI lub klikasz okazjonalnie.",
    items: ["Co to jest AI i jak działa", "ChatGPT vs Claude — kiedy co", "AI do maili, dokumentów, prezentacji", "Pisz prompty które działają"],
  },
  {
    icon: Briefcase,
    num: "02",
    label: "Profesjonalista",
    accent: "#2563eb",
    light: "rgba(37,99,235,0.08)",
    border: "rgba(37,99,235,0.2)",
    tagline: "Używasz AI ale wyciągasz 20% możliwości.",
    items: ["Zaawansowany prompt engineering", "AI workflow i automatyzacje", "Spec Engineering — idealne briefy", "Analiza danych i raporty z AI"],
  },
  {
    icon: Code2,
    num: "03",
    label: "Builder / Dev",
    accent: "#6d28d9",
    light: "rgba(109,40,217,0.08)",
    border: "rgba(109,40,217,0.2)",
    tagline: "Programujesz i chcesz budować produkty z AI.",
    items: ["Anthropic/OpenAI API od zera", "RAG — własna baza wiedzy", "AI Agents — autonomiczne systemy", "Fine-tuning i ewaluacja modeli"],
  },
];

export function Levels() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Subtle background tint */}
      <div className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(109,40,217,0.04), transparent)" }} />

      <div className="max-w-6xl mx-auto">
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={viewport}
          className="text-center mb-20">
          <motion.p variants={fadeUp}
            className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-4">
            Dla kogo
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="text-5xl sm:text-6xl font-black tracking-[-0.03em] leading-tight mb-5 text-[var(--fg)]">
            Jeden cel.
            <span className="text-[var(--fg-muted)]"> Trzy drogi.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[var(--fg-muted)] max-w-lg mx-auto">
            Bez względu na to skąd zaczynasz — tu jest ścieżka dla Ciebie.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {levels.map((level, i) => (
            <motion.div
              key={level.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="card h-full p-8 overflow-hidden"
                style={{ borderColor: "var(--border)" }}>
                {/* Accent top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[var(--radius)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${level.accent}, transparent)` }} />

                {/* Number bg watermark */}
                <div className="absolute -top-6 -right-4 text-[120px] font-black leading-none select-none pointer-events-none"
                  style={{ color: level.light }}>
                  {level.num}
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl mb-6 flex items-center justify-center"
                    style={{ background: level.light, border: `1px solid ${level.border}` }}>
                    <level.icon className="w-5 h-5" style={{ color: level.accent }} />
                  </div>

                  <p className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: level.accent }}>
                    Poziom {level.num}
                  </p>
                  <h3 className="text-xl font-black text-[var(--fg)] mb-2">{level.label}</h3>
                  <p className="text-sm text-[var(--fg-muted)] mb-7 leading-relaxed">{level.tagline}</p>

                  <ul className="space-y-2.5 mb-8">
                    {level.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--fg-muted)]">
                        <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: level.accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link href="/onboarding"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold group/cta"
                    style={{ color: level.accent }}>
                    Zacznij tę ścieżkę
                    <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
