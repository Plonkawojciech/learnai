"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { stagger, fadeUp, viewport } from "@/lib/animations";

const features = [
  {
    num: "01",
    title: "Prompt Simulator",
    desc: "Wpisujesz prompt, AI go ocenia, poprawia i pokazuje konkretną różnicę w wyniku. Uczysz się przez porównanie — nie przez teorię.",
    href: "/simulator",
    badge: "Działa teraz",
    live: true,
  },
  {
    num: "02",
    title: "Kursy po poziomach",
    desc: "Trzy ścieżki: laik, power user, developer. Lekcje, quizy, ćwiczenia — prowadzone od podstaw do zaawansowanych tematów.",
    href: "/courses/ai-basics/what-is-ai",
    badge: null,
    live: true,
  },
  {
    num: "03",
    title: "Spec Engineering",
    desc: "Opisujesz projekt jednym zdaniem. AI zamienia to w perfekcyjną specyfikację techniczną gotową do wdrożenia.",
    href: "#",
    badge: "Wkrótce",
    live: false,
  },
  {
    num: "04",
    title: "Model Comparator",
    desc: "Claude vs GPT-4o vs Gemini na tym samym prompcie obok siebie. Widzisz różnice jakości, ceny i szybkości na żywo.",
    href: "#",
    badge: "Wkrótce",
    live: false,
  },
  {
    num: "05",
    title: "Certyfikat",
    desc: "Weryfikowalny certyfikat po ukończeniu kursu. Jeden klik — prosto na LinkedIn.",
    href: "#",
    badge: null,
    live: false,
  },
];

export function Features() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">

        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={viewport}
          className="mb-20">
          <motion.p variants={fadeUp}
            className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-5">
            Platforma
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-display text-5xl sm:text-6xl font-bold tracking-[-0.02em] leading-tight text-[var(--fg)] max-w-xl">
            Wszystko czego potrzebujesz.
          </motion.h2>
        </motion.div>

        {/* Editorial feature list */}
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={viewport}>
          <div className="border-t border-[var(--border)]">
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Link href={f.href}
                  className="group flex items-start gap-6 sm:gap-10 py-8 border-b border-[var(--border)] hover:border-[var(--border-md)] transition-colors duration-200">

                  <span className="text-[11px] font-mono text-[var(--fg-subtle)] pt-1.5 w-7 shrink-0 tabular-nums">
                    {f.num}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2.5">
                      <h3 className="text-xl font-bold text-[var(--fg)] group-hover:text-[var(--primary)] transition-colors">
                        {f.title}
                      </h3>
                      {f.badge && (
                        <span className={`text-[10px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-full border ${
                          f.live
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-[var(--bg-subtle)] text-[var(--fg-subtle)] border-[var(--border)]"
                        }`}>
                          {f.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--fg-muted)] leading-relaxed max-w-xl">{f.desc}</p>
                  </div>

                  <ArrowUpRight className="w-5 h-5 text-[var(--fg-subtle)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
