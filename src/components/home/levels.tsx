"use client";

import { motion } from "framer-motion";
import { User, Briefcase, Code2 } from "lucide-react";

const levels = [
  {
    icon: User,
    label: "Normalny człowiek",
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    description: "Nigdy nie używałeś AI albo klikasz ChatGPT od czasu do czasu. Chcesz zrozumieć o co chodzi i jak to działa w normalnym życiu.",
    examples: ["Co to jest AI i jak działa", "Jak pisać prompty które działają", "AI w pracy, maile, analizy, prezentacje", "ChatGPT vs Claude — czego używać i kiedy"],
  },
  {
    icon: Briefcase,
    label: "Profesjonalista",
    color: "from-blue-500 to-cyan-600",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    description: "Już korzystasz z AI w pracy ale wiesz że możesz więcej. Chcesz automatyzować procesy, oszczędzać czas i wyciągać lepsze wyniki.",
    examples: ["Zaawansowane prompt engineering", "AI workflow i automatyzacje (Zapier, Make)", "Analiza danych z AI", "Spec Engineering — jak pisać idealne briefy"],
  },
  {
    icon: Code2,
    label: "Builder / Dev",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    description: "Programujesz i chcesz budować produkty z AI. Od integracji API do własnych agentów i systemów RAG.",
    examples: ["OpenAI / Anthropic API od podstaw", "RAG — własna baza wiedzy dla AI", "AI Agents — autonomiczne systemy", "Fine-tuning i ewaluacja modeli"],
  },
];

export function Levels() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Dla kogo</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Jeden cel, trzy drogi.
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
            Bez względu na to skąd zaczynasz — tu jest ścieżka dla Ciebie.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {levels.map((level, i) => (
            <motion.div
              key={level.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-6 rounded-2xl border ${level.border} ${level.bg} hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center mb-5 shadow-lg`}>
                <level.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{level.label}</h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-5 leading-relaxed">{level.description}</p>
              <ul className="space-y-2">
                {level.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${level.color} shrink-0`} />
                    {ex}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
