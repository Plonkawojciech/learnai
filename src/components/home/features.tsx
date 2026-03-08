"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { Zap, BookOpen, FlaskConical, GitCompare, BarChart3, Trophy } from "lucide-react";
import { stagger, fadeUp, viewport } from "@/lib/animations";

const features = [
  {
    icon: Zap,
    title: "Prompt Simulator",
    desc: "Wpisujesz prompt, AI go ocenia, poprawia i pokazuje konkretną różnicę w wyniku. Uczysz się przez porównanie — nie teorię.",
    href: "/simulator",
    accent: "#6d28d9",
    badge: "Działa teraz",
    span: "lg",
  },
  {
    icon: BookOpen,
    title: "Kursy po poziomach",
    desc: "Trzy ścieżki: laik, power user, developer. Lekcje, quizy, ćwiczenia.",
    href: "/courses/ai-basics/what-is-ai",
    accent: "#2563eb",
    badge: null,
    span: "sm",
  },
  {
    icon: FlaskConical,
    title: "Spec Engineering",
    desc: "Opisujesz projekt → AI zamienia to w perfekcyjną specyfikację techniczną.",
    href: "#",
    accent: "#ea580c",
    badge: "Wkrótce",
    span: "sm",
  },
  {
    icon: GitCompare,
    title: "Model Comparator",
    desc: "Claude vs GPT-4o vs Gemini obok siebie. Widzisz różnice na żywo.",
    href: "#",
    accent: "#059669",
    badge: "Wkrótce",
    span: "sm",
  },
  {
    icon: BarChart3,
    title: "Prompt Analytics",
    desc: "Historia, progres, statystyki — panel Twoich promptów.",
    href: "/dashboard",
    accent: "#db2777",
    badge: "Wkrótce",
    span: "sm",
  },
  {
    icon: Trophy,
    title: "Certyfikat",
    desc: "Weryfikowalny certyfikat po ukończeniu kursu. Jeden klik → LinkedIn.",
    href: "#",
    accent: "#d97706",
    badge: null,
    span: "sm",
  },
];

function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - left);
    my.set(e.clientY - top);
  }

  return (
    <div
      onMouseMove={handleMove}
      className={`card card-glow relative overflow-hidden group ${className ?? ""}`}
    >
      {/* Mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mx}px ${my}px, rgba(109,40,217,0.06), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}

export function Features() {
  const [large, ...rest] = features;

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={viewport}
          className="text-center mb-16">
          <motion.p variants={fadeUp}
            className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-4">
            Platforma
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="text-5xl sm:text-6xl font-black tracking-[-0.03em] leading-tight mb-5 text-[var(--fg)]">
            Wszystko czego potrzebujesz.
            <br />
            <span className="text-[var(--fg-muted)]">Nic czego nie potrzebujesz.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[var(--fg-muted)] max-w-xl mx-auto">
            Praktyczna edukacja AI zbudowana wokół tego co naprawdę działa.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <motion.div variants={stagger(0.06)} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Large feature */}
          <motion.div variants={fadeUp} className="md:col-span-2 md:row-span-2">
            <SpotlightCard className="h-full min-h-[300px]">
              <Link href={large.href} className="flex flex-col h-full p-8">
                <div className="flex items-start justify-between mb-auto">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ background: `${large.accent}12`, border: `1px solid ${large.accent}22` }}>
                    <large.icon className="w-6 h-6" style={{ color: large.accent }} />
                  </div>
                  {large.badge && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: `${large.accent}10`, color: large.accent, border: `1px solid ${large.accent}20` }}>
                      {large.badge}
                    </span>
                  )}
                </div>

                {/* Mini UI preview */}
                <div className="my-8 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 font-mono text-xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                    <span className="text-red-500 font-semibold">Twój prompt</span>
                    <span className="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-100">18%</span>
                  </div>
                  <p className="text-[var(--fg-subtle)] italic">"napisz mi email do klienta"</p>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Zoptymalizowany
                    </span>
                    <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-100">92%</span>
                  </div>
                  <p className="text-[var(--fg-muted)]">"Wciel się w rolę customer success managera..."</p>
                </div>

                <h3 className="text-2xl font-black text-[var(--fg)] mb-2">{large.title}</h3>
                <p className="text-[var(--fg-muted)] leading-relaxed">{large.desc}</p>
              </Link>
            </SpotlightCard>
          </motion.div>

          {/* Small cards */}
          {rest.map((f) => (
            <motion.div key={f.title} variants={fadeUp}>
              <SpotlightCard className="h-full">
                <Link href={f.href} className="flex flex-col p-6 h-full min-h-[160px]">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${f.accent}10`, border: `1px solid ${f.accent}20` }}>
                      <f.icon className="w-4 h-4" style={{ color: f.accent }} />
                    </div>
                    {f.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--fg-subtle)] border border-[var(--border)]">
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-[var(--fg)] mb-1.5">{f.title}</h3>
                  <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">{f.desc}</p>
                </Link>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
