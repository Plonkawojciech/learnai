"use client";

import { motion } from "framer-motion";
import { Zap, BookOpen, FlaskConical, GitCompare, BarChart3, Trophy } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Zap,
    title: "Prompt Simulator",
    description: "Wpisujesz prompt, AI go poprawia i pokazuje konkretną różnicę w wyniku. Uczysz się przez porównanie, nie przez teorię.",
    href: "/simulator",
    gradient: "from-blue-500 to-cyan-500",
    badge: "Nowe",
  },
  {
    icon: BookOpen,
    title: "Kursy po poziomach",
    description: "Trzy ścieżki: laik, profesjonalista, developer. Każda ścieżka to konkretne lekcje z ćwiczeniami — bez lania wody.",
    href: "/courses",
    gradient: "from-violet-500 to-purple-600",
    badge: null,
  },
  {
    icon: FlaskConical,
    title: "Spec Engineering",
    description: "Opisujesz projekt lub funkcję. AI zamienia to w perfekcyjną specyfikację techniczną. Idealne przed rozmową z developerem.",
    href: "/spec-engineer",
    gradient: "from-orange-500 to-amber-500",
    badge: "Wkrótce",
  },
  {
    icon: GitCompare,
    title: "Model Comparator",
    description: "To samo pytanie — Claude, GPT-4o, Gemini obok siebie. Widzisz różnice i uczysz się kiedy używać którego modelu.",
    href: "/tools/compare",
    gradient: "from-emerald-500 to-green-600",
    badge: "Wkrótce",
  },
  {
    icon: BarChart3,
    title: "Analiza promptów",
    description: "Wklejasz prompt i dostajesz analizę: co działa, co nie, dlaczego. Z oceną punktową i konkretnym feedbackiem.",
    href: "/simulator",
    gradient: "from-pink-500 to-rose-600",
    badge: null,
  },
  {
    icon: Trophy,
    title: "Certyfikat",
    description: "Po ukończeniu kursu dostajesz weryfikowalny certyfikat. Jeden klik żeby dodać do LinkedIn.",
    href: "/courses",
    gradient: "from-yellow-500 to-orange-500",
    badge: null,
  },
];

export function Features() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Co tu znajdziesz</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Wszystko czego potrzebujesz.
            <br />
            Nic czego nie potrzebujesz.
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
            Praktyczna edukacja AI zbudowana wokół tego co naprawdę działa.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={f.href}
                className="group block h-full p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-md`}>
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  {f.badge && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      f.badge === "Nowe"
                        ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                        : "bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)]"
                    }`}>
                      {f.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">{f.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{f.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
